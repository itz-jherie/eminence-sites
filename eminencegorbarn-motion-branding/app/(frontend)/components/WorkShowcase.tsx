'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { sanityImage } from '../lib/sanityImage'
import AmbientImage from './AmbientImage'

interface ShowcasePick {
  imageUrl: string;
  projectSlug: string | null;
  projectTitle?: string | null;
  alt?: string | null;
}

interface WorkShowcaseProps {
  gallery: string[];
  projectSlug: string;
  picks?: ShowcasePick[];
}

export default function WorkShowcase({ gallery, projectSlug, picks }: WorkShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const textSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentSection = sectionRef.current;
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

  // Sync scroll trace specifically against the text header block geometry nullifying the giant Grid bounds below
  useEffect(() => {
    const handleScroll = () => {
      if (!textSectionRef.current) return
      const rect = textSectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Start drawing when text appears 85% down window, finish at 45% (viewport center)
      const startOffset = windowHeight * 0.85
      const endOffset = windowHeight * 0.45
      
      const scrolled = startOffset - rect.top
      const distance = startOffset - endOffset + rect.height
      
      const customProgress = Math.max(0, Math.min(1, scrolled / distance))
      setScrollProgress(customProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hasPicks = picks && picks.length > 0
  // Filter out any invalid URLs safely
  const displayImages = gallery.filter(url => typeof url === 'string' && url.trim() !== '');

  // Only render if we have picks or a project slug with images
  if (!hasPicks && (!projectSlug || displayImages.length === 0)) return null;

  // Link to the project page or projects home as fallback
  const projectLink = projectSlug ? `/projects/${projectSlug}` : "/projects"

  const rawPicks: ShowcasePick[] = hasPicks
    ? picks!
    : displayImages.map((url) => ({
        imageUrl: url,
        projectSlug: projectSlug || null,
        projectTitle: null,
      }));

  // If there are 4 picks (such as existing Sanity picks: Mounti, PillPal, KClaut, RepMirror),
  // insert the 5th pick (AITech stationary) at index 3 so all 5 images from the screenshot display seamlessly!
  const finalItems: ShowcasePick[] = [...rawPicks];
  if (finalItems.length === 4) {
    finalItems.splice(3, 0, {
      imageUrl: "https://cdn.sanity.io/images/uz3il453/production/eb875f07b98d05d5331506db72232bb65d6c505d-1920x1080.png",
      projectSlug: "aitech-foundation",
      projectTitle: "AITech Foundation",
      alt: "AITech Foundation stationery identity",
    });
  }

  return (
    <section 
      ref={sectionRef}
      className="relative bg-background pt-8 sm:pt-12 md:pt-16 pb-20 sm:pb-24 md:pb-32 overflow-hidden"
    >
        
      {/* Animated Path Tracing Vector Logo (Positioned on the Right) */}
      <div className="absolute right-0 sm:-right-4 md:-right-8 lg:-right-12 -top-6 sm:-top-10 md:-top-16 w-[320px] sm:w-[420px] md:w-[540px] lg:w-[600px] h-[340px] sm:h-[440px] md:h-[560px] lg:h-[620px] pointer-events-none opacity-20 sm:opacity-30 md:opacity-45 z-0 flex justify-end overflow-visible">
        <svg 
          viewBox="0 0 401 414" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMaxYMid meet"
        >
          {/* Base soft silhouette */}
          <path 
            d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
            fill="white" 
            fillOpacity="0.03"
            stroke="white"
            strokeOpacity="0.04"
            strokeWidth="0.8"
          />
          
          {/* Animated Cyan Path Trace - Hairline, soft glow with 1:1 hardware scroll lock */}
          <path 
            d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
            fill="none"
            stroke="#3BEDFF"
            strokeOpacity="0.7"
            strokeWidth="0.85"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              strokeDasharray: '1',
              strokeDashoffset: (1 - scrollProgress).toString(),
              filter: 'drop-shadow(0 0 6px rgba(59, 237, 255, 0.22))',
              transition: 'none' // Direct 1:1 sync with Lenis smooth scroll for butter-smooth rendering
            }}
          />
        </svg>
      </div>
      

      {/* Header Container (with standard horizontal page margins) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-start md:items-end">
        <div ref={textSectionRef} className="w-full flex flex-col items-start md:items-end pointer-events-none">
          {/* Header Text */}
          <div 
            className={`mb-12 sm:mb-14 md:mb-16 max-w-2xl ml-0 md:ml-12 lg:ml-20 transition-all duration-1000 pointer-events-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 
              className="text-[#EEEEEE] tracking-[0%] font-normal text-[24px] md:text-[clamp(28px,4vw,48px)] leading-[128%] md:leading-[129%]"
              style={{
                fontFamily: "'Manrope', var(--font-family-sans), sans-serif",
                fontWeight: 400,
              }}
            >
              Our work lives at the <br className="block md:hidden" />
              intersection of <span className="text-lightblue">identity</span>, <br className="block md:hidden" />
              <span className="text-lightblue">motion</span>, and{' '}
              <span className="text-lightblue">digital experience</span>
            </h2>
          </div>

          {/* Header Text - Aligned Left on mobile, Right on desktop */}
          <div 
            className={`mb-3.5 sm:mb-6 md:mb-24 lg:mb-28 w-full flex justify-start md:justify-end transition-all duration-1000 pointer-events-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 
              className="text-[#EEEEEE] tracking-normal text-left md:text-right font-normal text-[20.95px] md:text-[clamp(20.95px,2.5vw,24px)] leading-[100%]"
            >
              Identity that leads
            </h2>
          </div>
        </div>
      </div>
        
      {/* Mobile: Horizontal scroll track (Full-bleed edge-to-edge, zero parent margin clipping) */}
      <div className="relative z-10 block md:hidden w-full mb-6 sm:mb-8">
        <div 
          data-lenis-prevent
          className="flex w-full overflow-x-auto gap-3.5 pb-2 pl-4 pr-6 sm:pl-6 sm:pr-8 scroll-pl-4 sm:scroll-pl-6 [scroll-padding-left:16px] sm:[scroll-padding-left:24px] no-scrollbar snap-x snap-mandatory"
        >
          {finalItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.projectSlug ? `/projects/${item.projectSlug}` : projectLink}
              className={`group relative overflow-hidden rounded-[8px] bg-[#1a1a1a] block shrink-0 snap-start w-[calc(100vw-44px)] max-w-[360px] aspect-[300/320] rotate-0 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                borderRadius: 8,
                transitionDelay: `${250 + idx * 70}ms`,
              }}
            >
              <AmbientImage
                src={sanityImage(item.imageUrl, 1000)}
                alt={item.alt || item.projectTitle || item.projectSlug || "Identity work"}
                className="rounded-[8px]"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Grid and Bottom Navigation (with standard page margins) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Desktop: 5-Image Asymmetric Bento Grid: Top 2 (~35% & ~65%), Bottom 3 (Equidistant 33.33% each) */}
        <div className="hidden md:block w-full mb-8 sm:mb-10 md:mb-12 space-y-[12px]">
          {/* Row 1: Top 2 images */}
          <div className="flex flex-row gap-[12px]">
            {finalItems[0] && (
              <Link
                href={finalItems[0].projectSlug ? `/projects/${finalItems[0].projectSlug}` : projectLink}
                className={`group relative overflow-hidden rounded-xl h-[350px] lg:h-[400px] bg-[#1a1a1a] block w-[35%] shrink-0 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <AmbientImage
                  src={sanityImage(finalItems[0].imageUrl, 1000)}
                  alt={finalItems[0].alt || finalItems[0].projectTitle || finalItems[0].projectSlug || "Identity work"}
                />
              </Link>
            )}

            {finalItems[1] && (
              <Link
                href={finalItems[1].projectSlug ? `/projects/${finalItems[1].projectSlug}` : projectLink}
                className={`group relative overflow-hidden rounded-xl h-[350px] lg:h-[400px] bg-[#1a1a1a] block flex-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '370ms' }}
              >
                <AmbientImage
                  src={sanityImage(finalItems[1].imageUrl, 1000)}
                  alt={finalItems[1].alt || finalItems[1].projectTitle || finalItems[1].projectSlug || "Identity work"}
                />
              </Link>
            )}
          </div>

          {/* Row 2: Bottom 3 equidistant images */}
          <div className="grid grid-cols-3 gap-[12px]">
            {finalItems.slice(2, 5).map((item, idx) => (
              <Link
                key={idx + 2}
                href={item.projectSlug ? `/projects/${item.projectSlug}` : projectLink}
                className={`group relative overflow-hidden rounded-xl h-[350px] lg:h-[400px] bg-[#1a1a1a] block w-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${440 + idx * 70}ms` }}
              >
                <AmbientImage
                  src={sanityImage(item.imageUrl, 1000)}
                  alt={item.alt || item.projectTitle || item.projectSlug || "Identity work"}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Link: See Case Study */}
        <div
          className={`w-full flex items-center justify-start transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <Link
            href="/projects"
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
              See Case Study
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}