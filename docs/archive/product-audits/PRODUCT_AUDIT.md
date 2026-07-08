# Product Audit

Generated: 2026-06-09

Scope: current Archistory product experience. This audit is about product value, learning experience, content journeys, and user motivation. It does not propose metadata writes, migrations, taxonomy changes, or new data.

## Executive View

Archistory already has the shape of a serious architecture learning archive: multilingual pages, building and architect detail pages, browse paths by country/type/style/era, glossary, code learning, timeline, and guided paths. The strongest product idea is not "a database of buildings"; it is "a reading system that helps users move from a work, to an architect, to a period, to concepts, to other comparable works."

The current weakness is that the product often shows the archive, but does not always explain why the next click matters. A student can browse, but the site does not yet consistently turn browsing into a daily learning habit.

## 1. Search System

### Severe Issues

- Search results do not explain why a result matched. A student searching "museum", "Tokyo", or "modernism" sees items, but not the matching field or learning reason.
- Results are not organized by learning intent. There is no distinction between "I know the name", "I want examples", "I want a concept", or "I am studying for an exam."
- Search does not connect directly into learning objects. Glossary terms, code topics, learning paths, and timeline topics are not presented as first-class results.

### Medium Issues

- Type labels appear as raw slugs such as `cultural` or `office`, which feels database-like rather than editorial.
- Search suggestions are static and narrow. They do not adapt to the archive's strongest content or the user's language.
- No result preview explains significance, style, period, or why the work is worth opening.

### Opportunities

- Add result reason labels: "matched architect", "matched city", "matched type", "matched style", "matched glossary term."
- Add learning-oriented filters: Buildings, Architects, Terms, Code, Timeline, Paths.
- Add starter queries for students: "concrete", "section", "museum", "Le Corbusier in Japan", "public housing", "light in churches."

## 2. Building Detail Page

### Severe Issues

- The page has strong sections, but many works still feel like fact sheets rather than lessons. A student needs a clear answer to: "What should I learn from this building?"
- The study map is promising, but pending sections can make the page feel incomplete unless the page clearly frames what is available and what is not.
- Some detail pages may carry unresolved historical uncertainty. The product needs visible confidence language for records that are pending review.

### Medium Issues

- Important learning anchors such as spatial idea, historical problem, structure, material, and sources are not always equally available.
- Related links exist, but the learning logic can still feel generic: same architect, same style, same type. The page should more often say "compare this because..."
- Source links are present, but source quality is not yet turned into reader trust signals.

### Opportunities

- Add a "Why this matters" block near the top for every major work.
- Add "Look for this" prompts: plan, section, facade, structure, material, light, urban role.
- Turn related buildings into comparisons: "Compare with X for free plan", "Compare with Y for museum circulation."

## 3. Architect Detail Page

### Severe Issues

- Architect pages have strong chronology and relations, but the learning payoff is inconsistent. A student should quickly understand the architect's core problem, not only biography and works.
- The works list can become a catalog rather than a guided career arc.
- Influence networks are valuable, but they need clearer interpretation: mentor, peer, successor, contrast, school, office, or historical lineage.

### Medium Issues

- Core ideas appear when available, but many pages depend on fallback summaries.
- Chronology is useful, but not always grouped into phases.
- The page does not always answer "which three works should I study first?"

### Opportunities

- Add "Study this architect through 3 works" as a recurring product pattern.
- Add career phases: early, mature, late, or topic-based phases.
- Add "common exam / critique keywords" for architects where appropriate.

## 4. Country Page

### Severe Issues

- Country pages currently behave like filtered archives, not country-specific narratives. A student opening Japan, France, or the US needs a short framing: what is distinctive here?
- The page mixes architects and buildings without a strong study route.
- It does not yet answer "what should I learn about architecture in this country?"

### Medium Issues

- Counts are useful, but they are not learning goals.
- Country pages may overrepresent whatever data is complete, rather than what is pedagogically representative.
- There is no obvious "start here" order for country study.

### Opportunities

- Add country reading routes: "Japan: Metabolism -> Tange -> Ando -> SANAA -> Kuma."
- Add representative periods and themes per country.
- Add "top works to learn this country" with 5-7 curated entries.

## 5. Type Page

### Severe Issues

