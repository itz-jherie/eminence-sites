import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ServicesAccordion from "./ServicesAccordion";
import AboutCTASection from "./AboutCTASection";
import RevealOnScroll from "../components/RevealOnScroll";
import PartnerMarquee from "../components/PartnerMarquee";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";

export const metadata: Metadata = {
  title: "Studio — About Xi Studio",
  description:
    "We are a holistic design partner combining strategic brand identity, kinetic motion systems, digital product engineering, and 3D visual craft into a unified studio.",
  keywords: [
    "About Xi Studio",
    "Xi Studio Team",
    "Creative Studio",
    "Brand Strategy Agency",
    "Motion Design Practice",
    "Digital Experience Studio",
    "Creative Consulting",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "Studio — About Xi Studio",
    description:
      "We are a holistic design partner combining strategic brand identity, kinetic motion systems, digital product engineering, and 3D visual craft into a unified studio.",
    url: `${siteUrl}/about`,
    siteName: "Xi Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: "The Xi Studio Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio — About Xi Studio",
    description:
      "We are a holistic design partner combining strategic brand identity, kinetic motion systems, digital product engineering, and 3D visual craft into a unified studio.",
    images: [`${siteUrl}/assets/about-team.webp`],
  },
};

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  order?: number;
}

const FALLBACK_TEAM: TeamMember[] = [
  { _id: '1', name: 'Rachel Oriowo', role: 'Lead Strategist', imageUrl: '/assets/team-placeholder.webp' },
  { _id: '2', name: 'Adesogan "Eminence" Oluwanimifise', role: 'Lead Strategist', imageUrl: '/assets/team-placeholder.webp' },
  { _id: '3', name: 'Daniel', role: 'Lead Strategist', imageUrl: '/assets/team-placeholder.webp' },
  { _id: '4', name: 'Sam', role: 'Lead Strategist', imageUrl: '/assets/team-placeholder.webp' },
  { _id: '5', name: 'Faymous', role: 'Lead Strategist', imageUrl: '/assets/team-placeholder.webp' },
  { _id: '6', name: 'Jerry', role: 'Lead Strategist', imageUrl: '/assets/team-placeholder.webp' },
];

