import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function About() {
  const reduced = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  })
  return (
    <section id="about" className="wrap py-16 scroll-mt-20">
      <div className="mb-7">
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">About me</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">
          Technology that helps people work better.
        </h2>
        <p className="text-muted mt-3 max-w-xl m-0">
          I combine hands-on IT operations with experience supporting the web services an institution relies on.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.article {...reveal(0)} className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6">
          <h3 className="mt-0 mb-3">Professional summary</h3>
          <p className="text-muted m-0 mb-3">{profile.about}</p>
          <p className="text-muted m-0">{profile.about2}</p>
        </motion.article>
        <motion.article {...reveal(0.1)} className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6">
          <h3 className="mt-0 mb-3">What I bring</h3>
          <ul className="list-disc pl-5 text-muted space-y-2 m-0">
            {profile.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  )
}