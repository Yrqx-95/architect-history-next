# Code Topics UX Review

Review date: 2026-06-07

## Evidence

### C1. The topic index is educational in copy but index-like in structure

- URL: `http://localhost:3000/ja/code`
- Screenshot: [evidence/p1-review/code-ja-desktop-light.png](evidence/p1-review/code-ja-desktop-light.png)
- Problem: Eight topics use equal columns, similar excerpts, and difficulty pills. No first topic or conceptual sequence is visually dominant.
- Why it matters: Users see a syllabus inventory but not a lesson order.
- Suggested solution: Mark one "Start here" topic, group the rest into area, access, envelope, and fire, and show a short recommended sequence.
- Priority: **P1-A**

### C2. Draft and review-status language dominates the topic detail

- URLs: `http://localhost:3000/ja/code/road-slant-restriction`, `http://localhost:3000/zh/code/road-slant-restriction`
- Screenshots: [evidence/p1-review/code-topic-ja-desktop-light.png](evidence/p1-review/code-topic-ja-desktop-light.png), [evidence/p1-review/code-topic-zh-mobile-light.png](evidence/p1-review/code-topic-zh-mobile-light.png)
- Problem: "Draft", "basic quality", and "unreviewed" badges appear in a prominent bordered panel before the lesson.
- Why it matters: Honest status is useful, but the current weight makes the page feel like internal content operations or exam notes rather than a finished learning product.
- Suggested solution: Reduce status to a quiet note near sources or footer. Keep only the legal-use warning near the top.
- Priority: **P1-A**

### C3. Japanese terms inside Chinese and English pages are insufficiently framed

- URL: `http://localhost:3000/zh/code/road-slant-restriction`
- Screenshot: [evidence/p1-review/code-topic-zh-mobile-light.png](evidence/p1-review/code-topic-zh-mobile-light.png)
- Problem: Japanese pronunciation and keyword blocks are prominent, but their learning purpose is not explicitly stated.
- Why it matters: The page may look partially untranslated rather than intentionally bilingual.
- Suggested solution: Label the block as "Japanese term used in drawings and regulations" and explain why the learner should retain it.
- Priority: **P1-A**

### C4. The product stance remains partly exam-oriented

- URL: `http://localhost:3000/ja/code/road-slant-restriction`
- Screenshot: [evidence/p1-review/code-topic-ja-desktop-light.png](evidence/p1-review/code-topic-ja-desktop-light.png)
- Problem: Difficulty, review state, legal disclaimer, keyword memorization, and compact definitions create an exam-preparation tone even when the prose says "learning explanation".
- Why it matters: This conflicts with Learn's promise to connect concepts to architecture rather than become a question bank.
- Suggested solution: Lead with a spatial design question and diagram-reading goal; place exam cautions and memorization aids later.
- Priority: **P1-B**

## Verdict

Code Topics contain useful explanations, but their framing still resembles a study index and content-review system. Sequence and design relevance should lead.
