import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '../../components/theme/ThemeProvider'
import { Header } from '../../components/layout/Header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    )
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('toggles mobile menu button aria-expanded', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    )
    const btn = screen.getByLabelText('Toggle navigation')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })
})