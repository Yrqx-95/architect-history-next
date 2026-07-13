# Content Trust — 3 WTC Batch 001 Execution

日期：2026-07-13  
状态：Reviewed migration prepared; production write not yet executed

## Scope

This batch repairs only `3-world-trade-center`:

- adds sourced Chinese and Japanese names;
- sets New York / United States and the reviewed `office` type;
- adds three-language description and significance based on RSHP project material;
- adds the current RSHP project page as `official_url`;
- resolves the invalid two-primary-image state;
- replaces the ambiguous skyline primary with the reviewed JJBers Commons image.

It does not touch graduation records, protected image-fill batches, architect content, Parc.1, or any other building.

## Locked production pre-state

- building ID: `ead4315f-9147-4813-b1bd-b21969da36ec`
- prior `updated_at`: `2026-07-08T16:11:20.896254+00:00`
- prior primary image IDs:
  - `da5718d0-7a9b-5077-8680-0b9ee919596c`
  - `a01e8696-1a6c-56e6-9f86-a57e7bdef7b4`
- reviewed replacement: JJBers, CC BY 4.0, 5152×3864
- Commons source: `https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg`

The apply transaction refuses to run if any of those facts drift or if the replacement already exists.

## Verification gates

1. Recheck the production row, both old primary IDs, and Commons file metadata.
2. Run `npm run content:verify-3wtc-001`.
3. Confirm the migration file exactly matches the manual apply file.
4. Run typecheck, lint, unit tests, data audit and Graduation QA.
5. Open and merge a reviewed PR before production execution.
6. Apply the versioned migration, then query the building and all primary images.
7. Build and release through the normal Reviewed production pipeline.
8. Verify zh/en/ja building pages, search result, image response and unknown-route 404 behavior.

## Rollback boundary

The rollback refuses to run if the repaired metadata, reviewed primary image, or either prior image row changed after deployment. A successful rollback restores the exact prior metadata and two-primary-image state; it is an emergency reversal, not the desired steady state.

## Sources

- RSHP project: https://rshp.com/projects/office/3-world-trade-center/
- World Trade Center project: https://wtc.com/work-place/3wtc/
- Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg

