import { motion } from 'motion/react'

import { buildWhatsAppLink, skillGroups, site } from '@/data/siteData'
import { useSEO, useStructuredData } from '@/hooks/useSEO'
import { cn } from '@/lib/utils'
import { CtaSection, FaqSection } from '@/components/sections/Common'
import { ProgressBar } from '@/components/ui/Counter'
import { Icon } from '@/components/ui/Icon'
import { Eyebrow, Reveal, SectionHeading } from '@/components/ui/Reveal'
import { MountainBackground } from '@/components/ui/MountainBackground'

export default function Products() {
  useSEO({
    title: 'Bakat',
    description: `Kemampuan dan bidang yang dikuasai ${site.name}: frontend, backend, desain antarmuka, dan DevOps. Portofolio pribadi, bukan katalog harga.`,
  })

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Bakat dan Keahlian ${site.name}`,
    itemListElement: skillGroups.map((group, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DefinedTerm',
        name: group.label,
        description: group.items.map((skill) => skill.name).join(', '),
      },
    })),
  })

  return (
    <>
      <PageHeader />

      {/* Keahlian */}
      <section className="relative py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 grid-noise opacity-30" aria-hidden="true" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Kemampuan"
            title="Yang Bisa Saya Kerjakan"
            description="Persentase di bawah adalah perkiraan jujur berdasarkan pengalaman proyek nyata, bukan sekadar klaim di CV. Semua bidang ini terbuka untuk job yang sekadar ingin didiskusikan, tanpa kewajiban apa pun."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, groupIndex) => (
              <Reveal key={group.id} delay={groupIndex * 0.09}>
                <article className="h-full rounded-3xl border border-line bg-surface p-6 transition-colors duration-400 hover:border-mint-300">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'grid size-11 place-items-center rounded-2xl',
                        group.color === 'mint' && 'bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300',
                        group.color === 'sky' && 'bg-sky-peak-100 text-sky-peak-600 dark:bg-sky-peak-700/40 dark:text-sky-peak-200',
                        group.color === 'sun' && 'bg-sun-200 text-sun-600 dark:bg-sun-600/30 dark:text-sun-200',
                        group.color === 'pine' && 'bg-pine-100 text-pine-700 dark:bg-pine-900 dark:text-pine-200',
                      )}
                    >
                      <Icon name={group.icon} size={20} strokeWidth={1.9} />
                    </span>
                    <h3 className="font-display text-lg font-bold">{group.label}</h3>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {group.items.map((skill, index) => (
                      <li key={skill.name}>
                        <div className="mb-1.5 flex items-baseline justify-between gap-3">
                          <span className="text-sm font-medium text-ink-soft">{skill.name}</span>
                          <span className="font-display text-sm font-bold text-mint-600 tabular-nums dark:text-mint-300">
                            {skill.level}%
                          </span>
                        </div>
                        <ProgressBar value={skill.level} delay={groupIndex * 0.12 + index * 0.06} />
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TechMarquee />
      <FaqSection />
      <CtaSection />
    </>
  )
}

function PageHeader() {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <MountainBackground intensity={0.55} showMist={false} />
      <div className="container-page relative z-10">
        <Reveal>
          <Eyebrow>Bakat</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Area yang saya <span className="text-gradient">kuasai setiap hari</span>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            Ini bukan katalog harga. Hanya daftar bidang yang benar-benar saya kerjakan setiap hari, lengkap dengan tingkat penguasaan
            yang jujur berdasarkan pengalaman nyata.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {[
              { icon: 'Sparkles', label: 'Berbasis pengalaman nyata' },
              { icon: 'Code2', label: 'Dirancang untuk performa' },
              { icon: 'Eye', label: 'Aksesibel secara default' },
              { icon: 'MessageSquare', label: 'Terbuka untuk diskusi' },
            ].map((item) => (
              <li key={item.label} className="badge badge-neutral gap-1.5 px-3 py-1.5">
                <Icon name={item.icon} size={13} strokeWidth={2.2} className="text-mint-500" />
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </header>
  )
}

/** Pita teknologi yang berjalan terus */
function TechMarquee() {
  const marquee = ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Figma', 'Motion', 'Docker', 'Vercel']

  return (
    <section className="relative border-y border-line bg-surface/60 py-6">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {marquee.map((tech) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-ink-soft"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
