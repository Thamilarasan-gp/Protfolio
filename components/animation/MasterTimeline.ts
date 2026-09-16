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

// 6 Descent Milestones (TOP -> BOTTOM)
export const DESCENT_SECTIONS: SectionTimelineConfig[] = [
  {
    index: 0,
    id: 'section-0',
    num: '01',
    name: 'Hero',
    title: 'Hey, I\'m Thamil',
    startFrame: 0,
    endFrame: 59,
    startProgress: 0.0,
    endProgress: 0.166,
    // slogan: 'DREAM BUILD REPEAT',
    // subSlogan: 'BIGGER THAN WHAT I IMAGINED',
  },
  {
    index: 1,
    id: 'section-1',
    num: '02',
    name: 'About',
    title: 'About Me',
    startFrame: 60,
    endFrame: 119,
    startProgress: 0.167,
    endProgress: 0.333,
    // slogan: 'TAKE THE LEAP',
    // subSlogan: 'GOOD THINGS TAKE COURAGE',
  },
  {
    index: 2,
    id: 'section-2',
    num: '03',
    name: 'Skills',
    title: 'Skills & Stack',
    startFrame: 120,
    endFrame: 179,
    startProgress: 0.334,
    endProgress: 0.500,
    // slogan: 'BIGGER IDEAS HIGHER POSSIBILITIES',
    // subSlogan: 'SKILLS FUEL FREEDOM',
  },
  {
    index: 3,
    id: 'section-3',
    num: '04',
    name: 'Projects',
    title: 'Featured Works',
    startFrame: 180,
    endFrame: 239,
    startProgress: 0.501,
    endProgress: 0.666,
    // slogan: 'IDEAS INTO IMPACT',
    // subSlogan: 'HIGHER IDEAS BRIGHTER SOLUTIONS',
  },
  {
    index: 4,
    id: 'section-4',
    num: '05',
    name: 'Journey',
    title: 'Experience & Milestones',
    startFrame: 240,
    endFrame: 299,
    startProgress: 0.667,
    endProgress: 0.833,
    // slogan: 'DISCIPLINE CREATES FREEDOM',
    // subSlogan: 'CONSISTENCY CREATES FREEDOM',
  },
  {
    index: 5,
    id: 'section-5',
    num: '06',
    name: 'Contact',
    title: 'Say Hello',
    startFrame: 300,
    endFrame: 359,
    startProgress: 0.834,
    endProgress: 1.0,
    // slogan: 'SAME KID BIGGER DREAMS',
    // subSlogan: 'LET\'S BUILD THE FUTURE',
  },
];

// 6 Climbing Milestones (BOTTOM -> TOP)
export const CLIMB_SECTIONS: SectionTimelineConfig[] = [
  {
    index: 0,
    id: 'section-0',
    num: '01',
    name: 'Ground Base',
    title: 'Rope Preparation',
    startFrame: 0,
    endFrame: 59,
    startProgress: 0.834,
    endProgress: 1.0,
    // slogan: 'THE ASCENT BEGINS',
    // subSlogan: 'PREPARATION MEETS PURPOSE',
  },
  {
    index: 1,
    id: 'section-1',
    num: '02',
    name: 'Lower Ridge',
    title: 'Grip & Launch',
    startFrame: 60,
    endFrame: 119,
    startProgress: 0.667,
    endProgress: 0.833,
    // slogan: 'GOOD THINGS TAKE COURAGE',
    // subSlogan: 'EVERY STEP ELEVATES',
  },
  {
    index: 2,
    id: 'section-2',
    num: '03',
    name: 'Rock Face',
    title: 'Rope Ascent',
    startFrame: 120,
    endFrame: 179,
    startProgress: 0.501,
    endProgress: 0.666,
    // slogan: 'SKILLS FUEL FREEDOM',
    // subSlogan: 'FOCUS DEFINES THE CLIMB',
  },
  {
    index: 3,
    id: 'section-3',
    num: '04',
    name: 'High Wall',
    title: 'Vertical Haul',
    startFrame: 180,
    endFrame: 239,
    startProgress: 0.334,
    endProgress: 0.500,
    // slogan: 'HIGHER IDEAS BRIGHTER SOLUTIONS',
    // subSlogan: 'RELENTLESS MOMENTUM',
  },
  {
    index: 4,
    id: 'section-4',
    num: '05',
    name: 'Snow Ridge',
    title: 'Peak Approach',
    startFrame: 240,
    endFrame: 299,
    startProgress: 0.167,
    endProgress: 0.333,
    // slogan: 'CONSISTENCY CREATES FREEDOM',
    // subSlogan: 'ALMOST AT THE SUMMIT',
  },
  {
    index: 5,
    id: 'section-5',
    num: '06',
    name: 'Summit Edge',
    title: 'Summit Arrival',
    startFrame: 300,
    endFrame: 359,
    startProgress: 0.0,
    endProgress: 0.166,
    // slogan: 'SAME KID BIGGER DREAMS',
    // subSlogan: 'READY FOR THE NEXT EXPEDITION',
  },
];

export const SECTION_TIMELINES = DESCENT_SECTIONS;

export function getSectionIndexByProgress(p: number, mode: JourneyMode = 'leap'): number {
  const clamped = Math.max(0, Math.min(1, p));
  if (mode === 'leap') {
    if (clamped >= 0.834) return 5;
    if (clamped >= 0.667) return 4;
    if (clamped >= 0.501) return 3;
    if (clamped >= 0.334) return 2;
    if (clamped >= 0.167) return 1;
    return 0;
  } else {
    // In climb mode: scroll bottom (p=1) is Section 0 (Ground), scroll top (p=0) is Section 5 (Summit)
    if (clamped >= 0.834) return 0;
    if (clamped >= 0.667) return 1;
    if (clamped >= 0.501) return 2;
    if (clamped >= 0.334) return 3;
    if (clamped >= 0.167) return 4;
    return 5;
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
