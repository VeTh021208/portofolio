import { useCallback, useEffect, useState } from 'react'

import { projects } from '@/data/siteData'
import { useLenis } from '@/hooks/useScroll'
import { BackToTop } from '@/components/layout/BackToTop'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { ProjectModal } from '@/components/ui/ProjectModal'
import Landing from '@/pages/Landing'

export function Layout() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  useLenis(true)

  // Gulir ke bagian yang dituju bila dibuka langsung dengan tautan jangkar
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return undefined

    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const openCommand = useCallback(() => setCommandOpen(true), [])

  const openProject = useCallback((project) => {
    setCommandOpen(false)
    setActiveProject(project)
  }, [])

  // Pintasan global Ctrl+K atau Cmd+K untuk membuka panel pencarian
  useEffect(() => {
    const onKey = (event) => {
      if (event.key.toLowerCase() !== 'k') return
      if (!event.metaKey && !event.ctrlKey) return

      // Jangan tangkap saat pengguna sedang mengetik di kolom isian
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      event.preventDefault()
      setCommandOpen(true)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Satu-satunya tautan lompat ke konten, dipakai keyboard dan screen reader */}
      <a
        href="#konten-utama"
        className="sr-only-focusable fixed top-3 left-3 z-[115] rounded-full bg-mint-500 px-4 py-2 text-sm font-semibold text-white"
      >
        Lompat ke konten utama
      </a>

      <ScrollProgress />
      <Preloader />

      <Navbar onOpenCommand={openCommand} />

      <main id="konten-utama" className="flex-1" tabIndex={-1}>
        <Landing onOpenProject={openProject} />
      </main>

      <Footer />

      <BackToTop />
      <ChatWidget />
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        projects={projects}
        onOpenProject={openProject}
      />
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenProject={setActiveProject}
      />
    </div>
  )
}
