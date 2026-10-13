import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xistudio.com'

export const metadata: Metadata = {
  title: 'Eminence — Lead Motion & Creative Director',
  description:
    'Selected motion direction, brand systems, and launch films directed by Adesogan "Eminence" Oluwanimifise at Xi Studio.',
  keywords: [
    'Eminence',
    'Adesogan Oluwanimifise',
    'Creative Director',
    'Motion Director',
    'Xi Studio',
    'Motion Design',
  ],
  alternates: {
    canonical: `${siteUrl}/eminence`,
  },
  openGraph: {
    title: 'Eminence — Lead Motion & Creative Director | Xi Studio',
    description:
      'Selected motion direction, brand systems, and launch films directed by Adesogan "Eminence" Oluwanimifise at Xi Studio.',
    url: `${siteUrl}/eminence`,
    siteName: 'Xi Studio',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: 'Adesogan "Eminence" Oluwanimifise — Xi Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eminence — Lead Motion & Creative Director | Xi Studio',
    description:
      'Selected motion direction, brand systems, and launch films directed by Adesogan "Eminence" Oluwanimifise at Xi Studio.',
    images: [`${siteUrl}/assets/about-team.webp`],
  },
}

export default function EminenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
