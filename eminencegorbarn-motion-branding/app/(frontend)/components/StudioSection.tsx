'use client'

import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

export default function StudioSection() {
  return (
    <section className="relative bg-background py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Header Row - Studio Title and Description */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          
          {/* Studio Title - Left Side */}
          <RevealOnScroll direction="right" delay={100} duration={1000} className="md:w-auto">
            <h2 className="text-[#EEEEEE] tracking-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal whitespace-nowrap" style={{ lineHeight: '100%' }}>
              Studio
            </h2>
          </RevealOnScroll>

          {/* Description Text - Right Side */}
          <RevealOnScroll direction="left" delay={300} duration={1000} className="flex-1 md:max-w-md lg:max-w-lg">
            <p className="text-[#EEEEEE] text-xs sm:text-sm md:text-base font-normal opacity-80" style={{ lineHeight: '160%' }}>
              We&apos;re the team you turn to when you&apos;ve outgrown your website, your marketing is confused or your logo is stuck in the past. Together, we&apos;ll build the next evolution of your brand and website, so you can cut through the noise and become more relevant to the right people.
            </p>
          </RevealOnScroll>
        </div>

        {/* Images Row - Side by Side */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
          
          {/* Image 1 - Studio Setup with Microphone */}
          <RevealOnScroll direction="up" delay={400} duration={1000} className="flex-1 h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-lightblue/20">
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl">
              <Image
                src="/assets/84.webp"
                alt="Studio Setup"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
            </div>
          </RevealOnScroll>

          {/* Image 2 - Workspace with Screens */}
          <RevealOnScroll direction="up" delay={500} duration={1000} className="flex-1 h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-lightblue/20">
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl">
              <Image
                src="/assets/85.webp"
                alt="Creative Workspace"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
            </div>
          </RevealOnScroll>

        </div>

      </div>
    </section>
  )
}