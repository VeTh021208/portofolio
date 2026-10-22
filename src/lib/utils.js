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

/** Perbandingan string tanpa memandang besar kecil */
export function fuzzyMatch(needle, haystack) {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

/** Kelas warna kotak ikon berdasar nada warna pada data (mint/sky/sun/pine) */
const TONE_CLASSES = {
  mint: 'bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300',
  sky: 'bg-sky-peak-100 text-sky-peak-600 dark:bg-sky-peak-700/40 dark:text-sky-peak-200',
  sun: 'bg-sun-200 text-sun-600 dark:bg-sun-600/30 dark:text-sun-200',
  pine: 'bg-pine-100 text-pine-700 dark:bg-pine-900 dark:text-pine-200',
}

export function toneClass(color, fallback = TONE_CLASSES.mint) {
  return TONE_CLASSES[color] ?? fallback
}
