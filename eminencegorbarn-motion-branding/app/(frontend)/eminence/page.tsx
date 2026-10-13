'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TestimonialsSection from '../components/TestimonialsSection'
import RevealOnScroll from '../components/RevealOnScroll'

const portfolioItems = [
  {
    id: 6,
    title: 'KclautX',
    category: 'Motion',
    image: '/assets/gifs/KclautX_opt.mp4',
    link: 'https://www.behance.net/gallery/253172679/KclautX-Launch-Video?platform=direct',
    description: 'Launch video',
  },
  {
    id: 3,
    title: 'Vent 2.0',
    category: 'Motion',
    image: '/assets/gifs/Shots_5_opt.mp4',
    link: 'https://www.behance.net/gallery/249007493/Vent-20-Launch-Video', // Change this link for Project 3
    description: 'Token launch platform',
  },
  {
    id: 1,
    title: 'KOVA Futures',
    category: 'Motion',
    image: '/assets/gifs/kova_opt.mp4',
    link: 'https://www.behance.net/gallery/249520913/KOVA-Futures',
    description: 'Digital trading platform',
  },
  {
    id: 2,
    title: 'XIBooster',
    category: 'Motion',
    image: '/assets/gifs/Xibooster_opt.mp4',
    link: 'https://www.behance.net/gallery/249984541/XIBooster?platform=direct',
    description: 'Digital Growth platform',
  },
  {
    id: 4,
    title: 'Brimlux',
    category: 'Motion',
    image: '/assets/gifs/Brimlux_opt.mp4',
    link: 'https://www.behance.net/gallery/249982629/Brimlux-Solar-Technologies?platform=direct', // Change this link for Project 4
    description: 'Indigenous energy brand',
  },
  {
    id: 5,
    title: 'Wasset',
    category: 'Motion',
    image: '/assets/gifs/Wasset_opt.mp4',
    link: 'https://www.behance.net/gallery/245116477/Wasset-Launch-Video?platform=direct/', // Change this link for vUSD Deposits
    description: 'Revolutionizing waste management',
  },
]

