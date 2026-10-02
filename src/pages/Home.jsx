import { motion } from 'motion/react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { helpers, processSteps, services, skillsMarquee, site } from '@/data/siteData'
import { useHomeStructuredData, useSEO } from '@/hooks/useSEO'
import { cn } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { CtaSection, FaqSection, StatsSection } from '@/components/sections/Common'
import { Icon } from '@/components/ui/Icon'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal, SectionHeading } from '@/components/ui/Reveal'
import { ProjectRow } from '@/components/ui/Cards'

export default function Home() {
  useSEO({
    title: 'Portofolio',
    description: site.description,
  })

  useHomeStructuredData()

  return (
    <>
      <Hero />
      <SkillsMarquee />
      <StatsSection />
      <ServicesPreview />
      <FeaturedWork />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}

/** Pita keahlian yang berjalan terus */
function SkillsMarquee() {
  return (
    <section className="relative border-y border-line bg-surface/60 py-5">
      <div className="flex items-center gap-6">
        <span className="z-10 hidden shrink-0 items-center gap-2 bg-surface pr-2 pl-6 text-xs font-bold tracking-[0.16em] text-ink-muted uppercase lg:flex">
          <Sparkles size={14} className="text-mint-500" strokeWidth={2.2} />
          Keahlian
        </span>
        <Marquee
          items={skillsMarquee}
          speed={38}
          className="mask-fade-x flex-1"
          itemClassName="font-display text-lg font-bold whitespace-nowrap text-ink/70 dark:text-ink/80"
          separator=""
        />
      </div>
    </section>
  )
}

/** Pratinjau tiga layanan unggulan */
function ServicesPreview() {
  const preview = services.slice(0, 3)

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Produk dan Jasa"
            title="Apa yang Bisa Saya Bantu"
            description="Dari website perusahaan sampai aplikasi mobile, saya menangani siklus pengembangan penuh dengan pendekatan yang transparan."
            className="flex-1"
          />
          <Reveal delay={0.2}>
            <Link to="/produk" className="btn btn-outline group">
              Lihat semua layanan
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {preview.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 card-hover',
                service.popular && 'border-mint-300 shadow-[var(--shadow-lift)]',
              )}
            >
{/* Cahaya lembut di dalam kartu, tidak keluar batas agar tidak terpotong */}
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
                  service.color === 'mint' && 'bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300',
                  service.color === 'sky' && 'bg-sky-peak-100 text-sky-peak-600 dark:bg-sky-peak-700/40 dark:text-sky-peak-200',
                  service.color === 'sun' && 'bg-sun-200 text-sun-600 dark:bg-sun-600/30 dark:text-sun-200',
                  service.color === 'pine' && 'bg-pine-100 text-pine-700 dark:bg-pine-900 dark:text-pine-200',
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
                <Link
                  to={`/produk#${service.slug}`}
                  className="grid size-10 place-items-center rounded-xl border border-line bg-canvas text-ink-soft transition-all duration-400 group-hover:border-mint-400 group-hover:bg-mint-50 group-hover:text-mint-600 dark:group-hover:bg-mint-900/50 dark:group-hover:text-mint-300"
                  aria-label={`Detail ${service.title}`}
                >
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Daftar karya unggulan dalam bentuk baris */
function FeaturedWork() {
  const featured = helpers.getFeaturedProjects()

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Karya Pilihan"
            title="Proyek yang Saya Bangun"
            description="Beberapa proyek terbaru yang dikerjakan dengan perhatian penuh pada performa, aksesibilitas, dan pengalaman pengguna."
            className="flex-1"
          />
          <Reveal delay={0.2}>
            <Link to="/dokumentasi" className="btn btn-outline group">
              Semua dokumentasi
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 space-y-3">
          {featured.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Alur kerja enam tahap */
function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Garis penghubung di latar */}
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-40" aria-hidden="true" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Cara Kerja"
          title="Enam Langkah yang Jelas dan Transparan"
          description="Tidak ada kejutan di tengah proyek. Anda selalu tahu tahap mana yang sedang berjalan dan kapan hasil akhir diserahkan."
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
                key={item.id}
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
