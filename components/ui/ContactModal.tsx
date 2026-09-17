'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      // Access key configured for Web3Forms
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        'a05db60e-ead4-49ec-a8f9-0e41179da32b';

      data.append('access_key', accessKey);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('subject', `New Portfolio Message from ${formData.name}`);
      data.append('from_name', `${formData.name} (Portfolio)`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        // Reset form and close modal
        setFormData({ name: '', email: '', message: '' });
        onClose();

        await Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for reaching out. I will get back to you promptly at your email.',
          icon: 'success',
          confirmButtonText: 'Awesome',
          confirmButtonColor: '#0284c7',
          background: '#0d1b2a',
          color: '#ffffff',
          customClass: {
            popup: 'portfolio-swal-popup',
            confirmButton: 'portfolio-swal-btn',
          },
        });
      } else {
        await Swal.fire({
          title: 'Unable to Send',
          text: result.message || 'Something went wrong. Please email directly to thamilarasangp123@gmail.com',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
          background: '#0d1b2a',
          color: '#ffffff',
          customClass: {
            popup: 'portfolio-swal-popup',
          },
        });
      }
    } catch (error) {
      console.error('Web3Forms submit error:', error);
      await Swal.fire({
        title: 'Network Error',
        text: 'Could not connect to the mail server. You can also email directly to thamilarasangp123@gmail.com',
        icon: 'error',
        confirmButtonText: 'Got it',
        confirmButtonColor: '#ef4444',
        background: '#0d1b2a',
        color: '#ffffff',
        customClass: {
          popup: 'portfolio-swal-popup',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="contact-form-submit-btn"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? (
              <>
                <span>Sending...</span>
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
