import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Mountain } from './Mountain';
import { Rope } from './Rope';
import { Clouds } from './Clouds';
import { Character } from './Character';
import { Lighting } from './Lighting';
import { LandingShockwave } from './LandingShockwave';
import { CameraRig } from './CameraRig';
import {
  interpolateTimeline,
  LEAP_WAYPOINTS,
  CLIMB_WAYPOINTS,
  JourneyMode,
} from '@/components/animation/MasterTimeline';

interface ExperienceSceneProps {
  progress: number;
  mode: JourneyMode;
}

export function ExperienceScene({ progress, mode }: ExperienceSceneProps) {
  const waypoints = mode === 'leap' ? LEAP_WAYPOINTS : CLIMB_WAYPOINTS;
  const current = useMemo(
    () => interpolateTimeline(waypoints, progress),
    [waypoints, progress]
  );

  return (
    <>
      {/* Cinematic Lighting */}
      <Lighting intensity={current.sunIntensity} />

      {/* Camera Choreography Rig */}
      <CameraRig progress={progress} mode={mode} />

      {/* Real-time 3D Alpine Environment */}
      <Mountain />

      {/* Procedural Climbing Rope */}
      <Rope mode={mode} />

      {/* Multi-layered Parallax Clouds */}
      <Clouds />

      {/* Animated 3D Character */}
      <Character
        position={current.characterPos}
        rotation={current.characterRot}
        pose={current.characterPose}
        progress={progress}
      />

      {/* Dynamic Ground Impact Dust Explosion (Superhero Landing) */}
      <LandingShockwave progress={progress} />
    </>
  );
}
