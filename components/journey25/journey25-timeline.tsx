'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { timelineData } from '@/lib/journey-25-data'

// Single timeline entry
function TimelineEntry({
  item,
  index,
}: {
  item: (typeof timelineData)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
      {/* Connector node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute left-4 top-6 z-10 hidden lg:block lg:left-1/2 lg:-translate-x-1/2"
      >
        <span className="flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_24px_var(--haa-red)/40%]">
          <span className="font-mono text-xs font-bold text-primary">{item.year.slice(2)}</span>
        </span>
      </motion.div>

      {/* Content: alternate left/right */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={isEven ? 'lg:order-1' : 'lg:order-2'}
      >
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground">
              {item.year}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold sm:text-2xl">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
          {item.context && (
            <details className="mt-4 group">
              <summary className="cursor-pointer text-sm font-medium text-primary hover:underline list-none flex items-center gap-1.5">
                <span className="transition-transform group-open:rotate-90">▶</span>
                Context & Impact
              </summary>
              <div className="mt-3 space-y-2 border-l-2 border-primary/30 pl-4">
                {item.context && <p className="text-sm leading-relaxed text-muted-foreground">{item.context}</p>}
                {item.impact && <p className="text-sm leading-relaxed text-muted-foreground">{item.impact}</p>}
              </div>
            </details>
          )}
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:block ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {item.image ? (
          <div className="overflow-hidden rounded-2xl border border-border">
            <Image
              src={item.image}
              alt={`${item.title} — HAA ${item.year}`}
              width={700}
              height={420}
              className="aspect-[5/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex aspect-[5/3] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 text-muted-foreground">
            Image coming soon
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function Journey25Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative py-24" aria-labelledby="timeline-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Timeline
          </span>
          <h2
            id="timeline-heading"
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            The milestones that shaped history
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Every year a chapter — every chapter a step forward for Vietnam's advertising industry.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mt-20">
          {/* Vertical line (desktop) — scroll-driven draw */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full origin-top bg-gradient-to-b from-primary to-secondary"
            />
          </div>

          {/* Entries */}
          <div className="space-y-20">
            {timelineData.map((item, index) => (
              <TimelineEntry key={`${item.year}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
