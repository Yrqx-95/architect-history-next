'use client'

export default function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  return (
    <button
      className="text-sm px-3 py-1 rounded-full bg-warm-100 dark:bg-charcoal-800 hover:bg-warm-200 dark:hover:bg-charcoal-700 transition-colors text-warm-600 dark:text-warm-300"
      onClick={() => {
        const html = document.documentElement
        const isDark = html.classList.contains('dark')
        if (isDark) { html.classList.remove('dark'); localStorage.setItem('theme', 'light') }
        else { html.classList.add('dark'); localStorage.setItem('theme', 'dark') }
      }}
    >
      <span className="dark:hidden">{labels.dark}</span>
      <span className="hidden dark:inline">{labels.light}</span>
    </button>
  )
}
