import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

import { useScrollProgress, useScrolled } from '@/hooks/useScroll'

/**
 * Tombol kembali ke atas yang muncul setelah halaman digulir jauh,
 * dengan lingkaran progress yang mengikuti posisi scroll.
 */
export function BackToTop() {
  const progress = useScrollProgress()
  const visible = useScrolled(600)

  const scrollToTop = () => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const circumference = 2 * Math.PI * 22

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 14 }}
          whileHover={{ y: -4, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className="glass-strong group fixed right-4 bottom-[9.25rem] z-[72] grid size-12 place-items-center rounded-full text-ink shadow-[var(--shadow-float)] sm:right-6"
          aria-label="Kembali ke atas halaman"
          title="Kembali ke atas"
        >
          {/* Lingkaran progres */}
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="22" fill="none" stroke="var(--color-line)" strokeWidth="2" />
            <circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="var(--color-mint-500)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <ArrowUp size={18} strokeWidth={2.4} className="relative text-mint-600 transition-colors dark:text-mint-300" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}