import { motion } from 'motion/react'

import { skillGroups } from '@/data/siteData'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/ui/Counter'
import { Icon } from '@/components/ui/Icon'
import { Reveal, SectionHeading } from '@/components/ui/Reveal'

const TECH_CHIPS = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'PHP', 'MySQL', 'Git', 'Figma']

/** Bagian kemampuan — persentase per bidang plus pita teknologi */
export function SkillsSection() {
  return (
    <>
      <section id="keahlian" className="relative scroll-mt-24 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 grid-noise opacity-30" aria-hidden="true" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Kemampuan"
            title="Yang Bisa Saya Kerjakan"
            description="Persentase di bawah adalah perkiraan jujur dari proyek yang pernah saya kerjakan dan terus saya tingkatkan. Semua bidang ini terbuka untuk didiskusikan, tanpa kewajiban apa pun."
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
    </>
  )
}

/** Pita teknologi yang dipakai sehari-hari */
function TechMarquee() {
  return (
    <section className="relative border-y border-line bg-surface/60 py-6">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {TECH_CHIPS.map((tech) => (
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
