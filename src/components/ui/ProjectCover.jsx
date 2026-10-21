import { cn } from '@/lib/utils'

/**
 * Ilustrasi sampul proyek digambar langsung sebagai SVG.
 * Advantages: tajam di semua ukuran layar, mengikuti warna tema,
 * tidak memerlukan berkas gambar dan tidak pernah gagal dimuat.
 */
const PALETTES = {
  mint: { base: 'var(--color-mint-100)', ink: 'var(--color-mint-700)', accent: 'var(--color-mint-500)', soft: 'var(--color-mint-300)' },
  sky: { base: 'var(--color-sky-peak-100)', ink: 'var(--color-sky-peak-700)', accent: 'var(--color-sky-peak-500)', soft: 'var(--color-sky-peak-300)' },
  sun: { base: 'var(--color-sun-200)', ink: 'var(--color-sun-600)', accent: 'var(--color-sun-500)', soft: 'var(--color-sun-400)' },
  pine: { base: 'var(--color-pine-100)', ink: 'var(--color-pine-800)', accent: 'var(--color-pine-600)', soft: 'var(--color-pine-300)' },
}

/** Ilustrasi tiap jenis proyek */
const SCENES = {
  marketplace: (p) => (
    <>
      <rect x="40" y="96" width="120" height="8" rx="4" fill={p.ink} opacity="0.25" />
      <rect x="40" y="116" width="76" height="6" rx="3" fill={p.ink} opacity="0.16" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 62}, 142)`}>
          <rect width="54" height="46" rx="9" fill="var(--color-surface)" opacity="0.95" />
          <circle cx="27" cy="19" r="10" fill={p.soft} opacity="0.8" />
          <rect x="12" y="34" width="30" height="4" rx="2" fill={p.ink} opacity="0.3" />
          <rect x="18" y="41" width="18" height="3" rx="1.5" fill={p.accent} opacity="0.65" />
        </g>
      ))}
      <rect x="40" y="206" width="178" height="34" rx="12" fill="var(--color-surface)" opacity="0.9" />
      <rect x="52" y="219" width="64" height="8" rx="4" fill={p.accent} opacity="0.7" />
      <rect x="164" y="216" width="42" height="14" rx="7" fill={p.accent} opacity="0.45" />
    </>
  ),
  health: (p) => (
    <>
      <path
        d="M40 168 L74 168 L86 138 L104 196 L122 158 L142 158 L152 168 L218 168"
        fill="none"
        stroke={p.accent}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="40" y="96" width="178" height="34" rx="12" fill="var(--color-surface)" opacity="0.92" />
      <circle cx="62" cy="113" r="10" fill={p.soft} />
      <rect x="80" y="107" width="90" height="6" rx="3" fill={p.ink} opacity="0.28" />
      <rect x="80" y="117" width="52" height="4" rx="2" fill={p.ink} opacity="0.16" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${40 + i * 46}, 206)`}>
          <rect width="38" height="30" rx="8" fill="var(--color-surface)" opacity="0.85" />
          <rect x="9" y="10" width="20" height="4" rx="2" fill={p.soft} opacity="0.9" />
          <rect x="9" y="18" width="12" height="3" rx="1.5" fill={p.ink} opacity="0.25" />
        </g>
      ))}
    </>
  ),
  hike: (p) => (
    <>
      <circle cx="196" cy="72" r="20" fill={p.soft} opacity="0.9" />
      <path d="M20 216 L86 116 L124 170 L152 128 L240 216 Z" fill={p.accent} opacity="0.28" />
      <path d="M86 116 L72 134 L85 129 L96 137 Z" fill="var(--color-surface)" opacity="0.92" />
      <path
        d="M50 216 C90 186 106 168 124 148 C142 128 160 108 186 84"
        fill="none"
        stroke={p.accent}
        strokeWidth="4"
        strokeDasharray="7 8"
        strokeLinecap="round"
      />
      <circle cx="186" cy="84" r="7" fill={p.accent} />
      <circle cx="186" cy="84" r="14" fill={p.accent} opacity="0.22" />
      <path d="M40 216 L240 216" stroke={p.ink} strokeWidth="2.5" opacity="0.2" strokeLinecap="round" />
    </>
  ),
  designsystem: (p) => (
    <>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => {
          const x = 40 + col * 62
          const y = 84 + row * 42
          const kind = (row + col) % 4
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="54"
              height="34"
              rx={kind === 0 ? '17' : '9'}
              fill="var(--color-surface)"
              opacity="0.92"
              stroke={kind === 0 ? p.accent : p.soft}
              strokeWidth={kind === 0 ? '4' : '0'}
            />
          )
        }),
      )}
      <rect x="40" y="60" width="118" height="7" rx="3.5" fill={p.ink} opacity="0.24" />
    </>
  ),
  analytics: (p) => (
    <>
      <rect x="40" y="70" width="178" height="104" rx="14" fill="var(--color-surface)" opacity="0.94" />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="52"
          y1={92 + i * 24}
          x2="206"
          y2={92 + i * 24}
          stroke={p.ink}
          strokeWidth="1"
          opacity="0.1"
        />
      ))}
      <path
        d="M52 152 L82 126 L104 138 L132 100 L158 116 L206 82"
        fill="none"
        stroke={p.accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52 152 L82 126 L104 138 L132 100 L158 116 L206 82 L206 174 L52 174 Z"
        fill={p.accent}
        opacity="0.12"
      />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 62}, 194)`}>
          <rect width="54" height="42" rx="10" fill="var(--color-surface)" opacity="0.9" />
          <rect x="10" y="12" width="24" height="7" rx="3.5" fill={p.accent} opacity="0.75" />
          <rect x="10" y="25" width="34" height="4" rx="2" fill={p.ink} opacity="0.2" />
        </g>
      ))}
    </>
  ),
  pos: (p) => (
    <>
      <path d="M96 56 L164 56 L176 92 L164 128 L96 128 L84 92 Z" fill="var(--color-surface)" opacity="0.95" />
      <rect x="104" y="76" width="52" height="5" rx="2.5" fill={p.ink} opacity="0.3" />
      <rect x="104" y="88" width="36" height="5" rx="2.5" fill={p.ink} opacity="0.2" />
      <rect x="104" y="100" width="44" height="5" rx="2.5" fill={p.accent} opacity="0.8" />
      <circle cx="188" cy="140" r="16" fill={p.soft} opacity="0.85" />
      <path d="M188 132 V148 M182 140 H194" stroke="var(--color-surface)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="72" cy="150" r="12" fill={p.accent} opacity="0.55" />
      <circle cx="54" cy="112" r="8" fill={p.soft} opacity="0.6" />
      <rect x="40" y="180" width="178" height="30" rx="12" fill="var(--color-surface)" opacity="0.9" />
      <rect x="52" y="191" width="58" height="8" rx="4" fill={p.ink} opacity="0.25" />
      <rect x="150" y="189" width="56" height="12" rx="6" fill={p.accent} opacity="0.6" />
    </>
  ),
  default: (p) => (
    <>
      <path d="M20 210 L94 118 L134 168 L164 124 L240 210 Z" fill={p.accent} opacity="0.3" />
      <circle cx="190" cy="76" r="18" fill={p.soft} />
      <rect x="40" y="64" width="90" height="7" rx="3.5" fill={p.ink} opacity="0.22" />
    </>
  ),
}

/**
 * @param {object} props
 * @param {string} props.cover Kunci scene, contoh: 'marketplace'
 * @param {'mint'|'sky'|'sun'|'pine'} [props.color] Palet warna
 * @param {number} [props.variant] Varian tampilan 0, 1, 2, dan seterusnya.
 *   Menggeser ilustrasi dan Wanted supaya tiap gambar galeri terlihat berbeda
 * @param {string} [props.className]
 */
export function ProjectCover({ cover = 'default', color = 'mint', variant = 0, className = '', label = '' }) {
  const palette = PALETTES[color] ?? PALETTES.mint
  const Scene = SCENES[cover] ?? SCENES.default

  // Varian menggeser isi agar tiap gambar galeri terlihat berbeda
  const shift = [-14, 10, 18][variant % 3] ?? 0
  const lift = [0, -26, -50][variant % 3] ?? 0
  const flip = variant % 2 === 1

  // Cermin horizontal dilakukan lewat matriks SVG, bukan properti CSS
  const sceneTransform = flip
    ? `translate(${260 - shift} ${lift}) scale(-1 1)`
    : `translate(${shift} ${lift})`

  return (
    <svg
      viewBox="0 0 260 260"
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ? `Ilustrasi ${label}` : 'Ilustrasi proyek'}
    >
      <rect width="260" height="260" fill={palette.base} />
      <circle
        cx={flip ? 220 : 40}
        cy={flip ? 36 : 46}
        r={flip ? 58 : 46}
        fill={palette.soft}
        opacity="0.35"
      />
      <circle
        cx={flip ? 28 : 236}
        cy={flip ? 224 : 218}
        r={flip ? 44 : 56}
        fill={palette.soft}
        opacity="0.22"
      />
      <g transform={sceneTransform}>
        <Scene {...palette} />
      </g>
    </svg>
  )
}

/**
 * Avatar SVG berbasis inisial dengan gradien mint.
 * Dipakai untuk foto profil dan foto testimoni.
 */
export function Avatar({ name = '', initials = '', size = 48, className = '', color = 'mint', rounded = 'rounded-full' }) {
  const palette = PALETTES[color] ?? PALETTES.mint
  const text = initials || name.slice(0, 2).toUpperCase()
  const fontSize = Math.max(14, size * 0.34)

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn(rounded, className)}
      role="img"
      aria-label={`Avatar ${name}`}
    >
      <defs>
        <linearGradient id={`av-${color}-${text}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.soft} />
          <stop offset="1" stopColor={palette.accent} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#av-${color}-${text})`} />
      <circle cx="24" cy="22" r="30" fill="#ffffff" opacity="0.16" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontFamily="Outfit Variable, Outfit, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="0.02em"
      >
        {text}
      </text>
    </svg>
  )
}