async function getTeamMembers(): Promise<TeamMember[]> {
  const QUERY = encodeURIComponent(
    '*[_type == "teamMember"] | order(orderRank asc, order asc, _createdAt asc) { _id, name, role, "imageUrl": image.asset->url, order }'
  );
  
  try {
    const res = await fetch(
      `https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${QUERY}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    if (Array.isArray(data?.result) && data.result.length > 0) {
      return data.result;
    }
    return FALLBACK_TEAM;
  } catch {
    return FALLBACK_TEAM;
  }
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div>
      <main className="min-h-screen bg-[#111111] text-white pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "Studio — About Xi Studio",
              description:
                "We are a holistic design partner combining strategic brand identity, kinetic motion systems, digital product engineering, and 3D visual craft into a unified studio.",
              url: `${siteUrl}/about`,
              mainEntity: {
                "@type": "Organization",
                name: "Xi Studio",
                url: siteUrl,
                description: "Holistic design partner for forward-thinking brands.",
                knowsAbout: [
                  "Brand Identity and Strategy",
                  "Motion and Visual Experience",
                  "Digital Product and Interface Design",
                  "Website Design and Experience",
                  "Three Dimensional Design",
                  "Creative Consulting",
                ],
              },
            }),
          }}
        />
        {/* Background Vector Image (xi logo) */}
        <div className="absolute right-0 top-[80px] md:top-[100px] lg:top-[141px] w-full sm:w-3/4 md:w-1/2 h-[400px] md:h-[600px] lg:h-[700px] opacity-35 sm:opacity-45 md:opacity-55 pointer-events-none z-0">
          <Image
            src="/assets/vectornew.svg"
            alt=""
            fill
            className="object-contain object-right scale-100"
            priority
          />
        </div>

        <div className="max-w-[1440px] w-full mx-auto relative z-10 px-0 lg:px-4">
          {/* Authentic Offset Header Architecture */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full mt-4 md:mt-8 lg:mt-[52px] mb-8 md:mb-12 gap-8 lg:gap-16">
            {/* Left Title */}
            <div className="flex-shrink-0">
              <RevealOnScroll direction="up" delay={100} duration={1200}>
                <h1 
                  className="font-normal tracking-tight text-[#EEEEEE]"
                  style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: '1.1' }}
                >
                  Hello, <br />
                  Nice to meet you!
                </h1>
              </RevealOnScroll>
            </div>

            {/* Description Typography */}
            <div className="w-full lg:max-w-[560px] xl:max-w-[620px]">
              <RevealOnScroll direction="up" delay={250} duration={1200}>
                <div className="space-y-4 sm:space-y-5 text-[#CCCCCC] text-[15px] sm:text-[16px] md:text-[17px] font-normal leading-[1.65] tracking-normal">
                  <p>
                    XiStudio started with a simple idea: we wanted to make really good design, and build a place where we could do it our way.
                  </p>
                  <p>
                    Today, we work with ambitious brands to figure things out, make things clearer, and turn ideas into identities, products and experiences people remember.
                  </p>
                  <p>
                    We are a small team, which means we stay close to the work. We think together, challenge each other, obsess over details, and care about what finally gets put out into the world.
                  </p>
                  <p>
                    That’s XiStudio. Just good people, doing work we genuinely care about.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Massive Team Image */}
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] lg:h-[680px] mt-2 sm:mt-4 md:mt-6 rounded-xl overflow-hidden border border-[#222]">
            <Image
              src="/assets/about-team.webp"
              alt="The XiStudio Team"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Positive Impact Marquee Section */}
          <div className="mt-10 md:mt-16 lg:mt-20 w-full flex flex-col gap-6 md:gap-8">
            {/* Header Lock */}
            <div className="flex flex-col gap-4 max-w-3xl">
              <RevealOnScroll direction="up" delay={100} duration={1000}>
                <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-normal tracking-tight text-[#EEEEEE] leading-tight">
                  Positive impact through motion
                </h2>
              </RevealOnScroll>
              <RevealOnScroll direction="up" delay={250} duration={1200}>
                <p className="text-[#a1a1aa] text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mt-1 md:mt-2">
                  Our studio and team are passionate about having a positive impact on the world through the work we do and the causes we support.
                </p>
              </RevealOnScroll>
            </div>
            
            {/* Infinite Right-to-Left Hardware Marquee Engine */}
            <PartnerMarquee />
          </div>

          {/* 1. What We Believe Section */}
          <div className="mt-14 md:mt-20 lg:mt-24 w-full relative z-10">
            {/* Watermark loop curve on the left (Figma spec: 569x591px, angle 0 deg) */}
            <div className="absolute -left-16 sm:-left-24 lg:-left-32 -top-16 sm:-top-24 lg:-top-32 w-[340px] sm:w-[440px] lg:w-[569px] h-[353px] sm:h-[457px] lg:h-[591px] pointer-events-none select-none z-0">
              <svg 
                viewBox="0 0 401 414" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain"
              >
                <path 
                  d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
                  fill="#FFFFFF0D"
                />
              </svg>
            </div>

            {/* Content positioned on the right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              <div className="hidden lg:block lg:col-span-5" />
              <div className="lg:col-span-7 flex flex-col pl-0 lg:pl-8">
                <RevealOnScroll direction="up" delay={100}>
                  <h2 
                    className="font-normal text-[#3BEDFF] tracking-tight mb-8 md:mb-10"
                    style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', lineHeight: '1.15' }}
                  >
                    What We Believe
                  </h2>
                </RevealOnScroll>
                <ol className="flex flex-col gap-[14px] md:gap-[18px] text-[15px] sm:text-[16px] md:text-[17px] text-[#d4d4d8] leading-relaxed tracking-normal list-decimal list-inside lg:list-outside lg:ml-5">
                  {[
                    "Design is more than visuals it is a business tool.",
                    "Every brand has a story worth shaping.",
                    "Motion brings emotion and meaning to identity.",
                    "Products must be simple intuitive and human.",
                    "Great work comes from listening learning and collaborating."
                  ].map((belief, idx) => (
                    <RevealOnScroll key={idx} direction="up" delay={150 + (idx * 80)}>
                      <li className="pl-1 md:pl-2">{belief}</li>
                    </RevealOnScroll>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* 2. Services Section */}
          <div className="mt-32 md:mt-48 lg:mt-56 w-full relative z-10 pb-12 md:pb-16">
            {/* Services Heading */}
            <div className="w-full mb-8 md:mb-10">
              <RevealOnScroll direction="up" delay={100}>
                <h2 
                  className="font-normal text-[#EEEEEE] tracking-tight"
                  style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', lineHeight: '1.15' }}
                >
                  Services
                </h2>
              </RevealOnScroll>
            </div>

            {/* Services Interactive Accordion & Right Sub-menu */}
            <div className="w-full relative z-10">
              <RevealOnScroll direction="up" delay={200}>
                <ServicesAccordion />
              </RevealOnScroll>
            </div>
          </div>

          {/* 3. Team Section — 3 Columns matching Figma Mockup */}
          <div className="mt-20 md:mt-32 lg:mt-36 w-full relative z-10 pb-20 md:pb-28">
            {/* Watermark loop curve in background on the right */}
            <div className="absolute -right-16 sm:-right-24 lg:-right-28 top-8 md:top-4 w-[340px] sm:w-[460px] lg:w-[620px] h-[350px] sm:h-[480px] lg:h-[640px] pointer-events-none select-none z-0">
              <svg 
                viewBox="0 0 401 414" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain opacity-70"
              >
                <path 
                  d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
                  fill="#FFFFFF0D"
                />
              </svg>
            </div>

            {/* Section Title */}
            <div className="w-full mb-6 sm:mb-8 md:mb-12 relative z-10">
              <RevealOnScroll direction="up" delay={80}>
                <h2 
                  className="font-normal text-[#EEEEEE] tracking-tight text-[28px] sm:text-[36px] md:text-[44px] leading-tight"
                >
                  The team
                </h2>
              </RevealOnScroll>
            </div>

            {/* Team Grid (2 columns on mobile, 2 columns on tablet, 3 columns on desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3.5 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12 relative z-10">
              {teamMembers.map((member, idx) => (
                <RevealOnScroll key={member._id || idx} direction="up" delay={80 + (idx % 3) * 80}>
                  <div className="group flex flex-col">
                    {/* Square Image Card */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10 mb-2.5 sm:mb-3.5 shadow-md">
                      <Image
                        unoptimized
                        src={member.imageUrl || '/assets/team-placeholder.webp'}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Name */}
                    <h3 className="text-white text-[13px] sm:text-[15px] md:text-[17px] font-medium tracking-tight mb-0.5 sm:mb-1 leading-snug">
                      {member.name}
                    </h3>
                    {/* Role */}
                    <p className="text-white/60 text-[11px] sm:text-[13px] md:text-[14px] font-normal tracking-normal leading-normal">
                      {member.role}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* New Dedicated About Page CTA Section */}
      <AboutCTASection />
    </div>
  );
}
