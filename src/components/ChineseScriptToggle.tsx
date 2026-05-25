'use client'

import { useEffect, useState } from 'react'
import {
  getChineseScriptChoice,
  getResolvedChineseScript,
  setChineseScript,
  subscribeChineseScript,
  type ChineseScriptChoice,
} from '@/components/ChineseScriptProvider'

const OPTIONS: Array<{ value: ChineseScriptChoice; label: string }> = [
  { value: 'system', label: '系统' },
  { value: 'hans', label: '简' },
  { value: 'hant', label: '繁' },
]

export default function ChineseScriptToggle({ lang, compact = false }: { lang: string; compact?: boolean }) {
  const [choice, setChoice] = useState<ChineseScriptChoice>('system')
  const [resolved, setResolved] = useState('hans')

  useEffect(() => {
    if (lang !== 'zh') return

    const sync = () => {
      setChoice(getChineseScriptChoice())
      setResolved(getResolvedChineseScript())
    }

    sync()
    return subscribeChineseScript(sync)
  }, [lang])

  if (lang !== 'zh') return null

  return (
    <div className={`inline-flex rounded-full border border-default bg-surface-muted p-0.5 text-xs text-muted shadow-semantic-card ${compact ? 'w-full' : ''}`} aria-label="中文简繁">
      {OPTIONS.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => setChineseScript(option.value)}
          className={`min-h-8 rounded-full px-2.5 transition-colors ${compact ? 'flex-1' : 'sm:px-3'} ${
            choice === option.value
              ? 'bg-surface-raised text-primary shadow-subtle'
              : 'hover:bg-surface hover:text-primary'
          }`}
          aria-pressed={choice === option.value}
          title={option.value === 'system' ? `跟随系统：当前${resolved === 'hant' ? '繁体' : '简体'}` : option.label}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
