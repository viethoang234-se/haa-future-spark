import { SiteNav } from '@/components/site-nav'
import { ScrollNav } from '@/components/scroll-nav'
import { Hero } from '@/components/hero'
import { AboutFutureSparks } from '@/components/about-future-sparks'
import { CompetitionDetails } from '@/components/competition-details'
import { AnniversaryBanner } from '@/components/anniversary-banner'
import { ExhibitionPreview } from '@/components/exhibition-preview'
import { JourneyTimeline } from '@/components/journey-timeline'
import { Partners } from '@/components/partners'
import { RegisterForm } from '@/components/register-form'
import { ContactNewsletter } from '@/components/contact-newsletter'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative">
      <SiteNav />
      <ScrollNav />
      <Hero />
      <AboutFutureSparks />
      <CompetitionDetails />
      <AnniversaryBanner />
      <ExhibitionPreview />
      <JourneyTimeline />
      <Partners />
      <RegisterForm />
      <ContactNewsletter />
      <SiteFooter />
    </main>
  )
}
