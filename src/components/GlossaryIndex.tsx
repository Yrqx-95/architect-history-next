'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { GlossaryCategory, GlossaryTerm } from '@/lib/glossary'
import { getGlossaryRelatedTopicLabel, getGlossaryTermDefinition, getGlossaryTermTitle } from '@/lib/glossary'

type GlossaryIndexProps = {
  terms: GlossaryTerm[]
  lang: string
  prefix: string
  initialTerm?: string
}

const CATEGORY_ORDER: GlossaryCategory[] = ['code', 'planning', 'area', 'road', 'height', 'fire', 'environment', 'building-part', 'use']

const COPY = {
  zh: {
    search: '搜索术语',
    searchPlaceholder: '输入日语、中文、英文或读音...',
    all: '全部',
    related: '相关',
    noResults: '没有找到匹配术语。',
    japanese: '日语',
    categories: {
      code: '法规概念',
      planning: '规划与用途',
      area: '面积',
      road: '道路',
      height: '高度',
      fire: '防火',
      environment: '环境',
      'building-part': '建筑部位',
      use: '用途',
    },
  },
  en: {
    search: 'Search terms',
    searchPlaceholder: 'Search Japanese, English, Chinese, or reading...',
    all: 'All',
    related: 'Related',
    noResults: 'No matching terms.',
    japanese: 'Japanese',
    categories: {
      code: 'Code Concepts',
      planning: 'Planning & Use',
      area: 'Area',
      road: 'Road',
      height: 'Height',
      fire: 'Fire Safety',
      environment: 'Environment',
      'building-part': 'Building Parts',
      use: 'Use',
    },
  },
  ja: {
    search: '用語を検索',
    searchPlaceholder: '日本語、英語、中国語、読みで検索...',
    all: 'すべて',
    related: '関連',
    noResults: '該当する用語がありません。',
    japanese: '日本語',
    categories: {
      code: '法規概念',
      planning: '都市計画・用途',
      area: '面積',
      road: '道路',
      height: '高さ',
      fire: '防火',
      environment: '環境',
      'building-part': '建築部位',
      use: '用途',
    },
  },
} satisfies Record<string, {
  search: string
  searchPlaceholder: string
  all: string
  related: string
  noResults: string
  japanese: string
  categories: Record<GlossaryCategory, string>
}>

function copyFor(lang: string) {
  return COPY[lang as keyof typeof COPY] || COPY.zh
}

function secondaryTerms(term: GlossaryTerm, lang: string) {
  if (lang === 'ja') return [term.termEn, term.termZh].filter(Boolean).join(' / ')
  if (lang === 'en') return term.termZh
  return term.termEn
}

function matchesTerm(term: GlossaryTerm, value: string) {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return false
  return [
    term.id,
    term.slug,
    term.termJa,
    term.reading,
    term.termZh,
    term.termEn,
    ...(term.searchKeywords || []),
  ].some(item => item.toLowerCase() === normalized)
}

export default function GlossaryIndex({ terms, lang, prefix, initialTerm = '' }: GlossaryIndexProps) {
  const copy = copyFor(lang)
  const [query, setQuery] = useState(initialTerm)
  const [category, setCategory] = useState<GlossaryCategory | 'all'>('all')
  const deepLinkedSlug = initialTerm || null

  const categories = useMemo(() => CATEGORY_ORDER.filter(item => terms.some(term => term.category === item)), [terms])
  const normalizedQuery = query.trim().toLowerCase()
  const filteredTerms = useMemo(() => {
    return terms.filter(term => {
      const categoryMatch = category === 'all' || term.category === category
      if (!categoryMatch) return false
      if (!normalizedQuery) return true
      return [
        term.id,
        term.slug,
        term.termJa,
        term.reading,
        term.termZh,
        term.termEn,
        term.shortDefinitionZh,
        term.shortDefinitionJa,
        term.shortDefinitionEn,
        ...(term.searchKeywords || []),
      ].some(value => value.toLowerCase().includes(normalizedQuery))
    })
  }, [category, normalizedQuery, terms])

  return (
    <section className="section">
      <div className="grid gap-4 border-y border-subtle py-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-end">
        <div>
          <label htmlFor="glossary-search" className="label">{copy.search}</label>
          <input
            id="glossary-search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="mt-3 min-h-12 w-full rounded-full border border-default bg-surface-raised px-5 text-base text-primary shadow-semantic-card placeholder:text-muted focus:border-default focus:outline-none focus:ring-2 focus:ring-[color:var(--ui-focus)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${category === 'all' ? 'border-default bg-[color:var(--ui-text-primary)] text-inverse' : 'border-subtle bg-surface-raised text-secondary hover:bg-surface-muted hover:text-primary'}`}
          >
            {copy.all}
          </button>
          {categories.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${category === item ? 'border-default bg-[color:var(--ui-text-primary)] text-inverse' : 'border-subtle bg-surface-raised text-secondary hover:bg-surface-muted hover:text-primary'}`}
            >
              {copy.categories[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-x-8 border-b border-subtle md:grid-cols-2">
        {filteredTerms.map(term => {
          const title = getGlossaryTermTitle(term, lang)
          const secondary = secondaryTerms(term, lang)
          const isDeepLinked = Boolean(deepLinkedSlug && matchesTerm(term, deepLinkedSlug))
          return (
            <article
              key={term.id}
              id={term.slug}
              className={`scroll-mt-28 border-t border-subtle py-6 transition-colors ${isDeepLinked ? 'bg-surface-muted px-4 sm:-mx-4' : ''}`}
            >
              <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_8rem]">
                <div>
                  <p className="eyebrow">{copy.categories[term.category]}</p>
                  <h2 className="mt-3 text-2xl font-medium leading-tight text-primary">{title}</h2>
                  <div className="mt-3 space-y-1 text-sm text-muted">
                    <p>{copy.japanese}: {term.termJa}（{term.reading}）</p>
                    {secondary && <p>{secondary}</p>}
                  </div>
                </div>
                {term.relatedCodeTopicSlug && (
                  <Link
                    href={`${prefix}/code/${term.relatedCodeTopicSlug}`}
                    className="inline-flex min-h-10 items-center justify-center self-start rounded-full border border-subtle bg-surface-raised px-3 text-xs font-medium text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
                  >
                    {copy.related}: {getGlossaryRelatedTopicLabel(term, lang)}
                  </Link>
                )}
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-secondary">
                {getGlossaryTermDefinition(term, lang)}
              </p>
            </article>
          )
        })}
      </div>

      {filteredTerms.length === 0 && (
        <p className="border-b border-subtle py-10 text-sm text-muted">{copy.noResults}</p>
      )}
    </section>
  )
}
