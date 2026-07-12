import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { fetchAll, ROOT } from './supabase-script-utils.ts'

const batchKey = process.env.GRADUATION_REVIEW_BATCH || 'library-002'
const batchConfigs = {
  'library-002': {
    batch_id: 'graduation-library-batch-002',
    decision_path: 'db/review-decisions/graduation-new-buildings-library-002.json',
    output_path: 'db/review-packets/graduation-library-batch-002.json',
    apply_path: 'db/manual-operations/graduation-library-batch-002-apply.sql',
    rollback_path: 'db/manual-operations/graduation-library-batch-002-rollback.sql',
    expected_decisions: 14,
    expected_excluded: ['CASE-079'],
    primary_function: 'library',
    interior_case_ids: ['CASE-095', 'CASE-130'],
    sql_title: 'Graduation library batch 002',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs',
    required_functions_note: 'library, community-center, museum and mixed-use functions remain active',
  },
  'museum-001': {
    batch_id: 'graduation-museum-batch-001',
    decision_path: 'db/review-decisions/graduation-new-buildings-museum-001.json',
    output_path: 'db/review-packets/graduation-museum-batch-001.json',
    apply_path: 'db/manual-operations/graduation-museum-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-museum-batch-001-rollback.sql',
    expected_decisions: 14,
    expected_excluded: [],
    primary_function: 'museum',
    interior_case_ids: ['CASE-118'],
    sql_title: 'Graduation museum batch 001',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs (GRADUATION_REVIEW_BATCH=museum-001)',
    required_functions_note: 'museum, library and mixed-use functions remain active',
  },
  'theatre-001': {
    batch_id: 'graduation-theatre-batch-001',
    decision_path: 'db/review-decisions/graduation-new-buildings-theatre-001.json',
    output_path: 'db/review-packets/graduation-theatre-batch-001.json',
    apply_path: 'db/manual-operations/graduation-theatre-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-theatre-batch-001-rollback.sql',
    expected_decisions: 4,
    expected_excluded: ['CASE-091'],
    primary_function: 'theatre',
    interior_case_ids: [],
    sql_title: 'Graduation theatre batch 001',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs (GRADUATION_REVIEW_BATCH=theatre-001)',
    required_functions_note: 'theatre and mixed-use functions remain active',
  },
  'community-civic-001': {
    batch_id: 'graduation-community-civic-batch-001',
    decision_path: 'db/review-decisions/graduation-new-buildings-community-civic-001.json',
    output_path: 'db/review-packets/graduation-community-civic-batch-001.json',
    apply_path: 'db/manual-operations/graduation-community-civic-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-community-civic-batch-001-rollback.sql',
    expected_decisions: 1,
    expected_excluded: ['CASE-019', 'CASE-064', 'CASE-067', 'CASE-069', 'CASE-088'],
    primary_function: 'community-center',
    interior_case_ids: [],
    sql_title: 'Graduation community civic batch 001',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs (GRADUATION_REVIEW_BATCH=community-civic-001)',
    required_functions_note: 'community-center, theatre and mixed-use functions remain active',
  },
  'transport-001': {
    batch_id: 'graduation-transport-batch-001',
    decision_path: 'db/review-decisions/graduation-new-buildings-transport-001.json',
    output_path: 'db/review-packets/graduation-transport-batch-001.json',
    apply_path: 'db/manual-operations/graduation-transport-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-transport-batch-001-rollback.sql',
    expected_decisions: 3,
    expected_excluded: [],
    primary_function: 'transport-hub',
    interior_case_ids: [],
    sql_title: 'Graduation transport batch 001',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs (GRADUATION_REVIEW_BATCH=transport-001)',
    required_functions_note: 'transport-hub and mixed-use functions remain active',
  },
  'public-space-001': {
    batch_id: 'graduation-public-space-batch-001',
    decision_path: 'db/review-decisions/graduation-new-buildings-public-space-001.json',
    output_path: 'db/review-packets/graduation-public-space-batch-001.json',
    apply_path: 'db/manual-operations/graduation-public-space-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-public-space-batch-001-rollback.sql',
    expected_decisions: 4,
    expected_excluded: ['CASE-014'],
    primary_function: 'public-space',
    interior_case_ids: [],
    sql_title: 'Graduation public space batch 001',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs (GRADUATION_REVIEW_BATCH=public-space-001)',
    required_functions_note: 'public-space and mixed-use functions remain active',
  },
  'public-toilet-001': {
    batch_id: 'graduation-public-toilet-batch-001',
    decision_path: 'db/review-decisions/graduation-new-buildings-public-toilet-001.json',
    output_path: 'db/review-packets/graduation-public-toilet-batch-001.json',
    apply_path: 'db/manual-operations/graduation-public-toilet-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-public-toilet-batch-001-rollback.sql',
    expected_decisions: 1,
    expected_excluded: ['CASE-031', 'CASE-049'],
    primary_function: 'public-toilet',
    interior_case_ids: [],
    sql_title: 'Graduation public toilet batch 001',
    generator_name: 'scripts/prepare-graduation-library-batch-002.mjs (GRADUATION_REVIEW_BATCH=public-toilet-001)',
    required_functions_note: 'public-toilet and public-space functions remain active',
  },
}
const batchConfig = batchConfigs[batchKey]
if (!batchConfig) throw new Error(`Unknown graduation review batch: ${batchKey}`)

