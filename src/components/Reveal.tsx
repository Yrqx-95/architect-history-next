interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function Reveal({ children, className }: RevealProps) {
  return (
    <div data-motion-scope="reveal" className={className}>
      {children}
    </div>
  )
}
