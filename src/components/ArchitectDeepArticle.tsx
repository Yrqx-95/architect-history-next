import Link from 'next/link'
import BuildingCard from '@/components/BuildingCard'
import type { BuildingWithCover } from '@/lib/types'
import type { ArchitectContentOverlay } from '@/lib/architect-content'
import { localizedContent } from '@/lib/architect-content'
import { displayName } from '@/lib/types'

export default function ArchitectDeepArticle({
  content,
  lang,
  works,
}: {
  content: ArchitectContentOverlay
  lang: string
  works: BuildingWithCover[]
}) {
  const representativeWorks = content.representative_works
    .map(item => {
      const building = works.find(work => work.slug === item.slug)
      return building ? { ...item, building } : null
    })
    .filter(Boolean) as Array<(typeof content.representative_works)[number] & { building: BuildingWithCover }>

  const sourceTitle = lang === 'ja' ? '参考資料' : lang === 'en' ? 'Sources' : '参考资料'
  const worksTitle = lang === 'ja' ? '代表作の読み方' : lang === 'en' ? 'Representative works' : '代表作导读'
  const articleLabel = lang === 'ja' ? '建築家ノート' : lang === 'en' ? 'Architectural note' : '建筑师长文'
  const sectionLabel = lang === 'ja' ? '章' : lang === 'en' ? 'Sections' : '章节'

  return (
    <section className="section border-t border-subtle">

      {/* ============================================================
          Core Ideas — tight grid, editorial badge style
          ============================================================ */}
      {content.core_ideas.zh.length > 0 && (
        <div className="mb-16">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted mb-6">
            {lang === 'ja' ? '設計思想' : lang === 'en' ? 'Core ideas' : '核心思想'}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {localizedContent(content.core_ideas, lang).map((idea, i) => (
              <div key={i} className="group relative rounded-sm border border-subtle bg-surface px-5 py-4 shadow-semantic-card">
                <span className="absolute top-3 right-3 font-mono text-[0.6rem] text-soft opacity-40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed text-secondary">{idea}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          Article Sections — wide editorial band with scholar margins
          ============================================================ */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-10 lg:grid-cols-[9rem_minmax(0,48rem)_13rem] lg:gap-x-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 border-t border-subtle pt-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">{articleLabel}</p>
              <p className="mt-3 font-serif-display text-4xl leading-none text-soft tabular-nums">
                {String(content.sections.length).padStart(2, '0')}
              </p>
            </div>
          </aside>

          <div>
          {content.sections.map((section, sIdx) => (
            <article
              key={section.title.en}
              className={sIdx > 0 ? 'mt-16 pt-16 border-t border-subtle' : ''}
            >
              <p className="mb-4 font-mono text-xs text-muted tabular-nums lg:hidden">
                {String(sIdx + 1).padStart(2, '0')} / {String(content.sections.length).padStart(2, '0')}
              </p>
              <h2 className="mb-6 font-serif text-2xl leading-tight tracking-tight text-primary sm:text-3xl">
                {localizedContent(section.title, lang)}
              </h2>
              <div className="space-y-5">
                {localizedContent(section.paragraphs, lang).map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base leading-relaxed text-secondary sm:text-lg sm:leading-[1.75]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 border-t border-subtle pt-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">{sectionLabel}</p>
              <ol className="mt-4 space-y-3">
                {content.sections.map((section, idx) => (
                  <li key={section.title.en} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3">
                    <span className="font-mono text-[0.65rem] leading-relaxed text-soft tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs leading-relaxed text-muted">
                      {localizedContent(section.title, lang)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>

      {/* ============================================================
          Representative Works — asymmetric cards with notes
          ============================================================ */}
      {representativeWorks.length > 0 && (
        <div className="mt-20 border-t border-subtle pt-12">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted mb-8">
            {worksTitle}
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
            {representativeWorks.map(item => (
              <div key={item.slug} className="flex flex-col">
                <BuildingCard building={item.building} lang={lang} />
                <div className="mt-3 flex-1">
                  <p className="text-sm leading-relaxed text-secondary">{localizedContent(item.note, lang)}</p>
                </div>
                <Link
                  href={`/${lang}/building/${item.building.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                >
                  <span className="underline decoration-[color:var(--ui-border)] underline-offset-4">
                    {displayName(item.building, lang)}
                  </span>
                  <span aria-hidden="true" className="text-soft">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          Sources — simple list, 2-col grid
          ============================================================ */}
      {content.sources.length > 0 && (
        <div className="mt-14 border-t border-subtle pt-10">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted mb-5">
            {sourceTitle}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.sources.map(source => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed text-muted underline decoration-[color:var(--ui-border)] underline-offset-4 transition-colors hover:text-accent"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
