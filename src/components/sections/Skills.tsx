import { motion } from 'framer-motion'
import { skillGroups } from '../../data/skills'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Skills() {
  const reduced = useReducedMotion()
  return (
    <section id="skills" className="wrap py-16 scroll-mt-20">
      <div className="mb-7">
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">Technical toolkit</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">Skills & technologies.</h2>
        <p className="text-muted mt-3 max-w-xl m-0">A practical overview of the tools and areas relevant to my IT and web work.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillGroups.map((g, i) => (
          <motion.article
            key={g.title}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6"
          >
            <h3 className="mt-0 mb-3">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1.5 border border-line bg-white/5 rounded-lg text-text text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}