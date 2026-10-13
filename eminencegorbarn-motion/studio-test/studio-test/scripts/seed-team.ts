import {getCliClient} from 'sanity/cli'

const INITIAL_TEAM = [
  {
    name: 'Rachel Oriowo',
    role: 'Lead Strategist',
    order: 1,
  },
  {
    name: 'Adesogan "Eminence" Oluwanimifise',
    role: 'Lead Strategist',
    order: 2,
  },
  {
    name: 'Daniel',
    role: 'Lead Strategist',
    order: 3,
  },
  {
    name: 'Sam',
    role: 'Lead Strategist',
    order: 4,
  },
  {
    name: 'Faymous',
    role: 'Lead Strategist',
    order: 5,
  },
  {
    name: 'Jerry',
    role: 'Lead Strategist',
    order: 6,
  },
]

async function seed() {
  const client = getCliClient()
  console.log('Fetching existing team members...')
  const existing = await client.fetch<Array<{_id: string; name: string}>>(
    `*[_type == "teamMember"]{ _id, name }`
  )
  console.log(`Found ${existing.length} existing team members.`)

  for (let i = 0; i < INITIAL_TEAM.length; i++) {
    const member = INITIAL_TEAM[i]
    const exists = existing.find(
      (m) =>
        m.name.toLowerCase() === member.name.toLowerCase() ||
        (member.name.includes('Eminence') && m.name.toLowerCase().includes('eminence'))
    )

    if (exists) {
      console.log(`Team member "${member.name}" already exists (${exists._id}). Skipping creation.`)
    } else {
      console.log(`Creating team member "${member.name}"...`)
      const doc = await client.create({
        _type: 'teamMember',
        name: member.name,
        role: member.role,
        order: member.order,
      })
      console.log(`Created: ${doc._id}`)
    }
  }

  console.log('Done seeding team members!')
}

seed().catch((err) => {
  console.error('Error seeding team members:', err)
  process.exit(1)
})
