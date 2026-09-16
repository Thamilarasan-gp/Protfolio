'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  color: string;
  glowColor: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  icon: React.ReactNode;
  badge: string;
  experience: string;
  highlight: string;
  description: string;
  tags: string[];
}

// Exactly balanced on a 360° circular orbit (Radius = 37% from center 50%, 50%)
const CORE_SKILLS: SkillNode[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    x: 35.8,
    y: 15.8,
    badge: '👑 Core Superpower',
    experience: '3+ Yrs Production',
    highlight: 'App Router, SSR & Server Actions, Zero-Latency UI',
    description: 'Primary full-stack framework for building lightning-fast production web apps. Specialized in Next.js 14/15 App Router, React Server Components (RSC), dynamic server actions, and advanced SEO performance.',
    tags: ['App Router', 'Server Actions', 'SSR & ISR', 'SEO Engine', 'Turbopack'],
    icon: (
      <svg viewBox="0 0 180 180" width="26" height="26" fill="none">
        <circle cx="90" cy="90" r="90" fill="#0a0f1d" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <path
          d="M149.5 157.5L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.3z"
          fill="#ffffff"
        />
        <rect x="115" y="54" width="12" height="72" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    color: '#3178c6',
    glowColor: 'rgba(49, 120, 198, 0.45)',
    x: 64.2,
    y: 15.8,
    badge: '🛡️ Enterprise Standard',
    experience: '3+ Yrs Production',
    highlight: '100% Strict Type Safety, Scalable Interfaces & Contracts',
    description: 'Core language standard for enterprise-grade scalability. Enforces 100% strict type safety across client and server architectures, eliminating runtime crashes and guaranteeing reliable API contracts.',
    tags: ['Strict Mode', 'Generics', 'API Contracts', 'Type Utilities', 'Refactor Safety'],
    icon: (
      <div className="orbital-ts-badge">
        TS
      </div>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    x: 84.2,
    y: 35.8,
    badge: '🎨 Design Systems',
    experience: '3+ Yrs Production',
    highlight: 'Pixel-Perfect Fluid Layouts, Modern Glassmorphism',
    description: 'Design system foundation for crafting clean, ultra-responsive, and modern cyberpunk/glassmorphic interfaces without CSS bloat, ensuring sub-second paint times and fluid responsiveness.',
    tags: ['Design Systems', 'Glassmorphism', 'Responsive UX', 'Dark Modes', 'Zero Bloat'],
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#38bdf8">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    color: '#47a248',
    glowColor: 'rgba(71, 162, 72, 0.45)',
    x: 84.2,
    y: 64.2,
    badge: '🗄️ Cloud Database',
    experience: '2+ Yrs Production',
    highlight: 'Aggregation Pipelines, Schema Architecture & Indexing',
    description: 'Primary NoSQL database for flexible and high-speed data modeling. Engineered complex aggregation pipelines for real-time analytics, optimized compound indexes, and integrated Atlas clusters with Next.js and Node.js backends.',
    tags: ['Aggregation Pipelines', 'Schema Architecture', 'Mongoose ODM', 'Atlas Cloud', 'Sub-10ms Queries'],
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#47a248">
        <path d="M12 1.5s-.2 1.4-.4 2.2C10.7 7 9 10.6 9 14.2c0 3.8 2.2 6.5 3 7.8 0 0 .1.1.2.2.1-.1.2-.2.2-.2.8-1.3 3-4 3-7.8 0-3.6-1.7-7.2-2.6-10.5-.2-.8-.4-2.2-.4-2.2z" />
        <path d="M12 22s-.1-4.7 0-7.8c.1-1.7.3-3.4.6-5 0 0-1.8 3.5-1.8 6.4 0 2.9 1.2 6.4 1.2 6.4z" fill="#3fa037" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    color: '#e2e8f0',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    x: 64.2,
    y: 84.2,
    badge: '🔌 API Architecture',
    experience: '3+ Yrs Production',
    highlight: 'Secure REST Endpoints, Middleware, High-Speed Routing',
    description: 'High-performance REST API routing and microservice layer. Built modular middleware for JWT authentication, rate limiting, input sanitization, and CORS handling with sub-millisecond response latency.',
    tags: ['RESTful APIs', 'JWT Auth', 'Middleware', 'Microservices', 'Route Security'],
    icon: (
      <div className="orbital-ex-badge">
        ex
      </div>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    color: '#ffe052',
    glowColor: 'rgba(255, 224, 82, 0.45)',
    x: 35.8,
    y: 84.2,
    badge: '🐍 Automation & AI',
    experience: '2+ Yrs Production',
    highlight: 'Backend Services, Scripting, AI API Integrations',
    description: 'Versatile scripting engine for background worker automation, intelligent AI model integrations (LLM APIs, agents), and high-throughput data extraction and transformation pipelines.',
    tags: ['AI Integrations', 'Automation', 'Data Pipelines', 'Async Workers', 'Scripting'],
    icon: (
      <svg viewBox="0 0 128 128" width="26" height="26">
        <path
          fill="#387eb8"
          d="M63.5 8c-28.5 0-26.8 12.3-26.8 12.3l.1 12.7h27.3v3.9H25.8S8 34.8 8 63.8s15.6 27.8 15.6 27.8l9.3-.1v-13s-.5-15.6 15.3-15.6h26.4s14.7.2 14.7-14.4V22.7S91.8 8 63.5 8zm-14.8 8.1c2.6 0 4.8 2.1 4.8 4.8s-2.1 4.8-4.8 4.8-4.8-2.1-4.8-4.8 2.1-4.8 4.8-4.8z"
        />
        <path
          fill="#ffe052"
          d="M64.5 120c28.5 0 26.8-12.3 26.8-12.3l-.1-12.7H63.9v-3.9h38.3s17.8 2.1 17.8-26.9-15.6-27.8-15.6-27.8l-9.3.1v13s.5 15.6-15.3 15.6H43.4s-14.7-.2-14.7 14.4v25.8s-2.5 14.7 25.8 14.7zm14.8-8.1c-2.6 0-4.8-2.1-4.8-4.8s2.1-4.8 4.8-4.8 4.8 2.1 4.8 4.8-2.1 4.8-4.8 4.8z"
        />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    color: '#68a063',
    glowColor: 'rgba(104, 160, 99, 0.45)',
    x: 15.8,
    y: 64.2,
    badge: '🚀 High Concurrency',
    experience: '3+ Yrs Production',
    highlight: 'Event Loop Optimization, Microservices, Real-Time Streams',
    description: 'Event-driven asynchronous runtime powering high-concurrency microservices, real-time WebSocket communication channels, and distributed server architectures with zero bottlenecks.',
    tags: ['Event Loop', 'High Concurrency', 'REST APIs', 'Async Architecture', 'Streams'],
    icon: (
      <svg viewBox="0 0 32 32" width="26" height="26" fill="#68a063">
        <path d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5zm0 3.2l9.7 5.6v11.4L16 28.3l-9.7-5.6V11.3L16 5.7z" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    color: '#00d8ff',
    glowColor: 'rgba(0, 216, 255, 0.45)',
    x: 15.8,
    y: 35.8,
    badge: '⚡ Interactive UI',
    experience: '3+ Yrs Production',
    highlight: '3D/WebGL Canvas, Custom Hook Architectures, Performance',
    description: 'Modern UI library for interactive web experiences. Proficient in custom hook patterns, state architectures, Three.js / React Three Fiber 3D canvases, and fluid GSAP micro-animations.',
    tags: ['React 19', '3D WebGL / R3F', 'Custom Hooks', 'GSAP Animation', 'Component Architecture'],
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" width="28" height="28">
        <circle cx="0" cy="0" r="2.1" fill="#00d8ff" />
        <g stroke="#00d8ff" strokeWidth="1.1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
];

// Priority superpowers for recruiter recommendations
const PRIORITY_SKILL_IDS = ['mongodb', 'nextjs', 'react', 'typescript', 'nodejs'];

function playTickSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Audio unavailable or muted, proceed silently
  }
}

function playWinChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
      gain.gain.setValueAtTime(0.045, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.07 + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.32);
    });
  } catch {
    // Proceed silently
  }
}

