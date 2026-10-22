/**
 * Membuat berkas PDF placeholder satu halaman untuk tombol Unduh CV.
 * Struktur PDF ditulis manual supaya tidak perlu dependensi tambahan.
 * Jalankan: node scripts/make-cv.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const outDir = path.resolve('public')
fs.mkdirSync(outDir, { recursive: true })

const lines = [
  { text: 'MUHAMMAD RAFFI AR RASYID', size: 26, bold: true, gap: 8 },
  { text: 'Siswa & Web Developer', size: 13, bold: false, gap: 22 },
  { text: 'veth021208@gmail.com  |  +62 838-9864-5908  |  Bogor, Jawa Barat, Indonesia', size: 10, gap: 8 },
  { text: 'https://muhammadraffi.dev', size: 10, gap: 24 },
  { text: 'PROFIL', size: 12, bold: true, gap: 8 },
  {
    text: 'Siswa SMK AK Nusa Bangsa jurusan Rekayasa Perangkat Lunak yang mendalami web',
    size: 10,
  },
  { text: 'development lewat proyek nyata, mulai dari website sekolah sampai katalog UMKM.', size: 10 },
  { text: 'Sedang mempersiapkan diri untuk PKL dan terbuka untuk kolaborasi serta proyek kecil.', size: 10, gap: 22 },
  { text: 'KEAHLIAN', size: 12, bold: true, gap: 8 },
  { text: 'Frontend: HTML, CSS, JavaScript, React, Tailwind CSS', size: 10 },
  { text: 'Backend: PHP, MySQL, REST API sederhana', size: 10 },
  { text: 'Desain: Figma, Wireframe, Prototipe', size: 10 },
  { text: 'Tooling: Git, GitHub, Vite, Vercel, Hosting dan Domain', size: 10, gap: 22 },
  { text: 'PENGALAMAN DAN PENDIDIKAN', size: 12, bold: true, gap: 8 },
  { text: '2024 - Sekarang  SMK AK Nusa Bangsa - Jurusan Rekayasa Perangkat Lunak', size: 10, bold: true },
  { text: 'Fokus pada pemrograman web dan basis data, mengerjakan proyek sekolah dengan React dan PHP.', size: 10, gap: 14 },
  { text: '2026 - Sekarang  PKL / Magang Web Developer (rencana)', size: 10, bold: true },
  { text: 'Ingin belajar langsung dari tim profesional dan berkontribusi pada website yang dipakai nyata.', size: 10, gap: 14 },
  { text: '2025 - Sekarang  Freelance Web Developer', size: 10, bold: true },
  { text: 'Membuat landing page acara sekolah dan katalog produk UMKM dengan pesan via WhatsApp.', size: 10, gap: 14 },
  { text: '2024 - 2025  Proyek Sekolah dan Pribadi', size: 10, bold: true },
  { text: 'Aplikasi absensi berbasis web, website profil sekolah, dan latihan mandiri lewat GitHub.', size: 10, gap: 14 },
]

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 56
let y = PAGE_H - MARGIN

const escapeText = (value) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const contentParts = ['BT']
lines.forEach((line) => {
  y -= line.gap
  y -= line.size * 1.35
  const font = line.bold ? '/F2' : '/F1'
  contentParts.push(`${font} ${line.size} Tf`)
  contentParts.push('1 0 0 1 ' + MARGIN.toFixed(2) + ' ' + y.toFixed(2) + ' Tm')
  contentParts.push(`(${escapeText(line.text)}) Tj`)
})
contentParts.push('ET')

const content = contentParts.join('\n')

const objects = []
objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>'
objects[3] =
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' +
  PAGE_W +
  ' ' +
  PAGE_H +
  '] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>'
objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
objects[6] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((body, index) => {
  if (!body) return
  offsets[index] = pdf.length
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
})

const xrefStart = pdf.length
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let i = 1; i <= objects.length; i += 1) {
  pdf += String(offsets[i] ?? 0).padStart(10, '0') + ' 00000 n \n'
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

const outFile = path.join(outDir, 'cv-muhammad-raffi-ar-rasyid.pdf')
fs.writeFileSync(outFile, pdf, 'latin1')
console.log('Dibuat: ' + outFile + ' (' + pdf.length + ' byte)')