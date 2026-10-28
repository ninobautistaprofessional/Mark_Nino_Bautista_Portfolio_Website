import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const active = useScrollSpy(['home', ...NAV_ITEMS.map((n) => n.id)])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 620) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="sticky top-0 z-20 bg-bg/86 backdrop-blur-xl border-b border-line">
      <div className="wrap h-[70px] flex items-center justify-between gap-5">
        <a href="#home" className="font-extrabold tracking-wide text-text">
          MARK <span className="text-accent">BAUTISTA</span>
        </a>
        <button
          className="sm:hidden bg-transparent border border-line text-text rounded-xl px-3 py-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav
          className={`${open ? 'flex' : 'hidden'} sm:flex absolute sm:static left-0 right-0 top-[61px] sm:top-auto bg-bg sm:bg-transparent border-b sm:border-0 border-line px-5 py-4 sm:p-0 flex-col sm:flex-row gap-3 sm:gap-5 text-sm text-muted`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`hover:text-accent ${active === item.id ? 'text-accent' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-xl border border-line text-text hover:bg-white/5"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}