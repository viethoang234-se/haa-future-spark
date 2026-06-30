'use client'

import Image from 'next/image'
import { ArrowRight, Eye } from 'lucide-react'
import { Reveal } from './reveal'

const ideas = [
  {
    title: 'Echoes of Đông Sơn',
    category: 'Storytelling',
    team: 'Team Lạc Hồng',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
  },
  {
    title: 'Neural Phở Network',
    category: 'Technology',
    team: 'Team Synapse',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  },
  {
    title: 'Green Hẻm Project',
    category: 'Social Impact',
    team: 'Team Vòng Tròn',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
  },
  {
    title: 'Made in Vietnam, Loved Worldwide',
    category: 'Branding',
    team: 'Team Vươn Xa',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
  },
  {
    title: 'The Last Cyclo',
    category: 'Storytelling',
    team: 'Team Ký Ức',
    image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=600&q=80',
  },
  {
    title: 'AR Tết Reimagined',
    category: 'Technology',
    team: 'Team Pixel Lân',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
]

export function ExhibitionPreview() {
  return (
    <section id="exhibition" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Digital Exhibition
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            25 Impacts
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Discover the Top 25 Future Sparks ideas shaping the future of
            Vietnamese advertising.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea, i) => (
            <Reveal key={idea.title} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={idea.image}
                    alt={`Concept artwork for ${idea.title}`}
                    width={600}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                    {idea.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                    {idea.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {idea.team}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                    <Eye className="size-3.5" /> View concept
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#exhibition"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
          >
            View All 25 Ideas
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
