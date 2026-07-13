import { expect, test } from '@playwright/test'

test.describe('graduation case detail rendering', () => {
  test('localized case detail renders title, image, and attribution on desktop', async ({ page }) => {
    const response = await page.goto('/zh/graduation/cases/CASE-033')
    expect(response?.status()).toBe(200)

    const title = page.getByRole('heading', { level: 1 })
    await expect(title).toBeVisible()
    await expect(page.getByRole('link', { name: '图片来源 · CC BY-SA 4.0' })).toBeVisible()
    await expect(page.locator('.page-enter')).toHaveCSS('animation-fill-mode', 'both')

    const imageState = await page.locator('main img').evaluate((img: HTMLImageElement) => ({
      alt: img.alt,
      src: img.currentSrc || img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
    }))

    expect(imageState.alt).toBe(await title.textContent())
    expect(imageState.src).toContain('case-033-yu-no-eki-ohyu.jpg')
    expect(imageState.naturalWidth).toBeGreaterThan(400)
    expect(imageState.naturalHeight).toBeGreaterThan(250)
    expect(imageState.clientWidth).toBeGreaterThan(300)

    const titleBounds = await title.evaluate(element => {
      const rect = element.getBoundingClientRect()
      return { top: rect.top, bottom: rect.bottom, width: rect.width }
    })
    expect(titleBounds.top).toBeGreaterThan(0)
    expect(titleBounds.bottom).toBeLessThan(720)
    expect(titleBounds.width).toBeGreaterThan(200)
  })

  test('localized case detail stays within mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const response = await page.goto('/zh/graduation/cases/CASE-018')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: '图片来源 · CC BY-SA 4.0' })).toBeVisible()

    const layout = await page.evaluate(() => ({
      bodyWidth: document.body.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      imageTop: Math.round(document.querySelector('main img')?.getBoundingClientRect().top ?? 0),
      imageLeft: Math.floor(document.querySelector('main img')?.getBoundingClientRect().left ?? 0),
      imageRight: Math.ceil(document.querySelector('main img')?.getBoundingClientRect().right ?? 0),
      imageWidth: Math.round(document.querySelector('main img')?.getBoundingClientRect().width ?? 0),
    }))

    expect(layout.bodyWidth).toBe(390)
    expect(layout.documentWidth).toBe(390)
    expect(layout.imageTop).toBeGreaterThan(250)
    expect(layout.imageLeft).toBeGreaterThanOrEqual(0)
    expect(layout.imageRight).toBeLessThanOrEqual(390)
    expect(layout.imageWidth).toBeGreaterThan(300)
  })

  test('canonical building and graduation analysis link to each other in all supported languages', async ({ page }) => {
    const labels = {
      zh: ['查看主体建筑的历史与资料', '查看分析'],
      en: ['Open canonical building history and sources', 'Open analysis'],
      ja: ['主体建築の歴史と資料を見る', '分析を見る'],
    } as const

    for (const lang of ['zh', 'en', 'ja'] as const) {
      const caseResponse = await page.goto(`/${lang}/graduation/cases/CASE-126`)
      expect(caseResponse?.status()).toBe(200)
      const caseImage = decodeURIComponent(decodeURIComponent(await page.locator('main img').first().getAttribute('src') || ''))
      expect(caseImage).toContain('case-126-metropol-parasol.jpg')
      await expect(page.getByRole('link', { name: new RegExp(labels[lang][0]) })).toHaveAttribute('href', `/${lang}/building/metropol-parasol`)

      const buildingResponse = await page.goto(`/${lang}/building/metropol-parasol`)
      expect(buildingResponse?.status()).toBe(200)
      const buildingImage = decodeURIComponent(decodeURIComponent(await page.locator('main img').first().getAttribute('src') || ''))
      expect(buildingImage).toContain('case-126-metropol-parasol.jpg')
      await expect(page.getByRole('link', { name: new RegExp(labels[lang][1]) })).toHaveAttribute('href', `/${lang}/graduation/cases/CASE-126`)
    }
  })
})
