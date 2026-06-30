'use client'

import { motion } from 'framer-motion'
import { withBasePath } from '@/lib/utils'

export function JourneyVision() {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36"
      aria-labelledby="vision-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-haa-navy/80 via-background to-background" aria-hidden />
      <div className="absolute -left-60 top-0 -z-10 size-[600px] rounded-full bg-primary/8 blur-3xl" aria-hidden />
      <div className="absolute -right-60 bottom-0 -z-10 size-[600px] rounded-full bg-secondary/8 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Vision for the Future
          </span>

          <h2
            id="vision-heading"
            className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            25 years — The foundation for{' '}
            <span className="text-gradient-brand">the next chapter</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            The Association focuses on strengthening strategic partnerships with media organizations and expanding regional connections. HAA is working to help members access large-scale advertising markets, leveraging the economic, cultural, and tourism values of Ho Chi Minh City.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            With the launch of the KOL & KOC Club and a comprehensive digital transformation strategy, HAA is ready to lead Vietnam's advertising industry into a new era — creative, civilized, and sustainable.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={withBasePath("/#register")}
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
            >
              Join Future Sparks
            </a>
            <a
              href={withBasePath("/")}
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary/60 hover:text-foreground"
            >
              Explore More
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-sm font-medium text-gradient-brand"
        >
          25 Years of Impact — Building the Future
        </motion.p>
      </div>
    </section>
  )
}
