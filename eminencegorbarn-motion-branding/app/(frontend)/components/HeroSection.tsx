'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isStartHovered, setIsStartHovered] = useState(false)
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false)

  // Trigger animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative bg-background flex items-start md:items-center overflow-hidden pb-6 md:pb-[40px]">
      {/* Background Vector Image - Animated Path */}
      <div className="absolute right-0 lg:-right-[5%] top-[80px] md:top-[100px] lg:top-[141px] bottom-0 w-full sm:w-3/4 md:w-1/2 opacity-35 sm:opacity-45 md:opacity-55 pointer-events-none flex justify-end overflow-visible">
        <svg 
          viewBox="0 0 401 414" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
          preserveAspectRatio="xMaxYMid meet"
        >
          {/* Base Logo (Static 5% White) */}
          <path 
            d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
            fill="white" 
            fillOpacity="0.05"
          />

          {/* Animated Path (Infinite Trace) */}
          <path 
            d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
            stroke="#3BEDFF"
            strokeWidth="1.5"
            strokeDasharray="200, 1000"
            opacity="0.35"
            style={{
              animation: 'pathTrace 10s linear infinite',
              filter: 'drop-shadow(0 0 4px rgba(59,237,255,0.35))'
            }}
          />
        </svg>

        <style jsx>{`
          @keyframes pathTrace {
            0% { stroke-dashoffset: 1200; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full pt-[110px] sm:pt-[130px] md:pt-[180px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl">
            {/* Main Heading with slide-up animation */}
            <h1 
              className={`text-[#EEEEEE] font-normal tracking-[-0.025em] mb-5 sm:mb-6 md:mb-8 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                fontSize: 'clamp(34px, 4.8vw, 76px)',
                lineHeight: '1.08',
                transitionDelay: '200ms',
              }}
            >
              We are a holistic design partner <br className="hidden md:block" />
              for{' '}
              <span
                style={{
                  fontFamily: 'var(--font-marck)',
                  fontSize: '1.06em',
                }}
                className="tracking-[-0.01em]"
              >
                forward-thinking
              </span>{' '}
              brands.
            </h1>

            {/* Subheading with slide-up animation */}
            <p 
              className={`text-[#EEEEEE] tracking-normal mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                fontSize: 'clamp(16px, 1.85vw, 24px)',
                lineHeight: '145%',
                fontWeight: 400,
                transitionDelay: '400ms',
              }}
            >
              We help ambitious brands grow by shaping ideas into <br className="hidden md:block" />
              experiences people remember.
            </p>

            {/* CTA Buttons */}
            <div
              className={`grid grid-cols-2 md:flex md:flex-wrap gap-2.5 sm:gap-3 w-full transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <Link
                href="/contact"
                onMouseEnter={() => setIsStartHovered(true)}
                onMouseLeave={() => setIsStartHovered(false)}
                className="flex items-center justify-center text-center w-full md:w-auto px-3 py-3 md:px-10 md:py-4 text-[13px] xs:text-[14px] sm:text-[16px] md:text-[18px] font-normal transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border-0 rounded-[4px]"
                style={{
                  backgroundColor: isStartHovered ? '#3BEDFF' : '#1D1D1D',
                  color: isStartHovered ? '#111111' : '#EEEEEE',
                  boxShadow: isStartHovered ? '0 10px 25px -5px rgba(59, 237, 255, 0.35)' : undefined,
                }}
              >
                Start a Project
              </Link>
              <Link
                href="/projects"
                onMouseEnter={() => setIsPortfolioHovered(true)}
                onMouseLeave={() => setIsPortfolioHovered(false)}
                className="flex items-center justify-center text-center w-full md:w-auto px-3 py-3 md:px-10 md:py-4 text-[13px] xs:text-[14px] sm:text-[16px] md:text-[18px] font-normal transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border-0 rounded-[4px]"
                style={{
                  backgroundColor: isPortfolioHovered ? '#3BEDFF' : '#1D1D1D',
                  color: isPortfolioHovered ? '#111111' : '#EEEEEE',
                  boxShadow: isPortfolioHovered ? '0 10px 25px -5px rgba(59, 237, 255, 0.35)' : undefined,
                }}
              >
                See Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}