import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const packetDir = path.join(root, 'db/review-packets')
const outputPath = path.join(root, 'src/content/graduation/building-links.json')
const links = new Map()

for (const filename of fs.readdirSync(packetDir).filter(name => name.endsWith('.json')).sort()) {
  const packet = JSON.parse(fs.readFileSync(path.join(packetDir, filename), 'utf8'))
  if (!Array.isArray(packet.profiles)) continue
  const slugById = new Map((packet.buildings || []).map(building => [building.id, building.slug]))
  for (const profile of packet.profiles) {
    const slug = profile.building_slug || slugById.get(profile.building_id)
    if (!profile.case_id || !slug) continue
    const previous = links.get(profile.case_id)
    if (previous && previous !== slug) throw new Error(`${profile.case_id} maps to both ${previous} and ${slug}`)
    links.set(profile.case_id, slug)
  }
}

const output = Object.fromEntries([...links].sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`)
console.log(`Built ${path.relative(root, outputPath)} with ${links.size} reviewed links.`)
