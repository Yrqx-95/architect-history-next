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

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=t;document.documentElement.classList.toggle('dark',d)})()`
        }} />
        {lang === 'zh' ? (
          <script dangerouslySetInnerHTML={{
            __html: `(function(){var c=localStorage.getItem('chineseScript')||'system';if(c!=='hans'&&c!=='hant'&&c!=='system')c='system';var langs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];var hant=langs.some(function(l){return /zh-(tw|hk|mo|hant)/i.test(l)});var s=c==='system'?(hant?'hant':'hans'):c;document.documentElement.dataset.zhScriptChoice=c;document.documentElement.dataset.zhScript=s})()`
          }} />
        ) : (
          <script dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.removeAttribute('data-zh-script-choice');document.documentElement.removeAttribute('data-zh-script')})()`
          }} />
        )}
        <script dangerouslySetInnerHTML={{
          __html: `window.__nextErrorLog=[];window.addEventListener('error',function(e){var info={message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,errorName:e.error?e.error.name:'',errorStack:e.error&&e.error.stack?e.error.stack.substring(0,1000):''};window.__nextErrorLog.push(info);console.error('[Diagnostic] JS Error:',JSON.stringify(info,null,2))})`
        }} />
      </head>
      <body className="min-h-screen bg-app font-sans text-primary antialiased">
        <ChineseScriptProvider lang={lang} />
        <SmoothScroll>
          {/* Desktop Nav */}
          <nav className="sticky top-0 z-50 border-b border-subtle bg-nav backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3 sm:gap-6">
              <Link href={prefix + '/'} className="shrink-0 text-base font-bold tracking-tight text-primary sm:text-lg">Archistory</Link>

              {/* Desktop links - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-4 sm:gap-6">
                <Link href={prefix + '/'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'home')}</Link>
                <Link href={prefix + '/browse'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'browse')}</Link>
                <Link href={prefix + '/timeline'} className="text-sm text-secondary transition-colors hover:text-primary">{t(lang, 'timeline')}</Link>
              </div>

              {/* Desktop search link */}
              <div className="hidden sm:block flex-1" />
              <Link href={prefix + '/search'} className="hidden items-center gap-1 text-sm text-secondary transition-colors hover:text-primary sm:flex">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                {t(lang, 'search')}
              </Link>

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
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'browse')}</h4>
                <div className="space-y-1.5">
                  <Link href={`${prefix}/browse`} className="block text-secondary transition-colors hover:text-primary">{t(lang, 'architects')}</Link>
                  <Link href={`${prefix}/browse`} className="block text-secondary transition-colors hover:text-primary">{t(lang, 'buildings')}</Link>
                  <Link href={`${prefix}/timeline`} className="block text-secondary transition-colors hover:text-primary">{t(lang, 'timeline')}</Link>
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
                <h4 className="mb-3 font-medium text-primary">{t(lang, 'search')}</h4>
                <div className="space-y-1.5">
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
