<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration missing.']);
    exit;
}
$config = require $configPath;
if (!is_array($config)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Invalid server configuration.']);
    exit;
}

// CORS
$origin = $config['allowed_origin'] ?? '';
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $requestOrigin === $origin) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
    exit;
}

// Honeypot
if (!empty($data['website'])) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent. Thank you!']);
    exit;
}

function clean(string $value): string {
    return trim(strip_tags($value));
}

$errors = [];
$name = isset($data['name']) ? clean((string) $data['name']) : '';
$email = isset($data['email']) ? clean((string) $data['email']) : '';
$subject = isset($data['subject']) ? clean((string) $data['subject']) : '';
$message = isset($data['message']) ? clean((string) $data['message']) : '';

if ($name === '' || strlen($name) > 100) {
    $errors['name'] = 'Name is required (max 100 chars).';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) {
    $errors['email'] = 'A valid email is required.';
}
if ($message === '' || strlen($message) < 10 || strlen($message) > 5000) {
    $errors['message'] = 'Message must be 10-5000 characters.';
}
if (strlen($subject) > 255) {
    $errors['subject'] = 'Subject is too long.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Validation failed.', 'errors' => $errors]);
    exit;
}

// Simple rate limit by IP (file-based, best-effort)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = sys_get_temp_dir() . '/portfolio_rate';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/' . md5($ip) . '.txt';
$now = time();
$window = 300; // 5 minutes
$max = 5;
$timestamps = [];
if (file_exists($rateFile)) {
    $timestamps = array_filter(array_map('intval', explode("\n", (string) file_get_contents($rateFile))));
    $timestamps = array_values(array_filter($timestamps, fn ($t) => $t > $now - $window));
}
if (count($timestamps) >= $max) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
    exit;
}
$timestamps[] = $now;
@file_put_contents($rateFile, implode("\n", $timestamps));

try {
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        $config['db_name']
    );
    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $stmt = $pdo->prepare(
        'INSERT INTO contact_messages (name, email, subject, message, ip_address) VALUES (:name, :email, :subject, :message, :ip)'
    );
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject !== '' ? $subject : null,
        ':message' => $message,
        ':ip' => $ip,
    ]);
    $id = (int) $pdo->lastInsertId();
} catch (Throwable $e) {
    error_log('Portfolio contact DB error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not store message. Please try again later.']);
    exit;
}

// Optional email notification (best-effort)
$notify = $config['notify_email'] ?? '';
if ($notify !== '' && filter_var($notify, FILTER_VALIDATE_EMAIL)) {
    $mailSubject = 'New portfolio contact: ' . ($subject !== '' ? $subject : 'No subject');
    $mailBody = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$message}\n\nIP: {$ip}\n";
    $headers = 'From: noreply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'Content-Type: text/plain; charset=UTF-8';
    @mail($notify, $mailSubject, $mailBody, $headers);
}

http_response_code(200);
echo json_encode(['success' => true, 'message' => 'Message sent. Thank you!', 'id' => $id]);