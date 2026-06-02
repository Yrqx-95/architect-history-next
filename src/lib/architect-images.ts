import overrides from '@/lib/architect-image-overrides.json'
import type { ContentLang } from '@/lib/architect-content'

export interface ArchitectImageOverride {
  url: string
  author: string
  license: string
  source_url: string
  wikidata_id?: string
  alt: Record<ContentLang, string>
}

const architectImageOverrides = overrides as Record<string, ArchitectImageOverride>

export function getArchitectImageOverride(slug: string): ArchitectImageOverride | null {
  return architectImageOverrides[slug] || null
}

export function listArchitectImageOverrides() {
  return architectImageOverrides
}
