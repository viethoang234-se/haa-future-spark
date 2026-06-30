'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { journeyPhotos } from '@/lib/journey-25-data'

export function JourneyGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const open = (id: number) => setLightbox(id)
  const close = () => setLightbox(null)

  const currentIndex = lightbox !== null ? journeyPhotos.findIndex((p) => p.id === lightbox) : -1

  const prev = () => {
    if (currentIndex > 0) setLightbox(journeyPhotos[currentIndex - 1].id)
  }
  const next = () => {
    if (currentIndex < journeyPhotos.length - 1) setLightbox(journeyPhotos[currentIndex + 1].id)
  }

  const currentPhoto = currentIndex !== -1 ? journeyPhotos[currentIndex] : null

  return (
    <section className="py-20 sm:py-28" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Photo Archive
          </span>
          <h2
            id="gallery-heading"
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Memories Through the Years
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {journeyPhotos.map((photo, i) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => open(photo.id)}
              className="group relative overflow-hidden rounded-2xl border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label={`View photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={700}
                height={480}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-medium text-foreground">{photo.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-xl"
            role="dialog"
            aria-modal
            aria-label="Photo lightbox"
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="mx-16 max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl"
            >
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                width={1200}
                height={800}
                className="max-h-[75vh] w-full object-contain"
              />
              {currentPhoto.caption && (
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  {currentPhoto.caption}
                </p>
              )}
            </motion.div>

            {/* Next */}
            <button
              onClick={next}
              disabled={currentIndex === journeyPhotos.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
              aria-label="Next photo"
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
