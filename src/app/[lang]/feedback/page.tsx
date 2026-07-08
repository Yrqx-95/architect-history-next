import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/PageShell'

const COPY = {
  zh: {
    title: '反馈',
    eyebrow: 'Archistory / Feedback',
    intro: '发现错图、错字、资料缺口，或者希望加入新的建筑家和作品，都可以从这里联系维护者。',
    emailLabel: '发送邮件',
    email: '2505168-1350042@aoyamaseizu-st.ac.jp',
    subject: 'Archistory 反馈',
    body: '请写下页面链接、问题内容，以及你希望我们如何修改：',
    back: '返回首页',
    notes: ['页面链接', '问题描述', '可参考的资料或图片来源'],
    deliveryNote: '请确认域名邮箱已经配置收信；如果尚未配置，这个按钮只会打开邮件客户端。',
  },
  en: {
    title: 'Feedback',
    eyebrow: 'Archistory / Feedback',
    intro: 'Use this route to report wrong images, typos, missing sources, or suggestions for architects and works to add.',
    emailLabel: 'Send email',
    email: '2505168-1350042@aoyamaseizu-st.ac.jp',
    subject: 'Archistory feedback',
    body: 'Please include the page URL, the issue, and the change you suggest:',
    back: 'Back home',
    notes: ['Page URL', 'What is wrong or missing', 'Reference source or image link'],
    deliveryNote: 'Make sure the domain mailbox is configured to receive mail; otherwise this button only opens an email draft.',
  },
  ja: {
    title: 'フィードバック',
    eyebrow: 'Archistory / Feedback',
    intro: '画像の誤り、表記の修正、資料の不足、追加してほしい建築家や作品があれば、このページから連絡できます。',
    emailLabel: 'メールを送る',
    email: '2505168-1350042@aoyamaseizu-st.ac.jp',
    subject: 'Archistory フィードバック',
    body: 'ページURL、問題点、希望する修正内容を書いてください：',
    back: 'ホームに戻る',
    notes: ['ページURL', '問題点または不足内容', '参考資料や画像リンク'],
    deliveryNote: 'ドメインメールの受信設定を確認してください。未設定の場合、このボタンはメール作成画面を開くだけです。',
  },
}

function copyFor(lang: string) {
  return COPY[lang as keyof typeof COPY] || COPY.zh
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const copy = copyFor(lang)
  return {
    title: copy.title,
    description: copy.intro,
  }
}

export default async function FeedbackPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const copy = copyFor(lang)
  const prefix = `/${lang}`
  const href = `mailto:${copy.email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.body)}`

  return (
    <PageShell>
      <section className="section-sm grid gap-8 border-b border-subtle pb-10 pt-4 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <Link href={`${prefix}/`} className="caption transition-colors hover:text-primary">← {copy.back}</Link>
          <p className="eyebrow mt-6">{copy.eyebrow}</p>
          <h1 className="mt-4 heading-display">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">{copy.intro}</p>
        </div>
        <div className="rounded-md border border-subtle bg-surface p-5 shadow-subtle">
          <p className="label">{copy.emailLabel}</p>
          <a href={href} className="mt-4 inline-flex rounded-full bg-[color:var(--ui-text-primary)] px-5 py-3 text-sm font-medium text-inverse transition-opacity hover:opacity-85">
            {copy.email}
          </a>
          <p className="mt-4 text-xs leading-relaxed text-muted">{copy.deliveryNote}</p>
          <div className="mt-6 grid gap-2">
            {copy.notes.map(note => (
              <p key={note} className="border-t border-subtle py-2.5 text-sm text-secondary">{note}</p>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
