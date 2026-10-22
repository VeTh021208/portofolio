import { motion } from 'motion/react'

import { site } from '@/data/siteData'
import { cn, toneClass } from '@/lib/utils'
import { Counter } from '@/components/ui/Counter'
import { Icon } from '@/components/ui/Icon'

/** Deretan statistik dengan angka yang menghitung naik */
export function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat, index) => (
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
                className="glow-mint-top pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                aria-hidden="true"
              />

              <span
                className={cn(
                  'relative mx-auto grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
                  toneClass(stat.color),
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