const OUTPUT_JSON = path.join(ROOT, batchConfig.output_path)
const APPLY_SQL = path.join(ROOT, batchConfig.apply_path)
const ROLLBACK_SQL = path.join(ROOT, batchConfig.rollback_path)
const UUID_NAMESPACE = 'b5f08bf3-2cd7-5f6b-8b53-630d3e630c9e'

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function sqlText(value) {
  return `'${String(value).replaceAll("'", "''")}'`
}

function sqlNullable(value) {
  return value === null || value === undefined || value === '' ? 'NULL' : sqlText(value)
}

function sqlTextArray(values) {
  return values?.length ? `ARRAY[${values.map(sqlText).join(', ')}]::text[]` : "'{}'::text[]"
}

function uuidV5(name, namespace = UUID_NAMESPACE) {
  const namespaceBytes = Buffer.from(namespace.replaceAll('-', ''), 'hex')
  const hash = crypto.createHash('sha1').update(namespaceBytes).update(name).digest().subarray(0, 16)
  hash[6] = (hash[6] & 0x0f) | 0x50
  hash[8] = (hash[8] & 0x3f) | 0x80
  const hex = hash.toString('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function refuseReviewedOutputOverwrite() {
  if (process.env.ALLOW_REVIEW_OUTPUT_OVERWRITE === '1') return
  const existing = [OUTPUT_JSON, APPLY_SQL, ROLLBACK_SQL].filter(filePath => fs.existsSync(filePath))
  if (!existing.length) return
  throw new Error(`Refusing to overwrite reviewed outputs: ${existing.map(filePath => path.relative(ROOT, filePath)).join(', ')}`)
}

const architectDrafts = {
  'coelacanth-associates-nagoya': {
    name_zh: 'Coelacanth and Associates Nagoya',
    name_en: 'Coelacanth and Associates Nagoya',
    name_ja: 'シーラカンスアンドアソシエイツナゴヤ',
    official_url: 'https://www.c-and-a.co.jp/en/',
  },
  'unemori-architects': {
    name_zh: '畷森泰行建筑设计事务所',
    name_en: 'UNEMORI ARCHITECTS',
    name_ja: '畷森泰行建築設計事務所',
    official_url: 'https://unemori-archi.com/',
  },
  'mitsuru-senda-environment-design-institute': {
    name_zh: '仙田满／环境设计研究所',
    name_en: 'Mitsuru Senda / Environment Design Institute',
    name_ja: '仙田満／環境デザイン研究所',
    official_url: 'https://www.ms-edi.co.jp/',
  },
  'ala-architects': {
    name_zh: 'ALA 建筑事务所', name_en: 'ALA Architects', name_ja: 'ALA Architects', official_url: 'https://ala.fi/',
  },
  'schmidt-hammer-lassen': {
    name_zh: '施密特·哈姆·拉森', name_en: 'Schmidt Hammer Lassen', name_ja: 'シュミット・ハンマー・ラッセン', official_url: 'https://www.shl.dk/',
  },
  'lundhagem-atelier-oslo': {
    name_zh: 'Lundhagem + Atelier Oslo', name_en: 'Lundhagem + Atelier Oslo', name_ja: 'Lundhagem + Atelier Oslo', official_url: 'https://www.lundhagem.no/',
  },
  'alsop-stormer': {
    name_zh: 'Alsop and Störmer', name_en: 'Alsop and Störmer', name_ja: 'Alsop and Störmer', official_url: 'https://www.southwark.gov.uk/culture-and-sport/libraries/find-library/peckham-library',
  },
  snohetta: {
    name_zh: 'Snøhetta', name_en: 'Snøhetta', name_ja: 'スノヘッタ', official_url: 'https://www.snohetta.com/',
  },
  'civic-architects': {
    name_zh: 'Civic Architects', name_en: 'Civic Architects', name_ja: 'Civic Architects', official_url: 'https://www.civicarchitects.eu/',
  },
  'adjaye-associates': {
    name_zh: 'Adjaye Associates', name_en: 'Adjaye Associates', name_ja: 'Adjaye Associates', official_url: 'https://www.adjaye.com/',
  },
  mecanoo: {
    name_zh: 'Mecanoo', name_en: 'Mecanoo', name_ja: 'メカノー', official_url: 'https://www.mecanoo.nl/',
  },
  'hiroshi-sambuichi': {
    name_zh: '三分一博志', name_en: 'Hiroshi Sambuichi', name_ja: '三分一博志', official_url: 'https://benesse-artsite.jp/en/art/seirensho.html',
  },
  'ryue-nishizawa': {
    name_zh: '西泽立卫', name_en: 'Ryue Nishizawa', name_ja: '西沢立衛', official_url: 'https://towadaartcenter.com/en/about/',
  },
  'nikken-sekkei': {
    name_zh: '日建设计', name_en: 'Nikken Sekkei', name_ja: '日建設計', official_url: 'https://www.nikken.co.jp/en/',
  },
  'jun-aoki-tezzo-nishizawa': {
    name_zh: '青木淳 + 西泽彻夫', name_en: 'Jun Aoki + Tezzo Nishizawa', name_ja: '青木淳 + 西澤徹夫', official_url: 'https://kyotocity-kyocera.museum/en/architecture',
  },
  'takenaka-corporation': {
    name_zh: '竹中工务店', name_en: 'Takenaka Corporation', name_ja: '竹中工務店', official_url: 'https://www.takenaka.co.jp/',
  },
  'yasuda-atelier': {
    name_zh: '安田工作室', name_en: 'Yasuda Atelier', name_ja: '安田アトリエ', official_url: 'https://www.yasudaatelier.com/',
  },
  'peter-cook-colin-fournier': {
    name_zh: 'Peter Cook + Colin Fournier', name_en: 'Peter Cook + Colin Fournier', name_ja: 'ピーター・クック + コリン・フルニエ', official_url: 'https://www.museum-joanneum.at/en/kunsthaus-graz/discover/architecture/thearchitects',
  },
  'henning-larsen': {
    name_zh: 'Henning Larsen 建筑事务所', name_en: 'Henning Larsen', name_ja: 'ヘニング・ラーセン', official_url: 'https://www.henninglarsen.com/',
  },
  'heatherwick-studio': {
    name_zh: 'Heatherwick Studio', name_en: 'Heatherwick Studio', name_ja: 'ヘザウィック・スタジオ', official_url: 'https://heatherwick.com/',
  },
  'diller-scofidio-renfro-rockwell-group': {
    name_zh: 'Diller Scofidio + Renfro + Rockwell Group',
    name_en: 'Diller Scofidio + Renfro + Rockwell Group',
    name_ja: 'ディラー・スコフィディオ＋レンフロ + ロックウェル・グループ',
    official_url: 'https://dsrny.com/project/the-shed',
  },
  'kazumi-adachi-kiyoshi-sawano-hideo-matsunaga-isamu-noguchi': {
    name_zh: 'Kazumi Adachi + Kiyoshi Sawano + Hideo Matsunaga + Isamu Noguchi',
    name_en: 'Kazumi Adachi + Kiyoshi Sawano + Hideo Matsunaga + Isamu Noguchi',
    name_ja: 'カズミ・アダチ + キヨシ・サワノ + ヒデオ・マツナガ + イサム・ノグチ',
    official_url: 'https://jaccc.org/about/',
  },
  'foreign-office-architects': {
    name_zh: 'Foreign Office Architects',
    name_en: 'Foreign Office Architects',
    name_ja: 'Foreign Office Architects',
    official_url: 'https://www.moma.org/artists/27436',
  },
  'taisei-design-nikken-sekkei': {
    name_zh: '大成设计＋日建设计',
    name_en: 'TAISEI DESIGN + Nikken Sekkei',
    name_ja: '大成建設設計本部＋日建設計',
    official_url: 'https://www.mitsuifudosan.co.jp/english/corporate/news/2020/0623/',
  },
  'field-operations-dsr-piet-oudolf': {
    name_zh: 'Field Operations＋Diller Scofidio + Renfro＋Piet Oudolf',
    name_en: 'Field Operations + Diller Scofidio + Renfro + Piet Oudolf',
    name_ja: 'Field Operations＋Diller Scofidio + Renfro＋Piet Oudolf',
    official_url: 'https://www.fieldoperations.net/project/high-line',
  },
  'big-topotek1-superflex': {
    name_zh: 'BIG＋Topotek 1＋Superflex',
    name_en: 'BIG + Topotek 1 + Superflex',
    name_ja: 'BIG＋Topotek 1＋Superflex',
    official_url: 'https://big.dk/projects/superkilen-1621',
  },
}

refuseReviewedOutputOverwrite()

const decisions = readJson(batchConfig.decision_path)
const cases = readJson('src/content/graduation/cases.json')
const productionArchitects = await fetchAll('architects')
const productionBuildings = await fetchAll('buildings')
const productionFunctions = await fetchAll('building_functions')
const casesById = new Map(cases.map(item => [item.id, item]))
const architectsBySlug = new Map(productionArchitects.map(item => [item.slug, item]))

assert(decisions.write_status.includes('no production insert authorized'), 'Decision file no longer has reviewed-only write status')
assert(decisions.decisions.length === batchConfig.expected_decisions, `Expected ${batchConfig.expected_decisions} decisions, found ${decisions.decisions.length}`)
assert(
  decisions.excluded.length === batchConfig.expected_excluded.length
    && batchConfig.expected_excluded.every(caseId => decisions.excluded.some(item => item.case_id === caseId)),
  `Excluded CASE set does not match ${batchConfig.expected_excluded.join(', ') || 'the expected empty set'}`,
)

const migrationMode = item => item.migration_mode || 'create_canonical_building'
const createDecisions = decisions.decisions.filter(item => migrationMode(item) === 'create_canonical_building')
const reuseDecisions = decisions.decisions.filter(item => migrationMode(item) === 'reuse_existing_canonical_building')
assert(createDecisions.length + reuseDecisions.length === decisions.decisions.length, 'Unsupported migration_mode in reviewed decisions')

const architectSlugs = [...new Set(createDecisions.map(item => item.canonical_building.architect_slug))]
const architects = architectSlugs.map(slug => {
  const existing = architectsBySlug.get(slug)
  if (existing) {
    return {
      id: existing.id,
      slug,
      name_zh: existing.name_zh,
      name_en: existing.name_en,
      name_ja: existing.name_ja,
      official_url: existing.official_url,
      is_new: false,
    }
  }
  const draft = architectDrafts[slug]
  assert(draft, `Missing reviewed architect draft for ${slug}`)
  return { id: uuidV5(`architect:${slug}`), slug, ...draft, is_new: true }
})
const architectBySlug = new Map(architects.map(item => [item.slug, item]))

const buildings = createDecisions.map(item => {
  const source = casesById.get(item.case_id)
  const canonical = item.canonical_building
  const architect = architectBySlug.get(canonical.architect_slug)
  assert(source?.status === 'published', `${item.case_id} is not a published case`)
  assert(architect, `${item.case_id} has no architect seed`)
  assert(!productionBuildings.some(building => building.slug === canonical.slug), `${canonical.slug} already exists in production`)
  return {
    id: uuidV5(`building:${canonical.slug}`),
    case_id: item.case_id,
    ...canonical,
    architect_id: architect.id,
    country_code: canonical.country_code,
    status: 'published',
  }
})
const buildingByCaseId = new Map(buildings.map(item => [item.case_id, item]))
for (const item of reuseDecisions) {
  const canonical = item.canonical_building
  const existing = productionBuildings.find(building => building.slug === canonical.slug)
  assert(existing, `${item.case_id} cannot reuse missing production building ${canonical.slug}`)
  assert(existing.id === canonical.id, `${item.case_id} existing building UUID drift for ${canonical.slug}`)
  buildingByCaseId.set(item.case_id, { ...existing, case_id: item.case_id, reuse_existing: true })
}

const images = createDecisions.map(item => {
  const source = casesById.get(item.case_id)
  const building = buildingByCaseId.get(item.case_id)
  assert(source && building, `Missing image source for ${item.case_id}`)
  assert(source.image_source_url === item.image.source_url, `${item.case_id} image source drift`)
  assert(source.image_license === item.image.license, `${item.case_id} image license drift`)
  assert(source.image_credit === item.image.credit, `${item.case_id} image credit drift`)
  return {
    id: uuidV5(`image:${item.case_id}:primary`),
    building_id: building.id,
    building_slug: building.slug,
    case_id: item.case_id,
    url_original: source.image_url,
    photographer: item.image.credit.replace(/\s*\/ Wikimedia Commons$/, '').replace(/^Photo:\s*/, ''),
    source: 'Wikimedia Commons',
    license: item.image.license,
    source_url: item.image.source_url,
    img_type: batchConfig.interior_case_ids.includes(item.case_id) ? 'interior' : 'exterior',
    is_primary: true,
  }
})

const profiles = decisions.decisions.map(item => {
  const source = casesById.get(item.case_id)
  const building = buildingByCaseId.get(item.case_id)
  assert(source && building, `Missing profile source for ${item.case_id}`)
  return {
    case_id: item.case_id,
    building_id: building.id,
    building_slug: building.slug,
    concept_zh: source.concept,
    concept_zh_hant: null,
    concept_en: source.concept_en || null,
    concept_ja: source.concept_ja || null,
    keywords_zh: source.keywords || [],
    keywords_zh_hant: [],
    keywords_en: source.keywords_en || [],
    keywords_ja: source.keywords_ja || [],
    plan_url: source.plan_url || null,
    section_url: source.section_url || null,
    source_url: source.source_url,
    publication_status: 'published',
  }
})
const reusedBuildings = [...new Map(
  reuseDecisions.map(item => {
    const building = buildingByCaseId.get(item.case_id)
    return [building.id, { id: building.id, slug: building.slug }]
  }),
).values()]

const knownFunctionSlugs = new Set(productionFunctions.map(item => item.slug))
const assignments = createDecisions.flatMap(item => {
  const building = buildingByCaseId.get(item.case_id)
  assert(building, `Missing assignment building for ${item.case_id}`)
  return item.function_slugs.map(functionSlug => {
    assert(knownFunctionSlugs.has(functionSlug), `Production function is missing: ${functionSlug}`)
    return {
      building_id: building.id,
      building_slug: building.slug,
      function_slug: functionSlug,
      is_primary: functionSlug === batchConfig.primary_function,
      confidence: '1.000',
      evidence_url: item.canonical_building.official_url,
      evidence_note: item.identity_evidence.join(' '),
      reviewed_at: '2026-07-12T00:00:00Z',
    }
  })
})

assert(new Set(buildings.map(item => item.id)).size === buildings.length, 'Building UUID collision')
assert(new Set(images.map(item => item.id)).size === images.length, 'Image UUID collision')
assert(new Set(profiles.map(item => item.case_id)).size === profiles.length, 'Profile CASE collision')
const expectedAssignmentCount = createDecisions.reduce((total, item) => total + item.function_slugs.length, 0)
assert(assignments.length === expectedAssignmentCount, `Expected ${expectedAssignmentCount} assignments, found ${assignments.length}`)
assert(new Set(assignments.map(item => `${item.building_id}:${item.function_slug}`)).size === assignments.length, 'Assignment collision')

const pack = {
  schema_version: 1,
  batch_id: batchConfig.batch_id,
  generated_at: new Date().toISOString(),
  mode: 'reviewed-dry-run-output-no-database-write',
  prerequisites: [
    'graduation unification foundation and batch 001 are applied',
    'all new target UUIDs, slugs, CASE IDs and image source URLs are absent; reused building UUID/slug pairs still match production',
    batchConfig.required_functions_note,
    'existing architect UUID/slug pairs still match production',
  ],
  counts: {
    architects: architects.length,
    new_architects: architects.filter(item => item.is_new).length,
    buildings: buildings.length,
    ...(reusedBuildings.length ? {
      reused_buildings: reusedBuildings.length,
      reused_building_profiles: reuseDecisions.length,
    } : {}),
    images: images.length,
    profiles: profiles.length,
    assignments: assignments.length,
  },
  architects,
  buildings,
  reused_buildings: reusedBuildings,
  images,
  profiles,
  assignments,
}

fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true })
fs.mkdirSync(path.dirname(APPLY_SQL), { recursive: true })
fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(pack, null, 2)}\n`)
fs.writeFileSync(APPLY_SQL, buildApplySql(pack))
fs.writeFileSync(ROLLBACK_SQL, buildRollbackSql(pack))
console.log(`Prepared ${pack.batch_id}: ${JSON.stringify(pack.counts)}`)

function buildApplySql(pack) {
  const reusedBuildingCount = pack.counts.reused_buildings || 0
  const architectValues = pack.architects.map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.slug)}, ${sqlNullable(item.name_zh)}, ${sqlText(item.name_en)}, ${sqlNullable(item.name_ja)}, ${sqlNullable(item.official_url)}, ${item.is_new})`).join(',\n')
  const buildingValues = pack.buildings.map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.case_id)}, ${sqlText(item.slug)}, ${sqlNullable(item.name_zh)}, ${sqlText(item.name_en)}, ${sqlNullable(item.name_ja)}, ${sqlText(item.architect_id)}::uuid, ${sqlText(item.architect_slug)}, ${item.year_start}, ${sqlText(item.status)}, ${sqlText(item.city)}, ${sqlText(item.country)}, ${sqlText(item.country_code)}, ${sqlText(item.type_slug)}, ${sqlText(item.official_url)})`).join(',\n')
  const imageValues = pack.images.map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.building_id)}::uuid, ${sqlText(item.building_slug)}, ${sqlText(item.case_id)}, ${sqlText(item.url_original)}, ${sqlText(item.photographer)}, ${sqlText(item.source)}, ${sqlText(item.license)}, ${sqlText(item.source_url)}, ${sqlText(item.img_type)}, ${item.is_primary})`).join(',\n')
  const profileValues = pack.profiles.map(item => `  (${sqlText(item.case_id)}, ${sqlText(item.building_id)}::uuid, ${sqlText(item.building_slug)}, ${sqlText(item.concept_zh)}, ${sqlNullable(item.concept_zh_hant)}, ${sqlNullable(item.concept_en)}, ${sqlNullable(item.concept_ja)}, ${sqlTextArray(item.keywords_zh)}, ${sqlTextArray(item.keywords_zh_hant)}, ${sqlTextArray(item.keywords_en)}, ${sqlTextArray(item.keywords_ja)}, ${sqlNullable(item.plan_url)}, ${sqlNullable(item.section_url)}, ${sqlText(item.source_url)}, ${sqlText(item.publication_status)})`).join(',\n')
  const assignmentValues = pack.assignments.map(item => `  (${sqlText(item.building_id)}::uuid, ${sqlText(item.building_slug)}, ${sqlText(item.function_slug)}, ${item.is_primary}, ${item.confidence}, ${sqlText(item.evidence_url)}, ${sqlText(item.evidence_note)}, ${sqlText(item.reviewed_at)}::timestamptz)`).join(',\n')
  const reusedBuildingValues = pack.reused_buildings.map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.slug)})`).join(',\n')
  const insertValues = (table, values) => values ? `INSERT INTO ${table} VALUES\n${values};` : ''
  const requiredFunctions = [...new Set(pack.assignments.map(item => item.function_slug))]
  const requiredTypes = [...new Set(pack.buildings.map(item => item.type_slug))]

  return `-- ${batchConfig.sql_title}: reviewed canonical entities and relations.
