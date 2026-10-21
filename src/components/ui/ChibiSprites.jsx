import { useMemo } from 'react'

import { cn } from '@/lib/utils'

/**
 * Kumpulan chibi SVG bergaya anime cel-shading.
 * Semua digambar tangan di kode: outline tinta, warna datar dengan bayangan keras.
 */

const INK = 'var(--color-ink)'

const SPRITES = [ChibiMelambai, ChibiDuduk, ChibiLompat]

/**
 * Sebaran partikel chibi deterministik (seed LCG).
 * Posisi tetap di viewport; gerakan orbit lingkaran pelan lewat CSS keyframes
 * (`.chibi-float`) — ringan karena dijalankan di compositor.
 */
function makeChibiParticles(count) {
  const list = []
  let seed = 97

  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: i,
      Sprite: SPRITES[i % SPRITES.length],
      left: 5 + rand() * 86,
      top: 6 + rand() * 78,
      size: 24 + rand() * 14,
      opacity: 0.4 + rand() * 0.25,
      radius: 24 + rand() * 24,
      duration: 16 + rand() * 14,
      delay: rand() * 20,
      reverse: rand() > 0.5,
      mobileHidden: i % 2 === 0,
    })
  }

  return list
}

/**
 * Ladang chibi: 12 chibi tersebar statis, tiap chibi mengorbit pelan
 * di tempat sambil berputar halus. Fixed layer, di belakang konten.
 */
export function ChibiFloatField({ count = 12 }) {
  const particles = useMemo(() => makeChibiParticles(count), [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map(({ id, Sprite, left, top, size, opacity, radius, duration, delay, reverse, mobileHidden }) => (
        <div
          key={id}
          className={cn('chibi-float absolute', reverse && 'chibi-float--rev', mobileHidden && 'hidden md:block')}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            opacity,
            '--orbit-r': `${Math.round(radius)}px`,
            animationDuration: `${duration.toFixed(1)}s`,
            animationDelay: `-${delay.toFixed(1)}s`,
          }}
        >
          <Sprite />
        </div>
      ))}
    </div>
  )
}

/** Chibi berambut sakura sedang melambai */
export function ChibiMelambai({ className = '' }) {
  return (
    <svg viewBox="0 0 120 148" className={cn('h-auto w-full', className)} aria-hidden="true">
      {/* Rambut belakang */}
      <path
        d="M60 14 C30 14 24 42 26 64 C28 86 34 98 40 102 L80 102 C86 98 92 86 94 64 C96 42 90 14 60 14 Z"
        fill="#F09BB2"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Kaki */}
      <rect x="48" y="118" width="11" height="16" rx="4" fill="#242749" stroke={INK} strokeWidth="2.5" />
      <rect x="62" y="118" width="11" height="16" rx="4" fill="#242749" stroke={INK} strokeWidth="2.5" />
      {/* Sepatu */}
      <rect x="44" y="130" width="16" height="9" rx="4" fill="#C93E62" stroke={INK} strokeWidth="2.5" />
      <rect x="60" y="130" width="16" height="9" rx="4" fill="#C93E62" stroke={INK} strokeWidth="2.5" />
      {/* Badan hoodie */}
      <path
        d="M44 82 L39 118 C39 125 46 129 60 129 C74 129 81 125 81 118 L76 82 Z"
        fill="#4D539A"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Bayangan keras hoodie */}
      <path d="M60 82 L76 82 L81 118 C81 125 74 129 60 129 Z" fill="#3F4480" opacity="0.85" />
      {/* Tangan kanan melambai */}
      <path d="M45 88 L27 66" stroke="#4D539A" strokeWidth="10" strokeLinecap="round" />
      <path d="M45 88 L27 66" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0" />
      <circle cx="25" cy="62" r="7" fill="#FBDFC8" stroke={INK} strokeWidth="2.5" />
      {/* Tangan kiri */}
      <path d="M76 88 L86 106" stroke="#4D539A" strokeWidth="10" strokeLinecap="round" />
      <circle cx="88" cy="109" r="6.5" fill="#FBDFC8" stroke={INK} strokeWidth="2.5" />
      {/* Kepala */}
      <ellipse cx="60" cy="48" rx="31" ry="29" fill="#FBDFC8" stroke={INK} strokeWidth="3" />
      {/* Poni */}
      <path
        d="M30 46 C30 20 46 10 60 10 C74 10 90 20 90 46 C84 36 78 52 70 44 C62 36 54 52 46 44 C40 38 34 40 30 46 Z"
        fill="#F09BB2"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Highlight rambut */}
      <ellipse cx="48" cy="24" rx="11" ry="5" fill="#FBD5DF" opacity="0.9" />
      {/* Mata */}
      <ellipse cx="47" cy="52" rx="5.2" ry="7.2" fill={INK} />
      <ellipse cx="73" cy="52" rx="5.2" ry="7.2" fill={INK} />
      <circle cx="45.2" cy="49" r="2" fill="#FFF" />
      <circle cx="71.2" cy="49" r="2" fill="#FFF" />
      {/* Pipi */}
      <ellipse cx="40" cy="60" rx="4.5" ry="2.6" fill="#F09BB2" opacity="0.85" />
      <ellipse cx="80" cy="60" rx="4.5" ry="2.6" fill="#F09BB2" opacity="0.85" />
      {/* Mulut */}
      <path d="M56 63 Q60 67.5 64 63" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Chibi berambut indigo duduk sambil membuka laptop */
