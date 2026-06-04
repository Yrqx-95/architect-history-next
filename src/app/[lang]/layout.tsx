import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import '../globals.css'
import { t } from '@/lib/i18n'
import { getEras, getStyles } from '@/lib/data'
import { displayName } from '@/lib/types'
import ThemeToggle from '@/components/ThemeToggle'
import MobileNav from '@/components/MobileNav'
import PageTransition from '@/components/PageTransition'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SmoothScroll from '@/components/SmoothScroll'
import ChineseScriptProvider from '@/components/ChineseScriptProvider'
import ChineseScriptToggle from '@/components/ChineseScriptToggle'

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
  const topStyles = styles.slice(0, 6)
  const exploreLinks = [
    { href: `${prefix}/browse`, label: t(lang, 'architects') },
    { href: `${prefix}/browse`, label: t(lang, 'buildings') },
    { href: `${prefix}/browse`, label: t(lang, 'styles') },
    { href: `${prefix}/graph`, label: lang === 'en' ? 'Movements' : lang === 'ja' ? '運動' : 'Movements' },
    { href: `${prefix}/browse/country`, label: lang === 'en' ? 'Countries / Regions' : lang === 'ja' ? '国・地域' : 'Countries / Regions' },
  ]
  const learnLinks = [
    { href: `${prefix}/code`, label: t(lang, 'code') },
    { href: `${prefix}/glossary`, label: t(lang, 'glossary') },
  ]
  const comingSoonLabel = lang === 'en' ? 'Coming Soon' : lang === 'ja' ? '準備中' : '即将推出'

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=t;document.documentElement.classList.toggle('dark',d)})()`
        }} />
        {lang === 'zh' && (
          <script dangerouslySetInnerHTML={{
            __html: `(function(){var c=localStorage.getItem('chineseScript')||'system';if(c!=='hans'&&c!=='hant'&&c!=='system')c='system';var langs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];var hant=langs.some(function(l){return /zh-(tw|hk|mo|hant)/i.test(l)});var s=c==='system'?(hant?'hant':'hans'):c;document.documentElement.dataset.zhScriptChoice=c;document.documentElement.dataset.zhScript=s})()`
          }} />
        )}
      </head>
      <body className="min-h-screen bg-app font-sans text-primary antialiased">
        <ChineseScriptProvider lang={lang} />
        <SmoothScroll>
          {/* Desktop Nav */}
          <nav className="sticky top-0 z-50 border-b border-subtle bg-nav">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3 sm:gap-6">
              <Link href={prefix + '/'} className="shrink-0 text-base font-bold tracking-tight text-primary sm:text-lg">Archistory</Link>

              {/* Desktop links - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-5">
                <div className="group relative">
                  <Link href={prefix + '/browse'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'explore')}</Link>
                  <div className="invisible absolute left-0 top-full z-20 w-60 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-subtle bg-surface-raised p-3 shadow-semantic-card">
                      {exploreLinks.map(item => (
                        <Link key={item.label} href={item.href} className="block border-b border-subtle px-2 py-2.5 text-sm text-secondary transition-colors last:border-b-0 hover:text-primary">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={prefix + '/code'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'code')}</Link>
                <Link href={prefix + '/glossary'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'glossary')}</Link>
                <Link href={prefix + '/timeline'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'timeline')}</Link>
                <Link href={prefix + '/search'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'search')}</Link>
              </div>

              <div className="hidden sm:block flex-1" />

              {/* Right side controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                <div className="hidden items-center gap-2 sm:flex">
                  <ChineseScriptToggle lang={lang} />
                  <ThemeToggle labels={{
                    system: lang === 'en' ? 'System' : lang === 'ja' ? '自動' : '系统',
                    dark: t(lang, 'dark'),
                    light: t(lang, 'light'),
                  }} />
                </div>
                <LanguageSwitcher lang={lang} />
                {/* Mobile nav trigger */}
                <MobileNav lang={lang} />
              </div>
            </div>
          </nav>

          <main className="container-wide py-4 sm:py-8 overflow-x-hidden"><PageTransition>{children}</PageTransition></main>

          <footer className="mt-14 border-t border-subtle py-8 sm:mt-20 sm:py-10">
            <div className="container-wide grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-sm">
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'explore')}</h4>
                <div className="space-y-1.5">
                  {exploreLinks.map(item => (
                    <Link key={item.label} href={item.href} className="block text-secondary transition-colors hover:text-primary">{item.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'eras')}</h4>
                <div className="space-y-1.5">
                  {topEras.map(e => (
                    <Link key={e.id} href={`${prefix}/browse/era/${e.slug}`} className="block text-secondary transition-colors hover:text-primary">{displayName(e, lang)}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'styles')}</h4>
                <div className="space-y-1.5">
                  {topStyles.map(s => (
                    <Link key={s.id} href={`${prefix}/browse/style/${s.slug}`} className="block text-secondary transition-colors hover:text-primary">{displayName(s, lang)}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'learn')}</h4>
                <div className="space-y-1.5">
                  {learnLinks.map(item => (
                    <Link key={item.label} href={item.href} className="block text-secondary transition-colors hover:text-primary">{item.label}</Link>
                  ))}
                  <span className="block text-muted">{t(lang, 'exam')} · {comingSoonLabel}</span>
                  <Link href={`${prefix}/timeline`} className="block text-secondary transition-colors hover:text-primary">{t(lang, 'timeline')}</Link>
                  <Link href={`${prefix}/search`} className="block text-secondary transition-colors hover:text-primary">{t(lang, 'searchPlaceholder')}</Link>
                  <p className="caption mt-3">Archistory &copy; 2026<br />{t(lang, 'siteName')}</p>
                </div>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  )
}
