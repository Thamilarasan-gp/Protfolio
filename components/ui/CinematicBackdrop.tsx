'use client';

import React from 'react';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface CinematicBackdropProps {
  progress: number;
  mode: JourneyMode;
}

export function CinematicBackdrop({ progress, mode }: CinematicBackdropProps) {
  // Determine opacity for each of the 6 scene backdrops
  // Scenes: 0 (0.0 - 0.16), 1 (0.16 - 0.36), 2 (0.36 - 0.58), 3 (0.58 - 0.78), 4 (0.78 - 0.90), 5 (0.90 - 1.0)
  const prefix = mode === 'leap' ? 'leap' : 'climb';

  const scenes = [0, 1, 2, 3, 4, 5];

  const getSceneOpacity = (index: number) => {
    // Centers of each scene:
    const centers = [0.08, 0.25, 0.45, 0.65, 0.83, 0.96];
    const c = centers[index];
    const dist = Math.abs(progress - c);
    // Smooth falloff
    return Math.max(0, Math.min(1, 1 - dist * 4.5));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {scenes.map((s) => {
        const op = getSceneOpacity(s);
        return (
          <div
            key={`${prefix}-${s}`}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(/images/${prefix}_scene_${s}.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: op,
              transition: 'opacity 0.3s ease-out',
              transform: `scale(${1 + (1 - op) * 0.04})`,
            }}
          />
        );
      })}
      {/* Light atmospheric vignette to blend seamlessly with UI */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(235, 245, 255, 0.4) 0%, rgba(235, 245, 255, 0.05) 50%, rgba(235, 245, 255, 0) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
