import { t } from '@/lib/i18n'
import type { Architect, Building } from '@/lib/types'
import PageShell from './PageShell'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import BuildingCard from './BuildingCard'
import ArchitectCard from './ArchitectCard'

export default function BrowseListing({ lang, displayName, description, architects, buildings, architectMap }: {
  lang: string
  displayName: string
  description?: string
  architects: Architect[]
  buildings: Building[]
  architectMap?: Map<string, string>
}) {
  return (
    <PageShell>
      <header className="section">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Browse path' : lang === 'ja' ? '閲覧経路' : '浏览路径'}</p>
        <h1 className="heading-display mb-3">{displayName}</h1>
        {description && <p className="body-large max-w-3xl">{description}</p>}
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
          <p className="label">{t(lang, 'architects')}</p>
          <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{architects.length}</p>
        </div>
        <div className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
          <p className="label">{t(lang, 'buildings')}</p>
          <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{buildings.length}</p>
        </div>
      </div>

      {architects.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={t(lang, 'architects')} description={lang === 'en' ? 'Figures connected to this browse path.' : lang === 'ja' ? 'この閲覧経路に関連する建築家。' : '与当前路径相关的建筑师。'} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {architects.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={t(lang, 'buildings')} description={lang === 'en' ? 'Works in this category.' : lang === 'ja' ? 'このカテゴリに含まれる作品。' : '属于当前分类的建筑作品。'} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {buildings.map(b => (
                <BuildingCard key={b.id} building={b} lang={lang}
                  architectName={architectMap?.get(b.architect_slug || '') || ''} />
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}
