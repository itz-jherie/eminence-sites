import {defineArrayMember, defineField, defineType} from 'sanity'
import HomepagePickInput from '../components/HomepagePickInput'

const pickObject = defineArrayMember({
  type: 'object',
  name: 'pick',
  title: 'Project & Image',
  fields: [
    defineField({
      name: 'project',
      title: 'Project from Catalogue',
      type: 'reference',
      to: [{type: 'project'}],
      description:
        'Step 1: Pick a project from your catalogue. (Or choose "Custom image" to upload a standalone image).',
    }),
    defineField({
      name: 'image',
      title: 'Showcase Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      description:
        'Step 2: Click one of the project\'s gallery thumbnails below, or upload a custom image.',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Optional description. Defaults to the project title on the website.',
    }),
  ],
  components: {
    input: HomepagePickInput,
  },
  preview: {
    select: {
      title: 'project.title',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title ? `${title} — pick` : 'Custom image',
        media,
      }
    },
  },
})

const motionItemObject = defineArrayMember({
  type: 'object',
  name: 'motionItem',
  title: 'Motion Item / GIF / Video',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for this motion piece (defaults to linked project title if left empty).',
    }),
    defineField({
      name: 'details',
      title: 'Details / Subtitle',
      type: 'string',
      description: 'Short detail line or tags (e.g. "Launch Video / 3D Animation / Brand Motion").',
    }),
    defineField({
      name: 'project',
      title: 'Link to Project from Catalogue (Optional)',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Optionally link this card to a project in your catalogue.',
    }),
    defineField({
      name: 'gif',
      title: 'Animated GIF or Visual',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload an animated GIF or visual here.',
    }),
    defineField({
      name: 'video',
      title: 'Video Clip (Optional MP4 / WebM)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/quicktime',
      },
      description: 'Optional video loop file. If omitted, the GIF/image above (or linked project video) is used.',
    }),
    defineField({
      name: 'customUrl',
      title: 'Custom Link URL (Optional)',
      type: 'string',
      description: 'External or custom URL destination if not linking to a catalogue project.',
    }),
  ],
  preview: {
    select: {
      customTitle: 'title',
      projTitle: 'project.title',
      customDetails: 'details',
      gifMedia: 'gif',
      projMedia: 'project.coverImage',
    },
    prepare({customTitle, projTitle, customDetails, gifMedia, projMedia}) {
      const displayTitle = customTitle || projTitle || 'Untitled Motion Item'
      return {
        title: displayTitle,
        subtitle: customDetails || (projTitle ? `Linked: ${projTitle}` : 'Motion showcase item'),
        media: gifMedia || projMedia,
      }
    },
  },
})