export default function EminencePage() {
  const [activeFilter, setActiveFilter] = useState('Motion')

  const filteredItems = portfolioItems.filter(item => item.category === activeFilter)

  return (
    <main className="min-h-screen bg-background">
      {/* Top Section with Padding */}
      <div className="pt-[140px] md:pt-[180px] pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-20 md:mb-32 max-w-5xl">
            <RevealOnScroll direction="up" delay={200} duration={1200} yOffset={40}>
              <p
                className="text-white leading-[1.4] tracking-tight font-normal"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                I&apos;m Oluwanimifise &apos;Eminence&apos; Adesogan, a brand and motion designer specialising in branding, motion design, and visual identities.
              </p>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={500} duration={1200} yOffset={30} className="mt-4">
              <p
                className="text-lightblue leading-[1.4] tracking-tight font-normal"
                style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}
              >
                I&apos;ve worked across AI, fintech, crypto, and tech.
              </p>
            </RevealOnScroll>
          </div>

          {/* Filter Buttons */}
          <RevealOnScroll direction="up" delay={800} duration={1000} yOffset={20}>
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 mb-16 md:mb-24 w-full">
              {['Motion'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`tab-toggle-btn md:min-w-[160px] px-6 py-3 md:px-6 md:py-5 text-sm md:text-base transition-all duration-300 text-center border font-medium cursor-pointer hover:bg-[#3BEDFF] hover:text-[#111111] hover:border-[#3BEDFF]
                    ${activeFilter === filter
                      ? "bg-[#1a1a1a] text-white border-[#2a2a2a]"
                      : "bg-transparent text-[#666666] border-[#1a1a1a]"
                    }
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Portfolio 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16">
            {filteredItems.map((item, index) => (
              <RevealOnScroll
                key={item.id}
                direction="up"
                delay={100}
                duration={1200}
                yOffset={50}
              >
                <Link
                  href={item.link || 'https://www.behance.net/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative w-full aspect-[4/3] md:aspect-[605/320] overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:shadow-lightblue/5"
                  style={{
                    borderRadius: '6px'
                  }}
                >
                  <div className="relative w-full h-full">
                    {item.image.endsWith('.mp4') ? (
                      <video
                        src={item.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority={index < 2}
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

                    {/* Overlay Container */}
                    <div
                      className="flex flex-col justify-center absolute bottom-[22px] left-[16px] right-[16px] min-h-[66px] bg-white text-black py-2 px-5 z-20 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300"
                      style={{ borderRadius: '9.5px' }}
                    >
                      <h3 className="font-semibold text-base sm:text-lg text-black leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[11px] sm:text-[13px] text-[#555555] mt-0.5 sm:mt-1 font-normal leading-none">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      <TestimonialsSection />

      {/* Custom CTA Section - TRULY Full Width */}
      <div className="w-full bg-[#092A30] py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative overflow-hidden">
          <RevealOnScroll direction="up" delay={100} duration={1000} className="max-w-xl z-10 w-full">
            <div>
              <h2
                className="text-white mb-6 text-[28px] sm:text-[36px] md:text-[48px]"
                style={{
                  fontFamily: "'Manrope', var(--font-family-sans), sans-serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                It&apos;s time your visuals matched your vision
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-normal mb-10">
                Let&apos;s make your brand impossible to ignore
              </p>
              <Link
                href="mailto:eminencegorbarn@gmail.com"
                className="inline-block text-white px-10 py-4 rounded-none text-lg font-normal transition-transform hover:scale-105 active:scale-95 mb-8 md:mb-0"
                style={{ backgroundColor: '#041013' }}
              >
                Contact Me
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={300} duration={1000} className="text-left md:text-right z-10 pb-2 w-full md:w-auto">
            <div>
              <div
                className="text-white/90 font-normal mb-2"
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(20px, 4vw, 38.08px)',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  textDecoration: 'underline'
                }}
              >
                <a href="tel:+2348165679483" className="hover:text-lightblue transition-colors">
                  +2348165679483
                </a>
              </div>
              <div
                className="text-white/90 font-normal"
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(20px, 4vw, 38.08px)',
                  lineHeight: '1.4',
                  letterSpacing: '0%',
                  textDecoration: 'underline'
                }}
              >
                <a href="mailto:eminencegorbarn@gmail.com" className="hover:text-lightblue transition-colors">
                  eminencegorbarn@gmail.com
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Custom Eminence Footer - TRULY Full Width & Flushed Bottom */}
      <footer className="w-full bg-[#E2FCFF] pt-20 pb-10 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Background Swirl/Logo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <Image
              src="/assets/Vector5.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <RevealOnScroll direction="up" delay={100} duration={1000}>
              <div>
                <h2 className="text-[#092A30] text-xl font-medium mb-12">Mr Eminence</h2>
                <p className="text-[#092A30]/60 text-sm mt-auto md:mt-40">
                  © 2025 Xi Studio. All rights reserved
                </p>
              </div>
            </RevealOnScroll>

            <div className="flex flex-col md:flex-row gap-20 md:gap-32 lg:gap-48">
              {/* Connect */}
              <RevealOnScroll direction="up" delay={300} duration={1000}>
                <div>
                  <h3 className="text-[#092A30] font-semibold mb-6 uppercase tracking-wider text-xs">Connect</h3>
                  <nav className="flex flex-col gap-4">
                    {[
                      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/oluwanimifise-adesogan-5aab4a37b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
                      { name: 'Behance', href: 'https://www.behance.net/gorbarncreatives' },
                      { name: 'Instagram', href: 'https://www.instagram.com/eminence_gorbarn?igsh=MWVveXE0MjFrODV5bQ%3D%3D&utm_source=qr' },
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-[#092A30] flex items-center gap-2 hover:translate-x-2 transition-transform duration-300"
                      >
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                          <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {link.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </RevealOnScroll>

              {/* Contact */}
              <RevealOnScroll direction="up" delay={500} duration={1000}>
                <div>
                  <h3 className="text-[#092A30] font-semibold mb-6 uppercase tracking-wider text-xs">Contact</h3>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+2348165679483" className="text-[#092A30] hover:opacity-70 transition-opacity">+2348165679483</a>
                    <a href="mailto:eminencegorbarn@gmail.com" className="text-[#092A30] hover:opacity-70 transition-opacity">eminencegorbarn@gmail.com</a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

