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
  { text: 'Software Engineer & Creative Developer', size: 13, bold: false, gap: 22 },
  { text: 'veth021208@gmail.com  |  +62 812-3456-7890  |  Bogor, Jawa Barat, Indonesia', size: 10, gap: 8 },
  { text: 'https://muhammadraffi.dev', size: 10, gap: 24 },
  { text: 'PROFIL', size: 12, bold: true, gap: 8 },
  {
    text: 'Software engineer dan creative developer dengan 7 tahun pengalaman membangun',
    size: 10,
  },
  { text: 'website, aplikasi web, serta produk digital yang cepat, aksesibel, dan kuat', size: 10 },
  { text: 'secara visual. Fokus pada performa, aksesibilitas, dan pengalaman pengguna.', size: 10, gap: 22 },
  { text: 'KEAHLIAN', size: 12, bold: true, gap: 8 },
  { text: 'Frontend: React, Next.js, TypeScript, Tailwind CSS, Motion', size: 10 },
  { text: 'Backend: Node.js, PostgreSQL, MongoDB, REST, GraphQL', size: 10 },
  { text: 'Desain: Figma, Design System, Riset UI/UX', size: 10 },
  { text: 'DevOps: Git, GitHub Actions, Docker, Vercel, Vitest', size: 10, gap: 22 },
  { text: 'PENGALAMAN', size: 12, bold: true, gap: 8 },
  { text: '2023 - Sekarang  Lead Frontend Engineer, Nusantara Digital Studio', size: 10, bold: true },
  { text: 'Memimpin tim frontend 6 engineer untuk platform SaaS dengan 40.000 pengguna.', size: 10, gap: 14 },
  { text: '2021 - 2023  Full-Stack Developer, TechBridge Labs', size: 10, bold: true },
  { text: 'Membangun 12 aplikasi web untuk klien ritel dan keuangan.', size: 10, gap: 14 },
  { text: '2020 - 2021  Junior Web Developer, Kreasi Debu Digital', size: 10, bold: true },
  { text: 'Menyelesaikan lebih dari 20 website klien di agency lokal.', size: 10, gap: 22 },
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