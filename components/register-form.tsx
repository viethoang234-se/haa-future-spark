'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, UploadCloud, PartyPopper } from 'lucide-react'
import { Reveal } from './reveal'

const stepLabels = ['Personal Info', 'Submission', 'Upload']
const categories = [
  'Storytelling',
  'Technology',
  'Branding',
  'Social Impact',
  'Creativity',
]

const inputClass =
  'w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground/90'

type Errors = Record<string, string>

function validate(id: string, value: string): string {
  if (!value.trim()) return 'This field is required.'
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Enter a valid email address (e.g. ten@email.com).'
  if (id === 'phone' && !/^\+?[\d\s\-().]{7,20}$/.test(value))
    return 'Enter a valid phone number (e.g. +84 901 234 567).'
  if (id === 'dob') {
    const d = new Date(value)
    if (isNaN(d.getTime())) return 'Enter a valid date.'
    const age = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    if (age < 15) return 'You must be at least 15 years old to enter.'
  }
  if (id === 'summary' && value.trim().length < 30)
    return 'Please provide at least 30 characters describing your idea.'
  return ''
}

interface FieldProps {
  id: string
  label: string
  hint: string
  type?: string
  placeholder?: string
  required?: boolean
  errors: Errors
  onBlurValidate: (id: string, value: string) => void
  children?: React.ReactNode
}

function Field({ id, label, hint, type = 'text', placeholder = '', required = true, errors, onBlurValidate }: FieldProps) {
  const hasError = !!errors[id]
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={`${id}-hint${hasError ? ` ${id}-err` : ''}`}
        className={inputClass}
        onBlur={(e) => onBlurValidate(id, e.target.value)}
        onChange={(e) => {
          if (hasError) onBlurValidate(id, e.target.value)
        }}
      />
      <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
        {placeholder && <>Ví dụ: <span className="italic">{placeholder}</span></>}
        {!placeholder && hint}
      </p>
      {hasError && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-xs font-medium text-destructive">
          {errors[id]}
        </p>
      )}
    </div>
  )
}

