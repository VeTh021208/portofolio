import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { faqs } from '@/data/siteData'
import { cn } from '@/lib/utils'
import { Counter } from '@/components/ui/Counter'
import { Icon } from '@/components/ui/Icon'
import { Reveal, SectionHeading } from '@/components/ui/Reveal'

/** Deretan statistik dengan angka yang menghitung naik */
export function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 48, suffix: '+', label: 'Proyek Selesai', icon: 'Rocket', color: 'mint' },
            { value: 32, suffix: '', label: 'Klien Bahagia', icon: 'Users', color: 'sky' },
            { value: 7, suffix: ' th', label: 'Pengalaman', icon: 'Award', color: 'sun' },
            { value: 4.9, suffix: '/5', label: 'Rating Klien', icon: 'Star', color: 'pine', decimals: 1 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 text-center card-hover"
            >
              {/* Kilau */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-mint-200) 45%, transparent), transparent 70%)',
                }}
                aria-hidden="true"
              />

              <span
                className={cn(
                  'relative mx-auto grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
                  stat.color === 'mint' && 'bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300',
                  stat.color === 'sky' && 'bg-sky-peak-100 text-sky-peak-600 dark:bg-sky-peak-700/40 dark:text-sky-peak-200',
                  stat.color === 'sun' && 'bg-sun-200 text-sun-600 dark:bg-sun-600/30 dark:text-sun-200',
                  stat.color === 'pine' && 'bg-pine-100 text-pine-700 dark:bg-pine-900 dark:text-pine-200',
                )}
              >
                <Icon name={stat.icon} size={22} strokeWidth={2} />
              </span>

              <p className="relative mt-4 font-display text-3xl font-extrabold sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="relative mt-1 text-sm font-medium text-ink-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Daftar pertanyaan umum yang bisa dibuka-tutup */
export function FaqSection({ items = faqs, columns = 2 }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pertanyaan Umum"
          title="Pertanyaan yang Sering Muncul"
          description="Jika pertanyaan Anda tidak ada di sini, jangan ragu untuk menghubungi saya langsung."
        />

        <div className={cn('mt-12 grid gap-3', columns === 2 ? 'lg:grid-cols-2' : '')}>
          {items.map((item, index) => {
            const open = openId === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
                className={cn(
                  'overflow-hidden rounded-2xl border transition-colors duration-400',
                  open ? 'border-mint-300 bg-surface shadow-[var(--shadow-soft)]' : 'border-line bg-surface/70 hover:border-mint-200',
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={cn(
                        'text-sm font-semibold transition-colors duration-300 sm:text-[0.95rem]',
                        open ? 'text-mint-700 dark:text-mint-300' : 'text-ink',
                      )}
                    >
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        'grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300',
                        open ? 'bg-mint-500 text-white' : 'bg-mist-100 text-ink-soft dark:bg-pine-900',
                      )}
                    >
                      <ChevronDown size={15} strokeWidth={2.4} />
                    </motion.span>
                  </button>
                </h3>

                <motion.div
                  initial={false}
                  animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-pretty text-sm leading-relaxed text-ink-soft">{item.answer}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Ajakan bertindak menutup halaman, dengan latar gunung */
export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-line bg-surface px-6 py-14 text-center sm:px-12">
            {/* Latar */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 120%, color-mix(in srgb, var(--color-mint-300) 65%, transparent), transparent 65%), radial-gradient(ellipse at 20% -20%, color-mix(in srgb, var(--color-sky-peak-300) 45%, transparent), transparent 60%)',
              }}
              aria-hidden="true"
            />
            <div className="dot-grid absolute inset-0 -z-10 opacity-30" aria-hidden="true" />

            {/* Gunung kecil di bawah */}
            <svg viewBox="0 0 600 140" className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full" aria-hidden="true">
              <path
                d="M0 140 L120 70 L210 118 L300 48 L400 120 L500 64 L600 140 Z"
                fill="var(--color-mint-500)"
                opacity="0.16"
              />
              <path
                d="M0 140 L90 96 L180 130 L290 84 L400 130 L510 92 L600 140 Z"
                fill="var(--color-mint-600)"
                opacity="0.2"
              />
            </svg>

            <span className="badge badge-mint">Punya ide proyek?</span>

            <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Mari Bangun Sesuatu yang <span className="text-gradient">Segar dan Berdampak</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-soft">
              Konsultasi pertama gratis dan tanpa ikatan. Ceritakan idemu, saya bantu susun langkah teknis dan estimasi
              biaya yang masuk akal.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href={`https://wa.me/${'6281234567890'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon name="Whatsapp" size={18} />
                Chat Sekarang Gratis
              </motion.a>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <a href="mailto:veth021208@gmail.com" className="btn btn-outline">
                  Kirim Email
                </a>
              </motion.div>
            </div>

            <p className="mt-6 text-xs text-ink-muted">Biasanya membalas dalam 2 jam pada jam kerja</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}