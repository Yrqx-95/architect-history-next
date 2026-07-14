import { expect, test, type Page } from '@playwright/test'

const mobileViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
] as const

async function getHomeLayout(page: Page) {
  return page.evaluate(() => {
    const names = ['stats', 'entry', 'featured', 'architects'] as const
    const sections = names.map(name => {
      const element = document.querySelector<HTMLElement>(`[data-home-section="${name}"]`)
      const rect = element?.getBoundingClientRect()
      return {
        name,
        top: rect?.top ?? -1,
        height: rect?.height ?? 0,
      }
    })
    const root = document.documentElement
    const body = document.body
    return {
      sections,
      clientWidth: root.clientWidth,
      scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
    }
  })
}

test.describe('homepage responsive hierarchy', () => {
  test('mobile home fits 320/390/430 and keeps entry, featured, stats, architect order', async ({ page }) => {
    for (const viewport of mobileViewports) {
      await page.setViewportSize(viewport)
      await page.goto('/zh')

      await expect(page.locator('main h1')).toBeVisible()
      await expect(page.locator('[data-home-hero-meta]')).toBeVisible()
      await expect(page.locator('[data-home-section="entry"] a[href="/zh/search"]').first()).toBeVisible()
      await expect(page.locator('[data-home-section="stats"]')).toHaveCount(1)

      const layout = await getHomeLayout(page)
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
      expect(layout.sections.slice().sort((a, b) => a.top - b.top).map(item => item.name)).toEqual([
        'entry',
        'featured',
        'stats',
        'architects',
      ])
      expect(await page.locator('[data-home-secondary-item]:visible').count()).toBe(2)
      expect(await page.locator('[data-home-architect]:visible').count()).toBe(3)
    }
  })

  test('desktop home uses one DOM order for stats, entry, featured, and architects', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/zh')

    const domOrder = await page.locator('main [data-home-section]').evaluateAll(elements =>
      elements.map(element => element.getAttribute('data-home-section')),
    )
    expect(domOrder).toEqual(['stats', 'entry', 'featured', 'architects'])

    const layout = await getHomeLayout(page)
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
    expect(layout.sections.slice().sort((a, b) => a.top - b.top).map(item => item.name)).toEqual([
      'stats',
      'entry',
      'featured',
      'architects',
    ])

    const statsLink = page.locator('[data-home-section="stats"] a').first()
    await statsLink.focus()
    const focusOrder: string[] = []
    for (let index = 0; index < 32; index += 1) {
      const section = await page.evaluate(() =>
        document.activeElement?.closest<HTMLElement>('[data-home-section]')?.dataset.homeSection || null,
      )
      if (section && !focusOrder.includes(section)) focusOrder.push(section)
      await page.keyboard.press('Tab')
    }
    expect(focusOrder.slice(0, 4)).toEqual(['stats', 'entry', 'featured', 'architects'])
  })

  test('primary search entry is clickable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/zh')

    await page.locator('[data-home-section="entry"] a[href="/zh/search"]').first().click()
    await expect(page).toHaveURL(/\/zh\/search$/)
  })

  test('zh/en/ja home routes and long English hero title stay within the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })

    for (const route of ['/zh', '/en', '/ja']) {
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)
      await expect(page.locator('main h1')).toBeVisible()

      const layout = await getHomeLayout(page)
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
    }

    await page.goto('/en')
    const heroTitle = page.locator('main h1')
    const titleText = (await heroTitle.textContent())?.trim() || ''
    expect(titleText.length).toBeGreaterThan(20)
    const titleMetrics = await heroTitle.evaluate(element => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }))
    expect(titleMetrics.scrollWidth).toBeLessThanOrEqual(titleMetrics.clientWidth)
  })
})