-- Generated by ${batchConfig.generator_name}.
-- Scope: ${pack.counts.new_architects} new architects, ${pack.counts.buildings} buildings, ${pack.counts.images} images,
-- ${pack.counts.profiles} profiles, ${pack.counts.assignments} approved function assignments.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.graduation_case_profiles') IS NULL
    OR to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_assignments') IS NULL
    OR to_regclass('public.architects') IS NULL
    OR to_regclass('public.buildings') IS NULL
    OR to_regclass('public.images') IS NULL THEN
    RAISE EXCEPTION '${batchConfig.sql_title} prerequisites are missing';
  END IF;
END $$;

CREATE TEMP TABLE architect_seed (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE, name_zh text, name_en text NOT NULL, name_ja text, official_url text, is_new boolean NOT NULL) ON COMMIT DROP;
${insertValues('architect_seed', architectValues)}

CREATE TEMP TABLE building_seed (id uuid PRIMARY KEY, case_id text NOT NULL UNIQUE, slug text NOT NULL UNIQUE, name_zh text, name_en text NOT NULL, name_ja text, architect_id uuid NOT NULL, architect_slug text NOT NULL, year_start integer NOT NULL, status text NOT NULL, city text NOT NULL, country text NOT NULL, country_code text NOT NULL, type_slug text NOT NULL, official_url text NOT NULL) ON COMMIT DROP;
${insertValues('building_seed', buildingValues)}

