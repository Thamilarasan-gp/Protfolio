'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { Project } from '@/lib/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const projectImages: Record<string, string> = {
  peakflow: '/images/project_parkeasy.jpg',
  nexadapt: '/images/project_mediapp.jpg',
  himavathi: '/images/project_nimmathi.jpg',
  'more-projects': '/images/project_more.jpg',
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const imageSrc = projectImages[project.id] || '/images/project_parkeasy.jpg';

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
    >
      <div
        className="modal-card project-modal-card"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Project Visual Banner */}
        <div className="project-modal-banner">
          <div
            className="project-modal-banner-img"
            style={{ backgroundImage: `url('${imageSrc}')` }}
          />
          <div className="project-modal-banner-scrim" />
          <div className="project-modal-banner-badge">
            <span className="modal-badge-num">{project.number}</span>
            <span className="modal-badge-label">Case Study</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="project-modal-body">
          <div className="project-modal-header">
            <h2 className="project-modal-title">
              {project.title}
              <span className="cyan-dot-clean">.</span>
            </h2>
            <p className="project-modal-subtitle">{project.subtitle}</p>
          </div>

          <p className="project-modal-desc">{project.description}</p>

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal-section">
              <h4 className="project-modal-section-title">
                <Sparkles size={14} className="section-title-icon" />
                <span>Key Engineering Highlights</span>
              </h4>
              <div className="project-modal-highlights-grid">
                {project.highlights.map((h, i) => (
                  <div key={i} className="highlight-item">
                    <CheckCircle2 size={16} className="highlight-check-icon" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Metric */}
          {project.metrics && (
            <div className="project-modal-metrics-banner">
              <TrendingUp size={20} className="metrics-icon" />
              <span className="metrics-text">{project.metrics}</span>
            </div>
          )}

          {/* Tags */}
          <div className="project-modal-tags">
            {project.tags.map((t) => (
              <span key={t} className="project-modal-tag">
                {t}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="project-modal-actions">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="modal-action-btn primary"
            >
              <span>Live Experience</span>
              <ExternalLink size={16} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="modal-action-btn secondary"
            >
              <GithubIcon size={16} />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
