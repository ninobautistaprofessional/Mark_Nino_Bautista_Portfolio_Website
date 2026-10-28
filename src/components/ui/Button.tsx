import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export function Button({ variant = 'secondary', className = '', children, ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold border transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent'
  const variants: Record<string, string> = {
    primary: 'bg-accent text-[#08201e] border-accent hover:bg-[#9bf3e9]',
    secondary: 'bg-transparent text-text border-line hover:bg-white/5',
    ghost: 'bg-transparent text-muted border-transparent hover:text-text',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}