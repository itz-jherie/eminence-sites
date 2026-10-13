'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react'
import RevealOnScroll from '../components/RevealOnScroll'

function FooterInstagramIcon({ className = 'w-5 h-5', color = '#A2F6FF' }: { className?: string; color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19.5635 10.4428C19.5611 9.92958 19.5263 9.41632 19.4047 8.91328C19.0695 7.5165 18.2528 6.57425 16.9122 6.13249C16.3164 5.93587 15.6957 5.89501 15.0751 5.88735C14.2707 5.87458 13.4664 5.88224 12.662 5.88224C11.8577 5.88224 11.0384 5.87203 10.2266 5.88735C9.71273 5.89501 9.19635 5.92565 8.69488 6.05077C7.39401 6.38018 6.49036 7.16922 6.03356 8.47407C5.81262 9.10479 5.75552 9.76615 5.75303 10.4275C5.74062 12.1358 5.7431 13.8416 5.75303 15.5473C5.75552 16.0555 5.79276 16.5662 5.90944 17.0641C6.23465 18.4303 7.02659 19.3649 8.32994 19.827C8.92824 20.0364 9.55136 20.0901 10.1745 20.0952C11.6938 20.1105 13.2131 20.1105 14.7325 20.1054C15.3283 20.1028 15.9266 20.0875 16.515 19.9547C17.9102 19.6406 18.8635 18.8082 19.3203 17.3986C19.5114 16.8011 19.5635 16.1806 19.566 15.5576C19.5784 13.8518 19.576 12.1435 19.566 10.4377L19.5635 10.4428ZM18.3024 15.7976C18.2925 16.1985 18.2503 16.5994 18.1336 16.985C17.8555 17.9068 17.2423 18.4584 16.3387 18.6831C15.8 18.8159 15.2464 18.821 14.6977 18.8261C13.3323 18.8363 11.9644 18.8363 10.599 18.8261C10.0603 18.821 9.52157 18.8133 8.99278 18.6856C7.94017 18.4303 7.31457 17.7485 7.10603 16.6632C6.98439 16.0351 6.98935 15.3916 6.98687 14.7557C6.9819 13.4994 6.97942 12.2405 6.98935 10.9842C6.99432 10.3994 6.9968 9.80956 7.12589 9.23502C7.37167 8.12679 8.12389 7.41691 9.2187 7.25604C9.89644 7.15645 10.5816 7.159 11.2643 7.15645C12.4088 7.1539 13.5533 7.15134 14.6977 7.16667C15.2439 7.17177 15.79 7.18199 16.3263 7.30456C17.3441 7.54203 18.0268 8.27234 18.213 9.32695C18.3322 10.0062 18.3272 10.6931 18.3322 11.38C18.3372 11.9213 18.3322 12.4652 18.3322 13.0066H18.3521C18.3347 13.9361 18.3247 14.8681 18.3049 15.8001L18.3024 15.7976Z" fill={color}/>
      <path d="M12.6547 9.33203C10.6935 9.33203 9.09473 10.9714 9.09473 12.9912C9.09473 15.0136 10.6885 16.6581 12.6473 16.6581C14.606 16.6581 16.2172 15.0213 16.2197 12.9989C16.2197 10.9714 14.6284 9.33203 12.6572 9.33203H12.6547ZM12.6473 15.3711C11.3663 15.3609 10.3335 14.2884 10.3459 12.9785C10.3584 11.6711 11.3985 10.6088 12.6572 10.619C13.9432 10.6318 14.9734 11.6966 14.9635 13.0066C14.9536 14.3191 13.9134 15.3813 12.6473 15.3711Z" fill={color}/>
      <path d="M16.3288 8.33382C15.8646 8.35425 15.4972 8.7526 15.5195 9.21479C15.5443 9.69485 15.9316 10.0677 16.381 10.0447C16.8477 10.0243 17.2102 9.62846 17.1878 9.16117C17.1655 8.67855 16.7906 8.3134 16.3288 8.33382Z" fill={color}/>
      <path d="M11.9643 25.9961C10.4872 25.9961 9.00257 25.9757 7.52545 25.9068C6.39836 25.8531 5.42768 25.7127 4.55133 25.4701C2.43867 24.8879 1.08071 23.4886 0.512198 21.3155C0.112505 19.7885 0.0479573 18.2411 0.0380271 17.0639L0.0256173 15.8076C-0.00417353 13.1596 -0.0314818 10.4222 0.0876814 7.72054C0.137333 6.61231 0.251528 5.30746 0.713285 4.02048C1.22718 2.5854 2.15566 1.54101 3.46894 0.912843C4.23605 0.545135 5.08012 0.322979 6.20473 0.192749C6.82537 0.12125 7.47331 0.0701795 8.18581 0.0395372C9.36007 -0.0115333 10.5467 -0.00131923 11.6962 0.00634135C12.5005 0.0114484 13.3049 0.0140019 14.1067 0.00889487C15.3207 0.00123429 16.5769 -0.00642628 17.8182 0.0752865C18.9031 0.146785 20.1642 0.25914 21.3658 0.713668C22.7585 1.23969 23.7763 2.19216 24.3895 3.54808C24.747 4.33712 24.963 5.20532 25.0896 6.36207C25.1839 7.20984 25.2659 8.03973 25.2684 8.8824C25.2684 9.69186 25.2783 10.5013 25.2882 11.3108V11.3465C25.3031 12.5212 25.318 13.7392 25.3106 14.9368V15.3811C25.2981 17.3473 25.2857 19.3799 24.7843 21.313C24.2207 23.486 22.8603 24.8853 20.7451 25.4701C19.2581 25.8812 17.7561 25.9476 16.6116 25.9578L15.4424 25.9706C14.2979 25.9834 13.1336 25.9961 11.9643 25.9961ZM8.23546 1.31119C7.55027 1.34184 6.93212 1.3878 6.34127 1.45674C5.35569 1.57165 4.62829 1.75806 3.98779 2.06448C2.96746 2.55221 2.2773 3.33614 1.87513 4.45714C1.47295 5.58069 1.37117 6.76552 1.32648 7.77417C1.20732 10.4375 1.23711 13.157 1.26442 15.7871L1.27683 17.046C1.28676 18.1466 1.34634 19.5893 1.7088 20.9784C2.16062 22.7046 3.19585 23.7695 4.87158 24.2316C5.67097 24.4512 6.52994 24.5764 7.58007 24.6274C10.1892 24.7475 12.8506 24.7194 15.425 24.6887L16.5943 24.676C17.6642 24.6657 19.0669 24.6045 20.4174 24.2316C22.0981 23.7669 23.1333 22.7021 23.5802 20.9784C24.042 19.2037 24.0519 17.2529 24.0618 15.3684V14.9215C24.0718 13.7341 24.0569 12.5263 24.042 11.3568V11.321C24.032 10.5064 24.0221 9.69186 24.0221 8.87729C24.0221 8.10102 23.9402 7.30942 23.8508 6.4974C23.7391 5.48365 23.5579 4.73802 23.26 4.07666C22.7833 3.02461 22.0236 2.31473 20.9338 1.90361C19.8861 1.51037 18.7342 1.40567 17.7338 1.34184C16.5347 1.26523 15.3008 1.27034 14.1067 1.278C13.2974 1.2831 12.4881 1.28055 11.6788 1.27544C10.5443 1.26778 9.37248 1.25757 8.22801 1.30609L8.23546 1.31119Z" fill={color}/>
    </svg>
  )
}

