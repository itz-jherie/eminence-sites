'use client'

import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

export default function Footer() {
  return (
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
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-0 md:mb-20">
          <RevealOnScroll direction="up" delay={100} duration={1000}>
            <div>
              <h2 className="text-[#092A30] text-xl font-medium mb-0 md:mb-12">Mr Eminence</h2>
              <p suppressHydrationWarning className="text-[#092A30]/60 text-sm mt-auto md:mt-40 hidden md:block">
                © {new Date().getFullYear()} Mr. Eminence. All rights reserved
              </p>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col md:flex-row gap-8 md:gap-32 lg:gap-48">
            {/* Connect */}
            <RevealOnScroll direction="up" delay={300} duration={1000} className="order-2 md:order-1">
              <div>
                <h3 className="text-[#092A30] font-bold mb-6 uppercase tracking-wider text-xs">Connect</h3>
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
                      <span className="text-[#3A3A3A] underline">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </RevealOnScroll>

            {/* Contact */}
            <RevealOnScroll direction="up" delay={500} duration={1000} className="order-1 md:order-2">
              <div>
                <h3 className="text-[#092A30] font-bold mb-6 uppercase tracking-wider text-xs">Contact</h3>
                <div className="flex flex-col gap-2">
                  <a href="tel:+2348165679483" className="text-[#092A30] underline hover:opacity-70 transition-opacity">+2348165679483</a>
                  <a href="mailto:eminencegorbarn@gmail.com" className="text-[#092A30] underline hover:opacity-70 transition-opacity">eminencegorbarn@gmail.com</a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Centered Copyright Line at the bottom for Mobile Only */}
        <div className="mt-10 text-center block md:hidden">
          <p suppressHydrationWarning className="text-[#092A30]/60 text-sm">
            © {new Date().getFullYear()} Mr. Eminence. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
