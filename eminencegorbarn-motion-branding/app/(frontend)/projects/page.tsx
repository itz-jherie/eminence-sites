import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { SITE_NAME, SITE_CATEGORY_FILTER, SITE_VISIBILITY_FILTER } from "../lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";

export const metadata: Metadata = {
  title: "Selected Work & Portfolio",
  description:
    "Selected motion and branding work by " + SITE_NAME + ".",
  keywords: [
    `${SITE_NAME} Portfolio`,
    "Selected Work",
    "Brand Identity Case Studies",
    "Motion Design Portfolio",
    "UI/UX Design Projects",
    "Digital Product Case Studies",
    "Creative Direction Portfolio",
  ],
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: `${SITE_NAME} — Selected Work`,
    description:
      "Selected motion and branding work by " + SITE_NAME + ".",
    url: `${siteUrl}/projects`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Selected Work Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Selected Work`,
    description:
      "Selected motion and branding work by " + SITE_NAME + ".",
    images: [`${siteUrl}/assets/about-team.webp`],
  },
};

async function getProjects() {
  const QUERY = encodeURIComponent(`*[_type == "project" && ${SITE_CATEGORY_FILTER} && ${SITE_VISIBILITY_FILTER}] | order(orderRank) {_id, title, "slug": slug.current, category, tags, "coverImageUrl": coalesce(gallery[isCover == true][0].asset->url, previewGrid[isCover == true][0].asset->url, coverImage.asset->url), description, "previewUrls": previewGrid[].asset->url, "galleryUrls": gallery[].asset->url, "videoUrl": video.asset->url, "mobilePreviewUrl": mobilePreview.asset->url}`);
  
  try {
    const res = await fetch(`https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${QUERY}`, { cache: 'no-store' });
    const data = await res.json();
    return data.result || [];
  } catch {
    // Suppressing standard console logger to prevent Next.js dev-server Error Intercept Overlays from aggressively visually popping up on dropped network packets
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient initialProjects={projects} />;
}
