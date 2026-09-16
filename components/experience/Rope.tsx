import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createRopeTexture } from '@/lib/three/textures';

interface RopeProps {
  mode?: 'leap' | 'climb';
}

export function Rope({ mode = 'leap' }: RopeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ropeTexture = useMemo(() => createRopeTexture(), []);

  // Define 3D anchor points along cliff wall
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(1.3, 4.4, 0.3),    // Anchor on cliff ledge
      new THREE.Vector3(1.15, 3.8, 0.45),  // Over the lip
      new THREE.Vector3(0.95, 2.2, 0.48),  // Hanging down wall
      new THREE.Vector3(0.85, 0.4, 0.42),  // Mid wall
      new THREE.Vector3(0.8, -1.8, 0.38),  // Lower wall
      new THREE.Vector3(0.75, -4.2, 0.35), // Dangling end
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const ropeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.035, 8, false);
  }, [curve]);

  // Subtle wind sway
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.x = Math.sin(t * 1.8) * 0.015;
      meshRef.current.position.z = Math.cos(t * 1.4) * 0.012;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Anchor Ring / Piton on Rock */}
      <mesh position={[1.32, 4.42, 0.28]} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[0.07, 0.02, 12, 24]} />
        <meshStandardMaterial color="#c0a060" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Anchor Carabiner Bolt */}
      <mesh position={[1.34, 4.4, 0.25]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.15, 12]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 3D Braided Rope Mesh */}
      <mesh ref={meshRef} geometry={ropeGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#d4a373"
          roughness={0.7}
          metalness={0.1}
          map={ropeTexture}
        />
      </mesh>
    </group>
  );
}
