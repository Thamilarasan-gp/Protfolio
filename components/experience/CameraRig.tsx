import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import {
  interpolateTimeline,
  LEAP_WAYPOINTS,
  CLIMB_WAYPOINTS,
  JourneyMode,
} from '@/components/animation/MasterTimeline';

interface CameraRigProps {
  progress: number;
  mode: JourneyMode;
}

export function CameraRig({ progress, mode }: CameraRigProps) {
  const { camera } = useThree();
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lookTargetRef = useRef(new THREE.Vector3(0.6, 4.4, 0.2));

  // Listen to subtle mouse movement for organic parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const waypoints = mode === 'leap' ? LEAP_WAYPOINTS : CLIMB_WAYPOINTS;
    const current = interpolateTimeline(waypoints, progress);

    // Subtle parallax offset based on cursor
    const mouseOffsetX = mouseRef.current.x * 0.35;
    const mouseOffsetY = -mouseRef.current.y * 0.25;

    const targetPos = new THREE.Vector3(
      current.cameraPos[0] + mouseOffsetX,
      current.cameraPos[1] + mouseOffsetY,
      current.cameraPos[2]
    );

    camera.position.lerp(targetPos, 0.12);

    const nextTarget = new THREE.Vector3(...current.cameraTarget);
    lookTargetRef.current.lerp(nextTarget, 0.12);
    camera.lookAt(lookTargetRef.current);

    // Dynamic FOV interpolation
    const perspCam = camera as THREE.PerspectiveCamera;
    if (perspCam.isPerspectiveCamera) {
      perspCam.fov = THREE.MathUtils.lerp(perspCam.fov, current.cameraFov, 0.1);
      perspCam.updateProjectionMatrix();
    }
  });

  return null;
}
