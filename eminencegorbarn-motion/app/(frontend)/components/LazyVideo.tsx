'use client'
import { useEffect, useRef, useState } from 'react'

export default function LazyVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={isVisible ? src : undefined}
      poster={poster}
      autoPlay={isVisible}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  )
}
