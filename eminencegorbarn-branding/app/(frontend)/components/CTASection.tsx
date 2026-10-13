'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section 
      ref={sectionRef}
      className="relative bg-foundation-dark pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-28 overflow-hidden w-full"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div 
          className={`max-w-3xl text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Main Heading */}
          <h2 
            className="text-white tracking-normal mb-3 sm:mb-4 text-[24px] sm:text-[36px] md:text-[48px] leading-[120%] md:leading-[100%] font-normal"
            style={{ 
              fontFamily: "'Manrope', var(--font-family-sans), sans-serif",
            }}
          >
            It&apos;s time your visuals <br />
            matched your vision
          </h2>

          {/* Subheading */}
          <p 
            className="text-white/90 tracking-normal mb-6 sm:mb-8 md:mb-10 text-[13px] sm:text-[15px] md:text-[18px] leading-[140%] font-normal"
          >
            Let&apos;s make your brand impossible to ignore
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href="/contact"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-block px-6 py-2.5 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-[13px] sm:text-[15px] md:text-[16px] font-normal transition-all duration-300 hover:scale-105 active:scale-95 border-0 rounded-[4px]"
              style={{
                backgroundColor: isHovered ? '#3BEDFF' : '#041013',
                color: isHovered ? '#111111' : '#ffffff'
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}