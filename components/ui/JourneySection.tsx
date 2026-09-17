'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
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
  const [stats, setStats] = useState({
    leetcode: {
      totalSolved: 527,
      rating: 1866,
      topPercentage: 5.81,
      globalRanking: 189040,
      url: 'https://leetcode.com/u/thamilarasangp/',
    },
    skillrack: {
      solved: 720,
      rank: 43029,
      url: 'https://www.skillrack.com/faces/resume.xhtml?id=484668&key=262cac8aa817e03417f620f487c0e526d5a868cf',
    },
    hackerrank: {
      badge: 'C++ 5-Star',
      stars: 5,
      url: 'https://www.hackerrank.com/profile/thamilarasan_gp1',
    },
  });

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const res = await fetch('/api/cp-stats');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setStats((prev) => ({
              ...prev,
              leetcode: { ...prev.leetcode, ...(data.leetcode || {}) },
              skillrack: { ...prev.skillrack, ...(data.skillrack || {}) },
              hackerrank: { ...prev.hackerrank, ...(data.hackerrank || {}) },
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load live CP stats:', err);
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

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
              persistence &amp; <br />
              problem-solving<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="journey-bio-desc">
              Dedicated competitive programmer with a passion for algorithms and data structures.
              Proven track record across global platforms with hundreds of solved challenges.
            </p>

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
              <a
                href={stats.leetcode.url}
                target="_blank"
                rel="noreferrer"
                className="cp-trio-card cp-white-card"
                title="View LeetCode Profile (@thamilarasangp)"
              >
                <div className="cp-card-arrow-badge" aria-label="Open profile">
                  <ArrowUpRight size={13} strokeWidth={2.4} className="cp-arrow-icon" />
                </div>
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
                  <span className="cp-platform-name">LeetCode</span>
                </div>
                <div className="cp-card-metric">{stats.leetcode.totalSolved}+</div>
                <div className="cp-card-label">Problems Solved</div>
                <div className="cp-card-divider" />
                <div className="cp-card-highlight">Top {stats.leetcode.topPercentage}%</div>
                <div className="cp-card-substat">Rating {stats.leetcode.rating.toLocaleString()}</div>
                <div className="cp-watermark">01</div>
              </a>

              {/* Card 02: SkillRack (#00468B Theme) */}
              <a
                href={stats.skillrack.url}
                target="_blank"
                rel="noreferrer"
                className="cp-trio-card cp-gradient-card"
                title="View SkillRack Verified Resume"
              >
                <div className="cp-card-arrow-badge" aria-label="Open profile">
                  <ArrowUpRight size={13} strokeWidth={2.4} className="cp-arrow-icon" />
                </div>
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
                <div className="cp-card-metric white-text">{stats.skillrack.solved}+</div>
                <div className="cp-card-label blue-label">Programs Solved</div>
                <div className="cp-card-divider blue-divider" />
                <div className="cp-card-highlight white-text">Rank {stats.skillrack.rank.toLocaleString()}</div>
                <div className="cp-watermark blue-watermark">02</div>
              </a>

              {/* Card 03: HackerRank */}
              <a
                href={stats.hackerrank.url}
                target="_blank"
                rel="noreferrer"
                className="cp-trio-card cp-white-card"
                title="View HackerRank Profile (@thamilarasan_gp1)"
              >
                <div className="cp-card-arrow-badge" aria-label="Open profile">
                  <ArrowUpRight size={13} strokeWidth={2.4} className="cp-arrow-icon" />
                </div>
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
                <div className="cp-card-metric text-small-title">{stats.hackerrank.badge}</div>
                <div className="cp-stars-row" aria-label={`${stats.hackerrank.stars} stars`}>
                  {Array.from({ length: stats.hackerrank.stars }).map((_, i) => (
                    <Star key={i} size={11} className="star-gold" />
                  ))}
                </div>
                <div className="cp-card-divider" />
                <div className="cp-card-substat">3+ Certificates</div>
                <div className="cp-watermark">03</div>
              </a>
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
