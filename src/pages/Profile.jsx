import { motion } from 'motion/react'
import { Briefcase, Download, GraduationCap, MapPin, Quote } from 'lucide-react'

import { site, timeline } from '@/data/siteData'
import { useSEO } from '@/hooks/useSEO'
import { cn } from '@/lib/utils'
import { CtaSection } from '@/components/sections/Common'
import { Icon } from '@/components/ui/Icon'
import { Eyebrow, Reveal, SectionHeading } from '@/components/ui/Reveal'
import { MountainBackground } from '@/components/ui/MountainBackground'

export default function Profile() {
  useSEO({
    title: 'Profil Saya',
    description: `Kenali ${site.name}, ${site.role} di ${site.location.city}. Latar belakang pendidikan, pengalaman kerja, dan keahlian teknis.`,
  })

  return (
    <>
      {/* Kepala halaman */}
      <PageHeader />

      {/* Ringkasan */}
      <section className="relative py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <ProfileCard />
            <AboutMe />
          </div>
        </div>
      </section>

      <TimelineSection />
      <CtaSection />
    </>
  )
}

/** Kepala halaman dengan latar gunung ringan */
function PageHeader() {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <MountainBackground intensity={0.6} showSun showMist={false} />
      <div className="container-page relative z-10">
        <Reveal>
          <Eyebrow>Profil Saya</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Sedikit tentang <span className="text-gradient">diri saya</span> dan perjalanan yang saya tempuh
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            Saya bukan sekadar menulis kode. Saya berusaha memahami masalah bisnis di balik setiap permintaan, lalu
            memilih solusi teknis yang paling masuk akal dan paling mudah dirawat.
          </p>
        </Reveal>
      </div>
    </header>
  )
}