- Type pages are currently lists by program/use. They do not yet teach how a type works architecturally.
- A student opening "museum", "library", "church", or "housing" needs typological questions: circulation, light, public/private threshold, structure, urban role.
- Type pages risk feeling like taxonomy pages rather than learning pages.

### Medium Issues

- Type descriptions are short and generic.
- No cross-type comparison exists, such as museum vs gallery, church vs chapel, office vs civic-public.
- The page does not surface canonical examples first in a consistently editorial way.

### Opportunities

- Add type study prompts: "What changes between museum and library?" "How does light organize religious space?"
- Add type timelines: how the type changes across periods.
- Add comparative grids: canonical works, contemporary works, regional variants.

## 6. SEO

### Severe Issues

- Page titles and descriptions exist, but many pages are not yet framed around search intent. A search user may want "what is X", "who designed X", "why is X important", or "examples of X."
- The strongest unique value, multilingual architecture learning, is not always explicit in metadata or page intros.
- List pages may have thin explanatory content, which weakens their value as landing pages.

### Medium Issues

- Some result labels and taxonomy names can appear too database-like.
- Building pages may lack consistent descriptive summaries when rich content is missing.
- Learning pages have strong direction, but need tighter connections from search landing pages into study outcomes.

### Opportunities

- Make each major page answer a query: "What is this building?", "Why study this architect?", "Examples of this type."
- Add short editorial intros to browse pages.
- Use internal learning paths as SEO landing assets: "Modern architecture route", "Museum architecture examples", "Japanese building code basics."

## 7. Internal Link Structure

### Severe Issues

- Internal links exist, but the reason for the link is not always educationally explicit.
- The user can move around the archive, but the product does not always make the next step feel necessary.
- Building, architect, style, era, type, country, glossary, and code pages are connected, but not yet unified into a visible learning graph.

### Medium Issues

- "Continue Exploring" is useful but can feel generic.
- Browse pages are good entry points, but they do not always lead into guided routes.
- Glossary/code concepts are not deeply embedded into building and architect pages.

### Opportunities

- Convert links into learning prompts: "Read next if you want to understand X."
- Add "concept links" inside building pages: structure, material, plan, section, light, circulation.
- Add "return paths": after reading a glossary term, suggest buildings where the concept is visible.

## 8. Learning Value

### Severe Issues

- The product has learning components, but the daily learning loop is not yet fully formed.
- There is no clear progress model: what have I learned, what should I read next, what is the next concept?
- Learning pages and archive pages still feel partly separate.

### Medium Issues

- Glossary and code learning are promising but need more direct examples from buildings.
- Learning paths are useful, but the student needs a stronger reason to follow one path today.
- The site does not yet give small, repeatable daily tasks.

### Opportunities

- Add daily study modes: "one building", "one architect", "one term", "one comparison."
- Add mini-prompts: "Sketch the plan logic", "Identify the structural system", "Compare light strategy."
- Add saved or visible progress later, but even without accounts the site can suggest "today's route."

## If I Am An Architecture Student, Why Would I Come Back Every Day?

Right now, I would come back because Archistory can become a compact daily studio companion: one place to see buildings, architects, periods, styles, vocabulary, and code concepts side by side. It helps me connect names I hear in class to actual works, images, years, places, and related examples.

The daily reason becomes strongest if Archistory promises a small learning ritual:

- Today I learn one building and why it matters.
- Today I compare two works by type, style, or architect.
- Today I learn one term and see it in real buildings.
- Today I follow one link from architect to work to period.
- Today I prepare one concept I can use in critique, exam study, or design studio.

The product should not compete with Wikipedia as "more facts." Its daily value should be:

- faster orientation,
- better architectural framing,
- visual examples,
- multilingual reading,
- guided comparison,
- and a clear path from curiosity to architectural understanding.

If this promise is made explicit, Archistory can become a habit because it reduces the friction of architecture study: instead of searching scattered sources, a student gets a readable route through works, people, terms, and ideas.

## Product Priority Recommendation

### P0

- Make every major building page answer: "Why study this?"
- Make search explain result relevance.
- Turn browse pages from lists into learning entrances.
- Connect glossary/code concepts into building examples.

### P1

- Add curated "start here" routes for country and type pages.
- Add "study through 3 works" to architect pages.
- Improve result labels and taxonomy display language.

### P2

- Add daily learning prompts.
- Add comparison modules.
- Add progress or lightweight study state after the learning loop is clear.
