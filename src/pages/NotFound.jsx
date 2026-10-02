import { motion } from 'motion/react'
import { ArrowRight, Home, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import { navigation } from '@/data/siteData'
import { useSEO } from '@/hooks/useSEO'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { MountainBackground } from '@/components/ui/MountainBackground'

export default function NotFound() {
  useSEO({
    title: 'Halaman tidak ditemukan',
    description: 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.',
    noindex: true,
  })

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <MountainBackground />

      <div className="container-page relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Ilustrasi gunung danems */}
          <motion.svg
            viewBox="0 0 300 170"
            className="w-full max-w-sm"
            fill="none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <motion.circle
              cx="238"
              cy="34"
              r="18"
              fill="var(--color-sun-400)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
              style={{ transformOrigin: '238px 34px' }}
            />

            <motion.path
              d="M8 150 L78 58 L124 116 L164 44 L232 150 Z"
              fill="var(--color-sky-peak-300)"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            <motion.path
              d="M78 58 L62 80 L78 73 L94 82 Z"
              fill="var(--color-surface)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              transition={{ delay: 0.9 }}
            />

            <motion.path
              d="M4 150 L62 108 L118 148 L182 100 L244 148 L296 112 L296 160 L4 160 Z"
              fill="var(--color-mint-500)"
              opacity="0.85"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.25, ease: 'easeInOut' }}
            />

            {/* Tanda tanda tanya di puncak */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 300, damping: 20 }}
              style={{ transformOrigin: '164px 44px' }}
            >
              <circle cx="164" cy="30" r="17" fill="var(--color-surface)" stroke="var(--color-mint-400)" strokeWidth="2.5" />
              <text
                x="164"
                y="30"
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--color-mint-600)"
                fontFamily="Outfit Variable, sans-serif"
                fontSize="22"
                fontWeight="700"
              >
                ?
              </text>
            </motion.g>
          </motion.svg>

          {/* Kode 404 */}
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            className="mt-6 font-display text-6xl font-extrabold sm:text-7xl"
            aria-hidden="true"
          >
            <span className="text-gradient">404</span>
          </motion.p>

          <Reveal delay={0.2}>
            <h1 className="mt-4 text-balance font-display text-3xl font-extrabold sm:text-4xl">
              Sepertinya Anda Tersesat di Gunung
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-ink-soft">
              Halaman yang Anda cari tidak ada, sudah dipindahkan, atau mungkin tidak pernah ada sama sekali. Mari kembali
              ke jalur yang benar.
            </p>
          </Reveal>

          {/* Tombol */}
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/" className="btn btn-primary group">
                  <Home size={17} strokeWidth={2} />
                  Kembali ke Beranda
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/dokumentasi" className="btn btn-outline group">
                  <Search size={16} strokeWidth={2} />
                  Jelajahi Karya
                </Link>
              </motion.div>
            </div>
          </Reveal>

          {/* Tautan cepat */}
          <Reveal delay={0.5}>
            <div className="mt-12 w-full">
              <h2 className="mb-4 text-[0.68rem] font-bold tracking-[0.16em] text-ink-muted uppercase">
                Atau coba halaman ini
              </h2>
              <ul className="flex flex-wrap items-center justify-center gap-2">
                {navigation
                  .filter((item) => item.href !== '/')
                  .map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        className={cn(
                          'inline-flex items-center gap-2 rounded-xl border border-line bg-surface/80 px-4 py-2.5 text-sm font-semibold text-ink-soft transition-all duration-400',
                          'hover:-translate-y-0.5 hover:border-mint-400 hover:text-mint-600 dark:hover:text-mint-300',
                        )}
                      >
                        <Icon name={item.icon} size={15} strokeWidth={2} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}