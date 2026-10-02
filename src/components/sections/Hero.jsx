import { motion } from 'motion/react'
import { ArrowRight, Download, Eye, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { buildWhatsAppLink, processSteps, site } from '@/data/siteData'
import { usePrefersReducedMotion } from '@/hooks/useUtils'
import { Icon } from '@/components/ui/Icon'
import { MountainBackground } from '@/components/ui/MountainBackground'

/**
 * Bagian pembuka beranda.
 * Latar gunung berlapis dengan parallax, headline ber-gradient,
 * dan deretan tombol aksi.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion()

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <MountainBackground />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Teks kiri */}
          <div className="max-w-2xl">
            {/* Status tersedia */}
            <motion.div {...rise(0.05)} className="inline-flex">
              <span className="badge badge-mint gap-2 py-1.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-500 opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
                </span>
                {site.availability.label}
              </span>
            </motion.div>

            {/* Nama dan peran */}
            <motion.p {...rise(0.14)} className="mt-6 text-sm font-semibold tracking-[0.2em] text-ink-muted uppercase">
              Halo, saya {site.shortName}
            </motion.p>

            <motion.h1 {...rise(0.2)} className="mt-3 text-balance text-[2.6rem] leading-[1.05] font-extrabold sm:text-6xl lg:text-[4.2rem]">
              <span className="text-gradient">Software Engineer</span>
              <br />
              <span className="text-ink">&amp; Creative Developer</span>
            </motion.h1>

            <motion.p {...rise(0.3)} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              {site.tagline} Saya membantu startup, UMKM, dan korporat membangun website, aplikasi, serta produk digital
              yang cepat, aksesibel, dan punya karakter.
            </motion.p>

            {/* Lokasi */}
            <motion.div {...rise(0.38)} className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} strokeWidth={2} />
                {site.location.full}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={15} strokeWidth={2} />
                {site.availability.detail}
              </span>
            </motion.div>

            {/* Tombol aksi */}
            <motion.div {...rise(0.46)} className="mt-9 flex flex-wrap items-center gap-3">
              <motion.a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon name="Whatsapp" size={18} />
                Mulai Diskusi Gratis
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
              </motion.a>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/dokumentasi" className="btn btn-outline group">
                  <Eye size={17} strokeWidth={2} />
                  Lihat Karya Saya
                </Link>
              </motion.div>

              <motion.a
                href="/cv-muhammad-raffi-ar-rasyid.pdf"
                download
                className="btn btn-ghost"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} strokeWidth={2} />
                Unduh CV
              </motion.a>
            </motion.div>

            {/* Kepercayaan */}
            <motion.div {...rise(0.56)} className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3">
              {[
                { value: '48+', label: 'Proyek' },
                { value: '32', label: 'Klien' },
                { value: '7 th', label: 'Pengalaman' },
                { value: '4.9/5', label: 'Rating' },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-extrabold text-mint-600 dark:text-mint-300">{item.value}</span>
                  <span className="text-xs font-medium text-ink-muted">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Kartu kanan */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <ProfileShowcase />
          </motion.div>
        </div>
      </div>

      {/* Petunjuk gulir ke bawah */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-2 rounded-full border border-line bg-surface/85 px-4 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur-md">
          <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink-muted uppercase">Gulir ke bawah</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            className="grid size-7 place-items-center rounded-full bg-mint-500 text-white"
          >
            <ArrowRight size={13} className="rotate-90" strokeWidth={2.4} />
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}

/**
 * Kartu profil berisi foto stilasi, Alive, dan speciality.
 * Semua digambar dengan SVG agar tajam di layar apa pun.
 */
function ProfileShowcase() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative">
      {/* Cahaya di belakang */}
      <div
        className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-mint-300) 70%, transparent), transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Kartu utama */}
      <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 shadow-[var(--shadow-float)]">
        {/* Mountain strip di dalam kartu */}
        <div className="relative mx-auto mb-6 w-40">
          <svg viewBox="0 0 200 90" className="w-full" aria-hidden="true">
            <defs>
              <linearGradient id="ps-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-sky-peak-300)" stopOpacity="0.75" />
                <stop offset="1" stopColor="var(--color-sky-peak-200)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="ps-near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-mint-500)" stopOpacity="0.95" />
                <stop offset="1" stopColor="var(--color-pine-800)" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <circle cx="164" cy="18" r="12" fill="var(--color-sun-400)" opacity="0.9" />
            <path d="M0 72 L44 32 L74 60 L104 26 L148 72 Z" fill="url(#ps-far)" />
            <path d="M44 32 L36 42 L44 39 L52 45 Z" fill="var(--color-surface)" opacity="0.85" />
            <path d="M104 26 L97 34 L104 31 L111 36 Z" fill="var(--color-surface)" opacity="0.7" />
            <path d="M0 84 L26 62 L58 80 L88 60 L124 80 L156 58 L200 82 L200 90 L0 90 Z" fill="url(#ps-near)" />
          </svg>
        </div>

        {/* Nama dan peran */}
        <div className="text-center">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">{site.name}</h2>
          <p className="mt-1 text-sm font-medium text-mint-600 dark:text-mint-300">{site.role}</p>
        </div>

        {/* Keahlian utama */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech, index) => (
            <motion.span
              key={tech}
              initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, type: 'spring', stiffness: 340, damping: 22 }}
              className="rounded-xl border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-ink-soft"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Garis pemisah */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

        {/* Proses singkat */}
        <ul className="space-y-2.5">
          {processSteps.slice(0, 3).map((step, index) => (
            <motion.li
              key={step.id}
              initial={reduced ? undefined : { opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300">
                <Icon name={step.icon} size={15} strokeWidth={2} />
              </span>
              <span className="flex-1 truncate text-sm font-medium text-ink-soft">{step.title}</span>
              <span className="text-[0.68rem] text-ink-muted">{step.step}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Kartu mengambang: pengalaman */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 24 }}
        className="absolute -top-6 -left-4 hidden rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-[var(--shadow-float)] backdrop-blur-sm sm:block"
      >
        <p className="font-display text-xl font-extrabold text-mint-600 dark:text-mint-300">7+</p>
        <p className="text-[0.68rem] font-medium text-ink-muted">Tahun pengalaman</p>
      </motion.div>

      {/* Kartu mengambang: proyek selesai */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.25, type: 'spring', stiffness: 260, damping: 24 }}
        className="absolute -top-5 -right-3 hidden rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-[var(--shadow-float)] backdrop-blur-sm sm:block"
      >
        <p className="font-display text-xl font-extrabold text-sky-peak-600 dark:text-sky-peak-300">48</p>
        <p className="text-[0.68rem] font-medium text-ink-muted">Proyek selesai</p>
      </motion.div>
    </div>
  )
}