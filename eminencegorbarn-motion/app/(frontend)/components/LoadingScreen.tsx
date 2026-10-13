'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ProjectLoadingAnimation from './ProjectLoadingAnimation'

export default function LoadingScreen() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Ensure SSR and client initial mount match 100% to prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset loading whenever route successfully transitions
  useEffect(() => {
    setIsNavigating(false)
  }, [pathname])

  // Intercept clicks on internal links to display instant feedback (including homepage '/')
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Skip external links, new tabs, or anchor links
      if (
        target.target === '_blank' ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http://') ||
        href.startsWith('https://')
      ) {
        return
      }

      // Check if clicking any internal link that changes route (including homepage '/')
      if (href !== pathname) {
        setIsNavigating(true)
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [pathname])

  // Safety fallback: if navigation takes longer than 8s (e.g. aborted or network drop), automatically clear
  useEffect(() => {
    if (!isNavigating) return
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [isNavigating])

  if (!mounted || !isNavigating) return null

  return (
    <div className="fixed inset-0 z-[99999] transition-opacity duration-300">
      <ProjectLoadingAnimation fullScreen label="Loading Xi Studio" />
    </div>
  )
}