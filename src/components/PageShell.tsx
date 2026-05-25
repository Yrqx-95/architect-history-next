interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`container-content page-enter pb-8 sm:pb-12 ${className}`}>
      {children}
    </div>
  )
}
