import { AnimatePresence, motion } from 'motion/react'
import { CornerDownLeft, Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { quickLinks, whatsapp } from '@/data/siteData'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'
import { useLockBodyScroll } from '@/hooks/useUtils'
import { copyToClipboard, cn, fuzzyMatch } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

/**
 * Panel navigasi cepat yang dibuka dengan Ctrl+K atau Cmd+K.
 * Bisa mencari halaman, proyek, dan jasa sekaligus.
 */
export function CommandPalette({ open, onClose, projects = [] }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const toast = useToast()

  useLockBodyScroll(open)

  const items = useMemo(
    () => [
      ...quickLinks,
      ...projects.map((project) => ({
        id: `cmd-${project.id}`,
        label: project.title,
        hint: project.categoryLabel,
        href: `/dokumentasi/${project.slug}`,
        icon: 'FolderGit2',
        group: 'Proyek',
      })),
    ],
    [projects],
  )

  const results = useMemo(() => {
    if (!query.trim()) return items
    return items.filter((item) => fuzzyMatch(query.trim(), `${item.label} ${item.group} ${item.hint ?? ''}`))
  }, [items, query])

  const grouped = useMemo(() => {
    const map = new Map()
    results.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, [])
      map.get(item.group).push(item)
    })
    return [...map.entries()]
  }, [results])

  // Siapkan ulang saat dibuka
  useEffect(() => {
    if (!open) return undefined

    setQuery('')
    setCursor(0)
    const timer = setTimeout(() => inputRef.current?.focus(), 80)

    return () => clearTimeout(timer)
  }, [open])

  // Navigasi dengan keyboard
  useEffect(() => {
    if (!open) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setCursor((prev) => (results.length === 0 ? 0 : (prev + 1) % results.length))
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setCursor((prev) => (results.length === 0 ? 0 : (prev - 1 + results.length) % results.length))
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        const target = results[cursor]
        if (target) run(target)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cursor, results])

  useEffect(() => {
    setCursor(0)
  }, [query])

  const run = useCallback(
    (item) => {
      onClose()

      if (item.action === 'toggle-theme') {
        toggleTheme()
        toast.info('Tema ditukar')
        return
      }

      if (item.action === 'copy-wa') {
        copyToClipboard(whatsapp.display).then((ok) => {
          if (ok) toast.success('Nomor WhatsApp disalin')
          else toast.error('Gagal menyalin, salin manual ya')
        })
        return
      }

      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
        return
      }

      navigate(item.href)
    },
    [navigate, onClose, toast, toggleTheme],
  )

  // Jaga item aktif tetap terlihat
  useEffect(() => {
    const container = listRef.current
    const active = container?.querySelector('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  let flatIndex = -1

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Pencarian cepat"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-pine-950/45 backdrop-blur-md dark:bg-black/70"
            onClick={onClose}
            aria-label="Tutup pencarian"
            tabIndex={-1}
          />

          <motion.div
            className="glass-strong relative w-full max-w-xl overflow-hidden rounded-3xl shadow-[var(--shadow-float)]"
            initial={{ y: -18, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -12, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            {/* Kolom pencarian */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <Search size={19} className="shrink-0 text-mint-500" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari halaman, proyek, atau layanan..."
                className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
                aria-label="Ketik pencarian"
                autoComplete="off"
                spellCheck="false"
              />
              <kbd className="hidden shrink-0 rounded-md border border-line bg-canvas px-2 py-1 text-[0.65rem] font-semibold text-ink-muted sm:block">
                ESC
              </kbd>
            </div>

            {/* Hasil */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2.5">
              {results.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <p className="font-display text-base font-semibold">Tidak ada hasil</p>
                  <p className="mt-1 text-sm text-ink-muted">Coba kata kunci lain, misalnya produk atau dashboard.</p>
                </div>
              ) : (
                grouped.map(([group, groupItems]) => (
                  <div key={group} className="mb-1.5">
                    <p className="px-3 pt-2 pb-1.5 text-[0.65rem] font-bold tracking-[0.16em] text-ink-muted uppercase">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      flatIndex += 1
                      const index = flatIndex
                      const active = index === cursor

                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-active={active}
                          onMouseEnter={() => setCursor(index)}
                          onClick={() => run(item)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-150',
                            active ? 'bg-mint-50 dark:bg-mint-900/60' : 'hover:bg-canvas',
                          )}
                        >
                          <span
                            className={cn(
                              'grid size-9 shrink-0 place-items-center rounded-xl transition-colors',
                              active
                                ? 'bg-gradient-to-br from-mint-500 to-mint-400 text-white'
                                : 'bg-mist-100 text-ink-soft dark:bg-pine-900',
                            )}
                          >
                            <Icon name={item.icon} size={16} strokeWidth={2} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-ink">{item.label}</span>
                            {item.hint ? <span className="block truncate text-xs text-ink-muted">{item.hint}</span> : null}
                          </span>
                          {active ? <CornerDownLeft size={14} className="shrink-0 text-mint-500" /> : null}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Petunjuk */}
            <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 text-[0.68rem] text-ink-muted">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 font-semibold">↑</kbd>
                  <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 font-semibold">↓</kbd>
                  navigasi
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 font-semibold">Enter</kbd>
                  buka
                </span>
              </span>
              <span>{results.length} hasil</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}