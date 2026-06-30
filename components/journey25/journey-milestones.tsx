'use client'

import { motion } from 'framer-motion'
import { milestoneCards } from '@/lib/journey-25-data'

export function JourneyMilestones() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="milestones-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Key Milestones
          </span>
          <h2
            id="milestones-heading"
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            6 milestones that shaped HAA
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {milestoneCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Gradient glow on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 to-secondary/8" />
              </div>

              <div
                className="mb-4 text-3xl"
                aria-hidden
                role="img"
                aria-label={card.title}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
