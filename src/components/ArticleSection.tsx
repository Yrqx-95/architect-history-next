interface ArticleSectionProps {
  id?: string
  title?: string
  children: React.ReactNode
  className?: string
}

/** A modular article section with optional anchor ID and heading. */
export default function ArticleSection({ id, title, children, className = '' }: ArticleSectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      {title && <h2 className="heading-3 mb-5">{title}</h2>}
      {children}
    </section>
  )
}
