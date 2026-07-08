# Architect Detail UX Review

Review date: 2026-06-07

## Evidence

### AD1. Mobile delays the human story behind an image placeholder

- URL: `http://localhost:3000/zh/architect/tadao-ando`
- Screenshot: [evidence/p1-review/architect-zh-mobile-light.png](evidence/p1-review/architect-zh-mobile-light.png)
- Problem: Name and romanization are followed by a tall blank portrait placeholder. The biography begins below it.
- Why it matters: The page temporarily feels like a broken record view instead of a person-led story.
- Suggested solution: On image failure, use a compact portrait fallback and keep the introductory biography adjacent to the name.
- Priority: **P1-A**

### AD2. The desktop hero feels authored, but the next reading sequence is unclear

- URL: `http://localhost:3000/ja/architect/tadao-ando`
- Screenshot: [evidence/p1-review/architect-ja-desktop-light.png](evidence/p1-review/architect-ja-desktop-light.png)
- Problem: Biography, tags, portrait, relationship network, thought prompts, selected works, full works, timeline, and related entities all follow. No section is identified as the recommended first continuation.
- Why it matters: The page feels more human than a database record, but it still requires users to design their own reading route.
- Suggested solution: Add a "Start with these three works" sequence immediately after the biography, then place influence and complete works as deeper exploration.
- Priority: **P1-B**

### AD3. Relationship cards expose source-like language

- URL: `http://localhost:3000/ja/architect/tadao-ando`
- Screenshot: [evidence/p1-review/architect-ja-desktop-light.png](evidence/p1-review/architect-ja-desktop-light.png)
- Problem: Relationship explanations end with English phrases such as "Ando interviews and modernist reception" and "Modern architecture historiography".
- Why it matters: These read like internal evidence labels rather than finished editorial copy.
- Suggested solution: Visually separate source/evidence metadata from the relationship explanation and localize the label.
- Priority: **P1-A**

### AD4. Works and timeline risk repeating the same data

- URL: `http://localhost:3000/ja/architect/tadao-ando`
- Evidence screenshot: [evidence/p1-review/architect-ja-desktop-light.png](evidence/p1-review/architect-ja-desktop-light.png)
- Problem: Selected works, works list, timeline, and related buildings overlap in entities.
- Why it matters: Repetition adds page length without always adding a new learning lens.
- Suggested solution: Assign distinct jobs: selected works = editorial sequence; timeline = career development; related buildings = comparison beyond the architect.
- Priority: **P1-B**

## Verdict

Architect Detail is the closest reviewed surface to an editorial product. It needs resilient portrait behavior, cleaner evidence labels, and an explicit reading sequence.
