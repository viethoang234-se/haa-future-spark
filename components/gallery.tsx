'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { galleryItems, type GalleryItem } from '@/lib/gallery-data'
import { Reveal } from './reveal'

// ---------------------------------------------------------------------------
// Skeleton card shown while image is loading
// ---------------------------------------------------------------------------
function SkeletonCard({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="animate-pulse rounded-2xl bg-muted"
      style={{ ...style, minHeight: 180 }}
      aria-hidden="true"
    />
  )
}

// ---------------------------------------------------------------------------
// Single masonry card
// ---------------------------------------------------------------------------
function GalleryCard({
  item,
  onClick,
  delay,
}: {
  item: GalleryItem
  onClick: () => void
  delay: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Trigger loaded state if image was already cached
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <Reveal delay={delay} className="break-inside-avoid mb-5">
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Open ${item.title}`}
      >
        {/* Skeleton while loading */}
        {!loaded && !error && (
          <SkeletonCard style={{ aspectRatio: '4/3' }} />
        )}

        {/* Image */}
        <img
          ref={imgRef}
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true) }}
          className={cn(
            'w-full object-cover transition-transform duration-500 group-hover:scale-105',
            loaded ? 'block' : 'hidden',
          )}
        />

        {/* Error fallback */}
        {error && (
          <div className="flex aspect-video w-full items-center justify-center bg-muted text-muted-foreground text-xs">
            Image unavailable
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm font-bold leading-snug text-white">{item.title}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/80">
            {item.description}
          </p>
        </div>
      </button>
    </Reveal>
  )
}

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = items[index]
  const [imgLoaded, setImgLoaded] = useState(false)

  // Reset loaded state when item changes
  useEffect(() => {
    setImgLoaded(false)
  }, [index])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Touch swipe
  const touchStartX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Gallery lightbox: ${item.title}`}
      >
        {/* Content container — stop propagation so clicks inside don't close */}
        <div
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col items-center px-4 sm:px-8"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute -top-2 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-8"
          >
            <X className="size-5" />
          </button>

          {/* Image */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-muted">
            {!imgLoaded && (
              <div className="aspect-video w-full animate-pulse bg-muted" aria-hidden="true" />
            )}
            <motion.img
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={item.image}
              alt={item.title}
              onLoad={() => setImgLoaded(true)}
              className="max-h-[60vh] w-full object-contain"
            />
          </div>

          {/* Caption */}
          <div className="mt-5 w-full text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {index + 1} / {items.length}
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              {item.title}
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              {item.description}
            </p>
          </div>
        </div>

        {/* Prev / Next buttons */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous artwork"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next artwork"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
        >
          <ChevronRight className="size-6" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Gallery section (exported)
// ---------------------------------------------------------------------------
export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goPrev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0)),
    [],
  )
  const goNext = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryItems.length : 0)),
    [],
  )

  return (
    <>
      <section id="gallery" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Showcase
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              25 Creative Works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Explore the innovative advertising concepts created by Future Sparks participants,
              blending Vietnamese culture with cutting-edge digital technology.
            </p>
          </Reveal>

          {/* Masonry grid — CSS multi-column masonry */}
          <div
            className={cn(
              'mt-12',
              // CSS multi-column masonry
              'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
              'gap-5',
            )}
          >
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => openLightbox(i)}
                // Stagger delay capped so it doesn't get too long
                delay={(i % 8) * 0.06}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox portal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  )
}
