import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { JourneyHero } from '@/components/journey25/journey-hero'
import { JourneyIntro } from '@/components/journey25/journey-intro'
import { Journey25Timeline } from '@/components/journey25/journey25-timeline'
import { JourneyMilestones } from '@/components/journey25/journey-milestones'
import { JourneyStats } from '@/components/journey25/journey-stats'
import { JourneyGallery } from '@/components/journey25/journey-gallery'
import { JourneyVision } from '@/components/journey25/journey-vision'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '25-Year Journey | HAA Future Sparks',
  description:
    "Explore the 25-year journey of the Ho Chi Minh City Advertising Association (HAA) — from its founding days to the vision shaping the future of Vietnam's advertising industry.",
}

export default function HanhTrinh25NamPage() {
  return (
    <main className="relative">
      <SiteNav />
      <JourneyHero />
      <JourneyIntro />
      <Journey25Timeline />
      <JourneyMilestones />
      <JourneyStats />
      <JourneyGallery />
      <JourneyVision />
      <SiteFooter />
    </main>
  )
}