CREATE TEMP TABLE reused_building_seed (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
${insertValues('reused_building_seed', reusedBuildingValues)}

CREATE TEMP TABLE image_seed (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, building_slug text NOT NULL UNIQUE, case_id text NOT NULL UNIQUE, url_original text NOT NULL, photographer text NOT NULL, source text NOT NULL, license text NOT NULL, source_url text NOT NULL UNIQUE, img_type text NOT NULL, is_primary boolean NOT NULL) ON COMMIT DROP;
${insertValues('image_seed', imageValues)}

CREATE TEMP TABLE profile_seed (case_id text PRIMARY KEY, building_id uuid NOT NULL, building_slug text NOT NULL, concept_zh text NOT NULL, concept_zh_hant text, concept_en text, concept_ja text, keywords_zh text[] NOT NULL, keywords_zh_hant text[] NOT NULL, keywords_en text[] NOT NULL, keywords_ja text[] NOT NULL, plan_url text, section_url text, source_url text NOT NULL, publication_status text NOT NULL) ON COMMIT DROP;
${insertValues('profile_seed', profileValues)}

CREATE TEMP TABLE assignment_seed (building_id uuid NOT NULL, building_slug text NOT NULL, function_slug text NOT NULL, is_primary boolean NOT NULL, confidence numeric(4,3) NOT NULL, evidence_url text NOT NULL, evidence_note text NOT NULL, reviewed_at timestamptz NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
${insertValues('assignment_seed', assignmentValues)}

DO $$
DECLARE
  existing_architect_matches integer;
  reused_building_matches integer;
  required_function_matches integer;
  required_type_matches integer;
  invalid_profile_buildings integer;
  conflicts integer;
BEGIN
  IF (SELECT count(*) FROM architect_seed) <> ${pack.counts.architects}
    OR (SELECT count(*) FROM architect_seed WHERE is_new) <> ${pack.counts.new_architects}
    OR (SELECT count(*) FROM building_seed) <> ${pack.counts.buildings}
    OR (SELECT count(*) FROM reused_building_seed) <> ${reusedBuildingCount}
    OR (SELECT count(*) FROM image_seed) <> ${pack.counts.images}
    OR (SELECT count(*) FROM profile_seed) <> ${pack.counts.profiles}
    OR (SELECT count(*) FROM assignment_seed) <> ${pack.counts.assignments} THEN
    RAISE EXCEPTION '${batchConfig.sql_title} seed count mismatch';
  END IF;

  SELECT count(*) INTO reused_building_matches
  FROM reused_building_seed seed JOIN public.buildings target USING (id, slug);
  IF reused_building_matches <> ${reusedBuildingCount} THEN
    RAISE EXCEPTION 'Reused building UUID/slug pairs drifted: matched %', reused_building_matches;
  END IF;

  SELECT count(*) INTO invalid_profile_buildings
  FROM profile_seed profile
  LEFT JOIN building_seed created ON created.id = profile.building_id AND created.slug = profile.building_slug
  LEFT JOIN reused_building_seed reused ON reused.id = profile.building_id AND reused.slug = profile.building_slug
  WHERE created.id IS NULL AND reused.id IS NULL;
  IF invalid_profile_buildings <> 0 THEN
    RAISE EXCEPTION 'Profile seed references % unreviewed canonical buildings', invalid_profile_buildings;
  END IF;

  SELECT count(*) INTO existing_architect_matches
  FROM architect_seed seed JOIN public.architects target USING (id, slug)
  WHERE seed.is_new = false;
  IF existing_architect_matches <> ${pack.counts.architects - pack.counts.new_architects} THEN
    RAISE EXCEPTION 'Existing architect UUID/slug pairs drifted: matched %', existing_architect_matches;
  END IF;

  SELECT count(*) INTO required_function_matches
  FROM public.building_functions
  WHERE slug = ANY (${sqlTextArray(requiredFunctions)}) AND is_active = true;
  SELECT count(*) INTO required_type_matches
  FROM public.building_types
  WHERE slug = ANY (${sqlTextArray(requiredTypes)});
  IF required_function_matches <> ${requiredFunctions.length}
    OR required_type_matches <> ${requiredTypes.length} THEN
    RAISE EXCEPTION 'Required building type or functions are missing';
  END IF;

  SELECT
    (SELECT count(*) FROM public.architects target JOIN architect_seed seed ON seed.is_new AND (target.id = seed.id OR target.slug = seed.slug))
    + (SELECT count(*) FROM public.buildings target JOIN building_seed seed ON target.id = seed.id OR target.slug = seed.slug)
    + (SELECT count(*) FROM public.images target JOIN image_seed seed ON target.id = seed.id OR target.source_url = seed.source_url)
    + (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_seed seed ON target.case_id = seed.case_id)
    + (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_seed seed USING (building_id, function_slug))
  INTO conflicts;
  IF conflicts <> 0 THEN
    RAISE EXCEPTION '${batchConfig.sql_title} requires empty target keys; found % conflicts', conflicts;
  END IF;
END $$;

INSERT INTO public.architects (id, slug, name_zh, name_en, name_ja, official_url)
SELECT id, slug, name_zh, name_en, name_ja, official_url FROM architect_seed WHERE is_new;

INSERT INTO public.buildings (id, slug, name_zh, name_en, name_ja, architect_id, architect_slug, year_start, status, city, country, country_code, type_slug, official_url)
SELECT id, slug, name_zh, name_en, name_ja, architect_id, architect_slug, year_start, status, city, country, country_code, type_slug, official_url FROM building_seed;

INSERT INTO public.images (id, building_id, url_original, photographer, source, license, source_url, img_type, is_primary)
SELECT id, building_id, url_original, photographer, source, license, source_url, img_type, is_primary FROM image_seed;

INSERT INTO public.graduation_case_profiles (case_id, building_id, concept_zh, concept_zh_hant, concept_en, concept_ja, keywords_zh, keywords_zh_hant, keywords_en, keywords_ja, plan_url, section_url, source_url, publication_status)
SELECT case_id, building_id, concept_zh, concept_zh_hant, concept_en, concept_ja, keywords_zh, keywords_zh_hant, keywords_en, keywords_ja, plan_url, section_url, source_url, publication_status FROM profile_seed;

INSERT INTO public.building_function_assignments (building_id, function_slug, is_primary, confidence, review_status, assignment_method, evidence_url, evidence_note, reviewed_at)
SELECT building_id, function_slug, is_primary, confidence, 'approved', 'source-derived', evidence_url, evidence_note, reviewed_at FROM assignment_seed;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_seed seed USING (id, slug) WHERE seed.is_new) <> ${pack.counts.new_architects}
    OR (SELECT count(*) FROM public.buildings target JOIN building_seed seed USING (id, slug)) <> ${pack.counts.buildings}
    OR (SELECT count(*) FROM public.images target JOIN image_seed seed USING (id, building_id, source_url)) <> ${pack.counts.images}
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_seed seed USING (case_id, building_id)) <> ${pack.counts.profiles}
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_seed seed USING (building_id, function_slug) WHERE target.review_status = 'approved') <> ${pack.counts.assignments}
    OR (SELECT count(*) FROM public.images target JOIN image_seed seed USING (building_id) WHERE target.is_primary) <> ${pack.counts.images}
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_seed seed USING (building_id, function_slug) WHERE target.is_primary) <> ${pack.counts.buildings} THEN
    RAISE EXCEPTION '${batchConfig.sql_title} post-write verification failed';
  END IF;
