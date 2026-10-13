'use client'

import Image from 'next/image'

interface PartnerMarqueeProps {
  className?: string
  speed?: number // Duration in seconds (lower is faster)
}

export default function PartnerMarquee({
  className = '',
  speed = 34,
}: PartnerMarqueeProps) {
  // 3 repetitions in each track ensure even ultra-wide displays are seamlessly covered
  const items = [0, 1, 2]

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center group cursor-pointer select-none h-[103px] md:h-[56.65px] ${className}`}
    >
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Hardware Marquee Track (Track 1) */}
      <div 
        className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-24 pr-12 sm:pr-16 md:pr-24 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((i) => (
          <Image
            key={`t1-${i}`}
            src="/assets/Frame 1000006614.svg"
            alt="Partner Logos"
            width={1351}
            height={39}
            unoptimized
            priority
            className="h-[26px] sm:h-[30px] md:h-[35px] w-auto opacity-60 transition-opacity duration-500 group-hover:opacity-100 object-contain shrink-0"
          />
        ))}
      </div>

      {/* Infinite Seamless Hardware Marquee Track (Track 2 - exact clone) */}
      <div 
        className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-24 pr-12 sm:pr-16 md:pr-24 animate-marquee group-hover:[animation-play-state:paused]"
        aria-hidden="true"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((i) => (
          <Image
            key={`t2-${i}`}
            src="/assets/Frame 1000006614.svg"
            alt="Partner Logos"
            width={1351}
            height={39}
            unoptimized
            priority
            className="h-[26px] sm:h-[30px] md:h-[35px] w-auto opacity-60 transition-opacity duration-500 group-hover:opacity-100 object-contain shrink-0"
          />
        ))}
      </div>
    </div>
  )
}