export default defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    // 1. Elite digital experiences (Bento Grid)
    defineField({
      name: 'elitePicks',
      title: '1. Elite digital experiences — 4 projects',
      type: 'array',
      of: [pickObject],
      validation: (Rule) => Rule.max(4).warning('Pick up to 4 — leave empty to auto-use top 4 catalogue projects'),
      description:
        'Pick 4 projects for the "Elite digital experiences" section. Choose a project from your catalogue, then select its cover or gallery image. Leave empty to automatically use the top 4 catalogue projects.',
    }),

    // 2. Identity that leads (Curated Work Bento)
    defineField({
      name: 'identityPicks',
      title: '2. Identity that leads — 5 images',
      type: 'array',
      of: [pickObject],
      validation: (Rule) => Rule.max(5).warning('Pick up to 5 — leave empty to auto-use top catalogue projects'),
      description:
        'Pick 5 images for the "Identity that leads" section (Top row: 2 images, Bottom row: 3 equidistant images). Choose a project from your catalogue, then select one of that project\'s images. Leave empty to automatically use top catalogue projects.',
    }),

    // 3. Greatness in motion (Motion Showcase)
    defineField({
      name: 'motionHeading',
      title: '3a. Motion Section Heading',
      type: 'string',
      description: 'Custom headline for the motion section on the homepage (defaults to "Greatness in motion").',
    }),
    defineField({
      name: 'motionDetails',
      title: '3b. Motion Section Text / Details',
      type: 'text',
      rows: 2,
      description: 'Optional brief writeup or detail text displayed under or alongside the heading on the homepage.',
    }),
    defineField({
      name: 'motionItems',
      title: '3c. Greatness in motion — 4 Motion Items / GIFs',
      type: 'array',
      of: [motionItemObject],
      validation: (Rule) => Rule.max(4).warning('Pick up to 4 — leave empty to auto-use motion catalogue projects'),
      description:
        'Drop custom motion cards, animated GIFs, or videos with text and details here (up to 4). Leave empty to use the catalogue projects below.',
    }),
    defineField({
      name: 'motionProjects',
      title: '3d. Motion Projects from Catalogue (Fallback)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Motion Project',
          to: [{type: 'project'}],
          options: {
            filter: 'category == "Motion"',
          },
        }),
      ],
      validation: (Rule) => Rule.max(4).warning('Pick up to 4 — leave empty to auto-use top 4 Motion projects'),
      description:
        'Select 4 projects from your Motion catalogue to feature when custom motion items above are not set. Only projects categorized as "Motion" will appear. Leave empty to automatically use the top 4 motion projects.',
    }),

    // 4. Elite digital experiences / Product Showcase (Below Motion)
    defineField({
      name: 'productHeading',
      title: '4a. Product Section Heading',
      type: 'string',
      description: 'Heading for the product section below motion (defaults to "Elite digital experiences").',
    }),
    defineField({
      name: 'productActionText',
      title: '4b. Product Section Link Text',
      type: 'string',
      description: 'Text for the bottom-left link (defaults to "Website and Applications").',
    }),
    defineField({
      name: 'productPicks',
      title: '4c. Product Showcase — Pick Projects/Images',
      type: 'array',
      of: [pickObject],
      description:
        'Optionally pick specific Product projects or visuals for the homepage section. Leave empty to automatically display projects in the Product category.',
    }),

    // 5. Social Share & SEO Settings (Open Graph / Twitter)
    defineField({
      name: 'ogImage',
      title: '4a. Social Share / Open Graph (OG) Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Upload the primary social share preview image (OG Image) for Xi Studio. Shown when sharing links on iMessage, WhatsApp, Twitter/X, LinkedIn, Facebook, Slack, etc. Recommended size: 1200 x 630 px.',
    }),
    defineField({
      name: 'seoTitle',
      title: '4b. SEO Meta Title (Override)',
      type: 'string',
      description:
        'Custom title for search engines and browser tabs. If left blank, the studio default ("Xi Studio — Digital Design, Motion & Product Agency") is used.',
    }),
    defineField({
      name: 'seoDescription',
      title: '4c. SEO Meta Description (Override)',
      type: 'text',
      rows: 3,
      description:
        'Search snippet description displayed in Google results and social link previews. Recommended length: 140–160 characters.',
    }),
    defineField({
      name: 'seoKeywords',
      title: '4d. SEO Search Tags & Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description:
        'Keywords and high-intent search tags to help prospective clients and search engines discover Xi Studio (press enter after typing each keyword).',
    }),

    // Legacy fields preserved for backward compatibility
    defineField({
      name: 'motionPicks',
      title: 'Motion Picks (legacy)',
      type: 'array',
      of: [pickObject],
      hidden: true,
    }),
    defineField({
      name: 'featuredIdentity',
      title: 'Featured Project — Identity that leads (legacy)',
      type: 'reference',
      to: [{type: 'project'}],
      hidden: true,
    }),
    defineField({
      name: 'featuredMotion',
      title: 'Featured Project — Greatness in motion (legacy)',
      type: 'reference',
      to: [{type: 'project'}],
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Settings',
        subtitle: 'Curated showcase sections for Xi Studio',
      }
    },
  },
})
