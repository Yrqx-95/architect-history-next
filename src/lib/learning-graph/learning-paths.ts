import type { LearningPath } from './types'

export const learningPaths: LearningPath[] = [
  {
    id: 'absolute-beginner',
    title: 'Absolute Beginner',
    description: 'A first pass through zoning, area controls, road conditions, height controls, and fire-safety districts.',
    estimatedStudyMinutes: 180,
    topicOrder: [
      'zoning-districts',
      'building-coverage-ratio',
      'floor-area-ratio',
      'road-access-obligation',
      'road-slant-restriction',
      'north-side-slant-restriction',
      'fire-prevention-district',
      'quasi-fire-prevention-district',
    ],
    stages: [
      {
        id: 'orientation',
        title: 'Orientation',
        learningGoals: ['Understand what zoning does before calculations begin.', 'Recognize that buildability is layered.'],
        estimatedStudyMinutes: 25,
        topicOrder: ['zoning-districts'],
      },
      {
        id: 'area-controls',
        title: 'Area Controls',
        learningGoals: ['Distinguish footprint controls from total floor-area controls.', 'Calculate basic BCR and FAR examples.'],
        estimatedStudyMinutes: 50,
        topicOrder: ['building-coverage-ratio', 'floor-area-ratio'],
      },
      {
        id: 'road-and-height',
        title: 'Road and Height Controls',
        learningGoals: ['Read road access before height controls.', 'Understand the two main slant restrictions.'],
        estimatedStudyMinutes: 75,
        topicOrder: ['road-access-obligation', 'road-slant-restriction', 'north-side-slant-restriction'],
      },
      {
        id: 'fire-safety',
        title: 'Fire Safety Districts',
        learningGoals: ['Compare fire and quasi-fire districts.', 'Recognize fire-performance keywords without overgeneralizing.'],
        estimatedStudyMinutes: 30,
        topicOrder: ['fire-prevention-district', 'quasi-fire-prevention-district'],
      },
    ],
  },
  {
    id: 'architecture-student',
    title: 'Architecture Student',
    description: 'A design-oriented route from urban context and massing controls to road and fire-safety constraints.',
    estimatedStudyMinutes: 180,
    topicOrder: [
      'zoning-districts',
      'building-coverage-ratio',
      'floor-area-ratio',
      'road-slant-restriction',
      'north-side-slant-restriction',
      'road-access-obligation',
      'fire-prevention-district',
      'quasi-fire-prevention-district',
    ],
    stages: [
      {
        id: 'site-framework',
        title: 'Site Framework',
        learningGoals: ['Read zoning as a design constraint.', 'Connect district conditions to site strategy.'],
        estimatedStudyMinutes: 25,
        topicOrder: ['zoning-districts'],
      },
      {
        id: 'massing-and-density',
        title: 'Massing and Density',
        learningGoals: ['Translate BCR and FAR into footprint and volume decisions.', 'Avoid confusing area ratio with height.'],
        estimatedStudyMinutes: 50,
        topicOrder: ['building-coverage-ratio', 'floor-area-ratio'],
      },
      {
        id: 'section-and-envelope',
        title: 'Section and Envelope',
        learningGoals: ['Understand how slant restrictions shape upper floors and roof form.', 'Compare road-side and north-side envelopes.'],
        estimatedStudyMinutes: 70,
        topicOrder: ['road-slant-restriction', 'north-side-slant-restriction'],
      },
      {
        id: 'access-and-fire',
        title: 'Access and Fire Safety',
        learningGoals: ['Connect road access to evacuation and firefighting.', 'Understand district-based fire performance.'],
        estimatedStudyMinutes: 55,
        topicOrder: ['road-access-obligation', 'fire-prevention-district', 'quasi-fire-prevention-district'],
      },
    ],
  },
  {
    id: 'second-class-architect-exam',
    title: 'Second-Class Architect Exam',
    description: 'A review-first route that starts with calculation-heavy area controls and then moves into road, height, and district topics.',
    estimatedStudyMinutes: 160,
    topicOrder: [
      'building-coverage-ratio',
      'floor-area-ratio',
      'road-access-obligation',
      'road-slant-restriction',
      'north-side-slant-restriction',
      'zoning-districts',
      'fire-prevention-district',
      'quasi-fire-prevention-district',
    ],
    stages: [
      {
        id: 'formula-first',
        title: 'Formula First',
        learningGoals: ['Memorize the most frequent area formulas.', 'Practice quick maximum-area calculations.'],
        estimatedStudyMinutes: 45,
        topicOrder: ['building-coverage-ratio', 'floor-area-ratio'],
      },
      {
        id: 'road-and-height-exam-core',
        title: 'Road and Height Exam Core',
        learningGoals: ['Recognize road access and slant restriction question patterns.', 'Avoid boundary-line and starting-height traps.'],
        estimatedStudyMinutes: 75,
        topicOrder: ['road-access-obligation', 'road-slant-restriction', 'north-side-slant-restriction'],
      },
      {
        id: 'classification-review',
        title: 'Classification Review',
        learningGoals: ['Review zoning categories after calculation topics.', 'Connect use restrictions with district overlays.'],
        estimatedStudyMinutes: 20,
        topicOrder: ['zoning-districts'],
      },
      {
        id: 'fire-district-review',
        title: 'Fire District Review',
        learningGoals: ['Compare fire and quasi-fire district requirements.', 'Memorize structural and opening-related keywords.'],
        estimatedStudyMinutes: 20,
        topicOrder: ['fire-prevention-district', 'quasi-fire-prevention-district'],
      },
    ],
  },
]

export const learningPathById = Object.fromEntries(
  learningPaths.map(path => [path.id, path])
) as Record<string, LearningPath>
