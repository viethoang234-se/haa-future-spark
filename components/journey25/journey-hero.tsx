'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { withBasePath } from '@/lib/utils'

export function JourneyHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden"
      aria-label="HAA 25-Year Journey Hero"
    >
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80)',
          }}
        />
        {/* Layered gradient for drama */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-haa-navy/50 via-transparent to-haa-navy/30" />
      </motion.div>

      {/* Animated year lines — structural decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {['2001', '2010', '2018', '2025', '2026'].map((yr, i) => (
          <motion.div
            key={yr}
            className="absolute text-[11vw] font-black text-white/[0.025] select-none whitespace-nowrap"
            style={{ top: `${8 + i * 18}%`, left: i % 2 === 0 ? '-2%' : 'auto', right: i % 2 !== 0 ? '-2%' : 'auto' }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {yr}
          </motion.div>
        ))}
      </div>

      {/* Floating glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute left-[10%] top-[20%] size-80 rounded-full bg-primary/20 blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[8%] bottom-[25%] size-64 rounded-full bg-secondary/20 blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center gap-2 text-xs text-white/50"
        >
          <a href={withBasePath("/")} className="transition-colors hover:text-white/80">Home</a>
          <span aria-hidden>/</span>
          <span className="text-white/70">25-Year Journey</span>
        </motion.nav>

        {/* Eyebrow — year span as a timeline strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 flex w-fit items-center gap-3"
        >
          <span className="h-px w-12 bg-primary/70" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
            HAA · 2001 — 2026
          </span>
          <span className="h-px w-12 bg-primary/70" />
        </motion.div>

        {/* Main headline — split for visual weight */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-balance font-extrabold tracking-tight leading-[0.9]">
            <span className="block text-5xl sm:text-7xl lg:text-[6rem] text-white drop-shadow-2xl">
              25 Years
            </span>
            <span className="block mt-2 text-3xl sm:text-5xl lg:text-6xl text-gradient-brand drop-shadow-lg">
              of Building
            </span>
            <span className="block mt-1 text-2xl sm:text-4xl lg:text-5xl text-white/80 font-semibold tracking-normal">
              Vietnam's Advertising Industry
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/65"
        >
          From a handful of founding members in 2001 to a nationally recognized association —
          a journey of two decades connecting, innovating, and sustainably shaping Vietnam's
          creative economy.
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {[
            { value: '25', label: 'Years' },
            { value: '300+', label: 'Member Companies' },
            { value: '15+', label: 'VietAd Editions' },
            { value: '5000+', label: 'Professionals Connected' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl font-black text-primary tracking-tight">{s.value}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 mt-0.5">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={withBasePath("/hanh-trinh-25-nam#timeline")}
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
          >
            Explore the Timeline
          </a>
          <a
            href={withBasePath("/")}
            className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            Back to Home
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1"
            aria-hidden
          >
            <span className="block h-2.5 w-0.5 rounded-full bg-white/40" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  )
}
