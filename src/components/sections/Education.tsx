import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education as edu } from '../../data/experience'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Education() {
  const reduced = useReducedMotion()
  return (
    <section id="education" className="wrap py-16 scroll-mt-20">
      <div className="mb-7">
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">Education</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">
          Academic foundation.
        </h2>
      </div>
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6 flex gap-4 items-start"
      >
        <div className="flex-none w-12 h-12 rounded-xl grid place-items-center bg-accent/10 text-accent font-black">
          <GraduationCap size={22} />
        </div>
        <div>
          <h3 className="mt-0 mb-1">{edu.degree}</h3>
          <p className="text-muted m-0 text-sm">{edu.school}</p>
          <p className="text-muted mt-2 mb-0">{edu.note}</p>
        </div>
      </motion.article>
    </section>
  )
}