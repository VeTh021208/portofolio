import { cn } from '@/lib/utils'

/**
 * Latar kertas seragam untuk seluruh halaman.
 * Meniru gaya layar preloader: kertas kusut (body::before) + screentone titik manga halus merata.
 */
export function PaperBackdrop({ className = '' }) {
  return (
    <div className={cn('pointer-events-none fixed inset-0 -z-10', className)} aria-hidden="true">
      {/* Screentone titik halus */}
      <div className="dot-grid absolute inset-0 opacity-70 dark:opacity-[0.1]" />
    </div>
  )
}
