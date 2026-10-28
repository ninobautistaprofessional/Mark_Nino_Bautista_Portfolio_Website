import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block border border-accent/30 text-accent rounded-full px-2.5 py-1 text-xs font-bold ${className}`}
    >
      {children}
    </span>
  )
}