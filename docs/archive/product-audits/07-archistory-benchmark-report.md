# Archistory External Benchmark Report

Research date: June 7, 2026

## 1. Executive Conclusion

Archistory should not choose one external product as its model. Its product vision, **Architecture Learning Archive**, combines two behaviors that are usually separated:

1. A learning product tells people where to begin, what belongs together, and what to do next.
2. An archive product lets people browse entities, time, images, and relationships without forcing one sequence.

The five benchmark products each solve one part of that combination:

- Linear is strongest at structural hierarchy, alignment, dense information, and preserved object context.
- Notion is strongest at calm knowledge presentation, readable document hierarchy, and progressive disclosure.
- Khan Academy is strongest at beginner orientation, course hierarchy, and explicit next-step guidance.
- Google Arts & Culture is strongest at visual archive discovery and multiple cultural exploration axes.
- Are.na is strongest at networked knowledge, reusable entities, and non-linear collection behavior.

The research indicates that Archistory should use **Khan Academy as the behavioral foundation of Learn** and **Google Arts & Culture as the behavioral foundation of Explore**. It should use **Notion to shape knowledge pages**, **Linear to discipline the interface system**, and **Are.na to shape relationships behind the interface**.

This does not mean visually cloning any of these products. Their visual identities follow different purposes. Archistory needs its own architecture-specific expression: editorial enough to communicate cultural value, structured enough to support study, and neutral enough to let buildings and ideas remain central.

The highest-value direction is:

`A clear guided start -> a readable concept -> a real building example -> historical and conceptual connections -> a visible return to the path`

The core benchmark finding is that content only becomes a product when its relationships and next steps are visible. Archistory already has the necessary content layers. The next phase should make the learning loop legible.

## 2. Research Method

This sprint followed Phase 1 and used its findings as research questions. The sites were inspected live in a public, unauthenticated state on June 7, 2026. The review included real URLs, DOM observations, and viewport screenshots.

Observed pages:

### Linear

- https://linear.app/
- https://linear.app/plan

### Notion

- https://www.notion.so, redirected to https://www.notion.com/ja
- https://www.notion.com/help/guides, localized to the Japanese guide index

### Khan Academy

- https://www.khanacademy.org/
- https://www.khanacademy.org/humanities/art-history

### Google Arts & Culture

- https://artsandculture.google.com/
- https://artsandculture.google.com/explore
- https://artsandculture.google.com/time

### Are.na

- https://www.are.na/
- https://www.are.na/about
- https://www.are.na/ha-duong/architecture-urban-planning

The public pages do not expose every signed-in behavior. Linear’s live application and Khan Academy’s full progress system are richer after authentication. The conclusions in this report therefore distinguish directly observed public behavior from reasonable product implications. No claim about a private workflow is required for the recommendations.

Screenshot evidence is stored in `evidence/benchmark/` and referenced throughout the individual audit files.

## 3. Phase 1 Questions Carried Into the Benchmark

Phase 1 found six connected problems:

1. Learn exists but is not the visible parent product.
2. Architecture Student is not consistently presented as the default starting route.
3. Archive, learning, and reference pages do not share a clear page-archetype system.
4. Building Code and Glossary appear as independent destinations rather than tools within Learn.
5. Archive entities have weak bridges into learning.
6. Density, width, spacing, and card usage vary without clear task-based rules.

The benchmark therefore asked:

- How does a product communicate its core purpose in three seconds?
- How are global, collection, and object levels separated?
- How is high information density controlled?
- How is a beginner told where to start?
- How are next steps shown without forcing an exam-like progression?
- How are entities connected without losing context?
- How can archive exploration remain open while learning remains directional?

The answer is not one visual pattern. It is a combination of hierarchy, sequence, discovery, and context.

## 4. Linear: Discipline for a Complex System

### 4.1 What Was Observed

