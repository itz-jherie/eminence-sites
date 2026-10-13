'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { sanityImage } from '../lib/sanityImage'
import AmbientImage from './AmbientImage'

type Project = { _id: string; title: string; slug: string; coverImageUrl: string }

export default function BentoGrid({ projects = [] }: { projects?: Project[] }) {
  const [isVisible, setIsVisible] = useState(false)
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
      className="relative bg-background pt-2 sm:pt-16 md:pt-20 pb-2 sm:pb-3 md:pb-12 lg:pb-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2  pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header Text - Aligned Right (Hidden for now) */}
        {/* <div 
          className={`mb-[40px] flex justify-end transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 
            className="text-[#EEEEEE] tracking-normal text-right"
            style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: '100%', fontWeight: 400 }}
          >
            Elite digital experiences
          </h2>
        </div> */}

        {/* Mobile: Fluid Scaled 4-Image Bento Layout (< md) */}
        <div className="block md:hidden w-full overflow-hidden">
          <div 
            className="relative w-full aspect-[374/285] max-w-[520px] mx-auto"
          >
            {[
              { width: '41.9786%', height: '54.3860%', top: '0%', left: '0%', borderRadius: 4 },
              { width: '56.9519%', height: '54.3860%', top: '0%', left: '43.0481%', borderRadius: 4 },
              { width: '54.0107%', height: '44.5614%', top: '55.4386%', left: '0%', borderRadius: 4 },
              { width: '44.9198%', height: '44.5614%', top: '55.4386%', left: '55.0802%', borderRadius: 4 },
            ].map((cfg, idx) => {
              const project = projects[idx]
              if (!project) {
                return (
                  <div
                    key={idx}
                    className="absolute bg-[#1a1a1a] animate-pulse"
                    style={{
                      width: cfg.width,
                      height: cfg.height,
                      top: cfg.top,
                      left: cfg.left,
                      borderRadius: `${cfg.borderRadius}px`,
                      transform: 'rotate(0deg)',
                      opacity: 1,
                    }}
                  />
                )
              }

              return (
                <Link
                  key={project._id ? `${project._id}-${idx}` : idx}
                  href={`/projects/${project.slug}`}
                  className="group absolute bg-[#1a1a1a] overflow-hidden cursor-pointer transition-all duration-700"
                  style={{
                    width: cfg.width,
                    height: cfg.height,
                    top: cfg.top,
                    left: cfg.left,
                    borderRadius: `${cfg.borderRadius}px`,
                    transform: isVisible ? 'rotate(0deg) translateY(0)' : 'rotate(0deg) translateY(12px)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  <div 
                    className="relative w-full h-full overflow-hidden"
                    style={{ borderRadius: `${cfg.borderRadius}px` }}
                  >
                    {project.coverImageUrl ? (
                      <AmbientImage
                        src={sanityImage(project.coverImageUrl, 1000)}
                        alt={project.title}
                        className="rounded-[4px]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center text-[#333]">
                        {project.title}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop Bento Grid Layout (>= md) */}
        <div className="hidden md:grid md:grid-cols-7 gap-2 sm:gap-3">
          {[0,1,2,3].map((idx) => {
            const project = projects[idx]
            const colSpan = idx === 0 || idx === 3 ? 'col-span-3' : 'col-span-4'
            if (!project) {
              return (
                <div key={idx} className={`${colSpan} h-[220px] sm:h-[260px] md:h-[350px] lg:h-[400px] bg-[#1a1a1a] rounded-[4px] md:rounded-xl animate-pulse`} style={{ transitionDelay: `${idx * 100}ms` }} />
              )
            }
            return (
              <Link
                key={project._id ? `${project._id}-${idx}` : idx}
                href={`/projects/${project.slug}`}
                className={`group ${colSpan} h-[220px] sm:h-[260px] md:h-[350px] lg:h-[400px] bg-[#1a1a1a] rounded-[4px] md:rounded-xl overflow-hidden cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  {project.coverImageUrl ? (
                    <AmbientImage
                      src={sanityImage(project.coverImageUrl, 1000)}
                      alt={project.title}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center text-[#333]">{project.title}</div>
                  )}
                  {/* Title: hidden on mobile, hover-reveal on desktop */}
                  <div className="hidden md:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white text-sm font-medium drop-shadow">{project.title}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}