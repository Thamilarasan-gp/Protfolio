'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { JourneyMode } from '@/components/animation/MasterTimeline';
import { audioController } from '@/lib/audio/AudioController';

interface NavigationProps {
  activeSection: number;
  mode: JourneyMode;
  onSelectSection: (index: number) => void;
  onToggleMode: () => void;
}

export function Navigation({
  activeSection,
  mode,
  onSelectSection,
  onToggleMode,
}: NavigationProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const active = audioController.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { name: 'Home', index: 0 },
    { name: 'Projects', index: 3 },
    { name: 'About', index: 1 },
    { name: 'Contact', index: 6 },
  ];

  return (
    <header className="hero-nav-header">
      {/* Brand Logo: Portfolio. with Cyan Dot matching exact reference */}
      <div className="hero-nav-logo" onClick={() => onSelectSection(0)}>
        <span className="logo-text">Portfolio</span>
        <span className="logo-dot">.</span>
      </div>

      {/* Nav Menu */}
      <nav className="hero-nav-menu">
        <ul className="hero-nav-list">
          {navLinks.map((link) => {
            const isActive =
              (link.index === 0 && activeSection === 0) ||
              (link.index === 1 && activeSection === 1) ||
              (link.index === 3 && (activeSection === 2 || activeSection === 3 || activeSection === 4 || activeSection === 5)) ||
              (link.index === 6 && activeSection === 6);

            return (
              <li key={link.name} className={`hero-nav-item ${isActive ? 'active' : ''}`}>
                <button type="button" onClick={() => onSelectSection(link.index)}>
                  {link.name}
                  {isActive && <span className="active-pill-indicator" />}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Subtle Ambient Audio Control */}
        <div className="hero-nav-actions">

          <button
            className="hero-subtle-btn"
            onClick={handleAudioToggle}
            title={isAudioActive ? 'Mute Atmosphere' : 'Enable Alpine Atmosphere'}
          >
            {isAudioActive ? (
              <>
                <Volume2 size={14} color="#00d2ff" />
                <span>Audio</span>
              </>
            ) : (
              <>
                <VolumeX size={14} color="#94a3b8" />
                <span>Muted</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
