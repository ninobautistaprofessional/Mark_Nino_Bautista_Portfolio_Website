interface SkillPillProps {
  label: string
}

export function SkillPill({ label }: SkillPillProps) {
  return (
    <span className="px-3 py-2 border border-line bg-white/5 rounded-xl text-text text-sm">
      {label}
    </span>
  )
}