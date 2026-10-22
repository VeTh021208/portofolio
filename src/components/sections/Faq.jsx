import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { faqs } from '@/data/siteData'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/Reveal'

/** Daftar pertanyaan umum yang bisa dibuka-tutup */
export function FaqSection({ items = faqs, columns = 2, id }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <section id={id} className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pertanyaan Umum"
          title="Pertanyaan yang Sering Muncul"
          description="Jika pertanyaan Anda tidak ada di sini, jangan ragu untuk menghubungi saya langsung."
        />

        <div className={cn('mt-12 grid gap-3', columns === 2 ? 'lg:grid-cols-2' : '')}>
          {items.map((item, index) => {
            const open = openId === item.id
            const answerId = `faq-jawaban-${item.id}`

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
                    aria-controls={answerId}
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
                  id={answerId}
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
