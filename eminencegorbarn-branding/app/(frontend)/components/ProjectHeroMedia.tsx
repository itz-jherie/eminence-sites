'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { sanityImage } from '../lib/sanityImage'
import LazyVideo from './LazyVideo'
import { Play, X } from 'lucide-react'

interface ProjectHeroMediaProps {
  title: string;
  coverImageUrl?: string | null;
  videoUrl?: string | null;
  fullVideoUrl?: string | null;
}

export default function ProjectHeroMedia({
  title,
  coverImageUrl,
  videoUrl,
  fullVideoUrl,
}: ProjectHeroMediaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const previewVideo = videoUrl || fullVideoUrl
  const hasFullVideo = Boolean(fullVideoUrl)

  // Handle ESC key and body scroll locking
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  return (
    <>
      {/* Hero Cover Container */}
      <div 
        className={`relative w-full h-[55vh] md:h-[75vh] overflow-hidden bg-foundation-dark/20 ${
          hasFullVideo ? 'cursor-pointer group' : ''
        }`}
        onClick={() => {
          if (hasFullVideo) setIsModalOpen(true)
        }}
        role={hasFullVideo ? 'button' : undefined}
        tabIndex={hasFullVideo ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasFullVideo && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            setIsModalOpen(true)
          }
        }}
        aria-label={hasFullVideo ? `Watch full ${title} video` : undefined}
      >
        {previewVideo ? (
          <>
            <LazyVideo
              src={previewVideo}
              poster={coverImageUrl ? sanityImage(coverImageUrl, 1600) : undefined}
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                hasFullVideo ? 'group-hover:scale-105' : ''
              }`}
            />
            {/* Play Button Overlay - Only displayed when full video is uploaded in Sanity */}
            {hasFullVideo && (
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:bg-[#3BEDFF] group-hover:text-[#111111] group-hover:border-[#3BEDFF]">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                  <span className="text-sm md:text-base font-medium tracking-normal">Watch Full Video</span>
                </div>
              </div>
            )}
          </>
        ) : coverImageUrl ? (
          <Image
            unoptimized
            src={sanityImage(coverImageUrl, 1600)}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Fullscreen Video Modal — Streams full main video on demand */}
      {isModalOpen && fullVideoUrl && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 border border-white/20 hover:scale-105 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Video Container */}
          <div 
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={fullVideoUrl}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
