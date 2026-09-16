'use client';

import React from 'react';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface CinematicOverlayProps {
  activeSection: number;
  mode: JourneyMode;
}

export function CinematicOverlay({ activeSection, mode }: CinematicOverlayProps) {
  return (
    <div style={{ pointerEvents: 'none' }}>
      {/* 01 GROUND BASE SLOGANS (Section 0 in Climb Mode only) */}
      {mode === 'climb' && (
        <>
          <div
            className="brush-slogan right-top"
            style={{
              opacity: activeSection === 0 ? 1 : 0,
              transform: activeSection === 0 ? 'rotate(-4deg) translateY(0px)' : 'rotate(-4deg) translateY(-25px)',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            THE<br />ASCENT<br />BEGINS
          </div>

          <div
            className="brush-slogan right-mid"
            style={{
              opacity: activeSection === 0 ? 1 : 0,
              transform: activeSection === 0 ? 'rotate(3deg) translateY(0px)' : 'rotate(3deg) translateY(25px)',
              fontSize: '2rem',
              top: '52%',
              right: '7%',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            PREPARATION<br />MEETS<br />PURPOSE
          </div>
        </>
      )}

      {/* 02 ABOUT ME SLOGAN (Section 1) */}
      <div
        className="brush-slogan center-float"
        style={{
          opacity: activeSection === 1 ? 1 : 0,
          transform: activeSection === 1 ? 'rotate(-6deg) translateY(0px)' : 'rotate(-6deg) translateY(30px)',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {mode === 'leap' ? (
          <>
            TAKE<br />THE<br />LEAP
          </>
        ) : (
          <>
            GOOD<br />THINGS<br />TAKE<br />COURAGE
          </>
        )}
      </div>

      {/* 03 SKILLS SLOGAN (Section 2) */}
      <div
        className="brush-slogan right-top"
        style={{
          opacity: activeSection === 2 ? 1 : 0,
          top: '26%',
          right: '8%',
          fontSize: '2.5rem',
          transform: activeSection === 2 ? 'rotate(2deg) translateY(0px)' : 'rotate(2deg) translateY(-25px)',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {mode === 'leap' ? (
          <>
            BIGGER<br />IDEAS<br />HIGHER<br />POSSIBILITIES
          </>
        ) : (
          <>
            SKILLS<br />FUEL<br />FREEDOM
          </>
        )}
      </div>

      {/* 04 PROJECTS SLOGAN (Section 3) */}
      <div
        className="brush-slogan bottom-right"
        style={{
          opacity: activeSection === 3 ? 1 : 0,
          bottom: '18%',
          right: '8%',
          transform: activeSection === 3 ? 'rotate(-5deg) translateY(0px)' : 'rotate(-5deg) translateY(25px)',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {mode === 'leap' ? (
          <>
            IDEAS<br />INTO<br />IMPACT
          </>
        ) : (
          <>
            HIGHER<br />IDEAS<br />BRIGHTER<br />SOLUTIONS
          </>
        )}
      </div>

      {/* 05 JOURNEY SLOGAN (Section 4) */}
      <div
        className="brush-slogan right-mid"
        style={{
          opacity: activeSection === 4 ? 1 : 0,
          top: '32%',
          right: '8%',
          fontSize: '2.4rem',
          transform: activeSection === 4 ? 'rotate(4deg) translateY(0px)' : 'rotate(4deg) translateY(-25px)',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {mode === 'leap' ? (
          <>
            DISCIPLINE<br />CREATES<br />FREEDOM
          </>
        ) : (
          <>
            CONSISTENCY<br />CREATES<br />FREEDOM
          </>
        )}
      </div>

      {/* 06 CONTACT SLOGAN (Section 5) */}
      <div
        className="brush-slogan bottom-right"
        style={{
          opacity: activeSection === 5 ? 1 : 0,
          bottom: '14%',
          right: '8%',
          fontSize: '2.8rem',
          transform: activeSection === 5 ? 'rotate(-4deg) translateY(0px)' : 'rotate(-4deg) translateY(25px)',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        SAME<br />KID<br />BIGGER<br />DREAMS.
      </div>
    </div>
  );
}
