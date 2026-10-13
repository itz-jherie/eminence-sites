'use client'
import React, { useState } from 'react'

export interface ServiceSubGroup {
  title: string
  items: string[]
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  groups?: ServiceSubGroup[]
}

export const servicesData: ServiceItem[] = [
  {
    id: "brand-identity",
    title: "Brand Identity and Strategy",
    description:
      "We shape meaningful identities rooted in clarity and intention. Every brand we build carries a strong voice, a coherent system, and a recognisable presence that earns trust.",
    groups: [
      {
        title: "Core Services",
        items: [
          "Logo and Identity Design",
          "Brand Strategy and Positioning",
          "Brand Naming and Messaging",
          "Visual Language Development",
          "Typography Systems",
          "Color Systems",
          "Brand Guidelines and Documentation",
          "Rebranding for existing companies"
        ]
      },
      {
        title: "Extended Brand Assets",
        items: [
          "Marketing Collateral",
          "Brand Templates",
          "Print and Packaging",
          "Social Media Identity Kits",
          "Pitch Deck Design",
          "Brand Audit and Evaluation"
        ]
      }
    ]
  },
  {
    id: "motion",
    title: "Motion and Visual Experience",
    description:
      "We craft kinetic design systems and immersive visual languages that bring products, campaigns, and identities dynamically to life.",
    groups: [
      {
        title: "Core Motion",
        items: [
          "2D & 3D Motion Graphics",
          "Kinetic Typography & Title Design",
          "Brand Motion Guidelines & Behaviors",
          "Logo & Symbol Animation",
          "UI Interaction & Micro-animations",
          "Product & Feature Teaser Videos"
        ]
      },
      {
        title: "Production & Direction",
        items: [
          "Art Direction & Storyboarding",
          "Creative Editorial & Film Editing",
          "Sound Design & Audio Direction",
          "Visual Effects (VFX) & Compositing",
          "Social & Campaign Motion Kits",
          "Broadcast & Digital Deliverables"
        ]
      }
    ]
  },
  {
    id: "digital-product",
    title: "Digital Product and Interface Design",
    description:
      "Designing intuitive web and mobile applications with obsessive attention to user experience, hierarchy, and interaction fidelity.",
    groups: [
      {
        title: "Strategy & Architecture",
        items: [
          "User Research & Journey Mapping",
          "Information Architecture & Flow",
          "Wireframing & Rapid Prototyping",
          "Usability Audits & Heuristic Reviews",
          "Product Strategy & Feature Scoping",
          "Multi-Platform UX Frameworks"
        ]
      },
      {
        title: "UI & System Design",
        items: [
          "Mobile App UI Design (iOS & Android)",
          "Web Application & SaaS Interfaces",
          "Design Systems & Component Tokens",
          "Interactive High-Fidelity Prototypes",
          "Micro-interactions & Haptic States",
          "Developer Handoff & Technical Specs"
        ]
      }
    ]
  },
  {
    id: "website-design",
    title: "Website Design and Experience",
    description:
      "Modern, high-performance web experiences engineered to tell compelling stories and convert engagement into impact.",
    groups: [
      {
        title: "Creative & Experience",
        items: [
          "Bespoke Agency & Marketing Websites",
          "Interactive Microsites & Experiences",
          "Creative Direction & Art Concepting",
          "Content Hierarchy & Typography",
          "Conversion-Driven Landing Pages",
          "Editorial & Storytelling Layouts"
        ]
      },
      {
        title: "Technical & Implementation",
        items: [
          "Modern Frontend Architecture (Next.js/React)",
          "Headless CMS Integration (Sanity)",
          "Smooth Scrolling & Canvas Animations",
          "Technical SEO & Web Vitals Tuning",
          "Responsive & Cross-Browser Precision",
          "Performance & Accessibility Optimization"
        ]
      }
    ]
  },
  {
    id: "3d-design",
    title: "Three Dimensional Design",
    description:
      "High-fidelity 3D rendering, spatial environments, and product modeling that push visual boundaries.",
    groups: [
      {
        title: "Modeling & Visualization",
        items: [
          "Photorealistic Product Rendering",
          "Hard-Surface & Industrial Modeling",
          "Lighting, Shading & Texturing",
          "Spatial Environments & Set Design",
          "Conceptual Key Visuals for Campaigns",
          "Abstract & Kinetic Visual Art"
        ]
      },
      {
        title: "Real-Time & Interactive",
        items: [
          "WebGL & 3D Interactive Web Assets",
          "Procedural Material & Texture Creation",
          "Real-Time Engine Optimization",
          "Physics & Particle Simulations",
          "High-Resolution Print Assets",
          "AR / Spatial Explorations"
        ]
      }
    ]
  },
  {
    id: "creative-consulting",
    title: "Creative Consulting",
    description:
      "Strategic advisory partnering with founders and creative leaders to define vision, position brands, and guide creative execution.",
    groups: [
      {
        title: "Strategic Advisory",
        items: [
          "Brand & Creative Quality Audits",
          "Executive Creative Direction",
          "Brand Repositioning Advisory",
          "Creative Strategy & Vision Workshops",
          "Pitch & Investor Deck Consultation",
          "Studio & Team Workflow Optimization"
        ]
      },
      {
        title: "Creative Stewardship",
        items: [
          "Creative Direction & Art Oversight",
          "Vendor & Production Team Sourcing",
          "Brand Governance & Guidelines Rollout",
          "Campaign Concepting & Ideation",
          "Cross-Discipline Creative Alignment",
          "Long-Term Design Stewardship"
        ]
      }
    ]
  }
]

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const activeService = openIndex !== null ? servicesData[openIndex] : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full relative">
      {/* Left Column: Accordion List */}
      <div className="lg:col-span-6 flex flex-col border-t border-[#2A2A2A] w-full max-w-[480px] md:max-w-[540px]">
        {servicesData.map((service, index) => {
          const isOpen = openIndex === index
          return (
            <div key={service.id} className="w-full border-b border-[#2A2A2A]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center py-5 text-left group transition-colors"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-[15px] md:text-[16px] font-normal tracking-wide transition-colors duration-300 ${
                    isOpen
                      ? 'text-[#3BEDFF]'
                      : 'text-[#d4d4d8] group-hover:text-white'
                  }`}
                >
                  {service.title}
                </span>
                <svg
                  className={`w-[18px] h-[18px] transition-all duration-300 ease-in-out shrink-0 ml-4 ${
                    isOpen
                      ? 'rotate-180 text-[#3BEDFF]'
                      : 'text-[#666] group-hover:text-white'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-[800px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[#a1a1aa] text-[14px] sm:text-[15px] leading-relaxed">
                  {service.description}
                </p>

                {/* Mobile-only view of sub-menu items */}
                {service.groups && service.groups.length > 0 && (
                  <div className="lg:hidden mt-6 pt-6 border-t border-[#222222] flex flex-col gap-6">
                    {service.groups.map((group, gIdx) => (
                      <div key={gIdx} className="flex flex-col">
                        <h4 className="text-white text-[14px] font-semibold tracking-wide mb-3">
                          {group.title}
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {group.items.map((item, iIdx) => (
                            <li
                              key={iIdx}
                              className="text-[#999999] text-[13px] font-normal leading-relaxed"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right Column: Desktop Sub-Menu panel on click */}
      <div className="hidden lg:block lg:col-span-6 relative min-h-[380px] pl-0 lg:pl-10 xl:pl-16">
        {activeService && activeService.groups && activeService.groups.length > 0 ? (
          <div
            key={activeService.id}
            className="flex flex-col gap-8 md:gap-10 transition-all duration-500 animate-in fade-in"
          >
            {activeService.groups.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col">
                <h3 className="text-white text-[15px] md:text-[16px] font-medium tracking-wide mb-3.5">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="text-[#999999] text-[14px] md:text-[15px] font-normal leading-relaxed hover:text-white transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-start opacity-0 pointer-events-none" />
        )}
      </div>
    </div>
  )
}
