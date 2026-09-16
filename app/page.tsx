'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import { JourneyMode, getSectionIndexByProgress } from '@/components/animation/MasterTimeline';
import { SmoothScroll } from '@/components/scroll/SmoothScroll';
import { Navigation } from '@/components/ui/Navigation';
import { HeroSection } from '@/components/ui/HeroSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { SkillsSection } from '@/components/ui/SkillsSection';
import { ProjectsSection } from '@/components/ui/ProjectsSection';
import { JourneySection } from '@/components/ui/JourneySection';
import { AchievementsSection } from '@/components/ui/AchievementsSection';
import { ContactSection } from '@/components/ui/ContactSection';
import { CinematicOverlay } from '@/components/ui/CinematicOverlay';
import { Scrubber } from '@/components/ui/Scrubber';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { ContactModal } from '@/components/ui/ContactModal';
import { Project } from '@/lib/data/projects';
import { FrameSequenceCanvas } from '@/components/experience/FrameSequenceCanvas';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [mode, setMode] = useState<JourneyMode>('leap');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const activeSectionRef = useRef<number>(0);
  const modeRef = useRef<JourneyMode>(mode);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Keep modeRef synchronized with state
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Pause Lenis smooth scrolling when any modal is open so modal scrolls natively and smoothly
  useEffect(() => {
    if (selectedProject || isContactOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedProject, isContactOpen]);

  // Directly update top progress bar with zero React rerenders
  useEffect(() => {
    const handleScroll = (e: any) => {
      const p = e.detail?.progress ?? 0;
      if (progressBarRef.current) {
        // In climb mode, top progress bar tracks climb completion (1.0 - p)
        const displayProgress = modeRef.current === 'climb' ? (1.0 - p) : p;
        progressBarRef.current.style.width = `${(displayProgress * 100).toFixed(2)}%`;
      }
    };
    window.addEventListener('cinematic-scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('cinematic-scroll', handleScroll);
  }, []);

  // Section threshold changes only - NO micro-scroll rerenders!
  const handleProgress = useCallback((p: number, velocity: number) => {
    const sec = getSectionIndexByProgress(p, modeRef.current);
    if (sec !== activeSectionRef.current) {
      activeSectionRef.current = sec;
      setActiveSection(sec);
    }
  }, []);

  const scrollToSection = useCallback((index: number) => {
    // In climb mode, section index 0 (Ground) is at bottom (#section-6), index 6 (Summit) is at top (#section-0)
    const targetDomIndex = modeRef.current === 'climb' ? (6 - index) : index;
    const sectionElem = document.getElementById(`section-${targetDomIndex}`);
    if (sectionElem && lenisRef.current) {
      lenisRef.current.scrollTo(sectionElem, {
        offset: -15,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'leap' ? 'climb' : 'leap'));
  }, []);

  return (
    <SmoothScroll onProgress={handleProgress} lenisRefOut={lenisRef}>
      <main style={{ minHeight: '100%', position: 'relative' }}>
        {/* Dynamic Ultra-Sleek Top Journey Progress Bar */}
        <div id="top-progress-bar" ref={progressBarRef} className="top-progress-bar" style={{ width: '0%' }} />

        {/* 100% Visual Fidelity Cinematic Background: Decoupled 360-Frame Sequence Engine */}
        <FrameSequenceCanvas
          mode={mode}
          onModeChange={(newMode) => {
            setMode(newMode);
            modeRef.current = newMode;
          }}
        />

        {/* Global Minimalist Header Navigation */}
        <Navigation
          activeSection={activeSection}
          mode={mode}
          onSelectSection={scrollToSection}
          onToggleMode={toggleMode}
        />

        {/* Dynamic Chalk & Brush Slogans (Commented out per user request) */}
        {/* <CinematicOverlay activeSection={activeSection} mode={mode} /> */}

        {/* Milestone Scrubber (Vertical Indicator Dots for the 7 Sections) */}
        <Scrubber
          activeSection={activeSection}
          onSelectSection={scrollToSection}
          mode={mode}
        />

        {/* HTML/CSS Portfolio Content Viewport Above the Cinematic Background */}
        <div className="scroll-viewport">
          <HeroSection
            onExplore={() => scrollToSection(1)}
            onContact={() => setIsContactOpen(true)}
          />

          <AboutSection
            mode={mode}
            onExplore={() => scrollToSection(2)}
            onContact={() => setIsContactOpen(true)}
          />

          <SkillsSection
            mode={mode}
            onExplore={() => scrollToSection(4)}
          />

          <ProjectsSection
            mode={mode}
            onSelectProject={setSelectedProject}
            onExplore={() => scrollToSection(3)}
          />

          <JourneySection
            mode={mode}
            onExplore={() => scrollToSection(5)}
          />

          <AchievementsSection
            mode={mode}
            onExplore={() => scrollToSection(6)}
          />

          <ContactSection onOpenContact={() => setIsContactOpen(true)} />
        </div>

        {/* Interactive Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
