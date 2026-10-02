import { motion } from 'motion/react'
import { ArrowUpRight, Building2, Calendar, Check, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

import { buildWhatsAppLink } from '@/data/siteData'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { ProjectCover } from '@/components/ui/ProjectCover'

const COLOR_BADGE = {
  mint: 'badge-mint',
  sky: 'badge-sky',
  sun: 'badge-sun',
  pine: 'badge-pine',
}

const COLOR_RING = {
  mint: 'from-mint-500/25 to-mint-400/10',
  sky: 'from-sky-peak-500/25 to-sky-peak-400/10',
  sun: 'from-sun-500/25 to-sun-400/10',
  pine: 'from-pine-600/25 to-pine-400/10',
}

/**
 * Kartu proyek untuk grid dokumentasi dan daftar karya unggulan.
 * Seluruh kartu bisa diklik, dengan efek gambar membesar saat hover.
 */
export function ProjectCard({ project, index = 0 }) {
  const tone = project.color ?? 'mint'

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-soft)]',
        'card-hover',
      )}
    >
      <Link
        to={`/dokumentasi/${project.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`Lihat detail proyek ${project.title}`}
      >
        {/* Sampul */}
        <div className="relative h-52 overflow-hidden sm:h-56">
          <div className={cn('absolute inset-0 bg-gradient-to-br', COLOR_RING[tone])} />
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
            <ProjectCover cover={project.cover} color={tone} label={project.title} />
          </div>

          {/* Badge kategori */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            <span className={cn('badge', COLOR_BADGE[tone])}>{project.categoryLabel}</span>
            {project.featured ? (
              <span className="badge border-sun-400/60 bg-sun-400/90 text-[var(--color-pine-900)]">Unggulan</span>
            ) : null}
          </div>

          <span className="absolute top-4 right-4 rounded-full bg-surface/85 px-2.5 py-1 text-xs font-semibold text-ink-soft backdrop-blur-sm">
            {project.year}
          </span>

          {/* Gradasi bawah agar teks tetap terbaca */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
        </div>

        {/* Isi */}
        <div className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-bold transition-colors duration-300 group-hover:text-mint-600 dark:group-hover:text-mint-300">
                {project.title}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                <Building2 size={12} strokeWidth={2} />
                {project.client}
              </p>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-canvas text-ink-soft transition-all duration-400 group-hover:border-mint-400 group-hover:bg-mint-50 group-hover:text-mint-600 dark:group-hover:bg-mint-900/50 dark:group-hover:text-mint-300">
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-pretty text-sm leading-relaxed text-ink-soft">{project.summary}</p>

          {/* Hasil utama */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
            {project.results.slice(0, 3).map((result) => (
              <div key={result.metric} className="flex flex-col">
                <span className="font-display text-sm font-bold text-mint-600 dark:text-mint-300">{result.value}</span>
                <span className="text-[0.68rem] text-ink-muted">{result.label}</span>
              </div>
            ))}
          </div>

          {/* Tag teknologi */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-md bg-mist-100 px-2 py-1 text-[0.65rem] font-medium text-ink-muted dark:bg-pine-900">
                {tech}
              </span>
            ))}
            {project.stack.length > 4 ? (
              <span className="rounded-md bg-mist-100 px-2 py-1 text-[0.65rem] font-medium text-ink-muted dark:bg-pine-900">
                +{project.stack.length - 4}
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      {/* Kilau saat hover */}
      <span
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, color-mix(in srgb, var(--color-mint-300) 22%, transparent) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </motion.article>
  )
}

/**
 * Baris proyek ringkas untuk daftar di halaman beranda.
 */
export function ProjectRow({ project, index = 0 }) {
  const tone = project.color ?? 'mint'

  return (
    <motion.div
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/dokumentasi/${project.slug}`}
        className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3.5 transition-all duration-400 hover:-translate-y-1 hover:border-mint-300 hover:shadow-[var(--shadow-lift)] sm:gap-5 sm:p-4"
      >
        <div className={cn('relative size-16 shrink-0 overflow-hidden rounded-xl sm:size-20', COLOR_RING[tone])}>
          <ProjectCover cover={project.cover} color={tone} label={project.title} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={cn('badge text-[0.62rem]', COLOR_BADGE[tone])}>{project.categoryLabel}</span>
            <span className="text-[0.7rem] text-ink-muted">{project.year}</span>
          </div>
          <h3 className="mt-1.5 truncate font-display text-base font-bold transition-colors group-hover:text-mint-600 dark:group-hover:text-mint-300">
            {project.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-ink-soft">{project.summary}</p>
        </div>

        <ArrowUpRight
          size={18}
          className="mr-1 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mint-500"
          strokeWidth={2.2}
        />
      </Link>
    </motion.div>
  )
}

/**
 * Kartu ringkasan proyek untuk halaman detail.
 */
export function ProjectFacts({ project }) {
  const facts = [
    { icon: 'Building2', label: 'Klien', value: project.client },
    { icon: 'User', label: 'Peran', value: project.role },
    { icon: 'Calendar', label: 'Durasi', value: project.duration },
    { icon: 'MapPin', label: 'Tahun', value: project.year },
  ]

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {facts.map((fact) => (
        <li key={fact.label} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300">
            <Icon name={fact.icon} size={16} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-ink-muted uppercase">{fact.label}</p>
            <p className="truncate text-sm font-semibold text-ink">{fact.value}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Daftar poin fitur dengan tanda centang mint */
export function FeatureList({ items, className = '' }) {
  return (
    <ul className={cn('grid gap-2.5 sm:grid-cols-2', className)}>
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="flex items-start gap-2.5 text-sm text-ink-soft"
        >
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-700 dark:bg-mint-900 dark:text-mint-300">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className="text-pretty">{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

/** Tombol pesan via WhatsApp dengan pesan yang sudah terisi */
export function WhatsAppButton({ message, children = 'Pesan via WhatsApp', className = '', size = '' }) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('btn btn-primary', size, className)}
    >
      <Icon name="Whatsapp" size={17} />
      {children}
    </a>
  )
}

export { Calendar, Check, MapPin }