import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { buildWhatsAppLink, navigation, site, socials } from '@/data/siteData'
import { useActiveSection, useScrolled } from '@/hooks/useScroll'
import { useLockBodyScroll } from '@/hooks/useUtils'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { BrandIcon } from '@/components/ui/BrandIcons'

export function Navbar({ onOpenCommand }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(20)
  const { isDark, toggleTheme } = useTheme()

  // Id section yang sedang tampil di layar, dipakai menyorot tautan nav
  const activeSection = useActiveSection(navigation.map((item) => item.href.slice(1)))

  useLockBodyScroll(menuOpen)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled || menuOpen ? 'py-2' : 'py-4',
        )}
      >
        <div className="container-page">
          <nav
            className={cn(
              'flex items-center justify-between rounded-2xl transition-all duration-500',
              scrolled || menuOpen
                ? 'glass-strong px-3 py-2.5 shadow-[var(--shadow-lift)] sm:px-4'
                : 'border border-transparent px-3 py-2.5 sm:px-4',
            )}
            aria-label="Navigasi utama"
          >
            {/* Logo */}
            <a href="#atas" className="group flex shrink-0 items-center gap-2.5" aria-label={`${site.name}, beranda`}>
              <span className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-line bg-canvas shadow-[var(--shadow-mint)]">
                <img
                  src="/Profile.jpeg"
                  alt={`Foto ${site.name}`}
                  width={40}
                  height={40}
                  className="size-full object-cover object-[center_25%]"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-bold tracking-tight">{site.shortName}</span>
                <span className="mt-0.5 hidden text-[0.65rem] font-medium tracking-[0.12em] text-ink-muted uppercase sm:block">
                  Portfolio
                </span>
              </span>
            </a>

            {/* Tautan bagian halaman — pill bergeser mengikuti section aktif */}
            <div className="hidden items-center gap-0.5 rounded-full border border-line/60 bg-surface/50 p-1 lg:flex">
              {navigation.map((item) => {
                const id = item.href.slice(1)
                const active = activeSection === id

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-current={active ? 'true' : undefined}
                    className="relative rounded-full px-4 py-2"
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 shadow-[var(--shadow-mint)]"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                      />
                    ) : null}
                    <span
                      className={cn(
                        'relative z-10 text-sm font-semibold transition-colors duration-300',
                        active ? 'text-white' : 'text-ink-soft hover:text-ink',
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Aksi kanan */}
            <div className="flex shrink-0 items-center gap-1.5">
              <IconButton label="Cari cepat (Ctrl+K)" onClick={onOpenCommand}>
                <Search size={17} strokeWidth={2} />
              </IconButton>

              <IconButton label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'} onClick={toggleTheme}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.28 }}
                    className="grid place-items-center"
                  >
                    {isDark ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
                  </motion.span>
                </AnimatePresence>
              </IconButton>

              <motion.a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm hidden sm:inline-flex"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <BrandIcon name="Whatsapp" width={17} height={17} />
                <span>Hubungi Saya</span>
              </motion.a>

              <IconButton
                label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="lg:hidden"
              >
                {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
              </IconButton>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu layar penuh untuk layar kecil */}
      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            isDark={isDark}
            toggleTheme={toggleTheme}
            onOpenCommand={onOpenCommand}
            activeSection={activeSection}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function IconButton({ label, onClick, children, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      title={label}
      className={cn(
        'grid size-9 place-items-center rounded-xl border border-line/70 bg-surface/60 text-ink-soft transition-colors duration-300 hover:border-mint-400 hover:text-mint-600 dark:hover:text-mint-300',
        className,
      )}
    >
      {children}
    </motion.button>
  )
}

function MobileMenu({ onClose, isDark, toggleTheme, onOpenCommand, activeSection }) {
  return (
    <motion.div
      className="fixed inset-0 z-[75] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-pine-950/40 backdrop-blur-sm dark:bg-black/60"
        onClick={onClose}
        aria-label="Tutup menu"
        tabIndex={-1}
      />

      <motion.div
        className="absolute inset-x-0 top-0 origin-top overflow-hidden rounded-b-[2rem] border-b border-line bg-canvas px-5 pt-20 pb-8 shadow-[var(--shadow-float)]"
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <ul className="flex flex-col gap-1.5">
          {navigation.map((item, index) => {
            const active = activeSection === item.href.slice(1)

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + index * 0.06, duration: 0.4 }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-colors duration-300',
                    active
                      ? 'border-mint-300 bg-mint-50 text-mint-700 dark:border-mint-700 dark:bg-mint-900/50 dark:text-mint-200'
                      : 'border-line bg-surface/60 text-ink-soft hover:border-mint-300',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-9 shrink-0 place-items-center rounded-xl',
                      active
                        ? 'bg-gradient-to-br from-mint-500 to-mint-400 text-white'
                        : 'bg-mist-100 text-ink-soft dark:bg-pine-900 dark:text-ink-soft',
                    )}
                  >
                    <Icon name={item.icon} size={17} strokeWidth={2} />
                  </span>
                  <span className="flex-1 font-display text-base font-semibold">{item.label}</span>
                  {active ? <span className="size-1.5 rounded-full bg-mint-500" /> : null}
                </a>
              </motion.li>
            )
          })}
        </ul>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenCommand?.()
            }}
            className="btn btn-outline btn-sm flex-1"
          >
            <Search size={15} strokeWidth={2} />
            Cari cepat
          </button>
          <button type="button" onClick={toggleTheme} className="btn btn-outline btn-sm flex-1">
            {isDark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
            {isDark ? 'Terang' : 'Gelap'}
          </button>
        </div>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-3 w-full"
        >
          <BrandIcon name="Whatsapp" width={18} height={18} />
          Chat via WhatsApp
        </a>

        <div className="mt-6 border-t border-line pt-5">
          <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.16em] text-ink-muted uppercase">
            Temukan saya di
          </p>
          <div className="flex flex-wrap gap-2">
            {socials
              .filter((item) => item.id !== 'email')
              .map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.handle}
                  className="grid size-10 place-items-center rounded-xl border border-line bg-surface/70 text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                  style={{ '--brand': item.color }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = item.color
                    event.currentTarget.style.borderColor = item.color
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = ''
                    event.currentTarget.style.borderColor = ''
                  }}
                >
                  <BrandIcon name={item.icon} width={17} height={17} />
                </a>
              ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}