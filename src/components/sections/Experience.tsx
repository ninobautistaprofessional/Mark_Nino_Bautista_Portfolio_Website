import { motion } from 'framer-motion'
import { experience } from '../../data/experience'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ExperienceSection() {
  const reduced = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  })
  return (
    <section id="experience" className="wrap py-16 scroll-mt-20">
      <div className="mb-7">
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">Experience</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">
          IT operations in practice.
        </h2>
        <p className="text-muted mt-3 max-w-xl m-0">
          Supporting people, endpoints, infrastructure, and institutional digital services.
        </p>
      </div>
      <motion.article
        {...reveal(0)}
        className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6"
      >
        <span className="inline-block border border-accent/30 text-accent rounded-full px-2.5 py-1 text-xs font-bold">
          {experience.duration}
        </span>
        <h3 className="mt-3 mb-1">{experience.role}</h3>
        <div className="text-accent font-bold text-sm mb-4">{experience.company}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="mt-0 mb-2 text-base">Technical support & endpoints</h4>
            <ul className="list-disc pl-5 text-muted space-y-1 m-0">
              {experience.techSupport.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mt-0 mb-2 text-base">Systems & infrastructure</h4>
            <ul className="list-disc pl-5 text-muted space-y-1 m-0">
              {experience.infrastructure.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </section>
  )
}