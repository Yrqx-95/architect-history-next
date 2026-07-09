import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const globalsCss = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8')

function cssBlock(selector: string) {
  const match = globalsCss.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([\\s\\S]*?)\\n\\}`))
  return match?.[1] || ''
}

describe('graduation theme', () => {
  it('keeps the graduation module on the warm archive background instead of the civic gray wash', () => {
    const block = cssBlock('.graduation-system')

    expect(block).toContain('--ui-surface: #fffdf8')
    expect(block).toContain('--ui-surface-muted: #eee9de')
    expect(block).toContain('linear-gradient(180deg, #fffdf8 0%, #f7f4ed 48%, #f1ece2 100%)')
    expect(block).not.toContain('#f6f8f7')
    expect(block).not.toContain('#eef2f1')
  })
})
