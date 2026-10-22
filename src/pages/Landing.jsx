import { Sparkles } from 'lucide-react'

import { skillsMarquee, site } from '@/data/siteData'
import { useHomeStructuredData, useSEO } from '@/hooks/useSEO'
import { Hero } from '@/components/sections/Hero'
import { AboutSection } from '@/components/sections/About'
import { SkillsSection } from '@/components/sections/Skills'
import { ServicesSection } from '@/components/sections/Services'
import { WorkSection } from '@/components/sections/Work'
import { ProcessSection } from '@/components/sections/Process'
import { StatsSection } from '@/components/sections/Stats'
import { FaqSection } from '@/components/sections/Faq'
import { ContactSection } from '@/components/sections/ContactSection'
import { Marquee } from '@/components/ui/Marquee'

/** Satu halaman landing — seluruh konten dirangkai di sini */
export default function Landing({ onOpenProject }) {
  useSEO({
    title: null,
    description: site.description,
  })

  useHomeStructuredData()

  return (
    <>
      <div id="atas" className="scroll-mt-24">
        <Hero />
      </div>
      <SkillsMarquee />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <WorkSection onOpenProject={onOpenProject} />
      <ProcessSection />
      <FaqSection id="faq" />
      <ContactSection />
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
