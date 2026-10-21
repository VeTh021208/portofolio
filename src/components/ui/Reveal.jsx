import { motion } from 'motion/react'

import { usePrefersReducedMotion } from '@/hooks/useUtils'

/**
 * Membungkus anak dengan animasi muncul saat masuk viewport.
 *
 * @param {object} props
 * @param {'up'|'down'|'left'|'right'|'none'} [props.direction] Arah gerak masuk
 * @param {number} [props.delay] Jeda dalam detik
 * @param {number} [props.duration] Durasi dalam detik
 * @param {number} [props.amount] Seberapa jauh elemen harus terlihat sebelum memicu
 */
const OFFSET = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  amount = 0.25,
  once = true,
  className = '',
  as = 'div',
  blur = true,
  ...rest
}) {
  const reduced = usePrefersReducedMotion()
  const offset = OFFSET[direction] ?? OFFSET.up
  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        filter: blur ? 'blur(6px)' : 'blur(0px)',
        scale: 0.985,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Judul bagian dengan label, garis aksen, dan animasi stagger.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? (
        <Reveal direction="none" duration={0.5}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <h2 className={`text-balance text-3xl font-bold sm:text-4xl lg:text-[2.75rem] ${titleClassName}`}>{title}</h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.16}>
          <p className="text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}

/** Label kecil di atas judul bagian */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-mint-200 bg-mint-50 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-mint-700 uppercase dark:border-mint-800 dark:bg-mint-900/50 dark:text-mint-300 ${className}`}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-mint-500" />
      </span>
      {children}
    </span>
  )
}