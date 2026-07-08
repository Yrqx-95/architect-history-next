# Archistory Learning Material Extraction Plan

Status: Full source scan complete; editorial review in progress
Usage scope: `reference_only`
Languages for future public content: Japanese first, then Chinese and English
Reviewed material set: 40 PDFs, 1,277 pages total

## Implementation Progress

Completed on 2026-06-06:

- registered the first seven extraction sources in `src/content/learning-sources/class-materials.ts`
- extracted 154 page-referenced candidate terms from five RC lecture PDFs and two interior reference PDFs
- added 32 foundational RC, concrete, material, and construction terms to the public multilingual Glossary
- kept source-specific numerical limits, standards claims, and detailed rules out of public definitions pending primary-source verification
- verified TypeScript, ESLint, and the full Next.js production build
- scanned the remaining 33 PDFs page by page, covering the full 40-source set
- registered all remaining planning, history, housing, office, commercial,
  structure, interior, lighting, exam, and Code sources
- created 199 page-referenced candidate groups containing 631 unique terms
- retained 596 not-yet-public candidates for canonical review

The full source set is now registered and scanned. Candidate records remain
`draft`; only the reviewed RC batch has been converted into public definitions.

## 1. Purpose And Boundaries

This plan describes how Archistory can extract structured knowledge from the available school materials without reproducing textbooks, scanned pages, answer sheets, or long quotations.

Allowed future outputs:

- terminology and aliases
- short editorial definitions written from multiple references
- topic relationships
- exam concepts expressed as original summaries
- diagram specifications recreated from first principles
- page-level source references for private editorial review

Not allowed:

- storing or publishing full PDF text
- reproducing scanned pages or textbook diagrams
- copying questions, answer keys, tables, or extended passages
- presenting school notes as official legal or technical authority

All extracted records should begin as `draft`. Legal, structural, dimensional, and exam claims require independent verification before becoming `reviewed` or `verified`.

## 2. Source Registry And Extraction Estimates

Estimates are deliberately conservative. Counts mean candidate records before deduplication.

