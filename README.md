# Mark Niño A. Bautista — Portfolio

Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide React portfolio, with a PHP + MySQL contact-form backend.

## Development

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build
- `npm run test` — run Vitest
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript only

## Contact backend (Hostinger / XAMPP)

1. Create a MySQL database and run `backend/schema.sql`.
2. Copy `backend/config.example.php` to `backend/config.php` and fill in DB credentials + allowed origin.
3. Upload the `backend/` folder to your host (e.g. `public_html/backend`).
4. Set `VITE_API_BASE_URL` to the public URL of that folder and rebuild.

`backend/config.php` is gitignored — never commit real credentials.

## Legacy

The original single-file site is preserved in `legacy/index.html`.