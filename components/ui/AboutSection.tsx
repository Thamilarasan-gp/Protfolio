'use client';

import React from 'react';
import { Search, Lightbulb, Target, Rocket, ArrowRight } from 'lucide-react';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface AboutSectionProps {
  mode: JourneyMode;
  onExplore?: () => void;
  onContact?: () => void;
}

export function AboutSection({ mode, onExplore, onContact }: AboutSectionProps) {
  const traits = [
    { name: 'Curious', icon: Search },
    { name: 'Creative', icon: Lightbulb },
    { name: 'Focused', icon: Target },
    { name: 'Purpose Driven', icon: Rocket },
  ];

  return (
    <section className="section-wrapper about-section-wrapper" id="section-1">
      <div className="about-section-container">
        {/* Left Side: Step Tracker & Content */}
        <div className="about-content-col">
          {/* Vertical Milestone Tracker Rail */}
          <div className="about-timeline-rail" aria-hidden="true">
            <span className="timeline-step-num">01</span>
            <div className="timeline-node">
              <div className="timeline-node-inner" />
            </div>
            <div className="timeline-line" />
          </div>

          {/* Main Text Content */}
          <div className="about-text-wrapper">
            <div className="about-category-label">ABOUT ME</div>

            <h2 className="about-main-headline">
              More than <br />
              just code<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="about-bio-desc">
              I&apos;m Thamilarasan GP, a full-stack developer who loves turning ideas
              into meaningful digital experiences. I enjoy solving problems,
              learning new things, and building products that make an impact.
            </p>

            {/* 3 Metric Stat Counters */}
            <div className="about-stats-row">
              <div className="about-stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">
                  <span>Years</span>
                  <span>Experience</span>
                </div>
              </div>

              <div className="about-stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">
                  <span>Projects</span>
                  <span>Completed</span>
                </div>
              </div>

              <div className="about-stat-item">
                <div className="stat-number stat-infinity">&infin;</div>
                <div className="stat-label">
                  <span>Always</span>
                  <span>Learning</span>
                </div>
              </div>
            </div>

            {/* CTA Pill Button */}
            <div className="about-cta-row">
              <button
                type="button"
                className="about-pill-btn"
                onClick={onContact || onExplore}
                aria-label="Get to know me"
              >
                <span>Get to know me</span>
                <ArrowRight size={16} className="about-btn-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Rounded Mountain Visual Card with Dock */}
        <div className="about-card-col">
          <div className="about-mountain-card">
            {/* Background Mountain Climber Image */}
            <div
              className="about-card-bg"
              style={{ backgroundImage: `url('/images/about-mountain.jpg')` }}
            />

            {/* Subtle Gradient Scrim on Card */}
            <div className="about-card-overlay" />

            {/* Top Left Handwritten Script Quote */}
            <div className="about-card-quote">
              <span className="quote-script">&ldquo;Curious mind.</span>
              <span className="quote-script">Better solutions.&rdquo;</span>
              <svg className="quote-underline-svg" viewBox="0 0 120 20" fill="none">
                <path
                  d="M4 14 Q 55 4, 116 12"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Bottom Floating Glass Dock */}
            <div className="about-card-dock">
              {traits.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.name} className="dock-item">
                    <div className="dock-icon-box">
                      <Icon size={18} className="dock-icon" />
                    </div>
                    <span className="dock-label">{t.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
