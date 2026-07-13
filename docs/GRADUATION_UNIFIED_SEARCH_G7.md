# G7 Unified Search and Filter Verification

Date: 2026-07-13

## Result

The existing `/api/search` index now joins canonical buildings with active multilingual function names/aliases, approved function assignments, published graduation profiles, graduation keywords and issue references. One building remains one result; `perspectives` and the search UI distinguish the canonical building view from the optional graduation-reference view.

Supported filters are `function`, `period`, `country`, `architect`, and `issue`. Function filters accept either a canonical slug or an exact Chinese, Traditional Chinese, English or Japanese alias. Exact function queries are resolved as function intent before general text scoring, so `library`, `图书馆`, and `図書館` return the same complete approved building set rather than three differently truncated fuzzy sets.

## Regression and performance

- Multilingual library queries and `function=library` return identical slug sets with more than 20 results and zero duplicates.
- The combined `function=library&period=2010s&country=JP&issue=ISSUE-003` filter returns only matching records and includes Kanazawa Umimirai Library / CASE-018.
- Existing general building/architect scoring and overlong-query rejection remain covered.
- Local production-build measurements: first uncached English library query 246 ms; subsequent multilingual index queries 5–14 ms; warm requests 2–6 ms; combined filter 3 ms cold and 2 ms warm.

At the current corpus size the measured latency is acceptable. A Postgres full-text index is therefore not added; doing so now would add write and synchronization complexity without evidence of a performance need.
