import { motion } from 'motion/react'
import { Send } from 'lucide-react'
import { useMemo, useState } from 'react'

import { buildWhatsAppLink, services, site, socials, whatsapp } from '@/data/siteData'
import { useToast } from '@/context/ToastContext'
import { useSEO } from '@/hooks/useSEO'
import { cn, copyToClipboard } from '@/lib/utils'
import { FaqSection } from '@/components/sections/Common'
import { Icon } from '@/components/ui/Icon'
import { BrandIcon } from '@/components/ui/BrandIcons'
import { Eyebrow, Reveal, SectionHeading } from '@/components/ui/Reveal'
import { MountainBackground } from '@/components/ui/MountainBackground'

const FORM_STEPS = [
  { id: 'name', label: 'Nama Anda' },
  { id: 'interest', label: 'Kebutuhan' },
  { id: 'budget', label: 'Anggaran' },
  { id: 'message', label: 'Detail Pesan' },
]

export default function Contact() {
  const toast = useToast()

  useSEO({
    title: 'Kontak',
    description: `Hubungi ${site.name} lewat WhatsApp, email, atau formulir di halaman ini. Konsultasi pertama gratis tanpa ikatan. Lokasi ${site.location.full}.`,
  })

  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState({})

  const interestOptions = useMemo(
    () => [
      { value: '', label: 'Pilih topik yang dibahas' },
      { value: 'Frontend Engineering', label: 'Frontend Engineering' },
      { value: 'Backend dan Data', label: 'Backend dan Data' },
      { value: 'Desain dan Creative', label: 'Desain dan Creative' },
      { value: 'DevOps dan Tooling', label: 'DevOps dan Tooling' },
      { value: 'Lainnya', label: 'Topik lainnya' },
    ],
    [],
  )

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}

    if (form.name.trim().length < 3) next.name = 'Nama minimal 3 karakter'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Format email belum benar'
    if (!form.interest) next.interest = 'Silakan pilih jenis kebutuhan'
    if (form.message.trim().length < 12) next.message = 'Ceritakan sedikit lebih detail, minimal 12 karakter'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (!validate()) {
      toast.error('Ada isian yang perlu diperbaiki')
      return
    }

    const message = [
      `Halo Kak Raffi! Saya ${form.name} ingin berdiskusi tentang sebuah proyek.`,
      '',
      form.message.trim(),
      '',
      'Detail kebutuhan saya:',
      `Jenis layanan: ${form.interest}`,
      `Estimasi anggaran: ${form.budget || 'belum ditentukan'}`,
      `Email: ${form.email || 'tidak diisi'}`,
    ].join('\n')

    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
    toast.success('Membuka WhatsApp dengan pesan Anda')
  }

  const copyWa = async () => {
    const ok = await copyToClipboard(whatsapp.number)
    if (ok) toast.success('Nomor WhatsApp disalin')
    else toast.error('Gagal menyalin, salin manual ya')
  }

  const completion = useMemo(() => {
    const filled = [form.name, form.interest, form.budget, form.message].filter((value) => value.trim()).length
    return (filled / FORM_STEPS.length) * 100
  }, [form])

  return (
    <>
      <PageHeader />

      <section className="relative py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Formulir */}
            <Reveal>
              <form
                onSubmit={submit}
                noValidate
                className="glass rounded-[2rem] p-6 shadow-[var(--shadow-lift)] sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-extrabold">Kirim Pesan</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      Isi formulir ini lalu saya akan buka WhatsApp dengan pesan yang sudah terisi.
                    </p>
                  </div>
                  <span className="badge badge-mint">{Math.round(completion)}% terisi</span>
                </div>

                {/* Bilah progres pengisian */}
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-mist-200 dark:bg-pine-900">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-mint-500 to-sky-peak-400"
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {/* Nama */}
                  <Field
                    id="name"
                    label="Nama lengkap"
                    error={errors.name}
                    className="sm:col-span-2"
                  >
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      className={inputClass(Boolean(errors.name))}
                    />
                  </Field>

                  {/* Email */}
                  <Field id="email" label="Email (opsional)" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      placeholder="nama@email.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className={inputClass(Boolean(errors.email))}
                    />
                  </Field>

                  {/* Kebutuhan */}
                  <Field id="interest" label="Jenis kebutuhan" error={errors.interest}>
                    <select
                      id="interest"
                      value={form.interest}
                      onChange={(event) => setField('interest', event.target.value)}
                      aria-invalid={Boolean(errors.interest)}
                      className={cn(inputClass(Boolean(errors.interest)), 'cursor-pointer')}
                    >
                      {interestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Anggaran */}
                  <Field id="budget" label="Estimasi anggaran" className="sm:col-span-2">
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(event) => setField('budget', event.target.value)}
                      className={cn(inputClass(false), 'cursor-pointer')}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Pesan */}
                  <Field id="message" label="Detail kebutuhan Anda" error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(event) => setField('message', event.target.value)}
                      placeholder="Ceritakan ide Anda, masalah yang ingin diselesaikan, dan target waktu pengerjaan."
                      aria-invalid={Boolean(errors.message)}
                      className={cn(inputClass(Boolean(errors.message)), 'resize-y')}
                    />
                  </Field>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary mt-7 w-full"
                >
                  <Send size={17} strokeWidth={2} />
                  Kirim lewat WhatsApp
                </motion.button>

                <p className="mt-3 text-center text-xs text-ink-muted">
                  Data Anda hanya dipakai untuk membalas pesan ini dan tidak disimpan di mana pun.
                </p>
              </form>
            </Reveal>

            {/* Informasi kontak */}
            <Reveal direction="left" delay={0.1}>
              <div className="flex flex-col gap-4">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-mint-600 via-mint-500 to-sky-peak-500 p-6 text-white shadow-[var(--shadow-float)] transition-transform duration-400 hover:-translate-y-1"
                >
                  <div className="absolute -top-12 -right-8 size-40 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
                  <div className="relative flex items-center gap-4">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <BrandIcon name="Whatsapp" width={28} height={28} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold tracking-[0.14em] text-white/80 uppercase">
                        Cara tercepat
                      </p>
                      <p className="mt-1 font-display text-xl font-extrabold">{whatsapp.display}</p>
                      <p className="mt-0.5 text-sm text-white/85">Biasanya membalas dalam 2 jam</p>
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                      Chat sekarang
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                      Konsultasi gratis
                    </span>
                  </div>
                </a>

                {/* Salin nomor */}
                <button
                  type="button"
                  onClick={copyWa}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-left transition-colors duration-400 hover:border-mint-300"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-mint-50 text-mint-600 dark:bg-mint-900/60 dark:text-mint-300">
                      <Icon name="Copy" size={17} strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">Salin nomor WhatsApp</span>
                      <span className="block text-xs text-ink-muted">Klik untuk menyalin ke papan klip</span>
                    </span>
                  </span>
                  <Icon
                    name="CopyCheck"
                    size={16}
                      placeholder="Ceritakan ide Anda, masalah yang ingin diselesaikan, dan target waktu pengerjaan."
                  />
                </button>

                {/* Detail */}
                <ul className="rounded-[2rem] border border-line bg-surface p-6">
                  <h3 className="font-display text-base font-bold">Informasi lain</h3>
                  <ul className="mt-5 space-y-4">
                    <ContactRow icon="Mail" label="Email" value={site.email} href={`mailto:${site.email}`} />
                    <ContactRow icon="Phone" label="Telepon" value={whatsapp.display} href={buildWhatsAppLink()} />
                    <ContactRow icon="MapPin" label="Lokasi" value={site.location.full} />
                    <ContactRow icon="Clock" label="Jam kerja" value="Senin sampai Jumat, 09.00 sampai 18.00 WIB" />
                  </ul>
                </ul>

                {/* Media sosial */}
                <div className="rounded-[2rem] border border-line bg-surface p-6">
                  <h3 className="font-display text-base font-bold">Temukan saya di media sosial</h3>
                  <ul className="mt-4 grid gap-2">
                    {socials.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-canvas"
                        >
                          <span
                            className="grid size-9 shrink-0 place-items-center rounded-lg transition-transform duration-400 group-hover:scale-110"
                            style={{ background: `color-mix(in srgb, ${item.color} 16%, transparent)`, color: item.color }}
                          >
                            {item.id === 'email' ? (
                              <Icon name="Mail" size={16} strokeWidth={2} />
                            ) : (
                              <BrandIcon name={item.icon} width={16} height={16} />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">{item.label}</span>
                            <span className="block truncate text-xs text-ink-muted">{item.handle}</span>
                          </span>
                          <Icon
                            name="ArrowUpRight"
                            size={15}
                            className="shrink-0 text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MapSection />
      <FaqSection />
    </>
  )
}

const inputClass = (invalid) =>
  cn(
    'w-full rounded-2xl border bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted',
    invalid ? 'border-red-400 focus:border-red-500' : 'border-line focus:border-mint-400',
  )

function Field({ id, label, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-ink-soft">
        {label}
      </label>
      {children}
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
        >
          <Icon name="AlertCircle" size={12} strokeWidth={2.2} />
          {error}
        </motion.p>
      ) : null}
    </div>
  )
}