Linear’s public homepage immediately states: “The product development system for teams and agents.” The supporting sentence is short, and the first major visual is a detailed image of the real product interface.

The image shows:

- a compact global sidebar
- workspace-level groupings
- a current issue
- activity history
- status
- priority
- labels
- cycle
- project

The page then organizes the product into a numbered system:

- 1.0 Intake
- 2.0 Plan
- 3.0 Build
- 4.0 Diffs
- 5.0 Monitor

The Plan page repeats the same grammar. It starts with `2.0 Plan`, states one outcome, and then moves through product capabilities using section labels, headings, explanations, and interface evidence.

### 4.2 Why Linear Feels Dense but Controlled

Linear does not avoid density. It places density inside a stable frame.

The first viewport uses low-density explanation. The product image uses high-density evidence. Users are not asked to parse the entire application and the entire proposition at the same time.

Within the illustrated interface, levels are visually distinct:

- global utilities
- workspace structures
- current issue
- current issue metadata
- current activity

This is important for Archistory because its problem is also multi-level. A learner may be inside:

- Learn
- Architecture Student
- Structure stage
- “曲げモーメント”
- a related building
- a related code topic

If these levels are presented as an undifferentiated chain of links, the user loses position. Linear demonstrates that context can remain compact when each level has a stable visual role.

### 4.3 What Archistory Can Directly Adopt

Archistory can directly adopt:

- one common outer alignment system
- predictable sidebar widths
- compact metadata labels
- strong current-object titles
- restrained surfaces
- lightweight borders
- visible parent context
- numbered or ordered stage progression

The most relevant pattern is the separation of system, collection, and object.

For Archistory:

- System: Learn.
- Collection: Architecture Student.
- Subcollection: Drawing.
- Object: Floor Plan.
- Evidence: Villa Savoye or another relevant building.

The interface should not force all five levels into a breadcrumb. It should, however, maintain enough context that users understand where they are and how to continue.

### 4.4 What Must Be Adapted

Linear’s primary users are operating a work system. Their goal is to change state, coordinate action, and complete work. Archistory users are trying to understand, compare, and explore.

Therefore:

- Status labels should become learning context, not task status.
- Progress should be informative, not managerial.
- Stage numbering may establish order without implying deadlines.
- Metadata should explain relevance, not create performance pressure.
- Sidebars should support orientation, not imitate project software.

### 4.5 What Archistory Must Avoid

Archistory should not adopt:

- productivity urgency
- issue-tracker language
- command palettes as the primary discovery method
- dense dark dashboards as a brand identity
- status-heavy treatment of every term
- an interface that makes casual cultural exploration feel like work

Linear’s lesson is disciplined structure, not operational personality.

## 5. Notion: Making Knowledge Pages Feel Complete

### 5.1 What Was Observed

Notion’s localized homepage uses a direct headline, short support copy, primary action, secondary action, and social proof. Its long page is divided into large conceptual bands. Each viewport generally presents one idea rather than many equal choices.

The more relevant observation for Archistory is the Guides page:

1. Breadcrumb.
2. Search.
3. Page title.
4. Short description.
5. Divider.
6. Topic filter.
7. Article index.

Article entries use:

- image
- task-oriented title
- short summary
- estimated reading time

This sequence gives every empty area a function. The top of the page is spacious, but it does not feel unfinished because the hierarchy is explicit.

### 5.2 Why Notion Does Not Feel Empty

White space feels intentional when it separates recognizable levels.

On the guide page:

- the breadcrumb establishes location
- search establishes the primary task
- the title establishes scope
- the description establishes purpose
- the divider closes the introduction
- the filter opens the index

Archistory currently has pages where a large title, a large section margin, and a large card background combine without enough intermediate structure. The problem is not the amount of white space. The problem is that users cannot always explain what the space is separating.

Notion’s content hierarchy is especially relevant to:

- Glossary
- Code Topic detail
- Building Detail narrative
- Architect Detail narrative
- Learning stage content

