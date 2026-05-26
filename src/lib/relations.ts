/**
 * Architecture Knowledge OS — Relation Query Layer
 *
 * Builds knowledge graph connections between entities.
 * All queries are cached at request level via React cache().
 */

import { cache } from 'react'
import {
  getArchitects, getBuildings, getStyles, getEras,
  getBuildingImages,
  getArchitectBySlug, getBuildingBySlug,
} from '@/lib/data'
import { listMatchesTaxonomy, matchesTaxonomy } from '@/lib/taxonomy'
import type {
  ArchitectRelations, BuildingRelations, StyleRelations, EraRelations,
} from '@/lib/types'

// ============================================================
// Architect Relations
// ============================================================

export const getArchitectRelations = cache(async (slug: string): Promise<ArchitectRelations | null> => {
  const [architect, allArchs, allBuildings, allStyles, allEras] = await Promise.all([
    getArchitectBySlug(slug),
    getArchitects(),
    getBuildings(),
    getStyles(),
    getEras(),
  ])

  if (!architect) return null

  const buildings = allBuildings.filter(b => b.architect_slug === slug)
  const styles = allStyles.filter(s => listMatchesTaxonomy(architect.style_slugs, s))
  const era = allEras.find(e => matchesTaxonomy(architect.era_slug, e)) || null

  const influenceIds = new Set(architect.influences || [])
  const influencedIds = new Set(architect.influenced || [])
  const influencesList = allArchs.filter(a => influenceIds.has(a.slug))
  const influencedList = allArchs.filter(a => influencedIds.has(a.slug))

  const relatedIds = new Set([...influenceIds, ...influencedIds])
  const relatedArchitects = allArchs.filter(a =>
    a.slug !== slug && (
      relatedIds.has(a.slug) ||
      (era && matchesTaxonomy(a.era_slug, era)) ||
      architect.style_slugs?.some(s => a.style_slugs?.includes(s))
    )
  ).slice(0, 8)

  const relatedBuildings = allBuildings.filter(b =>
    b.architect_slug !== slug &&
    (b.architect_slug === slug ||
     b.style_slugs?.some(s => architect.style_slugs?.includes(s)))
  ).slice(0, 6)

  return { architect, styles, era, buildings, influencesList, influencedList, relatedArchitects, relatedBuildings }
})

// ============================================================
// Building Relations
// ============================================================

export const getBuildingRelations = cache(async (slug: string): Promise<BuildingRelations | null> => {
  const [building, allArchs, allBuildings, allStyles, allEras] = await Promise.all([
    getBuildingBySlug(slug),
    getArchitects(),
    getBuildings(),
    getStyles(),
    getEras(),
  ])

  if (!building) return null

  const architect = allArchs.find(a => a.slug === building.architect_slug) || null
  const styles = allStyles.filter(s => listMatchesTaxonomy(building.style_slugs, s))
  const era = allEras.find(e => matchesTaxonomy(building.era_slug, e)) || null
  const images = await getBuildingImages(building.id)

  const relatedBuildings = allBuildings.filter(b =>
    b.id !== building.id &&
    (b.architect_slug === building.architect_slug ||
     b.style_slugs?.some(s => building.style_slugs?.includes(s)) ||
     b.type_slug === building.type_slug)
  ).slice(0, 6)

  return { building, architect, styles, era, relatedBuildings, images }
})

// ============================================================
// Style Relations
// ============================================================

export const getStyleRelations = cache(async (slug: string): Promise<StyleRelations | null> => {
  const [allStyles, allArchs, allBuildings, allEras] = await Promise.all([
    getStyles(), getArchitects(), getBuildings(), getEras(),
  ])

  const style = allStyles.find(s => s.slug === slug)
  if (!style) return null

  const architects = allArchs.filter(a => listMatchesTaxonomy(a.style_slugs, style))
  const buildings = allBuildings.filter(b => listMatchesTaxonomy(b.style_slugs, style))
  const parentStyle = style.parent_slug ? allStyles.find(s => s.slug === style.parent_slug) || null : null
  const childStyles = allStyles.filter(s => s.parent_slug === slug)
  const era = style.era_slug ? allEras.find(e => e.slug === style.era_slug) || null : null

  return { style, architects, buildings, parentStyle, childStyles, era }
})

// ============================================================
// Era Relations
// ============================================================

export const getEraRelations = cache(async (slug: string): Promise<EraRelations | null> => {
  const [allEras, allStyles, allArchs, allBuildings] = await Promise.all([
    getEras(), getStyles(), getArchitects(), getBuildings(),
  ])

  const era = allEras.find(e => e.slug === slug)
  if (!era) return null

  const styles = allStyles.filter(s => s.era_slug === slug)
  const architects = allArchs.filter(a => matchesTaxonomy(a.era_slug, era))
  const buildings = allBuildings.filter(b => {
    const a = allArchs.find(x => x.slug === b.architect_slug)
    return matchesTaxonomy(b.era_slug, era) || matchesTaxonomy(a?.era_slug, era)
  })

  return { era, styles, architects, buildings }
})