function FooterLinkedInIcon({ className = 'w-5 h-5', color = '#A2F6FF' }: { className?: string; color?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.884 19.7939C10.7996 19.7939 10.7251 19.7198 10.7251 19.6304V11.0302C10.7251 10.9868 10.7425 10.9433 10.7723 10.9127C10.8021 10.8821 10.8418 10.8642 10.884 10.8642H12.9371C13.0264 10.8642 13.0959 10.9382 13.0959 11.0276V12.6823L13.5875 11.9239C13.9723 11.3289 14.5706 10.7212 16.1023 10.7212C17.4653 10.7212 18.3515 11.2676 18.8108 12.3912C19.213 13.3718 19.213 14.5847 19.213 15.4707V19.6279C19.213 19.7198 19.1435 19.7913 19.0541 19.7913H16.9266C16.8397 19.7913 16.7677 19.7198 16.7677 19.6279V15.6291C16.7677 15.5857 16.7677 15.5371 16.7677 15.481C16.7776 14.9524 16.7975 13.8493 16.1892 13.2134C15.8888 12.8993 15.4842 12.741 14.9802 12.741C13.9127 12.741 13.2052 13.5837 13.0885 14.9932V15.006V19.6279C13.0885 19.7173 13.019 19.7913 12.9296 19.7913H10.8815L10.884 19.7939Z" fill={color}/>
      <path d="M6.71081 19.7939C6.60158 19.7939 6.51469 19.702 6.51221 19.5897V11.0685C6.51221 10.9562 6.60158 10.8643 6.71081 10.8643H8.68694C8.79369 10.8643 8.88305 10.9562 8.88305 11.0685V19.5897C8.88305 19.6458 8.86319 19.6944 8.82844 19.7327C8.7912 19.771 8.74155 19.7914 8.68941 19.7939H6.71329H6.71081Z" fill={color}/>
      <path d="M7.70148 9.50555C6.8152 9.50555 6.09277 8.76247 6.09277 7.85086C6.09277 6.93925 6.8152 6.19873 7.70148 6.19873C8.58776 6.19873 9.3077 6.93925 9.3077 7.85086C9.3077 8.76247 8.58776 9.50555 7.70148 9.50555Z" fill={color}/>
      <path d="M11.9643 25.9961C10.4872 25.9961 9.00257 25.9757 7.52545 25.9068C6.39836 25.8531 5.42768 25.7127 4.55134 25.4701C2.43867 24.8879 1.08071 23.4886 0.512198 21.3155C0.112505 19.7885 0.0479649 18.2411 0.0380346 17.0639L0.0256173 15.8076C-0.00417353 13.1596 -0.0314818 10.4222 0.0876814 7.72054C0.137333 6.61487 0.251536 5.30746 0.713293 4.02048C1.22718 2.5854 2.15566 1.54101 3.46894 0.912843C4.23605 0.545135 5.08013 0.322979 6.20473 0.192749C6.82289 0.12125 7.47331 0.0701795 8.18581 0.0395372C9.36006 -0.0115333 10.5467 -0.00131923 11.6962 0.00634135C12.5005 0.0114484 13.3049 0.0140019 14.1067 0.00889487C15.3207 0.00123429 16.5769 -0.00642628 17.8182 0.0752865C18.9031 0.146785 20.1642 0.25914 21.3658 0.713668C22.7585 1.23969 23.7763 2.19216 24.3895 3.54808C24.747 4.33712 24.963 5.20532 25.0896 6.36207C25.1839 7.20984 25.2659 8.04229 25.2683 8.88495C25.2683 9.69442 25.2783 10.5039 25.2882 11.3134C25.3031 12.4956 25.318 13.7162 25.3106 14.9394V15.3837C25.2981 17.3499 25.2857 19.3825 24.7843 21.3155C24.2207 23.4886 22.8603 24.8879 20.7451 25.4727C19.2581 25.8838 17.7561 25.9502 16.6116 25.9604L15.4424 25.9731C14.2979 25.9859 13.1336 25.9987 11.9643 25.9987V25.9961ZM8.23547 1.31119C7.55028 1.34184 6.93212 1.3878 6.34127 1.45674C5.35569 1.57165 4.63078 1.75806 3.99028 2.06448C2.96994 2.55221 2.27979 3.33614 1.87761 4.45714C1.47543 5.58324 1.37365 6.76552 1.32896 7.77417C1.2098 10.4375 1.23959 13.157 1.2669 15.7871L1.27932 17.046C1.28925 18.1466 1.34883 19.5893 1.71128 20.9784C2.16311 22.7046 3.19834 23.7695 4.87407 24.2316C5.67346 24.4512 6.53242 24.5764 7.58255 24.6274C10.1917 24.7475 12.853 24.7194 15.4275 24.6887L16.5967 24.676C17.6667 24.6657 19.0694 24.6045 20.4199 24.2316C22.1006 23.7669 23.1358 22.7021 23.5827 20.9784C24.0444 19.2037 24.0544 17.2529 24.0643 15.3684V14.9215C24.0742 13.7111 24.0593 12.4956 24.0444 11.321C24.0345 10.5064 24.0271 9.69186 24.0246 8.87729C24.0246 8.10102 23.9427 7.30687 23.8533 6.4974C23.7416 5.48365 23.5579 4.73547 23.2624 4.07666C22.7858 3.02461 22.0261 2.31473 20.9363 1.90361C19.8886 1.51037 18.7367 1.40567 17.7362 1.34184C16.5372 1.26523 15.3033 1.27034 14.1092 1.278C13.2999 1.2831 12.4906 1.28055 11.6813 1.27544C10.5467 1.26778 9.37497 1.25757 8.2305 1.30609L8.23547 1.31119Z" fill={color}/>
    </svg>
  )
}

