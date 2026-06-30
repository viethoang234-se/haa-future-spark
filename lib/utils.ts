import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// GitHub Pages serves this site under /haa-future-spark, but local dev runs
// at the root. This prefixes local asset paths (logos, local images, internal
// links) with the correct base path in production while staying "/" in dev.
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/haa-future-spark' : ''

export function withBasePath(path: string) {
  if (!path) return path
  // Don't touch external URLs or anchors
  if (path.startsWith('http') || path.startsWith('#')) return path
  return `${BASE_PATH}${path}`
}
