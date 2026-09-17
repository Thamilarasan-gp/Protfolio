'use client';

import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  Award,
  Medal,
  Calendar,
  Building2
} from 'lucide-react';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface AchievementsSectionProps {
  mode?: JourneyMode;
  onExplore?: () => void;
  onContact?: () => void;
}

interface HackathonItem {
  id: string;
  title: string;
  category: string;
  institution: string;
  result: 'Winner' | 'Runner Up';
  year: string;
  highlight?: boolean;
}

const HACKATHONS: HackathonItem[] = [
  {
    id: 'psg-web',
    title: 'Web Development Challenge',
    category: 'State Level Technical Symposium',
    institution: 'PSG College of Technology',
    result: 'Runner Up',
    year: '2024',
    highlight: true,
  },
  {
    id: 'freshathon-parking',
    title: 'Smart Parking System',
    category: 'Freshathon Innovation Hackathon',
    institution: 'SECE',
    result: 'Runner Up',
    year: '2024',
    highlight: true,
  },
  {
    id: 'kpr-hackathon',
    title: '24-Hour Hackathon',
    category: 'Rapid Prototype & Product Sprint',
    institution: 'KPR Institute of Engineering & Technology',
    result: 'Runner Up',
    year: '2025',
  },
  {
    id: 'ngp-expo',
    title: 'Project Innovation Expo',
    category: 'Hardware & IoT Solutions',
    institution: 'Dr. NGP Institute of Technology',
    result: 'Runner Up',
    year: '2025',
  },
  {
    id: 'c-buildathon',
    title: 'C Buildathon-Expo',
    category: 'Systems & Algorithm Design',
    institution: 'SECE Department Level',
    result: 'Winner',
    year: '2023',
    highlight: true,
  },
  {
    id: 'bus-ticketing',
    title: 'Smart Bus Ticketing System',
    category: 'Transit Automation Prototype',
    institution: 'Mini Project Expo | SECE',
    result: 'Runner Up',
    year: '2024',
  },
];

export function AchievementsSection({ onExplore }: AchievementsSectionProps) {
  return (
    <section className="section-wrapper achievements-section-wrapper" id="section-5">
      <div className="achievements-section-container">
        {/* Left Side: Timeline Rail, Category & Bio */}
        <div className="achievements-content-col">
          <div className="achievements-timeline-rail" aria-hidden="true">
            <span className="timeline-step-num">05</span>
            <div className="timeline-node">
              <div className="timeline-node-inner" />
            </div>
            <div className="timeline-line" />
          </div>

          <div className="achievements-text-wrapper">
            <div className="achievements-category-label">ACHIEVEMENTS</div>

            <h2 className="achievements-main-headline">
              Hackathons & <br />
              acclaimed wins<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="achievements-bio-desc">
              Podium finishes, competitive buildathons, and innovation expos across premier state-level symposiums and 24-hour sprint challenges.
            </p>

            {/* Quick Metrics Stats Grid */}
            <div className="achievements-stats-grid">
              <div className="achieve-stat-box black-stat-box">
                <span className="achieve-stat-num">6</span>
                <span className="achieve-stat-lbl">Podium Finishes</span>
              </div>
              <div className="achieve-stat-box black-stat-box">
                <span className="achieve-stat-num">₹20,000+</span>
                <span className="achieve-stat-lbl">Cash Awards Won</span>
              </div>
              <div className="achieve-stat-box black-stat-box">
                <span className="achieve-stat-num">Winner</span>
                <span className="achieve-stat-lbl">C Buildathon Expo</span>
              </div>
              <div className="achieve-stat-box black-stat-box">
                <span className="achieve-stat-num">State</span>
                <span className="achieve-stat-lbl">Level Recognition</span>
              </div>
            </div>

            <div className="achievements-cta-row">
              <button
                type="button"
                className="achievements-pill-btn"
                onClick={onExplore}
                aria-label="Connect with me"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight size={16} className="achievements-btn-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Black Themed Hackathons & Expos Grid */}
        <div className="achievements-showcase-col">
          <div className="achieve-black-cards-grid">
            {HACKATHONS.map((item) => (
              <div 
                key={item.id} 
                className={`achieve-black-card ${item.highlight ? 'highlight-gold' : ''}`}
              >
                {/* Top Badge Bar */}
                <div className="achieve-card-header">
                  <div className={`achieve-result-badge ${item.result === 'Winner' ? 'badge-winner' : 'badge-runner'}`}>
                    <Trophy size={13} className="trophy-icon" />
                    <span>{item.result}</span>
                  </div>

                  <div className="achieve-card-meta">
                    <span className="year-pill-black">{item.year}</span>
                  </div>
                </div>

                {/* Card Title & Institution */}
                <h3 className="achieve-item-title-black">{item.title}</h3>
                
                <div className="achieve-institution-row">
                  <Building2 size={13} className="institution-icon" />
                  <span className="achieve-item-institution-black">{item.institution}</span>
                </div>

                <div className="achieve-category-tag-black">
                  <span>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Photo Collage Ribbon (Below Hackathons & Wins) */}
      <div className="achieve-collage-ribbon-container">
        <div className="achieve-collage-ribbon-track">
          <img
            src="/images/achievement_collage_ribbon.webp"
            alt="Hackathon Wins & Achievements Collage"
            className="achieve-collage-ribbon-img"
            loading="lazy"
          />
          <img
            src="/images/achievement_collage_ribbon.webp"
            alt="Hackathon Wins & Achievements Collage"
            className="achieve-collage-ribbon-img"
            loading="lazy"
          />
        </div>

        {/* Cinematic dark edge vignettes & glass reflection */}
        <div className="achieve-collage-ribbon-overlay" />
      </div>
    </section>
  );
}
