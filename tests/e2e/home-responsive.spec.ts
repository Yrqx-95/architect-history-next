import { expect, test, type Page } from '@playwright/test'

const mobileViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
] as const

async function getHomeLayout(page: Page) {
  return page.evaluate(() => {
    const names = ['entry', 'featured', 'stats', 'architects'] as const
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

async function getFocusSectionOrder(page: Page, startSelector: string, tabCount = 40) {
  await page.locator(startSelector).first().focus()
  const focusOrder: string[] = []
  for (let index = 0; index < tabCount; index += 1) {
    const section = await page.evaluate(() =>
      document.activeElement?.closest<HTMLElement>('[data-home-section]')?.dataset.homeSection || null,
    )
    if (section && !focusOrder.includes(section)) focusOrder.push(section)
    await page.keyboard.press('Tab')
  }
  return focusOrder
}

test.describe('homepage responsive hierarchy', () => {
  test('mobile home keeps one DOM, visual, and focus order at 320/390/430', async ({ page }) => {
    const expectedOrder = ['entry', 'featured', 'stats', 'architects']
    for (const viewport of mobileViewports) {
      await page.setViewportSize(viewport)
      await page.goto('/zh')

      await expect(page.locator('main h1')).toBeVisible()
      await expect(page.locator('[data-home-hero-meta]')).toBeVisible()
      await expect(page.locator('[data-home-section="entry"] a[href="/zh/search"]').first()).toBeVisible()
      await expect(page.locator('[data-home-section="stats"]')).toHaveCount(1)

      const layout = await getHomeLayout(page)
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
      const domOrder = await page.locator('main [data-home-section]').evaluateAll(elements =>
        elements.map(element => element.getAttribute('data-home-section')),
      )
      expect(domOrder).toEqual(expectedOrder)
      expect(layout.sections.slice().sort((a, b) => a.top - b.top).map(item => item.name)).toEqual([
        'entry',
        'featured',
        'stats',
        'architects',
      ])
      const focusOrder = await getFocusSectionOrder(page, '[data-home-section="entry"] a[href="/zh/search"]')
      expect(focusOrder.slice(0, 4)).toEqual(expectedOrder)
      expect(await page.locator('[data-home-secondary-item]:visible').count()).toBe(2)
      expect(await page.locator('[data-home-architect]:visible').count()).toBe(3)
    }
  })

  test('desktop home keeps one DOM, visual, and focus order', async ({ page }) => {
    const expectedOrder = ['entry', 'featured', 'stats', 'architects']
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/zh')

    const domOrder = await page.locator('main [data-home-section]').evaluateAll(elements =>
      elements.map(element => element.getAttribute('data-home-section')),
    )
    expect(domOrder).toEqual(expectedOrder)

    const layout = await getHomeLayout(page)
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
    expect(layout.sections.slice().sort((a, b) => a.top - b.top).map(item => item.name)).toEqual(expectedOrder)

    const focusOrder = await getFocusSectionOrder(page, '[data-home-section="entry"] a[href="/zh/search"]')
    expect(focusOrder.slice(0, 4)).toEqual(expectedOrder)
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
