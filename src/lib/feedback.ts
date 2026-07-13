export function sanitizeFeedbackPath(value: string | null | undefined, lang: string): string | null {
  if (!value || value.length > 300 || /[\\\u0000-\u001f]/.test(value)) return null
  const prefix = `/${lang}`
  if (value !== prefix && !value.startsWith(`${prefix}/`)) return null
  if (value.startsWith('//')) return null
  return value
}

export function buildFeedbackMailto({
  email,
  subject,
  body,
  pagePath,
}: {
  email: string
  subject: string
  body: string
  pagePath?: string | null
}) {
  const pageUrl = pagePath ? `https://archistory.app${pagePath}` : null
  const message = pageUrl ? `${body}\n\nPage: ${pageUrl}\n\n` : body
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}
