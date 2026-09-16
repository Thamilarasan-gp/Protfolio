'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ExperienceScene } from './ExperienceScene';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface ExperienceCanvasProps {
  progress: number;
  mode: JourneyMode;
}

export function ExperienceCanvas({ progress, mode }: ExperienceCanvasProps) {
  return (
    <div className="webgl-canvas-container">
      <Canvas
        shadows
        camera={{ position: [2.6, 5.6, 5.8], fov: 42, near: 0.1, far: 180 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <ExperienceScene progress={progress} mode={mode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
