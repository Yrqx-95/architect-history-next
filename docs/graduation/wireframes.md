# Graduation Inspiration Wireframes

This document follows the V1 plan for the Graduation Inspiration Library. It describes page structure only; visual style decisions should continue to follow real archive/product references instead of invented decoration.

## Scope

Routes:

- `/[lang]/graduation`
- `/[lang]/graduation/issues`
- `/[lang]/graduation/issues/:id`
- `/[lang]/graduation/sites`
- `/[lang]/graduation/sites/:id`
- `/[lang]/graduation/cases`
- `/[lang]/graduation/cases/:id`
- `/[lang]/graduation/random`
- `/[lang]/graduation/brief`

Primary user path:

1. Home
2. Issue library
3. Issue detail
4. Related site type
5. Related case
6. Export current direction

Secondary path:

1. Home
2. Random inspiration
3. Inspect generated issue, site types, and cases
4. Export JSON or CSV

## Home

Purpose: give a clear entry without a long text wall.

Structure:

- Header/navigation
- Page label: Graduation Inspiration Library
- Main title: start from a social issue
- Short support sentence
- Primary action: open issue library
- Secondary action: try random inspiration
- V1 scope block
- Teacher brief link
- Popular issue tags
- Featured issue cards
- Featured case cards

Notes:

- Search should not dominate the first screen.
- The first screen should make the next action obvious.
- Avoid nested cards inside cards.

## Issue Library

Purpose: browse social issues and filter quickly.

Structure:

- Page title
- Short instruction sentence
- Keyword search
- Tag filter
- Export current filtered JSON
- Count
- Issue card grid

Issue card:

- Title
- 50-120 character summary
- 3 visible keyword chips

Planned improvement:

- Add field-specific filters for site type and building type.

## Issue Detail

Purpose: connect one social issue to site types, building uses, reference cases, and sources.

Structure:

- Back breadcrumb via page label
- Issue title
- Issue summary
- Recommended building types
- Source links
- Recommended site type cards
- Related case cards
- Export current direction JSON
- Export current direction CSV
- Back button

Related case card:

- Image or source-first placeholder
- Case name
- Relation note
- Case concept
- Location

Notes:

- Relation notes are an implementation enhancement. They support the planned browsing path by explaining why each case belongs to the issue.

## Site Library

Purpose: browse site types instead of exact land parcels.

Structure:

- Page title
- Keyword search
- Tag filter
- Export current filtered JSON
- Count
- Site type card grid

Site card:

- Site type name
- Fit reason
- Typical address example

## Site Detail

Purpose: show which issues and cases can use a site type.

Structure:

- Site type title
- Fit reason summary
- Typical address block
- Keyword chips
- Related issue cards
- Related case cards
- Back button

Notes:

- Related cases here do not show issue-specific relation notes because this page can aggregate several issues.

## Case Library

Purpose: browse reference cases with visual orientation.

Structure:

- Page title
- Keyword search
- Tag filter
- Export current filtered JSON
- Count
- Case card grid

Case card:

- Image or placeholder
- Case name
- Concept
- Location

## Case Detail

Purpose: inspect one reference case, source, image attribution, and related issues.

Structure:

- Case title
- Case concept
- Large image or placeholder
- Basic information
- Keyword chips
- Source link
- Image source/license/credit when available
- Related issue cards
- Back button

## Random Inspiration

Purpose: generate one usable direction from structured data, not AI.

Structure:

- Page title
- Short explanation
- Generated title
- Issue summary and chips
- Actions:
  - generate again
  - export JSON
  - export CSV
- Recommended site type cards
- Related case cards with relation notes

## Teacher Brief

Purpose: translate course requirements into a readable checklist.

Structure:

- Page title
- Short summary
- Structured brief sections:
  - difference from previous assignments
  - theme, site, use
  - Q1-Q7
  - proposal checklist
  - fieldwork reminders

## Mobile Notes

- Cards stack in one column.
- Export buttons wrap instead of overflowing.
- Text should stay concise; no tutorial block unless it directly supports action.
- Header and mobile menu must expose the graduation submenu.
