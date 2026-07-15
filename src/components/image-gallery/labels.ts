export function getImageGalleryLabels(lang: string) {
  return {
    sourceLabel: lang === 'ja' ? '出典' : lang === 'zh' ? '来源' : 'Source',
    unavailableLabel: lang === 'ja' ? '画像はありません' : lang === 'zh' ? '图片暂不可用' : 'Image unavailable',
    noSafeImageTitle: lang === 'ja' ? '確認済みの安全な主画像はありません' : lang === 'zh' ? '暂无已确认的安全主图' : 'No reviewed safe primary image',
    noSafeImageDescription: lang === 'ja'
      ? 'この建築の画像は、主体と出典を確認できるまで表示していません。'
      : lang === 'zh'
        ? '在确认图片主体与来源之前，这里的图片暂不显示。'
        : 'Images are withheld until the subject and source can be confirmed.',
    viewLabel: lang === 'ja' ? '画像を拡大' : lang === 'zh' ? '查看大图' : 'View full size',
    imageLabel: lang === 'ja' ? '画像' : lang === 'zh' ? '图片' : 'Image',
    photosLabel: lang === 'ja' ? '枚' : lang === 'zh' ? '张图片' : 'photos',
    closeLabel: lang === 'ja' ? '閉じる' : lang === 'zh' ? '关闭' : 'Close',
    previousLabel: lang === 'ja' ? '前の画像' : lang === 'zh' ? '上一张图片' : 'Previous image',
    nextLabel: lang === 'ja' ? '次の画像' : lang === 'zh' ? '下一张图片' : 'Next image',
    keyboardHint: lang === 'ja'
      ? '← → で移動 · Esc で閉じる'
      : lang === 'zh'
        ? '← → 切换 · Esc 关闭'
        : '← → to navigate · Esc to close',
  }
}
