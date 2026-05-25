import { NextResponse, type NextRequest } from 'next/server'

const LANGS = ['zh', 'en', 'ja'] as const
type Lang = (typeof LANGS)[number]

function hasLangPrefix(pathname: string) {
  const firstSegment = pathname.split('/')[1]
  return LANGS.includes(firstSegment as Lang)
}

function preferredLang(header: string | null): Lang {
  if (!header) return 'zh'

  const candidates = header
    .split(',')
    .map(part => {
      const [tag, qValue] = part.trim().split(';q=')
      return {
        lang: tag.toLowerCase().split('-')[0],
        q: qValue ? Number(qValue) : 1,
      }
    })
    .sort((a, b) => b.q - a.q)

  const match = candidates.find(candidate => LANGS.includes(candidate.lang as Lang))
  return (match?.lang as Lang | undefined) || 'zh'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (hasLangPrefix(pathname)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  const lang = preferredLang(request.headers.get('accept-language'))
  url.pathname = pathname === '/' ? `/${lang}` : `/${lang}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.svg|.*\\..*).*)'],
}
