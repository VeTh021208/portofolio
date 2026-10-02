import { cn } from '@/lib/utils'

/**
 * Bintang penilaian dengan bentuk terisi penuh.
 *
 * Dibuat sendiri, bukan memakai ikon Star bawaan pustaka ikon,
 * karena ikon tersebut memakai atribut fill="none" sehingga
 * menyetel ketebalan garis menjadi nol membuat bintang hilang total.
 */
const STAR_PATH =
  'M12 2.6l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 17.16l-5.7 2.98 1.09-6.35L2.78 9.3l6.37-.93L12 2.6Z'

/** Satu bintang */
export function Star({ size = 16, filled = true, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn('shrink-0', className)}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d={STAR_PATH}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  )
}

