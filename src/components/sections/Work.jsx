import { AnimatePresence, motion } from 'motion/react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { projectCategories, projects } from '@/data/siteData'
import { cn } from '@/lib/utils'
import { ProjectCard, ProjectRow } from '@/components/ui/Cards'
import { Icon } from '@/components/ui/Icon'
import { Reveal, SectionHeading } from '@/components/ui/Reveal'

/** Bagian karya — pencarian, filter kategori, dan grid yang membuka modal detail */
export function WorkSection({ onOpenProject }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid')

  const counts = useMemo(() => {
    const map = { all: projects.length }
    projectCategories.forEach((cat) => {
      if (cat.id === 'all') return
      map[cat.id] = projects.filter((item) => item.category === cat.id).length
    })
    return map
  }, [])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return projects.filter((project) => {
      const matchCategory = category === 'all' || project.category === category
      const matchQuery =
        !needle ||
        `${project.title} ${project.summary} ${project.client} ${project.stack.join(' ')} ${project.tags.join(' ')}`
          .toLowerCase()
          .includes(needle)

      return matchCategory && matchQuery
    })
  }, [category, query])

  const clearAll = () => {
    setCategory('all')
    setQuery('')
  }

  return (
    <section id="karya" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          align="left"
          eyebrow="Dokumentasi Karya"
          title="Karya yang Pernah Saya Bangun dan Bongkar"
          description="Setiap proyek disertai cerita lengkap: masalah yang saya hadapi, solusi teknis yang dipilih, dan hasil nyata yang berhasil dicapai. Klik kartu untuk membuka detailnya."
        />

        {/* Kendali filter */}
        <Reveal>
          <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Pencarian */}
            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-muted"
                strokeWidth={2}
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari proyek, klien, atau teknologi..."
                aria-label="Cari proyek"
                className="w-full rounded-2xl border border-line bg-canvas py-3 pr-10 pl-11 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-mint-400"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-mist-200 hover:text-ink dark:hover:bg-pine-800"
                  aria-label="Bersihkan pencarian"
                >
                  <X size={14} strokeWidth={2.4} />
                </button>
              ) : null}
            </div>

            {/* Tampilan */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex rounded-xl border border-line bg-canvas p-1">
                {[
                  { id: 'grid', icon: 'LayoutGrid', label: 'Tampilan kisi' },
                  { id: 'list', icon: 'List', label: 'Tampilan daftar' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setView(option.id)}
                    aria-pressed={view === option.id}
                    aria-label={option.label}
                    title={option.label}
                    className={cn(
                      'grid size-8 place-items-center rounded-lg transition-colors duration-300',
                      view === option.id ? 'bg-mint-500 text-white' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    <Icon name={option.icon} size={15} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Chip kategori */}
        <Reveal delay={0.06}>
          <div className="no-scrollbar mt-5 flex items-center gap-2 overflow-x-auto pb-2">
            <span className="hidden shrink-0 items-center gap-1.5 pr-1 text-xs font-semibold text-ink-muted sm:flex">
              <SlidersHorizontal size={13} strokeWidth={2} />
              Filter
            </span>
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-magnetic
                onClick={() => setCategory(cat.id)}
                className={cn('chip', category === cat.id && 'chip-active')}
                aria-pressed={category === cat.id}
              >
                {cat.label}
                <span
                  className={cn(
                    'ml-1 rounded-md px-1.5 py-0.5 text-[0.65rem] font-bold',
                    category === cat.id ? 'bg-white/25 text-white' : 'bg-mist-100 text-ink-muted dark:bg-pine-900',
                  )}
                >
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Jumlah hasil */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-ink">
            Menampilkan <span className="text-mint-600 dark:text-mint-300">{filtered.length}</span> dari{' '}
            {projects.length} proyek
            {category !== 'all'
              ? ` pada kategori ${projectCategories.find((c) => c.id === category)?.label ?? ''}`
              : ''}
          </h3>
          {category !== 'all' || query ? (
            <button
              type="button"
              onClick={clearAll}
              className="py-1 text-sm font-semibold text-mint-600 transition-colors hover:text-mint-700 dark:text-mint-300"
            >
              Reset filter
            </button>
          ) : null}
        </div>

        {/* Hasil proyek */}
        {filtered.length > 0 ? (
          <div
            className={cn(
              'mt-8',
              view === 'grid' ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-3',
            )}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) =>
                view === 'grid' ? (
                  <ProjectCard key={project.id} project={project} index={index} onOpen={onOpenProject} />
                ) : (
                  <ProjectRow key={project.id} project={project} index={index} onOpen={onOpenProject} />
                ),
              )}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState onReset={clearAll} query={query} />
        )}
      </div>
    </section>
  )
}

function EmptyState({ onReset, query }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-16 text-center"
    >
      <svg viewBox="0 0 120 90" className="h-20 w-28" fill="none" aria-hidden="true">
        <path
          d="M6 84 L40 34 L62 60 L82 24 L114 84"
          stroke="var(--color-mist-300)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 84 L114 84" stroke="var(--color-line)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div>
        <p className="font-display text-lg font-bold">Tidak ada proyek yang cocok</p>
        <p className="mt-1.5 max-w-sm text-sm text-ink-muted">
          {query
            ? `Tidak ditemukan proyek untuk kata kunci "${query}". Coba kata kunci lain atau kategori berbeda.`
            : 'Belum ada proyek pada kategori ini. Silakan pilih kategori lain.'}
        </p>
      </div>

      <button type="button" onClick={onReset} className="btn btn-outline btn-sm">
        Tampilkan semua proyek
      </button>
    </motion.div>
  )
}
