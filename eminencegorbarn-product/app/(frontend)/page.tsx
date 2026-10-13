import type { Metadata } from "next";
import EminenceHome, { EminenceProject } from "./components/EminenceHome";
import { sanityImage } from "./lib/sanityImage";
import {
  SITE_NAME,
  SITE_DEFAULT_TITLE,
  SITE_DEFAULT_DESC,
  SITE_CATEGORIES,
  SITE_SETTINGS_ID,
  SITE_VISIBILITY_FILTER,
  SITE_CATEGORY_FILTER,
} from "./lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = SITE_DEFAULT_TITLE;
  const defaultDesc = SITE_DEFAULT_DESC;

  let ogImageUrl: string | null = null;
  let customTitle: string | null = null;
  let customDesc: string | null = null;

  try {
    const SEO_QUERY = encodeURIComponent(
      `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_ID}"][0]{ "ogImageUrl": ogImage.asset->url, seoTitle, seoDescription }`
    );
    const res = await fetch(
      `https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${SEO_QUERY}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data?.result) {
      ogImageUrl = data.result.ogImageUrl || null;
      customTitle = data.result.seoTitle || null;
      customDesc = data.result.seoDescription || null;
    }
  } catch {
    // Fall back to robust defaults gracefully
  }

  const title = customTitle || defaultTitle;
  const description = customDesc || defaultDesc;

  const shareImageUrl = ogImageUrl
    ? sanityImage(ogImageUrl, 1200, 630)
    : `${siteUrl}/assets/about-team.webp`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl],
    },
  };
}

const KCLAUTX_MOTION_FALLBACK: EminenceProject = {
  _id: 'eminence-kclautx-motion',
  title: 'KclautX',
  slug: 'kclautx-motion',
  category: 'Motion',
  description: 'Launch video',
  videoUrl: '/assets/gifs/KclautX_opt.mp4',
};

async function getSiteProjects(): Promise<EminenceProject[]> {
  const CATALOG_QUERY = encodeURIComponent(
    `*[_type == "project" && ${SITE_CATEGORY_FILTER} && ${SITE_VISIBILITY_FILTER}] | order(orderRank) {
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      tags,
      "videoUrl": video.asset->url,
      "coverUrl": coalesce(coverImage.asset->url, gallery[0].asset->url),
      "posterUrl": coalesce(videoPoster.asset->url, coverImage.asset->url),
      "previewUrls": previewGrid[].asset->url,
      "galleryUrls": gallery[].asset->url,
      "mobilePreviewUrl": mobilePreview.asset->url
    }`
  );
  // Pinned picks from this site's Homepage picks doc (in pick order)
  const PICKS_QUERY = encodeURIComponent(
    `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_ID}"][0]{
      "featured": featuredProjects[]->{
        _id,
        title,
        "slug": slug.current,
        category,
        description,
        tags,
        "videoUrl": video.asset->url,
        "coverUrl": coalesce(coverImage.asset->url, gallery[0].asset->url),
        "posterUrl": coalesce(videoPoster.asset->url, coverImage.asset->url),
        "previewUrls": previewGrid[].asset->url,
        "galleryUrls": gallery[].asset->url,
        "mobilePreviewUrl": mobilePreview.asset->url,
        "visible": ${SITE_VISIBILITY_FILTER}
      }
    }`
  );
  const fetchQuery = async (q: string) => {
    const res = await fetch(
      `https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${q}`,
      { cache: 'no-store' }
    );
    return res.json();
  };
  try {
    const [catalogData, picksData] = await Promise.all([
      fetchQuery(CATALOG_QUERY),
      fetchQuery(PICKS_QUERY),
    ]);
    const catalog: EminenceProject[] = catalogData.result || [];
    const featured: Array<EminenceProject & {visible?: boolean}> =
      picksData?.result?.featured || [];
    // Pinned first (skips blocked / off-category / slugless picks)
    const pinned = featured.filter(
      (p) => p.slug && SITE_CATEGORIES.includes(p.category) && p.visible !== false,
    );
    const pinnedSlugs = new Set(pinned.map((p) => p.slug));
    const rest = catalog.filter((p) => !pinnedSlugs.has(p.slug));
    // Motion-serving sites get the KclautX launch video first (same order as eminence)
    if (
      SITE_CATEGORIES.includes('Motion') &&
      !pinnedSlugs.has('kclautx-motion') &&
      !pinnedSlugs.has('kclautx') &&
      !rest.some((p) => p.slug === 'kclautx-motion' || p.slug === 'kclautx')
    ) {
      rest.unshift(KCLAUTX_MOTION_FALLBACK);
    }
    return [...pinned, ...rest];
  } catch {
    return SITE_CATEGORIES.includes('Motion') ? [KCLAUTX_MOTION_FALLBACK] : [];
  }
}

export default async function Home() {
  const projects = await getSiteProjects();

  return (
    <EminenceHome
      projects={projects}
      tabs={['Product']}
      heroLine1="I'm Oluwanimifise 'Eminence' Adesogan, a product designer specialising in digital products, UI/UX, and design systems."
      heroLine2="I've worked across fintech, AI, SaaS, and tech."
      jobTitle="Product Designer"
      knowAbout={[
        'Product Design',
        'UI/UX Design',
        'Design Systems',
        'Digital Products',
        'Creative Direction',
        'Prototyping'
      ]}
      pageTitle="Mr. Eminence | Product Designer"
      pageDescription="Oluwanimifise 'Eminence' Adesogan is a product designer specializing in digital products, UI/UX, and design systems."
      layout="bento"
    />
  );
}
