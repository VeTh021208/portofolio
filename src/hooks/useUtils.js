import { useEffect, useRef, useState } from 'react'

import { formatNumber } from '@/lib/utils'

/**
 * Angka yang menghitung naik saat elemen masuk viewport.
 * Mendukung nilai desimal dan nilai awal yang lebih besar dari akhir.
 */
export function useCountUp(target, { duration = 1800, decimals = 0, start = 0 } = {}) {
  const [value, setValue] = useState(start)
  const ref = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || playedRef.current) return
          playedRef.current = true

          const startTime = performance.now()
          const from = start
          const distance = target - from

          const step = (now) => {
            const elapsed = now - startTime
            const t = Math.min(1, elapsed / duration)
            const eased = 1 - (1 - t) ** 3

            setValue(from + distance * eased)

            if (t < 1) requestAnimationFrame(step)
            else setValue(target)
          }

          requestAnimationFrame(step)
          observer.unobserve(element)
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [target, duration, start])

  return { ref, display: formatNumber(value, decimals) }
}

/** Deteksi breakpoint media query */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(list.matches)
    list.addEventListener('change', onChange)

    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Kunci scroll body selama overlay terbuka */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [locked])
}

/** True bila pengguna meminta animasi seperlunya */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}