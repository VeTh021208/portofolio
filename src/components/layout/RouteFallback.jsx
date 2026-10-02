import { Icon } from '@/components/ui/Icon'

/** Tampilan sementara selagi halaman yang diminta sedang dimuat */
export function RouteFallback() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-5 py-24">
      {/* Gunung kecil beranimasi */}
      <svg viewBox="0 0 160 90" className="h-16 w-28" fill="none" aria-hidden="true">
        <path
          d="M6 82 L44 34 L64 56 L86 28 L128 82"
          stroke="var(--color-mint-500)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
        <path d="M6 82 L154 82" stroke="var(--color-sky-peak-400)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="132" cy="16" r="6" fill="var(--color-sun-400)" className="animate-pulse" />
      </svg>

      <div className="flex flex-col items-center gap-2">
        <p className="font-display text-base font-semibold">Sedang memuat halaman</p>
        <p className="text-sm text-ink-muted">Sebentar, hanya sebentar.</p>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="size-2 animate-bounce rounded-full bg-mint-400"
            style={{ animationDelay: `${index * 140}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

/** Placeholder kartu selagi daftar proyek dimuat */
export function CardSkeleton({ className = '' }) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-line bg-surface ${className}`}>
      <div className="shimmer h-48 w-full" />
      <div className="space-y-3 p-5">
        <div className="shimmer h-4 w-1/3 rounded-full" />
        <div className="shimmer h-5 w-4/5 rounded-full" />
        <div className="shimmer h-3 w-full rounded-full" />
        <div className="shimmer h-3 w-2/3 rounded-full" />
      </div>
    </div>
  )
}

/** Placeholder baris daftar */
export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
      <span className="shimmer size-12 shrink-0 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <span className="shimmer block h-4 w-1/2 rounded-full" />
        <span className="shimmer block h-3 w-3/4 rounded-full" />
      </div>
    </div>
  )
}

export { Icon }