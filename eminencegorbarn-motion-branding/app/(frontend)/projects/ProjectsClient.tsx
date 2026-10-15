"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import LazyVideo from "../components/LazyVideo";
import AmbientImage from "../components/AmbientImage";
import { sanityImage } from "../lib/sanityImage";
import { SITE_CATEGORIES } from "../lib/site";

type Project = {
  _id: string;
  title: string;
  category: string;
  coverImageUrl: string;
  description: string;
  slug: string;
  tags?: string[];
  previewUrls?: string[];
  galleryUrls?: string[];
  videoUrl?: string;
  mobilePreviewUrl?: string;
};

const PROJECT_DEFAULT_TAGS: Record<string, string[]> = {
  kclautx: ['Fintech', 'Cryptocurrency', 'Digital Payments'],
  kclaut: ['Fintech', 'Cryptocurrency', 'Digital Payments'],
  'aitech-foundation': ['AI & Technology', 'Non-Profit', 'Branding'],
  brimlux: ['Energy', 'Motion Graphics', 'Visual Identity'],
  cleverfolks: ['Creative Agency', 'Culture', 'Brand Strategy'],
  gombod: ['Technology', 'Entertainment', 'Branding'],
  'kova-futures': ['Fintech', 'Digital Trading', 'Platform'],
  livmalik: ['Fashion', 'Lifestyle', 'Brand Identity'],
  mounti: ['Outdoor', 'Apparel', 'Branding'],
  onaks: ['Architecture', 'Design', 'Branding'],
  pillpal: ['HealthTech', 'Pharmaceuticals', 'Identity'],
  repmirror: ['Technology', 'Entertainment', 'Digital Experience'],
  thekclaut: ['Fintech', 'Web3', 'Branding'],
  tradigro: ['Finance', 'Commodities', 'Branding'],
  'vent-2-0': ['Token Launch', 'Web3', 'Motion Graphics'],
  wasset: ['CleanTech', 'Sustainability', 'Motion'],
  xibooster: ['Digital Growth', 'Platform', 'Motion'],
};

