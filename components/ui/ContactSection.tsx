'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './BrandIcons';

interface ContactSectionProps {
  onOpenContact: () => void;
}

export function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section className="section-wrapper contact-section-wrapper" id="section-5">
      <div className="contact-section-container">
        {/* Left Side: Timeline Node & Header */}
        <div className="contact-content-col">
          <div className="contact-timeline-rail" aria-hidden="true">
            <span className="timeline-step-num">05</span>
            <div className="timeline-node">
              <div className="timeline-node-inner" />
            </div>
          </div>

          <div className="contact-text-wrapper">
            <div className="contact-category-label">CONTACT</div>

            <h2 className="contact-main-headline">
              Let&apos;s build <br />
              something <br />
              great<span className="cyan-dot-clean">.</span>
            </h2>

            <p className="contact-bio-desc">
              Have a project in mind or just want to say hi? I&apos;d love to hear from you.
            </p>

            {/* Social Icons Row */}
            <div className="contact-social-row">
              <a
                href="https://www.linkedin.com/in/thamilarasangp/"
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://github.com/thamilarasan-gp"
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.instagram.com/imthamilx"
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
                aria-label="Instagram Profile"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:thamilarasangp123@gmail.com"
                className="contact-social-btn"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: "Say Hello" Card */}
        <div className="contact-card-col">
          <div className="contact-hello-card">
            {/* Top Mail Icon Badge */}
            <div className="hello-icon-badge">
              <Mail size={22} className="hello-mail-icon" />
            </div>

            {/* Top Right Handwritten Script Note */}
            <div className="hello-card-note">
              <span>Let&apos;s</span>
              <span>Create</span>
              <span className="note-underline">Together.</span>
            </div>

            {/* Text & Content */}
            <div className="hello-card-body">
              <h3 className="hello-card-title">Say Hello</h3>
              <p className="hello-card-desc">
                Open to opportunities, collaborations, and interesting ideas.
              </p>

              <button
                type="button"
                className="hello-send-btn"
                onClick={onOpenContact}
                aria-label="Send a message"
              >
                <span>Send a message</span>
                <ArrowRight size={16} className="send-btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Master Portfolio Bottom Footer Bar */}
      <footer className="portfolio-global-footer">
        <div className="footer-logo">
          <span>Portfolio</span>
          <span className="cyan-dot-clean">.</span>
        </div>

        <div className="footer-manifesto">
          <span>BUILD</span>
          <span className="footer-dot">•</span>
          <span>EXPLORE</span>
          <span className="footer-dot">•</span>
          <span>CREATE</span>
          <span className="footer-dot">•</span>
          <span>GROW</span>
        </div>

        <div className="footer-copyright">
          &copy; 2026 Thamilarasan GP. All rights reserved.
        </div>
      </footer>
    </section>
  );
}
