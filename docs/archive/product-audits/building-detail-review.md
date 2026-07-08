# Building Detail UX Review

Review date: 2026-06-07

## Evidence

### BD1. Failed or unresolved hero imagery creates a dominant blank rectangle

- URLs: `http://localhost:3000/ja/building/church-of-light`, `http://localhost:3000/en/building/church-of-light`
- Screenshots: [evidence/p1-review/building-ja-desktop-light.png](evidence/p1-review/building-ja-desktop-light.png), [evidence/p1-review/building-en-mobile-light.png](evidence/p1-review/building-en-mobile-light.png)
- Problem: The hero reserves a very large image area while showing only a neutral placeholder and alt text.
- Why it matters: This is the strongest "unfinished" signal in the reviewed product. On desktop it delays the title; on mobile it spends much of the first viewport on missing media.
- Suggested solution: When an image fails, collapse to a compact intentional fallback with title, image status, and attribution. Never preserve full cinematic height for an empty state.
- Priority: **P1-A**

### BD2. The page contains many next actions but no visible recommended next action

- URL: `http://localhost:3000/ja/building/church-of-light`
- Screenshot: [evidence/p1-review/building-ja-desktop-light.png](evidence/p1-review/building-ja-desktop-light.png)
- Problem: Architect, era, timeline, research anchors, knowledge relations, related buildings, similar buildings, and styles all exist, but the first viewport does not name a next step.
- Why it matters: Rich relation data does not automatically create direction. After reading the overview, the user must choose among many equivalent exits.
- Suggested solution: Add a compact "Continue from this building" block after the overview with one primary recommendation and two secondary options, each with a Why Related explanation.
- Priority: **P1-A**

### BD3. Metadata and interpretation compete on mobile

- URL: `http://localhost:3000/en/building/church-of-light`
- Screenshot: [evidence/p1-review/building-en-mobile-light.png](evidence/p1-review/building-en-mobile-light.png)
- Problem: Overview metadata begins immediately after title, description, and quote, creating several similarly weighted text blocks.
- Why it matters: Users cannot quickly distinguish identity, interpretation, and reference facts.
- Suggested solution: Keep title + one-sentence thesis together, compress metadata into a two-column fact strip, then begin the interpretive article.
- Priority: **P1-B**

### BD4. Mixed-language content weakens finish

- URL: `http://localhost:3000/en/building/church-of-light`
- Screenshot: [evidence/p1-review/building-en-mobile-light.png](evidence/p1-review/building-en-mobile-light.png)
- Problem: The English page contains a Chinese summary paragraph directly below the English title.
- Why it matters: Unexpected language switching looks like incomplete localization and interrupts reading.
- Suggested solution: Apply a single fallback rule: use the selected language, then English, and label any unavoidable source-language excerpt.
- Priority: **P1-A**

## Verdict

The building page has strong depth, but the first screen can look broken and its rich relationship model lacks a single recommended continuation.
