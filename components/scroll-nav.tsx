'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'contest', label: 'Competition' },
  { id: 'exhibition', label: 'Exhibition' },
  { id: 'journey', label: 'Journey' },
  { id: 'partners', label: 'Partners' },
  { id: 'register', label: 'Register' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollNav() {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120)
      let current = ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Quick section navigation"
          className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 xl:flex"
        >
          {sections.map((s) => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                aria-label={`Go to ${s.label}`}
                className="group flex items-center gap-2"
              >
                <span
                  className={cn(
                    'rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200',
                    'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
                    isActive && 'opacity-100 translate-x-0',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'glass text-muted-foreground group-hover:text-foreground',
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    'block rounded-full transition-all duration-200',
                    isActive
                      ? 'size-3 bg-primary shadow-[0_0_8px_var(--haa-red)]'
                      : 'size-2 bg-muted-foreground/50 group-hover:bg-foreground/70',
                  )}
                />
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
