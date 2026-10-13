'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number // ms
  duration?: number // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  yOffset?: number | string // custom translation distance, e.g., 20, 50, '10%', if direction is up/down
  xOffset?: number | string // custom translation distance, e.g., 20, 50, '10%', if direction is left/right
}

export default function RevealOnScroll({
  children,
  delay = 0,
  duration = 1000,
  direction = 'up',
  className = '',
  yOffset = 40,
  xOffset = 40,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is in viewport
        rootMargin: '0px 0px -50px 0px', // slightly offset so it doesn't trigger completely offscreen
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)'
    switch (direction) {
      case 'up':
        return `translate3d(0, ${yOffset}${typeof yOffset === 'number' ? 'px' : ''}, 0)`
      case 'down':
        return `translate3d(0, -${yOffset}${typeof yOffset === 'number' ? 'px' : ''}, 0)`
      case 'left':
        return `translate3d(${xOffset}${typeof xOffset === 'number' ? 'px' : ''}, 0, 0)`
      case 'right':
        return `translate3d(-${xOffset}${typeof xOffset === 'number' ? 'px' : ''}, 0, 0)`
      default:
        return 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out will-change-transform ${className} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
