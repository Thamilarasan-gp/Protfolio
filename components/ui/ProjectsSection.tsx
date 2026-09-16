'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data/projects';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  mode?: JourneyMode;
  onExplore?: () => void;
}

export function ProjectsSection({ onSelectProject, onExplore }: ProjectsSectionProps) {
  const projectsList: Project[] = [
    {
      id: 'peakflow',
      number: '01',
      title: 'PeakFlow',
      subtitle: 'Smart Planning for Smarter Living',
      description: 'An AI-driven ecosystem automating real-time scheduling, intelligent resource planning, and seamless workflow execution.',
      tags: ['Next.js', 'TypeScript', 'AI Agent', 'Tailwind CSS'],
      gradient: 'linear-gradient(135deg, #0b1f3a 0%, #174276 50%, #2e75b6 100%)',
      link: 'https://github.com/thamil-arasan/peakflow',
      github: 'https://github.com/thamil-arasan/peakflow',
      highlights: ['Predictive workflow automation', 'Sub-second real-time sync', 'Multi-tenant architecture'],
      metrics: '4.8/5 productivity rating',
    },
    {
      id: 'nexadapt',
      number: '02',
      title: 'NexAdapt',
      subtitle: 'Health Tech Platform',
      description: 'A compliant, modern digital health platform connecting patients with certified clinicians for encrypted telemetry, consultations, and analytics.',
      tags: ['React', 'WebRTC', 'HIPAA Compliant', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #082832 0%, #0d4b56 50%, #1b8a99 100%)',
      link: 'https://github.com/thamil-arasan/nexadapt',
      github: 'https://github.com/thamil-arasan/nexadapt',
      highlights: ['Encrypted HD video consultations', 'Interactive biometric telemetry', 'Automated pharmacy routing'],
      metrics: '15,000+ virtual patient consultations',
    },
    {
      id: 'himavathi',
      number: '03',
      title: 'Himavathi',
      subtitle: 'Real Estate Solution',
      description: 'A modern spatial real estate platform offering 3D architectural walk-throughs, intelligent valuation metrics, and escrow transactions.',
      tags: ['Next.js', 'Three.js', 'Spatial 3D', 'Tailwind CSS'],
      gradient: 'linear-gradient(135deg, #1b1233 0%, #35215c 50%, #6841a8 100%)',
      link: 'https://github.com/thamil-arasan/himavathi',
      github: 'https://github.com/thamil-arasan/himavathi',
      highlights: ['Interactive 3D photorealistic tours', 'Dynamic valuation engine', 'Instant mortgage calculation'],
      metrics: '$24M+ processed property inquiries',
    },
    {
      id: 'more-projects',
      number: '04',
      title: 'More Projects',
      subtitle: 'Coming Soon...',
      description: 'An innovation lab of emerging AI tools, creative WebGL experiments, and open-source contributions crafted with precision.',
      tags: ['WebGL', 'AI Tools', 'Experimental', 'Open Source'],
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      link: 'https://github.com/thamilarasan-gp',
      github: 'https://github.com/thamilarasan-gp',
      highlights: ['Ongoing WebGL simulations', 'Custom shader algorithms', 'AI agent experiments'],
      metrics: 'Active exploration daily',
    },
  ];

  const projectImages: Record<string, string> = {
    peakflow: '/images/project_parkeasy.jpg',
    nexadapt: '/images/project_mediapp.jpg',
    himavathi: '/images/project_nimmathi.jpg',
    'more-projects': '/images/project_more.jpg',
  };

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

        {/* Right Side: 2x2 Grid of Cards */}
        <div className="projects-cards-col">
          <div className="projects-2x2-grid">
            {projectsList.map((p) => (
              <div
                key={p.id}
                className="project-story-card"
                onClick={() => onSelectProject(p)}
                role="button"
                tabIndex={0}
              >
                {/* Background Image with Ambient Gradient Scrim */}
                <div
                  className="project-card-image"
                  style={{
                    backgroundImage: `url('${projectImages[p.id] || '/images/project_parkeasy.jpg'}')`,
                  }}
                />
                <div className="project-card-scrim" />

                {/* Info and Circular Arrow */}
                <div className="project-card-bottom-bar">
                  <div className="project-meta-info">
                    <h3 className="project-headline">{p.title}</h3>
                    <p className="project-tagline">{p.subtitle}</p>
                  </div>

                  <div className="project-circle-arrow-btn">
                    <ArrowUpRight size={16} className="circle-arrow-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
