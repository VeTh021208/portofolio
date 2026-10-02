import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { buildWhatsAppLink, helpers, site } from '@/data/siteData'
import { useSEO } from '@/hooks/useSEO'
import { useLockBodyScroll } from '@/hooks/useUtils'
import { cn } from '@/lib/utils'
import { CtaSection } from '@/components/sections/Common'
import { FeatureList, ProjectCard, ProjectFacts } from '@/components/ui/Cards'
import { Icon } from '@/components/ui/Icon'
import { ProjectCover } from '@/components/ui/ProjectCover'
import { Reveal } from '@/components/ui/Reveal'
import { MountainBackground } from '@/components/ui/MountainBackground'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = helpers.getProject(slug)

  useSEO({
    title: project ? project.title : 'Proyek tidak ditemukan',
    description: project?.summary ?? `Detail proyek ${site.name}.`,
    noindex: !project,
  })

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const stepLightbox = useCallback((delta) => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev + delta + project.gallery) % project.gallery))
  }, [project])

  useEffect(() => {
    if (!project) return undefined

    const onKey = (event) => {
      if (lightboxIndex === null) return
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') stepLightbox(1)
      if (event.key === 'ArrowLeft') stepLightbox(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, stepLightbox, project])

  if (!project) return <Navigate to="/dokumentasi" replace />

  const related = helpers.getRelatedProjects(project.id)

  return (
    <>
      <Hero project={project} onOpenGallery={() => setLightboxIndex(0)} />
      <ChallengeSolution project={project} />
      <ResultsSection project={project} />
      <StackSection project={project} />
      <GallerySection project={project} onOpen={setLightboxIndex} />
      <RelatedSection related={related} />
      <CtaSection />

      <Lightbox
        project={project}
        index={lightboxIndex}
        onClose={closeLightbox}
        onStep={stepLightbox}
      />
    </>
  )
}

function Hero({ project, onOpenGallery }) {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-36">
      <MountainBackground intensity={0.5} showMist={false} />
      <div className="container-page relative z-10">
        {/* Remah roti */}
        <nav aria-label="Remah roti" className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="transition-colors hover:text-mint-600">
            Beranda
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/dokumentasi" className="transition-colors hover:text-mint-600">
            Dokumentasi
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-ink">{project.title}</span>
        </nav>

        <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-mint">{project.categoryLabel}</span>
                <span className="badge badge-neutral">{project.year}</span>
                {project.featured ? <span className="badge badge-sun">Proyek Unggulan</span> : null}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-balance text-3xl font-extrabold sm:text-4xl lg:text-5xl">{project.title}</h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">{project.summary}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ExternalLink size={17} strokeWidth={2} />
                    Buka Situs
                  </a>
                ) : null}

                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <GithubIcon />
                    Lihat Repository
                  </a>
                ) : null}

                <a
                  href={buildWhatsAppLink(
                    `Halo Kak Raffi! Saya melihat proyek "${project.title}" di portofolio Anda dan ingin menanyakan detail teknisnya.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Tanya proyek ini
                </a>
              </div>
            </Reveal>
          </div>

          {/* Sampul besar */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-float)]">
              <div className="aspect-square w-full">
                <ProjectCover cover={project.cover} color={project.color} label={project.title} />
              </div>
              <button
                type="button"
                onClick={onOpenGallery}
                className="absolute right-4 bottom-4 rounded-full bg-surface/90 px-4 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-lift)] backdrop-blur-sm transition-colors hover:bg-mint-500 hover:text-white"
                aria-label="Buka galeri proyek"
              >
                Lihat {project.gallery} gambar
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <div className="mt-10">
            <ProjectFacts project={project} />
          </div>
        </Reveal>
      </div>
    </header>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

function Section({ label, title, children, className = '' }) {
  return (
    <section className={cn('relative py-16 sm:py-20', className)}>
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="badge badge-mint">{label}</span>
              <h2 className="mt-4 text-balance font-display text-2xl font-extrabold sm:text-3xl">{title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-pretty text-base leading-relaxed text-ink-soft">{children}</div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ChallengeSolution({ project }) {
  return (
    <>
      <Section label="Tantangan" title="Masalah yang Harus Saya Pecahkan">
        <p>{project.description}</p>

        <div className="rounded-3xl border border-sun-400/40 bg-sun-100/50 p-6 dark:bg-sun-600/15 dark:border-sun-500/40">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-sun-200 text-sun-600 dark:bg-sun-600/40 dark:text-sun-200">
              <Icon name="AlertCircle" size={17} strokeWidth={2} />
            </span>
            <h3 className="font-display text-base font-bold">Tantangan utama</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.challenge}</p>
        </div>

        <div className="rounded-3xl border border-mint-300 bg-mint-50/60 p-6 dark:bg-mint-900/40 dark:border-mint-700">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-mint-200 text-mint-700 dark:bg-mint-700 dark:text-mint-100">
              <Icon name="Sparkles" size={17} strokeWidth={2} />
            </span>
            <h3 className="font-display text-base font-bold">Solusi yang saya terapkan</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.solution}</p>
        </div>
      </Section>
    </>
  )
}

function ResultsSection({ project }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-30" aria-hidden="true" />
      <div className="container-page relative">
        <Reveal>
          <div className="text-center">
            <span className="badge badge-mint">Hasil</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-2xl font-extrabold sm:text-3xl">
              Dampak yang Terukur Setelah Peluncuran
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.results.map((result, index) => (
            <motion.div
              key={result.metric}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 text-center card-hover"
            >
              <span
                className="pointer-events-none absolute inset-x-0 -top-16 h-32 opacity-0 blur-2xl transition-opacity duration-600 group-hover:opacity-60"
                style={{ background: 'var(--color-mint-300)' }}
                aria-hidden="true"
              />
              <p className="relative font-display text-3xl font-extrabold text-gradient sm:text-4xl">{result.value}</p>
              <p className="relative mt-1.5 text-sm font-medium text-ink-soft">{result.label}</p>
              <p className="relative mt-2 text-[0.65rem] font-semibold tracking-[0.12em] text-ink-muted uppercase">
                {result.metric}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StackSection({ project }) {
  return (
    <Section label="Teknologi" title="Tumpukan Teknologi yang Digunakan">
      <FeatureList items={project.stack} />

      <div className="mt-6">
        <h3 className="text-sm font-bold text-ink">Fokus utama proyek</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="badge badge-neutral">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

function GallerySection({ project, onOpen }) {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Galeri Proyek</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Klik salah satu gambar untuk memperbesar. Gunakan tombol panah atau tombol keyboard untuk berpindah gambar.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: project.gallery }).map((_, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => onOpen(index)}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.09 }}
              whileHover={{ y: -5 }}
              className="group relative aspect-square overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-soft)]"
              aria-label={`Perbesar gambar ${index + 1} dari ${project.title}`}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <ProjectCover
                  cover={project.cover}
                  color={project.color}
                  variant={index}
                  label={`${project.title}, tampilan ${index + 1}`}
                />
              </div>
              <span className="absolute inset-0 bg-pine-950/0 transition-colors duration-400 group-hover:bg-pine-950/25" />
              <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100">
                Tampilan {index + 1}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedSection({ related }) {
  if (related.length === 0) return null

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Proyek Lainnya</h2>
            <Link to="/dokumentasi" className="btn btn-outline btn-sm group">
              Semua proyek
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <ProjectCard key={item.id} project={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Penampil gambar besar dengan navigasi keyboard */
function Lightbox({ project, index, onClose, onStep }) {
  useLockBodyScroll(index !== null)

  return (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          className="fixed inset-0 z-[105] flex flex-col items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri proyek ${project.title}`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-pine-950/80 backdrop-blur-md"
            onClick={onClose}
            aria-label="Tutup galeri"
            tabIndex={-1}
          />

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-float)]"
          >
            <div className="aspect-square w-full">
              <ProjectCover
                cover={project.cover}
                color={project.color}
                variant={index}
                label={`${project.title}, tampilan ${index + 1}`}
              />
            </div>
          </motion.div>

          {/* Navigasi */}
          {project.gallery > 1 ? (
            <>
              <button
                type="button"
                onClick={() => onStep(-1)}
                className="absolute left-3 z-20 grid size-11 place-items-center rounded-full bg-surface/90 text-ink shadow-[var(--shadow-float)] backdrop-blur-sm transition-transform hover:scale-110 sm:left-8"
                aria-label="Gambar sebelumnya"
              >
                <ArrowLeft size={19} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                className="absolute right-3 z-20 grid size-11 place-items-center rounded-full bg-surface/90 text-ink shadow-[var(--shadow-float)] backdrop-blur-sm transition-transform hover:scale-110 sm:right-8"
                aria-label="Gambar berikutnya"
              >
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 grid size-11 place-items-center rounded-full bg-surface/90 text-ink shadow-[var(--shadow-float)] backdrop-blur-sm transition-transform hover:scale-110 sm:top-8 sm:right-8"
            aria-label="Tutup galeri"
          >
            <X size={19} strokeWidth={2.4} />
          </button>

          {/* Indikator */}
          <div className="relative z-10 mt-5 flex items-center gap-3">
            <span className="text-sm font-medium text-white/90">
              {index + 1} / {project.gallery}
            </span>
            <span className="text-sm text-white/60">{project.title}</span>
          </div>

          {/* Titik indikator */}
          <div className="relative z-10 mt-3 flex gap-2">
            {Array.from({ length: project.gallery }).map((_, dot) => (
              <button
                key={dot}
                type="button"
                onClick={() => onStep(dot - index)}
                aria-label={`Ke gambar ${dot + 1}`}
                aria-current={dot === index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-400',
                  dot === index ? 'w-7 bg-mint-400' : 'w-1.5 bg-white/40 hover:bg-white/70',
                )}
              />
            ))}
          </div>

          <p className="relative z-10 mt-5 hidden text-xs text-white/50 sm:block">
            Tekan Esc untuk menutup, gunakan panah kiri dan kanan untuk berpindah gambar
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}