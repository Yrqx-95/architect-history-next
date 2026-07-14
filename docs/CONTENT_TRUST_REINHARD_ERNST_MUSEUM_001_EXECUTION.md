# Content Trust — Museum Reinhard Ernst Batch 001

日期：2026-07-14
状态：Reviewed migration prepared; production write pending PR merge

## Scope

This batch changes only `reinhard-ernst-museum`:

- adds sourced Chinese and official Japanese names;
- sets Wiesbaden / Germany;
- adds source-backed description and significance in Chinese, English and Japanese;
- adds the museum architecture page as `official_url`;
- retains the verified Gerda Arendt atrium image under CC0 as the sole primary;
- corrects that atrium image from `exterior` to `interior`;
- demotes, but does not delete, the unrelated Unsplash primary.

It does not touch graduation records, architect content, image-fill batches or any other building.

## Locked production pre-state

- building ID: `c2991ac8-3dec-4033-9e81-70aab038c774`
- prior `updated_at`: `2026-07-08T16:11:20.896254+00:00`
- prior primary IDs:
  - ambiguous Unsplash: `0e6b2f3b-9eab-5983-9b9c-772ba382bc96`
  - reviewed CC0 atrium: `47fa4a36-934a-53f4-9e85-957a4c6c6f0d`

The migration refuses to run if the building row, exact primary count, image IDs, source metadata or CC0 license drift.

## Verification gates

1. Run `npm run content:verify-reinhard-ernst-museum-001`.
2. Confirm the migration is byte-identical to the reviewed apply SQL.
3. Run typecheck, lint, unit tests, data audit and Graduation QA.
4. Merge the reviewed PR before production execution.
5. Recheck the production conflict guards and Commons file page.
6. Apply the versioned migration and query the building and all primary images.
7. Build and release through the Reviewed production pipeline.
8. Verify zh/en/ja pages, search, image response and unknown-route 404 behavior.

## Sources

- Museum architecture: https://www.museum-re.de/en/museum/architecture/
- Maki and Associates EN: https://www.maki-and-associates.co.jp/projects/WTM?lang=en
- Maki and Associates JA: https://www.maki-and-associates.co.jp/projects/WTM
- Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Ernst_Museum,_Wiesbaden,_atrium.jpg
