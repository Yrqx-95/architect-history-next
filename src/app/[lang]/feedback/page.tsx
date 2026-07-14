import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import PageShell from '@/components/PageShell'
import FeedbackContactCard from '@/components/FeedbackContactCard'

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
    contextLabel: '正在反馈的页面',
    deliveryNote: '按钮会打开本机邮件客户端并自动带入页面链接；也可以复制上面的邮箱地址。',
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
    contextLabel: 'Page being reported',
    deliveryNote: 'This button opens your email app with the page URL filled in. You can also copy the address above.',
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
    contextLabel: '報告するページ',
    deliveryNote: 'ボタンを押すとページURLを入力した状態でメールアプリが開きます。上のアドレスをコピーすることもできます。',
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
  return (
    <PageShell>
      <section className="section-sm grid gap-8 border-b border-subtle pb-10 pt-0 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <Link href={`${prefix}/`} className="caption transition-colors hover:text-primary">← {copy.back}</Link>
          <p className="eyebrow mt-6">{copy.eyebrow}</p>
          <h1 className="mt-4 heading-display">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">{copy.intro}</p>
        </div>
        <Suspense fallback={<div className="min-h-32 rounded-md border border-subtle bg-surface p-5 shadow-subtle" />}>
          <FeedbackContactCard
            lang={lang}
            email={copy.email}
            subject={copy.subject}
            body={copy.body}
            emailLabel={copy.emailLabel}
            deliveryNote={copy.deliveryNote}
            contextLabel={copy.contextLabel}
            notes={copy.notes}
          />
        </Suspense>
      </section>
    </PageShell>
  )
}
