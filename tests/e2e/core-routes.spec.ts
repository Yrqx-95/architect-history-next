import { expect, test } from '@playwright/test'

test.describe('core public routes', () => {
  test('home page returns 200', async ({ page }) => {
    const response = await page.goto('/zh')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/Archistory/)
  })

  test('learn page exposes the archive room', async ({ page }) => {
    const response = await page.goto('/zh/learn')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: '建筑资料馆' })).toBeVisible()
    await expect(page.getByRole('link', { name: '看建筑' })).toBeVisible()
    await expect(page.getByRole('link', { name: /萨伏伊别墅|Villa Savoye/ })).toBeVisible()
  })

  test('building detail returns 200 and missing building returns 404', async ({ page, request }) => {
    const response = await page.goto('/zh/building/villa-savoye')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/萨伏伊别墅|Villa Savoye|Archistory/)
    await expect(page.getByRole('heading', { name: '继续阅读这座建筑' })).toBeVisible()

    const missing = await request.get('/zh/building/__missing-building__')
    expect(missing.status()).toBe(404)
  })

  test('architect detail returns 200 and missing architect returns 404', async ({ page, request }) => {
    const response = await page.goto('/zh/architect/le-corbusier')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/柯布西耶|Le Corbusier|Archistory/)

    const missing = await request.get('/zh/architect/__missing-architect__')
    expect(missing.status()).toBe(404)
  })

  test('fallback building and architect copy is disclosed as introductory guidance', async ({ page }) => {
    await page.goto('/zh/building/auerbacher-home')
    await expect(page.getByTestId('content-maturity-note')).toContainText('入门导读')

    await page.goto('/zh/architect/aldo-rossi')
    await expect(page.getByTestId('content-maturity-note')).toContainText('入门导读')

    await page.goto('/zh/building/church-of-light')
    await expect(page.getByTestId('content-maturity-note')).toHaveCount(0)
  })

  test('manually reviewed building content exposes its institutional source', async ({ page }) => {
    await page.goto('/zh/building/acropolis-museum')
    await expect(page.getByTestId('content-maturity-note')).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Acropolis Museum: The Museum Building' })).toHaveAttribute(
      'href',
      'https://www.theacropolismuseum.gr/en/museum-building'
    )
  })

  test('search API returns matching building results', async ({ request }) => {
    const response = await request.get('/api/search?q=villa%20savoye')
    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data.buildings)).toBe(true)
    expect(data.buildings.some((building: { slug?: string }) => building.slug === 'villa-savoye')).toBe(true)

    const overlong = await request.get(`/api/search?q=${'a'.repeat(121)}`)
    expect(overlong.status()).toBe(400)
  })

  test('unpromoted archive routes remain accessible but are not indexed', async ({ page }) => {
    const mapResponse = await page.goto('/zh/map')
    expect(mapResponse?.status()).toBe(200)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')

    const pathsResponse = await page.goto('/zh/paths')
    expect(pathsResponse?.status()).toBe(200)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('knowledge OS API returns building claims and grounding evidence', async ({ request }) => {
    const buildingResponse = await request.get('/api/v1/buildings/villa-savoye?lang=zh')
    expect(buildingResponse.status()).toBe(200)

    const building = await buildingResponse.json()
    expect(building.entity.slug).toBe('villa-savoye')
    expect(Array.isArray(building.sources)).toBe(true)
    expect(Array.isArray(building.claims)).toBe(true)
    expect(building.claims.some((claim: { predicate?: string; citations?: unknown[] }) =>
      claim.predicate === 'completion_year' && Array.isArray(claim.citations) && claim.citations.length > 0
    )).toBe(true)

    const groundingResponse = await request.post('/api/v1/grounding/query', {
      data: { query: 'Villa Savoye', lang: 'zh' },
    })
    expect(groundingResponse.status()).toBe(200)

    const grounding = await groundingResponse.json()
    expect(grounding.answerable).toBe(true)
    expect(grounding.resolved_entities[0].entity_id).toBe('villa-savoye')
    expect(grounding.evidence_bundle.length).toBeGreaterThan(0)
    expect(grounding.evidence_bundle[0].citations.length).toBeGreaterThan(0)
  })

  test('graduation inspiration submenu routes render library content', async ({ page }) => {
    const response = await page.goto('/zh/graduation')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: '不知道做什么，也可以先看日本正在发生的问题' })).toBeVisible()
    await expect(page.getByRole('link', { name: '进入社会问题页' })).toBeVisible()
    await expect(page.getByRole('link', { name: '老师资料' })).toBeVisible()

    await page.getByRole('link', { name: '进入社会问题页' }).click()
    await expect(page).toHaveURL(/\/zh\/graduation\/issues/)
    await expect(page.getByText('独居高龄者与社区断裂')).toBeVisible()

    await page.getByText('详细筛选', { exact: true }).click()
    await page.getByLabel('场地ID').selectOption('SITE-002')
    await expect(page).toHaveURL(/siteType=SITE-002/)
    await expect(page.getByText('儿童放学后照护与社区安全')).toBeVisible()
    await expect(page.getByText('独居高龄者与社区断裂')).toHaveCount(0)

    await page.getByLabel('场地ID').selectOption('')
    await page.getByText('详细筛选', { exact: true }).click()
    await page.getByLabel('建筑类型').selectOption('社区厨房')
    await expect(page).toHaveURL(/buildingType=%E7%A4%BE%E5%8C%BA%E5%8E%A8%E6%88%BF/)
    await expect(page.getByText('地域食与社区厨房')).toBeVisible()
    await expect(page.getByText('儿童放学后照护与社区安全')).toHaveCount(0)

    await page.goto('/zh/graduation/issues?siteType=SITE-002')
    await expect(page.getByLabel('场地ID')).toHaveValue('SITE-002')
    await expect(page.getByText('儿童放学后照护与社区安全')).toBeVisible()
    await expect(page.getByText('独居高龄者与社区断裂')).toHaveCount(0)

    await page.goto('/zh/graduation/issues/ISSUE-001')
    await expect(page.getByRole('heading', { name: '独居高龄者与社区断裂' })).toBeVisible()
    await expect(page.getByRole('heading', { name: '推荐场地类型' })).toBeVisible()

    await page.goto('/zh/graduation/random')
    await expect(page.getByRole('heading', { name: '随机入口' })).toBeVisible()
    await expect(page.getByRole('button', { name: '再来一次' })).toBeVisible()
  })

  test('graduation routes return 404 for unknown or unpublished content', async ({ request }) => {
    const [unknownSection, unknownIssue, unpublishedSite, unknownCase] = await Promise.all([
      request.get('/zh/graduation/__missing-section__'),
      request.get('/zh/graduation/issues/__missing-issue__'),
      request.get('/zh/graduation/sites/SITE-021'),
      request.get('/zh/graduation/cases/__missing-case__'),
    ])

    expect(unknownSection.status()).toBe(404)
    expect(unknownIssue.status()).toBe(404)
    expect(unpublishedSite.status()).toBe(404)
    expect(unknownCase.status()).toBe(404)
  })

  test('graduation public data exports are reachable', async ({ request }) => {
    const issuesJson = await request.get('/data/graduation/issues.json')
    expect(issuesJson.status()).toBe(200)
    const issues = await issuesJson.json()
    expect(Array.isArray(issues)).toBe(true)
    expect(issues.length).toBe(100)
    expect(issues.some((issue: { id?: string }) => issue.id === 'ISSUE-060')).toBe(true)
    expect(issues.some((issue: { id?: string }) => issue.id === 'ISSUE-070')).toBe(true)
    expect(issues.some((issue: { id?: string }) => issue.id === 'ISSUE-100')).toBe(true)

    const siteTypesCsv = await request.get('/data/graduation/site_types.csv')
    expect(siteTypesCsv.status()).toBe(200)
    const siteTypesCsvText = await siteTypesCsv.text()
    expect(siteTypesCsvText).toContain('id,name,name_ja,name_en,address_example,address_example_ja,address_example_en')
    expect(siteTypesCsvText).toContain('candidate_locations_json,status')

    const casesCsv = await request.get('/data/graduation/cases.csv')
    expect(casesCsv.status()).toBe(200)
    const casesCsvText = await casesCsv.text()
    expect(casesCsvText).toContain('CASE-001,Share Kanazawa')
    expect(casesCsvText).toContain('CASE-060,Fukuda Art Museum')
    expect(casesCsvText).toContain('CASE-070,Tonami Public Library')
    expect(casesCsvText).toContain('CASE-100,Portland Japanese Garden Cultural Village')
  })

  test('graduation research list persists a saved issue', async ({ page }) => {
    await page.goto('/zh/graduation/issues/ISSUE-001')
    await page.evaluate(() => window.localStorage.removeItem('archistory:graduation-research:v1'))
    await page.reload()

    await page.getByRole('button', { name: '加入研究清单' }).click()
    await expect(page.getByRole('button', { name: /研究清单 1/ })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('button', { name: /研究清单 1/ })).toBeVisible()

    await page.getByRole('button', { name: /研究清单 1/ }).click()
    await expect(page.getByRole('dialog', { name: /研究清单/ })).toContainText('独居高龄者与社区断裂')
    await page.getByRole('link', { name: '查看完整研究清单' }).click()
    await expect(page).toHaveURL(/\/zh\/graduation\/research/)
    await expect(page.getByRole('heading', { name: '我的研究清单' })).toBeVisible()
    await expect(page.getByText('独居高龄者与社区断裂')).toBeVisible()
  })

  test('image proxy rejects untrusted domains and accepts trusted image domains', async ({ request }) => {
    const invalid = await request.get('/api/image-proxy?url=not-a-url')
    expect(invalid.status()).toBe(400)

    const rejected = await request.get('/api/image-proxy?url=https%3A%2F%2Fexample.com%2Fimage.jpg')
    expect(rejected.status()).toBe(403)

    const accepted = await request.get('/api/image-proxy?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580418827493-f2b22c0a76cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D32%26q%3D20')
    expect(accepted.status()).toBe(200)
    expect(accepted.headers()['content-type']).toMatch(/^image\//)
  })

  test('root route redirects according to Accept-Language', async ({ request }) => {
    const response = await request.get('/', {
      headers: { 'accept-language': 'ja,en;q=0.8,zh;q=0.7' },
      maxRedirects: 0,
    })

    expect(response.status()).toBe(307)
    expect(response.headers().location).toContain('/ja')
  })
})
