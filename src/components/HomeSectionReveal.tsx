type HomeSectionRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  scale?: boolean
}

export default function HomeSectionReveal({ children, className }: HomeSectionRevealProps) {
  return (
    <div data-motion-scope="reveal" className={className}>
      {children}
    </div>
  )
}
