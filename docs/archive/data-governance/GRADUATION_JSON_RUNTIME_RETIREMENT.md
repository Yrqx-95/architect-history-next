# Graduation JSON runtime retirement

Date: 2026-07-13

`content/cases.csv`, `public/data/graduation/cases.csv`, `public/data/graduation/cases.json`, and their build scripts remain preserved as compatibility exports and historical evidence. They are no longer intended to be imported by the application runtime after G9 cutover.

The runtime source is the Supabase `graduation_case_compatibility` table combined with `graduation_case_profiles`, `buildings`, `architects`, and reviewed images. Compatibility files remain downloadable at their old public paths. Updating an export requires an explicit source comparison; it must not silently overwrite reviewed canonical decisions.

Rollback is the previous runtime commit, which reads the same compatibility payload from the versioned JSON file. The database table rollback is separately guarded and refuses if its exact 101-row baseline has drifted.
