import { cn } from '@/lib/utils'

/**
 * Pita berjalan tanpa henti berisi daftar item.
 * Duplikat daftar agarEFEK looping tidak terlihat terputus.
 *
 * @param {object} props
 * Duplikat daftar agar efek looping tidak terlihat terputus.
 * @param {'left'|'right'} [props.direction] Arah gerakan
 * @param {number} [props.speed] Durasi satu putaran dalam detik
 * @param {boolean} [props.pauseOnHover] Jeda saat kursor di atas pita
 */
export function Marquee({
  items,
  direction = 'left',
  speed = 34,
  pauseOnHover = true,
  separator = '•',
  className = '',
  itemClassName = '',
}) {
  const looped = [...items, ...items, ...items, ...items]

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className="flex shrink-0 items-center gap-10 pr-10 will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `mint-marquee ${speed}s linear infinite`,
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          animationPlayState: pauseOnHover ? undefined : 'running',
        }}
      >
        {looped.map((item, index) => (
          <span
            // Indeks sengaja dipakai sebagai key karena teksnya berulang
            key={`${item}-${index}`}
            className={cn('flex shrink-0 items-center gap-10', itemClassName)}
          >
            {item}
            <span className="text-mint-400/70" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Pita berjalan dengan isi kartu, bukan teks polos */
export function MarqueeCards({ children, direction = 'left', speed = 46, className = '' }) {
  return (
    <div className={cn('group relative flex overflow-hidden py-2', className)}>
      <div
        className="flex shrink-0 items-stretch gap-6 pr-6 group-hover:[animation-play-state:paused]"
        style={{
          animation: `mint-marquee ${speed}s linear infinite`,
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-stretch gap-6" aria-hidden={copy === 1}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
