'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, PROJECTS } from '@/lib/data/projects';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  mode?: JourneyMode;
  onExplore?: () => void;
}

const ROTATIONS = [-3.5, 0, 3.5];

const projectImages: Record<string, string> = {
  smartbus: '/images/project_smartbus.jpg',
  smartparking: '/images/project_smartparking.jpg',
  messmate: '/images/project_messmate.jpg',
  anthurium: '/images/project_anthurium.jpg',
  gdgsync: '/images/project_gdgsync.jpg',
  journalforge: '/images/project_journalforge.jpg',
  peakflow: '/images/project_peakflow.jpg',
  nexadopt: '/images/project_nexadopt.jpg',
};

export function ProjectsSection({ onSelectProject, onExplore }: ProjectsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  // Reorder array based on startIndex to smoothly cycle 3 cards at a time
  const displayedProjects = [
    ...PROJECTS.slice(startIndex),
    ...PROJECTS.slice(0, startIndex),
  ].slice(0, 3);

  return (
    <section className="section-wrapper projects-section-wrapper" id="section-3">
      <div className="projects-section-container">
        {/* Left Side: Timeline Node & Header */}
        <div className="projects-content-col">
          <div className="projects-timeline-rail" aria-hidden="true">
            <span className="timeline-step-num">03</span>
            <div className="timeline-node">
              <div className="timeline-node-inner" />
            </div>
            <div className="timeline-line" />
          </div>

          <div className="projects-text-wrapper">
            <div className="projects-category-label">PROJECTS</div>

            <h2 className="projects-main-headline">
              Ideas <br />
              that work <br />
              in real life<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="projects-bio-desc">
              A collection of projects where I turned ideas into functional,
              user-friendly products.
            </p>

            <div className="projects-cta-row">
              <button
                type="button"
                className="projects-pill-btn"
                onClick={onExplore}
                aria-label="View all projects"
              >
                <span>View all projects</span>
                <ArrowRight size={16} className="projects-btn-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Cascading Fanned Cards Showcase with Script Accent & Nav */}
        <div className="projects-cards-col">
          <div className="projects-deck-outer">
            {/* Left Hand-drawn Script Accent */}
            <div className="projects-script-note" aria-hidden="true">
              <div className="script-text">
                <span>From</span>
                <span>Ideas</span>
                <span className="script-indent"><span className="script-to">to</span> Impact</span>
              </div>
              <svg className="script-arrow" viewBox="0 0 65 50" fill="none">
                <path
                  d="M10 8 C 15 30, 35 42, 54 44"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M44 37 L 55 44 L 46 51"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Cards Deck & Centered Nav */}
            <div className="projects-deck-and-nav">
              {/* Fanned Cards Row */}
              <div className="projects-fanned-deck">
                {displayedProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="project-polaroid-card"
                    style={{
                      '--card-rotation': `${ROTATIONS[idx % ROTATIONS.length]}deg`,
                      zIndex: idx + 1,
                    } as React.CSSProperties}
                    onClick={() => onSelectProject(p)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${p.title} project details`}
                  >
                    {/* Top Image Preview Frame */}
                    <div className="polaroid-image-frame">
                      <div
                        className="polaroid-image"
                        style={{
                          backgroundImage: `url('${projectImages[p.id] || '/images/project_smartbus.jpg'}')`,
                        }}
                      />
                    </div>

                    {/* Bottom Caption Bar */}
                    <div className="polaroid-caption">
                      <div className="polaroid-titles">
                        <h3 className="polaroid-title">{p.title}</h3>
                        <span className="polaroid-subtitle">{p.subtitle}{p.year ? ` • ${p.year}` : ''}</span>
                      </div>

                      <div className="polaroid-arrow-icon" aria-hidden="true">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Deck Navigation Buttons - Centered directly under the 3 cards */}
              <div className="projects-deck-nav">
                <button
                  type="button"
                  className="deck-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="deck-nav-btn"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
