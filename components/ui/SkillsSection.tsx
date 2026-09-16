'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { JourneyMode } from '@/components/animation/MasterTimeline';
import { OrbitalSkills } from './OrbitalSkills';

interface SkillsSectionProps {
  mode?: JourneyMode;
  onExplore?: () => void;
}

export function SkillsSection({ onExplore }: SkillsSectionProps) {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        {
          name: 'React',
          color: '#00d8ff',
          bg: 'rgba(0, 216, 255, 0.12)',
          border: 'rgba(0, 216, 255, 0.25)',
          svg: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" width="22" height="22">
              <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
              <g stroke="#00d8ff" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          ),
        },
        {
          name: 'Next.js',
          color: '#ffffff',
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.22)',
          svg: (
            <svg viewBox="0 0 180 180" width="20" height="20" fill="none">
              <circle cx="90" cy="90" r="90" fill="#000000" />
              <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#ffffff" />
              <rect x="115" y="54" width="12" height="72" fill="#ffffff" />
            </svg>
          ),
        },
        {
          name: 'TypeScript',
          color: '#3178c6',
          bg: 'rgba(49, 120, 198, 0.15)',
          border: 'rgba(49, 120, 198, 0.3)',
          svg: (
            <div style={{ fontWeight: 800, fontSize: '13px', color: '#3178c6', fontFamily: 'monospace' }}>
              TS
            </div>
          ),
        },
        {
          name: 'Tailwind CSS',
          color: '#38bdf8',
          bg: 'rgba(56, 189, 248, 0.12)',
          border: 'rgba(56, 189, 248, 0.25)',
          svg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#38bdf8">
              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
            </svg>
          ),
        },
      ],
    },
    {
      category: 'Backend',
      skills: [
        {
          name: 'Node.js',
          color: '#68a063',
          bg: 'rgba(104, 160, 99, 0.12)',
          border: 'rgba(104, 160, 99, 0.25)',
          svg: (
            <svg viewBox="0 0 32 32" width="20" height="20" fill="#68a063">
              <path d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5zm0 3.2l9.7 5.6v11.4L16 28.3l-9.7-5.6V11.3L16 5.7z" />
            </svg>
          ),
        },
        {
          name: 'Python',
          color: '#ffde57',
          bg: 'rgba(255, 222, 87, 0.12)',
          border: 'rgba(75, 139, 190, 0.3)',
          svg: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path fill="#387eb8" d="M63.5 8c-28.5 0-26.8 12.3-26.8 12.3l.1 12.7h27.3v3.9H25.8S8 34.8 8 63.8s15.6 27.8 15.6 27.8l9.3-.1v-13s-.5-15.6 15.3-15.6h26.4s14.7.2 14.7-14.4V22.7S91.8 8 63.5 8zm-14.8 8.1c2.6 0 4.8 2.1 4.8 4.8s-2.1 4.8-4.8 4.8-4.8-2.1-4.8-4.8 2.1-4.8 4.8-4.8z" />
              <path fill="#ffe052" d="M64.5 120c28.5 0 26.8-12.3 26.8-12.3l-.1-12.7H63.9v-3.9h38.3s17.8 2.1 17.8-26.9-15.6-27.8-15.6-27.8l-9.3.1v13s.5 15.6-15.3 15.6H43.4s-14.7-.2-14.7 14.4v25.8s-2.5 14.7 25.8 14.7zm14.8-8.1c-2.6 0-4.8-2.1-4.8-4.8s2.1-4.8 4.8-4.8 4.8 2.1 4.8 4.8-2.1 4.8-4.8 4.8z" />
            </svg>
          ),
        },
        {
          name: 'Express.js',
          color: '#ffffff',
          bg: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.2)',
          svg: (
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff', fontStyle: 'italic' }}>
              ex
            </div>
          ),
        },
      ],
    },
    {
      category: 'Database',
      skills: [
        {
          name: 'MongoDB',
          color: '#47a248',
          bg: 'rgba(71, 162, 72, 0.12)',
          border: 'rgba(71, 162, 72, 0.25)',
          svg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#47a248">
              <path d="M12 2C12 2 6 7.5 6 13C6 16.5 8.5 19.5 12 22C15.5 19.5 18 16.5 18 13C18 7.5 12 2 12 2Z" />
            </svg>
          ),
        },
        {
          name: 'PostgreSQL',
          color: '#336791',
          bg: 'rgba(51, 103, 145, 0.14)',
          border: 'rgba(51, 103, 145, 0.28)',
          svg: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#336791">
              <path d="M12 3C7 3 4 6 4 10c0 3 2 5.5 4.5 6.5L8 19l3-1.5c.3.1.7.2 1 .2 5 0 8-3.5 8-7.7C20 6 17 3 12 3z" />
            </svg>
          ),
        },
        {
          name: 'Firebase',
          color: '#ffca28',
          bg: 'rgba(255, 202, 40, 0.12)',
          border: 'rgba(255, 202, 40, 0.25)',
          svg: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#ffa000" d="M3.8 17.2L8.2 4.1c.1-.4.6-.5.9-.2l3.4 4.5-8.7 8.8z" />
              <path fill="#f57c00" d="M14.6 9.4L11.5 3.3c-.2-.4-.8-.4-1 0L3.8 17.2l10.8-7.8z" />
              <path fill="#ffca28" d="M12 18.2l7.7-4.3c.4-.2.5-.7.2-1l-3.3-6.2c-.2-.3-.7-.4-.9-.1L3.8 17.2l8.2 4.7 8.2-4.7-8.2 1z" />
            </svg>
          ),
        },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        {
          name: 'Git',
          color: '#f05032',
          bg: 'rgba(240, 80, 50, 0.12)',
          border: 'rgba(240, 80, 50, 0.25)',
          svg: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#f05032">
              <path d="M21.6 10.9l-8.5-8.5c-.8-.8-2-.8-2.8 0L8.2 4.5l3.5 3.5c.8-.3 1.8-.1 2.4.6.6.6.8 1.6.5 2.4l3.4 3.4c.8-.3 1.8-.1 2.4.6.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.7-.7-.8-1.7-.5-2.5l-3.2-3.2v5.3c.3.2.5.5.6.8.4.8.2 1.9-.5 2.5s-1.9.5-2.5-.2c-.7-.7-.8-1.8-.3-2.6.2-.3.4-.6.7-.8v-5.4c-.3-.2-.5-.5-.7-.8-.5-.6-.6-1.5-.2-2.3L7.1 5.6 2.4 10.3c-.8.8-.8 2 0 2.8l8.5 8.5c.8.8 2 .8 2.8 0l7.9-7.9c.8-.8.8-2 0-2.8z" />
            </svg>
          ),
        },
        {
          name: 'GitHub',
          color: '#ffffff',
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
          svg: (
            <svg viewBox="0 0 24 24" width="19" height="19" fill="#ffffff">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          ),
        },
        {
          name: 'Figma',
          color: '#f24e1e',
          bg: 'rgba(242, 78, 30, 0.12)',
          border: 'rgba(242, 78, 30, 0.25)',
          svg: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="#f24e1e" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#ff7262" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" fill="#1abcfe" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" fill="#0acf83" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#a259ff" />
            </svg>
          ),
        },
        {
          name: 'VS Code',
          color: '#007acc',
          bg: 'rgba(0, 122, 204, 0.14)',
          border: 'rgba(0, 122, 204, 0.28)',
          svg: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#007acc">
              <path d="M17.5 2L7 11.2l-4-3.2L1 9.5l4.5 3.5L1 16.5l2 1.5 4-3.2L17.5 24 23 21.5V4.5L17.5 2zm1.5 16.2l-7-5.7 7-5.7v11.4z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <section className="section-wrapper skills-section-wrapper" id="section-2">
      <div className="skills-section-container">
        {/* Left Side: Timeline Node & Header */}
        <div className="skills-content-col">
          <div className="skills-timeline-rail" aria-hidden="true">
            <span className="timeline-step-num">02</span>
            <div className="timeline-node">
              <div className="timeline-node-inner" />
            </div>
            <div className="timeline-line" />
          </div>

          <div className="skills-text-wrapper">
            <div className="skills-category-label">SKILLS</div>

            <h2 className="skills-main-headline">
              Tools that <br />
              turn ideas <br />
              into reality<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="skills-bio-desc">
              A mix of technologies, frameworks, and tools I use to build modern,
              scalable and beautiful digital experiences.
            </p>

            <div className="skills-cta-row">
              <button
                type="button"
                className="skills-pill-btn"
                onClick={onExplore}
                aria-label="View my journey"
              >
                <span>View my journey</span>
                <ArrowRight size={16} className="skills-btn-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Circular Orbital Skills Showcase */}
        <div className="skills-cards-col skills-orbital-col">
          <OrbitalSkills />
        </div>
      </div>
    </section>
  );
}
