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

/**
 * Scroll-spy untuk navigasi jangkar: mengembalikan id section yang sedang
 * aktif di layar.
 *
 * Memakai IntersectionObserver dengan "garis pemicu" setinggi 40% viewport:
 * section dianggap aktif begitu batas atasnya melewati garis itu, sehingga
 * pill nav berpindah segera di tengah scroll — tidak menunggu scroll berhenti
 * dan tidak menunggu section sampai ke puncak layar.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')
  // Gabungkan jadi string agar referensi array baru tiap render tidak
  // menyebabkan efek berjalan ulang
  const idsKey = ids.join('|')

  useEffect(() => {
    const list = idsKey.split('|').filter(Boolean)
    const linePercent = 40

    // Cadangan manual bila IntersectionObserver tidak tersedia
    const computeFallback = () => {
      const triggerLine = (window.innerHeight * linePercent) / 100
      let current = list[0] ?? ''
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= triggerLine) current = id
      }
      setActiveId(current)
    }

    if (typeof IntersectionObserver === 'undefined') {
      computeFallback()
      window.addEventListener('scroll', computeFallback, { passive: true })
      window.addEventListener('resize', computeFallback)
      return () => {
        window.removeEventListener('scroll', computeFallback)
        window.removeEventListener('resize', computeFallback)
      }
    }

    // Set section yang sedang memotong garis pemicu
    const visible = new Set()

    // Section terakhir (urutan dokumen = urutan nav) yang terlihat yang menang
    const apply = () => {
      if (visible.size === 0) return
      let current = ''
      for (const id of list) {
        if (visible.has(id)) current = id
      }
      if (current) setActiveId(current)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        apply()
      },
      {
        root: null,
        rootMargin: `-${linePercent}% 0px -${100 - linePercent}% 0px`,
        threshold: 0,
      },
    )

    list.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [idsKey])

  return activeId
}