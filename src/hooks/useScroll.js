import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/**
 * Scroll halus dengan momentum, disinkronkan ke event scroll Motion.
 * Dinonaktifkan otomatis bila pengguna memilih reduced motion.
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    })

    lenisRef.current = lenis

    let frameId = 0
    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    lenis.on('scroll', () => {
      window.dispatchEvent(new CustomEvent('lenis:scroll'))
    })

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  return lenisRef
}

/**
 * Progress bar scroll dari 0 sampai 1.
 * Menggunakan requestAnimationFrame agar tidak memicu layout berulang.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0
      setProgress((prev) => (Math.abs(prev - next) > 0.001 ? next : prev))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('lenis:scroll', onScroll)

    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('lenis:scroll', onScroll)
    }
  }, [])

  return progress
}

/** True saat halaman digulir melewati ambang piksel tertentu */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis:scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('lenis:scroll', onScroll)
    }
  }, [threshold])

  return scrolled
}