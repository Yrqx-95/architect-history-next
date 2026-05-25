export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-warm-300 dark:border-charcoal-500 pl-6 py-2 my-8">
      <p className="pullquote">{children}</p>
    </blockquote>
  )
}
