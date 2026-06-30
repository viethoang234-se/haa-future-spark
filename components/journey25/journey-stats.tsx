'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { statsData } from '@/lib/journey-25-data'

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const start = performance.now()
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(eased * end))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {val.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function JourneyStats() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="stats-heading">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-haa-navy/60 to-background" aria-hidden />
      <div className="absolute -right-40 -top-40 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -left-40 -z-10 size-96 rounded-full bg-secondary/10 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Achievements
          </span>
          <h2 id="stats-heading" className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Numbers that speak for themselves
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center sm:p-8"
            >
              <p className="font-mono text-4xl font-extrabold tracking-tight text-gradient-brand sm:text-5xl">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{stat.labelEn ?? stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