/** Kartu profil berisi foto stilasi dan informasi ringkas */
function ProfileCard() {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <Reveal direction="right">
        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 40% 25%, color-mix(in srgb, var(--color-mint-300) 75%, transparent), transparent 65%)',
            }}
            aria-hidden="true"
          />

          <div className="glass-strong overflow-hidden rounded-[2rem] p-6 shadow-[var(--shadow-float)]">
            {/* Foto dengan bingkai gunung */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-mint-100 via-surface to-sky-peak-100 dark:from-pine-900 dark:via-surface dark:to-pine-800">
                <svg viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label={`Foto ${site.name}`}>
                  <defs>
                    <linearGradient id="prof-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--color-mint-200)" />
                      <stop offset="1" stopColor="var(--color-surface)" />
                    </linearGradient>
                    <linearGradient id="prof-m1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--color-sky-peak-300)" stopOpacity="0.8" />
                      <stop offset="1" stopColor="var(--color-sky-peak-200)" stopOpacity="0.35" />
                    </linearGradient>
                    <linearGradient id="prof-m2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--color-mint-500)" />
                      <stop offset="1" stopColor="var(--color-pine-800)" />
                    </linearGradient>
                  </defs>

                  <rect width="400" height="320" fill="url(#prof-sky)" />
                  <circle cx="326" cy="66" r="30" fill="var(--color-sun-400)" opacity="0.9" />
                  <circle cx="326" cy="66" r="48" fill="var(--color-sun-300)" opacity="0.28" />

                  <path d="M0 230 L78 138 L136 196 L196 118 L268 210 L330 152 L400 236 L400 320 L0 320 Z" fill="url(#prof-m1)" />
                  <path d="M78 138 L62 158 L78 151 L94 158 Z" fill="var(--color-surface)" opacity="0.9" />
                  <path d="M196 118 L182 134 L196 128 L210 136 Z" fill="var(--color-surface)" opacity="0.8" />

                  <path d="M0 268 L64 220 L142 262 L226 210 L310 266 L368 216 L400 254 L400 320 L0 320 Z" fill="url(#prof-m2)" opacity="0.9" />

                  {/* Siluet orang */}
                  <g opacity="0.95">
                    <circle cx="200" cy="196" r="30" fill="var(--color-pine-900)" />
                    <path d="M148 320 C148 258 170 232 200 232 C230 232 252 258 252 320 Z" fill="var(--color-pine-900)" />
                    <path d="M200 232 L200 320" stroke="var(--color-mint-500)" strokeWidth="2" opacity="0.4" />
                  </g>
                </svg>

                {/* Status tersedia */}
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1.5 text-[0.68rem] font-bold text-mint-700 backdrop-blur-sm dark:text-mint-300">
                  <span className="size-1.5 animate-pulse rounded-full bg-mint-500" />
                  {site.availability.label}
                </span>
              </div>
            </div>

            {/* Nama */}
            <div className="mt-6 text-center">
              <h2 className="font-display text-2xl font-extrabold">{site.name}</h2>
              <p className="mt-1 text-sm font-medium text-mint-600 dark:text-mint-300">{site.role}</p>
            </div>

            <div className="my-5 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

            {/* Informasi ringkas */}
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-3">
                <Icon name="MapPin" size={15} className="shrink-0 text-mint-500" />
                <span className="text-ink-soft">{site.location.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Mail" size={15} className="shrink-0 text-mint-500" />
                <a href={`mailto:${site.email}`} className="link-underline text-ink-soft">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Clock" size={15} className="shrink-0 text-mint-500" />
                <span className="text-ink-soft">{site.location.timezone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Briefcase" size={15} className="shrink-0 text-mint-500" />
                <span className="text-ink-soft">Open untuk freelance dan kontrak</span>
              </li>
            </ul>

            {/* Unduh CV */}
            <a
              href="/cv-muhammad-raffi-ar-rasyid.pdf"
              download
              className="btn btn-primary mt-6 w-full"
              aria-label="Unduh curriculum vitae dalam format PDF"
            >
              <Download size={17} strokeWidth={2} />
              Unduh CV (PDF)
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/** Narasi panjang tentang diri sendiri */
function AboutMe() {
  return (
    <div>
      <SectionHeading align="left" eyebrow="Tentang Saya" title="Cerita di balik layar" />

      <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink-soft">
        {site.longDescription.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 20)} delay={index * 0.08}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>

      {/* Prinsip kerja */}
      <Reveal delay={0.16}>
        <div className="mt-8 rounded-3xl border border-line bg-surface p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <Quote size={18} className="text-mint-500" strokeWidth={2} />
            Prinsip yang Saya Pegang
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              {
                title: 'Pahami dulu, baru bangun',
                text: 'Saya tidak pernah mulai dari kode. Setiap proyek dimulai dari memahami siapa penggunanya dan masalah apa yang ingin diselesaikan.',
              },
              {
                title: 'Kualitas tanpa kompromi',
                text: 'Kode yang rapi, aksesibilitas yang benar, dan performa yang cepat bukan tambahan, melainkan standar minimum.',
              },
              {
                title: 'Transparan sejak awal',
                text: 'Timeline, biaya, dan risiko dikomunikasikan terbuka. Tidak ada kejutan di akhir proyek.',
              },
              {
                title: 'Serahkan, jangan mengunci',
                text: 'Kode dan dokumentasi selalu berpindah penuh ke klien. Produk digital seharusnya milik pemiliknya.',
              },
            ].map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                className="flex gap-3"
              >
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-lg bg-mint-100 text-xs font-bold text-mint-700 dark:bg-mint-900 dark:text-mint-300">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Fakta singkat */}
      <Reveal delay={0.2}>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { value: '48+', label: 'Proyek selesai' },
            { value: '7 th', label: 'Pengalaman' },
            { value: '250+', label: 'Sesi konsultasi' },
          ].map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-line bg-surface px-4 py-5 text-center transition-colors duration-400 hover:border-mint-300"
            >
              <p className="font-display text-2xl font-extrabold text-gradient">{fact.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

/** Garis waktu pengalaman dan pendidikan */
function TimelineSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Perjalanan"
          title="Pengalaman dan Pendidikan"
          description="Riwayat singkat perjalanan profesional saya dari bangku kuliah hingga memimpin tim pengembangan."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Garis vertikal */}
          <div className="absolute top-2 bottom-2 left-[1.4rem] w-px bg-gradient-to-b from-mint-400 via-mint-300 to-transparent md:left-1/2" aria-hidden="true" />

          <ol className="space-y-10">
            {timeline.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 md:pl-0"
              >
                {/* Titik penanda */}
                <span
                  className={cn(
                    'absolute top-1 left-0 z-10 grid size-11 place-items-center rounded-2xl border-2 border-canvas shadow-[var(--shadow-soft)] md:left-1/2 md:-translate-x-1/2',
                    item.type === 'work'
                      ? 'bg-gradient-to-br from-mint-500 to-mint-400 text-white'
                      : 'bg-gradient-to-br from-sky-peak-400 to-sky-peak-500 text-white',
                  )}
                >
                  {item.type === 'work' ? (
                    <Briefcase size={18} strokeWidth={2} />
                  ) : (
                    <GraduationCap size={18} strokeWidth={2} />
                  )}
                </span>

                {/* Kartu */}
                <div
                  className={cn(
                    'rounded-3xl border border-line bg-surface p-6 transition-colors duration-400 hover:border-mint-300 md:w-[calc(50%-2.25rem)]',
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={item.type === 'work' ? 'badge badge-mint' : 'badge badge-sky'}>
                      {item.type === 'work' ? 'Pengalaman' : 'Pendidikan'}
                    </span>
                    <span className="text-xs font-semibold text-ink-muted">{item.period}</span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-mint-600 dark:text-mint-300">{item.company}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                    <MapPin size={12} strokeWidth={2} />
                    {item.location}
                  </p>

                  <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft">{item.description}</p>

                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-xs text-ink-muted">
                        <Icon name="Check" size={13} className="mt-0.5 shrink-0 text-mint-500" strokeWidth={3} />
                        <span className="text-pretty">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