### 5.3 What Archistory Can Directly Adopt

Archistory can adopt:

- a stable document grammar
- breadcrumbs for local context
- search before large indexes
- short descriptive summaries
- estimated reading or study time
- calm section spacing
- consistent title and body widths
- lightweight dividers
- clear filter hierarchy

For example, a Glossary term page or highlighted term state could consistently present:

1. Learn / Glossary context.
2. Japanese term.
3. Reading and translations.
4. One short definition.
5. Why it matters.
6. Related terms.
7. Building examples.
8. Continue learning.

The content already exists in pieces. The value comes from making the grammar predictable.

### 5.4 What Must Be Adapted

Notion is a general-purpose workspace. Archistory is authored and curated.

Archistory should use Notion’s calm hierarchy without adopting:

- a blank-page feeling
- generic gray workspace surfaces
- user-defined information architecture
- deep arbitrary nesting
- block controls or editing affordances

The product should remain opinionated. It should tell users which terms belong in a stage and which buildings best demonstrate a concept.

### 5.5 What Archistory Must Avoid

Archistory should not become a collection of pages that merely look tidy. Notion’s structure works because users often know what document they opened and why. Archistory must provide more guidance for learners.

Avoid:

- documentation without progression
- long indexes with only search and no recommended start
- many nested pages that hide broader archive relationships
- neutral copy that removes architectural voice
- AI-first positioning

Notion is the best reference for “how a knowledge page feels complete,” not “how the entire product should be organized.”

## 6. Khan Academy: Turning Content Into a Learning Route

### 6.1 What Was Observed

Khan Academy’s homepage is explicit:

- it states that the product is for learning
- it asks users to choose Learner, Teacher, or Parent
- it exposes course categories
- search is globally available

The Art History page is especially relevant to Archistory because the subject combines chronology, geography, visual culture, themes, and objects.

The page has:

- subject context: Arts and humanities
- title: Art history
- grouped sections
- thematic collections
- chronological collections
- “Start here”
- beginner guides
- individual learning links

The public course page does not require a user to understand the entire catalog before beginning. “Start here” is explicit and ordinary.

### 6.2 Why Khan Academy Is the Most Important Learn Benchmark

Archistory’s current learning challenge is not primarily progress tracking. It is start-point clarity.

Khan Academy answers:

- What subject am I in?
- What are the major groups?
- Where should a beginner start?
- What belongs in this unit?
- What item comes next?

The hierarchy is visible through typography and grouping rather than large cards around every lesson.

This directly addresses the Learn page feedback. Architecture Student stages currently contain repeated labels, term chips, and large bounded surfaces. Khan’s Art History page shows that a large curriculum can be readable as a structured index when:

- section headings are strong
- links are lightweight
- the starting group is named
- units are separated
- the subject identity remains visible

### 6.3 What Archistory Can Directly Adopt

Archistory can adopt:

- one recommended “Start here”
- subject > path > stage > item hierarchy
- beginner-specific routes
- grouped lightweight lists
- clear stage titles
- visible estimated scope
- direct next-step labels
- persistent course or path context

The Architecture Student path should behave like a course index without becoming a school dashboard.

A useful public structure:

- Architecture Student
- Who it is for
- What it covers
- Approximate time
- Start with Drawing
- Stage 1: Drawing
- Stage 2: Structure
- Stage 3: Materials
- Stage 4: Planning
- Stage 5: Building Code

Within each stage:

- short stage purpose
- recommended terms
- one or two relevant buildings
- related Code topic where available
- continue to next stage

### 6.4 What Must Be Adapted

Khan Academy often uses exercises, quizzes, mastery, and progress. Archistory’s identity is cultural and archival, not performance-based.

Therefore:

- Progress should show position, not score.
- Completion should be optional and quiet.
- Buildings should remain primary cultural objects, not merely examples in a worksheet.
- Historical ambiguity should be preserved where appropriate.
- Learning should invite return to the archive.

