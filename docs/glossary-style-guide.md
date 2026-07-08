# Glossary Style Guide

## Purpose

Keep Archistory's glossary useful for architecture learning without mixing concepts, archive entities, products, brands, and exam fragments.

## Term naming rules

- Use the most common canonical Japanese architectural term as `termJa`.
- Prefer full terms over abbreviations unless the abbreviation is the standard learning term.
- Do not use isolated product names, designer names, building names, model numbers, or OCR fragments as glossary terms.
- Keep one concept per entry.

## Japanese reading rules

- Add hiragana reading for kanji terms when known.
- Katakana terms may repeat the katakana as reading.
- Leave reading blank only in internal draft files and mark `needsReview`.

## Chinese translation rules

- Use concise architecture-learning Chinese, not literal machine translation.
- Keep Japanese legal terms recognizable when no clean Chinese equivalent exists.
- Avoid over-translating proper nouns; move those to archive/entity models instead.

## English translation rules

- Use standard architecture or building-code English where available.
- Prefer title case for displayed term titles.
- Mark review needed if the English term is provisional.

## Definition length rules

- Short definition: one sentence, ideally 25-45 Chinese characters or one concise English sentence.
- Explain what the term is and why it matters.
- Do not quote source material or reproduce class handouts.

## Alias rules

- Aliases must point to one canonical term.
- Use aliases for orthographic variants, abbreviations, and common alternative names.
- Do not use aliases to merge terms with different technical scope.

## Category rules

- Pick the category that best supports learning use.
- Use secondary categories only when the same concept genuinely bridges domains.
- Building-code, structure, and materials terms require stricter review than style labels.

## SourceRef rules

- Preserve source id, file name, page/page range when available.
- Source refs prove editorial traceability; they do not mean source text can be reproduced.
- Mark needsReview if source authority, page location, or context is uncertain.

## When to mark needsReview

- Reading is unknown.
- Chinese or English title is provisional.
- Definition boundary is uncertain.
- Term may be an alias or near duplicate.
- Source is exam-derived, case-study-only, or legally/technically sensitive.

## When to reject product names

Reject isolated brands, product series, designer-product names, and model numbers from the general glossary. Consider a separate product/furniture object model later.

## Entity boundary

| Type | Definition | Example |
| --- | --- | --- |
| Glossary term | Reusable concept or technical term | スラブ, 鉄筋コンクリート, 平面図, 吹抜け, 動線 |
| Archive entity | Person, building, place, institution, movement as a catalog object | 丹下健三, Villa Savoye, 伊勢神宮 |
| Product/furniture object | Designed object or product family | AKARI, named pendant lamps |
| Brand | Company or manufacturer name | FLOS, Louis Poulsen |
| Code topic | Learnable legal/regulatory topic with official-source needs | 容積率, 道路斜線制限 |
| Exam concept | Exam-useful wording or trap that must be verified independently | prompt-derived calculation labels |

## Good examples

- スラブ: reusable structural/building-part concept.
- 鉄筋コンクリート: foundational material/structure concept.
- 平面図: essential drawing term.
- 吹抜け: reusable spatial-design term.
- 動線: core planning term.

## Bad examples

- Isolated brand names.
- OCR fragments.
- Product model numbers.
- Vague style words without criteria.
- Single building names in the glossary.
