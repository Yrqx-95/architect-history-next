import { expect, test } from '@playwright/test'

test.describe('core public routes', () => {
  test('home page returns 200', async ({ page }) => {
    const response = await page.goto('/zh')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/Archistory/)
    await expect(page.getByText('可浏览建筑', { exact: true })).toBeVisible()
  })

  test('learn page exposes the archive room', async ({ page }) => {
    const response = await page.goto('/zh/learn')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: '建筑资料馆' })).toBeVisible()
    await expect(page.getByRole('link', { name: '看建筑' })).toBeVisible()
    await expect(page.getByRole('link', { name: /萨伏伊别墅|Villa Savoye/ })).toBeVisible()
  })

  test('building detail returns 200 and missing building returns 404', async ({ page, request }) => {
    const response = await page.goto('/zh/building/villa-savoye', { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/萨伏伊别墅|Villa Savoye|Archistory/)
    await expect(page.getByRole('heading', { name: '继续阅读这座建筑' })).toBeVisible()

    const missing = await request.get('/zh/building/__missing-building__')
    expect(missing.status()).toBe(404)
  })

  test('building feedback carries the current page into the email draft', async ({ page }) => {
    await page.goto('/zh/building/villa-savoye', { waitUntil: 'domcontentloaded' })
    const reportLink = page.getByRole('link', { name: '反馈当前页面' })
    await expect(reportLink).toHaveAttribute('href', '/zh/feedback?from=%2Fzh%2Fbuilding%2Fvilla-savoye')
    await reportLink.click()

    await expect(page).toHaveURL(/\/zh\/feedback\?from=/)
    await expect(page.getByText('/zh/building/villa-savoye', { exact: true })).toBeVisible()
    const emailLink = page.getByRole('link', { name: '2505168-1350042@aoyamaseizu-st.ac.jp' })
    await expect(emailLink).toHaveAttribute('href', /https%3A%2F%2Farchistory\.app%2Fzh%2Fbuilding%2Fvilla-savoye/)
  })

  test('architect detail returns 200 and missing architect returns 404', async ({ page, request }) => {
    const response = await page.goto('/zh/architect/le-corbusier')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/柯布西耶|Le Corbusier|Archistory/)

    const missing = await request.get('/zh/architect/__missing-architect__')
    expect(missing.status()).toBe(404)
  })

  test('legacy misspelled Aravena route redirects to the canonical architect', async ({ request }) => {
    const response = await request.get('/zh/architect/alejandro-alavena', {
      maxRedirects: 0,
    })

    expect(response.status()).toBe(308)
    expect(response.headers().location).toContain('/zh/architect/aravena')
  })

  test('legacy raw Town House routes redirect to the canonical building slug', async ({ request }) => {
    const pageResponse = await request.get('/zh/building/q135641257', {
      maxRedirects: 0,
    })
    const apiResponse = await request.get('/api/v1/buildings/q135641257', {
      maxRedirects: 0,
    })

    expect(pageResponse.status()).toBe(308)
    expect(pageResponse.headers().location).toContain('/zh/building/kingston-university-town-house')
    expect(apiResponse.status()).toBe(308)
    expect(apiResponse.headers().location).toContain('/api/v1/buildings/kingston-university-town-house')
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

  test('search API unifies multilingual functions, graduation references and filters without duplicate buildings', async ({ request }) => {
    const responses = await Promise.all([
      request.get('/api/search?q=library'),
      request.get(`/api/search?q=${encodeURIComponent('图书馆')}`),
      request.get(`/api/search?q=${encodeURIComponent('図書館')}`),
      request.get('/api/search?function=library'),
    ])
    for (const response of responses) expect(response.status()).toBe(200)
    const payloads = await Promise.all(responses.map(response => response.json()))
    const slugSets = payloads.map(payload => payload.buildings.map((building: { slug: string }) => building.slug).sort())
    expect(slugSets[0]).toEqual(slugSets[1])
    expect(slugSets[0]).toEqual(slugSets[2])
    expect(slugSets[0]).toEqual(slugSets[3])
    expect(slugSets[0].length).toBeGreaterThan(20)
    expect(new Set(slugSets[0]).size).toBe(slugSets[0].length)

    const kanazawa = payloads[0].buildings.find((building: { slug: string }) => building.slug === 'kanazawa-umimirai-library')
    expect(kanazawa).toMatchObject({
      function_slugs: expect.arrayContaining(['library']),
      graduation_case_ids: expect.arrayContaining(['CASE-018']),
      perspectives: ['building', 'graduation-reference'],
    })

    const filtered = await request.get('/api/search?function=library&period=2010s&country=JP&issue=ISSUE-003')
    expect(filtered.status()).toBe(200)
    const filteredPayload = await filtered.json()
    expect(filteredPayload.buildings.some((building: { slug: string }) => building.slug === 'kanazawa-umimirai-library')).toBe(true)
    expect(filteredPayload.buildings.every((building: { country_code?: string; year_start?: number; function_slugs: string[]; graduation_issue_ids: string[] }) =>
      building.country_code === 'JP'
      && Boolean(building.year_start && building.year_start >= 2010 && building.year_start < 2020)
      && building.function_slugs.includes('library')
      && building.graduation_issue_ids.includes('ISSUE-003'))).toBe(true)
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
    await expect(page.getByRole('heading', { name: '从课题、敷地和事例开始考虑毕业设计' })).toBeVisible()
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

  test('homepage renders external portraits directly from the validated proxy', async ({ page }) => {
    await page.goto('/zh')
    const portrait = page.getByAltText('勒·柯布西耶肖像').first()
    await expect(portrait).toBeVisible()
    await expect.poll(() => portrait.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    const currentSrc = await portrait.evaluate(image => (image as HTMLImageElement).currentSrc)
    expect(currentSrc).toContain('/api/image-proxy?')
    expect(currentSrc).not.toContain('/_next/image?')
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
