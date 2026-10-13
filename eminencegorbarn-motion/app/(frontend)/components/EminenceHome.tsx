'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TestimonialsSection from './TestimonialsSection'
import RevealOnScroll from './RevealOnScroll'
import AmbientImage from './AmbientImage'
import { sanityImage } from '../lib/sanityImage'

export interface EminenceProject {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description?: string | null;
  videoUrl?: string | null;
  coverUrl?: string | null;
  posterUrl?: string | null;
  tags?: string[];
  previewUrls?: string[];
  galleryUrls?: string[];
  mobilePreviewUrl?: string | null;
}

export type EminenceLayout = 'motion' | 'bento' | 'auto';

const PROJECT_DEFAULT_TAGS: Record<string, string[]> = {
  kclautx: ['Fintech', 'Cryptocurrency', 'Digital Payments'],
  kclaut: ['Fintech', 'Cryptocurrency', 'Digital Payments'],
  'aitech-foundation': ['AI & Technology', 'Non-Profit', 'Branding'],
  brimlux: ['Energy', 'Motion Graphics', 'Visual Identity'],
  cleverfolks: ['Creative Agency', 'Culture', 'Brand Strategy'],
  gombod: ['Technology', 'Entertainment', 'Branding'],
  'kova-futures': ['Fintech', 'Digital Trading', 'Platform'],
  livmalik: ['Fashion', 'Lifestyle', 'Brand Identity'],
  mounti: ['Outdoor', 'Apparel', 'Branding'],
  onaks: ['Architecture', 'Design', 'Branding'],
  pillpal: ['HealthTech', 'Pharmaceuticals', 'Identity'],
  repmirror: ['Technology', 'Entertainment', 'Digital Experience'],
  thekclaut: ['Fintech', 'Web3', 'Branding'],
  tradigro: ['Finance', 'Commodities', 'Branding'],
  'vent-2-0': ['Token Launch', 'Web3', 'Motion Graphics'],
  wasset: ['CleanTech', 'Sustainability', 'Motion'],
  xibooster: ['Digital Growth', 'Platform', 'Motion'],
};

