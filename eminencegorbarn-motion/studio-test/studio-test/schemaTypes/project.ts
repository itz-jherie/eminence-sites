import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import ProjectTagsInput from '../components/ProjectTagsInput'
import ProjectPreviewGridInput from '../components/ProjectPreviewGridInput'
import ProjectGalleryInput from '../components/ProjectGalleryInput'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fieldsets: [
    {
      name: 'siteVisibility',
      title: 'Site visibility (Eminence Sites)',
      description: 'Uncheck a site to BLOCK this project from it. All 4 Eminence sites share this catalogue.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'advanced',
      title: 'Advanced — detail page extras',
      description: 'Only used by full project detail pages. Not needed for the Eminence homepages (title, cover, video and description above are enough).',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    orderRankField({type: 'project'}),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Branding', value: 'Branding'},
          {title: 'Motion', value: 'Motion'},
          {title: 'Product', value: 'Product'},
          {title: 'Graphics', value: 'Graphics'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    // Per-site visibility (Eminence Sites) — uncheck to BLOCK this project
    // from a site. All sites share the same project catalogue.
    defineField({
      name: 'showOnMotionSite',
      fieldset: 'siteVisibility',
      title: 'Show on Motion site',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to block this project from eminencegorbarn-motion.',
    }),
    defineField({
      name: 'showOnBrandingSite',
      fieldset: 'siteVisibility',
      title: 'Show on Branding site',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to block this project from eminencegorbarn-branding.',
    }),
    defineField({
      name: 'showOnProductSite',
      fieldset: 'siteVisibility',
      title: 'Show on Product site',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to block this project from eminencegorbarn-product.',
    }),
    defineField({
      name: 'showOnCombinedSite',
      fieldset: 'siteVisibility',
      title: 'Show on Motion + Branding site',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to block this project from eminencegorbarn-motion-branding.',
    }),
    defineField({
      name: 'tags',
      fieldset: 'advanced',
      title: 'Industry & Tags (Subtitle)',
      type: 'array',
      of: [{type: 'string'}],
      components: {
        input: ProjectTagsInput,
      },
      description:
        'Displayed directly below the project title on the Portfolio page (e.g. "Fintech / Cryptocurrency / Digital Payments"). Click any preset combo or bubble tag to add, or type custom tags.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share / Open Graph (OG) Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Optional custom social share image (1200x630 px). If left empty, the Cover Image above will be automatically used when sharing this project on social media.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary shown on project cards and the hero section.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Headline',
      type: 'string',
      description: 'The primary headline/slogan for the project (e.g. "Trade. Convert. Pay.").',
    }),
    defineField({
      name: 'sector',
      fieldset: 'advanced',
      title: 'Sector / Industry',
      type: 'string',
      description: 'The industry sector (e.g. "Fintech / Cryptocurrency / Digital Payments").',
    }),
    defineField({
      name: 'country',
      fieldset: 'advanced',
      title: 'Country',
      type: 'string',
      description: 'Client or project country location (e.g. "Nigeria", "United Kingdom").',
    }),
    defineField({
      name: 'year',
      fieldset: 'advanced',
      title: 'Year',
      type: 'string',
      description: 'Project launch or delivery year (e.g. "2026", "2025").',
    }),
    defineField({
      name: 'scope',
      fieldset: 'advanced',
      title: 'Scope of Work',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Delivered services (e.g. "Brand strategy", "Visual identity", "Motion design", "Website design").',
    }),
    defineField({
      name: 'coreIdea',
      fieldset: 'advanced',
      title: 'Core Concept / Creative Direction',
      type: 'string',
      description: 'The fundamental concept, strategic brand idea, or motion direction.',
    }),
    defineField({
      name: 'body',
      fieldset: 'advanced',
      title: 'Project Blog / Case Study',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility.',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption displayed below the image.',
            },
          ],
        },
      ],
      description:
        'Write a full blog post or case study. Use the rich text editor to add headings, lists, quotes, links, and images.',
    }),
    defineField({
      name: 'showcase',
      fieldset: 'advanced',
      title: 'Showcase on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this ON to feature this project\'s gallery images in the "Work Showcase" section on the homepage.',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery (Images & GIFs)',
      type: 'array',
      components: {
        input: ProjectGalleryInput,
      },
      of: [{
        type: 'image',
        options: {hotspot: true},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validation: (Rule: any) => Rule.custom(async (img: any, ctx: any) => {
          if (!img?.asset?._ref) return true
          try {
            const client = ctx.getClient({apiVersion: '2024-03-24'})
            const asset = await client.fetch(`*[_id == $id][0]{size, mimeType}`, {id: img.asset._ref})
            if (asset?.size > 25 * 1024 * 1024) return 'File too large (>25MB). Compress before upload.'
          } catch {}
          return true
        }).warning('Large files (>5MB) may take longer to load. Optimized GIFs or images are recommended.'),
        fields: [
          {
            name: 'isHidden',
            type: 'boolean',
            title: 'Hide from website (Temporary Blocker)',
            description: 'Toggle ON to temporarily hide this image from the website without deleting it.',
            initialValue: false,
          },
          {
            name: 'isCover',
            type: 'boolean',
            title: 'Make this the cover image',
            description: 'Toggle ON to use this image as the project cover (overrides Cover Image field)',
            initialValue: false,
          },
          {
            name: 'alt',
            type: 'string',
            title: 'Alt Text',
          },
        ],
      }],
      options: {
        layout: 'grid',
      },
      description: 'Upload project visuals, case study images, and animated GIFs here. Drag and drop multiple files to batch upload! Toggle "Make this the cover image" on any item if desired.',
    }),
    defineField({
      name: 'previewGrid',
      fieldset: 'advanced',
      title: 'Projects Page Preview (4 images for /projects)',
      type: 'array',
      components: {
        input: ProjectPreviewGridInput,
      },
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {
            name: 'isCover',
            type: 'boolean',
            title: 'Make this the cover image',
            description: 'Toggle ON to use this image as the project cover',
            initialValue: false,
          },
          {
            name: 'alt',
            type: 'string',
            title: 'Alt Text',
          },
        ],
      }],
      validation: (Rule) => Rule.max(4).warning('Pick up to 4 for the 2x2 grid'),
      options: {
        layout: 'grid',
      },
      description: 'Individually select up to 4 images from this project\'s gallery or upload new ones to display in the 2x2 grid on the /projects page. The full gallery arrangement below is preserved for the inner project page.',
    }),
    defineField({
      name: 'mobilePreview',
      fieldset: 'advanced',
      title: 'Mobile Preview (1 image for /projects on mobile)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Pick the single image to show for this project on mobile. If empty, the first preview/grid image is used.',
    }),
    defineField({
      name: 'video',
      title: 'Showcase Video / Preview Clip',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/quicktime',
      },
      description: 'Short trimmed preview loop shown on the /projects card grid and looping hero banner (MP4 recommended).',
    }),
    defineField({
      name: 'fullVideo',
      fieldset: 'advanced',
      title: 'Main Full Video (for Modal / Full Playback)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/quicktime',
      },
      description: 'Upload the full-length main video (up to 100MB MP4 supported by Sanity). Streams in high quality when clients click "Watch Full Video" in the modal.',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) =>
        Rule.custom(async (file: any, context: any) => {
          if (!file?.asset?._ref) return true
          try {
            const client = context.getClient({apiVersion: '2024-03-24'})
            const asset = await client.fetch(`*[_id == $id][0]{size, mimeType}`, {id: file.asset._ref})
            if (asset?.size > 100 * 1024 * 1024) return 'File exceeds Sanity free tier asset upload limit (100MB). Please compress to under 100MB.'
          } catch {}
          return true
        }),
    }),
    defineField({
      name: 'videoPoster',
      fieldset: 'advanced',
      title: 'Video Poster (fallback cover)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional poster image for the motion video (shown while video loads or if video fails). If empty, cover image is used.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      tags: 'tags',
      media: 'coverImage',
      showcase: 'showcase',
    },
    prepare({title, category, tags, media, showcase}) {
      const tagList = Array.isArray(tags) && tags.length > 0 ? tags.join(' / ') : category
      return {
        title: `${showcase ? '⭐ ' : ''}${title || 'Untitled'}`,
        subtitle: tagList,
        media: media,
      }
    },
  },
})
