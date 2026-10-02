import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const ToastContext = createContext(null)

const TONE_STYLES = {
  success: {
    badge: 'bg-mint-100 text-mint-700 border-mint-200 dark:bg-mint-900/60 dark:text-mint-200 dark:border-mint-800',
    bar: 'bg-mint-500',
    icon: CircleCheck,
  },
  error: {
    badge: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900',
    bar: 'bg-red-500',
    icon: CircleAlert,
  },
  info: {
    badge: 'bg-sky-peak-100 text-sky-peak-700 border-sky-peak-200 dark:bg-sky-peak-700/30 dark:text-sky-peak-200 dark:border-sky-peak-600/50',
    bar: 'bg-sky-peak-400',
    icon: Info,
  },
}

let nextId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback(
    (message, options = {}) => {
      const id = ++nextId
      const toast = { id, message, tone: options.tone ?? 'info', duration: options.duration ?? 3200 }

      setToasts((prev) => [...prev.slice(-2), toast])

      if (toast.duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), toast.duration),
        )
      }

      return id
    },
    [dismiss],
  )

  const toast = useMemo(
    () => ({
      show: push,
      success: (message, options) => push(message, { ...options, tone: 'success' }),
      error: (message, options) => push(message, { ...options, tone: 'error' }),
      info: (message, options) => push(message, { ...options, tone: 'info' }),
      dismiss,
    }),
    [push, dismiss],
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-20 z-[90] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:top-24 sm:items-end"
      role="region"
      aria-label="Notifikasi"
    >
      <AnimatePresence initial={false}>
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  const tone = TONE_STYLES[toast.tone] ?? TONE_STYLES.info
  const ToneIcon = tone.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 28, scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      role="status"
      aria-live="polite"
      className="glass-strong pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl shadow-[var(--shadow-float)]"
    >
      <div className="flex items-center gap-3 pr-3 pl-4 py-3">
        <span className={cn('grid size-9 shrink-0 place-items-center rounded-xl border', tone.badge)}>
          <ToneIcon size={18} strokeWidth={2} />
        </span>
        <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="grid size-7 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
          aria-label="Tutup notifikasi"
        >
          <X size={15} strokeWidth={2} />
        </button>
      </div>
      <motion.span
        className={cn('absolute inset-x-0 bottom-0 h-0.5', tone.bar)}
        initial={{ scaleX: 1, opacity: 0.9 }}
        animate={{ scaleX: 0, opacity: 0.9 }}
        transition={{ duration: (toast.duration || 3.2) / 1000, ease: 'easeInOut' }}
        style={{ originX: 0 }}
      />
    </motion.div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast harus dipakai di dalam ToastProvider')
  return context
}