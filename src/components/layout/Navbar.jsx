import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { buildWhatsAppLink, navigation, site, socials, whatsapp } from '@/data/siteData'
import { useScrolled } from '@/hooks/useScroll'
import { useLockBodyScroll } from '@/hooks/useUtils'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { BrandIcon } from '@/components/ui/BrandIcons'

export function Navbar({ onOpenCommand }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(20)
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()

  useLockBodyScroll(menuOpen)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

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
            <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${site.name}, beranda`}>
              <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-mint-500 to-sky-peak-400 shadow-[var(--shadow-mint)]">
                <svg viewBox="0 0 40 40" className="size-7" aria-hidden="true">
                  <path d="M2 30 L13 15 L20 24 L26 16 L38 30 L38 34 L2 34 Z" fill="white" opacity="0.95" />
                  <path d="M13 15 L10.5 18.5 L13 17.5 L15.5 18.5 Z" fill="var(--color-mint-700)" opacity="0.6" />
                  <circle cx="31" cy="9" r="3.4" fill="var(--color-sun-400)" />
                </svg>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-bold tracking-tight">{site.shortName}</span>
                <span className="mt-0.5 hidden text-[0.65rem] font-medium tracking-[0.12em] text-ink-muted uppercase sm:block">
                  Portfolio
                </span>
              </span>
            </Link>

            {/* Tautan halaman */}
            <div className="hidden items-center gap-0.5 rounded-full border border-line/60 bg-surface/50 p-1 lg:flex">
              {navigation.map((item) => (
                <NavLink key={item.id} to={item.href} className="relative rounded-full px-4 py-2">
                  {({ isActive }) => (
                    <>
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 shadow-[var(--shadow-mint)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span
                        className={cn(
                          'relative z-10 text-sm font-semibold transition-colors duration-300',
                          isActive ? 'text-white' : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
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

function MobileMenu({ onClose, isDark, toggleTheme, onOpenCommand }) {
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
          {navigation.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + index * 0.06, duration: 0.4 }}
            >
              <NavLink
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-colors duration-300',
                    isActive
                      ? 'border-mint-300 bg-mint-50 text-mint-700 dark:border-mint-700 dark:bg-mint-900/50 dark:text-mint-200'
                      : 'border-line bg-surface/60 text-ink-soft hover:border-mint-300',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-xl',
                        isActive
                          ? 'bg-gradient-to-br from-mint-500 to-mint-400 text-white'
                          : 'bg-mist-100 text-ink-soft dark:bg-pine-900 dark:text-ink-soft',
                      )}
                    >
                      <Icon name={item.icon} size={17} strokeWidth={2} />
                    </span>
                    <span className="flex-1 font-display text-base font-semibold">{item.label}</span>
                    {isActive ? <span className="size-1.5 rounded-full bg-mint-500" /> : null}
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
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
          Chat {whatsapp.display}
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