Archistory can say “3 of 5 stages” without saying “60% mastered.” It can say “Continue with Structure” without awarding a badge.

### 6.5 What Archistory Must Avoid

Avoid:

- grade levels as the dominant taxonomy
- scores and streaks
- mastery percentages
- bright gamified rewards
- exam preparation as the main entry
- role selection that blocks archive browsing
- turning every concept into an exercise

Khan Academy should influence the choreography of learning, not the cultural tone.

## 7. Google Arts & Culture: Making an Archive Discoverable

### 7.1 What Was Observed

Google Arts & Culture opens with a question: “What do you want to discover?” It then presents:

- a surprise entry
- a daily adventure
- stories
- virtual galleries
- artists
- places
- institutions
- colors
- recommendations
- themed projects

The Explore page makes the archive’s axes explicit:

- artists
- media and techniques
- art movements
- historical events
- historical figures
- places
- time
- color
- themes
- collections

The Time page exposes a horizontal historical scale and a field of works associated with the selected period.

### 7.2 Why Google Arts & Culture Feels Like Discovery, Not a Database

The archive is large, but the interface does not begin with a table.

It uses:

- visual objects
- human questions
- curated themes
- familiar categories
- counts
- stories
- multiple routes into the same material

The user can choose a mode that matches curiosity:

- person
- place
- movement
- time
- color
- collection
- story

The homepage does not explain the entire taxonomy. It makes curiosity actionable.

This is highly relevant to Archistory’s Explore, Timeline, Building, Architect, and homepage archive sections.

### 7.3 What Archistory Can Directly Adopt

Archistory can adopt:

- image-led archive entry points
- familiar exploration axes
- question-based section headings
- explicit reasons for recommendations
- thematic collections
- chronological exploration
- curated “start anywhere” choices

Google Arts & Culture also demonstrates an important relationship pattern. Recommendations can state why an item is related:

- same time
- same movement
- same collection
- same material
- visually similar

Archistory should make relationship reasons visible:

- same structural system
- same style
- same architect
- same period
- demonstrates this term
- connected code concept
- next concept in this learning stage

### 7.4 What Must Be Adapted

Google Arts & Culture is optimized for cultural discovery and engagement. It does not consistently return users to a curriculum.

Archistory should use its archive behavior inside a stronger learning loop.

For example:

1. A learner opens “Core Plan.”
2. Archistory shows a concise definition.
3. A related building demonstrates the concept.
4. The building page opens further historical and architect context.
5. A “Continue Planning Stage” action returns to the path.

Google Arts provides steps 2 through 4 well. Khan provides steps 1 and 5. Archistory needs both.

### 7.5 What Archistory Must Avoid

Avoid:

- endless recommendation feeds
- novelty experiments as the product center
- image spectacle without factual comparison
- many unrelated homepage themes
- a discovery model that makes learners repeatedly restart
- hidden relationship logic

The archive should feel open, but every learning-originated journey should preserve a return route.

## 8. Are.na: Knowledge That Belongs to More Than One Context

### 8.1 What Was Observed

Are.na describes itself as software for saving and organizing important content and as a toolkit for assembling new worlds from existing fragments.

The observed Architecture & Urban Planning channel shows:

- owner
- channel title
- start and modified dates
- block count
- follower count
- appearances in other channels
- grid and table views
- content blocks
- connect action

The important behavior is that content does not need to belong to one folder only. A block may connect to multiple channels. A channel may itself appear in other channels.

### 8.2 Why This Matters for Archistory

Architecture knowledge is inherently multi-contextual.

Villa Savoye may belong to:

- Le Corbusier
- Modernism
- France
- 1920s
- free plan
- pilotis
- roof garden
- Architecture Student planning stage
- Architecture History Explorer modern architecture stage

A conventional hierarchy forces one primary location and treats the rest as tags. Are.na demonstrates that relationships can be first-class navigation.

