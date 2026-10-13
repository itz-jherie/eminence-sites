import React from 'react'
import type { Metadata } from 'next'
import ContactClient from './ContactClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xistudio.com'

export const metadata: Metadata = {
  title: 'Contact & Start a Project',
  description:
    'Let’s build something remarkable together. Share your brand, digital product, or motion vision with Xi Studio. We partner with ambitious leaders worldwide.',
  keywords: [
    'Contact Xi Studio',
    'Hire Design Agency',
    'Start a Design Project',
    'Brand Identity Inquiry',
    'Motion Design Studio Contact',
    'Digital Product Design Agency',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact & Start a Project — Xi Studio',
    description:
      'Let’s build something remarkable together. Share your brand, digital product, or motion vision with Xi Studio.',
    url: `${siteUrl}/contact`,
    siteName: 'Xi Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: 'Contact Xi Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Start a Project — Xi Studio',
    description:
      'Let’s build something remarkable together. Share your brand, digital product, or motion vision with Xi Studio.',
    images: [`${siteUrl}/assets/about-team.webp`],
  },
}

export default function ContactPage() {
  return <ContactClient />
}
