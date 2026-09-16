import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createCloudTexture } from '@/lib/three/textures';

interface CloudInstance {
  pos: [number, number, number];
  scale: [number, number];
  opacity: number;
  driftSpeed: number;
}

export function Clouds() {
  const cloudTex = useMemo(() => createCloudTexture(), []);
  const cloudsGroupRef = useRef<THREE.Group>(null);

  // Generate 3 layers of clouds matching the reference
  const { fgClouds, mgClouds, bgClouds } = useMemo(() => {
    // 1. Foreground wisps (pass close to descent corridor)
    const fg: CloudInstance[] = [
      { pos: [1.2, 3.2, 3.5], scale: [5.5, 3.2], opacity: 0.35, driftSpeed: 0.08 },
      { pos: [-1.8, 0.5, 3.8], scale: [6.0, 3.5], opacity: 0.4, driftSpeed: 0.06 },
      { pos: [1.5, -4.5, 4.2], scale: [7.0, 4.0], opacity: 0.45, driftSpeed: 0.07 },
      { pos: [-0.8, -9.0, 4.0], scale: [6.5, 3.8], opacity: 0.4, driftSpeed: 0.05 },
    ];

    // 2. Midground clouds blanketed in the valley
    const mg: CloudInstance[] = [
      { pos: [-6.0, 2.0, -6.0], scale: [14.0, 7.5], opacity: 0.75, driftSpeed: 0.04 },
      { pos: [6.5, 1.0, -8.0], scale: [16.0, 8.0], opacity: 0.7, driftSpeed: 0.035 },
      { pos: [0.0, -3.0, -10.0], scale: [20.0, 9.0], opacity: 0.8, driftSpeed: 0.03 },
      { pos: [-5.0, -8.0, -8.0], scale: [18.0, 8.5], opacity: 0.75, driftSpeed: 0.04 },
      { pos: [4.0, -12.0, -6.0], scale: [15.0, 7.0], opacity: 0.7, driftSpeed: 0.045 },
    ];

    // 3. Background cloud sea (high horizon)
    const bg: CloudInstance[] = [
      { pos: [-15.0, -2.0, -28.0], scale: [32.0, 14.0], opacity: 0.85, driftSpeed: 0.015 },
      { pos: [12.0, -1.0, -32.0], scale: [35.0, 16.0], opacity: 0.85, driftSpeed: 0.018 },
      { pos: [0.0, -4.0, -30.0], scale: [40.0, 18.0], opacity: 0.9, driftSpeed: 0.012 },
    ];

    return { fgClouds: fg, mgClouds: mg, bgClouds: bg };
  }, []);

  useFrame((_, delta) => {
    if (!cloudsGroupRef.current) return;
    cloudsGroupRef.current.children.forEach((child, idx) => {
      // Subtle continuous horizontal wind drift
      child.position.x += 0.04 * delta;
      if (child.position.x > 25) {
        child.position.x = -25;
      }
    });
  });

  return (
    <group ref={cloudsGroupRef}>
      {/* Foreground Wisps */}
      {fgClouds.map((c, i) => (
        <mesh key={`fg-${i}`} position={c.pos}>
          <planeGeometry args={[c.scale[0], c.scale[1]]} />
          <meshBasicMaterial
            map={cloudTex}
            transparent
            opacity={c.opacity}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}

      {/* Midground Valley Clouds */}
      {mgClouds.map((c, i) => (
        <mesh key={`mg-${i}`} position={c.pos}>
          <planeGeometry args={[c.scale[0], c.scale[1]]} />
          <meshBasicMaterial
            map={cloudTex}
            transparent
            opacity={c.opacity}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}

      {/* Background Cloud Sea */}
      {bgClouds.map((c, i) => (
        <mesh key={`bg-${i}`} position={c.pos}>
          <planeGeometry args={[c.scale[0], c.scale[1]]} />
          <meshBasicMaterial
            map={cloudTex}
            transparent
            opacity={c.opacity}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
