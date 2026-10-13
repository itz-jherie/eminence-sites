import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RevealOnScroll from '../../components/RevealOnScroll'
import ProjectWriteup from '../../components/ProjectWriteup'
import { sanityImage } from '../../lib/sanityImage'
import ProjectHeroMedia from '../../components/ProjectHeroMedia'
import ProjectVideoShowcase from '../../components/ProjectVideoShowcase'
import LazyVideo from '../../components/LazyVideo'
import { SITE_CATEGORIES, SITE_VISIBILITY_FIELD } from '../../lib/site'

async function getProject(slug: string) {
  const QUERY = encodeURIComponent(`
    {
      "project": *[_type == "project" && slug.current == "${slug}"][0]{
        _id, title, category, tags, description,
        tagline, sector, country, year, scope, coreIdea,
        showOnMotionSite, showOnBrandingSite, showOnProductSite, showOnCombinedSite,
        "videoUrl": video.asset->url,
        "fullVideoUrl": fullVideo.asset->url,
        "coverImageUrl": coalesce(gallery[isCover == true][0].asset->url, previewGrid[isCover == true][0].asset->url, coverImage.asset->url),
        "coverImageAssetId": coalesce(gallery[isCover == true][0].asset->_id, previewGrid[isCover == true][0].asset->_id, coverImage.asset->_id),
        "gallery": gallery[]{
          "url": asset->url,
          "assetId": asset->_id,
          "filename": asset->originalFilename,
          "aspectRatio": asset->metadata.dimensions.aspectRatio,
          isCover,
          isHidden
        },
        "galleryUrls": gallery[isHidden != true].asset->url,
        body
      },
      "allProjects": *[_type == "project"] | order(_createdAt desc) {
        title, "slug": slug.current, category,
        showOnMotionSite, showOnBrandingSite, showOnProductSite, showOnCombinedSite,
        "coverImageUrl": coverImage.asset->url,
        "videoUrl": video.asset->url
      }
    }
  `);
  
  try {
    const res = await fetch(`https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${QUERY}`, { cache: 'no-store' });
    const data = await res.json();
    // Boundary: /projects/kclautx stays Branding (Sanity gallery), while
    // /projects/kclautx-motion is a synthetic Motion entry (launch video only).
    if (slug === 'kclautx-motion') {
      const allProjects = data?.result?.allProjects || [];
      return {
        project: {
          _id: 'eminence-kclautx-motion',
          title: 'KclautX',
          category: 'Motion',
          tags: ['Motion Graphics', 'Launch Video'],
          description: 'Launch video',
          tagline: null,
          sector: null,
          country: null,
          year: null,
          scope: ['Motion design'],
          coreIdea: null,
          videoUrl: '/assets/gifs/KclautX_opt.mp4',
          fullVideoUrl: '/assets/gifs/KclautX_opt.mp4',
          coverImageUrl: null,
          coverImageAssetId: null,
          gallery: [],
          galleryUrls: [],
          body: null,
        },
        allProjects,
      };
    }
    // Local fallback: Sanity has no Motion video for kclautx yet —
    // serve the eminence launch-video mp4 through the same videoUrl pipeline
    // as every other project's Showcase Video / Preview Clip field.
    if (data?.result?.project && slug === 'kclautx' && !data.result.project.videoUrl) {
      data.result.project.videoUrl = '/assets/gifs/KclautX_opt.mp4';
    }
    return data.result;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);

  if (!data || !data.project) {
    return {
      title: "Project",
    };
  }

  const { project } = data;
  const title = project.title;
  const description =
    project.tagline ||
    project.description ||
    `Explore ${project.title} — an ambitious case study by Xi Studio featuring brand identity, digital design, and motion architecture.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";

  // Use custom OG image if uploaded in Sanity, else project cover image cropped to 1200x630, else site banner
  const shareImageUrl = project.ogImageUrl
    ? sanityImage(project.ogImageUrl, 1200, 630)
    : (project.coverImageUrl
        ? sanityImage(project.coverImageUrl, 1200, 630)
        : `${siteUrl}/assets/about-team.webp`);

  return {
    title,
    description,
    keywords: [
      project.title,
      `${project.title} Xi Studio`,
      `${project.title} Case Study`,
      project.category,
      `${project.category} Design`,
      project.sector,
      ...(project.tags || []),
      "Xi Studio Portfolio",
      "Selected Work",
      "Brand Identity Case Study",
      "Digital Product Design",
      "Kinetic Motion Design",
      "Creative Technology",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
    openGraph: {
      title: `${title} | Xi Studio`,
      description,
      type: "article",
      url: `${siteUrl}/projects/${slug}`,
      siteName: "Xi Studio",
      locale: "en_US",
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — Xi Studio Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Xi Studio`,
      description,
      images: [shareImageUrl],
      creator: "@xistudio",
      site: "@xistudio",
    },
  };
}

