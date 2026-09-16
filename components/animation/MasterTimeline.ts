export type JourneyMode = 'leap' | 'climb';

export interface SectionTimelineConfig {
  index: number;
  id: string;
  num: string;
  name: string;
  title: string;
  startFrame: number;
  endFrame: number;
  startProgress: number;
  endProgress: number;
  // slogan: string;
  // subSlogan: string;
}

// 7 Descent Milestones (TOP -> BOTTOM)
export const DESCENT_SECTIONS: SectionTimelineConfig[] = [
  {
    index: 0,
    id: 'section-0',
    num: '01',
    name: 'Hero',
    title: 'Hey, I\'m Thamil',
    startFrame: 0,
    endFrame: 51,
    startProgress: 0.0,
    endProgress: 0.142,
  },
  {
    index: 1,
    id: 'section-1',
    num: '02',
    name: 'About',
    title: 'About Me',
    startFrame: 52,
    endFrame: 102,
    startProgress: 0.143,
    endProgress: 0.285,
  },
  {
    index: 2,
    id: 'section-2',
    num: '03',
    name: 'Skills',
    title: 'Skills & Stack',
    startFrame: 103,
    endFrame: 153,
    startProgress: 0.286,
    endProgress: 0.428,
  },
  {
    index: 3,
    id: 'section-3',
    num: '04',
    name: 'Projects',
    title: 'Featured Works',
    startFrame: 154,
    endFrame: 204,
    startProgress: 0.429,
    endProgress: 0.571,
  },
  {
    index: 4,
    id: 'section-4',
    num: '05',
    name: 'Journey',
    title: 'Experience & Milestones',
    startFrame: 205,
    endFrame: 255,
    startProgress: 0.572,
    endProgress: 0.714,
  },
  {
    index: 5,
    id: 'section-5',
    num: '06',
    name: 'Achievements',
    title: 'Honors & Recognition',
    startFrame: 256,
    endFrame: 306,
    startProgress: 0.715,
    endProgress: 0.857,
  },
  {
    index: 6,
    id: 'section-6',
    num: '07',
    name: 'Contact',
    title: 'Say Hello',
    startFrame: 307,
    endFrame: 359,
    startProgress: 0.858,
    endProgress: 1.0,
  },
];

// 7 Climbing Milestones (BOTTOM -> TOP)
export const CLIMB_SECTIONS: SectionTimelineConfig[] = [
  {
    index: 0,
    id: 'section-0',
    num: '01',
    name: 'Ground Base',
    title: 'Rope Preparation',
    startFrame: 0,
    endFrame: 51,
    startProgress: 0.858,
    endProgress: 1.0,
  },
  {
    index: 1,
    id: 'section-1',
    num: '02',
    name: 'Lower Ridge',
    title: 'Grip & Launch',
    startFrame: 52,
    endFrame: 102,
    startProgress: 0.715,
    endProgress: 0.857,
  },
  {
    index: 2,
    id: 'section-2',
    num: '03',
    name: 'Rock Face',
    title: 'Rope Ascent',
    startFrame: 103,
    endFrame: 153,
    startProgress: 0.572,
    endProgress: 0.714,
  },
  {
    index: 3,
    id: 'section-3',
    num: '04',
    name: 'High Wall',
    title: 'Vertical Haul',
    startFrame: 154,
    endFrame: 204,
    startProgress: 0.429,
    endProgress: 0.571,
  },
  {
    index: 4,
    id: 'section-4',
    num: '05',
    name: 'Snow Ridge',
    title: 'Peak Approach',
    startFrame: 205,
    endFrame: 255,
    startProgress: 0.286,
    endProgress: 0.428,
  },
  {
    index: 5,
    id: 'section-5',
    num: '06',
    name: 'Pinnacle Crest',
    title: 'Acclaimed Ascent',
    startFrame: 256,
    endFrame: 306,
    startProgress: 0.143,
    endProgress: 0.285,
  },
  {
    index: 6,
    id: 'section-6',
    num: '07',
    name: 'Summit Edge',
    title: 'Summit Arrival',
    startFrame: 307,
    endFrame: 359,
    startProgress: 0.0,
    endProgress: 0.142,
  },
];

export const SECTION_TIMELINES = DESCENT_SECTIONS;

export function getSectionIndexByProgress(p: number, mode: JourneyMode = 'leap'): number {
  const clamped = Math.max(0, Math.min(1, p));
  if (mode === 'leap') {
    if (clamped >= 0.858) return 6;
    if (clamped >= 0.715) return 5;
    if (clamped >= 0.572) return 4;
    if (clamped >= 0.429) return 3;
    if (clamped >= 0.286) return 2;
    if (clamped >= 0.143) return 1;
    return 0;
  } else {
    // In climb mode: scroll bottom (p=1) is Section 0 (Ground), scroll top (p=0) is Section 6 (Summit)
    if (clamped >= 0.858) return 0;
    if (clamped >= 0.715) return 1;
    if (clamped >= 0.572) return 2;
    if (clamped >= 0.429) return 3;
    if (clamped >= 0.286) return 4;
    if (clamped >= 0.143) return 5;
    return 6;
  }
}

// Retained legacy waypoint types for backward compatibility
export interface TimelineWaypoint {
  progress: number;
  timeSec: number;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov: number;
  characterPos: [number, number, number];
  characterRot: [number, number, number];
  characterPose: string;
  fogDensity: number;
  sunIntensity: number;
  sectionIndex: number;
}

export const LEAP_WAYPOINTS: TimelineWaypoint[] = [
  {
    progress: 0.0,
    timeSec: 0.0,
    cameraPos: [2.6, 5.6, 5.8],
    cameraTarget: [0.6, 4.4, 0.2],
    cameraFov: 42,
    characterPos: [0.9, 4.25, 0.2],
    characterRot: [0, -0.4, 0],
    characterPose: 'sit_cliff',
    fogDensity: 0.008,
    sunIntensity: 2.2,
    sectionIndex: 0,
  },
  {
    progress: 1.0,
    timeSec: 30.0,
    cameraPos: [1.5, -13.5, 4.8],
    cameraTarget: [0.0, -14.0, 3.2],
    cameraFov: 39,
    characterPos: [0.0, -14.1, 3.2],
    characterRot: [0.0, -0.12, 0.0],
    characterPose: 'hero_landing',
    fogDensity: 0.007,
    sunIntensity: 2.2,
    sectionIndex: 5,
  },
];

export const CLIMB_WAYPOINTS: TimelineWaypoint[] = [...LEAP_WAYPOINTS];

export function interpolateTimeline(waypoints: TimelineWaypoint[], progress: number): TimelineWaypoint {
  const p = Math.max(0, Math.min(1, progress));
  return {
    progress: p,
    timeSec: p * 30,
    cameraPos: [2.6, 5.6, 5.8],
    cameraTarget: [0.6, 4.4, 0.2],
    cameraFov: 42,
    characterPos: [0.9, 4.25, 0.2],
    characterRot: [0, -0.4, 0],
    characterPose: 'sit_cliff',
    fogDensity: 0.008,
    sunIntensity: 2.2,
    sectionIndex: getSectionIndexByProgress(p),
  };
}
