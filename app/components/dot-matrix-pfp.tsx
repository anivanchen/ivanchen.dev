import { useState, useEffect, useRef, useCallback } from "react";

export type ViewMode = "photo" | "matrix";

interface DotMatrixPfpProps {
  src?: string;
  depthSrc?: string;
  alt?: string;
  className?: string;
  initialMode?: ViewMode;
}

interface SampledDot {
  baseX: number;
  baseY: number;
  depth: number;
  baseRadius: number; // Precomputed radius to eliminate Math.pow() in animation loop
}

// 384x384 canvas with 80x80 grid (~5,500 active dots preserving full background scene)
const RESOLUTION = 384;
const GRID_COLS = 96;
const MAX_DEPTH_CUTOFF = 0.475; // 55.88% limit: cleanly isolates subject without hollowing face

export function DotMatrixPfp({
  src = "/pfp.webp",
  depthSrc = "/pfp-depth.webp",
  alt = "Ivan Chen",
  className = "",
  initialMode = "photo",
}: DotMatrixPfpProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sliderTrackRef = useRef<HTMLDivElement | null>(null);
  const sliderFillRef = useRef<HTMLDivElement | null>(null);
  const sliderThumbRef = useRef<HTMLDivElement | null>(null);

  // Normalized physical slider position in [0, 1]
  const sliderPosRef = useRef(0.0);
  // Range gate depth cutoff (linear 0.0 to MAX_DEPTH_CUTOFF)
  // Kept strictly in a ref for zero-latency scroll/drag without React re-render stalls
  const depthCutoffRef = useRef(0.0);

  const colorImgRef = useRef<HTMLImageElement | null>(null);
  const depthImgRef = useRef<HTMLImageElement | null>(null);
  const [isColorLoaded, setIsColorLoaded] = useState(false);
  const [isDepthLoaded, setIsDepthLoaded] = useState(false);

  // Cached pre-sampled dots (zero Math.pow during animation loop)
  const cachedDotsRef = useRef<SampledDot[] | null>(null);

  // 3D Parallax tilt state (smooth camera perspective, NO local warping)
  const tiltRef = useRef<{
    currentX: number;
    currentY: number;
    targetX: number;
    targetY: number;
  }>({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
  });
  const animFrameIdRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const autoSwitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasManuallyToggledRef = useRef(false);

  // Auto-switch to matrix mode after 5s on initial load (if user hasn't manually toggled)
  useEffect(() => {
    if (initialMode === "photo") {
      autoSwitchTimeoutRef.current = setTimeout(() => {
        if (!hasManuallyToggledRef.current) {
          setViewMode("matrix");
        }
      }, 5000);
    }
    return () => {
      if (autoSwitchTimeoutRef.current) {
        clearTimeout(autoSwitchTimeoutRef.current);
      }
    };
  }, [initialMode]);

  // Continuously track cursor position across the window so transitioning to matrix
  // mode immediately seeds the correct 3D perspective before the user moves their mouse
  useEffect(() => {
    const handleGlobalPointer = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX !== undefined && clientY !== undefined) {
        lastMousePosRef.current = { clientX, clientY };
      }
    };

    window.addEventListener("mousemove", handleGlobalPointer, { passive: true });
    window.addEventListener("touchstart", handleGlobalPointer, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleGlobalPointer);
      window.removeEventListener("touchstart", handleGlobalPointer);
    };
  }, []);

  // Load color photo and depth map in parallel
  useEffect(() => {
    let active = true;

    const colorImg = new Image();
    colorImg.crossOrigin = "anonymous";
    colorImg.onload = () => {
      if (!active) return;
      colorImgRef.current = colorImg;
      setIsColorLoaded(true);
    };
    colorImg.src = src;
    if (colorImg.complete && colorImg.naturalWidth !== 0) {
      colorImgRef.current = colorImg;
      setIsColorLoaded(true);
    }

    const depthImg = new Image();
    depthImg.crossOrigin = "anonymous";
    depthImg.onload = () => {
      if (!active) return;
      depthImgRef.current = depthImg;
      setIsDepthLoaded(true);
    };
    depthImg.onerror = () => {
      if (depthSrc.endsWith(".webp")) {
        depthImg.src = depthSrc.replace(".webp", ".jpg");
      }
    };
    depthImg.src = depthSrc;
    if (depthImg.complete && depthImg.naturalWidth !== 0) {
      depthImgRef.current = depthImg;
      setIsDepthLoaded(true);
    }

    return () => {
      active = false;
    };
  }, [src, depthSrc]);

  // Pre-sample color and depth map into memory grid with pre-calculated radii
  const sampleGrid = useCallback(() => {
    const colorImg = colorImgRef.current;
    if (!colorImg) return null;

    const depthImg = depthImgRef.current;
    const size = RESOLUTION;
    const step = size / GRID_COLS;
    const maxRadius = (step / 2) * 1.0;

    // Offscreen buffer for color
    const offscreenColor = document.createElement("canvas");
    offscreenColor.width = size;
    offscreenColor.height = size;
    const colorCtx = offscreenColor.getContext("2d", { willReadFrequently: true });
    if (!colorCtx) return null;
    colorCtx.drawImage(colorImg, 0, 0, size, size);
    const colorData = colorCtx.getImageData(0, 0, size, size).data;

    // Offscreen buffer for depth map
    let depthData: Uint8ClampedArray | null = null;
    if (depthImg && depthImg.complete && depthImg.naturalWidth !== 0) {
      const offscreenDepth = document.createElement("canvas");
      offscreenDepth.width = size;
      offscreenDepth.height = size;
      const depthCtx = offscreenDepth.getContext("2d", { willReadFrequently: true });
      if (depthCtx) {
        depthCtx.drawImage(depthImg, 0, 0, size, size);
        depthData = depthCtx.getImageData(0, 0, size, size).data;
      }
    }

    const dots: SampledDot[] = [];
    const gridLookup = new Int32Array(GRID_COLS * GRID_COLS).fill(-1);

    for (let row = 0; row < GRID_COLS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const cx = (col + 0.5) * step;
        const cy = (row + 0.5) * step;

        const px = Math.min(size - 1, Math.max(0, Math.floor(cx)));
        const py = Math.min(size - 1, Math.max(0, Math.floor(cy)));
        const idx = (py * size + px) * 4;

        const r = colorData[idx];
        const g = colorData[idx + 1];
        const b = colorData[idx + 2];
        const a = colorData[idx + 3] / 255;
        if (a === 0) continue;

        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const depth = depthData ? depthData[idx] / 255 : lum;

        // Base halftone radius from tone curve
        const darkness = 1 - lum;
        const toneRadius = maxRadius * Math.pow(darkness, 0.85);

        // Visual Hierarchy & Subject Isolation:
        // Background dots are 20% smaller (0.80 scale), harmonized directly with the
        // distance cutoff slider min (0.0) and max (MAX_DEPTH_CUTOFF).
        // depth <= 0.0 -> 0.80 scale (background)
        // depth >= MAX_DEPTH_CUTOFF -> 1.00 scale (subject)
        const t = Math.min(1, Math.max(0, depth / MAX_DEPTH_CUTOFF));
        const subjectWeight = t * t * (3 - 2 * t); // Smooth Hermite transition
        const depthScale = 0.80 + 0.20 * subjectWeight;

        const baseRadius = toneRadius * depthScale;

        // Include all dots with perceptible tone so full background scene is preserved
        if (baseRadius >= 0.14) {
          dots.push({
            baseX: cx,
            baseY: cy,
            depth,
            baseRadius,
          });
        }
      }
    }

    cachedDotsRef.current = dots;
    return dots;
  }, []);

  // High-performance canvas renderer (< 0.4ms per frame, single batched path)
  const renderMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode !== "matrix") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = cachedDotsRef.current || sampleGrid();
    if (!dots) return;

    // Retina High-DPI scaling
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 2, 3) : 2;
    const physicalSize = RESOLUTION * dpr;

    if (canvas.width !== physicalSize || canvas.height !== physicalSize) {
      canvas.width = physicalSize;
      canvas.height = physicalSize;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clean background matching portfolio surface
    ctx.fillStyle = "#F4F4F4";
    ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

    // 3D Parallax perspective
    const tilt = tiltRef.current;
    const parallaxStrength = 15;
    const depthCutoff = depthCutoffRef.current;
    const hasCutoff = depthCutoff > 0.005;

    // Single fast batched path
    ctx.beginPath();
    const len = dots.length;
    for (let i = 0; i < len; i++) {
      const dot = dots[i];
      const depth = dot.depth;

      let r = dot.baseRadius;

      // Range Gating: cull points behind the cutoff only when a cutoff is active
      if (hasCutoff) {
        if (depth < depthCutoff) continue;
        // Soft dissolution edge for smooth slicing transition
        if (depth < depthCutoff + 0.04) {
          r *= (depth - depthCutoff) / 0.04;
        }
        if (r < 0.14) continue;
      }

      // 3D parallax displacement
      const dz = depth - 0.45;
      const cx = dot.baseX + tilt.currentX * dz * parallaxStrength;
      const cy = dot.baseY + tilt.currentY * dz * parallaxStrength;

      ctx.moveTo(cx + r, cy);
      ctx.arc(cx, cy, r, 0, 6.2831853);
    }
    ctx.fillStyle = "#2E3435";
    ctx.fill();
  }, [viewMode, sampleGrid]);

  // Damped spring animation loop for 3D mouse parallax (sleeps at rest)
  const startAnimLoop = useCallback(() => {
    if (animFrameIdRef.current !== null) return;

    const loop = () => {
      const tilt = tiltRef.current;

      // Snappy and smooth damped spring response (no sluggish trailing)
      const diffX = tilt.targetX - tilt.currentX;
      const diffY = tilt.targetY - tilt.currentY;

      tilt.currentX += diffX * 0.32;
      tilt.currentY += diffY * 0.32;

      renderMatrix();

      const isTilting =
        Math.abs(diffX) > 0.001 ||
        Math.abs(diffY) > 0.001;

      if (isTilting) {
        animFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        tilt.currentX = tilt.targetX;
        tilt.currentY = tilt.targetY;
        animFrameIdRef.current = null;
        renderMatrix(); // Final resting render
      }
    };
    animFrameIdRef.current = requestAnimationFrame(loop);
  }, [renderMatrix]);

  // Pre-sample dots as soon as images load so Matrix mode activates with 0ms hitch
  useEffect(() => {
    if (isColorLoaded) {
      sampleGrid();
      if (viewMode === "matrix") {
        renderMatrix();
      }
    }
  }, [viewMode, isColorLoaded, isDepthLoaded, sampleGrid, renderMatrix]);

  const handleToggleMode = (e?: React.MouseEvent) => {
    hasManuallyToggledRef.current = true;
    if (autoSwitchTimeoutRef.current) {
      clearTimeout(autoSwitchTimeoutRef.current);
    }
    if (e && e.clientX !== undefined && e.clientY !== undefined) {
      lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
    }
    setViewMode((prev) => (prev === "photo" ? "matrix" : "photo"));
  };

  // ==========================================
  // Viewport Mouse Parallax (ZERO DOM Reflow)
  // ==========================================
  useEffect(() => {
    if (viewMode !== "matrix") return;

    // Cache rect and viewport center once; update ONLY on window resize or scroll
    let cachedCenterX = 0;
    let cachedCenterY = 0;
    let cachedMaxDistX = 1;
    let cachedMaxDistY = 1;

    const updateGeometry = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        cachedCenterX = rect.left + rect.width / 2;
        cachedCenterY = rect.top + rect.height / 2;
        cachedMaxDistX = Math.max(cachedCenterX, window.innerWidth - cachedCenterX) || 1;
        cachedMaxDistY = Math.max(cachedCenterY, window.innerHeight - cachedCenterY) || 1;
      }
    };
    updateGeometry();

    // Seed initial 3D parallax tilt immediately from last known cursor position
    if (lastMousePosRef.current) {
      const { clientX, clientY } = lastMousePosRef.current;
      const seedX = Math.max(-1, Math.min(1, (clientX - cachedCenterX) / cachedMaxDistX));
      const seedY = Math.max(-1, Math.min(1, (clientY - cachedCenterY) / cachedMaxDistY));
      tiltRef.current.targetX = seedX;
      tiltRef.current.targetY = seedY;
      tiltRef.current.currentX = seedX;
      tiltRef.current.currentY = seedY;
      renderMatrix();
    }

    window.addEventListener("resize", updateGeometry, { passive: true });
    window.addEventListener("scroll", updateGeometry, { passive: true });

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      tiltRef.current.targetX = Math.max(-1, Math.min(1, (clientX - cachedCenterX) / cachedMaxDistX));
      tiltRef.current.targetY = Math.max(-1, Math.min(1, (clientY - cachedCenterY) / cachedMaxDistY));
      startAnimLoop();
    };

    const handleMouseLeave = () => {
      tiltRef.current.targetX = 0;
      tiltRef.current.targetY = 0;
      startAnimLoop();
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", updateGeometry);
      window.removeEventListener("scroll", updateGeometry);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [viewMode, startAnimLoop, renderMatrix]);

  // ==========================================
  // Range Gating Wheel & Slider (Zero React Re-render Lag)
  // ==========================================
  const updateSliderPosUI = useCallback((pos: number) => {
    // Snap to 0 when near bottom (< 0.008) for crisp "all" view
    const nextPos = pos < 0.008 ? 0 : pos;
    sliderPosRef.current = nextPos;

    // Linear depth cutoff mapping
    const nextCutoff = nextPos * MAX_DEPTH_CUTOFF;
    depthCutoffRef.current = nextCutoff;

    // Direct DOM updates bypass React re-rendering for zero-latency 120fps
    const pct = nextPos * 100;
    if (sliderFillRef.current) {
      sliderFillRef.current.style.height = `${pct}%`;
    }
    if (sliderThumbRef.current) {
      sliderThumbRef.current.style.bottom = `calc(${pct}% - 6px)`;
    }
    renderMatrix();
  }, [renderMatrix]);

  useEffect(() => {
    if (viewMode !== "matrix") return;
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Scrolling up (e.deltaY < 0) advances slider position in [0, 1]
      // Scrolling down (e.deltaY > 0) pulls slider down towards 0
      const nextPos = Math.max(0, Math.min(1, sliderPosRef.current - e.deltaY * 0.0016));
      updateSliderPosUI(nextPos);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [viewMode, updateSliderPosUI]);

  const handleSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const track = sliderTrackRef.current;
    if (!track) return;

    try {
      track.setPointerCapture(e.pointerId);
    } catch {}

    const trackRect = track.getBoundingClientRect();
    const updateFromY = (clientY: number) => {
      const ratio = 1 - (clientY - trackRect.top) / trackRect.height;
      const clamped = Math.max(0, Math.min(1, ratio));
      updateSliderPosUI(clamped);
    };

    updateFromY(e.clientY);

    const onPointerMove = (moveEv: PointerEvent) => {
      updateFromY(moveEv.clientY);
    };

    const onPointerUp = (upEv: PointerEvent) => {
      try {
        track.releasePointerCapture(upEv.pointerId);
      } catch {}
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square bg-[#F4F4F4] overflow-hidden select-none shadow-xs group ${className}`}
    >
      {/* 1. Base Photo View */}
      <img
        src={src}
        alt={alt}
        width={1120}
        height={1120}
        fetchPriority="high"
        decoding="async"
        className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
          viewMode === "photo" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 2. 3D Parallax Halftone Dot Matrix Canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        className={`absolute inset-0 w-full h-full object-contain touch-none transition-opacity duration-700 ease-in-out ${
          viewMode === "matrix" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 3. Single Pill Mode Toggle (Top Left) */}
      <button
        type="button"
        onClick={handleToggleMode}
        aria-label={viewMode === "matrix" ? "Switch to Photo view" : "Switch to Matrix view"}
        className="absolute top-2.5 left-2.5 z-20 h-7 flex items-center gap-1.5 px-2.5 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-md border border-[#7D7D7D]/25 text-[#2E3435] hover:text-[#009E8E] hover:border-[#009E8E]/40 shadow-xs transition-all cursor-pointer"
      >
          {viewMode === "matrix" ? (
            <>
              <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>Photo</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <circle cx="5" cy="5" r="2.2" />
                <circle cx="12" cy="5" r="2.2" />
                <circle cx="19" cy="5" r="2.2" />
                <circle cx="5" cy="12" r="2.2" />
                <circle cx="12" cy="12" r="2.2" />
                <circle cx="19" cy="12" r="2.2" />
                <circle cx="5" cy="19" r="2.2" />
                <circle cx="12" cy="19" r="2.2" />
                <circle cx="19" cy="19" r="2.2" />
              </svg>
              <span>Matrix</span>
            </>
          )}
        </button>

      {/* 4. Subtle Range Gating / Depth Slicer (Left Edge in Matrix Mode) */}
      <div
        className={`absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 flex flex-col items-center gap-2 pt-2 pb-3 rounded-full bg-white/90 backdrop-blur-md border border-[#7D7D7D]/25 shadow-xs select-none transition-all duration-700 ease-in-out ${
          viewMode === "matrix"
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-1.5 pointer-events-none"
        }`}
        title="Depth Slicer: scroll on photo or drag slider to gate range"
      >
        {/* Depth Gate Icon */}
        <span className="text-[9px] font-mono font-bold text-[#7D7D7D] leading-none select-none">
          Z
        </span>

        {/* Vertical Slider Track */}
        <div
          ref={sliderTrackRef}
          onPointerDown={handleSliderPointerDown}
          className="w-1.5 h-20 bg-[#7D7D7D]/20 rounded-full relative cursor-ns-resize overflow-visible touch-none"
        >
          {/* Active Range Fill - Instant response, no CSS transition lag */}
          <div
            ref={sliderFillRef}
            className="absolute bottom-0 left-0 right-0 bg-[#009E8E] rounded-full pointer-events-none"
            style={{ height: `${sliderPosRef.current * 100}%` }}
          />
          {/* Draggable Thumb - Instant response, no CSS transition lag */}
          <div
            ref={sliderThumbRef}
            className="absolute w-3 h-3 -left-[3px] rounded-full bg-white border-2 border-[#009E8E] shadow-2xs pointer-events-none"
            style={{ bottom: `calc(${sliderPosRef.current * 100}% - 6px)` }}
          />
        </div>
      </div>
    </div>
  );
}
