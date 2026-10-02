import { motion } from 'motion/react'
import { ArrowUpRight, Clock, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

import { buildWhatsAppLink, navigation, processSteps, site, socials, whatsapp } from '@/data/siteData'
import { Icon } from '@/components/ui/Icon'
import { BrandIcon } from '@/components/ui/BrandIcons'
import { MountainDivider } from '@/components/ui/MountainBackground'

/** Tahun dihitung sekali saat modul dimuat agar stabil antar-render */
const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const year = CURRENT_YEAR

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-surface">
      <MountainDivider />

      {/* Cahaya lembut di belakang */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-mint-300) 45%, transparent), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid gap-12 pt-16 pb-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-mint-500 to-sky-peak-400 shadow-[var(--shadow-mint)]">
                <svg viewBox="0 0 40 40" className="size-7" aria-hidden="true">
                  <path d="M2 30 L13 15 L20 24 L26 16 L38 30 L38 34 L2 34 Z" fill="white" opacity="0.95" />
                  <circle cx="31" cy="9" r="3.4" fill="var(--color-sun-400)" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold">{site.name}</span>
                <span className="mt-1 text-[0.65rem] font-medium tracking-[0.14em] text-ink-muted uppercase">
                  Portfolio
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-ink-soft">
              {site.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials
                .filter((item) => item.id !== 'email')
                .map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={item.label}
                    title={`${item.label}: ${item.handle}`}
                    className="group grid size-10 place-items-center rounded-xl border border-line bg-canvas text-ink-soft transition-colors duration-300 hover:border-mint-400"
                  >
                    <BrandIcon
                      name={item.icon}
                      width={17}
                      height={17}
                      className="transition-colors duration-300 group-hover:text-mint-600 dark:group-hover:text-mint-300"
                    />
                  </motion.a>
                ))}
            </div>
          </div>

          {/* Tautan halaman */}
          <nav className="lg:col-span-4" aria-label="Tautan footer">
            <h3 className="font-display text-sm font-bold tracking-wide uppercase">Halaman</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-1.5 py-1 text-sm text-ink-soft transition-colors hover:text-mint-600 dark:hover:text-mint-300"
                  >
                    <span className="h-px w-0 bg-mint-500 transition-all duration-300 group-hover:w-3.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold tracking-wide uppercase">Hubungi</h3>
            <ul className="mt-4 flex flex-col gap-3.5">
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 py-0.5 text-sm text-ink-soft transition-colors hover:text-mint-600 dark:hover:text-mint-300"
                >
                  <BrandIcon name="Whatsapp" width={16} height={16} className="mt-0.5 shrink-0 text-mint-500" />
                  <span>
                    {whatsapp.display}
                    <span className="mt-0.5 block text-xs text-ink-muted">Chat via WhatsApp</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2.5 py-0.5 text-sm text-ink-soft transition-colors hover:text-mint-600 dark:hover:text-mint-300"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-mist-400" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-ink-soft">
                <MapPin size={16} className="mt-0.5 shrink-0 text-mist-400" />
                {site.location.full}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Clock size={16} className="mt-0.5 shrink-0 text-mist-400" />
                <span>
                  Senin sampai Jumat, 09.00 - 18.00 WIB
                  <span className="mt-0.5 block text-xs text-ink-muted">Respons rata-rata 2 jam</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris bawah */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-7 sm:flex-row">
          <p className="text-center text-xs text-ink-muted sm:text-left">
            <span>&copy; {year} {site.name}. Seluruh hak cipta dilindungi.</span>
            <span className="mt-1 block">
              Dibangun dengan <span className="font-semibold text-mint-600 dark:text-mint-300">React</span> dan
              design system Mint Highlands.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {processSteps.slice(0, 2).map((step) => (
              <span key={step.id} className="badge badge-neutral text-[0.7rem]">
                <Icon name={step.icon} size={12} strokeWidth={2.2} />
                {step.title.split(' ')[0]}
              </span>
            ))}
            <a
              href={`${site.url}/sitemap.xml`}
              className="inline-flex items-center gap-1 py-1 text-xs text-ink-muted transition-colors hover:text-mint-600 dark:hover:text-mint-300"
            >
              Peta situs
              <ArrowUpRight size={12} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}