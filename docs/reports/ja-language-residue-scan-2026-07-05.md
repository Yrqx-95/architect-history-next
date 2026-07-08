# Japanese Route Language Residue Scan - 2026-07-05

## Scope

- Base: local production server `http://127.0.0.1:3017` after `npm run build`.
- Static Japanese routes scanned: 1331.
- Fetch failures: 0.

## Result

- High-confidence Chinese UI/content leaks found earlier in architect core ideas, country/city metadata, education metadata, and selected building text fields were fixed.
- Final scan findings are known low-confidence terms that also appear naturally in Japanese text:
  - `英国`: 9
  - `再利用`: 4
  - `与`: 82

## Interpretation

- `英国` appears in Japanese prose as a legitimate word for Britain.
- `再利用` appears in Japanese prose as a legitimate term for reuse/adaptive reuse.
- `与` appears in phrases such as `影響を与えた` and `与える`, which are normal Japanese.

## Fixed During This Pass

- Hide fallback `architect.core_ideas` on Japanese/English pages when the stored list is Chinese-only.
- Add more country/nationality aliases for Japanese display, including Netherlands, Belgium, Greece, Turkey, Egypt, Australia, and Korea.
- Localize known education strings for Frank Lloyd Wright and Herzog & de Meuron.
- Add `formatDisplayCity()` and localize `巴西利亚` as `ブラジリア`/`Brasilia`.
- Route timeline, country index, and building relation metadata through the city display helper.
- Expand Simplified Chinese detection for uncovered classical and Metabolism-era building fields.

## Remaining Risk

- The scanner is heuristic. New Chinese-only source fields can still appear if future data imports bypass localized fields.
- Some Japanese pages intentionally contain kanji terms that are visually identical to Chinese; those should not be automatically removed.

## Next Recommended Step

Move to the global UI unification pass, using the homepage line-separated hover style as the reference, while keeping this scanner available as a regression check before deployment.