| Source ID | File / title | Type; subject | Pages | Candidate extraction (terms / styles / materials / furniture / drawing / exam) | Main risk | Order |
|---|---|---:|---:|---:|---|---:|
| `rc-overview-2025` | `01_概要.pdf` | lecture notes; RC structure | 11 | 25 / 0 / 8 / 0 / 4 / 10 | technical claims need standards check | 2 |
| `rc-cement-2025` | `02_コンクリート_材料①セメント.pdf` | lecture notes; concrete materials | 11 | 35 / 0 / 22 / 0 / 2 / 15 | JIS/JASS values may change | 1 |
| `rc-aggregate-2025` | `03_コンクリート_材料②骨材.pdf` | lecture notes; aggregates | 7 | 28 / 0 / 24 / 0 / 1 / 12 | classifications require normalization | 1 |
| `rc-mix-2025` | `04_コンクリート_調合.pdf` | lecture notes; mix and strength | 14 | 42 / 0 / 18 / 0 / 5 / 24 | formulas and limits need verification | 1 |
| `rc-rebar-2025` | `05_鉄筋・配筋①.pdf` | lecture notes; reinforcement | 5 | 30 / 0 / 12 / 0 / 8 / 18 | code/design distinctions | 1 |
| `planning-2025-01` | `250416_第一回目.pdf` | course deck; planning fundamentals | 48 | 75 / 2 / 8 / 18 / 22 / 15 | broad scope; duplicate textbook vocabulary | 2 |
| `history-jp-2025-01` | `250416_第一回目歴史.pdf` | course deck; Japanese architecture history | 54 | 80 / 18 / 18 / 5 / 8 / 20 | dates and attributions need external sources | 2 |
| `planning-2025-02` | `250421_第二回目.pdf` | course deck; dimensions and modules | 22 | 40 / 0 / 5 / 8 / 18 / 10 | embedded font extraction is garbled | 3 |
| `history-jp-2025-02` | `250421_第二回目歴史.pdf` | course deck; Japanese architecture history | 58 | 70 / 16 / 15 / 6 / 8 / 18 | OCR/manual review required | 3 |
| `planning-2025-03` | `250428_第三回目.pdf` | course deck; grouping, zoning, circulation | 63 | 65 / 0 / 5 / 12 / 28 / 18 | planning terms overlap interior set | 2 |
| `history-jp-2025-03` | `250428_第三回目歴史.pdf` | course deck; castles and premodern Japan | 54 | 65 / 14 / 20 / 4 / 8 / 15 | historical terminology variants | 3 |
| `history-jp-2025-035` | `250512_第三.五回目.pdf` | supplemental deck; vernacular housing | 13 | 28 / 8 / 14 / 5 / 5 / 8 | garbled extraction; source is supplemental | 3 |
| `planning-2025-04` | `250609_第四回目.pdf` | course deck; corridors and unit spaces | 49 | 55 / 0 / 8 / 15 / 20 / 18 | dimensions must not become universal rules | 2 |
| `history-modern-jp-2025` | `250609_第四回目歴史.pdf` | course deck; modern Japanese architecture | 70 | 95 / 24 / 18 / 8 / 10 / 24 | architect/building facts need primary checks | 1 |
| `planning-2025-05` | `250616_第五回目.pdf` | course deck; residential utility spaces | 54 | 55 / 0 / 10 / 18 / 20 / 16 | recommendations differ from legal minima | 2 |
| `history-modern-jp-cases-2025` | `250616_第五回目歴史.pdf` | course deck; modern Japanese case studies | 89 | 95 / 22 / 20 / 10 / 10 / 24 | missing metadata title; high image dependence | 2 |
| `history-western-2025-01` | `250623_第六回目.pdf` | course deck; ancient Western history | 50 | 70 / 18 / 24 / 4 / 10 / 18 | dates/transliterations need normalization | 2 |
| `history-western-2025-02` | `250630_第七回目.pdf` | course deck; early Christian/Byzantine history | 90 | 100 / 26 / 28 / 8 / 12 / 25 | overlapping eras and names | 2 |
| `planning-housing-2025-01` | `251006_建築計画_第一回目_集合住宅1.pdf` | course deck; collective housing | 51 | 65 / 2 / 8 / 20 / 22 / 20 | housing examples need fact checks | 2 |
| `rc-construction-2025` | `251006_鉄筋コンクリート造.pdf` | course deck; RC construction | 26 | 55 / 0 / 28 / 0 / 18 / 22 | partial text extraction | 2 |
| `planning-housing-2025-02` | `251020_建築計画_第二回目_集合住宅2.pdf` | course deck; collective housing cases | 28 | 45 / 2 / 5 / 15 / 14 / 14 | architect/building relationships need checks | 3 |
| `exam-housing-2025` | `251020_建築計画Ⅰ_後期_集合住宅の問題+解答.pdf` | exercises and answers; housing | 34 | 30 / 0 / 0 / 8 / 8 / 35 | copyrighted questions; no question-bank extraction | 4 |
| `planning-office-2025` | `251027_建築計画_第三回目_事務所.pdf` | course deck; offices | 33 | 55 / 0 / 6 / 18 / 20 / 16 | case-study facts and ratios need checks | 2 |
| `exam-office-2025` | `251027_建築計画Ⅰ_後期_事務所の問題+解答.pdf` | exercises and answers; offices | 32 | 28 / 0 / 0 / 8 / 8 / 32 | do not reproduce questions or answers | 4 |
| `planning-commercial-2025` | `251201_建築計画_第四回目_商業建築.pdf` | course deck; commercial buildings | 56 | 70 / 6 / 12 / 24 / 20 / 20 | broad history/planning overlap | 3 |
| `exam-commercial-2025` | `251201_建築計画Ⅰ_後期_商業建築の問題+解答.pdf` | exercises and answers; commercial | 30 | 25 / 0 / 0 / 8 / 6 / 30 | do not reproduce questions or answers | 4 |
| `interior-coordination-2025` | `ICオリジナル2025まとめのコピー.pdf` | handbook; interior coordination | 50 | 110 / 28 / 70 / 75 / 35 / 18 | encoded text and manufacturer references | 1 |
| `rc-worksheet-01` | `一般構造Ⅰ_RC_01.pdf` | worksheet; RC fundamentals | 3 | 18 / 0 / 6 / 0 / 2 / 18 | fill-in format must be paraphrased | 3 |
| `rc-worksheet-02` | `一般構造Ⅰ_RC_02.pdf` | worksheet; cement | 3 | 22 / 0 / 15 / 0 / 1 / 20 | standards require current sources | 3 |
| `rc-worksheet-03` | `一般構造Ⅰ_RC_03.pdf` | worksheet; aggregates | 2 | 18 / 0 / 16 / 0 / 1 / 18 | answer inference must be independently checked | 3 |
| `rc-worksheet-04` | `一般構造Ⅰ_RC_04.pdf` | worksheet; mix and strength | 4 | 25 / 0 / 13 / 0 / 4 / 24 | formulas/values need verification | 3 |
| `rc-worksheet-05` | `一般構造Ⅰ_RC_05.pdf` | worksheet; reinforcement | 3 | 22 / 0 / 10 / 0 / 5 / 22 | standards may be edition-specific | 3 |
| `rc-exam-answers-2025` | `一般構造Ⅰ_RC_後期試験_解答例.pdf` | exam answer example; RC | 5 | 18 / 0 / 8 / 0 / 4 / 35 | private exam material; concepts only | 4 |
| `interior-style-reference-2025` | `別冊表紙2025まとめのコピー.pdf` | reference booklet; interior styles/products | 22 | 65 / 24 / 45 / 40 / 12 / 4 | marketing categories and brand URLs | 1 |
| `lighting-pendants-2025` | `名作ペンダント紹介のコピー.pdf` | product reference; lighting design | 15 | 35 / 8 / 18 / 35 / 5 / 2 | designers/products need official verification | 2 |
| `interior-zoning-workflow` | `実務におけるゾーニングの流れのコピー.pdf` | workflow sheet; interior planning | 1 | 20 / 0 / 0 / 5 / 18 / 3 | single-page copyrighted workflow | 2 |
| `lighting-layout-reference` | `照明配置参考資料のコピー.pdf` | diagram reference; lighting layout | 2 | 18 / 0 / 8 / 10 / 18 / 4 | image-based; recreate diagrams independently | 3 |
| `custom-fixtures-reference` | `造作について補足のコピー.pdf` | supplemental notes; built-ins/joinery | 3 | 28 / 0 / 16 / 24 / 12 / 4 | practical advice varies by project | 2 |
| `building-code-exercises-2026` | `法規Ⅱ_演習_2026前期.pdf` | exercise deck; code and exam review | 91 | 70 / 0 / 0 / 0 / 20 / 90 | never reproduce questions; laws need official verification | 1 |
| `building-code-lawbook-2025` | `法規Ⅱ_アンダーライン_法令集2025年版.pdf` | annotated law-book reference | 21 | 55 / 0 / 0 / 0 / 8 / 45 | annotations are not authoritative law text | 1 |

