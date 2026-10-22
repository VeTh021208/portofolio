import { useEffect, useRef } from 'react'

/**
 * Ladang magnet titik latar: grid screentone yang "kesedot" ke arah
 * kursor dalam radius tertentu, lalu mengembang balik ke posisi semula
 * dengan pegas + damping. Hanya aktif di perangkat pointer presisi
 * (mouse) tanpa prefers-reduced-motion; selain itu dot-grid CSS lama
 * di PaperBackdrop yang dipakai.
 */

const SPACING = 16
const DOT = 2.6
const RADIUS = 170
const RADIUS_2 = RADIUS * RADIUS
/** Fraksi jarak ke kursor yang ditempuh titik saat ditarik (0–1). */
const PULL = 0.55
const SPRING = 0.08
const DAMPING = 0.76
const TAU = Math.PI * 2

function hexToRgb(hex) {
  const value = hex.replace('#', '').trim()
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(value)) return null
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function MagneticField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const root = document.documentElement
    root.classList.add('magnet-field')

    /** @type {{ox: number, oy: number, x: number, y: number, vx: number, vy: number, t: number}[]} */
    let dots = []
    let width = 0
    let height = 0
    let ink = [41, 36, 48]
    let mint = [222, 85, 120]
    let maxAlpha = 0.95
    let px = -9999
    let py = -9999
    let raf = 0
    const actives = []

    const readColors = () => {
      const styles = window.getComputedStyle(root)
      ink = hexToRgb(styles.getPropertyValue('--color-ink')) ?? ink
      mint = hexToRgb(styles.getPropertyValue('--color-mint-500')) ?? mint
      // Alpha maksimum di pusat kursor — makin jauh makin samar sampai hilang
      maxAlpha = root.classList.contains('dark') ? 0.8 : 0.95
    }

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0, t: 0 })
        }
      }
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)
      actives.length = 0

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const odx = px - d.ox
        const ody = py - d.oy
        const od2 = odx * odx + ody * ody

        let tx = d.ox
        let ty = d.oy
        let t = 0
        if (od2 < RADIUS_2) {
          const od = Math.sqrt(od2)
          t = 1 - od / RADIUS
          const pull = t * t * PULL
          tx = d.ox + odx * pull
          ty = d.oy + ody * pull
        }
        d.t = t

        const resting = tx === d.ox && ty === d.oy && d.x === d.ox && d.y === d.oy
        if (!resting) {
          d.vx = (d.vx + (tx - d.x) * SPRING) * DAMPING
          d.vy = (d.vy + (ty - d.y) * SPRING) * DAMPING
          d.x += d.vx
          d.y += d.vy
          if (tx === d.ox && ty === d.oy && Math.abs(d.vx) < 0.004 && Math.abs(d.vy) < 0.004) {
            d.x = d.ox
            d.y = d.oy
            d.vx = 0
            d.vy = 0
            d.t = 0
          }
        }

        // Hanya titik dalam radius kursor yang digambar — fade lembut ke tepi
        if (d.t > 0.02) actives.push(d)
      }

      for (let i = 0; i < actives.length; i++) {
        const d = actives[i]
        const t = d.t
        const r = Math.round(ink[0] + (mint[0] - ink[0]) * t)
        const g = Math.round(ink[1] + (mint[1] - ink[1]) * t)
        const b = Math.round(ink[2] + (mint[2] - ink[2]) * t)
        // Makin dekat pusat: makin besar + makin pekat; ke tepi menyusut & memudar
        const a = maxAlpha * Math.pow(t, 1.3)
        const radius = 0.3 + t * (DOT / 2 + 1.1)
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, radius, 0, TAU)
        ctx.fill()
      }

      raf = window.requestAnimationFrame(step)
    }

    const onMove = (event) => {
      px = event.clientX
      py = event.clientY
    }

    const onLeave = () => {
      px = -9999
      py = -9999
    }

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf)
      } else {
        raf = window.requestAnimationFrame(step)
      }
    }

    const onResize = () => build()

    readColors()
    build()
    raf = window.requestAnimationFrame(step)

    // Warna tema berubah (terang/gelap) → baca ulang warna
    const observer = new MutationObserver(readColors)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      root.classList.remove('magnet-field')
      ctx.clearRect(0, 0, width, height)
    }
  }, [])

  return <canvas ref={canvasRef} className="magnet-canvas" aria-hidden="true" />
}
