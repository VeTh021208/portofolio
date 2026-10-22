import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { buildWhatsAppLink, helpers } from '@/data/siteData'
import { useLockBodyScroll } from '@/hooks/useUtils'
import { cn } from '@/lib/utils'
import { FeatureList, ProjectCard, ProjectFacts } from '@/components/ui/Cards'
import { Icon } from '@/components/ui/Icon'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { ProjectCover } from '@/components/ui/ProjectCover'

/**
 * Modal detail proyek — menggantikan halaman /dokumentasi/:slug.
 * Bisa berpindah ke proyek lain lewat bagian "Proyek lainnya".
 */
export function ProjectModal({ project, onClose, onOpenProject }) {
  const [lightbox, setLightbox] = useState(null)

  const lightboxOpen = lightbox && project && lightbox.projectId === project.id ? lightbox.index : null

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const openLightbox = useCallback((index) => setLightbox({ projectId: project?.id, index }), [project?.id])
  const stepLightbox = useCallback(
    (delta) => {
      setLightbox((prev) => {
        if (!prev) return prev
        return { ...prev, index: (prev.index + delta + project.gallery) % project.gallery }
      })
    },
    [project],
  )

  useLockBodyScroll(project !== null)

  // Gulir ke atas konten modal saat proyek berganti
  useEffect(() => {
    document.getElementById('project-modal-scroll')?.scrollTo({ top: 0 })
  }, [project?.id])

  useEffect(() => {
    if (!project) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (lightboxOpen !== null) closeLightbox()
        else onClose()
        return
      }
      if (lightboxOpen === null) return
      if (event.key === 'ArrowRight') stepLightbox(1)
      if (event.key === 'ArrowLeft') stepLightbox(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, lightboxOpen, closeLightbox, stepLightbox, onClose])

  const related = project ? helpers.getRelatedProjects(project.id) : []

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Detail proyek ${project.title}`}
        >
          <button
            type="button"
            className="fixed inset-0 cursor-default bg-pine-950/60 backdrop-blur-md dark:bg-black/70"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            tabIndex={-1}
          />

          {/* Tombol tutup — selalu terlihat di pojok layar */}
          <button
            type="button"
            onClick={onClose}
            className="fixed top-5 right-5 z-[115] grid size-11 place-items-center rounded-full bg-surface/90 text-ink shadow-[var(--shadow-lift)] backdrop-blur-sm transition-transform hover:scale-110"
            aria-label="Tutup detail proyek"
          >
            <X size={19} strokeWidth={2.4} />
          </button>

          <motion.div
            id="project-modal-scroll"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[var(--shadow-float)]"
          >
            <div className="px-6 pt-8 pb-10 sm:px-10">
              {/* Kepala */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-mint">{project.categoryLabel}</span>
                <span className="badge badge-neutral">{project.year}</span>
                {project.featured ? <span className="badge badge-sun">Proyek Unggulan</span> : null}
              </div>

              <h2 className="mt-4 text-balance font-display text-2xl font-extrabold sm:text-3xl">{project.title}</h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-ink-soft">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.live ? (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    <ExternalLink size={16} strokeWidth={2} />
                    Buka Situs
                  </a>
                ) : null}

                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                    <GithubIcon width={16} height={16} />
                    Lihat Repository
                  </a>
                ) : null}

                <a
                  href={buildWhatsAppLink(
                    `Halo Kak Raffi! Saya melihat proyek "${project.title}" di portofolio Anda dan ingin menanyakan detail teknisnya.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  Tanya proyek ini
                </a>
              </div>

              {/* Sampul */}
              <div className="relative mt-8 overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-soft)]">
                <div className="aspect-video w-full sm:aspect-[2/1]">
                  <ProjectCover cover={project.cover} color={project.color} label={project.title} />
                </div>
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  className="absolute right-4 bottom-4 rounded-full bg-surface/90 px-4 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-lift)] backdrop-blur-sm transition-colors hover:bg-mint-500 hover:text-white"
                  aria-label="Buka galeri proyek"
                >
                  Lihat {project.gallery} gambar
                </button>
              </div>

              <div className="mt-8">
                <ProjectFacts project={project} />
              </div>

              {/* Tantangan dan solusi */}
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div>
                  <span className="badge badge-mint">Tantangan</span>
                  <h3 className="mt-3 font-display text-lg font-bold">Masalah yang Harus Saya Pecahkan</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">{project.description}</p>

                  <div className="mt-5 rounded-3xl border border-sun-400/40 bg-sun-100/50 p-5 dark:border-sun-500/40 dark:bg-sun-600/15">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-xl bg-sun-200 text-sun-600 dark:bg-sun-600/40 dark:text-sun-200">
                        <Icon name="AlertCircle" size={17} strokeWidth={2} />
                      </span>
                      <h4 className="font-display text-base font-bold">Tantangan utama</h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.challenge}</p>
                  </div>
                </div>

                <div>
                  <span className="badge badge-mint">Solusi</span>
                  <h3 className="mt-3 font-display text-lg font-bold">Yang Saya Terapkan</h3>
                  <div className="mt-5 rounded-3xl border border-mint-300 bg-mint-50/60 p-5 dark:border-mint-700 dark:bg-mint-900/40">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-xl bg-mint-200 text-mint-700 dark:bg-mint-700 dark:text-mint-100">
                        <Icon name="Sparkles" size={17} strokeWidth={2} />
                      </span>
                      <h4 className="font-display text-base font-bold">Solusi yang saya terapkan</h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.solution}</p>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-sm font-bold text-ink">Fokus utama proyek</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="badge badge-neutral">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hasil */}
              <div className="mt-10">
                <span className="badge badge-mint">Hasil</span>
                <h3 className="mt-3 font-display text-lg font-bold">Dampak yang Terukur Setelah Peluncuran</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={result.metric}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-3xl border border-line bg-surface p-5 text-center"
                    >
                      <p className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">{result.value}</p>
                      <p className="mt-1.5 text-sm font-medium text-ink-soft">{result.label}</p>
                      <p className="mt-1.5 text-[0.65rem] font-semibold tracking-[0.12em] text-ink-muted uppercase">
                        {result.metric}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Teknologi */}
              <div className="mt-10">
                <span className="badge badge-mint">Teknologi</span>
                <h3 className="mt-3 font-display text-lg font-bold">Tumpukan Teknologi yang Digunakan</h3>
                <div className="mt-4">
                  <FeatureList items={project.stack} />
                </div>
              </div>

              {/* Galeri */}
              <div className="mt-10">
                <h3 className="font-display text-lg font-bold">Galeri Proyek</h3>
                <p className="mt-1.5 text-sm text-ink-soft">
                  Klik salah satu gambar untuk memperbesar. Gunakan panah kiri dan kanan untuk berpindah.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {Array.from({ length: project.gallery }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openLightbox(index)}
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
                    </button>
                  ))}
                </div>
              </div>

              {/* Proyek lainnya */}
              {related.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-display text-lg font-bold">Proyek Lainnya</h3>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((item, index) => (
                      <ProjectCard key={item.id} project={item} index={index} onOpen={onOpenProject} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>

          <Lightbox project={project} index={lightboxOpen} onClose={closeLightbox} onStep={stepLightbox} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/** Penampil gambar besar dengan navigasi keyboard */
function Lightbox({ project, index, onClose, onStep }) {
  return (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-4"
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
