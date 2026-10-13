'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Custom Draggable Ticker Engine
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftPos = useRef(0)

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (currentSection) observer.observe(currentSection)
    return () => {
      if (currentSection) observer.unobserve(currentSection)
    }
  }, [])

  // Infinite Scroll Loop
  useEffect(() => {
    let animationFrameId: number;
    const playTicker = () => {
      if (!isDragging.current && trackRef.current) {
        // Automatically scroll right
        trackRef.current.scrollLeft += 1;
        // Seamless loop calculation: when scroll reaches midway (because we triple duplicated the array), snap back!
        if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth / 2) {
          trackRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(playTicker);
    };
    animationFrameId = requestAnimationFrame(playTicker);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    if (trackRef.current) {
      startX.current = clientX - trackRef.current.offsetLeft
      scrollLeftPos.current = trackRef.current.scrollLeft
    }
  }

  const handleDragEnd = () => {
    isDragging.current = false
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault() // Prevents page swiping while dragging the carousel
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = clientX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // Multiplier for faster grab
    trackRef.current.scrollLeft = scrollLeftPos.current - walk
  }

  const testimonials = [
    {
      id: 1,
      text: "Eminence brings a rare level of precision and creative maturity to every project. The execution, attention to detail, and overall presentation always feel premium and intentional. Working with him was smooth from start to finish. This is senior man delivery.",
      name: "Adebayo",
      title: "Founder",
      company: "KclautX",
      image: "/assets/testimonial-1.jpg"
    },
    {
      id: 2,
      text: "One thing about Eminence is that he understands the vision almost instantly. He takes ideas and transforms them into something far beyond expectations. The creativity, presentation, and final delivery were honestly impressive. I absolutely loved the result.",
      name: "Onokoya Ayo",
      title: "Co Founder",
      company: "RepMirror",
      image: "/assets/testimonial-2.jpg"
    },
    {
      id: 3,
      text: "Eminence handled the entire creative process with excellence and commitment. From the early planning stages to the final delivery, he brought innovation, patience, and professionalism into every detail. I truly appreciate the level of dedication and originality he brought to the project.",
      name: "Mr Joel",
      title: "CEO",
      company: "AITECH Empowerment Foundation",
      image: "/assets/testimonial-3.jpg"
    },
    {
      id: 4,
      text: "Eminence is exceptionally talented. His ability to combine creativity with strategic thinking makes his work stand out immediately. Everything from the visual direction to the execution felt thoughtful and refined. I genuinely admire his level of creativity and professionalism.",
      name: "Daniel",
      title: "Co Founder and CEO",
      company: "MTestHub",
      image: "/assets/testimonial-4.jpg"
    },
    {
      id: 5,
      text: "Working with Eminence was an amazing experience. The final outcome exceeded expectations and the level of creativity he brought into the project was outstanding. Every detail felt polished, modern, and well executed. The work was honestly beautiful.",
      name: "Oluwafemi Boyejo",
      title: "CEO",
      company: "Wasset",
      image: "/assets/testimonial-1.jpg"
    },
    {
      id: 6,
      text: "Eminence understood exactly what we needed and delivered with clarity and confidence. The visuals, storytelling, and overall execution aligned perfectly with our vision. The process felt seamless and the final result was exactly what we were hoping for.",
      name: "Brimlux Energy",
      title: "Client",
      company: "Brimlux Energy",
      image: "/assets/testimonial-2.jpg"
    },
  ]

  // Triple the array for flawlessly safe drag looping margins
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <section 
      ref={sectionRef}
      className="relative bg-background py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Vector Logo */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-[0.03] pointer-events-none">
        <Image src="/assets/Vector (5).png" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain object-right" />
      </div>

      <div className="relative z-10">
        
        {/* Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header */}
          <div 
            className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-[#EEEEEE] tracking-normal max-w-2xl" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '100%', fontWeight: 400 }}>
              Impact you can hear
            </h2>
            <p className="text-[#3BEDFF] tracking-normal mt-2 sm:mt-3" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '100%', fontWeight: 400 }}>
              The brands say it best
            </p>
          </div>
        </div>

        {/* DRAGGABLE Scrolling Testimonials Ticker */}
        <div className="relative w-full">
          <div 
            ref={trackRef}
            className="flex gap-6 md:gap-12 lg:gap-16 overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onMouseLeave={handleDragEnd}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDragMove}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            onTouchMove={handleDragMove}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[90vw] sm:w-[400px] md:w-[350px] lg:w-[380px] max-w-[95vw] bg-[#1E1E1E] md:bg-transparent rounded-lg md:rounded-none p-5 md:p-0 border border-white/10 md:border-transparent hover:border-[#3BEDFF]/30 md:hover:border-transparent transition-all duration-500 group flex flex-col justify-between"
              >
                {/* Responsive Testimonial Text */}
                <p 
                  className="leading-[1.7] mb-6 md:mb-8 lg:mb-10 transition-colors duration-300 pointer-events-none text-[14px] md:text-[16px] text-white/70"
                >
                  {testimonial.text}
                </p>

                {/* Responsive Author Info Lock */}
                <div className="flex flex-col mt-auto pointer-events-none">
                  <h4 className="font-medium transition-colors duration-300 text-white text-[14px] md:text-[16px]">
                    {testimonial.name}
                  </h4>
                  <p className="mt-1 text-white/60 text-[12px] md:text-[14px]">
                    {testimonial.title}{testimonial.company ? `, ${testimonial.company}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}