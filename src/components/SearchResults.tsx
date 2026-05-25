'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchInput from './search/SearchInput'
import SearchSuggestions from './search/SearchSuggestions'
import SearchSummary from './search/SearchSummary'
import SearchEmptyState from './search/SearchEmptyState'
import SearchArchitectResults from './search/SearchArchitectResults'
import SearchBuildingResults from './search/SearchBuildingResults'
import type { SearchData } from './search/types'

export default function SearchResults({ lang }: { lang: string }) {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(!!initialQ)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefix = `/${lang}`

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null)
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data)
    } catch {
      setResults(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialQ) doSearch(initialQ)
  }, [initialQ, doSearch])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleInput = (value: string) => {
    setQuery(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      doSearch(value)
      const url = new URL(window.location.href)
      if (value.trim()) url.searchParams.set('q', value)
      else url.searchParams.delete('q')
      window.history.replaceState({}, '', url.toString())
    }, 300)
  }

  const total = results ? results.architects.length + results.buildings.length : 0
  const showNone = searched && !loading && total === 0
  const showEmpty = !searched
  const suggestions = [
    { label: 'Le Corbusier', value: 'Le Corbusier' },
    { label: lang === 'ja' ? '東京' : lang === 'en' ? 'Tokyo' : '东京', value: lang === 'en' ? 'Tokyo' : '东京' },
    { label: lang === 'ja' ? '美術館' : lang === 'en' ? 'museum' : '博物馆', value: lang === 'en' ? 'museum' : '博物馆' },
    { label: 'modernism', value: 'modernism' },
  ]

  const applySuggestion = (value: string) => {
    setQuery(value)
    doSearch(value)
    const url = new URL(window.location.href)
    url.searchParams.set('q', value)
    window.history.replaceState({}, '', url.toString())
  }

  return (
    <>
      <SearchInput lang={lang} query={query} onQueryChange={handleInput} />
      <SearchSuggestions lang={lang} suggestions={suggestions} onSelect={applySuggestion} />

      {searched && !loading && total > 0 && (
        <SearchSummary lang={lang} total={total} />
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="skeleton h-5 w-32 mx-auto" />
        </div>
      )}

      {showEmpty && (
        <SearchEmptyState lang={lang} prefix={prefix} mode="empty" />
      )}

      {showNone && (
        <SearchEmptyState lang={lang} prefix={prefix} mode="no-results" />
      )}

      {results && <SearchArchitectResults lang={lang} prefix={prefix} architects={results.architects} />}
      {results && <SearchBuildingResults lang={lang} prefix={prefix} buildings={results.buildings} />}
    </>
  )
}
