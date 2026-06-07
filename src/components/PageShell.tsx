interface PageShellProps {
  children: React.ReactNode
  className?: string
  width?: 'content' | 'archive'
}

export default function PageShell({ children, className = '', width = 'content' }: PageShellProps) {
  const containerClass = width === 'archive' ? 'container-wide' : 'container-content'

  return (
    <div className={`${containerClass} page-enter pb-8 sm:pb-12 ${className}`}>
      {children}
    </div>
  )
}
