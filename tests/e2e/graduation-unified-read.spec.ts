import { expect, test } from '@playwright/test'

test.describe('graduation Supabase + JSON dual read', () => {
  test('API exposes the reviewed unified subset and explicit image fallback diagnostics', async ({ request }) => {
    const response = await request.get('/api/v1/graduation/cases')
    expect(response.status()).toBe(200)
    const payload = await response.json()

    expect(payload.source).toBe('supabase+json')
    expect(payload.cases).toHaveLength(101)
    expect(payload.diagnostics.profileCount).toBe(74)
    expect(payload.diagnostics.unifiedCaseIds).toHaveLength(74)
    expect(payload.diagnostics.unifiedCaseIds).toEqual(expect.arrayContaining([
      'CASE-018',
      'CASE-021',
      'CASE-022',
      'CASE-023',
      'CASE-027',
      'CASE-029',
      'CASE-042',
      'CASE-070',
      'CASE-036',
      'CASE-076',
      'CASE-081',
      'CASE-092',
      'CASE-095',
      'CASE-096',
      'CASE-098',
      'CASE-101',
      'CASE-105',
      'CASE-112',
      'CASE-113',
      'CASE-114',
      'CASE-115',
      'CASE-130',
      'CASE-137',
      'CASE-041',
      'CASE-045',
      'CASE-047',
      'CASE-051',
      'CASE-052',
      'CASE-053',
      'CASE-054',
      'CASE-055',
      'CASE-057',
      'CASE-058',
      'CASE-060',
      'CASE-109',
      'CASE-117',
      'CASE-118',
      'CASE-122',
      'CASE-124',
      'CASE-132',
      'CASE-139',
      'CASE-008',
      'CASE-094',
      'CASE-133',
      'CASE-050',
      'CASE-056',
      'CASE-110',
      'CASE-111',
      'CASE-044',
      'CASE-038',
      'CASE-039',
      'CASE-074',
      'CASE-116',
    ]))
    expect(payload.diagnostics.unifiedCaseIds).not.toContain('CASE-079')
    expect(payload.diagnostics.missingFallbackCaseIds).toEqual([])
    expect(payload.diagnostics.missingBuildingCaseIds).toEqual([])
    expect(payload.diagnostics.canonicalImageCaseIds).toEqual([])
    expect(payload.diagnostics.fallbackImageCaseIds).toHaveLength(74)

    const libraryCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-018')
    expect(libraryCase).toMatchObject({
      name: '金泽海未来图书馆',
      location: '金泽 日本',
      year: 2011,
    })

    const alexandriaCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-113')
    expect(alexandriaCase).toMatchObject({
      name: '亚历山大图书馆',
      location: '亚历山大 埃及',
      year: 2002,
    })

    const hisayaCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-050')
    expect(hisayaCase).toMatchObject({
      name: '久屋大通公园',
      architect: 'TAISEI DESIGN + Nikken Sekkei',
      year: 2020,
    })

    const superkilenCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-111')
    expect(superkilenCase).toMatchObject({
      name: 'Superkilen 多元文化公园',
      architect: 'BIG + Topotek 1 + Superflex',
      year: 2012,
    })

    const nabeshimaCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-044')
    expect(nabeshimaCase).toMatchObject({
      name: '锅岛松涛公园厕所',
      architect: 'Kengo Kuma',
      year: 2021,
      image_license: 'CC BY-SA 4.0',
      image_credit: 'Photo: 鋸香具師 / Wikimedia Commons',
    })

    const bonusTrackCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-038')
    expect(bonusTrackCase).toMatchObject({
      name: '下北泽 BONUS TRACK',
      architect: 'TSUBAME ARCHITECTS',
      year: 2020,
      image_license: 'CC BY 4.0',
      image_credit: 'Photo: morinakayasuaki / Figure 3 in Hiroki Nakajima, Sustainability 17(17), MDPI',
    })

    const mikanCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-039')
    expect(mikanCase).toMatchObject({
      name: '下北泽 MIKAN SHIMOKITA',
      architect: 'Taiju Yamashita Design and Architecture',
      year: 2022,
      image_license: 'CC0',
      image_credit: 'Photo: Souka Kinmei / Wikimedia Commons',
    })

    const tSiteCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-074')
    expect(tSiteCase).toMatchObject({
      name: '代官山 T-SITE',
      architect: 'Klein Dytham architecture',
      year: 2011,
      image_license: 'CC BY-SA 2.0',
      image_credit: 'Photo: Jonathan Lin / Wikimedia Commons',
    })

    const markthalCase = payload.cases.find((item: { id: string }) => item.id === 'CASE-116')
    expect(markthalCase).toMatchObject({
      name: '鹿特丹市场大厅',
      architect: 'MVRDV',
      year: 2014,
      image_license: 'CC BY-SA 4.0',
      image_credit: 'Photo: Michielverbeek / Wikimedia Commons',
    })
  })

  test('CASE route keeps its ID while rendering canonical facts and the reviewed fallback image', async ({ page }) => {
    const response = await page.goto('/zh/graduation/cases/CASE-104')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { name: '西雅图中央图书馆' })).toBeVisible()
    await expect(page.getByText('西雅图 美国 · 2004')).toBeVisible()
    await expect(page.getByText('OMA + LMN Architects')).toBeVisible()
    await expect(page.getByRole('link', { name: '图片来源 · CC BY-SA 4.0' })).toBeVisible()

    const image = page.locator('main img')
    await expect(image).toHaveAttribute('alt', '西雅图中央图书馆')
    const src = await image.getAttribute('src')
    const decodedSrc = decodeURIComponent(decodeURIComponent(src || ''))
    expect(decodedSrc).toContain('Seattle_(WA,_USA),_Seattle_Central_Library')
  })
})
