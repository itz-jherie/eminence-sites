import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'
import StudioLogo from './components/StudioLogo'

export default defineConfig({
  name: 'default',
  title: 'Content Studio',
  subtitle: 'Xi Studio · Eminence Sites',
  icon: StudioLogo,

  projectId: 'uz3il453',
  dataset: 'production',

  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  plugins: [
    structureTool({
      structure: (S, context) => {
        const siteSection = (siteTitle: string, siteId: string) =>
          S.documentListItem({
            schemaType: 'siteSettings',
            title: `${siteTitle} — Homepage`,
            id: siteId,
          })

        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage Settings (Xi Studio)')
              .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage Settings (Xi Studio)')),
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'All Projects incl. Xi Studio (drag to reorder)',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'teamMember',
              title: 'Team Members (Xi Studio)',
              S,
              context,
            }),
            siteSection('Motion site (Eminence)', 'site-motion'),
            siteSection('Branding + Graphics site (Eminence)', 'site-branding'),
            siteSection('Product site (Eminence)', 'site-product'),
            siteSection('Motion + Branding + Graphics site (Eminence)', 'site-combined'),
            ...S.documentTypeListItems().filter((listItem) => !['project', 'homepage', 'siteSettings', 'teamMember'].includes(listItem.getId() as string)),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
