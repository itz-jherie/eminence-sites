'use client'

import React, { useState, useEffect, useRef } from 'react'
import { sanityImage } from '../lib/sanityImage'
import { Play, X, Maximize2 } from 'lucide-react'

interface ProjectVideoShowcaseProps {
  title: string;
  videoUrl: string;
  fullVideoUrl?: string | null;
  posterUrl?: string | null;
}

export default function ProjectVideoShowcase({
  videoUrl,
  fullVideoUrl,
  posterUrl,
}: ProjectVideoShowcaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideo = fullVideoUrl || videoUrl

  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false)
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
      <div 
        className="group relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10 cursor-pointer shadow-2xl"
        onClick={() => setIsModalOpen(true)}
      >
        <video
          src={videoUrl}
          poster={posterUrl ? sanityImage(posterUrl, 1600) : undefined}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Play & Maximize Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:bg-[#3BEDFF] group-hover:text-[#111111] group-hover:border-[#3BEDFF]">
            <Play className="w-5 h-5 fill-current ml-0.5" />
            <span className="text-sm sm:text-base font-medium">Click to expand</span>
          </div>

          <div className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 border border-white/20 hover:scale-105 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={modalVideo}
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