export function ChibiDuduk({ className = '' }) {
  return (
    <svg viewBox="0 0 128 140" className={cn('h-auto w-full', className)} aria-hidden="true">
      {/* Rambut belakang */}
      <path
        d="M62 14 C34 14 28 40 30 60 C32 78 38 88 44 92 L82 92 C88 88 94 78 96 60 C98 40 92 14 62 14 Z"
        fill="#7E86C5"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Kaki duduk */}
      <path
        d="M44 104 L28 112 C24 114 24 120 28 122 L48 124"
        stroke="#242749"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44 104 L28 112 C24 114 24 120 28 122 L48 124"
        stroke={INK}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0"
      />
      <ellipse cx="26" cy="120" rx="8" ry="6" fill="#DE5578" stroke={INK} strokeWidth="2.5" />
      {/* Badan */}
      <path
        d="M46 82 L42 108 C42 114 50 118 64 118 C78 118 86 114 86 108 L80 82 Z"
        fill="#DE5578"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M64 82 L80 82 L86 108 C86 114 78 118 64 118 Z" fill="#C93E62" opacity="0.85" />
      {/* Tangan memegang laptop */}
      <path d="M48 90 L42 104" stroke="#DE5578" strokeWidth="9" strokeLinecap="round" />
      <path d="M80 90 L86 104" stroke="#DE5578" strokeWidth="9" strokeLinecap="round" />
      {/* Laptop */}
      <path d="M46 102 L50 86 L84 86 L88 102 Z" fill="#C6CBEA" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="40" y="102" width="52" height="7" rx="3" fill="#3B352C" stroke={INK} strokeWidth="2.5" />
      <path d="M54 91 L78 91" stroke="#6672C6" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 96 L70 96" stroke="#6672C6" strokeWidth="2" strokeLinecap="round" />
      {/* Kepala */}
      <ellipse cx="63" cy="48" rx="30" ry="28" fill="#FBDFC8" stroke={INK} strokeWidth="3" />
      {/* Poni samping */}
      <path
        d="M33 44 C34 18 50 10 64 10 C80 10 94 20 93 46 C88 36 84 50 76 42 C68 34 60 48 52 42 C44 36 38 40 33 44 Z"
        fill="#7E86C5"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="52" cy="22" rx="11" ry="5" fill="#C6CBEA" opacity="0.9" />
      {/* Mata senang tertutup */}
      <path d="M42 52 Q48.5 46 55 52" stroke={INK} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M71 52 Q77.5 46 84 52" stroke={INK} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Pipi */}
      <ellipse cx="41" cy="60" rx="4.5" ry="2.6" fill="#F09BB2" opacity="0.85" />
      <ellipse cx="85" cy="60" rx="4.5" ry="2.6" fill="#F09BB2" opacity="0.85" />
      {/* Mulut kecil */}
      <path d="M59 62 Q63 66 67 62" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Chibi berambut mustard melompat dengan tanda tangan peace */
export function ChibiLompat({ className = '' }) {
  return (
    <svg viewBox="0 0 120 148" className={cn('h-auto w-full', className)} aria-hidden="true">
      {/* Sparkle di sekitar */}
      <path d="M14 22 L14 32 M9 27 L19 27" stroke="#D5A833" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M104 14 L104 22 M100 18 L108 18" stroke="#DE5578" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 84 L108 92 M104 88 L112 88" stroke="#6672C6" strokeWidth="2.5" strokeLinecap="round" />
      {/* Rambut belakang */}
      <path
        d="M58 16 C28 16 22 44 24 64 C26 82 32 92 38 96 L78 96 C84 92 90 82 92 64 C94 44 88 16 58 16 Z"
        fill="#EFD486"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Kaki melompat (menekuk) */}
      <path d="M50 112 L40 128" stroke="#242749" strokeWidth="10" strokeLinecap="round" />
      <path d="M70 112 L82 126" stroke="#242749" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="38" cy="132" rx="8" ry="6" fill="#6672C6" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="84" cy="130" rx="8" ry="6" fill="#6672C6" stroke={INK} strokeWidth="2.5" />
      {/* Badan kaos */}
      <path
        d="M42 80 L38 112 C38 118 46 122 59 122 C72 122 80 118 80 112 L76 80 Z"
        fill="#8390DB"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M59 80 L76 80 L80 112 C80 118 72 122 59 122 Z" fill="#6672C6" opacity="0.85" />
      {/* Garis kaos */}
      <path d="M50 80 L59 90 L68 80" stroke={INK} strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      {/* Tangan kiri peace sign */}
      <path d="M44 86 L28 68" stroke="#8390DB" strokeWidth="9" strokeLinecap="round" />
      <circle cx="25" cy="64" r="7" fill="#FBDFC8" stroke={INK} strokeWidth="2.5" />
      <path d="M22 62 L18 52 M28 62 L32 52" stroke="#FBDFC8" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 62 L18 52 M28 62 L32 52" stroke={INK} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.55" />
      {/* Tangan kanan naik */}
      <path d="M75 86 L90 66" stroke="#8390DB" strokeWidth="9" strokeLinecap="round" />
      <circle cx="93" cy="62" r="7" fill="#FBDFC8" stroke={INK} strokeWidth="2.5" />
      {/* Kepala */}
      <ellipse cx="59" cy="50" rx="30" ry="28" fill="#FBDFC8" stroke={INK} strokeWidth="3" />
      {/* Poni */}
      <path
        d="M29 48 C29 22 45 12 59 12 C73 12 89 22 89 48 C83 38 77 54 69 46 C61 38 53 54 45 46 C39 40 33 42 29 48 Z"
        fill="#EFD486"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="48" cy="26" rx="11" ry="5" fill="#FBF3DC" opacity="0.95" />
      {/* Mata semangat */}
      <ellipse cx="46" cy="54" rx="5.2" ry="7.2" fill={INK} />
      <ellipse cx="72" cy="54" rx="5.2" ry="7.2" fill={INK} />
      <circle cx="44.2" cy="51" r="2" fill="#FFF" />
      <circle cx="70.2" cy="51" r="2" fill="#FFF" />
      {/* Pipi */}
      <ellipse cx="39" cy="62" rx="4.5" ry="2.6" fill="#F09BB2" opacity="0.85" />
      <ellipse cx="79" cy="62" rx="4.5" ry="2.6" fill="#F09BB2" opacity="0.85" />
      {/* Mulut terbuka senang */}
      <path d="M53 65 Q59 72 65 65 Z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
