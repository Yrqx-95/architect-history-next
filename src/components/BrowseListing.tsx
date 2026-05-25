import { t } from '@/lib/i18n'
import type { Architect, Building } from '@/lib/types'
import PageShell from './PageShell'
import Badge from './Badge'
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
      <h1 className="heading-1 mb-2">{displayName}</h1>
      {description && <p className="text-sm text-stone-400 mb-8">{description}</p>}

      <div className="flex items-center gap-3 mb-8 text-sm">
        <Badge active>{architects.length} {t(lang, 'architects')}</Badge>
        <Badge active>{buildings.length} {t(lang, 'buildings')}</Badge>
      </div>

      {architects.length > 0 && (
        <Reveal>
          <section className="mb-10 sm:mb-12">
            <SectionHeading title={t(lang, 'architects')} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {architects.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section>
            <SectionHeading title={t(lang, 'buildings')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
