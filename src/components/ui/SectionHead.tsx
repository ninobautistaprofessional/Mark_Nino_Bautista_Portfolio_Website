interface SectionHeadProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHead({ eyebrow, title, description, className = '' }: SectionHeadProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7 ${className}`}>
      <div>
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">{eyebrow}</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">{title}</h2>
      </div>
      {description ? <p className="text-muted max-w-md m-0 mt-3 sm:mt-0">{description}</p> : null}
    </div>
  )
}