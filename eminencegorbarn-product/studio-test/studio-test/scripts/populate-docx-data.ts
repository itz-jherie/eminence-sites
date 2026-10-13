import {getCliClient} from 'sanity/cli'
import * as path from 'path'
import {execSync} from 'child_process'

interface ExtractedProject {
  slug: string
  docFile: string
  title: string
  tagline: string
  sector: string
  tags: string[]
  country: string
  year: string
  scope: string[]
  coreIdea: string
  description: string
  bodyBlocks: Array<{
    _type: 'block'
    _key: string
    style: 'normal' | 'h2' | 'h3' | 'blockquote'
    children: Array<{
      _type: 'span'
      _key: string
      text: string
      marks: string[]
    }>
    markDefs: unknown[]
  }>
}

const SLUG_MAPPING: Record<string, string> = {
  'AITECH Empowerment Foundation.docx': 'aitech-foundation',
  'Cleverfolks.docx': 'cleverfolks',
  'Gombod.docx': 'gombod',
  'KclautX.docx': 'kclautx',
  'LivMalik.docx': 'livmalik',
  'Mountti.docx': 'mounti',
  'Onaks Fitness.docx': 'onaks',
  'PillPal.docx': 'pillpal',
  'RepMirror.docx': 'repmirror',
  'TheKclaut.docx': 'thekclaut',
  'Tradigro.docx': 'tradigro',
}

function extractDocx(baseDir: string): (ExtractedProject & {file: string})[] {
  const pyScriptPath = path.join(__dirname, 'parse_docx.py')
  const output = execSync(`python3 "${pyScriptPath}" "${baseDir}"`, {
    maxBuffer: 20 * 1024 * 1024,
  })
  return JSON.parse(output.toString())
}

async function main() {
  const client = getCliClient({apiVersion: '2024-03-24'})
  const baseDir = '/Users/jherie/Downloads/Website portfolio package'

  console.log('📂 Parsing all .docx files from:', baseDir)
  const extracted = extractDocx(baseDir)
  console.log(`✅ Extracted data from ${extracted.length} Word documents.`)

  // Fetch all projects from Sanity
  const sanityProjects = await client.fetch(
    '*[_type == "project"]{_id, title, "slug": slug.current}'
  )
  console.log(`📡 Found ${sanityProjects.length} existing projects in Sanity.`)

  for (const item of extracted) {
    const slug = SLUG_MAPPING[item.file]
    if (!slug) {
      console.warn(`⚠️ No slug mapping found for file: ${item.file}`)
      continue
    }

    const doc = sanityProjects.find((p: {slug: string}) => p.slug === slug)
    if (!doc) {
      console.warn(`⚠️ No Sanity project found matching slug "${slug}" (from ${item.file})`)
      continue
    }

    console.log(`\n🚀 Patching project: "${doc.title}" (slug: ${slug}, id: ${doc._id})`)
    console.log(`   Tagline: "${item.tagline}"`)
    console.log(`   Sector: "${item.sector}"`)
    console.log(`   Country: "${item.country}" | Year: "${item.year}"`)
    console.log(`   Scope: [${item.scope.join(', ')}]`)
    console.log(`   Core Idea: "${item.coreIdea}"`)
    console.log(`   Body blocks: ${item.bodyBlocks.length}`)

    await client
      .patch(doc._id)
      .set({
        sector: item.sector,
        country: item.country,
        year: item.year,
        scope: item.scope,
        ...(item.tagline ? {tagline: item.tagline} : {}),
        ...(item.coreIdea ? {coreIdea: item.coreIdea} : {}),
        ...(item.description ? {description: item.description} : {}),
        ...(item.tags.length > 0 ? {tags: item.tags} : {}),
        body: item.bodyBlocks,
      })
      .commit()

    console.log(`   ✅ Successfully updated "${doc.title}"!`)
  }

  // Also sync kclaut
  const kclautDoc = sanityProjects.find((p: {slug: string}) => p.slug === 'kclaut')
  const thekclautExtracted = extracted.find((e) => e.file === 'TheKclaut.docx')
  if (kclautDoc && thekclautExtracted) {
    console.log(`\n🚀 Syncing metadata for "kclaut" (id: ${kclautDoc._id})`)
    await client
      .patch(kclautDoc._id)
      .set({
        sector: thekclautExtracted.sector,
        country: thekclautExtracted.country,
        year: thekclautExtracted.year,
        scope: thekclautExtracted.scope,
        ...(thekclautExtracted.tagline ? {tagline: thekclautExtracted.tagline} : {}),
        body: thekclautExtracted.bodyBlocks,
      })
      .commit()
    console.log(`   ✅ Successfully updated "kclaut"!`)
  }

  console.log('\n🎉 ALL PROJECTS POPULATED IN SANITY CMS SUCCESSFULLY!')
}

main().catch((err) => {
  console.error('❌ Error running migration:', err)
  process.exit(1)
})
