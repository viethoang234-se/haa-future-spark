import Image from 'next/image'
import { withBasePath } from '@/lib/utils'

const cols = [
  {
    title: 'Future Sparks',
    links: ['About', 'How to Participate', 'Awards', 'Timeline'],
  },
  {
    title: 'Explore',
    links: ['25 Impacts', 'HAA Journey', 'Gallery', 'Partners'],
  },
  {
    title: 'Connect',
    links: ['Contact', 'Newsletter', 'Press', 'FAQ'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <img src={withBasePath('/logo-cua-ban.png')} alt="HAA" className="size-9 rounded-lg" />
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight">HAA</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Future Sparks
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Celebrating 25 years of the Ho Chi Minh City Advertising
              Association and inspiring the next generation of creative leaders.
            </p>
            <p className="mt-4 text-sm font-medium text-gradient-brand">
              25 Years of Impact — Building the Future
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ho Chi Minh City Advertising
            Association. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Future Sparks · 25th Anniversary Edition
          </p>
        </div>
      </div>
    </footer>
  )
}