END $$;

COMMIT;
`
}

function buildRollbackSql(pack) {
  const newArchitectValues = pack.architects.filter(item => item.is_new).map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.slug)})`).join(',\n')
  const buildingValues = pack.buildings.map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.slug)})`).join(',\n')
  const imageValues = pack.images.map(item => `  (${sqlText(item.id)}::uuid, ${sqlText(item.building_id)}::uuid, ${sqlText(item.source_url)})`).join(',\n')
  const profileValues = pack.profiles.map(item => `  (${sqlText(item.case_id)}, ${sqlText(item.building_id)}::uuid)`).join(',\n')
  const assignmentValues = pack.assignments.map(item => `  (${sqlText(item.building_id)}::uuid, ${sqlText(item.function_slug)})`).join(',\n')
  const insertValues = (table, values) => values ? `INSERT INTO ${table} VALUES\n${values};` : ''

  return `-- Rollback ${batchConfig.sql_title.toLowerCase()} only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
${insertValues('architect_rollback', newArchitectValues)}
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
${insertValues('building_rollback', buildingValues)}
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
${insertValues('image_rollback', imageValues)}
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL) ON COMMIT DROP;
${insertValues('profile_rollback', profileValues)}
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
${insertValues('assignment_rollback', assignmentValues)}

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> ${pack.counts.new_architects}
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> ${pack.counts.buildings}
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> ${pack.counts.images}
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> ${pack.counts.profiles}
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> ${pack.counts.assignments} THEN
    RAISE EXCEPTION 'Rollback refused: reviewed batch rows are missing or changed';
  END IF;

  SELECT
    (SELECT count(*) FROM public.images target JOIN building_rollback seed ON target.building_id = seed.id LEFT JOIN image_rollback expected ON target.id = expected.id WHERE expected.id IS NULL)
    + (SELECT count(*) FROM public.graduation_case_profiles target JOIN building_rollback seed ON target.building_id = seed.id LEFT JOIN profile_rollback expected ON target.case_id = expected.case_id WHERE expected.case_id IS NULL)
    + (SELECT count(*) FROM public.building_function_assignments target JOIN building_rollback seed ON target.building_id = seed.id LEFT JOIN assignment_rollback expected ON target.building_id = expected.building_id AND target.function_slug = expected.function_slug WHERE expected.building_id IS NULL)
    + (SELECT count(*) FROM public.building_styles target JOIN building_rollback seed ON target.building_id = seed.id)
    + (SELECT count(*) FROM public.building_eras target JOIN building_rollback seed ON target.building_id = seed.id)
    + (SELECT count(*) FROM public.curated_images target JOIN building_rollback seed ON target.building_id = seed.id)
    + (SELECT count(*) FROM public.architect_styles target JOIN architect_rollback seed ON target.architect_id = seed.id)
    + (SELECT count(*) FROM public.architect_eras target JOIN architect_rollback seed ON target.architect_id = seed.id)
    + (SELECT count(*) FROM public.architect_influences target JOIN architect_rollback seed ON target.architect_id = seed.id OR target.influenced_id = seed.id)
    + (SELECT count(*) FROM public.buildings target JOIN architect_rollback seed ON target.architect_id = seed.id LEFT JOIN building_rollback expected ON target.id = expected.id WHERE expected.id IS NULL)
  INTO external_relations;
  IF external_relations <> 0 THEN
    RAISE EXCEPTION 'Rollback refused: found % external relations added after ${batchConfig.batch_id}', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
`
}
