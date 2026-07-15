import { expect, test } from '@playwright/test'

const languages = ['zh', 'en', 'ja'] as const
const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 1440, height: 900 },
] as const

test.describe('content-trust Parc.1 and NMWA runtime boundaries', () => {
  test('Parc.1 shows the accessible no-safe-image state without DB/supporting-image fallback', async ({ page }) => {
    for (const lang of languages) {
      for (const viewport of viewports) {
        await page.setViewportSize(viewport)
        const response = await page.goto(`/${lang}/building/parc1`)
        expect(response?.status()).toBe(200)
        await expect(page.getByTestId('no-safe-image-state')).toBeVisible()
        await expect(page.getByTestId('no-safe-image-state')).toContainText(/safe primary|安全主图|安全な主画像/)
        expect(await page.locator('[data-testid="no-safe-image-state"] img').count()).toBe(0)
        expect(await page.locator('img[src*="parc1-1024"]').count()).toBe(0)
        const layout = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        }))
        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
      }
    }
  })

  test('cover consumers keep Parc.1 image-less in search and homepage selection', async ({ page, request }) => {
    const apiResponse = await request.get('/api/search?q=parc1')
    expect(apiResponse.status()).toBe(200)
    const payload = await apiResponse.json()
    const result = payload.buildings.find((building: { slug?: string }) => building.slug === 'parc1')
    expect(result).toMatchObject({ slug: 'parc1', cover_url: null })

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/zh')
    expect(await page.locator('[data-home-section="featured"] a[href="/zh/building/parc1"]').count()).toBe(0)

    await page.goto('/zh/browse/buildings')
    const parcLink = page.getByRole('link', { name: /Parc1/ }).first()
    await expect(parcLink).toBeVisible()
    expect(await parcLink.locator('img').count()).toBe(0)
  })

  test('NMWA remains reachable in all languages and retains current attribution until image follow-up', async ({ page }) => {
    for (const lang of languages) {
      for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
        await page.setViewportSize(viewport)
        const response = await page.goto(`/${lang}/building/national-museum-of-western-art`)
        expect(response?.status()).toBe(200)
        await expect(page.locator('main')).toContainText('National Museum of Western Art')
        await expect(page.locator('main')).toContainText(/Alexander Abero|アレクサンダー|Unsplash|画像資料|图片来源|Image source/)
        await expect(page.locator('main img').first()).toBeVisible()
        await expect(page.locator('main').getByText(/Alexander Abero|Unsplash/).first()).toBeVisible()
        await expect(page.locator('main').getByRole('link', { name: /来源|出典|Source/ }).first()).toBeVisible()
        const errors = await page.evaluate(() => ({
          horizontalOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > document.documentElement.clientWidth,
        }))
        expect(errors.horizontalOverflow).toBe(false)
      }
    }
  })

  test('ordinary building galleries keep a visible hero image and controls', async ({ page }) => {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      await page.setViewportSize(viewport)
      const response = await page.goto('/zh/building/villa-savoye')
      expect(response?.status()).toBe(200)
      await expect(page.locator('main img').first()).toBeVisible()
      await expect(page.getByRole('button', { name: '查看大图' })).toBeVisible()
      await expect(page.locator('main').getByRole('link', { name: '来源' }).first()).toBeVisible()
      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      }))
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)
    }
  })
})
