import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface LightingProps {
  intensity?: number;
}

export function Lighting({ intensity = 2.2 }: LightingProps) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        intensity,
        0.1
      );
    }
  });

  return (
    <>
      {/* Cool alpine sky ambient light */}
      <ambientLight color="#8ec5fc" intensity={0.85} />

      {/* Primary directional sun (high mountain angle, crisp shadows) */}
      <directionalLight
        ref={dirLightRef}
        position={[14, 22, 10]}
        color="#fff9ee"
        intensity={intensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0005}
      />

      {/* Secondary fill light bouncing off snow massifs */}
      <directionalLight
        position={[-12, -4, 8]}
        color="#a5d8ff"
        intensity={0.65}
      />

      {/* Silhouette rim light from behind */}
      <directionalLight
        position={[2, 6, -14]}
        color="#e0f2fe"
        intensity={0.9}
      />
    </>
  );
}
