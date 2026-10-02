import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { quickReplies, site, whatsapp, buildWhatsAppLink } from '@/data/siteData'
import { usePrefersReducedMotion } from '@/hooks/useUtils'
import { cn } from '@/lib/utils'
import { BrandIcon } from '@/components/ui/BrandIcons'

/**
 * Tombol WhatsApp mengambang dengan pulse dan tooltip.
 * Muncul setelah pengunjung melewati ambang scroll tertentu.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || 0) > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis:scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('lenis:scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="group fixed right-4 bottom-4 z-[73] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] sm:right-6 sm:size-[3.75rem]"
          aria-label={`Chat via WhatsApp ${whatsapp.display}`}
          title={`Chat ${site.name} lewat WhatsApp`}
        >
          {/* Gelang pulse */}
          <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 animate-[var(--animate-pulse-ring)]" />
          <BrandIcon name="Whatsapp" width={28} height={28} />

          {/* Tooltip desktop */}
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-semibold text-ink opacity-0 shadow-[var(--shadow-lift)] transition-opacity duration-300 group-hover:opacity-100 md:block">
            Chat saya sekarang
            <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rotate-45 bg-surface" />
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Widget chat ringan yang menyambung langsung ke WhatsApp.
 * Menampilkan sapaan, tombol cepat, dan daftar kontak.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  const reduced = usePrefersReducedMotion()

  // Sapaan otomatis setelah pengunjung beberapa detik di halaman
  useEffect(() => {
    if (seen) return undefined
    const timer = setTimeout(() => {
      setOpen(true)
      setSeen(true)
    }, 9000)
    return () => clearTimeout(timer)
  }, [seen])

  return (
    <>
      {/* Tombol pemicu */}
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.94 }}
        className="group fixed right-4 bottom-[4.75rem] z-[73] flex items-center gap-2.5 rounded-full bg-gradient-to-br from-mint-500 via-mint-500 to-sky-peak-500 py-2.5 pr-4 pl-2.5 text-white shadow-[0_10px_30px_-6px_rgba(16,185,129,0.5)] sm:right-6 sm:py-3 sm:pl-3.5"
        aria-label={open ? 'Tutup panel chat' : 'Buka panel chat'}
        aria-expanded={open}
      >
        <span className="relative grid size-8 place-items-center">
          <span className="absolute inset-0 -z-10 rounded-full bg-mint-400 opacity-60 animate-[var(--animate-pulse-ring)]" />
          {open ? <X size={19} strokeWidth={2.4} /> : <MessageCircle size={19} strokeWidth={2.2} />}
        </span>
        <span className="hidden text-sm font-semibold whitespace-nowrap sm:inline">
          {open ? 'Tutup' : 'Tanya saya'}
        </span>
      </motion.button>

      {/* Panel chat */}
      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="glass-strong fixed right-4 bottom-[9.5rem] z-[72] flex max-h-[min(30rem,72vh)] w-[calc(100vw-2rem)] max-w-[21rem] flex-col overflow-hidden rounded-3xl shadow-[var(--shadow-float)] sm:right-6"
            role="dialog"
            aria-label="Panel chat"
          >
            {/* Kepala */}
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-mint-600 via-mint-500 to-sky-peak-500 px-5 py-4 text-white">
              <div className="absolute -top-10 -right-6 size-28 rounded-full bg-white/15 blur-xl" aria-hidden="true" />
              <div className="relative flex items-start gap-3">
                <div className="relative shrink-0">
                  <span className="grid size-11 place-items-center rounded-full bg-white/20 font-display text-sm font-bold backdrop-blur-sm">
                    {site.initials}
                  </span>
                  <span className="absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-mint-500 bg-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold">{site.name}</p>
                  <p className="mt-0.5 text-xs text-white/85">Online biasanya membalas dalam 2 jam</p>
                </div>
              </div>
            </div>

            {/* Pesan pembuka */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-canvas/60 p-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.1 }}
                className="max-w-[85%] rounded-2xl rounded-tl-sm border border-line bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft shadow-[var(--shadow-soft)]"
              >
                Halo, selamat datang di portofolio saya. Punya pertanyaan soal jasa atau proyek? Pilih salah satu topik di
                bawah, atau tulis pesan langsung.
              </motion.div>

              {/* Tombol cepat */}
              <div className="space-y-2 pt-1">
                {quickReplies.map((reply, index) => (
                  <motion.a
                    key={reply.id}
                    href={buildWhatsAppLink(reply.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.16 + index * 0.07 }}
                    whileHover={{ x: 4 }}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-2xl border border-mint-200 bg-surface/80 px-3.5 py-2.5 text-left text-sm font-semibold text-mint-700 transition-colors duration-300 hover:border-mint-400 hover:bg-mint-50',
                      'dark:border-mint-800 dark:text-mint-200 dark:hover:bg-mint-900/60',
                    )}
                  >
                    {reply.label}
                    <BrandIcon name="Whatsapp" width={15} height={15} className="shrink-0 text-[#25D366]" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Tombol utama */}
            <div className="shrink-0 border-t border-line bg-surface/80 p-3.5">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-[#25D366] text-white hover:brightness-105"
              >
                <BrandIcon name="Whatsapp" width={18} height={18} />
                Buka WhatsApp
              </a>
              <p className="mt-2 text-center text-[0.68rem] text-ink-muted">{whatsapp.display}</p>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}