export async function generateStaticParams() {
  const QUERY = encodeURIComponent('*[_type == "project"]{ "slug": slug.current }');
  try {
    const res = await fetch(
      `https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${QUERY}`
    );
    const data = await res.json();
    const slugs = (data.result || [])
      .filter((p: { slug?: string }) => Boolean(p.slug))
      .map((p: { slug: string }) => ({ slug: p.slug }));
    // Include synthetic Motion entry (not in Sanity)
    if (!slugs.some((p: { slug: string }) => p.slug === 'kclautx-motion')) {
      slugs.push({ slug: 'kclautx-motion' });
    }
    return slugs;
  } catch {
    return [];
  }
}

type GalleryItem = {
  url: string;
  assetId?: string;
  filename?: string | null;
  aspectRatio?: number;
  isCover?: boolean | null;
  isHidden?: boolean | null;
};

type GalleryRow = {
  type: 'single' | 'row';
  items: GalleryItem[];
};

type NavProject = {
  slug: string;
  title: string;
  coverImageUrl?: string | null;
  videoUrl?: string | null;
};

function NavigatorPreview({ project }: { project: NavProject }) {
  if (project.videoUrl) {
    return (
      <LazyVideo
        src={project.videoUrl}
        poster={project.coverImageUrl ? sanityImage(project.coverImageUrl, 800) : undefined}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  if (project.coverImageUrl) {
    return (
      <Image
        unoptimized
        src={sanityImage(project.coverImageUrl, 800)}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
      <span className="text-[#333] text-xs">No preview</span>
    </div>
  );
}

function parseImageKey(filename?: string | null) {
  if (!filename) return null;
  const name = filename.replace(/\.[^/.]+$/, '').trim();
  
  // Digit followed by letter suffix (e.g. '3a', '5b', 'Page 10b', '31b')
  const letterMatch = name.match(/^(.*?\d+)\s*[-_]?\s*([a-zA-Z])$/);
  if (letterMatch) {
    return {
      base: letterMatch[1].trim().toLowerCase(),
      suffix: letterMatch[2].toLowerCase(),
    };
  }
  
  // Name ending in digits (e.g. '3', 'Page 10', '31')
  const baseMatch = name.match(/^(.*?\d+)$/);
  if (baseMatch) {
    return {
      base: baseMatch[1].trim().toLowerCase(),
      suffix: '',
    };
  }

  return {
    base: name.toLowerCase(),
    suffix: '',
  };
}

function groupGalleryImages(rawItems?: unknown[]): GalleryRow[] {
  if (!rawItems || rawItems.length === 0) return [];
  
  const items: GalleryItem[] = rawItems
    .map((item) => {
      if (typeof item === 'string') {
        return { url: item };
      }
      if (item && typeof item === 'object' && 'url' in item && typeof (item as GalleryItem).url === 'string') {
        return item as GalleryItem;
      }
      return null;
    })
    .filter((item): item is GalleryItem => !!item && item.url.trim() !== '');

  const rows: GalleryRow[] = [];
  let i = 0;
  
  // Specific image asset hashes forced to render as full-width standalone rows
  const FORCE_STANDALONE_HASHES = [
    'eeb928c8f76071a21b5c2446ca49528aacff0235',
  ];

  while (i < items.length) {
    const current = items[i];
    const isCurrentStandalone = FORCE_STANDALONE_HASHES.some((h) => current.url.includes(h));
    const currentParsed = isCurrentStandalone ? null : parseImageKey(current.filename);
    
    if (!isCurrentStandalone && i + 1 < items.length) {
      const next = items[i + 1];
      const isNextStandalone = FORCE_STANDALONE_HASHES.some((h) => next.url.includes(h));
      const nextParsed = isNextStandalone ? null : parseImageKey(next.filename);
      
      const isPair = !!(
        currentParsed &&
        nextParsed &&
        currentParsed.base === nextParsed.base &&
        (
          (currentParsed.suffix === 'a' && nextParsed.suffix === 'b') ||
          (currentParsed.suffix === '' && nextParsed.suffix === 'b') ||
          (currentParsed.suffix === 'b' && nextParsed.suffix === '') ||
          (currentParsed.suffix === 'a' && nextParsed.suffix === '') ||
          (currentParsed.suffix && nextParsed.suffix && currentParsed.suffix !== nextParsed.suffix)
        )
      );

      if (isPair) {
        if (i + 2 < items.length) {
          const third = items[i + 2];
          const thirdParsed = parseImageKey(third.filename);
          if (thirdParsed && thirdParsed.base === currentParsed.base && thirdParsed.suffix === 'c') {
            rows.push({ type: 'row', items: [current, next, third] });
            i += 3;
            continue;
          }
        }
        rows.push({ type: 'row', items: [current, next] });
        i += 2;
        continue;
      }
    }
    
    rows.push({ type: 'single', items: [current] });
    i += 1;
  }
  
  return rows;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProject(slug);
  
  if (!data || !data.project) {
    return notFound();
  }

  const { project, allProjects } = data;

  // Site gate: block projects outside this site's categories or hidden
  // in the Studio via the per-site visibility toggle.
  if (!SITE_CATEGORIES.includes(project.category)) {
    return notFound();
  }
  if (project[SITE_VISIBILITY_FIELD] === false) {
    return notFound();
  }

  // Navigator stays inside this site's visible catalogue
  type ScopedProject = {
    slug: string;
    title: string;
    category: string;
    coverImageUrl?: string | null;
    videoUrl?: string | null;
    [key: string]: unknown;
  };
  const scopedProjects = (allProjects as ScopedProject[]).filter(
    (p) =>
      SITE_CATEGORIES.includes(p.category) &&
      p[SITE_VISIBILITY_FIELD] !== false,
  );

  // Cyclical Pagination Algorithm
  const currentIndex = scopedProjects.findIndex((p: { slug: string; title: string }) => p.slug === slug);
  const nextProject = currentIndex >= 0 && currentIndex < scopedProjects.length - 1
    ? scopedProjects[currentIndex + 1]
    : scopedProjects[0];
  const prevProject = currentIndex > 0
    ? scopedProjects[currentIndex - 1]
    : scopedProjects[scopedProjects.length - 1];
  const followingProject = scopedProjects.length > 0
    ? scopedProjects[(currentIndex + 2) % scopedProjects.length]
    : null;

  const isMotion = project.category === 'Motion';

  // Exclude the image used as the cover so it does not repetitively appear below in the gallery
  const rawGallery: (GalleryItem | string)[] = (project.gallery && project.gallery.length > 0 ? project.gallery : project.galleryUrls) || [];
  const cleanHash = (url?: string | null) => (url ? url.split('?')[0].split('/').pop() : '');
  const coverHash = cleanHash(project.coverImageUrl);

  const galleryWithoutCover = rawGallery.filter((item) => {
    if (!item) return false;
    const url = typeof item === 'string' ? item : item.url;
    if (!url) return false;
    if (typeof item === 'object') {
      if (item.isHidden) return false;
      if (item.isCover) return false;
      if (project.coverImageAssetId && item.assetId && item.assetId === project.coverImageAssetId) return false;
    }
    if (project.coverImageUrl && url === project.coverImageUrl) return false;
    if (coverHash && cleanHash(url) === coverHash) return false;
    return true;
  });

  // Group gallery images by base filename and suffix (e.g. 5a & 5b, 10 & 10b side by side)
  const galleryRows = groupGalleryImages(galleryWithoutCover);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline || project.title,
    description: project.description || project.tagline,
    image: project.coverImageUrl ? sanityImage(project.coverImageUrl, 1600) : undefined,
    genre: project.category,
    keywords: project.tags?.join(", "),
    creator: {
      "@type": "Organization",
      name: "Xi Studio",
      url: siteUrl,
    },
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Cover Media — hidden for Motion (title + video only) */}
      {!isMotion && (
        <ProjectHeroMedia
          title={project.title}
          coverImageUrl={project.coverImageUrl}
          videoUrl={project.videoUrl}
          fullVideoUrl={project.fullVideoUrl}
        />
      )}

      {/* 2. Main Content Grid — Sticky Sidebar + Title/Description/Writeup */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-10 md:pb-16 relative z-10 ${isMotion ? 'pt-[160px] md:pt-[180px]' : 'pt-10 md:pt-16 -mt-16 md:-mt-24'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Sticky Sidebar */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-32 border-t border-white/20 pt-5">
              <RevealOnScroll direction="up" delay={200}>
                {(() => {
                  const sectorItems = (
                    project.sector
                      ? project.sector.split(/[/,]+/).map((s: string) => s.trim()).filter(Boolean)
                      : (project.tags && project.tags.length > 0
                          ? project.tags.flatMap((t: string) => (typeof t === 'string' ? t.split(/[/,]+/) : [])).map((s: string) => s.trim()).filter(Boolean)
                          : [isMotion ? 'Motion Design' : 'Branding'])
                  );

                  const sectorBlock = (
                    <div className="mb-6">
                      <h3 className="text-white/50 text-xs tracking-widest uppercase mb-2 font-semibold">Sector</h3>
                      <div className="flex flex-col gap-1.5">
                        {sectorItems.map((sectorItem: string, i: number) => (
                          <span key={i} className="text-[#EEEEEE] text-base md:text-lg">
                            {sectorItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  );

                  const countryBlock = project.country ? (
                    <div className="mb-6">
                      <h3 className="text-white/50 text-xs tracking-widest uppercase mb-1 font-semibold">Country</h3>
                      <p className="text-[#EEEEEE] text-base md:text-lg">{project.country}</p>
                    </div>
                  ) : null;

                  const yearBlock = project.year ? (
                    <div className="mb-6">
                      <h3 className="text-white/50 text-xs tracking-widest uppercase mb-1 font-semibold">Year</h3>
                      <p className="text-[#EEEEEE] text-base md:text-lg">{project.year}</p>
                    </div>
                  ) : null;

                  const scopeBlock = project.scope && project.scope.length > 0 ? (
                    <div className="mb-6">
                      <h3 className="text-white/50 text-xs tracking-widest uppercase mb-2 font-semibold">Scope of Work</h3>
                      <div className="flex flex-col gap-1.5">
                        {project.scope.map((item: string, i: number) => (
                          <span key={i} className="text-[#c4c4cc] text-sm md:text-base capitalize">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null;

                  const categoryBlock = (
                    <div>
                      <h3 className="text-white/50 text-xs tracking-widest uppercase mb-1 font-semibold">Category</h3>
                      <p className="text-[#3BEDFF] text-base md:text-lg">{project.category}</p>
                    </div>
                  );

                  return (
                    <>
                      {/* Mobile (< md): 2 columns (Sector + Scope on left, Country + Year + Category on right) */}
                      <div className="grid grid-cols-2 gap-x-6 md:hidden">
                        <div>
                          {sectorBlock}
                          {scopeBlock}
                        </div>
                        <div>
                          {countryBlock}
                          {yearBlock}
                          {categoryBlock}
                        </div>
                      </div>

                      {/* Desktop (>= md): 1 column sticky sidebar */}
                      <div className="hidden md:block">
                        {sectorBlock}
                        {countryBlock}
                        {yearBlock}
                        {scopeBlock}
                        {categoryBlock}
                      </div>
                    </>
                  );
                })()}
              </RevealOnScroll>
            </div>
          </div>
          
          {/* Right Column — Title + Tagline + Description + Core Idea + Blog Body */}
          <div className="md:col-span-3">
            {/* Title */}
            <RevealOnScroll direction="up" delay={100}>
              <h1 
                className="text-white font-normal mb-3 tracking-normal"
                style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: '105%' }}
              >
                {project.title}
              </h1>
            </RevealOnScroll>

            {/* Tagline / Headline */}
            {project.tagline && (
              <RevealOnScroll direction="up" delay={150}>
                <p className="text-[#3BEDFF] font-medium tracking-normal mb-6 text-lg sm:text-xl md:text-2xl">
                  {project.tagline}
                </p>
              </RevealOnScroll>
            )}
            
            {/* Writeup with Truncation (First paragraph + Read more) */}
            <RevealOnScroll direction="up" delay={200}>
              <ProjectWriteup
                description={project.description}
                tagline={project.tagline}
                coreIdea={project.coreIdea}
                body={project.body}
              />
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* 3. Motion Video Showcase (if video exists) */}
      {isMotion && (project.fullVideoUrl || project.videoUrl) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16">
          <ProjectVideoShowcase
            title={project.title}
            videoUrl={project.videoUrl || project.fullVideoUrl}
            fullVideoUrl={project.fullVideoUrl || project.videoUrl}
            posterUrl={project.coverImageUrl}
          />
        </div>
      )}

      {/* 4. Gallery: Images & Animated GIFs (for both Branding and Motion) */}
      {galleryRows.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 md:pb-24">
          <div className="flex flex-col gap-[8px]">
            {galleryRows.map((row, rowIndex) => {
              if (row.type === 'single') {
                const item = row.items[0];
                return (
                  <div key={rowIndex} className="w-full overflow-hidden rounded-[12px] bg-[#1a1a1a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sanityImage(item.url, 2000)}
                      alt={`${project.title} gallery image ${rowIndex + 1}`}
                      className="w-full h-auto block rounded-[12px]"
                      loading={rowIndex < 2 ? "eager" : "lazy"}
                    />
                  </div>
                );
              }

              // Side-by-side row with exact 8px gap between images
              return (
                <div key={rowIndex} className="flex flex-row gap-[8px] w-full items-stretch">
                  {row.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="overflow-hidden rounded-[12px] bg-[#1a1a1a] min-w-0"
                      style={item.aspectRatio ? { flex: item.aspectRatio } : { flex: 1 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sanityImage(item.url, 1600)}
                        alt={`${project.title} gallery image ${rowIndex + 1}-${itemIndex + 1}`}
                        className="w-full h-auto block rounded-[12px]"
                        loading={rowIndex < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Project Navigator — Previous / Next / More on one line */}
      <div className="border-t border-white/10 mt-6 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
            {prevProject && prevProject.slug !== slug ? (
              <Link href={`/projects/${prevProject.slug}`} className="block group">
                <div className="p-4 md:p-6 flex flex-col gap-3 transition-colors duration-500 hover:bg-white/5 cursor-pointer h-full">
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#1a1a1a]">
                    <NavigatorPreview project={prevProject} />
                  </div>
                  <p className="text-white/50 text-[10px] md:text-xs tracking-widest uppercase font-semibold transition-colors group-hover:text-white/80">Previous Project</p>
                  <h2
                    className="text-white font-normal tracking-normal group-hover:text-[#3BEDFF] transition-all duration-500 break-words"
                    style={{ fontSize: 'clamp(16px, 2vw, 26px)', lineHeight: '110%' }}
                  >
                    {prevProject.title}
                  </h2>
                  <div className="mt-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#3BEDFF] group-hover:border-[#3BEDFF] transition-all duration-500">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#111111] transition-all duration-500 ease-out transform rotate-135 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ) : <div />}
            {nextProject && nextProject.slug !== slug ? (
              <Link href={`/projects/${nextProject.slug}`} className="block group">
                <div className="p-4 md:p-6 flex flex-col gap-3 transition-colors duration-500 hover:bg-white/5 cursor-pointer h-full">
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#1a1a1a]">
                    <NavigatorPreview project={nextProject} />
                  </div>
                  <p className="text-white/50 text-[10px] md:text-xs tracking-widest uppercase font-semibold transition-colors group-hover:text-white/80">Next Project</p>
                  <h2
                    className="text-white font-normal tracking-normal group-hover:text-[#3BEDFF] transition-all duration-500 break-words"
                    style={{ fontSize: 'clamp(16px, 2vw, 26px)', lineHeight: '110%' }}
                  >
                    {nextProject.title}
                  </h2>
                  <div className="mt-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#3BEDFF] group-hover:border-[#3BEDFF] transition-all duration-500">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#111111] transition-all duration-500 ease-out transform -rotate-45 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ) : <div />}
            {followingProject && followingProject.slug !== slug && followingProject.slug !== nextProject?.slug ? (
              <Link href={`/projects/${followingProject.slug}`} className="block group">
                <div className="p-4 md:p-6 flex flex-col gap-3 transition-colors duration-500 hover:bg-white/5 cursor-pointer h-full">
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#1a1a1a]">
                    <NavigatorPreview project={followingProject} />
                  </div>
                  <p className="text-white/50 text-[10px] md:text-xs tracking-widest uppercase font-semibold transition-colors group-hover:text-white/80">More Work</p>
                  <h2
                    className="text-white font-normal tracking-normal group-hover:text-[#3BEDFF] transition-all duration-500 break-words"
                    style={{ fontSize: 'clamp(16px, 2vw, 26px)', lineHeight: '110%' }}
                  >
                    {followingProject.title}
                  </h2>
                  <div className="mt-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#3BEDFF] group-hover:border-[#3BEDFF] transition-all duration-500">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#111111] transition-all duration-500 ease-out transform -rotate-45 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>

    </div>
  )
}

