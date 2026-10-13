import {defineField, defineType} from 'sanity'
import SiteFeaturedProjectsInput from '../components/SiteFeaturedProjectsInput'

// Per-site homepage settings for the Eminence portfolio sites.
// The homepage grid is driven by (1) Featured projects pinned here, in
// order, then (2) the rest of this site's catalogue automatically
// (matching category + not blocked via the per-site visibility toggles).
// One document per site (IDs: site-motion, site-branding, site-product,
// site-combined), opened via the site's "Homepage picks" pane.

const SITE_LABELS: Record<string, string> = {
  motion: 'Motion site',
  branding: 'Branding + Graphics site',
  product: 'Product site',
  combined: 'Motion + Branding + Graphics site',
}

export default defineType({
  name: 'siteSettings',
  title: 'Site Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: [
          {title: 'Motion (eminencegorbarn-motion)', value: 'motion'},
          {title: 'Branding + Graphics (eminencegorbarn-branding)', value: 'branding'},
          {title: 'Product (eminencegorbarn-product)', value: 'product'},
          {title: 'Motion + Branding + Graphics (eminencegorbarn-motion-branding)', value: 'combined'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description:
        'Which site these settings belong to. Must match the site folder you opened this from.',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured projects (pinned first, in this order)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      components: {
        input: SiteFeaturedProjectsInput,
      },
      validation: (Rule) => Rule.max(8).warning('Pinned to the top of the homepage grid in this order'),
      description:
        'Pick projects to pin to the top of this site\'s homepage grid, in order — the rest of this site\'s catalogue follows automatically in drag order. Leave empty to show the catalogue only. Blocked or off-category projects are skipped.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share / Open Graph (OG) Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Preview image shown when sharing this site\'s links (iMessage, WhatsApp, Twitter/X, LinkedIn, etc.). Recommended size: 1200 x 630 px.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title (Override)',
      type: 'string',
      description:
        'Custom title for search engines and browser tabs. If left blank, the site default is used.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description (Override)',
      type: 'text',
      rows: 3,
      description:
        'Search snippet shown in Google results and link previews. Recommended length: 140–160 characters.',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Search Tags & Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description:
        'Keywords to help clients and search engines discover this site (press enter after each keyword).',
    }),
  ],
  preview: {
    select: {
      site: 'site',
    },
    prepare({site}: {site?: string}) {
      const label = (site && SITE_LABELS[site]) || 'Site'
      return {
        title: `${label} — homepage settings`,
        subtitle: site ? `Settings for ${site}` : 'Pick which site these settings belong to',
      }
    },
  },
})
