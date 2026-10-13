'use client'
import Link from 'next/link'
import RevealOnScroll from '../../components/RevealOnScroll'
import TestimonialsSection from '../../components/TestimonialsSection'
import LazyVideo from '../../components/LazyVideo'

type MotionProject = {
  _id: string
  title: string
  slug: string
  description: string
  videoUrl?: string
  coverUrl?: string
  posterUrl?: string
}

const EMINENCE_ORDER = ['kclautx-motion', 'vent-2-0', 'kova-futures', 'xibooster', 'brimlux', 'wasset']

const KCLAUTX_MOTION_FALLBACK: MotionProject = {
  _id: 'eminence-kclautx-motion',
  title: 'KclautX',
  slug: 'kclautx-motion',
  description: 'Launch video',
  videoUrl: '/assets/gifs/KclautX_opt.mp4',
}

export default function MotionGrid({ projects }: { projects: MotionProject[] }) {
  const withFallback = projects.some((p) => p.slug === 'kclautx-motion')
    ? projects
    : [KCLAUTX_MOTION_FALLBACK, ...projects]
  const sortedProjects = [...withFallback].sort((a, b) => {
    const aIdx = EMINENCE_ORDER.indexOf(a.slug)
    const bIdx = EMINENCE_ORDER.indexOf(b.slug)
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
    if (aIdx !== -1) return -1
    if (bIdx !== -1) return 1
    return 0
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-[140px] md:pt-[180px] pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32 max-w-5xl">
            <RevealOnScroll direction="up" delay={200} duration={1200} yOffset={40}>
              <p className="text-white leading-[1.4] tracking-tight font-normal" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}>
                Motion that moves — 6 projects from Eminence, now in the Motion section.
              </p>
            </RevealOnScroll>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 mb-16 md:mb-24 w-full">
            <button className="md:min-w-[160px] px-6 py-3 md:px-6 md:py-5 text-sm md:text-base bg-[#1a1a1a] text-white border border-[#2a2a2a]">Motion</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16">
            {sortedProjects.map((item) => (
              <RevealOnScroll key={item._id} direction="up" delay={100} duration={1200} yOffset={50}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="group block relative w-full aspect-[4/3] md:aspect-[605/320] overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:shadow-lightblue/5"
                  style={{ borderRadius: '6px' }}
                >
                  <div className="relative w-full h-full">
                    {item.videoUrl ? (
                      <LazyVideo
                        src={item.videoUrl}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                    <div className="flex flex-col justify-center absolute bottom-[22px] left-[16px] right-[16px] min-h-[66px] bg-white text-black py-2 px-5 z-20 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300" style={{ borderRadius: '9.5px' }}>
                      <h3 className="font-semibold text-base sm:text-lg text-black leading-tight tracking-tight">{item.title}</h3>
                      {item.description && <p className="text-[11px] sm:text-[13px] text-[#555555] mt-0.5 sm:mt-1 font-normal leading-none">{item.description}</p>}
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
          {projects.length === 0 && (
            <p className="text-center text-[#666] py-12">No Motion projects found. Add them in Sanity.</p>
          )}
        </div>
      </div>
      <TestimonialsSection />
    </main>
  )
}
