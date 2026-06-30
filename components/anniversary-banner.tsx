'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

export function AnniversaryBanner() {
  return (
    <section className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto"
          >
            <span className="block bg-gradient-to-br from-primary to-secondary bg-clip-text text-[10rem] font-black leading-none text-transparent sm:text-[14rem]">
              25
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 block animate-pulse text-[10rem] font-black leading-none text-primary/20 blur-2xl sm:text-[14rem]"
            >
              25
            </span>
          </motion.div>

          <div className="text-center lg:text-left">
            <Reveal>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
                25 Years of Impact
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground lg:mx-0">
                Celebrating a legacy of innovation while inspiring the next
                generation of advertising leaders. From a founding vision in
                1999 to shaping the future of Vietnamese creativity today.
              </p>
            </Reveal>

            {/* glowing timeline bar */}
            <Reveal delay={0.15}>
              <div className="mx-auto mt-8 h-1.5 max-w-md overflow-hidden rounded-full bg-muted lg:mx-0">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_18px_var(--haa-blue)]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <a
                href="#journey"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-border glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Explore Our Journey
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
