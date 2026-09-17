'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

export function HeroSection({ onExplore, onContact }: HeroSectionProps) {
  return (
    <section className="hero-fullscreen-section" id="section-0">
      {/* ========================================================
          DESKTOP HERO VIEW (Completely untouched for desktop)
         ======================================================== */}
      <div className="hero-desktop-view">
        {/* Cinematic Left Atmospheric Shadow Gradient Mask */}
        <div className="hero-atmosphere-gradient" />

        {/* Floating Hand-drawn Doodles (Matching Reference Design) */}
        <div className="hero-doodles-container" aria-hidden="true">
          {/* 1. Top Left Radiating Sparkle */}
          <svg className="doodle-item doodle-sparkle" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="48" r="3.5" fill="#00d2ff" />
            <path
              d="M35 38 L35 12"
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M26 42 L10 24"
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M44 42 L60 24"
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          {/* 2. Floating CSS3 Hand-drawn Shield */}
          <svg className="doodle-item doodle-css3" viewBox="0 0 90 100" fill="none">
            <path
              d="M18 16 L72 16 L65 74 L45 84 L25 74 Z"
              stroke="#00d2ff"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="2 0.5"
            />
            <path
              d="M34 32 H58 M34 46 H54 M34 60 H45 L50 46"
              stroke="#00d2ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* 3. Floating HTML5 Hand-drawn Shield */}
          <svg className="doodle-item doodle-html5" viewBox="0 0 90 100" fill="none">
            <path
              d="M16 14 L74 14 L67 76 L45 86 L23 76 Z"
              stroke="#00d2ff"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M32 30 H58 M32 46 H56 L54 62 L45 66 L36 62"
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* 4. Code Brackets: </> */}
          <svg className="doodle-item doodle-brackets" viewBox="0 0 100 80" fill="none">
            <path
              d="M28 22 L10 40 L28 58"
              stroke="#00d2ff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 64 L56 16"
              stroke="#00d2ff"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <path
              d="M72 22 L90 40 L72 58"
              stroke="#00d2ff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* 5. Hand-drawn JS Badge */}
          <svg className="doodle-item doodle-js-badge" viewBox="0 0 90 90" fill="none">
            <rect
              x="12"
              y="12"
              width="66"
              height="66"
              rx="14"
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform="rotate(-5 45 45)"
            />
            <text
              x="36"
              y="56"
              fill="#00d2ff"
              fontFamily="'Caveat', cursive"
              fontSize="32"
              fontWeight="bold"
              textAnchor="middle"
            >
              J&apos;s
            </text>
          </svg>

          {/* 6. Artist Palette & Brush */}
          <svg className="doodle-item doodle-palette" viewBox="0 0 110 110" fill="none">
            <path
              d="M30 65 C15 50 20 25 45 20 C70 15 95 30 90 55 C88 68 78 72 72 68 C66 64 60 70 65 80 C70 90 50 95 38 85 C32 80 25 72 30 65 Z"
              stroke="#00d2ff"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="42" cy="38" r="3.5" fill="#00d2ff" />
            <circle cx="62" cy="34" r="3.5" fill="#00d2ff" />
            <circle cx="78" cy="48" r="3.5" fill="#00d2ff" />
            <path
              d="M72 88 L96 30"
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          {/* 7. CODER 3D Bubble Graffiti */}
          <div className="doodle-item doodle-coder-bubble">
            <span>Build</span>
          </div>

          {/* 8. Mountain Summit Thought Annotation */}
          <div className="hero-summit-thought">
            <svg className="thought-curved-arrow" viewBox="0 0 100 80" fill="none">
              <path
                d="M10 65 Q 45 15, 85 20"
                stroke="#00d2ff"
                strokeWidth="2.8"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />
              <path
                d="M80 12 L92 20 L82 28"
                stroke="#00d2ff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Left Vertical Sticky "Follow me" Rail */}
        <aside className="hero-follow-sidebar" aria-label="Social Links">
          <div className="follow-label">Follow me</div>
          <div className="follow-divider" />
          <div className="follow-icons">
            <a
              href="https://github.com/thamilarasan-gp"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub Profile"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/thamilarasangp/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn Profile"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/imthamilx"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram Profile"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </aside>

        {/* Main Hero Content Area */}
        <div className="hero-main-wrapper">
          <div className="hero-content-column">
            {/* Greeting */}
            <div className="hero-greeting-text">
              Hey, I&apos;m <span className="hero-name-accent">THAMILARASAN GP </span>
            </div>

            {/* Master Headline */}
            <h1 className="hero-master-title">
              Thinking <span className="cyan-text-clean">unthinkable</span>  <br />
              <span>then</span><br/>
              Coding <span className="cyan-text-clean">unshakeable</span> <br />
              Shipping unforgettable<span className="cyan-dot-clean">.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-summary-desc">
              I turn ideas into meaningful digital experiences — <br />
              clean code, creative design, and real-world impact.
            </p>

            {/* Call to Action Row */}
            <div className="hero-cta-action-row">
              <button
                type="button"
                className="hero-pill-cta"
                onClick={onExplore}
                aria-label="Explore Portfolio"
              >
                <span>Tell me more</span>
                <ArrowRight size={18} className="cta-arrow-icon" />
              </button>

              {/* Hand-drawn Arrow & Note */}
              <div className="hero-build-note">
                <svg className="note-hand-arrow" viewBox="0 0 65 45" fill="none">
                  <path
                    d="M10 12 Q 35 10, 48 30"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M40 28 L50 32 L51 22"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="note-text">
                  <span>Let&apos;s</span>
                  <span>Build</span>
                  <span>Something</span>
                  <span className="note-underline">Amazing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <footer className="hero-bottom-bar">
          {/* Left Manifesto Ticker */}
          <div className="bottom-left-ticker">
            <span className="ticker-dash">—</span>
            <span className="ticker-text">DESIGN • DEVELOP • CREATE • REPEAT</span>
          </div>

          {/* Center / Right Scroll Indicator */}
          <div className="bottom-scroll-guide" onClick={onExplore} role="button" tabIndex={0}>
            <div className="mouse-indicator-frame">
              <div className="mouse-wheel-dot" />
            </div>
            <div className="scroll-guide-label">
              <span>Scroll</span>
              <span>to explore</span>
            </div>
            <div className="scroll-line-pulse" />
          </div>

          {/* Far Right Slogan */}
          <div className="bottom-right-slogan">
            <span>SAME PASSION,</span>
            <span>A BRIGHTER TOMORROW<span className="cyan-dot-clean">.</span></span>
          </div>
        </footer>
      </div>

      {/* ========================================================
          MOBILE HERO VIEW (Exact 1:1 Match with User Reference)
         ======================================================== */}
      <div className="hero-mobile-view">
        {/* Top Header Group: Greeting & Code Shield Badge */}
        <div className="hero-mobile-top-header">
          <div className="hero-mobile-greeting">
            <span className="hero-mobile-hey">Hey, I&apos;m</span>
            <span className="hero-mobile-name">THAMILARASAN GP</span>
          </div>

          {/* Hand-Drawn Doodle & Code Shield Badge */}
          <div className="hero-mobile-badge-group" aria-hidden="true">
            {/* Radiating Sparkle Burst */}
            <svg className="hero-mobile-sparkle" viewBox="0 0 54 44" fill="none">
              <path d="M28 26 L28 4" stroke="#00d2ff" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M20 28 L6 14" stroke="#00d2ff" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M36 28 L50 14" stroke="#00d2ff" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="28" cy="34" r="2.4" fill="#00d2ff" />
              <path d="M8 32 L16 32" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Hand-drawn Shield with </> code symbol */}
            <svg className="hero-mobile-shield" viewBox="0 0 52 60" fill="none">
              <path
                d="M6 7 L46 7 L41 46 L26 55 L11 46 Z"
                stroke="#00d2ff"
                strokeWidth="3.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M18 28 L13 32 L18 36"
                stroke="#00d2ff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 38 L28 24"
                stroke="#00d2ff"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M33 28 L38 32 L33 36"
                stroke="#00d2ff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Master Mobile Headline */}
        <h1 className="hero-mobile-title">
          Thinking <br />
          <span className="cyan-text-clean">unthinkable</span> <br />
          then <br />
          Coding <br />
          <span className="cyan-text-clean">unshakeable.</span>
        </h1>

        {/* Subtitle Description */}
        <p className="hero-mobile-desc">
          I turn ideas into meaningful <br />
          digital experiences — <br />
          clean code, creative design, <br />
          and real-world impact.
        </p>

        {/* Hand-drawn Arrow & Note: Let's Build Something Amazing */}
        <div className="hero-mobile-build-note">
          <svg className="hero-mobile-arrow" viewBox="0 0 60 40" fill="none" aria-hidden="true">
            <path
              d="M4 16 C 18 14, 38 20, 48 30"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M36 30 L48 30 L46 18"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="hero-mobile-note-text">
            <span>Let&apos;s</span>
            <span>Build</span>
            <span>Something</span>
            <span className="hero-mobile-amazing">Amazing</span>
          </div>
        </div>

        {/* Horizontal "Follow me" Bar (Like Desktop, Horizontal) */}
        <div className="hero-mobile-follow-bar" aria-label="Social Links">
          <span className="hero-mobile-follow-label">Follow me</span>
          <div className="hero-mobile-follow-divider" aria-hidden="true" />
          <div className="hero-mobile-follow-icons">
            <a
              href="https://github.com/thamilarasan-gp"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-mobile-follow-link"
              aria-label="GitHub Profile"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/thamilarasangp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-mobile-follow-link"
              aria-label="LinkedIn Profile"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/imthamilx"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-mobile-follow-link"
              aria-label="Instagram Profile"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Call to Action Pill Button */}
        <div className="hero-mobile-cta-wrapper">
          <button
            type="button"
            className="hero-mobile-cta-button"
            onClick={onExplore}
            aria-label="Tell me more"
          >
            <span>Tell me more</span>
            <ArrowRight size={18} className="hero-mobile-cta-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