All sources are Japanese-language materials from 2025 or 2026 unless the PDF itself indicates otherwise. The two Code PDFs currently remain in `/Users/liquanxing/Downloads/KID26李泉興 2年/`; the other 38 are in `/Users/liquanxing/Desktop/codex投喂/`.

## 3. Recommended Extraction Sequence

1. **Interior and search vocabulary:** `interior-coordination-2025`, `interior-style-reference-2025`, lighting and built-in references.
2. **RC material/structure vocabulary:** five concise lecture PDFs, then the worksheets for exam aliases and traps.
3. **Building Code concepts:** use the exercise deck to identify high-frequency concepts, then verify every legal statement against e-Gov and MLIT.
4. **Planning vocabulary:** fundamentals, circulation, unit spaces, housing, offices, and commercial buildings.
5. **History/style vocabulary:** extract eras, building types, structural systems, and canonical works; verify names, dates, and authorship independently.
6. **Exam concept layer:** only after canonical terms exist, attach formula/condition/trap/process records without copying prompts.

The question-and-answer PDFs are intentionally last. They are useful for identifying recurring misconceptions, not for generating a public question bank.

## 4. Deduplication And Canonicalization

Each candidate should be normalized into a canonical Japanese-first record:

- `termJa`: preferred modern Japanese spelling
- `reading`: hiragana
- `termZh` and `termEn`: editorial translations
- `aliases`: spelling, script, abbreviation, and search variants
- `category` and optional `subcategory`
- `sourceRefs`: source ID plus page number, private editorial metadata only
- `status`: `draft`

Rules:

1. Normalize Unicode, full-width/half-width characters, punctuation, and prolonged-sound marks.
2. Treat readings and abbreviations as aliases, not separate entries: `容積率`, `ようせきりつ`, `FAR`, and `floor area ratio`.
3. Preserve accepted spelling variants: `建蔽率` and `建ぺい率`; choose one display form and index both.
4. Separate near-synonyms when the design meaning differs: `リフォーム`, `リノベーション`, and `コンバージョン`.
5. Merge redundant style labels only when their scope matches. `モダン`, `モダンスタイル`, and `Modern` may be aliases; `北欧モダン` remains a distinct style.
6. Keep historic spellings and transliteration variants as aliases with notes.
7. Deduplicate against existing 30 Glossary entries and existing Code Topic slugs before creating records.
8. Flag numerical conflicts, legal edition conflicts, and author/date conflicts for manual review rather than choosing automatically.

