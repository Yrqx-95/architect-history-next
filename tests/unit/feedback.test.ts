import { describe, expect, it } from 'vitest'
import { buildFeedbackMailto, sanitizeFeedbackPath } from '@/lib/feedback'

describe('contextual feedback links', () => {
  it('accepts only a bounded path inside the active language', () => {
    expect(sanitizeFeedbackPath('/zh/building/villa-savoye', 'zh')).toBe('/zh/building/villa-savoye')
    expect(sanitizeFeedbackPath('/en/building/villa-savoye', 'zh')).toBeNull()
    expect(sanitizeFeedbackPath('https://example.com', 'zh')).toBeNull()
    expect(sanitizeFeedbackPath('/zh/line\nbreak', 'zh')).toBeNull()
  })

  it('adds the reported production page to the email draft', () => {
    const href = buildFeedbackMailto({
      email: 'feedback@example.com',
      subject: 'Archistory feedback',
      body: 'Describe the issue:',
      pagePath: '/en/building/villa-savoye',
    })

    expect(decodeURIComponent(href)).toContain('Page: https://archistory.app/en/building/villa-savoye')
  })
})