export function getProjectSubtitle(project: {
  title?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  description?: string | null;
}): string {
  if (project.tags && project.tags.length > 0) {
    const parsed = project.tags
      .flatMap((t) => (typeof t === 'string' ? t.split(/[/,]+/) : []))
      .map((t) => t.trim())
      .filter(Boolean);
    if (parsed.length > 0) {
      return parsed.join(' / ');
    }
  }
  const slugKey = (project.slug || project.title || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
  for (const [key, tags] of Object.entries(PROJECT_DEFAULT_TAGS)) {
    if (slugKey.includes(key) || key.includes(slugKey)) {
      return tags.join(' / ');
    }
  }
  if (
    project.description &&
    project.description.trim() &&
    !project.description.includes('— Branding project') &&
    !project.description.includes('— Motion')
  ) {
    return project.description.trim();
  }
  return project.category || '';
}

interface EminenceHomeProps {
  projects: EminenceProject[];
  tabs: string[];
  heroLine1: string;
  heroLine2: string;
  jobTitle: string;
  knowAbout: string[];
  pageTitle: string;
  pageDescription: string;
  layout?: EminenceLayout;
}

export default function EminenceHome({
  projects,
  tabs,
  heroLine1,
  heroLine2,
  jobTitle,
  knowAbout,
  pageTitle,
  pageDescription,
  layout = 'auto',
}: EminenceHomeProps) {
  const [activeFilter, setActiveFilter] = useState(tabs[0])

  const filteredItems = projects.filter(item => item.category === activeFilter)

  // Motion tab gets the eminence-style video cards; Branding / Graphics /
  // Product tabs get the bento layout (title header + 4-image bento)
  const useBento = layout === 'bento' || (layout === 'auto' && activeFilter !== 'Motion')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://eminencegorbarn.com/#person',
        'name': "Oluwanimifise 'Eminence' Adesogan",
        'alternateName': 'Mr. Eminence',
        'jobTitle': jobTitle,
        'url': 'https://eminencegorbarn.com',
        'image': 'https://eminencegorbarn.com/assets/og-image.png',
        'sameAs': [
          'https://www.linkedin.com/in/oluwanimifise-adesogan-5aab4a37b',
          'https://www.behance.net/gorbarncreatives',
          'https://www.instagram.com/eminence_gorbarn'
        ],
        'knowsAbout': knowAbout
      },
      {
        '@type': 'WebSite',
        '@id': 'https://eminencegorbarn.com/#website',
        'url': 'https://eminencegorbarn.com',
        'name': pageTitle,
        'description': pageDescription,
        'publisher': {
          '@id': 'https://eminencegorbarn.com/#person'
        }
      },
    ]
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Top Section with Padding */}
      <div className="pt-[140px] md:pt-[180px] pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-20 md:mb-32 max-w-5xl">
            <RevealOnScroll direction="up" delay={200} duration={1200} yOffset={40}>
              <h1
                className="text-white leading-[1.4] tracking-tight font-normal"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                {heroLine1}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={500} duration={1200} yOffset={30}>
              <p
                className="text-lightblue leading-[1.4] tracking-tight font-normal mt-4"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                {heroLine2}
              </p>
            </RevealOnScroll>
          </div>

          {/* Filter Buttons */}
          <RevealOnScroll direction="up" delay={800} duration={1000} yOffset={20}>
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 mb-16 md:mb-24 w-full">
              {tabs.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`md:min-w-[160px] px-6 py-3 md:px-6 md:py-5 text-sm md:text-base transition-all duration-300 text-center border font-medium
                    ${activeFilter === filter
                      ? "bg-[#1a1a1a] text-white border-[#2a2a2a]"
                      : "bg-transparent text-[#666666] border-[#1a1a1a] hover:text-white hover:border-[#2a2a2a]"
                    }
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Portfolio Grid — Motion cards or Branding bento */}
          {!useBento ? (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-10 md:gap-10 lg:gap-10 mb-12 md:mb-16">
            {filteredItems.map((item, index) => (
              <RevealOnScroll
                key={item._id}
                direction="up"
                delay={100}
                duration={1200}
                yOffset={50}
              >
                <Link
                  href={`/projects/${item.slug}`}
                  className="group block relative w-full aspect-[4/3] md:aspect-[605/320] overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:shadow-lightblue/5"
                  style={{
                    borderRadius: '6px'
                  }}
                >
                  <div className="relative w-full h-full">
                    {item.videoUrl ? (
                      <video
                        src={item.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={item.posterUrl || undefined}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : item.coverUrl ? (
                      <Image
                        src={item.coverUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority={index < 2}
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-[#333]">No media</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

                    {/* Overlay Container */}
                    <div
                      className="flex flex-col justify-center absolute bottom-[22px] left-[16px] right-[16px] min-h-[66px] bg-white text-black py-2 px-5 z-20 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300"
                      style={{ borderRadius: '9.5px' }}
                    >
                      <h3 className="font-semibold text-base sm:text-lg text-black leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[11px] sm:text-[13px] text-[#555555] mt-0.5 sm:mt-1 font-normal leading-none">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <p className="text-center text-[#666] pb-12">No projects here yet — pick some in the Studio.</p>
          )}
          </>
          ) : (
          /* Branding / Graphics / Product bento — title header + 4-image bento */
          <div className="mt-4 space-y-16 mb-12 md:mb-16">
            {filteredItems.map((item) => {
              const images = (item.previewUrls && item.previewUrls.length > 0
                ? item.previewUrls
                : item.galleryUrls && item.galleryUrls.length > 0
                  ? item.galleryUrls
                  : item.coverUrl ? [item.coverUrl] : []
              ).filter((u): u is string => typeof u === 'string' && u.trim() !== '').slice(0, 4)
              const mobileImage = item.mobilePreviewUrl && item.mobilePreviewUrl.trim() !== '' ? item.mobilePreviewUrl : images[0]
              const subtitle = getProjectSubtitle(item)
              return (
                <div key={item._id} className="w-full">
                  <div className="mb-4 sm:mb-5">
                    <Link href={`/projects/${item.slug}`} className="hover:text-lightblue transition-colors inline-block">
                      <h3 className="text-white text-2xl sm:text-3xl font-normal tracking-tight">{item.title}</h3>
                    </Link>
                    {subtitle && <p className="text-[#a1a1aa] text-xs sm:text-sm md:text-base font-normal mt-1 tracking-normal">{subtitle}</p>}
                  </div>
                  {/* Mobile: single CMS-picked image */}
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group relative overflow-hidden rounded-xl h-[280px] bg-[#1a1a1a] block md:hidden"
                  >
                    {mobileImage ? (
                      <AmbientImage
                        src={sanityImage(mobileImage, 800)}
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center">
                        <span className="text-[#333] text-xs">No image</span>
                      </div>
                    )}
                  </Link>
                  {/* Desktop: 4-image bento */}
                  <div className="hidden md:grid md:grid-cols-12 gap-[12px]">
                    {[0,1,2,3].map((i) => {
                      const url = images[i]
                      const span = i === 0 ? 'md:col-span-5' : i === 1 ? 'md:col-span-7' : i === 2 ? 'md:col-span-7' : 'md:col-span-5'
                      return (
                        <Link
                          key={i}
                          href={`/projects/${item.slug}`}
                          className={`group relative overflow-hidden rounded-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-[#1a1a1a] block ${span}`}
                        >
                          {url ? (
                            <AmbientImage
                              src={sanityImage(url, 1000)}
                              alt={`${item.title} ${i + 1}`}
                            />
                          ) : (
                            <div className="w-full h-full bg-[#111] flex items-center justify-center">
                              <span className="text-[#333] text-xs">No image</span>
                            </div>
                          )}
                          {i === 0 && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                              <p className="text-white text-sm font-medium drop-shadow">{item.title}</p>
                            </div>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            {filteredItems.length === 0 && (
              <p className="text-center text-[#666] pb-12">No projects here yet — pick some in the Studio.</p>
            )}
          </div>
          )}
        </div>
      </div>

      <TestimonialsSection />

      {/* Custom CTA Section - TRULY Full Width */}
      <div className="w-full bg-[#092A30] py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative overflow-hidden">
          <RevealOnScroll direction="up" delay={100} duration={1000} className="max-w-xl z-10 w-full">
            <div>
              <h2
                className="text-white mb-6"
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  lineHeight: '120%',
                  letterSpacing: '0%'
                }}
              >
                It&apos;s time your visuals matched your vision
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-normal mb-10">
                Let&apos;s make your brand impossible to ignore
              </p>
              <Link
                href="mailto:eminencegorbarn@gmail.com"
                className="inline-block text-white px-10 py-4 rounded-none text-lg font-normal transition-transform hover:scale-105 active:scale-95 mb-8 md:mb-0"
                style={{ backgroundColor: '#041013' }}
              >
                Contact Me
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={300} duration={1000} className="text-left md:text-right z-10 pb-2 w-full md:w-auto">
            <div>
              <div
                className="text-white/90 font-normal mb-2"
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(20px, 4vw, 38.08px)',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  textDecoration: 'underline'
                }}
              >
                <a href="tel:+2348165679483" className="hover:text-lightblue transition-colors">
                  +2348165679483
                </a>
              </div>
              <div
                className="text-white/90 font-normal"
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(20px, 4vw, 38.08px)',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  textDecoration: 'underline'
                }}
              >
                <a href="mailto:eminencegorbarn@gmail.com" className="hover:text-lightblue transition-colors">
                  eminencegorbarn@gmail.com
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  )
}
