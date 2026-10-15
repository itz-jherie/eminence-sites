'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sanityImage } from '../lib/sanityImage'

export interface ProductProject {
  _id?: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  galleryUrls?: string[];
  category?: string;
  tagline?: string;
}

export interface ShowcasePick {
  imageUrl: string;
  projectSlug: string | null;
  projectTitle?: string | null;
  alt?: string | null;
}

interface ProductShowcaseProps {
  projects?: ProductProject[];
  picks?: ShowcasePick[];
  heading?: string | null;
  linkText?: string | null;
  linkUrl?: string | null;
}

export default function ProductShowcase({
  projects = [],
  picks,
  heading,
  linkText,
  linkUrl,
}: ProductShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentSection = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  // Consolidate items: use CMS picks if provided, otherwise catalogue projects
  const items: Array<{
    title: string;
    slug: string;
    imageUrl: string;
  }> = []

  if (picks && picks.length > 0) {
    picks.forEach((p) => {
      if (p.imageUrl) {
        items.push({
          title: p.projectTitle || p.alt || 'Digital Experience',
          slug: p.projectSlug || '',
          imageUrl: p.imageUrl,
        })
      }
    })
  }

  if (items.length === 0 && projects.length > 0) {
    // Map projects into showcase cards in order: KclautX, Mountti, Cleverfolks, RepMirror, Goalmind
    const projectMap = new Map<string, ProductProject>()
    projects.forEach((p) => projectMap.set(p.slug, p))

    const kclaut = projectMap.get('kclautx-app')
    if (kclaut) {
      if (kclaut.galleryUrls?.[0]) items.push({ title: 'KclautX App', slug: kclaut.slug, imageUrl: kclaut.galleryUrls[0] })
      if (kclaut.galleryUrls?.[1]) items.push({ title: 'KclautX App', slug: kclaut.slug, imageUrl: kclaut.galleryUrls[1] })
    }

    const mountti = projectMap.get('mountti')
    if (mountti) {
      if (mountti.galleryUrls?.[0]) items.push({ title: 'Mountti', slug: mountti.slug, imageUrl: mountti.galleryUrls[0] })
      if (mountti.galleryUrls?.[1]) items.push({ title: 'Mountti', slug: mountti.slug, imageUrl: mountti.galleryUrls[1] })
    }

    const clever = projectMap.get('cleverfolks-app')
    if (clever) {
      const img = clever.galleryUrls?.[2] || clever.galleryUrls?.[0] || clever.coverImageUrl
      if (img) items.push({ title: 'Cleverfolks', slug: clever.slug, imageUrl: img })
    }

    const repmirror = projectMap.get('repmirror-app')
    if (repmirror) {
      const img = repmirror.coverImageUrl || repmirror.galleryUrls?.[0]
      if (img) items.push({ title: 'RepMirror', slug: repmirror.slug, imageUrl: img })
    }

    const goalmind = projectMap.get('goalmind')
    if (goalmind) {
      const img = goalmind.coverImageUrl || goalmind.galleryUrls?.[0]
      if (img) items.push({ title: 'Goalmind', slug: goalmind.slug, imageUrl: img })
    }

    // Add any remaining projects not explicitly matched
    projects.forEach((proj) => {
      if (!['kclautx-app', 'mountti', 'cleverfolks-app', 'repmirror-app', 'goalmind'].includes(proj.slug)) {
        if (proj.coverImageUrl) {
          items.push({
            title: proj.title,
            slug: proj.slug,
            imageUrl: proj.coverImageUrl,
          })
        }
      }
    })
  }

  const displayItems = items

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-16 sm:py-20 md:py-28 overflow-hidden"
    >
      {/* Background Decorative Xi Vector Logo */}
      <div className="absolute right-0 lg:-right-[5%] top-[60px] md:top-[80px] bottom-0 w-full sm:w-3/4 md:w-1/2 opacity-25 sm:opacity-35 md:opacity-45 pointer-events-none flex justify-end overflow-visible">
        <svg
          viewBox="0 0 401 414"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
          preserveAspectRatio="xMaxYMid meet"
        >
          <path
            d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      {/* Top Header: Elite digital experiences (Left Aligned on mobile, Right Aligned on desktop) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-4 sm:mb-8 md:mb-10">
        <div
          className={`flex justify-start md:justify-end transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2
            className="text-[#EEEEEE] font-normal tracking-normal text-left md:text-right text-[20.95px] md:text-[clamp(20.95px,2.5vw,24px)] leading-[100%]"
            style={{
              fontFamily: "'Manrope', var(--font-family-sans), sans-serif",
              fontWeight: 400,
            }}
          >
            {heading || 'Elite digital experiences'}
          </h2>
        </div>
      </div>

      {/* Carousel Track: Figma specs - mobile: aspect-[300/344], r: 8px; desktop: 391x447, r: 12px */}
      <div className="relative z-10 w-full mb-6 sm:mb-8 md:mb-10">
        <style jsx>{`
          .product-track {
            padding-left: 1rem;
            padding-right: 1.5rem;
            scroll-padding-left: 1rem;
          }
          @media (min-width: 640px) {
            .product-track {
              padding-left: 1.5rem;
              padding-right: 2rem;
              scroll-padding-left: 1.5rem;
            }
          }
          @media (min-width: 768px) {
            .product-track {
              padding-left: 2rem;
              padding-right: 3rem;
              scroll-padding-left: 2rem;
            }
          }
          @media (min-width: 1024px) {
            .product-track {
              padding-left: 3rem;
              padding-right: 3rem;
              scroll-padding-left: 3rem;
            }
          }
          @media (min-width: 1280px) {
            .product-track {
              padding-left: calc((100vw - 1280px) / 2 + 3rem);
              padding-right: calc((100vw - 1280px) / 2 + 3rem);
              scroll-padding-left: calc((100vw - 1280px) / 2 + 3rem);
            }
          }
        `}</style>
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className="product-track flex w-full overflow-x-auto gap-3.5 pb-2 md:gap-[24px] no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {displayItems.map((item, idx) => {
            const cardContent = (
              <div
                className="relative w-full h-full overflow-hidden bg-[#161616] rounded-[8px] md:rounded-[12px]"
              >
                <Image
                  src={sanityImage(item.imageUrl, 900)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 360px, 391px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
              </div>
            )

            const wrapperClasses = `group shrink-0 snap-start block relative overflow-hidden transition-all duration-700 cursor-pointer ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`

            // Mobile: w-[calc(100vw-44px)] max-w-[360px] aspect-[300/344] rounded-[8px] (starts and ends exactly equal to Motion and Identity)
            // Desktop: w-[391px] h-[447px] rounded-[12px]
            return item.slug ? (
              <Link
                key={idx}
                href={`/projects/${item.slug}`}
                className={`${wrapperClasses} w-[calc(100vw-44px)] max-w-[360px] aspect-[300/344] md:w-[391px] md:h-[447px] md:aspect-auto rounded-[8px] md:rounded-[12px]`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={idx}
                className={`${wrapperClasses} w-[calc(100vw-44px)] max-w-[360px] aspect-[300/344] md:w-[391px] md:h-[447px] md:aspect-auto rounded-[8px] md:rounded-[12px]`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Navigation Link (Matching Motion and Identity sections exactly) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          className={`flex justify-start transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Link
            href={linkUrl || '/projects?tab=Product'}
            className="inline-flex items-center gap-2 text-white hover:text-lightblue transition-colors group cursor-pointer text-[16.8px] md:text-[20px] leading-[100%] font-normal"
          >
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 text-lightblue transition-transform duration-500 ease-out transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            <span className="underline underline-offset-4 [text-decoration-skip-ink:none] decoration-solid transition-transform duration-300 ease-out group-hover:translate-x-1.5 inline-block">
              <span className="md:hidden">See Case Study</span>
              <span className="hidden md:inline">{linkText || 'Website and Applications'}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
