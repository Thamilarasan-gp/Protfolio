import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createDustParticleTexture } from '@/lib/three/textures';

interface LandingShockwaveProps {
  progress: number;
}

export function LandingShockwave({ progress }: LandingShockwaveProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const dustTexture = useMemo(() => createDustParticleTexture(), []);

  // Compute impact intensity (0 before 0.88, then ramps up rapidly and fades)
  const isImpactActive = progress >= 0.88;
  const impactAge = isImpactActive ? Math.min(1.0, (progress - 0.88) / 0.12) : 0;

  // Particle positions and velocities for the ground explosion
  const { positions, velocities } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 1.6;
      const up = 0.2 + Math.random() * 0.9;

      pos[i * 3] = 0.0;
      pos[i * 3 + 1] = -14.15;
      pos[i * 3 + 2] = 3.2;

      vel[i * 3] = Math.cos(angle) * speed;
      vel[i * 3 + 1] = up;
      vel[i * 3 + 2] = Math.sin(angle) * speed;
    }

    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!ringRef.current || !particlesRef.current) return;

    if (!isImpactActive) {
      ringRef.current.visible = false;
      particlesRef.current.visible = false;
      return;
    }

    ringRef.current.visible = true;
    particlesRef.current.visible = true;

    // Expand shockwave ring
    const scale = 0.4 + impactAge * 4.5;
    ringRef.current.scale.set(scale, scale, 1);
    const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
    ringMat.opacity = Math.max(0, (1 - impactAge) * 0.7);

    // Expand dust particles
    const posAttr = particlesRef.current.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = velocities[i * 3];
      const vy = velocities[i * 3 + 1];
      const vz = velocities[i * 3 + 2];

      posAttr.setXYZ(
        i,
        0.0 + vx * impactAge * 2.2,
        -14.15 + (vy * impactAge - 0.5 * 2.0 * impactAge * impactAge) * 1.5,
        3.2 + vz * impactAge * 2.2
      );
    }
    posAttr.needsUpdate = true;

    const partMat = particlesRef.current.material as THREE.PointsMaterial;
    partMat.opacity = Math.max(0, (1 - impactAge) * 0.85);
  });

  return (
    <group>
      {/* Expanding Circular Ground Shockwave Ring */}
      <mesh
        ref={ringRef}
        position={[0.0, -14.16, 3.2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.8, 1.1, 32]} />
        <meshBasicMaterial
          color="#e2e8f0"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Radial Dust/Pebble Explosion Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          map={dustTexture}
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