const SERVICE_OPTIONS = [
  'Brand identity',
  'Motion & visual',
  'Product & UI design',
  'Website',
  '3D design',
  'Creative consulting',
]

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: FooterInstagramIcon,
    href: 'https://www.instagram.com/eminence_gorbarn?igsh=MWVveXE0MjFrODV5bQ%3D%3D&utm_source=qr',
  },
  {
    name: 'LinkedIn',
    icon: FooterLinkedInIcon,
    href: 'https://www.linkedin.com/in/oluwanimifise-adesogan-5aab4a37b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  },
]

const STEPS = [
  { number: '1', text: 'We review your message and brief' },
  { number: '2', text: 'We set up a short discovery call' },
  { number: '3', text: 'We share a tailored proposal' },
]

export default function ContactClient() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Brand identity',
    'Website',
  ])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Build mailto query
    const subject = encodeURIComponent(
      `Project Inquiry: ${name || 'New Client'} ${company ? `(${company})` : ''}`
    )
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany/Brand: ${company || 'N/A'}\nServices needed: ${selectedServices.join(', ') || 'General'}\n\nProject Details:\n${message}`
    )
    
    // Trigger mailto after brief delay
    setTimeout(() => {
      window.location.href = `mailto:xistudioww@gmail.com?subject=${subject}&body=${body}`
    }, 400)
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24 overflow-hidden relative">
      {/* Background Xi Vector Logo Watermark */}
      <div className="absolute right-0 top-[60px] md:top-[90px] lg:top-[110px] w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-[450px] md:h-[650px] lg:h-[750px] opacity-25 sm:opacity-35 md:opacity-45 pointer-events-none z-0 flex justify-end overflow-visible select-none">
        <Image
          src="/assets/vectornew.svg"
          alt=""
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          {/* LEFT COLUMN: Header & Form */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category Badge */}
            <RevealOnScroll direction="up" delay={80}>
              <span className="text-[#3BEDFF] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase block mb-3 sm:mb-4">
                CONTACT
              </span>
            </RevealOnScroll>

            {/* Main Heading */}
            <RevealOnScroll direction="up" delay={140}>
              <h1 
                className="font-normal tracking-tight text-[#EEEEEE] mb-4 sm:mb-5"
                style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: '1.1' }}
              >
                Let’s build something <br className="hidden sm:inline" />
                <span 
                  style={{ fontFamily: 'var(--font-marck)' }} 
                  className="text-[#3BEDFF] text-[1.12em] tracking-normal font-normal mr-1.5"
                >
                  remarkable
                </span> 
                together.
              </h1>
            </RevealOnScroll>

            {/* Subtitle Description */}
            <RevealOnScroll direction="up" delay={200}>
              <p className="text-[#a1a1aa] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] max-w-xl mb-6 sm:mb-8">
                Tell us about your brand, product or idea. Whether it’s a new identity, a website or a motion piece, we’d love to hear what you’re working on.
              </p>
            </RevealOnScroll>

            {/* MOBILE ONLY: Direct Email Pill (shown below subtitle on small screens) */}
            <div className="block lg:hidden mb-8 sm:mb-10">
              <RevealOnScroll direction="up" delay={240}>
                <div className="bg-[#141414] border border-[#222222] rounded-lg px-4 py-3 flex items-center gap-2 text-[13px] sm:text-sm text-[#888888]">
                  <span>Email us:</span>
                  <a
                    href="mailto:xistudioww@gmail.com"
                    className="text-[#3BEDFF] hover:underline font-normal"
                  >
                    hello@xistudio.com
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Form Section Header */}
            <div className="pt-2 sm:pt-4 mb-6 sm:mb-8">
              <RevealOnScroll direction="up" delay={260}>
                <h2 className="text-white text-[20px] sm:text-[22px] md:text-[24px] font-medium tracking-tight mb-1.5">
                  Start a project
                </h2>
                <p className="text-[#71717a] text-[13px] sm:text-sm font-normal">
                  <span className="hidden sm:inline">Fill in the details below. </span>
                  The more we know, the better we can help.
                </p>
              </RevealOnScroll>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <RevealOnScroll direction="up" delay={300}>
                  <div>
                    <label 
                      htmlFor="contact-name" 
                      className="block text-[#a1a1aa] text-xs sm:text-[13px] font-normal mb-2"
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#3BEDFF] transition-colors"
                    />
                  </div>
                </RevealOnScroll>

                <RevealOnScroll direction="up" delay={340}>
                  <div>
                    <label 
                      htmlFor="contact-email" 
                      className="block text-[#a1a1aa] text-xs sm:text-[13px] font-normal mb-2"
                    >
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#3BEDFF] transition-colors"
                    />
                  </div>
                </RevealOnScroll>
              </div>

              {/* Row 2: Company or brand (optional) */}
              <RevealOnScroll direction="up" delay={380}>
                <div>
                  <label 
                    htmlFor="contact-company" 
                    className="block text-[#a1a1aa] text-xs sm:text-[13px] font-normal mb-2"
                  >
                    Company or brand <span className="text-[#52525b]">(optional)</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Mountti"
                    className="w-full bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#3BEDFF] transition-colors"
                  />
                </div>
              </RevealOnScroll>

              {/* Row 3: What can we help with? pills */}
              <RevealOnScroll direction="up" delay={420}>
                <div>
                  <label className="block text-[#a1a1aa] text-xs sm:text-[13px] font-normal mb-3">
                    What can we help with?
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {SERVICE_OPTIONS.map((service) => {
                      const isSelected = selectedServices.includes(service)
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`rounded-full px-4 py-2 text-xs sm:text-[13px] transition-all duration-200 cursor-pointer select-none border ${
                            isSelected
                              ? 'bg-[#3BEDFF] text-black border-[#3BEDFF] font-medium shadow-[0_0_12px_rgba(59,237,255,0.25)]'
                              : 'bg-[#161616] text-[#d4d4d8] border-[#27272a] hover:border-[#3f3f46] font-normal'
                          }`}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Row 4: Tell us about your project */}
              <RevealOnScroll direction="up" delay={460}>
                <div>
                  <label 
                    htmlFor="contact-message" 
                    className="block text-[#a1a1aa] text-xs sm:text-[13px] font-normal mb-2"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Goals, timeline, budget range, links to anything helpful..."
                    className="w-full bg-[#141414] border border-[#262626] rounded-lg p-4 text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#3BEDFF] transition-colors resize-y min-h-[140px]"
                  />
                </div>
              </RevealOnScroll>

              {/* Row 5: Submit Button & Note */}
              <RevealOnScroll direction="up" delay={500}>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#A2F6FF] hover:bg-[#3BEDFF] text-black text-sm font-medium px-7 py-3.5 rounded-lg transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        Message sent!
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>

                  {/* Privacy / Guarantee note */}
                  <div className="flex items-start gap-2.5 mt-4 text-[#71717a] text-[12px] sm:text-[13px] leading-relaxed max-w-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3BEDFF] inline-block shrink-0 mt-1.5" />
                    <p>
                      Messages sent through this form go straight to our inbox at{' '}
                      <a
                        href="mailto:xistudioww@gmail.com"
                        className="text-[#a1a1aa] hover:text-[#3BEDFF] underline decoration-[#444] transition-colors"
                      >
                        hello@xistudio.com
                      </a>
                      , and a member of the studio will attend to it.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </form>
          </div>

          {/* RIGHT COLUMN: Contact Info & What Happens Next (Sidebar on desktop, stacked on mobile) */}
          <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-14 lg:pl-4 xl:pl-8">
            {/* DESKTOP ONLY: Prefer Email? */}
            <div className="hidden lg:block mb-8">
              <RevealOnScroll direction="up" delay={150}>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#3BEDFF] uppercase block mb-2">
                  PREFER EMAIL?
                </span>
                <a
                  href="mailto:xistudioww@gmail.com"
                  className="text-white hover:text-[#3BEDFF] text-[22px] md:text-[25px] font-normal transition-colors block mb-1.5"
                >
                  hello@xistudio.com
                </a>
                <p className="text-[#71717a] text-xs sm:text-[13px] font-normal">
                  Write to us directly with your brief or questions.
                </p>
              </RevealOnScroll>
              <hr className="border-t border-[#222222] my-7" />
            </div>

            {/* Phone & Location */}
            <div className="space-y-5 mb-8">
              <RevealOnScroll direction="up" delay={200}>
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] uppercase block mb-1">
                    PHONE
                  </span>
                  <a
                    href="tel:+2348165679483"
                    className="text-white hover:text-[#3BEDFF] text-sm sm:text-base font-normal transition-colors"
                  >
                    +234 816 567 9483
                  </a>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={250}>
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] uppercase block mb-1">
                    LOCATION
                  </span>
                  <p className="text-white text-sm sm:text-base font-normal">
                    Global studio based in Lagos &amp; New York
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            <hr className="border-t border-[#222222] my-2 mb-8 hidden lg:block" />

            {/* Follow The Studio */}
            <div className="mb-8 sm:mb-10">
              <RevealOnScroll direction="up" delay={300}>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] uppercase block mb-3">
                  FOLLOW THE STUDIO
                </span>
                <div className="space-y-2.5">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#222222] bg-[#141414] hover:border-[#3BEDFF]/40 text-white text-sm transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-[22px] h-[22px] shrink-0" color="#A2F6FF" />
                          <span className="font-normal text-sm">{social.name}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#71717a] group-hover:text-white transition-colors" />
                      </a>
                    )
                  })}
                </div>
              </RevealOnScroll>
            </div>

            {/* What Happens Next */}
            <div>
              <RevealOnScroll direction="up" delay={350}>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] uppercase block mb-4">
                  WHAT HAPPENS NEXT
                </span>
                <div className="space-y-3.5">
                  {STEPS.map((step) => (
                    <div key={step.number} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0d2a2e] text-[#3BEDFF] flex items-center justify-center text-[11px] font-semibold shrink-0">
                        {step.number}
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#CCCCCC] font-normal">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
