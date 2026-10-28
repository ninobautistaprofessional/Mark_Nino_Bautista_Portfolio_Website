import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Contact } from '../../components/sections/Contact'

vi.mock('../../lib/api', () => ({
  submitContact: vi.fn().mockResolvedValue({ ok: true, message: 'Message sent. Thank you!' }),
}))

describe('Contact', () => {
  it('shows validation errors on empty submit', async () => {
    render(<Contact />)
    const submit = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submit)
    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument()
      expect(screen.getByText('Email is required.')).toBeInTheDocument()
      expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument()
    })
  })
})