## 5. Proposed Future Folder Structure

```text
src/content/source-registry/
  types.ts
  school-materials.ts
  index.ts

src/lib/glossary/
  architecture.ts
  planning.ts
  construction.ts
  structure.ts
  interior.ts
  lighting.ts

src/lib/interior-styles/
src/lib/materials/
src/lib/furniture/
src/lib/drawing-terms/
src/lib/exam-concepts/
src/lib/search-intelligence/
src/lib/history-terms/
```

Source references should remain separate from public copy. Public definitions should be original multilingual editorial writing, never extracted paragraphs.

## 6. Estimated Coverage After Deduplication

| Category | Estimated candidates | Estimated unique records |
|---|---:|---:|
| Glossary / general planning terms | 700-900 | 420-560 |
| Interior style entries | 80-110 | 45-65 |
| Materials and finishes | 300-380 | 190-250 |
| Furniture, fixtures, and product types | 280-360 | 170-230 |
| Drawing and presentation terms | 220-300 | 140-190 |
| Exam and learning concepts | 430-560 | 230-320 |
| Building Code concepts | 100-150 | 70-100 |
| Construction terms | 260-340 | 170-230 |
| Structure terms | 180-250 | 120-170 |
| Lighting terms | 90-140 | 60-95 |
| Architecture history/style terms | 430-560 | 260-360 |

Expected total after cross-category deduplication: **1,350-1,750 unique records**. Many records will belong to more than one category, so category totals should not be added directly.

Balance is strongest in RC/concrete, residential planning, Japanese/Western history, and interior coordination. It is weakest in steel/timber structures, environmental engineering, building services, landscape, accessibility, acoustics, sustainability, digital fabrication, and contemporary construction practice.

## 7. First 50 High-Value Terms

The first extraction batch should maximize reuse across search, Code Topics, planning, and exams:

1. 建築計画
2. モデュール
3. モデューラーコーディネーション
4. グルーピング
5. ゾーニング
6. 動線
7. サービス動線
8. 避難経路
9. 単位空間
10. 人体寸法
11. 建築面積
12. 延べ面積
13. 敷地面積
14. レンタブル比
15. コア
16. センターコア
17. ダブルコア
18. メゾネット
19. スキップフロア
20. コンクリート
21. 鉄筋コンクリート
22. セメント
23. 水和
24. 水和熱
25. フレッシュコンクリート
26. ワーカビリティー
27. 骨材
28. 細骨材
29. 粗骨材
30. 水セメント比
31. スランプ
32. 空気量
33. 調合強度
34. 設計基準強度
35. 異形棒鋼
36. 定着
37. かぶり厚さ
38. クリープ
39. 乾燥収縮
40. 用途地域
41. 建蔽率
42. 容積率
43. 接道義務
44. 道路斜線制限
45. 北側斜線制限
46. 日影規制
47. 防火地域
48. 準防火地域
49. 耐火建築物
50. 内装制限

## 8. Risks And Required Review

- **Copyright:** exercise and answer PDFs have the highest risk. Extract concepts, not wording or question structure.
- **Source authority:** school materials are learning aids. Laws, standards, dimensions, and product claims require official or manufacturer sources.
- **PDF encoding:** several Keynote-export PDFs yield garbled text. They require page-targeted visual review, not blind automated extraction.
- **Edition drift:** 2025/2026 values may later change. Store source year and review date.
- **Historic accuracy:** architect attribution, dates, reconstruction phases, and translated names need museum, heritage, foundation, or academic references.
- **Translation:** Chinese and English should be written for learners, not mechanically translated. Japanese terms and readings remain visible.
- **Taxonomy overlap:** planning, interiors, Code, structures, and history share terms. Use one canonical record with multiple relationships.
- **Brand/product data:** product names, designers, and manufacturers should link to official sources and avoid promotional copy.

## 9. Recommended Next Command

After approval, begin with a **dry-run extraction of 100 candidates** from the five concise RC lecture PDFs and the two interior reference compilations:

1. create source registry metadata only;
2. extract Japanese candidate terms plus page references into a private review file;
3. deduplicate against the existing Glossary;
4. return a review report before writing public zh/ja/en definitions.

Do not begin with exam PDFs or history attributions. The first batch should prove the normalization and review workflow on lower-risk terminology.
