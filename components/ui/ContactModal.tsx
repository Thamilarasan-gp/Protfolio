'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
    >
      <div
        className="modal-card contact-modal-card"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="contact-modal-badge">
          <span className="modal-badge-num">05</span>
          <span className="modal-badge-label">Get in Touch</span>
        </div>

        <h2 className="contact-modal-title">
          Say Hello<span className="cyan-dot-clean">.</span>
        </h2>
        <p className="contact-modal-subtitle">
          Drop a note to discuss new projects, design systems, or collaboration opportunities.
        </p>

        {submitted ? (
          <div className="contact-submitted-state">
            <CheckCircle2 size={48} className="submitted-check-icon" />
            <h3 className="submitted-title">Message Sent!</h3>
            <p className="submitted-desc">
              Thank you for reaching out. I will get back to you promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-modal-form">
            <div className="contact-form-field">
              <label className="contact-form-label">Your Name</label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="contact-form-input"
              />
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="contact-form-input"
              />
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Let's build something extraordinary..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="contact-form-textarea"
              />
            </div>

            <button type="submit" className="contact-form-submit-btn">
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