export function getProjectSubtitle(project: {
  title?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  description?: string;
}): string {
  // 1. If tags are set in Sanity CMS, prioritize them
  if (project.tags && project.tags.length > 0) {
    const parsed = project.tags
      .flatMap((t) => (typeof t === 'string' ? t.split(/[/,]+/) : []))
      .map((t) => t.trim())
      .filter(Boolean);
    if (parsed.length > 0) {
      return parsed.join(' / ');
    }
  }

  // 2. Intelligent defaults by project slug or title
  const slugKey = (project.slug || project.title || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
  for (const [key, tags] of Object.entries(PROJECT_DEFAULT_TAGS)) {
    if (slugKey.includes(key) || key.includes(slugKey)) {
      return tags.join(' / ');
    }
  }

  // 3. Fallback to short description if provided and not generic placeholder
  if (
    project.description &&
    project.description.trim() &&
    !project.description.includes('— Branding project') &&
    !project.description.includes('— Motion')
  ) {
    return project.description.trim();
  }

  // 4. Default fallback to category
  return project.category || '';
}

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  // Tabs are scoped to this site's categories (see lib/site.ts)
  const [activeTab, setActiveTab] = useState(SITE_CATEGORIES[0]);

  // Allow deep-linking to a tab, e.g. /projects?tab=Motion from homepage
  React.useEffect(() => {
    try {
      const tab = new URLSearchParams(window.location.search).get("tab");
      if (tab && [...SITE_CATEGORIES, "All"].includes(tab)) {
        setActiveTab(tab);
      }
    } catch {}
  }, []);

  const tabs = SITE_CATEGORIES;

  // Filter projects by active tab
  const baseFiltered = initialProjects.filter((p) => {
    if (activeTab === "All") return true;
    return p.category === activeTab;
  });

  // Motion fallback from Documents/eminence (KclautX launch video).
  // Sanity lists kclautx as Branding, so Motion gets its own entry that
  // routes to /projects/kclautx-motion (Motion layout) — boundary kept from
  // /projects/kclautx (Branding layout).
  const KCLAUTX_MOTION_FALLBACK: Project = {
    _id: 'eminence-kclautx-motion',
    title: 'KclautX',
    category: 'Motion',
    coverImageUrl: '',
    description: 'Launch video',
    slug: 'kclautx-motion',
    videoUrl: '/assets/gifs/KclautX_opt.mp4',
  };

  const filteredProjects =
    activeTab === 'Motion' && !baseFiltered.some((p) => p.slug === 'kclautx-motion')
      ? [KCLAUTX_MOTION_FALLBACK, ...baseFiltered]
      : baseFiltered;

  return (
    <div>
      <main className="min-h-[80vh] bg-background text-white pt-[160px] md:pt-[180px] pb-24 overflow-hidden relative">
        {/* Background Vector Image - Animated Path */}
        <div className="absolute right-0 lg:-right-[5%] top-[80px] md:top-[100px] lg:top-[141px] bottom-0 w-full sm:w-3/4 md:w-1/2 opacity-35 sm:opacity-45 md:opacity-55 pointer-events-none flex justify-end overflow-visible">
          <svg 
            viewBox="0 0 401 414" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-auto"
            preserveAspectRatio="xMaxYMid meet"
          >
            {/* Base Logo (Static 5% White) */}
            <path 
              d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
              fill="white" 
              fillOpacity="0.05"
            />
            {/* Animated Path (Infinite Trace) */}
            <path 
              d="M394.719 303.018C397.482 268.835 400.185 241.866 394.81 213.74C387.765 176.695 367.509 152.952 334.499 142.938C315.61 137.124 290.83 135.541 262.77 137.885C255.451 100.079 238.324 69.3659 211.448 46.232C153.749 -3.68846 69.1139 -1.43595 39.657 1.06008C39.1711 1.09052 38.8067 1.51667 38.8067 2.0037V49.8848C38.8067 50.4631 39.2925 50.8893 39.8392 50.8284C56.6023 49.0629 132.978 43.5838 179.289 83.855C196.841 99.1052 208.351 119.621 213.726 145.312C201.639 147.93 189.219 151.126 176.707 154.9C110.779 174.686 56.1164 206.586 26.8113 242.353C-3.16183 278.971 -8.20291 320.734 12.6902 360.031C32.3383 397.076 76.3414 413.148 124.626 401.033C194.412 383.622 264.774 310.811 266.718 187.41C288.37 185.553 307.107 186.405 320.196 190.362C350.503 199.616 351.171 228.442 345.401 299C342.152 338.328 338.569 374.733 348.347 413.3C348.438 413.696 348.802 414 349.228 414H399.122C399.76 414 400.155 413.391 399.942 412.782C387.673 381.095 391.227 345.025 394.719 303.049V303.018ZM182.356 302.988C163.953 328.252 138.596 346.516 112.753 353C92.3453 358.053 66.8059 356.531 56.3897 336.745C49.071 323.108 42.1168 301.801 65.0445 273.857C95.534 236.66 158.851 208.961 217.036 195.476C214.941 237.482 203.097 274.344 182.356 302.957V302.988Z" 
              stroke="#3BEDFF"
              strokeWidth="1.5"
              strokeDasharray="200, 1000"
              opacity="0.35"
              style={{
                animation: 'pathTrace 10s linear infinite',
                filter: 'drop-shadow(0 0 4px rgba(59,237,255,0.35))'
              }}
            />
          </svg>
          <style jsx>{`
            @keyframes pathTrace {
              0% { stroke-dashoffset: 1200; }
              100% { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          {/* Header Section */}
          <div className="max-w-5xl mb-16 px-2 sm:px-0">
            <h1 
              className="text-[#EEEEEE] tracking-normal mb-8 leading-[1.05]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 400 }}
            >
              Selected <span style={{ fontFamily: 'var(--font-marck)' }}>works</span> for ambitious brands.
            </h1>
            <p 
              className="text-[#a1a1aa] font-normal max-w-2xl leading-[1.6]"
              style={{ fontSize: 'clamp(17px, 2vw, 22px)' }}
            >
              Explore a selection of brand identities, motion pieces, and digital experiences created for forward thinking businesses and products.
            </p>
          </div>

          {/* Categories / Toggles - Optimized for Mobile (Single Line) */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 mt-16 w-full max-w-full overflow-x-hidden md:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-toggle-btn flex-1 md:flex-none md:min-w-[160px] px-3 py-3 md:px-6 md:py-5 text-xs sm:text-sm md:text-base transition-all duration-300 text-center border font-medium cursor-pointer hover:bg-[#3BEDFF] hover:text-[#111111] hover:border-[#3BEDFF]
                  ${
                    activeTab === tab
                      ? "bg-[#1a1a1a] text-white border-[#2a2a2a]"
                      : "bg-transparent text-[#666666] border-[#1a1a1a]"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects — Branding uses Bento 2x2, Motion uses eminence-style grid, Product uses single large hero image */}
          {activeTab === 'Motion' ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.length > 0 ? (
                [...filteredProjects]
                  .sort((a, b) => {
                    const order = ['kclautx-motion', 'vent-2-0', 'kova-futures', 'xibooster', 'brimlux', 'wasset']
                    const aIdx = order.indexOf(a.slug)
                    const bIdx = order.indexOf(b.slug)
                    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
                    if (aIdx !== -1) return -1
                    if (bIdx !== -1) return 1
                    return 0
                  })
                  .map((project) => (
                  <Link
                    key={project._id}
                    href={`/projects/${project.slug}`}
                    className="group block relative w-full aspect-[4/3] md:aspect-[605/320] overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:shadow-lightblue/5 bg-[#1a1a1a]"
                    style={{ borderRadius: '6px' }}
                  >
                    <div className="relative w-full h-full">
                      {project.videoUrl ? (
                        <LazyVideo
                          src={project.videoUrl}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : project.coverImageUrl ? (
                        <Image
                          src={sanityImage(project.coverImageUrl, 800)}
                          alt={project.title}
                          fill
                          unoptimized
                          className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center text-[#333]">No media</div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                      <div
                        className="flex flex-col justify-center absolute bottom-[22px] left-[16px] right-[16px] min-h-[66px] bg-white text-black py-2 px-5 z-20 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300"
                        style={{ borderRadius: '9.5px' }}
                      >
                        <h3 className="font-semibold text-base sm:text-lg text-black leading-tight tracking-tight">{project.title}</h3>
                        <p className="text-[11px] sm:text-[13px] text-[#555555] mt-0.5 sm:mt-1 font-normal leading-none">{getProjectSubtitle(project)}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 py-20 text-center text-[#666]">No projects found for Motion.</div>
              )}
            </div>
          ) : activeTab === 'Product' ? (
            /* Product Tab: Figma specs: desktop 1192x623, r: 12px, opacity: 0.68; mobile 350x182.93, r: 8px, opacity: 0.68 */
            <div className="mt-12 md:mt-[62px] space-y-6 md:space-y-10 flex flex-col items-center w-full">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                  const image =
                    project.coverImageUrl ||
                    (project.galleryUrls && project.galleryUrls[0]) ||
                    (project.previewUrls && project.previewUrls[0]) ||
                    '';

                  return (
                    <Link
                      key={project._id}
                      href={`/projects/${project.slug}`}
                      className="group relative block w-full max-w-[350px] md:max-w-[1192px] aspect-[350/182.93] md:aspect-[1192/623] rounded-[8px] md:rounded-[12px] opacity-[0.68] hover:opacity-100 transition-all duration-500 overflow-hidden bg-[#1a1a1a]"
                    >
                      {image ? (
                        <Image
                          src={sanityImage(image, 1800)}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 350px, 1192px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center text-[#444] text-sm">
                          {project.title}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </Link>
                  );
                })
              ) : (
                <div className="py-20 text-center text-[#666]">
                  <p>No projects found for Product.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-12 space-y-16">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                const images = (project.previewUrls && project.previewUrls.length > 0
                  ? project.previewUrls
                  : project.galleryUrls && project.galleryUrls.length > 0
                    ? project.galleryUrls
                    : project.coverImageUrl ? [project.coverImageUrl] : []
                ).filter((u: unknown): u is string => typeof u === 'string' && (u as string).trim() !== '').slice(0, 4)
                const mobileImage = project.mobilePreviewUrl && project.mobilePreviewUrl.trim() !== '' ? project.mobilePreviewUrl : images[0]
                const subtitle = getProjectSubtitle(project)
                return (
                  <div key={project._id} className="w-full">
                    <div className="mb-4 sm:mb-5">
                      <Link href={`/projects/${project.slug}`} className="hover:text-lightblue transition-colors inline-block">
                        <h3 className="text-white text-2xl sm:text-3xl font-normal tracking-tight">{project.title}</h3>
                      </Link>
                      {subtitle && <p className="text-[#a1a1aa] text-xs sm:text-sm md:text-base font-normal mt-1 tracking-normal">{subtitle}</p>}
                    </div>
                    {/* Mobile: single CMS-picked image */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group relative overflow-hidden rounded-xl h-[280px] bg-[#1a1a1a] block md:hidden"
                    >
                      {mobileImage ? (
                        <AmbientImage
                          src={sanityImage(mobileImage, 800)}
                          alt={project.title}
                        />
                      ) : (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                          <span className="text-[#333] text-xs">No image</span>
                        </div>
                      )}
                    </Link>
                    {/* Desktop: 4-image bento */}
                    <div className="hidden md:grid md:grid-cols-12 gap-[12px]">
                      {[0,1,2,3].map((i) => {
                        const url = images[i]
                        const span = i === 0 ? 'md:col-span-5' : i === 1 ? 'md:col-span-7' : i === 2 ? 'md:col-span-7' : 'md:col-span-5'
                        return (
                          <Link
                            key={i}
                            href={`/projects/${project.slug}`}
                            className={`group relative overflow-hidden rounded-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-[#1a1a1a] block ${span}`}
                          >
                            {url ? (
                              <AmbientImage
                                src={sanityImage(url, 1000)}
                                alt={`${project.title} ${i + 1}`}
                              />
                            ) : (
                              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                                <span className="text-[#333] text-xs">No image</span>
                              </div>
                            )}
                            {i === 0 && (
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <p className="text-white text-sm font-medium drop-shadow">{project.title}</p>
                              </div>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-20 text-center text-[#666]">
                <p>No projects found for {activeTab}.</p>
              </div>
            )}
          </div>
          )}
        </div>
      </main>
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
