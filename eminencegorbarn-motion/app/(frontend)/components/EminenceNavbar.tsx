'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function EminenceNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const pathname = usePathname()
  const isEminencePage = true

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Eminence', href: '/eminence' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
  ]

  // Show navbar after loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100) // Adjust this to match your loading screen duration

    return () => clearTimeout(timer)
  }, [])

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className="hidden lg:block fixed pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%) scale(${cursorVariant === 'link' ? 3 : 1})`,
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div 
          className={`w-4 h-4 rounded-full bg-lightblue transition-all duration-300 ${
            cursorVariant === 'link' ? 'opacity-30' : 'opacity-100'
          }`}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md transition-all duration-300 h-[80px] md:h-[100px] lg:h-[110px]">
        <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Logo */}
          <Link 
            href="/" 
            className="z-50 transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {isEminencePage ? (
              <span className="text-white text-xl font-medium">Eminence</span>
            ) : (
              <Image
                src="/assets/Group.svg"
                alt="Logo"
                width={80}
                height={40}
                className="w-auto h-8 sm:h-9 md:h-10"
                priority
              />
            )}
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={() => setCursorVariant('default')}
            className="z-50 flex flex-col gap-1.5 w-7 h-7 sm:w-8 sm:h-8 justify-center items-center group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-full h-[2px] bg-white transition-all duration-500 ease-out group-hover:bg-lightblue ${
                isOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-lightblue ${
                isOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-white transition-all duration-500 ease-out group-hover:bg-lightblue ${
                isOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Menu Content */}
        <div 
          className={`absolute right-0 top-0 h-full w-full sm:w-[85%] md:w-[60%] lg:w-1/2 bg-[#E2FCFF] overflow-hidden transition-transform duration-700 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Background Logo Pattern */}
          <div className="absolute inset-0 opacity-[0.8]">
            <Image
              src="/assets/Vector (5).webp"
              alt="Eminence"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 60vw, 50vw"
              className="object-cover object-center scale-110"
              priority
            />
          </div>

          {/* Menu Content Branching */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 pt-[80px] md:pt-[100px] lg:pt-[110px]">
            {isEminencePage ? (
              /* Eminence Specific Menu */
              <div className="space-y-12">
                <div 
                   style={{
                    animation: isOpen ? 'slideIn 0.6s ease-out 0.1s forwards' : 'none',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <a
                    href="mailto:eminencegorbarn@gmail.com"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="inline-block px-10 py-5 text-xl text-white font-normal transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#155359' }}
                  >
                    Start a Project
                  </a>
                </div>
 
                <div 
                  className="space-y-6"
                  style={{
                    animation: isOpen ? 'slideIn 0.6s ease-out 0.3s forwards' : 'none',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <h3 className="text-[#155359] text-sm font-bold uppercase tracking-widest">Contact</h3>
                  <div className="space-y-2">
                    <a href="tel:+2348165679483" className="block text-[#155359] text-lg hover:opacity-70 transition-opacity">+2348165679483</a>
                    <a href="mailto:eminencegorbarn@gmail.com" className="block text-[#155359] text-lg hover:opacity-70 transition-opacity">eminencegorbarn@gmail.com</a>
                  </div>
                </div>

                {/* Social Icons */}
                <div 
                  className="flex gap-4"
                  style={{
                    animation: isOpen ? 'slideIn 0.6s ease-out 0.5s forwards' : 'none',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {[
                    { name: 'Behance', href: 'https://www.behance.net/gorbarncreatives', icon: '/assets/behance.svg' },
                    { name: 'Instagram', href: 'https://www.instagram.com/eminence_gorbarn?igsh=MWVveXE0MjFrODV5bQ%3D%3D&utm_source=qr', icon: '/assets/instagram.svg' },
                    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/oluwanimifise-adesogan-5aab4a37b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', icon: '/assets/linkedin.svg' },
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      href={social.href} 
                      className="w-10 h-10 rounded-full border border-[#155359] flex items-center justify-center hover:bg-[#155359] group transition-colors"
                    >
                      <span className="sr-only">{social.name}</span>
                      {/* Simple SVG placeholders or use Lucide if preferred */}
                      <div className="w-5 h-5 text-[#155359] group-hover:text-white transition-colors flex items-center justify-center">
                        {social.name === 'Behance' && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.2 19.125c.875 0 1.62-.175 2.22-.525a3.89 3.89 0 0 0 1.5-1.5c.34-.6.51-1.32.51-2.15 0-1.32-.47-2.34-1.42-3.05.7-.5 1.16-1.36 1.16-2.52 0-.82-.175-1.5-.525-2.05a3.4 3.4 0 0 0-1.43-1.37c-.6-.31-1.3-.47-2.1-.47H1.5v13.63H8.2zm-4.2-11.23h3.58c.84 0 1.4.15 1.68.45.28.3.42.74.42 1.33 0 .53-.14.94-.42 1.23-.28.3-.81.45-1.57.45H4v-3.46zm0 5.86h3.9c.77 0 1.31.16 1.62.48.3.32.46.77.46 1.35 0 .61-.15 1.07-.46 1.38-.3.31-.86.47-1.66.47H4v-3.68zM22.5 13c0-1.55-.38-2.73-1.13-3.55s-1.84-1.22-3.26-1.22c-1.41 0-2.51.41-3.3 1.22s-1.18 2.02-1.18 3.63c0 1.56.38 2.76 1.14 3.58.76.82 1.84 1.23 3.24 1.23 1.05 0 1.93-.21 2.65-.63a4.57 4.57 0 0 0 1.76-1.82l-2.02-1.07c-.32.48-.73.84-1.23 1.08-.5.24-1.06.36-1.68.36-.7 0-1.24-.18-1.62-.54-.38-.36-.61-.92-.68-1.67h7.24c.03-.2.04-.4.04-.61zm-6.28-1.57c.07-.63.29-1.12.65-1.47s.88-.53 1.54-.53c.63 0 1.12.18 1.47.53.35.35.56.84.62 1.47h-4.28zM14.5 5.5h7.2v1.5h-7.2z"/>
                          </svg>
                        )}
                        {social.name === 'Instagram' && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zM18.406 3.99a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
                        )}
                        {social.name === 'LinkedIn' && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              /* Standard Menu Content */
              <>
                <nav className="space-y-3 sm:space-y-4 md:space-y-6">
                  {navLinks.map((link, index) => (
                    <div
                      key={link.name}
                      className="overflow-hidden"
                      style={{
                        animation: isOpen ? `slideIn 0.6s ease-out ${index * 0.1}s forwards` : 'none',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="block text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-black hover:text-foundation-dark transition-all duration-300 hover:translate-x-4 hover:scale-105 origin-left"
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </nav>

                <div 
                  className="mt-8 sm:mt-10 md:mt-12"
                  style={{
                    animation: isOpen ? 'slideIn 0.6s ease-out 0.5s forwards' : 'none',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="inline-block px-8 py-4 text-sm sm:text-base text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    style={{ backgroundColor: '#155359' }}
                  >
                    Start a Project
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Left side - clickable to close */}
        <div
          className={`absolute left-0 top-0 h-full w-0 sm:w-[15%] md:w-[40%] lg:w-1/2 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}