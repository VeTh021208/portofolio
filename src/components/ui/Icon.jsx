import { BrandIcon } from './BrandIcons'
import { iconMap } from './icons'

/**
 * Komponen ikon yang menerima nama ikon sebagai string.
 * Dipakai supaya file data bisa menulis `icon: 'Rocket'` tanpa import.
 *
 * Peta ikon diambil dari daftar(curated) pada icons.js,
 * bukan wildcard, supaya hanya ikon yang dipakai yang ikut ke bundel.
 */

/**
 * @param {object} props
 * @param {string} props.name Nama ikon, contoh: 'Rocket'
 * @param {number} [props.size] Ukuran ikon dalam piksel
 * @param {number} [props.strokeWidth] Ketebalan garis ikon
 * @param {string} [props.color] Warna ikon, mewarisi warna teks bila diisi
 */
export function Icon({ name, size = 20, strokeWidth = 1.8, color, className = '', ...rest }) {
  if (!name) return null

  // Coba ikon brand lebih dulu
  if (brandIconNames.includes(name)) {
    return (
      <BrandIcon
        name={name}
        width={size}
        height={size}
        className={className}
        style={color ? { color } : undefined}
        {...rest}
      />
    )
  }

  const LucideIcon = iconMap[name]

  if (!LucideIcon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={color ? { color } : undefined}
        aria-hidden="true"
        {...rest}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    )
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      style={color ? { color } : undefined}
      aria-hidden="true"
      {...rest}
    />
  )
}

/** Nama ikon yang memakai SVG brand buatan sendiri */
const brandIconNames = ['Instagram', 'Linkedin', 'Github', 'Youtube', 'Twitter', 'Music2', 'Tiktok', 'Facebook', 'Whatsapp']

export default Icon