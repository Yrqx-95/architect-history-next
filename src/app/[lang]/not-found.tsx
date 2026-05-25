import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-6xl font-bold text-stone-200 dark:text-stone-700 mb-4">404</h1>
      <p className="text-xl text-stone-500 mb-8">Page not found / 页面未找到</p>
      <div className="flex justify-center gap-3">
        <Link href="/zh" className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm hover:opacity-80">中文首页</Link>
        <Link href="/en" className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm hover:opacity-80">English Home</Link>
        <Link href="/ja" className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm hover:opacity-80">日本語</Link>
      </div>
    </div>
  )
}
