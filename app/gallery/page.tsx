import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { GalleryPage } from '@/components/gallery-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Future Sparks – HAA',
  description:
    'Khám phá 25 tác phẩm sáng tạo xuất sắc từ cuộc thi Future Sparks — nơi văn hoá Việt Nam gặp gỡ công nghệ kỹ thuật số.',
}

export default function GallerySubPage() {
  return (
    <main className="relative">
      <SiteNav />
      <GalleryPage />
      <SiteFooter />
    </main>
  )
}
