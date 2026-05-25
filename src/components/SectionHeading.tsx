interface SectionHeadingProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="heading-3">{title}</h2>
        {description && <p className="caption mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
