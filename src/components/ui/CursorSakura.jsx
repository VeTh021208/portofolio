import { useEffect } from 'react'

/**
 * Kursor kustom gaya manga: titik sakura + cincin pengekor halus,
 * plus jejak kelopak sakura yang memudar saat kursor bergerak.
 * Hanya aktif di perangkat pointer presisi (mouse) tanpa reduced-motion.
 */
export function CursorSakura() {
  useEffect(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return undefined

    const root = document.documentElement
    root.classList.add('cursor-sakura')

    const ring = document.createElement('div')
    const dot = document.createElement('div')
    ring.className = 'cursor-ring'
    dot.className = 'cursor-dot'
    document.body.append(ring, dot)

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let lastX = -999
    let lastY = -999
    let lastSpawn = 0

    const spawnPetal = () => {
      const petal = document.createElement('span')
      petal.className = 'cursor-petal'
      petal.style.left = `${x + (Math.random() * 12 - 6)}px`
      petal.style.top = `${y + (Math.random() * 12 - 6)}px`
      petal.style.setProperty('--p-rot', `${Math.round(Math.random() * 360)}deg`)
      petal.style.setProperty('--p-dx', `${Math.round((Math.random() * 2 - 1) * 18)}px`)
      petal.style.background = Math.random() > 0.4 ? '#F09BB2' : '#DE5578'
      petal.style.animationDuration = `${Math.round(750 + Math.random() * 550)}ms`
      petal.addEventListener('animationend', () => petal.remove(), { once: true })
      document.body.appendChild(petal)
      // Jaga-jaga kalau animasi tidak jalan (tab tersembunyi)
      window.setTimeout(() => petal.remove(), 2600)
    }

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`

      const now = performance.now()
      const dist = Math.hypot(x - lastX, y - lastY)
      if (now - lastSpawn > 55 && dist > 24) {
        spawnPetal()
        lastX = x
        lastY = y
        lastSpawn = now
      }
    }

    const onOver = (event) => {
      const interactive = event.target.closest?.('a, button, [role="button"], .btn, .chip, input, textarea, select')
      root.classList.toggle('cursor-sakura--active', Boolean(interactive))
    }

    const loop = () => {
      rx += (x - rx) * 0.15
      ry += (y - ry) * 0.15
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      root.classList.remove('cursor-sakura', 'cursor-sakura--active')
      ring.remove()
      dot.remove()
      document.querySelectorAll('.cursor-petal').forEach((petal) => petal.remove())
    }
  }, [])

  return null
}
