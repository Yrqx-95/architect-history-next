# Timeline UX Review

Review date: 2026-06-07

## Evidence

### T1. The first choice is data density, not historical curiosity

- URL: `http://localhost:3000/en/timeline`
- Screenshot: [evidence/p1-review/timeline-en-mobile-light.png](evidence/p1-review/timeline-en-mobile-light.png)
- Problem: The first viewport presents totals and "high-density decade" cards. No historical event, building, architect, or question appears.
- Why it matters: Timeline initially feels like an analytics view of the collection rather than history exploration.
- Suggested solution: Lead with one continuous historical rail or a current featured period. Move collection statistics below the first exploratory interaction.
- Priority: **P1-A**

### T2. Multiple timeline systems compete

- URL: `http://localhost:3000/ja/timeline`
- Screenshot: [evidence/p1-review/timeline-ja-desktop-light.png](evidence/p1-review/timeline-ja-desktop-light.png)
- Problem: High-density decades, period navigator, and decade navigator appear as separate systems with similar card styling.
- Why it matters: Users must decide how the timeline works before they can use it. The repeated containers make the page feel unfinished and tool-like.
- Suggested solution: Choose one primary navigation model. Use periods for orientation, then reveal decades and entries within the selected period.
- Priority: **P1-B**

### T3. Horizontal cards are visibly clipped without strong interaction cues

- URLs: `http://localhost:3000/ja/timeline`, `http://localhost:3000/zh/timeline`
- Screenshots: [evidence/p1-review/timeline-ja-desktop-light.png](evidence/p1-review/timeline-ja-desktop-light.png), [evidence/p1-review/timeline-zh-tablet-light.png](evidence/p1-review/timeline-zh-tablet-light.png)
- Problem: The final card is cut off, a scrollbar is exposed, and small arrow buttons sit far from the content being moved.
- Why it matters: Clipping may imply more content, but it also resembles an overflowing data table. Touch, drag, click, and card-open behavior are not clearly differentiated.
- Suggested solution: Use a stronger selected-period state, larger next/previous labels, and a deliberate partial-card affordance without a browser-style scrollbar.
- Priority: **P1-A**

### T4. Decade labels provide no narrative reason to click

- URL: `http://localhost:3000/en/timeline`
- Screenshot: [evidence/p1-review/timeline-en-mobile-light.png](evidence/p1-review/timeline-en-mobile-light.png)
- Problem: "1950s, 71 Buildings" is the dominant content.
- Why it matters: Quantity is not a historical proposition. Users cannot anticipate what they will learn.
- Suggested solution: Add a short era signal to each decade, such as reconstruction, megastructures, postmodern turn, or digital practice. Keep counts secondary.
- Priority: **P1-B**

## Verdict

Timeline currently reads as a data atlas with historical labels. Its next iteration should establish one narrative navigation model and make every click promise a historical idea.
