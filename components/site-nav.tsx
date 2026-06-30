'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn, withBasePath } from '@/lib/utils'

const subPages = [
  { label: 'Gallery', href: '/gallery' },
  { label: '25-Year Journey', href: '/hanh-trinh-25-nam' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activePath, setActivePath] = useState('')

  useEffect(() => {
    // Strip basePath prefix so comparisons against route-relative hrefs still work
    const path = window.location.pathname.replace(/^\/haa-future-spark/, '') || '/'
    setActivePath(path)
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href={withBasePath("/")} className="flex items-center gap-2">
          <img src={withBasePath("/logo-cua-ban.png")} alt="HAA" className="size-9 rounded-lg" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">HAA</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Future Sparks
            </span>
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {subPages.map((l) => {
            const isActive = activePath === l.href
            return (
              <li key={l.href}>
                <a
                  href={withBasePath(l.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground',
                    isActive ? 'bg-muted text-foreground' : 'text-foreground/80',
                  )}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={withBasePath("/#register")}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 sm:inline-flex"
          >
            Register Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {subPages.map((l) => (
              <li key={l.href}>
                <a
                  href={withBasePath(l.href)}
                  onClick={() => setOpen(false)}
                  aria-current={activePath === l.href ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium hover:bg-muted',
                    activePath === l.href ? 'bg-muted text-foreground' : 'text-foreground/90',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={withBasePath("/#register")}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Register Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
