import { useEffect, useRef, useState } from 'react'

/**
 * Judul dengan huruf yang "hidup": setiap huruf dalam radius kursor
 * mundur + sedikit berputar, lalu mengembang balik (repel halus).
 * Hanya aktif di perangkat pointer presisi tanpa reduced-motion;
 * selain itu render judul polos biasa.
 *
 * @param {object} props
 * @param {'h1'|'h2'|'h3'|'span'|'p'} [props.as] Tag elemen judul
 */
const REACT_RADIUS = 90
const REACT_PUSH = 16
const REACT_ROTATE = 14

export function CursorText({ as: Tag = 'h2', className = '', children, ...rest }) {
  const [enabled] = useState(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    return Boolean(fine && !reduced)
  })
  const containerRef = useRef(null)

  const text = typeof children === 'string' ? children : ''
  const split = enabled && Boolean(text)

  useEffect(() => {
    if (!split) return undefined
    const container = containerRef.current
    if (!container) return undefined

    const spans = Array.from(container.querySelectorAll('[data-char]'))
    const n = spans.length
    if (n === 0) return undefined

    const curX = new Float64Array(n)
    const curY = new Float64Array(n)
    const curR = new Float64Array(n)
    const baseX = new Float64Array(n)
    const baseY = new Float64Array(n)
    let mx = -9999
    let my = -9999
    let visible = false
    let alive = true
    let raf = 0
    let measureRaf = 0

    const measure = () => {
      // Transform di-reset dulu supaya rect = posisi asli
      for (let i = 0; i < n; i++) spans[i].style.transform = ''
      for (let i = 0; i < n; i++) {
        const r = spans[i].getBoundingClientRect()
        baseX[i] = r.left + r.width / 2
        baseY[i] = r.top + r.height / 2
      }
    }

    const scheduleMeasure = () => {
      if (measureRaf) return
      measureRaf = window.requestAnimationFrame(() => {
        measureRaf = 0
        if (alive && visible) measure()
      })
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) measure()
      },
      { threshold: 0 },
    )
    io.observe(container)

    // Rect bisa bergeser setelah font display (Bangers) selesai dimuat
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (alive && visible) measure()
      })
    }

    const onMove = (event) => {
      mx = event.clientX
      my = event.clientY
    }

    const loop = () => {
      if (visible) {
        for (let i = 0; i < n; i++) {
          const dx = baseX[i] - mx
          const dy = baseY[i] - my
          const d = Math.hypot(dx, dy)
          let tx = 0
          let ty = 0
          let tr = 0
          if (d < REACT_RADIUS && d > 0.01) {
            const f = 1 - d / REACT_RADIUS
            const push = f * f * REACT_PUSH
            tx = (dx / d) * push
            ty = (dy / d) * push
            tr = (dx / d) * f * REACT_ROTATE
          }
          curX[i] += (tx - curX[i]) * 0.16
          curY[i] += (ty - curY[i]) * 0.16
          curR[i] += (tr - curR[i]) * 0.16

          const moving = Math.abs(curX[i]) > 0.03 || Math.abs(curY[i]) > 0.03 || Math.abs(curR[i]) > 0.03
          if (moving) {
            spans[i].style.transform =
              `translate(${curX[i].toFixed(2)}px, ${curY[i].toFixed(2)}px) rotate(${curR[i].toFixed(2)}deg)`
          } else if (spans[i].style.transform) {
            spans[i].style.transform = ''
          }
        }
      }
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('lenis:scroll', scheduleMeasure)
    window.addEventListener('resize', scheduleMeasure)

    return () => {
      alive = false
      window.cancelAnimationFrame(raf)
      window.cancelAnimationFrame(measureRaf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('lenis:scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      for (let i = 0; i < n; i++) spans[i].style.transform = ''
    }
  }, [split, text])

  if (!split) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const chars = Array.from(text)
  return (
    <Tag ref={containerRef} aria-label={text} className={className} {...rest}>
      {chars.map((ch, i) =>
        ch === ' ' ? (
          ' '
        ) : (
          <span
            key={i}
            data-char
            aria-hidden="true"
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {ch}
          </span>
        ),
      )}
    </Tag>
  )
}