export function OrbitalSkills() {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSkill(null);
        setActiveSkill(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSkill(null);

    // Pick target skill
    let targetSkill: SkillNode;
    if (spinCount < 3) {
      const preferredId = PRIORITY_SKILL_IDS[spinCount % PRIORITY_SKILL_IDS.length];
      targetSkill = CORE_SKILLS.find((s) => s.id === preferredId) || CORE_SKILLS[3]; // MongoDB default priority
    } else {
      const randomIndex = Math.floor(Math.random() * CORE_SKILLS.length);
      targetSkill = CORE_SKILLS[randomIndex];
    }

    const targetIndex = CORE_SKILLS.findIndex((s) => s.id === targetSkill.id);

    // Audio clicks during spin
    let tickCount = 0;
    tickIntervalRef.current = setInterval(() => {
      tickCount++;
      if (tickCount % 2 === 0) playTickSound();
    }, 90);

    // Calculate rotation: 4 full 360° spins + target index angular offset
    const fullSpins = 4;
    const baseStep = 360 / CORE_SKILLS.length; // 45°
    const newTargetRotation = rotation + (360 * fullSpins) + (targetIndex * baseStep);
    setRotation(newTargetRotation);

    spinTimeoutRef.current = setTimeout(() => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      setIsSpinning(false);
      setSelectedSkill(targetSkill);
      setActiveSkill(targetSkill);
      setSpinCount((prev) => prev + 1);
      playWinChime();
    }, 3200);
  };

  const displayedSkill = selectedSkill || activeSkill;

  return (
    <div className="orbital-skills-container" aria-label="Skills Showcase">
      {/* Reduced Minimal Skill Card outside above the orbit circle */}
      {selectedSkill && !isSpinning && (
        <div
          className="skill-orbit-card"
          style={{
            borderColor: `${selectedSkill.color}60`,
            boxShadow: `0 12px 32px rgba(0, 0, 0, 0.82), 0 0 24px ${selectedSkill.glowColor}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="skill-card-header">
            <div className="skill-card-identity">
              <div
                className="skill-card-icon-box"
                style={{
                  borderColor: `${selectedSkill.color}45`,
                  boxShadow: `0 0 10px ${selectedSkill.glowColor}`,
                }}
              >
                {selectedSkill.icon}
              </div>
              <div className="skill-card-titles">
                <h4 className="skill-card-name">{selectedSkill.name}</h4>
                <span className="skill-card-exp">{selectedSkill.experience}</span>
              </div>
            </div>

            <button
              type="button"
              className="skill-card-close-btn"
              onClick={() => {
                setSelectedSkill(null);
                setActiveSkill(null);
              }}
              aria-label="Dismiss skill card"
            >
              <X size={13} />
            </button>
          </div>

          <p className="skill-card-highlight-text">
            {selectedSkill.highlight}
          </p>
        </div>
      )}

      {/* Perfect Circle Stage */}
      <div className="orbital-stage">
        {/* Rotating Wheel Container (holds tracks and orbiting nodes) */}
        <div
          className="orbital-wheel-rotator"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? 'transform 3.2s cubic-bezier(0.12, 0.9, 0.22, 1)'
              : 'none',
          }}
        >
          {/* SVG Orbital Circular Tracks & Rays */}
          <svg
            className="orbital-svg-tracks"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.32" />
                <stop offset="45%" stopColor="#0284c7" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>

              <filter id="orbitalLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Central Radial Atmosphere */}
            <circle cx="250" cy="250" r="185" fill="url(#centerCoreGlow)" />

            {/* Outer Decorative Roundel Rim */}
            <circle
              cx="250"
              cy="250"
              r="238"
              className="orbital-track-ring rim-track"
            />

            {/* Main Orbital Track Circle */}
            <circle
              cx="250"
              cy="250"
              r="185"
              className="orbital-track-ring outer-track"
            />

            {/* Inner Orbital Circle */}
            <circle
              cx="250"
              cy="250"
              r="120"
              className="orbital-track-ring inner-track"
            />

            {/* Core Track Circle */}
            <circle
              cx="250"
              cy="250"
              r="68"
              className="orbital-track-ring core-track"
            />

            {/* Spoke lines linking center (250, 250) to each node */}
            {CORE_SKILLS.map((skill) => {
              const nodePxX = (skill.x / 100) * 500;
              const nodePxY = (skill.y / 100) * 500;
              const isHighlighted = displayedSkill?.id === skill.id;

              return (
                <line
                  key={skill.id}
                  x1="250"
                  y1="250"
                  x2={nodePxX}
                  y2={nodePxY}
                  stroke={isHighlighted ? skill.color : 'rgba(56, 189, 248, 0.18)'}
                  strokeWidth={isHighlighted ? '2.5' : '1'}
                  strokeDasharray={isHighlighted ? 'none' : '4 5'}
                  className={`orbital-spoke-line ${isHighlighted ? 'is-active' : ''}`}
                  filter={isHighlighted ? 'url(#orbitalLineGlow)' : undefined}
                />
              );
            })}
          </svg>

          {/* 8 Surrounding Orbital Skill Nodes (counter-rotated to stay upright) */}
          {CORE_SKILLS.map((skill) => {
            const isHighlighted = displayedSkill?.id === skill.id;
            const isDimmed = displayedSkill && displayedSkill.id !== skill.id;

            return (
              <div
                key={skill.id}
                className={`orbital-node-wrapper ${isHighlighted ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                  transition: isSpinning
                    ? 'transform 3.2s cubic-bezier(0.12, 0.9, 0.22, 1), opacity 0.3s ease'
                    : 'transform 0.3s ease, opacity 0.3s ease',
                }}
                onMouseEnter={() => {
                  if (!isSpinning) {
                    setActiveSkill(skill);
                  }
                }}
                onMouseLeave={() => {
                  if (!isSpinning && !selectedSkill) {
                    setActiveSkill(null);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSpinning) {
                    setSelectedSkill(skill);
                    setActiveSkill(skill);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${skill.name} Skill Node`}
              >
                {/* Circular Glass Capsule */}
                <div
                  className="orbital-circle-badge"
                  style={{
                    borderColor: isHighlighted ? skill.color : 'rgba(255, 255, 255, 0.18)',
                    boxShadow: isHighlighted
                      ? `0 0 32px ${skill.glowColor}, 0 0 50px ${skill.color}, 0 10px 25px rgba(0,0,0,0.8), inset 0 0 14px ${skill.glowColor}`
                      : `0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
                  }}
                >
                  {/* Subtle Inner Gradient Glow */}
                  <div
                    className="orbital-node-glow"
                    style={{
                      background: `radial-gradient(circle, ${skill.glowColor} 0%, transparent 70%)`,
                      opacity: isHighlighted ? 0.95 : 0.25,
                    }}
                  />

                  {/* Node Icon */}
                  <div className="orbital-node-icon">
                    {skill.icon}
                  </div>
                </div>

                {/* Node Label Below */}
                <span
                  className="orbital-node-label"
                  style={{
                    color: isHighlighted ? '#ffffff' : '#cbd5e1',
                    textShadow: isHighlighted
                      ? `0 0 12px ${skill.color}`
                      : '0 2px 8px rgba(0,0,0,0.7)',
                  }}
                >
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Nucleus Hub */}
        <button
          type="button"
          onClick={spinWheel}
          disabled={isSpinning}
          className={`orbital-center-hub ${displayedSkill ? 'has-active' : ''} ${isSpinning ? 'is-spinning' : ''}`}
          style={{
            boxShadow: displayedSkill
              ? `0 0 45px ${displayedSkill.glowColor}, inset 0 0 25px ${displayedSkill.glowColor}`
              : undefined,
            borderColor: displayedSkill ? displayedSkill.color : undefined,
          }}
          aria-label="Spin skills wheel"
        >
          {/* Outer Slow Rotating Aura Ring */}
          <div className="center-hub-ring-slow" />

          {/* Subtle Ambient Pulse Halo */}
          <div className={`center-hub-halo ${isSpinning ? 'halo-fast-spin' : ''}`} />

          {/* 3D Flipping Center Card */}
          <div className="center-flip-card">
            <div className={`center-flip-inner ${isSpinning ? 'is-spinning-inner' : ''}`}>
              {/* Face 1: MY SKILLS */}
              <div className="center-flip-face center-flip-front">
                <span className="hub-main-text">MY</span>
                <span className="hub-main-text-sub">SKILLS</span>
              </div>

              {/* Face 2: CLICK TO SPIN */}
              <div className="center-flip-face center-flip-back">
                <span className="hub-flip-prompt">CLICK</span>
                <span className="hub-flip-prompt-sub">TO SPIN</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
