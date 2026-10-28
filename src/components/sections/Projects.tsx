import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Projects() {
  const reduced = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  })
  return (
    <section id="projects" className="wrap py-16 scroll-mt-20">
      <div className="mb-7">
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">Selected projects</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">
          Institutional digital services.
        </h2>
        <p className="text-muted mt-3 max-w-xl m-0">
          Three separate websites associated with Lake Shore Colleges. Open each live project to explore it.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            {...reveal(i * 0.08)}
            className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6 flex flex-col"
          >
            <div className="h-32 rounded-xl bg-gradient-to-br from-accent/20 to-accent2/15 border border-line flex items-center justify-center mb-4 overflow-hidden">
              <span className="text-2xl font-black text-accent">{p.iconLabel}</span>
            </div>
            <span className="inline-block border border-accent/30 text-accent rounded-full px-2.5 py-1 text-xs font-bold w-fit">
              {p.tag}
            </span>
            <h3 className="mt-3 mb-2">{p.title}</h3>
            <p className="text-muted m-0 mb-3 flex-1">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {p.skills.map((s) => (
                <span key={s} className="px-2.5 py-1.5 border border-line bg-white/5 rounded-lg text-text text-xs">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm font-bold mt-2">
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent inline-flex items-center gap-1 hover:underline"
              >
                Visit live <ExternalLink size={14} />
              </a>
            </div>
            <p className="text-xs text-muted border-t border-line pt-3 mt-3 mb-0">{p.contributionNote}</p>
          </motion.article>
        ))}
      </div>
      <p className="text-muted text-sm mt-5">
        Project attribution note: these links identify the live services. This portfolio intentionally does not claim that you
        personally built every system or that a particular technology stack powers them without confirmation.
      </p>
    </section>
  )
}