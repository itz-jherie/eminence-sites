'use client'

import React from 'react'
import RevealOnScroll from '../components/RevealOnScroll'

const SOCIAL_LINKS = [
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/in/oluwanimifise-adesogan-5aab4a37b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/eminence_gorbarn?igsh=MWVveXE0MjFrODV5bQ%3D%3D&utm_source=qr',
  },
  {
    name: 'Youtube',
    href: 'https://youtube.com',
  },
  {
    name: 'Behance',
    href: 'https://behance.net',
  },
]

export default function AboutCTASection() {
  return (
    <section className="relative w-full bg-[#155359] py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-start text-left">
        <RevealOnScroll direction="up" delay={100} duration={1000}>
          <h2 
            className="text-white font-normal tracking-tight leading-[1.3] mb-8 sm:mb-10 max-w-xl md:max-w-2xl lg:max-w-3xl"
            style={{ fontSize: 'clamp(22px, 3.2vw, 38px)' }}
          >
            If you want to keep up to date with our news and job vacancies, give us a follow and keep an eye open.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={250} duration={1000}>
          <div className="flex flex-wrap items-center justify-start gap-5 sm:gap-8 md:gap-10">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm sm:text-base font-normal underline underline-offset-[5px] decoration-white/50 hover:decoration-white transition-all duration-300 hover:opacity-90"
              >
                {link.name}
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
