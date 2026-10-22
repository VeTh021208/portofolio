import { motion } from 'motion/react'

import { useCountUp, usePrefersReducedMotion } from '@/hooks/useUtils'
import { cn } from '@/lib/utils'

/**
 * Angka statistik yang menghitung naik saat elemen terlihat.
 */
export function Counter({ value, suffix = '', prefix = '', decimals = 0, duration = 1800, className = '' }) {
  const { ref, display } = useCountUp(value, { duration, decimals })

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/**
 * Lanjang garis persentase yang tumbuh saat elemen terlihat.
 */
export function ProgressBar({ value, className = '', barClassName = '', delay = 0 }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-mist-200 dark:bg-pine-900', className)}>
      <motion.div
        className={cn('h-full rounded-full bg-gradient-to-r from-mint-500 via-mint-400 to-sky-peak-400', barClassName)}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduced ? 0 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}