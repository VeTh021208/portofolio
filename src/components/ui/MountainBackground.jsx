import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/useUtils'
import { cn } from '@/lib/utils'

/**
 * Latar gunung berlapis yang bergerak parallax saat halaman digulir.
 * Lapisan paling belakang bergerak paling lambat, lapisan depan paling cepat.
 * Semua warna memakai variabel tema sehingga ikut berubah pada mode gelap.
 */
export function MountainBackground({ className = '', intensity = 1, showSun = true, showMist = true }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })

  const skyY = useTransform(smooth, [0, 1], ['0%', `${18 * intensity}%`])
  const farY = useTransform(smooth, [0, 1], ['0%', `${34 * intensity}%`])
  const midY = useTransform(smooth, [0, 1], ['0%', `${58 * intensity}%`])
  const nearY = useTransform(smooth, [0, 1], ['0%', `${88 * intensity}%`])
  const mistY = useTransform(smooth, [0, 1], ['0%', `${-12 * intensity}%`])
  const mistOpacity = useTransform(smooth, [0, 0.7, 1], [0.55, 0.3, 0.05])

  const style = (value) => (reduced ? undefined : { y: value })

  return (
    <div ref={ref} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {/* Langit dan cahaya matahari */}
      <motion.div className="absolute inset-0" style={style(skyY)}>
        <div className="absolute inset-0 bg-gradient-to-b from-mist-100 via-canvas to-surface dark:from-pine-950 dark:via-[#0a2019] dark:to-[#0c2620]" />
        <div className="absolute inset-0 bg-mist" />

        {showSun ? (
          <>
            <motion.div
              className="absolute top-[12%] right-[14%] size-40 rounded-full blur-2xl sm:size-56"
              style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-sun-300) 70%, transparent), transparent 70%)' }}
              animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute top-[14%] right-[16%] size-14 rounded-full bg-sun-300/70 blur-[2px] sm:size-16 dark:bg-sun-400/30" />
          </>
        ) : null}

        {/* Titik-titik far di langit */}
        <div className="absolute inset-0 opacity-40 dark:opacity-25">
          <Stars />
        </div>
      </motion.div>

      {/* Kabut bergerak */}
      {showMist ? (
        <motion.div className="absolute inset-x-0 top-[62%] h-48" style={{ y: reduced ? 0 : mistY, opacity: reduced ? 0.4 : mistOpacity }}>
          <MistBand />
        </motion.div>
      ) : null}

      {/* Gunung lapis: paling jauh */}
      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[34%] w-full" aria-hidden="true"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={style(farY)}
      >
        <defs>
          <linearGradient id="mg-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-sky-peak-300)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--color-sky-peak-200)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M0 300 L150 190 L250 250 L400 120 L520 220 L640 160 L780 260 L900 170 L1040 250 L1180 150 L1300 240 L1440 175 L1440 400 L0 400 Z"
          fill="url(#mg-far)"
        />
      </motion.svg>

      {/* Gunung lapis: menengah */}
      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[25%] w-full" aria-hidden="true"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={style(midY)}
      >
        <defs>
          <linearGradient id="mg-mid" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="var(--color-pine-400)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--color-pine-600)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M0 330 L180 240 L300 300 L430 200 L560 290 L700 225 L860 320 L1010 245 L1160 310 L1300 235 L1440 300 L1440 400 L0 400 Z"
          fill="url(#mg-mid)"
        />
        {/* Salju di puncak */}
        <path d="M430 200 L406 222 L428 216 L446 226 Z" fill="var(--color-surface)" opacity="0.75" />
        <path d="M1010 245 L992 262 L1008 258 L1026 266 Z" fill="var(--color-surface)" opacity="0.6" />
      </motion.svg>

      {/* Gunung lapis: dekat */}
      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[17%] w-full" aria-hidden="true"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={style(nearY)}
      >
        <defs>
          <linearGradient id="mg-near" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor="var(--color-mint-500)" stopOpacity="0.95" />
            <stop offset="1" stopColor="var(--color-pine-900)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M0 360 L140 300 L280 345 L420 285 L560 350 L700 300 L840 355 L980 295 L1120 345 L1260 290 L1440 340 L1440 400 L0 400 Z"
          fill="url(#mg-near)"
        />
      </motion.svg>

      {/* Lereng daun mint di paling depan */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[10%] w-full" aria-hidden="true"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mg-leaf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-mint-400)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--color-mint-600)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path d="M0 150 Q120 90 260 140 Q400 185 540 120 Q680 60 820 130 Q960 195 1100 120 Q1240 50 1440 130 L1440 200 L0 200 Z" fill="url(#mg-leaf)" />
      </svg>

      {/* Gradasi bawah agar gunung menyatu dengan latar halaman */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas via-canvas/85 to-transparent"
        aria-hidden="true"
      />

      {/* Butiran debu mint yang melayang */}
      <Motes />
    </div>
  )
}

/** Titik cahaya kecil di langit, dibuat deterministik agar tidak berkedip acak tiap render */
function Stars() {
  const dots = []
  let seed = 7
  for (let i = 0; i < 26; i += 1) {
    seed = (seed * 9301 + 49297) % 233280
    const x = (seed / 233280) * 100
    seed = (seed * 9301 + 49297) % 233280
    const y = (seed / 233280) * 55
    const size = 0.12 + ((seed / 233280) % 0.22)
    dots.push(
      <circle key={i} cx={`${x}%`} cy={`${y}%`} r={size} fill="var(--color-mint-400)" opacity={0.5} />,
    )
  }
  return <svg className="h-full w-full" aria-hidden="true">{dots}</svg>
}

/** Pita kabut lembut yang menutupi kaki gunung */
function MistBand() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1440 224" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="mg-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-surface)" stopOpacity="0" />
          <stop offset="0.55" stopColor="var(--color-surface)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--color-surface)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 130 Q180 96 360 124 Q540 150 720 118 Q900 86 1080 120 Q1260 154 1440 112 L1440 224 L0 224 Z"
        fill="url(#mg-mist)"
      />
    </svg>
  )
}