export function RegisterForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const onBlurValidate = (id: string, value: string) => {
    const msg = validate(id, value)
    setErrors((prev) => ({ ...prev, [id]: msg }))
  }

  const next = () => setStep((s) => Math.min(2, s + 1))
  const prev = () => setStep((s) => Math.max(0, s - 1))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const inputs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input,select,textarea'))
    const newErrors: Errors = {}
    let hasError = false

    inputs.forEach((el) => {
      if (!el.id) return
      const msg = validate(el.id, el.value)
      if (msg) {
        newErrors[el.id] = msg
        hasError = true
      }
    })

    if (hasError) {
      setErrors((prev) => ({ ...prev, ...newErrors }))
      return
    }

    if (step < 2) next()
    else setDone(true)
  }

  return (
    <section id="register" className="relative py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 size-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Registration
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Submit your idea
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Join Future Sparks in three simple steps. Fields marked <span className="text-destructive">*</span> are required.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-3xl border border-border glass p-6 sm:p-8">
            {done ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <PartyPopper className="size-8" />
                </div>
                <h3 className="text-2xl font-bold">Submission received!</h3>
                <p className="mt-2 max-w-md text-pretty text-muted-foreground">
                  Thank you for entering Future Sparks. A confirmation email is
                  on its way with your entry details and next steps.
                </p>
                <button
                  type="button"
                  onClick={() => { setDone(false); setStep(0); setErrors({}) }}
                  className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Submit another idea
                </button>
              </div>
            ) : (
              <>
                {/* progress */}
                <div className="mb-8 flex items-center">
                  {stepLabels.map((label, i) => (
                    <div key={label} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex size-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                            i < step
                              ? 'border-primary bg-primary text-primary-foreground'
                              : i === step
                                ? 'border-primary text-primary'
                                : 'border-border text-muted-foreground'
                          }`}
                        >
                          {i < step ? <Check className="size-4" /> : i + 1}
                        </span>
                        <span className="mt-1.5 hidden text-xs text-muted-foreground sm:block">
                          {label}
                        </span>
                      </div>
                      {i < stepLabels.length - 1 && (
                        <div className="mx-2 h-0.5 flex-1 rounded bg-border">
                          <div
                            className="h-full rounded bg-primary transition-all"
                            style={{ width: i < step ? '100%' : '0%' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step === 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Field
                              id="fullName"
                              label="Full Name"
                              hint="Your full legal name as on your student ID."
                              placeholder="Nguyễn Văn A"
                              errors={errors}
                              onBlurValidate={onBlurValidate}
                            />
                          </div>
                          <Field
                            id="email"
                            label="Email"
                            type="email"
                            hint="We'll send your confirmation here."
                            placeholder="ten@email.com"
                            errors={errors}
                            onBlurValidate={onBlurValidate}
                          />
                          <Field
                            id="phone"
                            label="Phone"
                            type="tel"
                            hint="Include country code for international numbers."
                            placeholder="+84 901 234 567"
                            errors={errors}
                            onBlurValidate={onBlurValidate}
                          />
                          <div>
                            <label className={labelClass} htmlFor="dob">
                              Date of Birth<span className="ml-0.5 text-destructive">*</span>
                            </label>
                            <input
                              id="dob"
                              type="date"
                              required
                              aria-invalid={!!errors.dob || undefined}
                              aria-describedby={`dob-hint${errors.dob ? ' dob-err' : ''}`}
                              className={inputClass}
                              onBlur={(e) => onBlurValidate('dob', e.target.value)}
                            />
                            <p id="dob-hint" className="mt-1 text-xs text-muted-foreground">
                              You must be at least 15 years old to enter.
                            </p>
                            {errors.dob && (
                              <p id="dob-err" role="alert" className="mt-1 text-xs font-medium text-destructive">
                                {errors.dob}
                              </p>
                            )}
                          </div>
                          <Field
                            id="school"
                            label="School / University"
                            hint="Full official name of your institution."
                            placeholder="Đại học Kinh tế TP.HCM"
                            errors={errors}
                            onBlurValidate={onBlurValidate}
                          />
                          <div className="sm:col-span-2">
                            <Field
                              id="major"
                              label="Major / Field of Study"
                              hint="Your current degree programme or specialisation."
                              placeholder="Marketing & Truyền thông"
                              errors={errors}
                              onBlurValidate={onBlurValidate}
                            />
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="grid gap-4">
                          <Field
                            id="project"
                            label="Project Name"
                            hint="A memorable, descriptive title for your campaign idea."
                            placeholder="Echoes of Đông Sơn"
                            errors={errors}
                            onBlurValidate={onBlurValidate}
                          />
                          <div>
                            <label className={labelClass} htmlFor="category">
                              Category<span className="ml-0.5 text-destructive">*</span>
                            </label>
                            <select
                              id="category"
                              required
                              aria-invalid={!!errors.category || undefined}
                              aria-describedby={`category-hint${errors.category ? ' category-err' : ''}`}
                              className={inputClass}
                              defaultValue=""
                              onBlur={(e) => onBlurValidate('category', e.target.value)}
                            >
                              <option value="" disabled>Select a category</option>
                              {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <p id="category-hint" className="mt-1 text-xs text-muted-foreground">
                              Choose the category that best describes your idea's core theme.
                            </p>
                            {errors.category && (
                              <p id="category-err" role="alert" className="mt-1 text-xs font-medium text-destructive">
                                {errors.category}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={labelClass} htmlFor="summary">
                              Summary<span className="ml-0.5 text-destructive">*</span>
                            </label>
                            <textarea
                              id="summary"
                              required
                              rows={4}
                              aria-invalid={!!errors.summary || undefined}
                              aria-describedby={`summary-hint${errors.summary ? ' summary-err' : ''}`}
                              className={inputClass}
                              onBlur={(e) => onBlurValidate('summary', e.target.value)}
                              onChange={(e) => {
                                if (errors.summary) onBlurValidate('summary', e.target.value)
                              }}
                            />
                            <p id="summary-hint" className="mt-1 text-xs text-muted-foreground">
                              Ví dụ: <span className="italic">A digital campaign blending AR technology with the cultural motifs of Tết to drive brand awareness for Gen Z audiences.</span>
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">Minimum 30 characters.</p>
                            {errors.summary && (
                              <p id="summary-err" role="alert" className="mt-1 text-xs font-medium text-destructive">
                                {errors.summary}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="grid gap-4">
                          <div className="rounded-xl border border-border bg-card/50 p-4 text-sm">
                            <p className="font-semibold">Accepted formats</p>
                            <ul className="mt-2 space-y-1 text-muted-foreground">
                              <li>• <strong>Proposal</strong> — PDF or DOCX, max 10 pages</li>
                              <li>• <strong>Presentation</strong> — PPTX, max 15 slides</li>
                              <li>• <strong>Video pitch</strong> — MP4, max 3 minutes (optional)</li>
                            </ul>
                          </div>
                          <label
                            htmlFor="files"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/40 px-6 py-10 text-center transition-colors hover:border-primary/50"
                          >
                            <UploadCloud className="size-8 text-primary" />
                            <span className="text-sm font-medium">Click to upload or drag &amp; drop</span>
                            <span className="text-xs text-muted-foreground">
                              Max file size: 50 MB per file
                            </span>
                            <input id="files" type="file" multiple accept=".pdf,.pptx,.docx,.mp4" className="sr-only" />
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Your files are uploaded securely. You'll receive a confirmation email with your submission details once we receive all required documents.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      disabled={step === 0}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="size-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
                    >
                      {step === 2 ? 'Submit Entry' : 'Continue'}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
