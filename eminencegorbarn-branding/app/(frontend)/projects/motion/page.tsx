import type { Metadata } from 'next'
import MotionGrid from './MotionGrid'
import { SITE_VISIBILITY_FILTER } from '../../lib/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xistudio.com'

export const metadata: Metadata = {
  title: "Motion & Visual Experience",
  description:
    "Kinetic design systems, 3D animations, title sequences, and immersive visual motion curated by Xi Studio.",
  keywords: [
    "Motion Design Agency",
    "3D Animation Studio",
    "Kinetic Typography",
    "Brand Motion Systems",
    "Visual Effects",
    "Product Launch Videos",
    "Xi Studio Motion",
  ],
  alternates: {
    canonical: `${siteUrl}/projects/motion`,
  },
  openGraph: {
    title: "Motion & Visual Experience — Xi Studio",
    description:
      "Kinetic design systems, 3D animations, title sequences, and immersive visual motion curated by Xi Studio.",
    url: `${siteUrl}/projects/motion`,
    siteName: "Xi Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: "Xi Studio Motion & Visual Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion & Visual Experience — Xi Studio",
    description:
      "Kinetic design systems, 3D animations, title sequences, and immersive visual motion curated by Xi Studio.",
    images: [`${siteUrl}/assets/about-team.webp`],
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
