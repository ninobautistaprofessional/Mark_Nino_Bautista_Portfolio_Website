import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { quickStats } from '../../data/experience'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Hero() {
  const reduced = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  })
  return (
    <section
      id="home"
      className="wrap py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-12 items-center scroll-mt-20"
    >
      <div>
        <motion.div {...reveal(0)} className="text-accent font-bold tracking-[0.13em] uppercase text-xs">
          IT Support · Systems · Web Technology
        </motion.div>
        <motion.h1
          {...reveal(0.1)}
          className="text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight mt-4 mb-5"
        >
          Reliable IT.
          <br />
          <em className="not-italic text-accent">Practical solutions.</em>
        </motion.h1>
        <motion.p {...reveal(0.2)} className="text-muted text-lg max-w-2xl">
          {profile.lead}
        </motion.p>
        <motion.div {...reveal(0.3)} className="flex flex-wrap gap-3 mt-7">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold bg-accent text-[#08201e] border border-accent hover:bg-[#9bf3e9] transition-colors"
          >
            Explore my projects <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold border border-line text-text hover:bg-white/5 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
        <motion.div {...reveal(0.4)} className="grid grid-cols-3 gap-3 mt-8 max-w-md">
          {quickStats.map((s) => (
            <div key={s.label} className="p-4 border border-line rounded-2xl bg-white/5">
              <strong className="block text-2xl text-accent">{s.value}</strong>
              <span className="text-xs text-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.aside
        {...reveal(0.2)}
        className="p-7 border border-line rounded-3xl bg-gradient-to-br from-accent/10 to-accent2/5 bg-panel shadow-2xl max-w-md"
      >
        <div className="w-[74px] h-[74px] rounded-2xl grid place-items-center text-2xl font-black text-[#09201f] bg-gradient-to-br from-accent to-accent2 mb-5">
          {profile.monogram}
        </div>
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">Professional profile</div>
        <h3 className="text-xl mt-2 mb-1">{profile.role}</h3>
        <p className="text-muted m-0">{profile.subtitle}</p>
        <hr className="border-0 border-t border-line my-5" />
        <p className="text-muted m-0">
          Focused on user support, endpoint troubleshooting, network connectivity, account administration, CCTV systems, and
          website maintenance.
        </p>
        <div className="mt-5">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold bg-accent text-[#08201e] border border-accent hover:bg-[#9bf3e9] transition-colors"
          >
            <Mail size={16} /> Email me
          </a>
        </div>
      </motion.aside>
    </section>
  )
}