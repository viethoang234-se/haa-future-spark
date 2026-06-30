// HAA 25-Year Journey Data
// Edit this file to update content — no component changes needed.

export interface TimelineItem {
  year: string
  period?: string
  title: string
  description: string
  context?: string
  impact?: string
  image?: string
}

export interface MilestoneCard {
  icon: string
  title: string
  description: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  labelEn?: string
}

export interface GalleryPhoto {
  id: number
  src: string
  alt: string
  caption?: string
}

// ── Timeline ──────────────────────────────────────────────────────────────────

export const timelineData: TimelineItem[] = [
  {
    year: '2001',
    title: 'Founding of the Association',
    description:
      'The Ho Chi Minh City Advertising Association (HAA) was established by decision of the HCMC People\'s Committee — a historic milestone for advertising professionals in Vietnam.',
    context:
      'As Vietnam integrated strongly into the global economy, the advertising industry began to boom but remained fragmented, lacking a legitimate representative body.',
    impact:
      'For the first time, hundreds of small and large advertising companies — from outdoor advertising, printing, and product manufacturing to media consulting — were united under one roof.',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    year: '2010',
    title: 'VietAd — First International Exhibition',
    description:
      'HAA championed and sponsored the Vietnam International Advertising Equipment & Technology Exhibition (VietAd), providing a springboard for domestic advertising technology.',
    context:
      'VietAd, launched in 2010, grew into Vietnam\'s largest annual advertising trade fair — the only exhibition in Vietnam recognized by UFI (Global Association of the Exhibition Industry).',
    impact:
      'A platform for domestic companies to access advanced machinery, printing technology, LED, and digital tech from around the world. VietAd trade volumes reach billions of VND each year.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    year: '2012',
    title: 'Advertising Law Consultation',
    description:
      'HAA played a central role in advising and critiquing policy, particularly the 2012 Advertising Law and outdoor advertising zoning regulations in HCMC.',
    context:
      'HAA continuously organized seminars, gathering feedback from business practice to submit precise recommendations to state management agencies.',
    impact:
      'The Association\'s contributions resolved many administrative bottlenecks regarding licensing procedures and advertising space regulations, helping create a more open business environment.',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
  {
    year: '2018',
    title: 'Digital Transformation & DOOH',
    description:
      'HAA established specialist clubs and committees, marking the transition from managing traditional advertising to promoting the era of Digital Out-of-Home (DOOH) advertising.',
    context:
      'To keep pace with the rapid development of digital technology and changing consumer behavior, HAA pursued deep specialization.',
    impact:
      'Member organizations help members share data, establish outdoor advertising performance measurement standards, and apply automation technology.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  },
  {
    year: '2020',
    title: 'Social Responsibility & Urban Aesthetics',
    description:
      'During difficult periods for the city (such as the COVID-19 pandemic), HAA and its members sponsored thousands of square meters of billboards and LED screens on key roads.',
    context:
      'Carrying out political communication, image promotion, and spreading humanitarian messages — free of charge — during the stressful pandemic period.',
    impact:
      'The Association has always pioneered in mobilizing businesses to comply with construction standards, remove deteriorating billboards, and propose urban aesthetic zoning solutions.',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
  },
  {
    year: '2025',
    title: 'Extraordinary Congress & Association Elevation',
    description:
      'At the Term I Extraordinary Congress (2025–2030), the Ho Chi Minh City Advertising Association was officially elevated, marking a breakthrough in scale, scope, and operational capacity.',
    context:
      'Mr. Nguyen Thanh Dao was re-elected as Association President. HAA launched the KOL & KOC Club to manage and develop new media trends.',
    impact:
      'A commitment to "zero tolerance for deceptive advertising" — affirming HAA\'s role in establishing professional ethics standards for Vietnam\'s entire advertising industry.',
    image:
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
  },
]

// ── Key Milestones ─────────────────────────────────────────────────────────────

export const milestoneCards: MilestoneCard[] = [
  {
    icon: '🏛️',
    title: 'Association Founded',
    description:
      'Uniting HCMC\'s advertising industry under one roof, creating the first legitimate representative voice.',
  },
  {
    icon: '🌐',
    title: 'VietAd — UFI Exhibition',
    description:
      'Vietnam\'s largest annual advertising exhibition, recognized by UFI — the Global Association of the Exhibition Industry.',
  },
  {
    icon: '⚖️',
    title: 'Advertising Law Reform',
    description:
      'Substantive contributions to the 2012 Advertising Law and outdoor zoning, protecting member interests.',
  },
  {
    icon: '📱',
    title: 'DOOH Pioneer',
    description:
      'Leading digital transformation with Digital Out-of-Home Advertising, establishing new industry measurement standards.',
  },
  {
    icon: '🤝',
    title: 'CSR & Urban Aesthetics',
    description:
      'Thousands of square meters of billboards and LED screens serving the community free of charge during difficult city periods.',
  },
  {
    icon: '🏆',
    title: 'Celebrating Creativity',
    description:
      'Supporting prestigious creative advertising awards, elevating the profession and changing social perceptions.',
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────

export const statsData: Stat[] = [
  { value: 25, suffix: '', label: 'Years of Formation & Growth' },
  { value: 300, suffix: '+', label: 'Member Companies' },
  { value: 15, suffix: '+', label: 'VietAd Editions' },
  { value: 5000, suffix: '+', label: 'Professionals Connected' },
]

// ── Gallery ───────────────────────────────────────────────────────────────────

export const journeyPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
    alt: 'HAA Founding Ceremony 2001',
    caption: '2001 · Association Founded',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
    alt: 'VietAd International Exhibition',
    caption: '2010 · VietAd Launches',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80',
    alt: 'Advertising Law Consultation Forum',
    caption: '2012 · Advertising Law Reform',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80',
    alt: 'Digital Transformation DOOH',
    caption: '2018 · DOOH Pioneer',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=80',
    alt: 'CSR Activities during Pandemic',
    caption: '2020 · CSR & Urban Aesthetics',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=700&q=80',
    alt: 'Extraordinary Congress 2025',
    caption: '2025 · Association Elevated',
  },
]
