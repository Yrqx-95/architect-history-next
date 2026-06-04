import Link from 'next/link'
import type { LocalizedLearningTopic } from '@/lib/learning-topics'

type LearningTopicCardProps = {
  topic: LocalizedLearningTopic
  href: string
  compact?: boolean
}

export default function LearningTopicCard({ topic, href, compact = false }: LearningTopicCardProps) {
  return (
    <Link
      href={href}
      className={`group block border-t border-subtle transition-colors hover:border-default ${compact ? 'py-4' : 'py-5'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
            {topic.japaneseTerm}（{topic.reading}）
          </p>
          <h3 className="mt-3 text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">
            {topic.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-subtle px-2.5 py-1 text-[0.68rem] text-muted">
          {topic.level}
        </span>
      </div>
      {!compact && <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-secondary">{topic.summary}</p>}
    </Link>
  )
}
