/**
 * Gabungan className tanpa dependensi tambahan.
 * Menghapus nilai falsy dan menyaring class duplikat.
 */
export function cn(...inputs) {
  const classes = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const inner = cn(...input)
      if (inner) classes.push(inner)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return [...new Set(classes.join(' ').split(/\s+/).filter(Boolean))].join(' ')
}

/** Format angka dengan pemisah ribuan gaya Indonesia */
export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** Potong teks panjang dan tambahkan elipsis */
export function truncate(text, length = 120) {
  if (!text || text.length <= length) return text
  return `${text.slice(0, length).trimEnd()}...`
}

/** Ambil inisial dari nama */
export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

/** Bangun query class dari nilai acak, supaya Tailwind ikut menghasilkan CSS */
export function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/** Salin teks ke clipboard dengan fallback untuk browser lama */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* lanjut ke fallback */
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

/** Kunci scroll body saat modal atau menu terbuka */
export function lockBodyScroll(locked) {
  if (typeof document === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  if (locked) {
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}

/** Kembalikan nilai sebelumnya dalam rentang tertentu */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/** Perbandingan string tanpa memandang besar kecil */
export function fuzzyMatch(needle, haystack) {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}
