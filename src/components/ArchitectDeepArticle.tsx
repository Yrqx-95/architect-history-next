import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import ImageAttribution from '@/components/ImageAttribution'
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
  const articleTitle = lang === 'ja' ? '建築家ノート' : lang === 'en' ? 'Architectural note' : '建筑师长文'
  const worksTitle = lang === 'ja' ? '代表作の読み方' : lang === 'en' ? 'Representative works' : '代表作导读'

  return (
    <section className="section border-t border-subtle pt-10 sm:pt-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <div className="flow">
          <div>
            <p className="eyebrow mb-3">{articleTitle}</p>
            <p className="body-large max-w-3xl">{localizedContent(content.summary, lang)}</p>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {content.sections.map(section => (
              <article key={section.title.en} className="max-w-3xl">
                <h2 className="heading-3 mb-4">{localizedContent(section.title, lang)}</h2>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                  {localizedContent(section.paragraphs, lang).map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <figure className="overflow-hidden rounded-md border border-subtle bg-surface shadow-semantic-card">
            <div className="relative aspect-[4/5] bg-surface-muted">
              <SafeImage
                src={content.portrait.url}
                alt={localizedContent(content.portrait.alt, lang)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 18rem"
              />
            </div>
            <figcaption className="space-y-2 px-3.5 py-3">
              <p className="caption">{localizedContent(content.portrait.alt, lang)}</p>
              <ImageAttribution
                photographer={content.portrait.author}
                license={content.portrait.license}
                sourceUrl={content.portrait.source_url}
                tone="dark"
              />
            </figcaption>
          </figure>
        </aside>
      </div>

      {content.core_ideas.zh.length > 0 && (
        <div className="mt-12">
          <h2 className="heading-3 mb-5">{lang === 'ja' ? '設計思想' : lang === 'en' ? 'Core ideas' : '核心思想'}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {localizedContent(content.core_ideas, lang).map(idea => (
              <div key={idea} className="rounded-md border border-subtle bg-surface px-5 py-4 body-sm shadow-semantic-card">
                {idea}
              </div>
            ))}
          </div>
        </div>
      )}

      {representativeWorks.length > 0 && (
        <div className="mt-12 border-t border-subtle pt-10 sm:pt-12">
          <h2 className="heading-3 mb-6">{worksTitle}</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {representativeWorks.map(item => (
              <div key={item.slug} className="flow-sm">
                <BuildingCard building={item.building} lang={lang} />
                <p className="body-sm">{localizedContent(item.note, lang)}</p>
                <Link href={`/${lang}/building/${item.building.slug}`} className="text-xs text-muted transition-colors hover:text-accent">
                  {displayName(item.building, lang)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.sources.length > 0 && (
        <div className="mt-12 border-t border-subtle pt-8">
          <h2 className="heading-4 mb-4">{sourceTitle}</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.sources.map(source => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="body-sm underline decoration-[color:var(--ui-border)] underline-offset-4 transition-colors hover:text-accent">
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
