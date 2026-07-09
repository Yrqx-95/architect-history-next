import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const globalsCss = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8')

function cssBlock(selector: string) {
  const match = globalsCss.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([\\s\\S]*?)\\n\\}`))
  return match?.[1] || ''
}

describe('graduation theme', () => {
  it('keeps the graduation module on the civic gray background instead of the warm archive wash', () => {
    const block = cssBlock('.graduation-system')

    expect(block).toContain('--ui-surface: #f6f8f7')
    expect(block).toContain('--ui-surface-muted: #eef2f1')
    expect(block).toContain('linear-gradient(180deg, #ffffff 0%, #f7f9f8 42%, #f2f5f4 100%)')
    expect(block).not.toContain('#fffdf8')
    expect(block).not.toContain('#eee9de')
  })
})
