import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'

import { buildWhatsAppLink, site } from '@/data/siteData'

/**
 * Tombol "Tanya saya" mengambang yang langsung mengarah ke WhatsApp.
 * Hanya tombol ini yang tampil di pojok kanan bawah.
 */
export function ChatWidget() {
  return (
    <motion.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed right-4 bottom-4 z-[73] flex items-center gap-2.5 rounded-full bg-gradient-to-br from-mint-500 via-mint-500 to-sky-peak-500 py-2.5 pr-4 pl-2.5 text-white shadow-[0_10px_30px_-6px_rgba(16,185,129,0.5)] sm:right-6 sm:bottom-6 sm:py-3 sm:pl-3.5"
      aria-label="Tanya saya lewat WhatsApp"
      title={`Tanya ${site.name} lewat WhatsApp`}
    >
      <span className="relative grid size-8 place-items-center">
        <span className="absolute inset-0 -z-10 rounded-full bg-mint-400 opacity-60 animate-[var(--animate-pulse-ring)]" />
        <MessageCircle size={19} strokeWidth={2.2} />
      </span>
      <span className="text-sm font-semibold whitespace-nowrap">Tanya saya</span>
    </motion.a>
  )
}
