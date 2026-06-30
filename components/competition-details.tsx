'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardList,
  PieChart,
  Trophy,
  CalendarClock,
  FileText,
  UploadCloud,
  MailCheck,
  UserPlus,
  Check,
} from 'lucide-react'
import { Reveal } from './reveal'

const tabs = [
  { id: 'participate', label: 'How To Participate', icon: ClipboardList },
  { id: 'criteria', label: 'Evaluation Criteria', icon: PieChart },
  { id: 'awards', label: 'Awards', icon: Trophy },
  { id: 'timeline', label: 'Timeline', icon: CalendarClock },
] as const

type TabId = (typeof tabs)[number]['id']

const steps = [
  {
    icon: UserPlus,
    title: 'Register online',
    desc: 'Create your participant profile through the microsite registration form.',
  },
  {
    icon: FileText,
    title: 'Prepare submission',
    desc: 'Accepted formats: PDF, DOCX, PPTX, MP4. Proposal max 10 pages · Slides max 15 · Optional video max 3 minutes.',
  },
  {
    icon: UploadCloud,
    title: 'Upload via microsite',
    desc: 'Submit your proposal, presentation, and optional video securely online.',
  },
  {
    icon: MailCheck,
    title: 'Confirmation email',
    desc: 'Receive instant confirmation once your entry is successfully received.',
  },
]

const criteria = [
  { label: 'Creativity & Innovation', value: 30, color: 'var(--haa-red)' },
  { label: 'Feasibility', value: 25, color: 'var(--haa-blue)' },
  { label: 'Digital Technology Application', value: 20, color: 'oklch(0.7 0.13 250)' },
  { label: 'Social & Community Impact', value: 15, color: 'oklch(0.78 0.1 60)' },
  { label: 'Presentation & Persuasion', value: 10, color: 'oklch(0.65 0.16 20)' },
]

const awards = [
  {
    tier: 'Top 25',
    items: [
      'Featured in the Digital Exhibition',
      'Official HAA Certificate',
      'Featured on the microsite',
    ],
  },
  {
    tier: 'Top 5',
    items: [
      'Internship opportunities',
      'Scholarships',
      'Creative development support',
      'Exclusive HAA Anniversary gifts',
    ],
  },
]

const milestones = [
  { date: 'Registration Opens', detail: 'Sign-ups open to students and young creatives nationwide.' },
  { date: 'Submission Deadline', detail: 'Final date to upload proposals, presentations, and videos.' },
  { date: 'Judging Period', detail: 'Expert panel reviews and scores all qualifying entries.' },
  { date: 'Top 25 Announcement', detail: 'Finalists revealed and featured in the digital exhibition.' },
  { date: 'Award Ceremony', detail: 'Top 5 honored at the HAA 25th Anniversary celebration.' },
]

function CriteriaChart() {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  let offset = 0
  return (
    <div className="relative mx-auto size-56">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="22"
        />
        {criteria.map((c) => {
          const length = (c.value / 100) * circumference
          const seg = (
            <circle
              key={c.label}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={c.color}
              strokeWidth="22"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
          offset += length
          return seg
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold">100%</span>
        <span className="text-xs text-muted-foreground">Scoring</span>
      </div>
    </div>
  )
}

export function CompetitionDetails() {
  const [active, setActive] = useState<TabId>('participate')

  return (
    <section id="contest" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Competition Details
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need to enter
          </h2>
        </Reveal>

        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((t) => {
              const Icon = t.icon
              const isActive = active === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'border border-border glass text-foreground/80 hover:text-foreground'
                  }`}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              )
            })}
          </div>

          <div className="mt-10 rounded-3xl border border-border glass p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {active === 'participate' && (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((s, i) => {
                      const Icon = s.icon
                      return (
                        <div
                          key={s.title}
                          className="relative rounded-2xl border border-border bg-card p-5"
                        >
                          <span className="absolute right-4 top-4 font-mono text-xs text-muted-foreground">
                            0{i + 1}
                          </span>
                          <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <Icon className="size-5" />
                          </div>
                          <h3 className="text-sm font-semibold">{s.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {s.desc}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}

                {active === 'criteria' && (
                  <div className="grid items-center gap-10 lg:grid-cols-2">
                    <CriteriaChart />
                    <ul className="space-y-3">
                      {criteria.map((c) => (
                        <li
                          key={c.label}
                          className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3"
                        >
                          <span className="flex items-center gap-3 text-sm font-medium">
                            <span
                              className="size-3 rounded-full"
                              style={{ backgroundColor: c.color }}
                            />
                            {c.label}
                          </span>
                          <span className="font-mono text-sm font-bold">
                            {c.value}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {active === 'awards' && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {awards.map((a, i) => (
                      <div
                        key={a.tier}
                        className={`rounded-2xl border p-6 ${
                          i === 1
                            ? 'border-primary/40 bg-primary/5'
                            : 'border-border bg-card'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Trophy
                            className={
                              i === 1 ? 'size-6 text-primary' : 'size-6 text-secondary'
                            }
                          />
                          <h3 className="text-xl font-bold">{a.tier}</h3>
                        </div>
                        <ul className="mt-4 space-y-2.5">
                          {a.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {active === 'timeline' && (
                  <ol className="relative ml-3 border-l border-border">
                    {milestones.map((m, i) => (
                      <li key={m.date} className="mb-8 ml-6 last:mb-0">
                        <span className="absolute -left-[9px] flex size-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {i + 1}
                        </span>
                        <h3 className="text-base font-semibold">{m.date}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {m.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
