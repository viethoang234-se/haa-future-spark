'use client'

import { Reveal } from './reveal'

const categories = [
  {
    label: 'Strategic Partners',
    names: ['Vietstar Group', 'Saigon Media', 'NovaBrand'],
  },
  {
    label: 'Agency Partners',
    names: ['Lân Creative', 'Mekong Ideas', 'Pixel Lab', 'Studio Hồng'],
  },
  {
    label: 'Media Partners',
    names: ['Tuổi Trẻ Digital', 'VietAds Network', 'Echo Press'],
  },
  {
    label: 'Academic Partners',
    names: ['UEH', 'RMIT Vietnam', 'Văn Lang University', 'HUTECH'],
  },
]

const marquee = categories.flatMap((c) => c.names)

export function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Partners
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Powered by a community of leaders
          </h2>
        </Reveal>
      </div>

      {/* infinite logo marquee */}
      <div className="relative mt-12 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[...marquee, ...marquee].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-border glass px-6 text-sm font-semibold tracking-wide text-foreground/80 transition-colors hover:text-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {categories.map((c, i) => (
          <Reveal key={c.label} delay={(i % 4) * 0.07}>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-primary">{c.label}</h3>
              <ul className="mt-3 space-y-2">
                {c.names.map((n) => (
                  <li
                    key={n}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    title={n}
                  >
                    <span className="size-1.5 rounded-full bg-secondary transition-transform group-hover:scale-150" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
