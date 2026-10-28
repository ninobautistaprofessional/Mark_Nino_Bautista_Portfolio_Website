import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-6 text-muted text-sm">
      <div className="wrap flex flex-col sm:flex-row justify-between gap-4">
        <span>
          © {year} {profile.name}
        </span>
        <span>IT Support · Systems Administration · Web Technology</span>
      </div>
    </footer>
  )
}