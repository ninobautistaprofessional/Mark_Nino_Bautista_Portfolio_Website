import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6 min-w-0 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}