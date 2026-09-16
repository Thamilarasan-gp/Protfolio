'use client';

import React from 'react';
import { GraduationCap, Code2, BarChart3, Rocket, ArrowRight } from 'lucide-react';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface JourneySectionProps {
  mode?: JourneyMode;
  onExplore?: () => void;
}

export function JourneySection({ onExplore }: JourneySectionProps) {
  const journeyMilestones = [
    {
      id: 'learning',
      title: 'Learning',
      subtitle: 'Building the foundation',
      badge: 'Then',
      badgeClass: 'badge-muted',
      icon: GraduationCap,
    },
    {
      id: 'skill-building',
      title: 'Skill Building',
      subtitle: 'Exploring & experimenting',
      badge: 'Next',
      badgeClass: 'badge-muted',
      icon: Code2,
    },
    {
      id: 'still-growing',
      title: 'Still Growing',
      subtitle: 'Taking on real challenges',
      badge: 'Now',
      badgeClass: 'badge-active-now',
      icon: BarChart3,
    },
    {
      id: 'bigger-things',
      title: 'Bigger Things Ahead',
      subtitle: 'Creating greater impact',
      badge: 'Future',
      badgeClass: 'badge-muted',
      icon: Rocket,
    },
  ];

  return (
    <section className="section-wrapper journey-section-wrapper" id="section-4">
      <div className="journey-section-container">
        {/* Left Side: Timeline Node & Header */}
        <div className="journey-content-col">
          <div className="journey-timeline-rail" aria-hidden="true">
            <span className="timeline-step-num">04</span>
            <div className="timeline-node">
              <div className="timeline-node-inner" />
            </div>
            <div className="timeline-line" />
          </div>

          <div className="journey-text-wrapper">
            <div className="journey-category-label">JOURNEY</div>

            <h2 className="journey-main-headline">
              A path of <br />
              continuous <br />
              growth<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="journey-bio-desc">
              Every step has taught me something new and brought me closer to the builder I want to be.
            </p>

            <div className="journey-cta-row">
              <button
                type="button"
                className="journey-pill-btn"
                onClick={onExplore}
                aria-label="Read my story"
              >
                <span>Read my story</span>
                <ArrowRight size={16} className="journey-btn-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: 4 Milestone Cards Stack */}
        <div className="journey-cards-col">
          <div className="journey-milestones-stack">
            {journeyMilestones.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="journey-milestone-card">
                  <div className="milestone-icon-circle">
                    <Icon size={20} className="milestone-icon" />
                  </div>

                  <div className="milestone-info">
                    <h3 className="milestone-title">{item.title}</h3>
                    <p className="milestone-subtitle">{item.subtitle}</p>
                  </div>

                  <div className={`milestone-badge ${item.badgeClass}`}>
                    {item.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