Archistory already has the foundations:

- entity relations
- Core 100 terms
- Learning Graph
- Building Learning Map
- paths
- styles
- eras
- architects

The missing layer is not a larger graph visualization. It is a clearer user-facing explanation of why an item appears in each context.

### 8.3 What Archistory Can Directly Adopt

Archistory can adopt:

- reusable entities across collections
- explicit collection membership
- related contexts
- compact collection metadata
- source preservation
- multiple views of the same collection

A building should not be copied into a learning path as a new content record. The path should reference the existing building and explain why it is useful for that stage.

A term should not lose its Glossary identity when shown in Architecture Student. It should remain the same term, presented within a stage context.

### 8.4 What Must Be Adapted

Are.na assumes users are willing to create or interpret their own contexts. Archistory should be authored and directional by default.

The correct adaptation is:

- primary authored route
- secondary network exploration

Architecture Student supplies the route. Learning Graph, related terms, buildings, architects, styles, and periods supply the network.

### 8.5 What Archistory Must Avoid

Avoid:

- ambiguous collection vocabulary
- user-created channels before the core product is stable
- entirely nonlinear onboarding
- making every connection equally important
- sparse context that assumes expertise
- a graph as a substitute for editorial judgment

Are.na should influence Archistory’s data presentation and related-content behavior, not its beginner homepage.

## 9. Recurring Patterns Across the Five Products

### 9.1 A Product Needs One First-Level Promise

Each benchmark has a phrase users can understand quickly:

- Linear: product development system.
- Notion: integrated workspace.
- Khan Academy: learning platform.
- Google Arts & Culture: cultural discovery.
- Are.na: collecting and connecting ideas.

Archistory should consistently use **Architecture Learning Archive** as the first-level promise.

This phrase is useful because it makes two modes legitimate:

- learning
- archive exploration

It should be followed by a clear choice:

- Start learning.
- Explore the archive.

The homepage does not need to redesign around two giant cards. The wording and CTA hierarchy can communicate the two modes within the existing composition.

### 9.2 Global, Collection, and Object Levels Must Be Distinct

All five products preserve context in some form:

- Linear: workspace, project, issue.
- Notion: workspace, page tree, page.
- Khan: subject, unit, lesson.
- Google Arts: category or collection, entity, asset.
- Are.na: user, channel, block.

Archistory needs an equivalent stable model:

- Mode: Learn or Explore.
- Collection: path, period, style, or thematic set.
- Object: term, topic, building, architect, movement.

This model should guide:

- breadcrumbs
- sidebars
- section labels
- related links
- continue actions
- search results

### 9.3 Density Should Be Layered, Not Minimized

The benchmark products contain a great deal of information. Their strength is not low density. It is staged density.

Linear:

- sparse proposition
- dense evidence

Notion:

- spacious page introduction
- structured index

Khan:

- simple subject identity
- dense grouped curriculum

Google Arts:

- visual question
- horizontal or sectional collections

Are.na:

- clear collection header
- heterogeneous blocks

Archistory should not solve “database feeling” by removing information. It should:

1. show the decision
2. show the group
3. show the item
4. show optional relationships

This will make Timeline and Explore feel curated without reducing archive depth.

### 9.4 Plain Language Beats Internal Product Names

“Start here” is clearer than a branded curriculum term. “What do you want to discover?” is clearer than “multimodal cultural entity exploration.”

Archistory should prefer:

- Start Architecture Student
- Start with Drawing
- Recommended terms
- Related buildings
- Why this building matters
- Continue learning
- Explore this period

Internal names such as Core 100, Learning Graph, and Building Learning Map can remain, but the interface should lead with user benefit.

Examples:

- “100 essential architecture terms” before “Core 100.”
- “See how this concept connects” before “Learning Graph.”
- “Learn from this building” before “Building Learning Map.”

### 9.5 Relationship Reasons Build Trust

