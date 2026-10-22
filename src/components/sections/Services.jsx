import { motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'

import { services } from '@/data/siteData'
import { cn, toneClass } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/Reveal'

/** Semua layanan dalam bentuk kartu */
export function ServicesSection() {
  return (
    <section id="layanan" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          align="left"
          eyebrow="Produk dan Jasa"
          title="Apa yang Bisa Saya Bantu"
          description="Dari landing page sederhana sampai katalog UMKM, saya bantu mewujudkan website yang rapi, cepat, dan sesuai kebutuhan Anda."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: (index % 3) * 0.11, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 card-hover',
                service.popular && 'border-mint-300 shadow-[var(--shadow-lift)]',
              )}
            >
              {/* Cahaya lembut di dalam kartu */}
              <span
                className={cn(
                  'pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-0 blur-3xl transition-opacity duration-600 group-hover:opacity-100',
                  service.color === 'mint' && 'bg-mint-200',
                  service.color === 'sky' && 'bg-sky-peak-200',
                  service.color === 'sun' && 'bg-sun-200',
                  service.color === 'pine' && 'bg-pine-200',
                )}
                aria-hidden="true"
              />

              {service.popular ? (
                <span className="absolute top-5 right-5 rounded-full bg-gradient-to-r from-sun-400 to-sun-500 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-[var(--color-pine-900)] uppercase">
                  Populer
                </span>
              ) : null}

              <span
                className={cn(
                  'relative grid size-13 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
                  toneClass(service.color),
                )}
              >
                <Icon name={service.icon} size={24} strokeWidth={1.9} />
              </span>

              <h3 className="relative mt-5 font-display text-xl font-bold">{service.title}</h3>
              <p className="relative mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-soft">{service.short}</p>

              <ul className="relative mt-5 space-y-2">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-ink-muted">
                    <Check size={13} className="mt-0.5 shrink-0 text-mint-500" strokeWidth={3} />
                    <span className="text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 flex items-end justify-between gap-3 border-t border-line pt-5">
                <div>
                  <p className="font-display text-base font-extrabold text-mint-600 dark:text-mint-300">{service.price}</p>
                  <p className="mt-0.5 text-[0.7rem] text-ink-muted">{service.duration}</p>
                </div>
                <a
                  href="#kontak"
                  className="grid size-10 place-items-center rounded-xl border border-line bg-canvas text-ink-soft transition-all duration-400 group-hover:border-mint-400 group-hover:bg-mint-50 group-hover:text-mint-600 dark:group-hover:bg-mint-900/50 dark:group-hover:text-mint-300"
                  aria-label={`Tanyakan ${service.title} lewat formulir kontak`}
                >
                  <ArrowRight size={16} strokeWidth={2.2} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
