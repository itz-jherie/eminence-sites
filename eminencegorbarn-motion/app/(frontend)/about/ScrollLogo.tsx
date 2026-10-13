'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function ScrollLogo() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const startOffset = windowHeight
      const endOffset = windowHeight * 0.2
      
      const scrolled = startOffset - rect.top
      const distance = startOffset - endOffset + rect.height
      
      const customProgress = Math.max(0, Math.min(1, scrolled / distance))
      setScrollProgress(customProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[400px] xl:h-[400px] flex items-center justify-center opacity-80 pointer-events-none">
      <svg 
        viewBox="0 0 401 414" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMaxYMid meet"
      >
        <path 
          d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
          fill="white" 
          fillOpacity="0.05"
        />
        <path 
          d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
          fill="#3BEDFF"
          stroke="#3BEDFF"
          strokeWidth="3"
          pathLength="1"
          style={{
            strokeDasharray: '1',
            strokeDashoffset: (1 - scrollProgress).toString(),
            fillOpacity: Math.max(0, (scrollProgress - 0.5) * 2), 
            transition: 'none'
          }}
        />
      </svg>
    </div>
  )
}