The benchmark products do not merely recommend. They expose membership or reason:

- Linear shows project, label, cycle, and priority.
- Notion shows topic and page location.
- Khan shows unit and subject.
- Google shows period, movement, collection, material, and similarity.
- Are.na shows channel connections.

Archistory’s recommendations should state:

- why a term is recommended
- why a building demonstrates it
- why a code topic is relevant
- why two architects are connected
- why a historical period follows another

This is essential for educational trust. A related item without a reason feels algorithmic. A related item with a reason becomes an explanation.

### 9.6 Sequence and Exploration Need Different Interfaces

Learning sequence requires:

- order
- start
- stage
- next
- return

Archive exploration requires:

- breadth
- filters
- visual comparison
- multiple axes
- related entities

Trying to use one interface for both creates the inconsistencies identified in Phase 1. Learn should not look like a database index. Explore should not look like a course checklist.

The systems should share:

- typography
- alignment
- surfaces
- entity components
- global navigation

They should differ in interaction emphasis.

### 9.7 Cards Are a Selective Tool

None of the benchmark products uses large cards for every piece of information.

- Linear uses rows, panels, labels, and borders.
- Notion uses blocks and article cards selectively.
- Khan uses headings and text links for course contents.
- Google uses image cards because assets are inherently visual.
- Are.na uses blocks because content types vary.

Archistory should reserve cards for:

- highlighted path
- building preview with image
- independently actionable collection
- modal or overlay
- repeated visual entity

It should use lightweight rows or links for:

- recommended terms
- related terms
- topic order
- stage contents
- metadata
- historical sequences

This addresses both excessive white card contrast and the nested-card feeling on Learn.

## 10. Strongest and Weakest Patterns

### Strongest Patterns

#### 1. Khan Academy’s explicit starting point

This is the highest-impact benchmark for Archistory because the current issue is discoverability and direction.

#### 2. Google Arts & Culture’s multiple archive axes

This validates Archistory’s breadth and shows how to turn categories into discovery rather than database navigation.

#### 3. Linear’s context discipline

This is the best answer to inconsistent alignment, density, and page hierarchy.

#### 4. Notion’s document grammar

This is the best answer to pages that feel empty, unfinished, or overlong.

#### 5. Are.na’s multi-context entity model

This is the best long-term answer to connecting paths, terms, buildings, styles, and history without duplicating content.

### Weakest or Least Transferable Patterns

#### Linear

- productivity identity
- urgency
- operational metadata

#### Notion

- generic workspace neutrality
- deep user-defined nesting
- blank-page behavior

#### Khan Academy

- school framing
- score and mastery emphasis
- test-prep adjacency

#### Google Arts & Culture

- endless browsing
- inconsistent educational progression
- novelty-led discovery

#### Are.na

- beginner ambiguity
- dependence on user organization
- limited prescribed direction

## 11. Benchmark Ranking

### Overall Relevance to Archistory

1. Khan Academy
2. Google Arts & Culture
3. Notion
4. Linear
5. Are.na

This ranking reflects immediate product needs, not overall design quality.

### By Category

#### Learn Discoverability

1. Khan Academy
2. Linear
3. Notion
4. Google Arts & Culture
5. Are.na

#### Learning Progression

1. Khan Academy
2. Linear
3. Notion
4. Google Arts & Culture
5. Are.na

#### Archive Exploration

1. Google Arts & Culture
2. Are.na
3. Khan Academy Art History
4. Notion
5. Linear

#### Knowledge Presentation

1. Notion
2. Khan Academy
3. Linear
4. Are.na
5. Google Arts & Culture

#### Density and Alignment

1. Linear
2. Notion
3. Khan Academy
4. Are.na
5. Google Arts & Culture

#### Networked Knowledge

1. Are.na
2. Google Arts & Culture
3. Linear
4. Notion
5. Khan Academy

## 12. Direct Answer to the Most Important Question

