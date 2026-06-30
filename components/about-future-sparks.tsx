'use client'

import Image from 'next/image'
import { GraduationCap, Globe, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

const audience = [
  'University students',
  'College students',
  'Young creatives',
  'Advertising enthusiasts',
]

const themePillars = [
  'Storytelling',
  'Vietnamese culture',
  'Digital innovation',
  'Global branding',
]

export function AboutFutureSparks() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-border glass">
                <Image
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80"
                  alt="Abstract illustration of a creative spark formed by glowing red and blue particle networks"
                  width={720}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                The Competition
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Future Sparks
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                In celebration of the 25th anniversary of the Ho Chi Minh City
                Advertising Association (HAA), Future Sparks is a digital
                advertising idea competition designed to discover and honor the
                most innovative ideas from students and young creatives.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                The competition encourages participants to combine creativity,
                technology, and Vietnamese cultural identity to shape the future
                of advertising.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-5">
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <GraduationCap className="size-5" />
                  </div>
                  <h3 className="text-sm font-semibold">Target Audience</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {audience.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="h-full rounded-2xl border border-border bg-card p-5">
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                    <Globe className="size-5" />
                  </div>
                  <h3 className="text-sm font-semibold">Competition Theme</h3>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Vietnamese Advertising Goes Global
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {themePillars.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <a
                href="#register"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
              >
                Submit Your Idea
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
