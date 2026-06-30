'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function JourneyIntro() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              About Us
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Over two decades weaving the history of advertising
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              Over more than two decades of formation and growth, the Ho Chi Minh City Advertising Association (HAA) has continuously strengthened itself, affirming its role as a reputable socio-professional organization — a trusted bridge between advertising businesses, state management agencies, and the broader community.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Through every phase, HAA has accompanied the economic, cultural, and social development of the city, contributing to building a civilized, creative, and sustainable advertising industry.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/80">
              <span className="size-2 rounded-full bg-primary" />
              Ho Chi Minh City Advertising Association
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
                alt="HAA — 25-Year Journey in Vietnam's Advertising Industry"
                width={900}
                height={600}
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="glass absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 sm:left-6 sm:bottom-6">
              <p className="font-mono text-3xl font-extrabold text-primary">25</p>
              <p className="mt-0.5 text-xs text-muted-foreground">years of building</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
