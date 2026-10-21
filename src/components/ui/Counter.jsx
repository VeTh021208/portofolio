import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

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
 * Angka yang tersembul dari bawah dengan efek spring saat masuk layar.
 */
export function SpringCounter({ value, suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 90, damping: 18, mass: 0.8 })
  const text = useTransform(spring, (latest) => {
    const rounded = latest.toFixed(decimals)
    const [whole, fraction] = rounded.split('.')
    const wholeFormatted = Number(whole).toLocaleString('id-ID')
    return fraction ? `${wholeFormatted}.${fraction}` : wholeFormatted
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (reduced) {
      motionValue.set(value)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            motionValue.set(value)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [value, motionValue, reduced])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <motion.span>{text}</motion.span>
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