If Archistory becomes an **Architecture Learning Archive**, which parts should behave like each benchmark?

### Behave Like Linear

Use Linear-like behavior for:

- global navigation discipline
- page alignment
- local context
- sidebar dimensions
- dense metadata
- stage numbering
- current-item emphasis
- predictable neighboring actions

Do not use Linear-like behavior for:

- cultural storytelling
- beginner tone
- archive browsing
- motivation
- visual identity

### Behave Like Notion

Use Notion-like behavior for:

- Glossary term presentation
- Code Topic articles
- long Building and Architect narratives
- section spacing
- page titles and summaries
- breadcrumbs
- searchable indexes
- local tables of contents

Do not use Notion-like behavior for:

- open-ended content creation
- user-defined hierarchy
- generic workspace framing
- product positioning

### Behave Like Khan Academy

Use Khan-like behavior for:

- Learn homepage entry
- Architecture Student
- Absolute Beginner
- stage grouping
- recommended start
- estimated scope
- continue learning
- path context

Do not use Khan-like behavior for:

- scoring
- streaks
- mastery percentages
- grade levels
- exam identity
- making all content course-dependent

### Behave Like Google Arts & Culture

Use Google Arts-like behavior for:

- Homepage archive discovery
- Explore
- Timeline
- visual building and architect browsing
- thematic collections
- movement, place, material, and time axes
- related entity explanations

Do not use Google Arts-like behavior for:

- endless recommendation feeds
- entertainment-first interactions
- weak learning continuity
- visual spectacle that hides factual structure

### Behave Like Are.na

Use Are.na-like behavior for:

- Learning Graph logic
- Building Learning Map
- one entity appearing in multiple paths
- related collections
- reusable content references
- source and context preservation

Do not use Are.na-like behavior for:

- first-time onboarding
- primary navigation terminology
- entirely nonlinear learning
- community creation before product coherence

## 13. Recommended Product Model

Archistory should have two primary modes and one shared knowledge layer.

### Mode 1: Learn

Purpose:

- provide direction
- sequence concepts
- answer what next

Primary start:

- Architecture Student

Supporting routes:

- Absolute Beginner
- Architecture History Explorer

Tools:

- Glossary
- Building Code
- Core 100

Behavioral reference:

- Khan Academy

Structural reference:

- Linear

Knowledge-page reference:

- Notion

### Mode 2: Explore

Purpose:

- browse the archive
- discover entities
- compare works
- move through time and relationships

Axes:

- buildings
- architects
- styles
- movements
- periods
- places
- materials
- structural ideas

Behavioral reference:

- Google Arts & Culture

Network reference:

- Are.na

### Shared Knowledge Layer

Purpose:

- prevent duplicated content
- preserve entity identity
- connect learning and archive

Shared entities:

- term
- code topic
- building
- architect
- style
- era
- movement
- place

Behavioral reference:

- Are.na

Context discipline:

- Linear

## 14. Recommended Interface Principles

### Principle 1: One Recommended Start

Architecture Student should be visually primary wherever Learn is introduced.

### Principle 2: Preserve Context Across Every Jump

When a user moves from a stage to a term, the term should show:

- path
- stage
- next item or return action

When a user moves from a term to a building, the building should show:

- why it demonstrates the term
- return to the learning stage

### Principle 3: Show Why Things Are Related

Replace generic “Related” labels with explanatory relationships.

### Principle 4: Use Cards Only for Independent Objects

Stage terms should be rows or lightweight links. Buildings may use visual cards. Path introductions may use one framed primary object.

### Principle 5: Let Density Follow the Task

- Learn: moderate density and ordered progression.
- Glossary: compact searchable index.
- Code: calm reading surface.
- Explore: dense but visual.
- Timeline: layered chronological navigation.
- Detail: editorial first, knowledge context second.

### Principle 6: Use Plain Product Language

Lead with user action and benefit. Technical product names can appear second.

### Principle 7: Preserve the Archive Identity

