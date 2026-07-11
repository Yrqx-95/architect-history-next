import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import '../globals.css'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import { t } from '@/lib/i18n'
import { getEras, getStyles } from '@/lib/data'
import { displayName } from '@/lib/display'
import MobileNav from '@/components/MobileNav'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ChineseScriptProvider from '@/components/ChineseScriptProvider'
import ChineseScriptToggle from '@/components/ChineseScriptToggle'
import SystemThemeSync from '@/components/SystemThemeSync'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

const LANGS = ['zh', 'en', 'ja'] as const

export const metadata: Metadata = {
  title: { default: 'Archistory', template: '%s | Archistory' },
  description: 'Archistory is an online archive of architecture, people, and time. 建筑、人物与时代的在线档案。',
  metadataBase: new URL('https://archistory.app'),
  openGraph: {
    title: 'Archistory — Architecture in Time',
    description: 'An online archive of architecture, people, and time.',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Archistory',
  },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }))
}

export default async function LangLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = LANGS.includes(rawLang as (typeof LANGS)[number]) ? rawLang : 'zh'
  const prefix = `/${lang}`
  const [eras, styles] = await Promise.all([getEras(), getStyles()])
  const topEras = eras.slice(0, 6)
  const topStyles = styles
    .map(style => ({ style, label: displayTaxonomyName(style, lang) }))
    .filter(item => item.label)
    .slice(0, 6)
  const archiveLinks = [
    { href: `${prefix}/browse/architects`, label: t(lang, 'architects') },
    { href: `${prefix}/browse/buildings`, label: t(lang, 'buildings') },
    { href: `${prefix}/browse/style`, label: t(lang, 'styles') },
    { href: `${prefix}/browse/country`, label: lang === 'en' ? 'Countries / Regions' : lang === 'ja' ? '国・地域' : '国家与地区' },
  ]
  const learnLinks = [
    { href: `${prefix}/glossary`, label: t(lang, 'glossary') },
    { href: `${prefix}/timeline`, label: t(lang, 'timeline') },
    { href: `${prefix}/graph`, label: lang === 'en' ? 'Relations' : lang === 'ja' ? '関係図' : '关系图' },
  ]
  const studyLabel = lang === 'en' ? 'Study' : lang === 'ja' ? '学ぶ' : '学习'
  const feedback = { href: `${prefix}/feedback`, label: feedbackLabel(lang) }
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var m=window.matchMedia('(prefers-color-scheme:dark)');document.documentElement.classList.toggle('dark',m.matches)})()`
        }} />
        {lang === 'zh' && (
          <script dangerouslySetInnerHTML={{
            __html: `(function(){var c=localStorage.getItem('chineseScript')||'system';if(c!=='hans'&&c!=='hant'&&c!=='system')c='system';var langs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];var hant=langs.some(function(l){return /zh-(tw|hk|mo|hant)/i.test(l)});var s=c==='system'?(hant?'hant':'hans'):c;document.documentElement.dataset.zhScriptChoice=c;document.documentElement.dataset.zhScript=s})()`
          }} />
        )}
      </head>
      <body className="min-h-screen bg-app font-sans text-primary antialiased">
        <SystemThemeSync />
        <ScrollRevealProvider />
        <ChineseScriptProvider lang={lang} />
        {/* Desktop Nav */}
          <nav className="fixed inset-x-0 top-0 z-[80] border-b border-subtle bg-nav shadow-subtle">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3 sm:gap-6">
              <Link href={prefix + '/'} className="inline-flex min-h-10 shrink-0 items-center text-base font-bold tracking-tight text-primary sm:text-lg">Archistory</Link>

              {/* Desktop links - hidden on mobile */}
              <div className="hidden xl:flex items-center gap-5">
                <Link href={prefix + '/search'} className="inline-flex min-h-10 min-w-9 items-center justify-center px-1 text-sm font-medium text-primary transition-colors hover:text-accent">{t(lang, 'search')}</Link>
                <div className="group relative">
                  <Link href={prefix + '/browse'} className="inline-flex min-h-10 min-w-9 items-center justify-center px-1 text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'browse')}</Link>
                  <div className="invisible absolute left-0 top-full z-20 w-60 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-subtle bg-surface-raised p-3 shadow-semantic-card">
                      {archiveLinks.map(item => (
                        <Link key={item.label} href={item.href} className="block border-b border-subtle px-2 py-2.5 text-sm text-secondary transition-colors last:border-b-0 hover:text-primary">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={prefix + '/graduation'} className="inline-flex min-h-10 min-w-9 items-center justify-center px-1 text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'graduation')}</Link>
                <div className="group relative">
                  <Link href={prefix + '/code'} className="inline-flex min-h-10 min-w-9 items-center justify-center px-1 text-sm text-secondary transition-colors hover:text-primary">{studyLabel}</Link>
                  <div className="invisible absolute left-0 top-full z-20 w-60 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-subtle bg-surface-raised p-3 shadow-semantic-card">
                      {learnLinks.map(item => (
                        <Link key={item.label} href={item.href} className="block border-b border-subtle px-2 py-2.5 text-sm text-secondary transition-colors last:border-b-0 hover:text-primary">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden flex-1 xl:block" />

              {/* Right side controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                <div className="hidden items-center gap-2 xl:flex">
                  <ChineseScriptToggle lang={lang} />
                </div>
                <LanguageSwitcher lang={lang} />
                {/* Mobile nav trigger */}
                <MobileNav lang={lang} />
              </div>
            </div>
          </nav>

          <main className="container-wide pt-20 pb-4 sm:pt-24 sm:pb-8">{children}</main>

          <footer className="mt-10 border-t border-subtle py-6 sm:mt-14 sm:py-8">
            <div className="container-wide grid grid-cols-2 gap-6 text-sm sm:grid-cols-4 sm:gap-8">
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'browse')}</h4>
                <div className="space-y-1.5">
                  {archiveLinks.map(item => (
                    <Link key={item.label} href={item.href} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{item.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'eras')}</h4>
                <div className="space-y-1.5">
                  {topEras.map(e => (
                    <Link key={e.id} href={`${prefix}/browse/era/${e.slug}`} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{displayName(e, lang)}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'styles')}</h4>
                <div className="space-y-1.5">
                  {topStyles.map(({ style, label }) => (
                    <Link key={style.id} href={`${prefix}/browse/style/${style.slug}`} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-primary">{studyLabel}</h4>
                <div className="space-y-1.5">
                  <Link href={`${prefix}/code`} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{t(lang, 'code')}</Link>
                  {learnLinks.map(item => (
                    <Link key={item.label} href={item.href} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{item.label}</Link>
                  ))}
                  <Link href={`${prefix}/search`} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{t(lang, 'search')}</Link>
                  <Link href={`${prefix}/graduation`} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{t(lang, 'graduation')}</Link>
                  <Link href={feedback.href} className="flex min-h-9 items-center text-secondary transition-colors hover:text-primary">{feedback.label}</Link>
                  <p className="caption mt-3">Archistory &copy; 2026<br />{t(lang, 'siteName')}</p>
                </div>
              </div>
            </div>
          </footer>
      </body>
    </html>
  )
}

function feedbackLabel(lang: string) {
  if (lang === 'ja') return 'フィードバック'
  if (lang === 'en') return 'Feedback'
  return '反馈'
}
