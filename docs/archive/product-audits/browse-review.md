# Browse UX Review

Review date: 2026-06-07

## Evidence

### B1. The landing page leads with inventory counts

- URL: `http://localhost:3000/en/browse`
- Screenshot: [evidence/p1-review/browse-en-mobile-light.png](evidence/p1-review/browse-en-mobile-light.png)
- Problem: The mobile first viewport is dominated by five large count cards: architects, works, paths, periods/styles, and regions.
- Why it matters: Counts explain database size but do not help a user choose an interesting direction. The page feels like an admin dashboard or catalog summary.
- Suggested solution: Replace the count-card stack with three editorial entry choices such as "Start with a period", "Meet an architect", and "Explore a building question". Keep totals as quiet supporting metadata.
- Priority: **P1-A**

### B2. Desktop architect cards are highly repetitive

- URL: `http://localhost:3000/ja/browse`
- Screenshot: [evidence/p1-review/browse-ja-desktop-light.png](evidence/p1-review/browse-ja-desktop-light.png)
- Problem: A dense grid repeats the same name, lifespan, country, and work-count structure with nearly equal visual weight.
- Why it matters: Scanning is possible, but discovery is not curated. Users see records rather than reasons to open a person.
- Suggested solution: Feature a small editorial set with portrait or interpretive hook, then provide the compact index. Reduce visible work-count badges unless they aid a specific comparison.
- Priority: **P1-B**

### B3. Editorial context arrives after quantitative framing

- URL: `http://localhost:3000/en/browse/style/modernism`
- Screenshot: [evidence/p1-review/browse-style-en-tablet-light.png](evidence/p1-review/browse-style-en-tablet-light.png)
- Problem: The period question is useful and editorial, but it appears after three statistic cards.
- Why it matters: The strongest reason to explore the style is visually secondary to record counts.
- Suggested solution: Put the period question and short thesis first; place counts beside or below it as evidence.
- Priority: **P1-A**

### B4. Browse does not clearly distinguish index mode from guided mode

- URL: `http://localhost:3000/ja/browse`
- Screenshot: [evidence/p1-review/browse-ja-desktop-light.png](evidence/p1-review/browse-ja-desktop-light.png)
- Problem: Learning routes, architects, works, periods, styles, and regions share the same surface without an explicit mode change.
- Why it matters: Users cannot tell whether Browse is recommending, filtering, or merely listing.
- Suggested solution: Separate "Curated ways in" from "Complete index" with clear headings and different visual treatments.
- Priority: **P1-A**

## Verdict

Browse is legible but still database-like. Its best editorial material exists; it needs to lead instead of follow the counts and grids.
