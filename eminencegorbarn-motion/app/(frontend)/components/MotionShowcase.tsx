'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LazyVideo from './LazyVideo'
import { sanityImage } from '../lib/sanityImage'

export interface MotionProject {
  _id?: string;
  title: string;
  slug?: string;
  description?: string;
  videoUrl?: string;
  gifUrl?: string;
  posterUrl?: string;
  coverUrl?: string;
  customUrl?: string;
}

interface ShowcasePick {
  imageUrl: string;
  projectSlug: string | null;
  projectTitle?: string | null;
  alt?: string | null;
}

interface MotionShowcaseProps {
  projects?: MotionProject[];
  headline?: string | null;
  details?: string | null;
  gallery?: string[];
  projectSlug?: string;
  picks?: ShowcasePick[];
}

export default function MotionShowcase({
  projects = [],
  headline,
  details,
  gallery = [],
  projectSlug = '',
  picks,
}: MotionShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  // If projects from motion catalogue or custom motion items are passed, use them
  // Otherwise, fallback to picks or gallery if available
  const hasMotionProjects = projects && projects.length > 0
  const hasPicks = picks && picks.length > 0

  if (!hasMotionProjects && !hasPicks && (!projectSlug || gallery.length === 0)) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      className="relative bg-background py-10 sm:py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Header Container (with standard horizontal page margins) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header Text - Aligned Left on mobile, Right on desktop */}
        <div 
          className={`mb-4 sm:mb-8 md:mb-10 flex flex-col items-start md:items-end transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 
            className="text-[#EEEEEE] tracking-normal text-left md:text-right font-normal text-[20.95px] md:text-[clamp(20.95px,2.5vw,24px)] leading-[100%]"
          >
            {headline || 'Greatness in motion'}
          </h2>
          {details && (
            <p className="text-[#AAAAAA] font-normal text-sm sm:text-base max-w-xl mt-2.5 text-left md:text-right leading-relaxed">
              {details}
            </p>
          )}
        </div>
      </div>

      {/* Mobile: Horizontal scroll track (Full-bleed edge-to-edge, zero parent margin clipping) */}
      <div className="relative z-10 block md:hidden w-full mb-6">
        {hasMotionProjects ? (
          <div 
            data-lenis-prevent
            className="flex w-full overflow-x-auto gap-3.5 pb-2 pl-4 pr-6 sm:pl-6 sm:pr-8 scroll-pl-4 sm:scroll-pl-6 [scroll-padding-left:16px] sm:[scroll-padding-left:24px] no-scrollbar snap-x snap-mandatory"
          >
            {projects.slice(0, 4).map((item, idx) => {
              const linkHref = item.slug ? `/projects/${item.slug}` : (item.customUrl || '/projects?tab=Motion');
              return (
                <Link
                  key={item._id || idx}
                  href={linkHref}
                  className={`group relative overflow-hidden rounded-[8px] bg-[#1a1a1a] block shrink-0 snap-start w-[calc(100vw-44px)] max-w-[360px] aspect-[300/200] rotate-0 hover:shadow-2xl hover:shadow-lightblue/10 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    borderRadius: 8,
                    transitionDelay: `${200 + idx * 100}ms`,
                  }}
                >
                  <div className="relative w-full h-full">
                    {item.videoUrl ? (
                      <LazyVideo
                        src={item.videoUrl}
                        poster={item.posterUrl ? sanityImage(item.posterUrl, 1200) : undefined}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (item.gifUrl || item.posterUrl || item.coverUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sanityImage(item.gifUrl || item.posterUrl || item.coverUrl, 1200)}
                        alt={item.title || 'Motion Showcase Visual'}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center text-[#444]">
                        {item.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : hasPicks ? (
          <div 
            data-lenis-prevent
            className="flex w-full overflow-x-auto gap-3.5 pb-2 pl-4 pr-6 sm:pl-6 sm:pr-8 scroll-pl-4 sm:scroll-pl-6 [scroll-padding-left:16px] sm:[scroll-padding-left:24px] no-scrollbar snap-x snap-mandatory"
          >
            {picks!.slice(0, 4).map((pick, idx) => (
              <Link
                key={idx}
                href={pick.projectSlug ? `/projects/${pick.projectSlug}` : "/projects"}
                className={`group relative overflow-hidden rounded-[8px] bg-[#1a1a1a] block shrink-0 snap-start w-[calc(100vw-44px)] max-w-[360px] aspect-[300/200] rotate-0 hover:shadow-2xl hover:shadow-lightblue/10 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  borderRadius: 8,
                  transitionDelay: `${200 + idx * 100}ms`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={sanityImage(pick.imageUrl, 1200)}
                    alt={pick.alt || pick.projectTitle || pick.projectSlug || "Showcase image"}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div 
            data-lenis-prevent
            className="flex w-full overflow-x-auto gap-3.5 pb-2 pl-4 pr-6 sm:pl-6 sm:pr-8 scroll-pl-4 sm:scroll-pl-6 [scroll-padding-left:16px] sm:[scroll-padding-left:24px] no-scrollbar snap-x snap-mandatory"
          >
            {gallery.slice(0, 4).map((imgUrl, idx) => (
              <Link
                key={idx}
                href={projectSlug ? `/projects/${projectSlug}` : "/projects"}
                className={`group relative overflow-hidden rounded-[8px] bg-[#1a1a1a] block shrink-0 snap-start w-[300px] h-[200px] rotate-0 hover:shadow-2xl hover:shadow-lightblue/10 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 8,
                  transitionDelay: `${200 + idx * 100}ms`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={sanityImage(imgUrl, 1200)}
                    alt="Motion Showcase"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Grid and Footer Link (with standard horizontal page margins) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {hasMotionProjects ? (
          <div className="hidden md:grid md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            {projects.slice(0, 4).map((item, idx) => {
              const linkHref = item.slug ? `/projects/${item.slug}` : (item.customUrl || '/projects?tab=Motion');
              return (
                <Link
                  key={item._id ? `${item._id}-${idx}` : idx}
                  href={linkHref}
                  className={`group relative overflow-hidden rounded-[12px] bg-[#1a1a1a] block w-full aspect-[16/10] md:aspect-[605/340] hover:shadow-2xl hover:shadow-lightblue/10 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${200 + idx * 100}ms` }}
                >
                  <div className="relative w-full h-full">
                    {item.videoUrl ? (
                      <LazyVideo
                        src={item.videoUrl}
                        poster={item.posterUrl ? sanityImage(item.posterUrl, 1200) : undefined}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (item.gifUrl || item.posterUrl || item.coverUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sanityImage(item.gifUrl || item.posterUrl || item.coverUrl, 1200)}
                        alt={item.title || 'Motion Showcase Visual'}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center text-[#444]">
                        {item.title}
                      </div>
                    )}

                    {/* Dark Vignette Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Floating White Banner with Project Title & Description */}
                    <div 
                      className="flex flex-col justify-center absolute bottom-[22px] left-[16px] right-[16px] min-h-[66px] bg-white text-black py-2.5 px-5 z-20 shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 rounded-[10px]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-base md:text-lg text-black leading-tight tracking-tight">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono uppercase tracking-wider text-black/50">
                          Motion
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[13px] text-[#555555] mt-1 font-normal leading-tight line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : hasPicks ? (
          <div className="hidden md:grid md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            {picks!.slice(0, 4).map((pick, idx) => (
              <Link
                key={idx}
                href={pick.projectSlug ? `/projects/${pick.projectSlug}` : "/projects"}
                className={`group relative overflow-hidden rounded-[12px] bg-[#1a1a1a] block w-full aspect-[16/10] md:aspect-[605/340] hover:shadow-2xl hover:shadow-lightblue/10 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={sanityImage(pick.imageUrl, 1200)}
                    alt={pick.alt || pick.projectTitle || pick.projectSlug || "Showcase image"}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  {pick.projectTitle && (
                    <div 
                      className="flex flex-col justify-center absolute bottom-[22px] left-[16px] right-[16px] min-h-[66px] bg-white text-black py-2.5 px-5 z-20 shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 rounded-[10px]"
                    >
                      <h3 className="font-semibold text-base md:text-lg text-black leading-tight tracking-tight">
                        {pick.projectTitle}
                      </h3>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="hidden md:grid md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            {gallery.slice(0, 4).map((imgUrl, idx) => (
              <Link
                key={idx}
                href={projectSlug ? `/projects/${projectSlug}` : "/projects"}
                className={`group relative overflow-hidden rounded-[12px] bg-[#1a1a1a] block w-full aspect-[16/10] md:aspect-[605/340] hover:shadow-2xl hover:shadow-lightblue/10 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={sanityImage(imgUrl, 1200)}
                    alt="Motion Showcase"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Link */}
        <div 
          className={`flex justify-start transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Link
            href="/projects?tab=Motion"
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
              <span className="hidden md:inline">Explore Motion Catalogue</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}