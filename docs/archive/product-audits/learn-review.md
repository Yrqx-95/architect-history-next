# Learn UX Review

Review date: 2026-06-07

## Evidence

### L1. The primary route is not primary on the Learn landing page

- URL: `http://localhost:3000/en/learn`
- Screenshot: [evidence/p1-review/learn-en-tablet-light.png](evidence/p1-review/learn-en-tablet-light.png)
- Problem: Building Code, Glossary, and exam-preparation messaging appear before Learning Paths. The Architecture Student route begins below the first viewport.
- Why it matters: A new user can understand what Archistory contains, but not which action is the recommended starting action. The page reads as a collection of learning resources before it reads as a guided product.
- Suggested solution: Move the Architecture Student route summary and "Start learning" action directly after the page introduction. Keep Code and Glossary as supporting tools below it.
- Priority: **P1-A**

### L2. Mobile turns a 20-30 hour path into one long expanded document

- URL: `http://localhost:3000/ja/learn#architecture-student`
- Screenshot: [evidence/p1-review/architecture-student-ja-mobile-light.png](evidence/p1-review/architecture-student-ja-mobile-light.png)
- Problem: All stages and all recommended terms are expanded. The first stage immediately becomes a long list, while later stages are invisible far below.
- Why it matters: The route communicates volume, not progress. "Start learning" scrolls to content but does not establish a current stage, sequence, or manageable first task.
- Suggested solution: Present a compact stage overview first. Expand Stage 01 by default and collapse later stages; add a persistent "Next stage" cue and a short stage outcome.
- Priority: **P1-A**

### L3. Recommended terms lack learning context

- URL: `http://localhost:3000/ja/learn#architecture-student`
- Screenshot: [evidence/p1-review/learn-ja-path-desktop-light.png](evidence/p1-review/learn-ja-path-desktop-light.png)
- Problem: Recommended terms are visually identical rows with arrows. The user cannot see why each term belongs to the stage or which term is the best first choice.
- Why it matters: The list behaves like an index embedded inside a path, weakening the sense of instruction.
- Suggested solution: Add one-line reasons for the first two or three terms, identify a single "Start here" term, and visually demote the rest to optional references.
- Priority: **P1-B**

### L4. Learn positioning is clearer than its navigation language

- URLs: `http://localhost:3000/ja`, `http://localhost:3000/ja/learn`
- Screenshots: [evidence/p1-review/home-ja-desktop-light.png](evidence/p1-review/home-ja-desktop-light.png), [evidence/p1-review/learn-ja-desktop-light.png](evidence/p1-review/learn-ja-desktop-light.png)
- Problem: The homepage establishes the student path, but the landing page uses "Learning Center", Code, Glossary, Learning Paths, and exam messaging as near-equal concepts.
- Why it matters: Users must reconstruct the information architecture after clicking Learn.
- Suggested solution: Use one stable hierarchy: Learn > Architecture Student > Stage > Term. Label Code and Glossary as tools used by the path.
- Priority: **P1-A**

## Verdict

Learn now has credible educational content and a real primary audience, but it still behaves like an organized collection. The immediate opportunity is sequencing, not expansion.
