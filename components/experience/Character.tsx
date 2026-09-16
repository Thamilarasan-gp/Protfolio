import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CharacterProps {
  position: [number, number, number];
  rotation: [number, number, number];
  pose: string;
  progress: number;
}

export function Character({ position, rotation, pose, progress }: CharacterProps) {
  const rootRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Group>(null);

  // Materials tailored from reference video
  const materials = useMemo(() => {
    return {
      jacket: new THREE.MeshStandardMaterial({
        color: '#1a1f29', // Dark technical mountaineering jacket
        roughness: 0.65,
        metalness: 0.15,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: '#28303d', // Tactical outdoor pants
        roughness: 0.75,
        metalness: 0.1,
      }),
      boots: new THREE.MeshStandardMaterial({
        color: '#11141a', // Sturdy dark climbing boots
        roughness: 0.8,
        metalness: 0.2,
      }),
      backpack: new THREE.MeshStandardMaterial({
        color: '#0f172a', // Heavy duty backpack
        roughness: 0.7,
        metalness: 0.1,
      }),
      skin: new THREE.MeshStandardMaterial({
        color: '#c99672', // Warm skin tone
        roughness: 0.5,
        metalness: 0.05,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: '#151515', // Dark hair
        roughness: 0.9,
      }),
      flag: new THREE.MeshStandardMaterial({
        color: '#0284c7', // Bright blue summit flag
        roughness: 0.4,
        side: THREE.DoubleSide,
      }),
    };
  }, []);

  useFrame(({ clock }) => {
    if (!rootRef.current || !torsoRef.current) return;

    // Smoothly interpolate position and base rotation
    rootRef.current.position.lerp(new THREE.Vector3(...position), 0.18);
    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, rotation[0], 0.15);
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, rotation[1], 0.15);
    rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, rotation[2], 0.15);

    const time = clock.getElapsedTime();
    const windWobble = Math.sin(time * 6) * 0.03;

    // Apply procedural kinematics based on pose
    if (pose === 'sit_cliff' || pose === 'lean_edge') {
      // Relaxed seated posture on cliff edge
      torsoRef.current.rotation.set(-0.15, 0, 0);
      headRef.current?.rotation.set(0.05, -0.2, 0);

      // Thighs horizontal, shins dangling down 90 deg
      leftLegRef.current?.rotation.set(-1.45, 0.15, 0);
      rightLegRef.current?.rotation.set(-1.45, -0.15, 0);

      // Arms resting casually on rocks
      leftArmRef.current?.rotation.set(0.4, 0, 0.35);
      rightArmRef.current?.rotation.set(-0.2, 0, -0.3);
      if (flagRef.current) flagRef.current.visible = false;
    } else if (pose === 'leap_launch' || pose === 'leap_dive') {
      // Dynamic mid-air dive / launch!
      torsoRef.current.rotation.set(0.85 + windWobble, 0, 0);
      headRef.current?.rotation.set(-0.4, 0, 0);

      // Outspread arms (soaring like a bird)
      leftArmRef.current?.rotation.set(-0.3, 0.4, 1.25);
      rightArmRef.current?.rotation.set(-0.3, -0.4, -1.25);
      leftForearmRef.current?.rotation.set(0.2, 0, 0.2);
      rightForearmRef.current?.rotation.set(0.2, 0, -0.2);

      // Legs trailing aerodynamically behind
      leftLegRef.current?.rotation.set(0.5, 0.1, 0.15);
      rightLegRef.current?.rotation.set(0.55, -0.1, -0.15);
      if (flagRef.current) flagRef.current.visible = false;
    } else if (pose === 'freefall_soar' || pose === 'canyon_glide') {
      // Horizontal freefall belly-to-earth skydiving
      torsoRef.current.rotation.set(1.15 + windWobble, 0, 0);
      headRef.current?.rotation.set(-0.6, 0, 0);

      leftArmRef.current?.rotation.set(-0.4, 0.2, 1.35 + windWobble);
      rightArmRef.current?.rotation.set(-0.4, -0.2, -1.35 - windWobble);
      leftLegRef.current?.rotation.set(0.65, 0.15, 0.2);
      rightLegRef.current?.rotation.set(0.65, -0.15, -0.2);
      if (flagRef.current) flagRef.current.visible = false;
    } else if (pose === 'impact_prep' || pose === 'touchdown') {
      // Tucking legs forward to prepare for touchdown
      torsoRef.current.rotation.set(0.35, 0, 0);
      headRef.current?.rotation.set(-0.2, 0, 0);

      leftLegRef.current?.rotation.set(-0.9, 0.15, 0);
      rightLegRef.current?.rotation.set(-0.8, -0.15, 0);
      leftArmRef.current?.rotation.set(0.8, 0, 0.5);
      rightArmRef.current?.rotation.set(0.8, 0, -0.5);
      if (flagRef.current) flagRef.current.visible = false;
    } else if (pose === 'hero_landing') {
      // EPIC SUPERHERO 3-POINT LANDING POSE!
      // Torso crouched low to ground
      torsoRef.current.rotation.set(0.95, 0, 0);
      // Head tilted up gazing fiercely at camera
      headRef.current?.rotation.set(-0.9, 0, 0);

      // Right fist/hand planted directly into the rock floor
      rightArmRef.current?.rotation.set(1.4, -0.2, -0.15);
      rightForearmRef.current?.rotation.set(0.4, 0, 0);

      // Left arm cocked back over body
      leftArmRef.current?.rotation.set(-0.6, 0.3, 0.85);
      leftForearmRef.current?.rotation.set(0.7, 0, 0);

      // Right knee bent under body touching rock
      rightLegRef.current?.rotation.set(-1.75, -0.2, 0);
      // Left leg extended wide for tripod stability
      leftLegRef.current?.rotation.set(-0.95, 0.6, 0.4);
      if (flagRef.current) flagRef.current.visible = false;
    } else if (pose.startsWith('rope_climb')) {
      // Rope climbing pose: hands reaching up gripping rope, feet braced
      torsoRef.current.rotation.set(0.1, 0, 0);
      headRef.current?.rotation.set(-0.4, 0, 0);

      const reach = Math.sin(time * 3);
      leftArmRef.current?.rotation.set(-2.2 + reach * 0.4, 0.2, 0.2);
      rightArmRef.current?.rotation.set(-2.2 - reach * 0.4, -0.2, -0.2);
      leftLegRef.current?.rotation.set(-0.8 + reach * 0.3, 0.2, 0);
      rightLegRef.current?.rotation.set(-0.8 - reach * 0.3, -0.2, 0);
      if (flagRef.current) flagRef.current.visible = false;
    } else if (pose === 'summit_flag') {
      // Victorious summit pose holding flag
      torsoRef.current.rotation.set(-0.05, 0, 0);
      headRef.current?.rotation.set(0, 0.2, 0);
      leftArmRef.current?.rotation.set(-1.8, 0, 0.3); // Holding flag pole
      rightArmRef.current?.rotation.set(0.2, 0, -0.4);
      leftLegRef.current?.rotation.set(0, 0.1, 0);
      rightLegRef.current?.rotation.set(0, -0.1, 0);

      if (flagRef.current) {
        flagRef.current.visible = true;
        flagRef.current.rotation.z = Math.sin(time * 4) * 0.1;
      }
    }
  });

  return (
    <group ref={rootRef} position={position} scale={[0.85, 0.85, 0.85]}>
      {/* Root / Pelvis */}
      <group ref={torsoRef} position={[0, 0.65, 0]}>
        {/* Torso / Technical Jacket */}
        <mesh castShadow receiveShadow material={materials.jacket}>
          <boxGeometry args={[0.42, 0.55, 0.26]} />
        </mesh>

        {/* Technical Hood / High Collar */}
        <mesh position={[0, 0.3, -0.04]} material={materials.jacket} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
        </mesh>

        {/* Rugged Backpack */}
        <mesh position={[0, 0.05, -0.2]} material={materials.backpack} castShadow>
          <boxGeometry args={[0.34, 0.45, 0.18]} />
        </mesh>
        {/* Backpack Bedroll / Top pouch */}
        <mesh position={[0, 0.3, -0.2]} rotation={[0, 0, Math.PI / 2]} material={materials.backpack}>
          <cylinderGeometry args={[0.07, 0.07, 0.32, 12]} />
        </mesh>

        {/* Head & Neck */}
        <group ref={headRef} position={[0, 0.42, 0.02]}>
          {/* Face */}
          <mesh castShadow material={materials.skin}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          {/* Hair */}
          <mesh position={[0, 0.04, -0.02]} castShadow material={materials.hair}>
            <sphereGeometry args={[0.125, 14, 14]} />
          </mesh>
        </group>

        {/* Left Arm Hierarchy */}
        <group ref={leftArmRef} position={[0.26, 0.2, 0]}>
          {/* Upper Arm */}
          <mesh position={[0.06, -0.16, 0]} material={materials.jacket} castShadow>
            <cylinderGeometry args={[0.07, 0.065, 0.3, 10]} />
          </mesh>
          {/* Left Forearm */}
          <group ref={leftForearmRef} position={[0.06, -0.32, 0]}>
            <mesh position={[0, -0.14, 0]} material={materials.jacket} castShadow>
              <cylinderGeometry args={[0.06, 0.055, 0.28, 10]} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.3, 0]} material={materials.skin}>
              <sphereGeometry args={[0.055, 8, 8]} />
            </mesh>
          </group>
        </group>

        {/* Right Arm Hierarchy */}
        <group ref={rightArmRef} position={[-0.26, 0.2, 0]}>
          {/* Upper Arm */}
          <mesh position={[-0.06, -0.16, 0]} material={materials.jacket} castShadow>
            <cylinderGeometry args={[0.07, 0.065, 0.3, 10]} />
          </mesh>
          {/* Right Forearm */}
          <group ref={rightForearmRef} position={[-0.06, -0.32, 0]}>
            <mesh position={[0, -0.14, 0]} material={materials.jacket} castShadow>
              <cylinderGeometry args={[0.06, 0.055, 0.28, 10]} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.3, 0]} material={materials.skin}>
              <sphereGeometry args={[0.055, 8, 8]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Pelvis to Legs */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[0.13, 0.35, 0]}>
        {/* Thigh */}
        <mesh position={[0, -0.2, 0]} material={materials.pants} castShadow>
          <cylinderGeometry args={[0.085, 0.075, 0.4, 10]} />
        </mesh>
        {/* Shin */}
        <group position={[0, -0.4, 0]}>
          <mesh position={[0, -0.18, 0]} material={materials.pants} castShadow>
            <cylinderGeometry args={[0.075, 0.065, 0.36, 10]} />
          </mesh>
          {/* Boot */}
          <mesh position={[0, -0.38, 0.06]} material={materials.boots} castShadow>
            <boxGeometry args={[0.11, 0.12, 0.24]} />
          </mesh>
        </group>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[-0.13, 0.35, 0]}>
        {/* Thigh */}
        <mesh position={[0, -0.2, 0]} material={materials.pants} castShadow>
          <cylinderGeometry args={[0.085, 0.075, 0.4, 10]} />
        </mesh>
        {/* Shin */}
        <group position={[0, -0.4, 0]}>
          <mesh position={[0, -0.18, 0]} material={materials.pants} castShadow>
            <cylinderGeometry args={[0.075, 0.065, 0.36, 10]} />
          </mesh>
          {/* Boot */}
          <mesh position={[0, -0.38, 0.06]} material={materials.boots} castShadow>
            <boxGeometry args={[0.11, 0.12, 0.24]} />
          </mesh>
        </group>
      </group>

      {/* Summit Flag (used in summit pose) */}
      <group ref={flagRef} position={[0.45, 0.6, 0]} visible={false}>
        {/* Pole */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Banner with text representation */}
        <mesh position={[0.45, 1.2, 0]} material={materials.flag}>
          <planeGeometry args={[0.9, 0.55]} />
        </mesh>
      </group>
    </group>
  );
}
