import type { ContactPayload, ContactResult } from '../types'

const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch(`${BASE}/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
    if (!res.ok || !data.success) {
      return { ok: false, message: data.message ?? 'Something went wrong. Please try again.' }
    }
    return { ok: true, message: data.message ?? 'Message sent. Thank you!' }
  } catch {
    return { ok: false, message: 'Network error. Please try again later.' }
  }
}