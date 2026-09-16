'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { JourneyMode } from '@/components/animation/MasterTimeline';

interface FrameSequenceCanvasProps {
  mode?: JourneyMode;
  onModeChange?: (mode: JourneyMode) => void;
  onLoadingComplete?: () => void;
}

const TOTAL_FRAMES = 360;
const INITIAL_CHUNK_SIZE = 60; // Initial Chunk 1 for instant launch
const MAX_CONCURRENT_LOADS = 6;
const LERP_FACTOR = 0.22; // Snappy, butter-smooth 60-120fps tracking

export function FrameSequenceCanvas({
  mode = 'leap',
  onModeChange,
  onLoadingComplete,
}: FrameSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Mode and boundary coordination refs
  const modeRef = useRef<JourneyMode>(mode);
  const lastScrollProgressRef = useRef<number>(0);
  const isAtBottomRef = useRef<boolean>(false);
  const isAtTopRef = useRef<boolean>(true);

  // Decoupled refs for true 60-120fps rendering without React rerenders
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnIdxRef = useRef<number>(-1);
  const lastDrawnModeRef = useRef<JourneyMode>('leap');

  // Dual frame caches
  const descentCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const descentLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const climbCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const climbLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // Queue & concurrency management
  const activeDownloadsRef = useRef<number>(0);
  const descentQueueRef = useRef<number[]>([]);
  const climbQueueRef = useRef<number[]>([]);

  // Sync external mode prop if controlled from navigation buttons
  useEffect(() => {
    if (mode !== modeRef.current) {
      modeRef.current = mode;
      const p = lastScrollProgressRef.current;
      if (mode === 'climb') {
        targetFrameRef.current = (1.0 - p) * (TOTAL_FRAMES - 1);
      } else {
        targetFrameRef.current = p * (TOTAL_FRAMES - 1);
      }
      currentFrameRef.current = targetFrameRef.current;
      lastDrawnIdxRef.current = -1;
    }
  }, [mode]);

  // Frame URL helpers
  const getDescentUrl = useCallback((index: number) => {
    const padded = index.toString().padStart(3, '0');
    return `/frames/frame_${padded}.webp`;
  }, []);

  const getClimbUrl = useCallback((index: number) => {
    const padded = index.toString().padStart(3, '0');
    return `/frames_climb/climb_frame_${padded}.webp`;
  }, []);

  // Background frame loader dispatcher
  const processQueues = useCallback(() => {
    if (activeDownloadsRef.current >= MAX_CONCURRENT_LOADS) return;

    const currentMode = modeRef.current;
    const currentTarget = Math.round(targetFrameRef.current);

    // Prioritize active mode's queue first
    const primaryQueue = currentMode === 'leap' ? descentQueueRef.current : climbQueueRef.current;
    const primaryLoaded = currentMode === 'leap' ? descentLoadedRef.current : climbLoadedRef.current;
    const primaryCache = currentMode === 'leap' ? descentCacheRef.current : climbCacheRef.current;
    const primaryUrlFn = currentMode === 'leap' ? getDescentUrl : getClimbUrl;

    const secondaryQueue = currentMode === 'leap' ? climbQueueRef.current : descentQueueRef.current;
    const secondaryLoaded = currentMode === 'leap' ? climbLoadedRef.current : descentLoadedRef.current;
    const secondaryCache = currentMode === 'leap' ? climbCacheRef.current : descentCacheRef.current;
    const secondaryUrlFn = currentMode === 'leap' ? getClimbUrl : getDescentUrl;

    // Sort active queue by distance to current frame target
    primaryQueue.sort((a, b) => Math.abs(a - currentTarget) - Math.abs(b - currentTarget));

    while (activeDownloadsRef.current < MAX_CONCURRENT_LOADS && (primaryQueue.length > 0 || secondaryQueue.length > 0)) {
      let isPrimary = primaryQueue.length > 0;
      let frameIdx = isPrimary ? primaryQueue.shift()! : secondaryQueue.shift()!;
      let loadedArr = isPrimary ? primaryLoaded : secondaryLoaded;
      let cacheArr = isPrimary ? primaryCache : secondaryCache;
      let urlFn = isPrimary ? primaryUrlFn : secondaryUrlFn;

      if (loadedArr[frameIdx]) continue;

      activeDownloadsRef.current++;
      const img = new Image();
      img.src = urlFn(frameIdx);

      img.decode()
        .then(() => {
          cacheArr[frameIdx] = img;
          loadedArr[frameIdx] = true;
          activeDownloadsRef.current--;
          processQueues();
        })
        .catch(() => {
          img.onload = () => {
            cacheArr[frameIdx] = img;
            loadedArr[frameIdx] = true;
            activeDownloadsRef.current--;
            processQueues();
          };
          img.onerror = () => {
            activeDownloadsRef.current--;
            processQueues();
          };
        });
    }
  }, [getDescentUrl, getClimbUrl]);

  // Listen directly to decoupled scroll event with bidirectional state transitions
  useEffect(() => {
    const handleCinematicScroll = (e: any) => {
      const p = e.detail?.progress ?? 0;
      const velocity = e.detail?.velocity ?? 0;
      const clampedP = Math.max(0, Math.min(1, p));
      lastScrollProgressRef.current = clampedP;

      const currentMode = modeRef.current;

      // 1. DESCENT MODE LOGIC
      if (currentMode === 'leap') {
        targetFrameRef.current = clampedP * (TOTAL_FRAMES - 1);

        // Preload climb sequence when user passes 60% of descent
        if (clampedP > 0.6 && climbQueueRef.current.length === 0) {
          for (let i = 0; i < TOTAL_FRAMES; i++) {
            if (!climbLoadedRef.current[i]) climbQueueRef.current.push(i);
          }
          processQueues();
        }

        // Mark reached bottom
        if (clampedP >= 0.995) {
          isAtBottomRef.current = true;
        }

        // Trigger transition to CLIMB: user hit bottom and initiates upward scroll
        if (isAtBottomRef.current && (velocity < -0.05 || clampedP < 0.985)) {
          modeRef.current = 'climb';
          isAtBottomRef.current = false;
          // In climb mode at bottom (p=1), climb target frame is 0 (preparation on rocks)
          targetFrameRef.current = (1.0 - clampedP) * (TOTAL_FRAMES - 1);
          currentFrameRef.current = targetFrameRef.current;
          lastDrawnIdxRef.current = -1;
          if (onModeChange) onModeChange('climb');
        }
      }
      // 2. ASCENT (CLIMB) MODE LOGIC
      else {
        targetFrameRef.current = (1.0 - clampedP) * (TOTAL_FRAMES - 1);

        // Preload descent sequence when user passes 60% of climb (p < 0.4)
        if (clampedP < 0.4 && descentQueueRef.current.length === 0) {
          for (let i = 0; i < TOTAL_FRAMES; i++) {
            if (!descentLoadedRef.current[i]) descentQueueRef.current.push(i);
          }
          processQueues();
        }

        // Mark reached top
        if (clampedP <= 0.005) {
          isAtTopRef.current = true;
        }

        // Trigger transition to DESCENT: user hit top and initiates downward scroll
        if (isAtTopRef.current && (velocity > 0.05 || clampedP > 0.015)) {
          modeRef.current = 'leap';
          isAtTopRef.current = false;
          // In descent mode at top (p=0), descent target frame is 0 (cliff summit)
          targetFrameRef.current = clampedP * (TOTAL_FRAMES - 1);
          currentFrameRef.current = targetFrameRef.current;
          lastDrawnIdxRef.current = -1;
          if (onModeChange) onModeChange('leap');
        }
      }
    };

    window.addEventListener('cinematic-scroll', handleCinematicScroll, { passive: true });
    return () => window.removeEventListener('cinematic-scroll', handleCinematicScroll);
  }, [onModeChange, processQueues]);

  // Initial Chunk 1 Loading (Frames 0 - 59 of Descent + Boundary Frames)
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const initialTargets = Array.from({ length: INITIAL_CHUNK_SIZE }, (_, i) => i);

    const loadSingleDescent = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getDescentUrl(idx);
        img.decode()
          .then(() => {
            if (!isCancelled) {
              descentCacheRef.current[idx] = img;
              descentLoadedRef.current[idx] = true;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / INITIAL_CHUNK_SIZE) * 100));
            }
            resolve();
          })
          .catch(() => {
            img.onload = () => {
              if (!isCancelled) {
                descentCacheRef.current[idx] = img;
                descentLoadedRef.current[idx] = true;
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / INITIAL_CHUNK_SIZE) * 100));
              }
              resolve();
            };
            img.onerror = () => resolve();
          });
      });
    };

    // Preload critical boundary frames for climb (0 and 359)
    const loadClimbBoundaryFrame = (idx: number) => {
      const img = new Image();
      img.src = getClimbUrl(idx);
      img.decode()
        .then(() => {
          climbCacheRef.current[idx] = img;
          climbLoadedRef.current[idx] = true;
        })
        .catch(() => {
          img.onload = () => {
            climbCacheRef.current[idx] = img;
            climbLoadedRef.current[idx] = true;
          };
        });
    };

    const loadInitialChunk = async () => {
      // Immediately load frame 0 and boundary frames
      loadClimbBoundaryFrame(0);
      loadClimbBoundaryFrame(TOTAL_FRAMES - 1);
      await loadSingleDescent(0);

      const batchSize = 6;
      for (let i = 1; i < INITIAL_CHUNK_SIZE; i += batchSize) {
        if (isCancelled) break;
        const batch = initialTargets.slice(i, i + batchSize).map((idx) => loadSingleDescent(idx));
        await Promise.all(batch);
      }

      if (!isCancelled) {
        setIsReady(true);
        if (onLoadingComplete) onLoadingComplete();

        // Queue remaining descent frames (60 to 359) for background preloading
        for (let i = INITIAL_CHUNK_SIZE; i < TOTAL_FRAMES; i++) {
          descentQueueRef.current.push(i);
        }
        // Also queue initial climb chunk for fast pre-fetching
        for (let i = 0; i < INITIAL_CHUNK_SIZE; i++) {
          climbQueueRef.current.push(i);
        }
        processQueues();
      }
    };

    loadInitialChunk();

    return () => {
      isCancelled = true;
    };
  }, [getDescentUrl, getClimbUrl, onLoadingComplete, processQueues]);

  // Periodic check to keep queue processing active
  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      if (descentQueueRef.current.length > 0 || climbQueueRef.current.length > 0) {
        processQueues();
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isReady, processQueues]);

  // High-performance Canvas Rendering Loop with Dynamic Bidirectional Camera Framing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const currentMode = modeRef.current;
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Smooth interpolation towards target frame
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * LERP_FACTOR;
      } else {
        currentFrameRef.current = target;
      }

      const desiredIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));

      // Select active cache according to journey mode
      const activeCache = currentMode === 'leap' ? descentCacheRef.current : climbCacheRef.current;

      // Rapid Scroll Fallback: find nearest cached frame in active cache
      let frameToDraw: HTMLImageElement | null = activeCache[desiredIdx];
      let resolvedIdx = desiredIdx;

      if (!frameToDraw) {
        for (let dist = 1; dist < TOTAL_FRAMES; dist++) {
          const prev = desiredIdx - dist;
          const next = desiredIdx + dist;
          if (prev >= 0 && activeCache[prev]) {
            frameToDraw = activeCache[prev];
            resolvedIdx = prev;
            break;
          }
          if (next < TOTAL_FRAMES && activeCache[next]) {
            frameToDraw = activeCache[next];
            resolvedIdx = next;
            break;
          }
        }
        if (!frameToDraw && lastDrawnIdxRef.current >= 0 && activeCache[lastDrawnIdxRef.current]) {
          frameToDraw = activeCache[lastDrawnIdxRef.current];
          resolvedIdx = lastDrawnIdxRef.current;
        }
      }

      // Draw frame if frame changed, mode changed, or actively moving
      if (
        frameToDraw &&
        (resolvedIdx !== lastDrawnIdxRef.current ||
          currentMode !== lastDrawnModeRef.current ||
          Math.abs(diff) > 0.01)
      ) {
        lastDrawnIdxRef.current = resolvedIdx;
        lastDrawnModeRef.current = currentMode;

        // Dynamic 2D camera angle & zoom framing based on journey mode
        const normalizedP = resolvedIdx / (TOTAL_FRAMES - 1);
        let camScale = 1.0;
        let camShiftY = 0;

        if (currentMode === 'leap') {
          // DESCENT CAMERA DYNAMICS
          if (normalizedP < 0.17) {
            camScale = 1.0 + (normalizedP / 0.17) * 0.015;
          } else if (normalizedP < 0.34) {
            const t = (normalizedP - 0.17) / 0.17;
            camScale = 1.015 + t * 0.03;
            camShiftY = t * 20;
          } else if (normalizedP < 0.51) {
            const t = (normalizedP - 0.34) / 0.17;
            camScale = 1.045 - t * 0.015;
            camShiftY = 20 - t * 10;
          } else if (normalizedP < 0.68) {
            const t = (normalizedP - 0.51) / 0.17;
            camScale = 1.03 + t * 0.04;
            camShiftY = 10 - t * 15;
          } else if (normalizedP < 0.84) {
            const t = (normalizedP - 0.68) / 0.16;
            camScale = 1.07 - t * 0.04;
            camShiftY = -5 + t * 10;
          } else {
            camScale = 1.02;
            camShiftY = 0;
          }
        } else {
          // ASCENT (CLIMB) CAMERA DYNAMICS
          if (normalizedP < 0.17) {
            camScale = 1.0;
            camShiftY = 0;
          } else if (normalizedP < 0.34) {
            const t = (normalizedP - 0.17) / 0.17;
            camScale = 1.015 + t * 0.025;
            camShiftY = -t * 15;
          } else if (normalizedP < 0.51) {
            const t = (normalizedP - 0.34) / 0.17;
            camScale = 1.04;
            camShiftY = -15 + t * 10;
          } else if (normalizedP < 0.68) {
            const t = (normalizedP - 0.51) / 0.17;
            camScale = 1.03 + t * 0.03;
            camShiftY = -5 + t * 10;
          } else if (normalizedP < 0.84) {
            const t = (normalizedP - 0.68) / 0.16;
            camScale = 1.06 - t * 0.04;
            camShiftY = 5 - t * 5;
          } else {
            camScale = 1.01;
            camShiftY = 0;
          }
        }

        const canvasW = canvas.width;
        const canvasH = canvas.height;
        const imgW = frameToDraw.width || 1280;
        const imgH = frameToDraw.height || 720;

        const hRatio = canvasW / imgW;
        const vRatio = canvasH / imgH;
        const baseRatio = Math.max(hRatio, vRatio);

        const drawW = imgW * baseRatio * camScale;
        const drawH = imgH * baseRatio * camScale;
        const shiftX = (canvasW - drawW) / 2;
        const shiftY = (canvasH - drawH) / 2 + camShiftY;

        ctx.drawImage(frameToDraw, 0, 0, imgW, imgH, shiftX, shiftY, drawW, drawH);
      }

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastDrawnIdxRef.current = -1; // Force immediate repaint on resize
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Ultra-Clean Cinematic Initial Loader */}
      {!isReady && (
        <div className="frame-loader-overlay">
          <div className="frame-loader-content">
            <div className="frame-loader-brand">THAMIL ARASAN</div>
            <div className="frame-loader-title">INITIALIZING JOURNEY EXPERIENCE</div>
            <div className="frame-loader-bar-bg">
              <div
                className="frame-loader-bar-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="frame-loader-status">
              <span>{loadProgress}%</span>
              <span> LOADING ...</span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Fullscreen Hardware-Accelerated Cinematic Canvas */}
      <div className="cinematic-canvas-container">
        <canvas
          ref={canvasRef}
          className="cinematic-frame-canvas"
          style={{
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        />
        {/* Unified Common Global Cinematic Overlay */}
        <div className="global-frame-overlay" aria-hidden="true" />
      </div>
    </>
  );
}
