import { AnimatePresence, motion } from 'motion/react'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { projects } from '@/data/siteData'
import { useLenis } from '@/hooks/useScroll'
import { BackToTop } from '@/components/layout/BackToTop'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { ChatWidget, FloatingWhatsApp } from '@/components/chat/ChatWidget'
import { RouteFallback } from '@/components/layout/RouteFallback'

const Home = lazy(() => import('@/pages/Home'))
const Profile = lazy(() => import('@/pages/Profile'))
const Products = lazy(() => import('@/pages/Products'))
const Documentation = lazy(() => import('@/pages/Documentation'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export function Layout() {
  const location = useLocation()
  const [commandOpen, setCommandOpen] = useState(false)
  const [booted, setBooted] = useState(false)

  useLenis(true)

  // Atur ulang scroll dan fokus ke atas konten saat pindah halaman
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'instant' })

    if (!location.hash) return
    // Tunggu halaman selesai dirender lalu gulir ke bagian yang dituju
    const timer = setTimeout(() => {
      const target = document.querySelector(location.hash)
      target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }, 260)
    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  const openCommand = useCallback(() => setCommandOpen(true), [])

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
      <Preloader onFinish={() => setBooted(true)} />

      <Navbar onOpenCommand={openCommand} />

      <main id="konten-utama" className="flex-1" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/produk" element={<Products />} />
                <Route path="/dokumentasi" element={<Documentation />} />
                <Route path="/dokumentasi/:slug" element={<ProjectDetail />} />
                <Route path="/kontak" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <BackToTop />
      <FloatingWhatsApp />
      <ChatWidget />
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        projects={projects}
      />

      {/* Penanda bahwa aplikasi sudah selesai memuat */}
      <span className="sr-only" data-booted={booted} />
    </div>
  )
}