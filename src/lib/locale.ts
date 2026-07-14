export function isProbablySimplifiedChinese(text: string): boolean {
  return /建筑|现代|主义|文艺|复兴|单体|航站|空间|体验|垃圾|发电|滑雪|享乐|可持续|向阳|巨树|悬挑|阳台|从中心|登机口|安检|钢|混凝土|巨型柱|办公建筑|文化建筑|交通建筑|商业建筑|生态建筑|当代建筑|参数化设计|雕塑建筑|屋顶花园|自由平面|水平带窗|均匀漫射|室内|组织|设计|详细图纸|波尔图|葡萄牙|华盛顿|美国|广州|首尔|布拉格|捷克|韩国|法国|印度|西班牙|英国|哥本哈根|丹麦|圣路易斯|巴西利亚|巴西|罗马|梵蒂冈|芝加哥|直岛|覆盖穹顶|希腊十字|中央方形|侧翼|锥形窗洞|厚墙|错位|白色网格|每个胶囊|圆形窗|太空舱|框选|核心筒|预制胶囊|[现义艺复兴单间线动发电场乐阳树规则这与为门从达过机飞极效钢壳厅检径办务态雕塑尔华顿韩广岛层园绕长续围匀满细纸设顶侧腊锥墙错选预]/.test(text)
}

export function hasCjk(text?: string | null): boolean {
  return Boolean(text && /[\u3400-\u9fff]/.test(text))
}

export function formatCountryName(countryCode?: string | null, fallback?: string | null, lang = 'en'): string {
  if (countryCode) {
    try {
      const region = new Intl.DisplayNames([lang], { type: 'region' })
      return region.of(countryCode.toUpperCase()) || fallback || ''
    } catch {
      return fallback || countryCode.toUpperCase()
    }
  }
  if (lang === 'ja' && fallback && isProbablySimplifiedChinese(fallback)) return ''
  if (lang === 'en' && hasCjk(fallback)) return ''
  return fallback || ''
}
