'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { audioController } from '@/lib/audio/AudioController';

interface SmoothScrollProps {
  children: React.ReactNode;
  onProgress: (progress: number, velocity: number) => void;
  lenisRefOut?: React.MutableRefObject<Lenis | null>;
}

export function SmoothScroll({ children, onProgress, lenisRefOut }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Highly responsive, ultra-silky Lenis configuration with zero input latency
    const lenis = new Lenis({
      duration: 1.05, // Snappy & silky response, zero sluggishness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // 1:1 natural response
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node: any) => {
        return (
          !!node?.closest?.('[data-lenis-prevent]') ||
          !!node?.closest?.('.modal-card') ||
          !!node?.closest?.('.modal-backdrop')
        );
      },
    });

    lenisRef.current = lenis;
    if (lenisRefOut) {
      lenisRefOut.current = lenis;
    }

    lenis.on('scroll', (e: any) => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      const velocity = e.velocity || 0;

      // High-performance event dispatch directly bypassing React reconciliation
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('cinematic-scroll', {
            detail: { progress: p, velocity },
          })
        );
      }

      onProgress(p, velocity);
      audioController.updateScrollDynamics(p, velocity);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [onProgress, lenisRefOut]);

  return <>{children}</>;
}