Learning paths should repeatedly connect to real buildings, people, time, and styles. They should not become abstract textbook modules.

## 15. Recommended Implementation Sequence

### P0: Make the Existing Product Legible

1. Add visible Learn entry.
2. Make Architecture Student the primary homepage and Learn route.
3. Establish Learn > Path > Stage > Item context.
4. De-emphasize Exam Preparation.
5. Normalize width, title alignment, and section rhythm.
6. Present recommended terms as lightweight links.
7. Make Code and Glossary visibly belong to Learn.

### P1: Build the Learning Loop

1. Add path context to Glossary term states.
2. Add relevant building examples to stages and terms.
3. Add “why this building” explanations.
4. Add Continue Learning from Glossary, Code, and Building pages.
5. Connect Timeline to Architecture History Explorer.
6. Use consistent relationship reasons.

### P2: Expand Discovery

1. Introduce curated thematic collections.
2. Expose more Learning Graph relationships through ordinary links and lists.
3. Unify search across archive and learning.
4. Add lightweight recent/continue state if validated.
5. Test alternate archive views.

## 16. Estimated Impact

### Direct Learn Entry

Expected impact:

- immediate improvement in discoverability
- clearer product identity
- increased Learn page entry

### Architecture Student as Primary Route

Expected impact:

- reduced decision uncertainty
- more term and building engagement
- stronger perception of a real learning product

### Context Preservation

Expected impact:

- fewer dead-end detail visits
- longer coherent learning journeys
- improved relationship between archive and Learn

### Visual System Normalization

Expected impact:

- lower perception of unfinished pages
- more predictable scanning
- better cross-page trust

### Relationship Reasons

Expected impact:

- stronger educational credibility
- better conceptual understanding
- more meaningful archive exploration

## 17. Risks

### Risk 1: Over-Coursifying the Archive

If every page is reframed as a lesson, Archistory loses cultural openness.

Mitigation:

- maintain Explore as a first-class mode
- make learning context optional on archive-originated journeys

### Risk 2: Copying School UX

If progress becomes score-based, the site will feel like exam preparation.

Mitigation:

- show position and continuity, not mastery
- avoid badges, streaks, grades, and test language

### Risk 3: Copying Cultural Media UX

If the homepage becomes an endless visual feed, Learn will remain hidden.

Mitigation:

- preserve one clear learning entry
- use curated archive discovery below it

### Risk 4: Overusing Cards

If every stage, term, and relation becomes a card, density and alignment problems will worsen.

Mitigation:

- use rows, dividers, and text links for subordinate information

### Risk 5: Exposing the Graph Too Literally

A large graph visualization may impress but confuse beginners.

Mitigation:

- expose relationships through labeled links first
- use graph views as optional exploration

### Risk 6: Inconsistent Localization

Long Japanese and Chinese labels can alter density and hierarchy.

Mitigation:

- test all page archetypes in all three languages
- avoid fixed heights for text containers

## 18. Final Recommendation

Archistory has reached the point where adding more isolated content will produce diminishing returns. The benchmark evidence supports a shift from feature accumulation to journey design.

The next interface phase should make four things unmistakable:

1. **What this product is:** an Architecture Learning Archive.
2. **Where to start:** Architecture Student.
3. **How knowledge is organized:** path, stage, concept, evidence, context.
4. **What to do next:** continue the path or explore a related archive connection.

The product should feel:

- as structurally disciplined as Linear
- as readable as Notion
- as directionally clear as Khan Academy
- as culturally discoverable as Google Arts & Culture
- as relationally rich as Are.na

It should not feel:

- like project management
- like a blank workspace
- like a school gradebook
- like an endless media feed
- like an unexplained personal knowledge tool

The defining Archistory experience should be a loop that no benchmark provides alone:

`Learn a concept -> see it embodied in architecture -> understand its time and relationships -> return with deeper context`

That loop is the product.