function ContactRow({ icon, label, value, href }) {
  const content = (
    <span className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist-100 text-ink-soft dark:bg-pine-900">
        <Icon name={icon} size={16} strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.65rem] font-semibold tracking-[0.12em] text-ink-muted uppercase">{label}</span>
        <span className="mt-0.5 block text-sm font-semibold break-words text-ink">{value}</span>
      </span>
    </span>
  )

  return (
    <li>
      {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

function PageHeader() {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
      <MountainBackground intensity={0.55} showMist={false} />
      <div className="container-page relative z-10">
        <Reveal>
          <Eyebrow>Kontak</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Mari <span className="text-gradient">Berdiskusi</span> tentang Ide Anda
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            Punya proyek, pertanyaan, atau ingin tahu layanan yang saya tawarkan? Pilih cara yang paling nyaman untuk Anda.
            biasanya membalas dalam dua jam pada jam kerja.
          </p>
        </Reveal>
      </div>
    </header>
  )
}

function MapSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          align="left"
          eyebrow="Lokasi"
          title="Saya Berbasis di Bogor"
          description="Ruang kerja saya berada di pusat kota Bogor dengan akses internet cepat dan sering Berkunjung ke kampus serta komunitas teknologi."
        />

        <Reveal delay={0.1}>
          <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-lift)]">
            {/* Cadangan di belakang iframe, tampil bila peta gagal dimuat */}
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-mint-100 via-surface to-sky-peak-100 p-8 text-center dark:from-pine-900 dark:via-surface dark:to-pine-800">
              <div>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-surface text-mint-600 shadow-[var(--shadow-soft)] dark:text-mint-300">
                  <Icon name="MapPin" size={26} strokeWidth={1.8} />
                </span>
                <p className="mt-4 font-display text-lg font-bold">{site.location.full}</p>
                <p className="mt-1.5 text-sm text-ink-muted">
                  Peta interaktif dari Google Maps. Gunakan tombol di bawah untuk membuka lokasi.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mt-5"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>

            <iframe
              title={`Peta lokasi ${site.location.full}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.location.mapQuery)}&output=embed`}
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative block h-[380px] w-full border-0 grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
