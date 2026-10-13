import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'teamMember'}),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g. Rachel Oriowo, Eminence, Daniel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. Lead Strategist, Creative Director, Motion Designer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Upload team member portrait photo. Hotspot is enabled to control focal point.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Optional manual order number (1, 2, 3...) if not using drag-and-drop',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
