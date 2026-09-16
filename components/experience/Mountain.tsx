import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createRockNormalTexture } from '@/lib/three/textures';

export function Mountain() {
  const rockNormal = useMemo(() => {
    return createRockNormalTexture();
  }, []);

  // Procedural jagged cliff geometry with organic rock facets
  const { cliffGeo, snowGeo, ridgeGeo, distantGeo, groundGeo } = useMemo(() => {
    // 1. Foreground Main Cliff (right side of camera)
    const cGeo = new THREE.CylinderGeometry(2.4, 4.2, 22, 16, 24);
    const pos = cGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Displace vertices with rock-like noise
      const noise =
        Math.sin(y * 0.8) * 0.4 +
        Math.cos(x * 1.5 + z * 1.5) * 0.35 +
        Math.sin(x * 3.0 + y * 2.0) * 0.15;

      // Flatten the top summit plateau slightly for seating and landing
      if (y > 9.5) {
        pos.setY(i, 9.5 + (y - 9.5) * 0.25);
      } else {
        pos.setX(i, x + noise * 0.6);
        pos.setZ(i, z + noise * 0.6);
      }
    }
    cGeo.computeVertexNormals();

    // 2. Snow cap geometry on cliff ledge
    const sGeo = new THREE.CylinderGeometry(2.35, 2.5, 0.4, 16, 4);
    const sPos = sGeo.attributes.position;
    for (let i = 0; i < sPos.count; i++) {
      const x = sPos.getX(i);
      const z = sPos.getZ(i);
      sPos.setY(i, sPos.getY(i) + Math.sin(x * 2.0) * Math.cos(z * 2.0) * 0.08);
    }
    sGeo.computeVertexNormals();

    // 3. Midground Mountain Ridges
    const rGeo = new THREE.ConeGeometry(8, 18, 7, 8);
    const rPos = rGeo.attributes.position;
    for (let i = 0; i < rPos.count; i++) {
      const y = rPos.getY(i);
      const x = rPos.getX(i);
      const z = rPos.getZ(i);
      const crag = Math.sin(y * 0.6) * 0.8 + Math.cos(x * 1.2) * 0.5;
      rPos.setX(i, x + crag);
      rPos.setZ(i, z + crag);
    }
    rGeo.computeVertexNormals();

    // 4. Distant Alpine Peaks (Background)
    const dGeo = new THREE.ConeGeometry(28, 42, 6, 6);
    const dPos = dGeo.attributes.position;
    for (let i = 0; i < dPos.count; i++) {
      const y = dPos.getY(i);
      const x = dPos.getX(i);
      const z = dPos.getZ(i);
      const distDisplace = Math.sin(y * 0.2) * 2.5 + Math.cos(x * 0.4) * 1.8;
      dPos.setX(i, x + distDisplace);
      dPos.setZ(i, z + distDisplace);
    }
    dGeo.computeVertexNormals();

    // 5. Ground Impact Boulder Plateau (at bottom y = -15)
    const gGeo = new THREE.BoxGeometry(16, 3, 16, 12, 4, 12);
    const gPos = gGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const x = gPos.getX(i);
      const y = gPos.getY(i);
      const z = gPos.getZ(i);
      if (y > 0) {
        gPos.setY(i, y + Math.sin(x * 0.7) * Math.cos(z * 0.7) * 0.35);
      }
    }
    gGeo.computeVertexNormals();

    return {
      cliffGeo: cGeo,
      snowGeo: sGeo,
      ridgeGeo: rGeo,
      distantGeo: dGeo,
      groundGeo: gGeo,
    };
  }, []);

  return (
    <group>
      {/* Main Foreground Cliff (Right Side) */}
      <mesh
        geometry={cliffGeo}
        position={[2.8, -3.0, -1.0]}
        rotation={[0, -0.4, 0.05]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color="#242c38"
          roughness={0.88}
          metalness={0.12}
          normalMap={rockNormal}
          normalScale={new THREE.Vector2(0.8, 0.8)}
          flatShading={false}
        />
      </mesh>

      {/* Snow cap on the Cliff Top Ledge */}
      <mesh
        geometry={snowGeo}
        position={[2.8, 6.4, -1.0]}
        rotation={[0, -0.4, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#edf4fc"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Secondary Left Foreground Crag */}
      <mesh
        geometry={cliffGeo}
        position={[-5.8, -6.0, -2.5]}
        scale={[0.75, 0.85, 0.75]}
        rotation={[0.1, 0.6, -0.05]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#1e2530"
          roughness={0.9}
          metalness={0.1}
          normalMap={rockNormal}
        />
      </mesh>

      {/* Midground Mountain Ridges */}
      <mesh
        geometry={ridgeGeo}
        position={[-8.0, -1.0, -14.0]}
        rotation={[0, 0.3, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#2d3748"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      <mesh
        geometry={ridgeGeo}
        position={[7.5, 0.5, -18.0]}
        scale={[1.2, 1.2, 1.2]}
        rotation={[0, -0.6, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#334155"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      <mesh
        geometry={ridgeGeo}
        position={[-1.5, -4.0, -22.0]}
        scale={[1.5, 1.3, 1.5]}
        rotation={[0, 1.1, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#384556"
          roughness={0.8}
        />
      </mesh>

      {/* Distant Majestic Snowy Alpine Peaks (Deep Background) */}
      <mesh
        geometry={distantGeo}
        position={[-18.0, 4.0, -45.0]}
        rotation={[0, 0.5, 0]}
      >
        <meshStandardMaterial
          color="#dbeafe"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      <mesh
        geometry={distantGeo}
        position={[14.0, 6.0, -52.0]}
        scale={[1.3, 1.2, 1.3]}
        rotation={[0, -0.8, 0]}
      >
        <meshStandardMaterial
          color="#e0edfd"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      <mesh
        geometry={distantGeo}
        position={[0.0, 2.0, -60.0]}
        scale={[1.6, 1.4, 1.6]}
        rotation={[0, 0.2, 0]}
      >
        <meshStandardMaterial
          color="#cfe0f5"
          roughness={0.7}
        />
      </mesh>

      {/* Ground Impact Rock Plateau (Landing Zone for Section 06) */}
      <mesh
        geometry={groundGeo}
        position={[0.0, -15.6, 2.5]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#222a36"
          roughness={0.92}
          metalness={0.08}
          normalMap={rockNormal}
          normalScale={new THREE.Vector2(1.2, 1.2)}
        />
      </mesh>

      {/* Accent Boulders around landing zone */}
      <mesh position={[1.8, -14.3, 3.8]} rotation={[0.2, 0.4, 0.1]} receiveShadow castShadow>
        <dodecahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} normalMap={rockNormal} />
      </mesh>

      <mesh position={[-1.6, -14.4, 3.2]} rotation={[-0.1, 0.8, 0.2]} receiveShadow castShadow>
        <dodecahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial color="#28313e" roughness={0.9} normalMap={rockNormal} />
      </mesh>

      <mesh position={[0.5, -14.5, 1.8]} rotation={[0.4, -0.3, 0.1]} receiveShadow castShadow>
        <dodecahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color="#323e50" roughness={0.9} normalMap={rockNormal} />
      </mesh>
    </group>
  );
}
