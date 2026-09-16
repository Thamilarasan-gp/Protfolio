'use client';

import React from 'react';
import Image from 'next/image';
import {
  Users2,
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Flame,
  Star
} from 'lucide-react';
import { LeetCodeIcon, SkillRackIcon, HackerRankIcon } from './BrandIcons';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface JourneySectionProps {
  mode?: JourneyMode;
  onExplore?: () => void;
}

export function JourneySection({ onExplore }: JourneySectionProps) {
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
              leadership & <br />
              mastery<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="journey-bio-desc">
              From solving 1,200+ algorithmic challenges to serving as GDG App Development Lead, mentoring developers, and orchestrating premier collegiate tech hackathons.
            </p>

            {/* Quick Journey Metric Highlights */}
            <div className="journey-metrics-summary">
              <div className="journey-metric-chip">
                <Flame size={14} className="metric-chip-icon flame" />
                <span>1,200+ DSA Solved</span>
              </div>
              <div className="journey-metric-chip">
                <Users2 size={14} className="metric-chip-icon cyan" />
                <span>GDG App Lead</span>
              </div>
              <div className="journey-metric-chip">
                <Sparkles size={14} className="metric-chip-icon gold" />
                <span>4 Tech Hackathons</span>
              </div>
            </div>

            <div className="journey-cta-row">
              <button
                type="button"
                className="journey-pill-btn"
                onClick={onExplore}
                aria-label="View achievements"
              >
                <span>Explore Awards</span>
                <ArrowRight size={16} className="journey-btn-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: 3 Core Journey Milestones */}
        <div className="journey-cards-col">
          <div className="journey-milestones-stack">
            {/* 3 Visual Platform Cards (LeetCode, SkillRack, HackerRank) */}
            <div className="cp-trio-grid">
              {/* Card 01: LeetCode */}
              <div className="cp-trio-card cp-white-card">
                <div className="cp-badge-floating leetcode-badge" title="LeetCode">
                  <img
                    src="/images/LeetCode_logo_rvs.png"
                    alt="LeetCode Logo"
                    width={28}
                    height={28}
                    className="cp-badge-img"
                  />
                </div>
                <div className="cp-platform-brand-row">
                  <img
                    src="/images/LeetCode_logo_rvs.png"
                    alt="LeetCode"
                    width={20}
                    height={20}
                    className="cp-inline-logo"
                  />
                  <span className="cp-platform-name">LeetCode</span>
                </div>
                <div className="cp-card-metric">500+</div>
                <div className="cp-card-label">Problems Solved</div>
                <div className="cp-card-divider" />
                <div className="cp-card-highlight">Top 5.39%</div>
                <div className="cp-card-substat">Rating 1,866</div>
                <div className="cp-watermark">01</div>
              </div>

              {/* Card 02: SkillRack (#00468B Theme) */}
              <div className="cp-trio-card cp-gradient-card">
                <div className="cp-badge-floating skillrack-badge" title="SkillRack">
                  <Image
                    src="/images/skillrack_icon.png"
                    alt="SkillRack Logo"
                    width={26}
                    height={26}
                    className="cp-badge-img"
                  />
                </div>
                <div className="cp-platform-name white-text">SkillRack</div>
                <div className="cp-card-metric white-text">700+</div>
                <div className="cp-card-label blue-label">Problems Solved</div>
                <div className="cp-card-divider blue-divider" />
                <div className="cp-card-highlight white-text">Rank 40,012</div>
                <div className="cp-watermark blue-watermark">02</div>
              </div>

              {/* Card 03: HackerRank */}
              <div className="cp-trio-card cp-white-card">
                <div className="cp-badge-floating hackerrank-badge" title="HackerRank">
                  <HackerRankIcon size={24} />
                </div>
                <div className="cp-platform-name">
                  <Image
                    src="/images/hackerrank_logo.png"
                    alt="HackerRank Logo"
                    width={105}
                    height={14}
                    className="cp-platform-brand-img"
                  />
                </div>
                <div className="cp-card-metric text-small-title">C++ 5-Star</div>
                <div className="cp-stars-row" aria-label="5 stars">
                  <Star size={11} className="star-gold" />
                  <Star size={11} className="star-gold" />
                  <Star size={11} className="star-gold" />
                  <Star size={11} className="star-gold" />
                  <Star size={11} className="star-gold" />
                </div>
                <div className="cp-card-divider" />
                <div className="cp-card-substat">3+ Certificates</div>
                <div className="cp-watermark">03</div>
              </div>
            </div>
            {/* Milestone 2: GDG Leadership & Mentorship */}
            <div className="journey-milestone-card">
              <div className="milestone-icon-circle gdg-circle">
                <Users2 size={20} className="milestone-icon" />
              </div>

              <div className="milestone-info">
                <div className="milestone-header-row">
                  <h3 className="milestone-title">GDG App Development Lead</h3>
                  <div className="milestone-badge badge-muted">Core Lead</div>
                </div>

                <p className="milestone-subtitle">
                  Google Developer Groups on Campus — Mentoring 200+ student developers, guiding mobile architecture, and building community-driven projects.
                </p>
              </div>
            </div>

            {/* Milestone 3: Event Organization */}
            <div className="journey-milestone-card">
              <div className="milestone-icon-circle">
                <Calendar size={20} className="milestone-icon" />
              </div>

              <div className="milestone-info">
                <div className="milestone-header-row">
                  <h3 className="milestone-title">Tech Event Organization</h3>
                  <div className="milestone-badge badge-muted">Lead Organizer</div>
                </div>

                <p className="milestone-subtitle">
                  Coordinated, judged, and facilitated multi-track technical events ensuring smooth execution:
                </p>

                {/* Event Tags */}
                <div className="journey-events-row">
                  <span className="journey-event-pill">
                    <CheckCircle2 size={12} /> Thiran
                  </span>
                  <span className="journey-event-pill">
                    <CheckCircle2 size={12} /> CloudVerse
                  </span>
                  <span className="journey-event-pill">
                    <CheckCircle2 size={12} /> Cloudathon
                  </span>
                  <span className="journey-event-pill">
                    <CheckCircle2 size={12} /> Code Survival
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
