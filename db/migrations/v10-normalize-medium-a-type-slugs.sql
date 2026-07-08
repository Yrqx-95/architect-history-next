-- ============================================================
-- V10: Normalize Sprint 05 medium-confidence A type_slug candidates
-- Source: scripts/normalize-type-slugs-medium-a.ts
-- Scope: Sprint 05 category A only; B/C/manual candidates excluded.
-- Idempotent: updates only rows where type_slug IS NULL.
-- Rollback: db/migrations/v10-normalize-medium-a-type-slugs-rollback.sql
-- ============================================================

BEGIN;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'airman-memorial-chapel' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'hirshhorn-museum-and-sculpture-garden' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'european-court-of-human-rights' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'centre-georges-pompidou' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'research-institute' WHERE slug = 'pa-technology-cambridge-laboratory-pats-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'paleis-of-justice-in-antwerp' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'serpentine-gallery-pavilion-2005' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'logrono-town-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'footbridge-of-the-science-museum' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'transportation' WHERE slug = 'atocha-cercanias' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'temporary' WHERE slug = 'carlos-ramos-pavilion' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'bank-of-spain-headquarters' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'r-dovre-town-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'rudersdal-town-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'nagano-city-arts-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'sydney-opera-house' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'aarhus-city-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'kuwait-national-assembly-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'kirishima-international-concert-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'temporary' WHERE slug = 'de-la-warr-pavilion' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'sports' WHERE slug = 'campbell-sports-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'transportation' WHERE slug = 'madrid-puerta-de-atocha-almudena-grandes' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'shangyin-opera-house' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'temporary' WHERE slug = 'tschumi-pavilion' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'french-embassy-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'dar-al-islam' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'sao-paulo-museum-of-art' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'sri-lankan-parliament-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'chiesa-di-nostra-signora-del' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'temporary' WHERE slug = 'finnish-pavilion' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'sports' WHERE slug = 'sports-hall-u2' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'grosse-pointe-public-library-central' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'educational' WHERE slug = 'helsinki-university-of-technology-main' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'rovaniemi-town-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'robert-c-weaver-federal-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'chapelle-cumenique-de-flaine' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'educational' WHERE slug = 'murray-d-lincoln-campus-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'cleveland-museum-of-art-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'los-angeles-county-hall-of' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'government-service-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'new-york-public-library-for' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'niagara-falls-public-library' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'orange-county-government-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'jewett-arts-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'presidential-palace-damascus' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'hirosaki-city-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'monument' WHERE slug = 'hiroshima-national-peace-memorial-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'educational' WHERE slug = 'united-nations-university' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'kagawa-prefectural-government-office' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'former-tokyo-metropolitan-government-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'kuwait-embassy-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'kinokuniya-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'kagawa-prefectural-government-office-main' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'hashima-city-hall-1959-2022' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'hirosaki-civic-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'ishigaki-civic-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'government' WHERE slug = 'okayama-prefectural-government-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'ibaraki-prefectural-culture-center' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'kanazawa-bunka-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'okayama-symphony-hall' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'loceanografic' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'nuestra-senora-del-libano-montevideo' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'sports' WHERE slug = 'palacio-de-los-deportes' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'parroquia-maronita-de-nuestra-senora' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'esbjerg-performing-arts-centre' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'foundation-e-g-buhrle-collection' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'andre-malraux-cultural-centre' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'serpentine-gallery-pavilion-2017' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'transportation' WHERE slug = 'bridge-of-peace' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'cultural' WHERE slug = 'groninger-museum-building' AND type_slug IS NULL;
UPDATE buildings SET type_slug = 'religious' WHERE slug = 'chiesa-del-santo-volto' AND type_slug IS NULL;
COMMIT;
