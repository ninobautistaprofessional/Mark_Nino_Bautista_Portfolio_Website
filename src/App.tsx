import { ThemeProvider } from './components/theme/ThemeProvider'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { ExperienceSection } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-[#08201e] focus:px-3 focus:py-2 focus:rounded">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <ExperienceSection />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}