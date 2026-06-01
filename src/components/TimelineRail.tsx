'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

type TimelineRailItem = {
  id: string
  href: string
  label: string
  meta: string
}

export default function TimelineRail({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: TimelineRailItem[]
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.max(280, el.clientWidth * 0.72), behavior: 'smooth' })
  }

  return (
    <section className="section-sm rounded-md border border-subtle bg-surface p-4 shadow-semantic-card sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">{title}</p>
          <p className="body-sm max-w-2xl">{description}</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle text-primary transition-colors hover:border-default hover:bg-surface-muted"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle text-primary transition-colors hover:border-default hover:bg-surface-muted"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className={`flex cursor-grab gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:thin] ${isDragging ? 'cursor-grabbing select-none' : ''}`}
        onMouseDown={event => {
          const el = scrollerRef.current
          if (!el) return
          setIsDragging(true)
          dragStart.current = { x: event.pageX, scrollLeft: el.scrollLeft }
        }}
        onMouseMove={event => {
          const el = scrollerRef.current
          if (!el || !isDragging) return
          event.preventDefault()
          el.scrollLeft = dragStart.current.scrollLeft - (event.pageX - dragStart.current.x)
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {items.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className="group min-w-[10.5rem] rounded-md border border-subtle bg-surface-raised px-4 py-3 transition-colors hover:border-default hover:bg-surface-muted"
          >
            <span className="block font-serif-display text-2xl leading-none text-primary transition-colors group-hover:text-accent">
              {item.label}
            </span>
            <span className="caption mt-2 block">{item.meta}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
