import { useEffect } from 'react'

/**
 * Kursor kustom yang "hidup": titik yang melebar nutupin bounds elemen
 * saat hover (bentuk beda per varian `data-cursor`), plus hub efek
 * magnetic — elemen `[data-magnetic]` ditarik + miring mengikuti kursor.
 * Hanya aktif di perangkat pointer presisi tanpa reduced-motion.
 */

const SELECTOR = 'a, button, [role="button"], .btn, .chip, input, textarea, select'
const IGNORE = '.cursor-default, [tabindex="-1"]'
const PAD = 5
const DOT_MIN = 9
/** Batas geser magnetic (px) dan kemiringan (derajat). */
const MAG_CLAMP = 18
const MAG_TILT = 7

export function CursorDot() {
  useEffect(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return undefined

    const root = document.documentElement
    root.classList.add('cursor-magnet')

    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    document.body.appendChild(dot)

    let x = -100
    let y = -100
    let cx = -100
    let cy = -100
    let w = DOT_MIN
    let h = DOT_MIN
    let variant = ''
    let lockEl = null
    let raf = 0

    // --- Magnetic: elemen [data-magnetic] yang sedang didekati ---
    let magEl = null
    let magRect = null
    let magX = 0
    let magY = 0
    let magRX = 0
    let magRY = 0
    let lastScrollY = -1

    const refreshMagRect = () => {
      if (!magEl) return
      const prevTransition = magEl.style.transition
      const prevTransform = magEl.style.transform
      magEl.style.transition = 'none'
      magEl.style.transform = 'none'
      magRect = magEl.getBoundingClientRect()
      magEl.style.transform = prevTransform
      void magEl.offsetWidth
      magEl.style.transition = prevTransition
    }

    const setMagEl = (next) => {
      if (next === magEl) return
      if (magEl) magEl.style.transform = ''
      magEl = next
      magX = 0
      magY = 0
      magRX = 0
      magRY = 0
      lastScrollY = window.scrollY
      refreshMagRect()
    }

    const setLock = (el, nextVariant) => {
      lockEl = el
      if (nextVariant !== variant) {
        variant = nextVariant
        dot.className = variant ? `cursor-dot cursor-dot--${variant}` : 'cursor-dot'
      }
    }

    const onOver = (event) => {
      const target = event.target
      if (!target?.closest) return

      setMagEl(target.closest('[data-magnetic]'))

      if (target.closest(IGNORE)) {
        setLock(null, '')
        return
      }
      const custom = target.closest('[data-cursor]')
      if (custom) {
        setLock(custom, custom.getAttribute('data-cursor') || 'halo')
        return
      }
      if (target.closest('input, textarea')) {
        setLock(null, '')
        return
      }
      const interactive = target.closest(SELECTOR)
      setLock(interactive, interactive ? 'halo' : '')
    }

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
    }

    const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

    const loop = () => {
      // --- Kursor: target box = bounds elemen yang di-lock ---
      let tw = DOT_MIN
      let th = DOT_MIN
      let tx = x
      let ty = y
      if (lockEl) {
        const r = lockEl.getBoundingClientRect()
        tw = Math.max(DOT_MIN, r.width + PAD * 2)
        th = Math.max(DOT_MIN, r.height + PAD * 2)
        tx = r.left + r.width / 2
        ty = r.top + r.height / 2
      }
      const ease = lockEl ? 0.22 : 0.3
      w += (tw - w) * ease
      h += (th - h) * ease
      cx += (tx - cx) * ease
      cy += (ty - cy) * ease
      dot.style.width = `${w.toFixed(1)}px`
      dot.style.height = `${h.toFixed(1)}px`
      dot.style.transform = `translate(${(cx - w / 2).toFixed(1)}px, ${(cy - h / 2).toFixed(1)}px)`

      // --- Magnetic: tarik + tilt elemen menuju kursor ---
      if (magEl) {
        if (window.scrollY !== lastScrollY) {
          lastScrollY = window.scrollY
          refreshMagRect()
        }
        if (magRect) {
          const midX = magRect.left + magRect.width / 2
          const midY = magRect.top + magRect.height / 2
          const dx = x - midX
          const dy = y - midY
          magX += (clamp(dx * 0.16, MAG_CLAMP) - magX) * 0.16
          magY += (clamp(dy * 0.16, MAG_CLAMP) - magY) * 0.16
          magRX += (clamp(-dy * 0.03, MAG_TILT) - magRX) * 0.16
          magRY += (clamp(dx * 0.03, MAG_TILT) - magRY) * 0.16
          magEl.style.transform =
            `perspective(600px) translate(${magX.toFixed(2)}px, ${magY.toFixed(2)}px) ` +
            `rotateX(${magRX.toFixed(2)}deg) rotateY(${magRY.toFixed(2)}deg)`
        }
      }

      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      if (magEl) magEl.style.transform = ''
      root.classList.remove('cursor-magnet')
      dot.remove()
    }
  }, [])

  return null
}
