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

const LANGS = ['zh', 'en', 'ja'] as const

export const metadata: Metadata = {
  title: { default: 'Architect History', template: '%s | Architect History' },
  description: 'Explore important buildings, architects, and spatial ideas from architectural history. 探索世界建筑史中的重要建筑、建筑师与空间思想。',
  metadataBase: new URL('https://architect-history-next.vercel.app'),
  openGraph: {
    title: 'Architect History — World Architecture Archive',
    description: '63+ architects · 350+ buildings · Analysis in 3 languages. A curated database of architectural history.',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Architect History',
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
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){if(localStorage.getItem('theme')==='light'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme:light)').matches)){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})()`
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__nextErrorLog=[];window.addEventListener('error',function(e){var info={message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,errorName:e.error?e.error.name:'',errorStack:e.error&&e.error.stack?e.error.stack.substring(0,1000):''};window.__nextErrorLog.push(info);console.error('[Diagnostic] JS Error:',JSON.stringify(info,null,2))})`
        }} />
      </head>
      <body className="bg-paper-100 dark:bg-charcoal-950 text-warm-700 dark:text-warm-200 font-sans min-h-screen antialiased">
        <SmoothScroll>
          {/* Desktop Nav */}
          <nav className="sticky top-0 z-50 bg-paper-100/90 dark:bg-charcoal-900/90 backdrop-blur border-b border-warm-200/40 dark:border-charcoal-700/40">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3 sm:gap-6">
              <Link href={prefix + '/'} className="font-bold text-base sm:text-lg tracking-tight dark:text-white shrink-0">Arch History</Link>

              {/* Desktop links - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-4 sm:gap-6">
                <Link href={prefix + '/'} className="text-sm hover:text-stone-600 dark:hover:text-stone-300">{t(lang, 'home')}</Link>
                <Link href={prefix + '/browse'} className="text-sm hover:text-stone-600 dark:hover:text-stone-300">{t(lang, 'browse')}</Link>
                <Link href={prefix + '/timeline'} className="text-sm hover:text-stone-600 dark:hover:text-stone-300">{t(lang, 'timeline')}</Link>
              </div>

              {/* Desktop search link */}
              <div className="hidden sm:block flex-1" />
              <Link href={prefix + '/search'} className="hidden sm:flex items-center gap-1 text-sm text-warm-600 transition-colors hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                {t(lang, 'search')}
              </Link>

              {/* Right side controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                <ThemeToggle labels={{ dark: t(lang, 'dark'), light: t(lang, 'light') }} />
                <LanguageSwitcher lang={lang} />
                {/* Mobile nav trigger */}
                <MobileNav lang={lang} />
              </div>
            </div>
          </nav>

          <main className="container-wide py-4 sm:py-8 overflow-x-hidden"><PageTransition>{children}</PageTransition></main>

          <footer className="border-t border-warm-200/50 dark:border-charcoal-700/50 mt-14 sm:mt-20 py-8 sm:py-10">
            <div className="container-wide grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-sm">
              <div>
                <h4 className="font-medium mb-3 text-warm-700 dark:text-paper-100">{t(lang, 'browse')}</h4>
                <div className="space-y-1.5">
                  <Link href={`${prefix}/browse`} className="block text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">{t(lang, 'architects')}</Link>
                  <Link href={`${prefix}/browse`} className="block text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">{t(lang, 'buildings')}</Link>
                  <Link href={`${prefix}/timeline`} className="block text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">{t(lang, 'timeline')}</Link>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-warm-700 dark:text-paper-100">{t(lang, 'eras')}</h4>
                <div className="space-y-1.5">
                  {topEras.map(e => (
                    <Link key={e.id} href={`${prefix}/browse/era/${e.slug}`} className="block text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">{displayName(e, lang)}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-warm-700 dark:text-paper-100">{t(lang, 'styles')}</h4>
                <div className="space-y-1.5">
                  {topStyles.map(s => (
                    <Link key={s.id} href={`${prefix}/browse/style/${s.slug}`} className="block text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">{displayName(s, lang)}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-warm-700 dark:text-paper-100">{t(lang, 'search')}</h4>
                <div className="space-y-1.5">
                  <Link href={`${prefix}/search`} className="block text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">{t(lang, 'searchPlaceholder')}</Link>
                  <p className="caption mt-3">{t(lang, 'siteName')} &copy; 2026</p>
                </div>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  )
}
