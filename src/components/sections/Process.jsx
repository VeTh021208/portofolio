import { motion } from 'motion/react'

import { processSteps } from '@/data/siteData'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/Reveal'

/** Alur kerja enam tahap */
export function ProcessSection() {
  return (
    <section id="proses" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      {/* Garis penghubung di latar */}
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-40" aria-hidden="true" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Cara Kerja"
          title="Enam Langkah yang Jelas dan Transparan"
          description="Setiap proyek berjalan dengan tahap yang jelas. Anda selalu tahu progres pengerjaan dan kapan hasil akhirnya selesai."
        />

        <div className="relative mt-14">
          {/* Garis progres horizontal di layar besar */}
          <div className="absolute top-[3.25rem] right-0 left-0 hidden h-px lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-mint-500 via-mint-400 to-sky-peak-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {processSteps.map((item, index) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="flex items-center gap-4">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-mint-200 bg-surface text-mint-600 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-mint-400 group-hover:bg-mint-500 group-hover:text-white dark:border-mint-800 dark:text-mint-300">
                    <Icon name={item.icon} size={22} strokeWidth={1.9} />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-mist-200 transition-colors duration-500 group-hover:text-mint-200 dark:text-pine-900 dark:group-hover:text-pine-800">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.description}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mist-100 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-muted dark:bg-pine-900">
                  Estimasi {item.duration}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
