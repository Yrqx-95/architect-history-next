import { expect, test } from '@playwright/test'
import { inflateSync } from 'node:zlib'

type DecodedPng = {
  width: number
  height: number
  rgba: Uint8Array
}

function decodePng(buffer: Buffer): DecodedPng {
  const signature = buffer.subarray(0, 8).toString('hex')
  expect(signature).toBe('89504e470d0a1a0a')

  let offset = 8
  let width = 0
  let height = 0
  let colorType = 0
  const idat: Buffer[] = []

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii')
    const data = buffer.subarray(offset + 8, offset + 8 + length)

    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      const bitDepth = data[8]
      colorType = data[9]
      expect(bitDepth).toBe(8)
      expect([2, 6]).toContain(colorType)
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') {
      break
    }

    offset += 12 + length
  }

  const bytesPerPixel = colorType === 6 ? 4 : 3
  const stride = width * bytesPerPixel
  const inflated = inflateSync(Buffer.concat(idat))
  const raw = new Uint8Array(height * stride)

  let readOffset = 0
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[readOffset]
    readOffset += 1
    const rowStart = y * stride

    for (let x = 0; x < stride; x += 1) {
      const value = inflated[readOffset + x]
      const left = x >= bytesPerPixel ? raw[rowStart + x - bytesPerPixel] : 0
      const up = y > 0 ? raw[rowStart + x - stride] : 0
      const upLeft = y > 0 && x >= bytesPerPixel ? raw[rowStart + x - stride - bytesPerPixel] : 0
      raw[rowStart + x] = (value + pngPredictor(filter, left, up, upLeft)) & 0xff
    }

    readOffset += stride
  }

  const rgba = new Uint8Array(width * height * 4)
  for (let i = 0, j = 0; i < raw.length; i += bytesPerPixel, j += 4) {
    rgba[j] = raw[i]
    rgba[j + 1] = raw[i + 1]
    rgba[j + 2] = raw[i + 2]
    rgba[j + 3] = colorType === 6 ? raw[i + 3] : 255
  }

  return { width, height, rgba }
}

function pngPredictor(filter: number, left: number, up: number, upLeft: number) {
  if (filter === 0) return 0
  if (filter === 1) return left
  if (filter === 2) return up
  if (filter === 3) return Math.floor((left + up) / 2)
  if (filter === 4) {
    const p = left + up - upLeft
    const pa = Math.abs(p - left)
    const pb = Math.abs(p - up)
    const pc = Math.abs(p - upLeft)
    if (pa <= pb && pa <= pc) return left
    if (pb <= pc) return up
    return upLeft
  }
  throw new Error(`Unsupported PNG filter ${filter}`)
}

function countDarkPixels(png: DecodedPng) {
  let count = 0
  for (let i = 0; i < png.rgba.length; i += 4) {
    const [r, g, b, a] = [png.rgba[i], png.rgba[i + 1], png.rgba[i + 2], png.rgba[i + 3]]
    if (a > 180 && r < 90 && g < 90 && b < 90) count += 1
  }
  return count
}

test.describe('graduation case detail rendering', () => {
  test('localized case detail paints title, image, and attribution on desktop', async ({ page }) => {
    const response = await page.goto('/zh/graduation/cases/CASE-033')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { name: 'Yu no Eki Ohyu' })).toBeVisible()
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

    expect(imageState.alt).toBe('Yu no Eki Ohyu')
    expect(imageState.src).toContain('case-033-yu-no-eki-ohyu.jpg')
    expect(imageState.naturalWidth).toBeGreaterThan(400)
    expect(imageState.naturalHeight).toBeGreaterThan(250)
    expect(imageState.clientWidth).toBeGreaterThan(300)

    await page.waitForTimeout(500)
    const titleRegion = await page.screenshot({
      clip: { x: 40, y: 100, width: 760, height: 150 },
    })
    expect(countDarkPixels(decodePng(titleRegion))).toBeGreaterThan(1000)
  })

  test('localized case detail stays within mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const response = await page.goto('/zh/graduation/cases/CASE-018')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { name: 'Kanazawa Umimirai Library' })).toBeVisible()
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
})
