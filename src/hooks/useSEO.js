import { useEffect } from 'react'

import { faqs, services, site } from '@/data/siteData'

/**
 * Kelola meta tag per halaman tanpa memuat pustaka SEO tambahan.
 * Dipanggil sekali di setiap komponen halaman.
 */
export function useSEO({ title, description, image = '/og-image.svg', type = 'website', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`
    const metaDescription = description || site.description

    document.title = fullTitle

    setMeta('name', 'description', metaDescription)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', metaDescription)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', `${site.url}${window.location.pathname}`)
    setMeta('property', 'og:image', `${site.url}${image}`)

    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', metaDescription)
    setMeta('name', 'twitter:image', `${site.url}${image}`)

    setLinkCanonical(`${site.url}${window.location.pathname}`)
  }, [title, description, image, type, noindex])
}

/** Tambah atau perbarui satu meta tag */
function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

/** Perbarui tautan canonical */
function setLinkCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]')

  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

/**
 * Sisipkan data terstruktur JSON-LD di dalam head.
 * Membantu mesin pencari memahami profil dan layanan yang ditawarkan.
 */
export function useStructuredData(data) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    script.dataset.dynamic = 'true'
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [data])
}

/** Data terstruktur untuk halaman utama */
export function useHomeStructuredData() {
  useStructuredData({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        jobTitle: site.role,
        description: site.description,
        url: site.url,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.location.city,
          addressRegion: site.location.province,
          addressCountry: 'ID',
        },
        knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'UI/UX', 'Tailwind CSS'],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — Portofolio`,
        inLanguage: 'id-ID',
        publisher: { '@id': `${site.url}/#person` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Layanan yang Ditawarkan',
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: service.title,
            description: service.short,
            provider: { '@id': `${site.url}/#person` },
          },
        })),
      },
    ],
  })
}