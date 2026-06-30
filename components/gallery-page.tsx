'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, withBasePath } from '@/lib/utils'
import { galleryItems, type GalleryItem } from '@/lib/gallery-data'
import { Reveal } from './reveal'

function SkeletonCard() {
  return (
    <div
      className="animate-pulse rounded-xl bg-muted w-full h-full min-h-[120px]"
      aria-hidden="true"
    />
  )
}

function GalleryThumb({
  item,
  isActive,
  onClick,
  index,
}: {
  item: GalleryItem
  isActive: boolean
  onClick: () => void
  index: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive
          ? 'border-primary shadow-lg shadow-primary/20 ring-1 ring-primary'
          : 'border-border hover:border-primary/50 hover:shadow-md',
      )}
      aria-label={`View ${item.title}`}
      aria-pressed={isActive}
    >
      <div className="aspect-[4/3] w-full relative bg-muted">
        {!loaded && !error && <SkeletonCard />}
        {!error && (
          <img
            ref={imgRef}
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => { setError(true); setLoaded(true) }}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
            Unavailable
          </div>
        )}
        {/* Index badge */}
        <span className="absolute top-1.5 left-1.5 flex size-5 items-center justify-center rounded-full bg-black/60 text-[10px] font-bold text-white backdrop-blur-sm">
          {index + 1}
        </span>
        {/* Active overlay */}
        {isActive && (
          <div className="absolute inset-0 bg-primary/15 border-2 border-primary rounded-xl" />
        )}
      </div>
      <div className="px-2 py-1.5 bg-card">
        <p className="text-[11px] font-semibold leading-tight text-foreground truncate">{item.title}</p>
      </div>
    </button>
  )
}

function PreviewPane({
  item,
  index,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  item: GalleryItem
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onClose: () => void
}) {
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    setImgLoaded(false)
  }, [item.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-24 flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-xl"
    >
      {/* Image */}
      <div className="relative bg-muted aspect-[4/3] w-full overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={item.image}
            alt={item.title}
            onLoad={() => setImgLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Counter badge */}
        <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {index + 1} / {total}
        </span>
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90 backdrop-blur-sm"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Work #{index + 1}
          </span>
          <h3 className="mt-1 text-xl font-extrabold tracking-tight leading-tight text-foreground">
            {item.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Prev / Next */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous artwork"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-foreground/80 transition hover:border-primary/60 hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next artwork"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-foreground/80 transition hover:border-primary/60 hover:text-foreground"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openPreview = useCallback((i: number) => setActiveIndex(i), [])
  const closePreview = useCallback(() => setActiveIndex(null), [])
  const goPrev = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0)), [])
  const goNext = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i + 1) % galleryItems.length : 0)), [])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <a href={withBasePath("/")} className="transition-colors hover:text-foreground">Home</a>
              <span aria-hidden>/</span>
              <span className="text-foreground">Gallery</span>
            </nav>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Future Sparks · Showcase
            </span>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              25 <span className="text-gradient-brand">Creative Works</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Explore outstanding advertising concepts from Future Sparks contestants — where Vietnamese culture meets digital technology. Select any work to preview it here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main layout: grid + preview */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={cn(
            'grid gap-6 transition-all duration-300',
            activeIndex !== null
              ? 'lg:grid-cols-[1fr_400px]'
              : 'lg:grid-cols-1',
          )}>
            {/* Grid of thumbnails */}
            <div>
              {/* Count indicator */}
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{galleryItems.length}</span> works
                  {activeIndex !== null && (
                    <span className="ml-2 text-primary font-medium">· Viewing #{activeIndex + 1}</span>
                  )}
                </p>
                {activeIndex !== null && (
                  <button
                    type="button"
                    onClick={closePreview}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Close preview
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {galleryItems.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 10) * 0.04}>
                    <GalleryThumb
                      item={item}
                      isActive={activeIndex === i}
                      onClick={() => activeIndex === i ? closePreview() : openPreview(i)}
                      index={i}
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Sticky preview panel */}
            <AnimatePresence>
              {activeIndex !== null && (
                <div className="hidden lg:block">
                  <PreviewPane
                    item={galleryItems[activeIndex]}
                    index={activeIndex}
                    total={galleryItems.length}
                    onPrev={goPrev}
                    onNext={goNext}
                    onClose={closePreview}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile preview: appears below grid */}
          <AnimatePresence>
            {activeIndex !== null && (
              <div className="mt-6 lg:hidden">
                <PreviewPane
                  item={galleryItems[activeIndex]}
                  index={activeIndex}
                  total={galleryItems.length}
                  onPrev={goPrev}
                  onNext={goNext}
                  onClose={closePreview}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
