import { motion } from 'motion/react'
import { useScrollProgress } from '@/hooks/useScroll'

/**
 * Bilah tipis di bagian atas halaman yang menunjukkan posisi scroll.
 * Hanya muncul setelah halaman digulir sedikit agar tidak mengganggu.
 */
export function ScrollProgress() {
  const progress = useScrollProgress()
  const visible = progress > 0.01

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-mint-500 via-mint-400 to-sky-peak-400"
      style={{ scaleX: progress }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      <span className="absolute right-0 -top-px size-2 -translate-x-1/2 rounded-full bg-mint-400 shadow-[0_0_12px_2px_rgb(52_211_153/0.8)]" />
    </motion.div>
  )
}