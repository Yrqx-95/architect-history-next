# Image Fill Reviewed Batch 001

Generated: 2026-07-10T12:12:57.324Z

Execution status: applied and verified. See `docs/archive/data-governance/IMAGE_FILL_BATCH_001_EXECUTION_LOG.md`.

## Scope

- Read-only preparation: no database rows were changed.
- Every approved image was rechecked against the live building row, Wikidata P18, Wikimedia Commons metadata, and the current primary image state.
- Q-ID placeholder identities, model/exhibition views, and construction-progress views stay out of the write draft.
- The SQL draft replaces only the current low-confidence primary image and records photographer, license, and source URL for visible attribution.

## Summary

- Queue candidates reviewed: 19
- Approved for write draft: 13
- Held for manual review: 6
- Insert draft: `reports/image-fill-reviewed-insert-draft.sql`
- Rollback draft: `reports/image-fill-reviewed-rollback-draft.sql`

## Approved

| Building | Wikidata | Evidence | License | Previous primary | Source |
|---|---|---|---|---|---|
| auerbacher-home | Q14681555 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-p18-stable | CC BY-SA 3.0 | Unsplash | https://commons.wikimedia.org/wiki/File:Auerbacher_Home.jpg |
| j-w-schaffer-house | Q39060356 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:J.W._SCHAFFER_HOUSE_GLENDALE_LOS_ANGELES_COUNTY_CA.jpg |
| iesu-church-san-sebastian | Q9006868 | wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:Iglesia_de_Iesu-Donostia-R._Moneo_(5).JPG |
| extension-of-museo-del-prado | Q47529298 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY 3.0 | Unsplash | https://commons.wikimedia.org/wiki/File:%C2%AE_MADRID_E.U.S._ARTECTURA_MUSEO_DEL_PRADO_-_panoramio_(1).jpg |
| arne-jacobsen-s-own-house | Q55065450 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:Godfred_Rodesvej_2.JPG |
| casa-ghiringhelli | Q19678139 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:Milano_-_Casa_Ghiringhelli_-_facciata.JPG |
| friedhof-der-synagogengemeinde-konigsberg | Q136687581 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:K%C3%B6nigsberg,_Friedhof_der_Synagogengemeinde.jpg |
| kirishima-international-concert-hall | Q11660873 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-p18-stable | CC BY-SA 3.0 | Unsplash | https://commons.wikimedia.org/wiki/File:Miyama_Conceru.JPG |
| institute-for-contemporary-art-richmond | Q28128127 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC0 | Unsplash | https://commons.wikimedia.org/wiki/File:Institute_for_Contemporary_Art,_Richmond_(night).jpg |
| sports-hall-u2 | Q28464280 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:University_of_Jyv%C3%A4skyl%C3%A4_-_U2.jpg |
| grosse-pointe-public-library-central | Q106900422 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-p18-stable | CC BY-SA 3.0 | Unsplash | https://commons.wikimedia.org/wiki/File:Grosse_Pointe_Public_Library_Central_Branch.jpg |
| palazzo-abatellis | Q1255652 | wikidata-name-or-sitelink-match, wikidata-year-match, wikidata-p18-stable | CC0 | Unsplash | https://commons.wikimedia.org/wiki/File:Palermo-Palazzo-Abatellis-bjs2007-01.jpg |
| college-of-education-staff-dormitory | Q28464258 | wikidata-name-or-sitelink-match, wikidata-architect-match, wikidata-year-match, wikidata-p18-stable | CC BY-SA 4.0 | Unsplash | https://commons.wikimedia.org/wiki/File:JYU_-_G.jpg |

## Held For Manual Review

| Building | Wikidata | Reasons | Candidate |
|---|---|---|---|
| zip-up-house | Q24965082 | model-or-exhibition-view-needs-context-review | https://commons.wikimedia.org/wiki/File:Zip-Up_House_model.jpg |
| 20-times-square | Q2631694 | construction-progress-view-needs-context-review | https://commons.wikimedia.org/wiki/File:20_Times_Square_Feb_2017.jpg |
| q5761063 | Q5761063 | q-id-placeholder-identity | https://commons.wikimedia.org/wiki/File:Aragonia_Zaragoza_4.JPG |
| q125398396 | Q125398396 | q-id-placeholder-identity | https://commons.wikimedia.org/wiki/File:Royal_Danish_Embassy_in_Japan_2010.jpg |
| q115688741 | Q115688741 | q-id-placeholder-identity | https://commons.wikimedia.org/wiki/File:Karolingerplatz_5-5A_(Berlin-Westend).JPG |
| q17369491 | Q17369491 | q-id-placeholder-identity | https://commons.wikimedia.org/wiki/File:Overzicht_van_de_voorgevel_-_Amstelveen_-_20419967_-_RCE.jpg |

## Verification Before Any Write

- Human-check the approved source pages and confirm the image represents the named work, not merely its site or institution.
- Run the SQL draft only after converting it to the project migration workflow; Supabase CLI is currently unavailable in this checkout.
- After application, verify exactly one primary image per affected building, then run image audit, content audit, typecheck, and lint.
