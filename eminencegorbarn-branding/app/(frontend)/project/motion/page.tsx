import type { Metadata } from 'next'
import MotionGrid from './MotionGrid'
import { SITE_VISIBILITY_FILTER } from '../../lib/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xistudio.com'

export const metadata: Metadata = {
  title: 'Motion & Launch Films — Kinetic Brand Systems',
  description:
    'Explore kinetic motion graphics, commercial launch films, 3D visual experiences, and dynamic brand identities by Xi Studio.',
  keywords: [
    'Motion Design Studio',
    'Kinetic Motion Systems',
    '3D Brand Animation',
    'Commercial Launch Films',
    'Visual Effects & Motion Graphics',
    'Xi Studio Motion',
  ],
  alternates: {
    canonical: `${siteUrl}/project/motion`,
  },
  openGraph: {
    title: 'Motion & Launch Films — Xi Studio',
    description:
      'Explore kinetic motion graphics, commercial launch films, 3D visual experiences, and dynamic brand identities by Xi Studio.',
    url: `${siteUrl}/project/motion`,
    siteName: 'Xi Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: 'Xi Studio Motion Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion & Launch Films — Xi Studio',
    description:
      'Explore kinetic motion graphics, commercial launch films, 3D visual experiences, and dynamic brand identities by Xi Studio.',
    images: [`${siteUrl}/assets/about-team.webp`],
    creator: '@xistudio',
  },
}

async function getMotionProjects() {
  const QUERY = encodeURIComponent(`*[_type == "project" && category == "Motion" && ${SITE_VISIBILITY_FILTER}] | order(orderRank) {_id, title, "slug": slug.current, description, "videoUrl": video.asset->url, "coverUrl": coalesce(video.asset->url, coverImage.asset->url), "posterUrl": coalesce(videoPoster.asset->url, coverImage.asset->url)}`)
  try {
    const res = await fetch(`https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${QUERY}`, { cache: 'no-store' })
    const data = await res.json()
    return data.result || []
  } catch {
    return []
  }
}

export default async function MotionPage() {
  const projects = await getMotionProjects()
  // Server-side fallback: Sanity lists kclautx as Branding, so Motion gets
  // its own /projects/kclautx-motion entry (boundary from /projects/kclautx)
  const withFallback = projects.some((p: { slug: string }) => p.slug === 'kclautx-motion')
    ? projects
    : [
        {
          _id: 'eminence-kclautx-motion',
          title: 'KclautX',
          slug: 'kclautx-motion',
          description: 'Launch video',
          videoUrl: '/assets/gifs/KclautX_opt.mp4',
        },
        ...projects,
      ]
  return <MotionGrid projects={withFallback} />
}
