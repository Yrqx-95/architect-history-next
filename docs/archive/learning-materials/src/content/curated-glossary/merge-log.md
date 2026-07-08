# Glossary Merge Log

## Scope

- Input pool: 596 unique unpublished candidates reconstructed from the existing learning-source files.
- No new files, PDFs, OCR output, or external sources were scanned.
- Exact duplicate mentions were consolidated before review while retaining all source references.
- Accepted entries remain drafts and are not wired into the public glossary.

## Canonical Merges

| Candidate | Canonical term | Reason |
| --- | --- | --- |
| ツインコア | ダブルコア | Same core-layout concept; retained as an alias. |
| 中央コア | センターコア | Japanese wording variant of the same planning term. |
| フィックス窓 | FIX窓 | Orthographic variant. |
| 天窓 | トップライト | Common Japanese equivalent; retained as an alias. |
| 切妻 | 切妻屋根 | Short form normalized to the explicit roof term. |
| 寄棟 | 寄棟屋根 | Short form normalized to the explicit roof term. |
| SI住宅 | スケルトン・インフィル | Abbreviation normalized to the full system name. |
| ツーバイフォー工法 | 枠組壁工法 | Common name normalized to the formal construction term. |
| 木造軸組工法 | 在来軸組工法 | Closely equivalent construction-system wording. |
| 竪穴住居 | 竪穴式住居 | Orthographic variant. |
| 擬洋風 | 擬洋風建築 | Short form normalized to the explicit architectural term. |
| 排煙 | 排煙設備 | Context in the source refers to the building system. |
| 非常照明 | 非常用照明 | Common shortened form normalized to the code term. |

## Exact Duplicate Consolidation

Repeated mentions were merged into one candidate record with combined `sourceRefs`. The most frequent source terms were:

| Term | Mentions |
| --- | ---: |
| サービス動線 | 5 |
| 混合セメント | 3 |
| 細骨材率 | 3 |
| 空気量 | 3 |
| 配筋 | 2 |
| 座屈 | 2 |
| 線膨張率 | 2 |
| シェル構造 | 2 |
| 曲げモーメント | 2 |
| せん断力 | 2 |
| 水硬性 | 2 |

Several cement and aggregate classifications also appeared twice and were consolidated in the same way.

## Deliberately Not Merged

These pairs remain separate or pending because merging would erase a useful technical distinction:

| Terms | Decision |
| --- | --- |
| DK / LD / LDK | Keep separate room-composition abbreviations. |
| 道路高さ制限 / 道路斜線制限 | Review wording and legal scope before canonicalization. |
| 北側高さ制限 / 北側斜線制限 | Review wording and legal scope before canonicalization. |
| 脆性 / 脆性材料 | Property and material classification are related but not identical. |
| 靭性 / 靭性材料 | Property and material classification are related but not identical. |
| 鉄筋コンクリート造 / 鉄筋コンクリート | Construction system and material usage differ by context. |

## Normalization Rules

- Unicode text is normalized with NFKC.
- Surrounding whitespace and repeated internal whitespace are removed.
- Japanese middle dots, hyphens, Latin capitalization, and established abbreviations are retained when technically meaningful.
- Aliases point to one canonical Japanese term and slug.
- Records with uncertain scope, naming, or educational value remain in `pending-review.ts`.
- Product names, isolated proper nouns, and context fragments unsuitable for a reusable glossary are recorded in `rejected-candidates.ts`.
