'use client';

import React from 'react';

import { JourneyMode } from '@/components/animation/MasterTimeline';

interface ScrubberProps {
  activeSection: number;
  onSelectSection: (index: number) => void;
  mode?: JourneyMode;
}

export function Scrubber({ activeSection, onSelectSection, mode = 'leap' }: ScrubberProps) {
  const leapSections = [
    { num: '01', label: 'Hero' },
    { num: '02', label: 'About' },
    { num: '03', label: 'Skills' },
    { num: '04', label: 'Projects' },
    { num: '05', label: 'Journey' },
    { num: '06', label: 'Awards' },
    { num: '07', label: 'Contact' },
  ];

  const climbSections = [
    { num: '01', label: 'Base' },
    { num: '02', label: 'Grip' },
    { num: '03', label: 'Ascent' },
    { num: '04', label: 'Haul' },
    { num: '05', label: 'Ridge' },
    { num: '06', label: 'Pinnacle' },
    { num: '07', label: 'Summit' },
  ];

  const sections = mode === 'leap' ? leapSections : climbSections;

  return (
    <nav className="journey-scrubber" aria-label="Section Navigation">
      <div className="scrubber-track-line" />
      {sections.map((s, idx) => {
        const isActive = activeSection === idx;
        return (
          <button
            key={s.num}
            type="button"
            className={`scrubber-dot ${isActive ? 'active' : ''}`}
            onClick={() => onSelectSection(idx)}
            aria-label={`Jump to Section ${s.num} ${s.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className="scrubber-label">
              <span className="scrubber-num">{s.num}</span> {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
