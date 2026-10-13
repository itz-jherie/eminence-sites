import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xistudio.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/project/motion`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/eminence`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Query live projects from Sanity for dynamic programmatic SEO
  const QUERY = encodeURIComponent('*[_type == "project"]{ "slug": slug.current, _updatedAt }')
  let projectRoutes: MetadataRoute.Sitemap = []

  try {
    const res = await fetch(
      `https://uz3il453.api.sanity.io/v2024-03-24/data/query/production?query=${QUERY}`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    const projects = data.result || []

    projectRoutes = projects
      .filter((p: { slug?: string }) => Boolean(p.slug))
      .map((p: { slug: string; _updatedAt?: string }) => ({
        url: `${siteUrl}/projects/${p.slug}`,
        lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      }))
  } catch {
    projectRoutes = []
  }

  return [...staticRoutes, ...projectRoutes]
}
