'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './reveal'

const milestones = [
  {
    year: '2001',
    title: 'Foundation',
    desc: "The Ho Chi Minh City Advertising Association (HAA) has been officially established, marking important steps in connecting advertising businesses. The organization carries the mission of protecting the rights of its members, creating a professional platform, and promoting the sustainable development of the city's specialized advertising industry.",
    metric: '38 founding members',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  },
  {
    year: '2005',
    title: 'Industry Expansion',
    desc: 'HAA underwent a period of significant consolidation through its congresses (terms IV and V). HAA built and developed an OOH (outdoor advertising) forum with thousands of members, helping to connect supply chains and promote trade effectively.',
    metric: '200+ member agencies',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
  },
  {
    year: '2025',
    title: 'Digital Transformation',
    desc: 'The National Assembly passed the Law on Advertising (amended), this is an important legal milestone when supplementing regulations for digital advertising and KOL/KOC. HAA has contributed many close opinions to protect members\' rights and orient businesses to adapt to the new law.',
    metric: 'First digital summit',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80',
  },
  {
    year: '2025',
    title: 'Community Growth',
    desc: 'At the Extraordinary Congress term I (2025-2030), the Ho Chi Minh City Advertising Association was officially upgraded to the Ho Chi Minh City Advertising Association (HAA), marking a remarkable development in stature, space and scale of operations.',
    metric: '5,000+ professionals',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80',
  },
  {
    year: '2025',
    title: 'Innovation Leadership',
    desc: 'Also during this special Congress, Mr. Nguyen Thanh Dao continued to be elected as Chairman of the Association. HAA has launched an affiliated KOL & KOC Club to manage and develop new media trends and commit to saying no to false advertising.',
    metric: '50+ award-winning works',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=80',
  },
  {
    year: '2026',
    title: 'Orientation',
    desc: 'The association focuses on tightening strategic cooperation with press agencies and expanding regional links. Currently, HAA is focusing on supporting members to explore the large-scale advertising market and exploit the economic - cultural - tourism values of the city.',
    metric: 'A new era begins',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=700&q=80',
  },
]

export function JourneyTimeline() {
  const [active, setActive] = useState(milestones.length - 1)
  const current = milestones[active]

  return (
    <section id="journey" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Our Journey
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            25 Years in the Making
          </h2>
        </Reveal>

        {/* horizontal timeline rail */}
        <Reveal className="mt-12">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[18px] h-0.5 bg-border" />
            <div className="relative grid grid-cols-3 gap-y-8 sm:grid-cols-6">
              {milestones.map((m, i) => {
                const isActive = i === active
                return (
                  <button
                    key={`${m.year}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-center text-center"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`flex size-9 items-center justify-center rounded-full border-2 transition-all ${
                        isActive
                          ? 'border-primary bg-primary shadow-[0_0_18px_var(--haa-red)]'
                          : 'border-border bg-card group-hover:border-primary/60'
                      }`}
                    >
                      <span
                        className={`size-2.5 rounded-full ${
                          isActive ? 'bg-primary-foreground' : 'bg-muted-foreground'
                        }`}
                      />
                    </span>
                    <span
                      className={`mt-3 font-mono text-sm font-bold transition-colors ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {m.year}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* detail panel */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid items-center gap-8 rounded-3xl border border-border glass p-6 sm:p-8 lg:grid-cols-2"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={current.image}
                  alt={`${current.title} — HAA in ${current.year}`}
                  width={720}
                  height={460}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground">
                    {current.year}
                  </span>
                  <h3 className="text-2xl font-bold">{current.title}</h3>
                </div>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {current.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
