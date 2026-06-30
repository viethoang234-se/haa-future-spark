'use client'

import { useState } from 'react'
import { MapPin, Mail, Phone, Globe, Share2, Send, Check } from 'lucide-react'
import { Reveal } from './reveal'

/* ── shared styles ─────────────────────────────────────────────── */
const inputClass =
  'w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground/90'

/* ── inline validation ─────────────────────────────────────────── */
function validateField(id: string, value: string): string {
  if (!value.trim()) return 'This field is required.'
  if (id === 'nl-email' || id === 'ct-email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Enter a valid email address.'
  }
  if (id === 'ct-message' && value.trim().length < 10)
    return 'Please write at least 10 characters.'
  return ''
}

interface HintFieldProps {
  id: string
  label: string
  hint: string
  example?: string
  type?: string
  required?: boolean
  errors: Record<string, string>
  onBlur: (id: string, val: string) => void
  onChange?: (id: string, val: string) => void
}

function HintField({ id, label, hint, example, type = 'text', required = true, errors, onBlur, onChange }: HintFieldProps) {
  const hasErr = !!errors[id]
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={hasErr || undefined}
        aria-describedby={`${id}-desc`}
        className={inputClass}
        onBlur={(e) => onBlur(id, e.target.value)}
        onChange={(e) => { if (hasErr) onChange?.(id, e.target.value) }}
      />
      <p id={`${id}-desc`} className="mt-1 text-xs text-muted-foreground">
        {hasErr
          ? <span className="font-medium text-destructive" role="alert">{errors[id]}</span>
          : example
            ? <>{hint} <span className="italic">Ví dụ: {example}</span></>
            : hint}
      </p>
    </div>
  )
}

/* ── Contact form ──────────────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (id: string, val: string) => {
    const msg = validateField(id, val)
    setErrors((p) => ({ ...p, [id]: msg }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const els = Array.from(e.currentTarget.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea'))
    const newErrors: Record<string, string> = {}
    let hasError = false
    els.forEach((el) => {
      if (!el.id) return
      const msg = validateField(el.id, el.value)
      if (msg) { newErrors[el.id] = msg; hasError = true }
    })
    if (hasError) { setErrors((p) => ({ ...p, ...newErrors })); return }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="mt-6 flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="size-6" />
        </div>
        <p className="font-semibold">Message sent!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll get back to you within 2 business days.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-xs text-muted-foreground underline hover:text-foreground"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <HintField
          id="ct-name"
          label="Full Name"
          hint="Your name so we can address you properly."
          example="Nguyễn Văn A"
          errors={errors}
          onBlur={validate}
          onChange={validate}
        />
        <HintField
          id="ct-email"
          label="Email"
          type="email"
          hint="We'll reply to this address."
          example="ten@email.com"
          errors={errors}
          onBlur={validate}
          onChange={validate}
        />
      </div>
      <HintField
        id="ct-subject"
        label="Subject"
        hint="A brief topic for your message."
        example="Question about the submission deadline"
        errors={errors}
        onBlur={validate}
        onChange={validate}
      />
      <div>
        <label htmlFor="ct-message" className={labelClass}>
          Message<span className="ml-0.5 text-destructive">*</span>
        </label>
        <textarea
          id="ct-message"
          required
          rows={4}
          aria-invalid={!!errors['ct-message'] || undefined}
          aria-describedby="ct-message-desc"
          className={inputClass}
          onBlur={(e) => validate('ct-message', e.target.value)}
          onChange={(e) => { if (errors['ct-message']) validate('ct-message', e.target.value) }}
        />
        <p id="ct-message-desc" className="mt-1 text-xs text-muted-foreground">
          {errors['ct-message']
            ? <span className="font-medium text-destructive" role="alert">{errors['ct-message']}</span>
            : 'Describe your question or feedback in as much detail as you need.'}
        </p>
      </div>
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
      >
        <Send className="size-4" />
        Send Message
      </button>
    </form>
  )
}

/* ── Newsletter form ───────────────────────────────────────────── */
function NewsletterForm() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (id: string, val: string) => {
    const msg = validateField(id, val)
    setErrors((p) => ({ ...p, [id]: msg }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const els = Array.from(e.currentTarget.querySelectorAll<HTMLInputElement>('input'))
    const newErrors: Record<string, string> = {}
    let hasError = false
    els.forEach((el) => {
      if (!el.id || !el.required) return
      const msg = validateField(el.id, el.value)
      if (msg) { newErrors[el.id] = msg; hasError = true }
    })
    if (hasError) { setErrors((p) => ({ ...p, ...newErrors })); return }
    setSent(true)
  }

  return (
    <div className="rounded-3xl border border-border glass p-6 sm:p-8">
      <h3 className="text-2xl font-bold">Stay in the loop</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Be the first to hear about deadlines, workshop dates, and winner announcements. No spam, unsubscribe any time.
      </p>

      {sent ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check className="size-6" />
          </div>
          <p className="font-semibold">You&apos;re subscribed!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Watch your inbox for the latest Future Sparks news.
          </p>
        </div>
      ) : (
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <HintField
            id="nl-name"
            label="Full Name"
            hint="How should we address you in our emails?"
            example="Trần Thị B"
            errors={errors}
            onBlur={validate}
            onChange={validate}
          />
          <HintField
            id="nl-email"
            label="Email"
            type="email"
            hint="We'll send updates here — no spam, ever."
            example="thi@email.com"
            errors={errors}
            onBlur={validate}
            onChange={validate}
          />
          <div>
            <label className={labelClass} htmlFor="nl-org">
              Organization <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              id="nl-org"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted-foreground italic">
              Ví dụ: RMIT Vietnam, Lân Creative
            </p>
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}

/* ── Main section ──────────────────────────────────────────────── */
export function ContactNewsletter() {
  const socials = [
    { icon: Globe, label: 'Website', href: '#' },
  ]

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left: HAA info + Contact form */}
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Contact
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Get in touch with HAA
            </h2>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Address</p>
                  <p className="text-sm text-muted-foreground">
                    HAA Office, Binh Loi Trung, Ho Chi Minh City, Viet Nam
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <a href="mailto:hello@futuresparks.haa.vn" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    hello@futuresparks.haa.vn
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">+84 52583848</p>
                </div>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-lg border border-border glass text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
            </div>

            {/* Contact form */}
            <div className="mt-8 rounded-3xl border border-border glass p-6 sm:p-8">
              <h3 className="text-xl font-bold">Send us a message</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Have a question about the competition? We'll reply within 2 business days.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Right: Newsletter */}
          <Reveal delay={0.12}>
            <NewsletterForm />
          </Reveal>

        </div>
      </div>
    </section>
  )
}