/** Butiran mint yang naik perlahan, memberi kesan udara segar */
function Motes() {
  const motes = []
  let seed = 41
  for (let i = 0; i < 14; i += 1) {
    seed = (seed * 9301 + 49297) % 233280
    const left = (seed / 233280) * 100
    seed = (seed * 9301 + 49297) % 233280
    const size = 4 + ((seed / 233280) * 10)
    seed = (seed * 9301 + 49297) % 233280
    const duration = 14 + ((seed / 233280) * 16)
    seed = (seed * 9301 + 49297) % 233280
    const delay = (seed / 233280) * 12

    motes.push(
      <motion.span
        key={i}
        className="absolute rounded-full bg-mint-300/60 blur-[1px] dark:bg-mint-400/30"
        style={{ left: `${left}%`, width: size, height: size }}
        animate={{ y: [0, -220, 0], opacity: [0, 0.75, 0], x: [0, 22, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      />,
    )
  }
  return <>{motes}</>
}

/**
 * Versi ringkas untuk halaman selain beranda.
 * Gunung hanya muncul di sisi bawah sebagai pemisah.
 */
export function MountainDivider({ className = '', flip = false }) {
  return (
    <div className={cn('pointer-events-none relative h-24 w-full overflow-hidden', className)} aria-hidden="true">
      <svg
        className={cn('absolute inset-0 h-full w-full', flip && 'rotate-180')}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mg-divider" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-mint-400)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--color-mint-500)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M0 60 Q180 20 360 58 Q540 92 720 50 Q900 12 1080 56 Q1260 96 1440 46 L1440 120 L0 120 Z" fill="url(#mg-divider)" />
      </svg>
    </div>
  )
}