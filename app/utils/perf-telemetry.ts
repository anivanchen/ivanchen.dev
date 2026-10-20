/**
 * Performance Telemetry & Benchmarking Utility
 *
 * Quantifies rendering performance, FPS, frame execution times, and true jank/frame drops.
 * Accessible via:
 * - Keyboard: Shift + P to toggle real-time HUD
 * - URL: ?perf=true
 * - Console: window.__PERF__.getReport() or window.__PERF__.toggleHUD()
 */

export interface FrameMetrics {
  fps: number;
  avgFps: number;
  frameTimeMs: number;
  avgFrameTimeMs: number;
  maxFrameTimeMs: number;
  jankCount: number;
  smoothnessPct: number;
  totalFrames: number;
  budgetUtilizationPct: number;
}

class PerformanceTelemetry {
  private componentLastTimestamps = new Map<string, number>();
  private activeComponents = new Map<string, number>();
  private frameTimes: number[] = [];
  private renderDurations: number[] = [];
  private jankCount = 0;
  private totalFrames = 0;
  private isHUDVisible = false;
  private hudElement: HTMLDivElement | null = null;

  constructor() {
    if (import.meta.env.DEV && typeof window !== "undefined") {
      // Expose to window for DevTools access
      (window as unknown as { __PERF__: PerformanceTelemetry }).__PERF__ = this;

      // Auto-enable HUD if ?perf=true in URL
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("perf") === "true" || urlParams.get("perf") === "1") {
        this.toggleHUD(true);
      }

      // Keyboard shortcut Shift + P
      window.addEventListener("keydown", (e) => {
        if (e.shiftKey && (e.key === "P" || e.key === "p")) {
          const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
          if (tag !== "input" && tag !== "textarea") {
            e.preventDefault();
            this.toggleHUD();
          }
        }
      });
    }
  }

  /**
   * Records the start of a frame execution
   */
  public startFrame(componentId: string): number {
    if (!import.meta.env.DEV) return 0;
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    this.activeComponents.set(componentId, t0);
    return t0;
  }

  /**
   * Records the end of a frame execution and updates rolling telemetry
   */
  public endFrame(componentId: string, startTimestamp?: number): number {
    if (!import.meta.env.DEV) return 0;
    const t1 = typeof performance !== "undefined" ? performance.now() : 0;
    const t0 = startTimestamp ?? this.activeComponents.get(componentId) ?? t1;
    const duration = Math.max(0, t1 - t0);

    this.renderDurations.push(duration);
    if (this.renderDurations.length > 60) {
      this.renderDurations.shift();
    }

    const lastTime = this.componentLastTimestamps.get(componentId);
    if (lastTime !== undefined && lastTime > 0) {
      const delta = t1 - lastTime;

      // Only evaluate frame delta if the animation was continuously running
      // If delta > 200ms, the animation was asleep/paused or tab switched; not a jank!
      if (delta < 200) {
        this.frameTimes.push(delta);
        if (this.frameTimes.length > 60) {
          this.frameTimes.shift();
        }

        // Dynamically compute expected refresh cycle (e.g. 16.6ms for 60Hz, 8.3ms for 120Hz)
        const expectedInterval = this.getMedianDelta();
        // A true dropped frame (jank) occurs when a frame takes > 1.5x the refresh cycle
        const jankThreshold = Math.max(12, expectedInterval * 1.5);

        if (delta > jankThreshold) {
          this.jankCount++;
        }
      }
    }

    this.componentLastTimestamps.set(componentId, t1);
    this.totalFrames++;

    if (this.isHUDVisible && this.totalFrames % 5 === 0) {
      this.updateHUD();
    }

    return duration;
  }

  private getMedianDelta(): number {
    if (this.frameTimes.length === 0) return 16.67;
    const sorted = [...this.frameTimes].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)] || 16.67;
  }

  /**
   * Computes current statistical performance metrics
   */
  public getMetrics(): FrameMetrics {
    const recentDeltas = this.frameTimes;
    const recentDurations = this.renderDurations;

    const avgDelta = recentDeltas.length > 0
      ? recentDeltas.reduce((a, b) => a + b, 0) / recentDeltas.length
      : 16.67;

    const latestDelta = recentDeltas.length > 0
      ? recentDeltas[recentDeltas.length - 1]
      : 16.67;

    const fps = latestDelta > 0 ? Math.min(240, Math.round(1000 / latestDelta)) : 60;
    const avgFps = avgDelta > 0 ? Math.min(240, Math.round(1000 / avgDelta)) : 60;

    const avgFrameTimeMs = recentDurations.length > 0
      ? recentDurations.reduce((a, b) => a + b, 0) / recentDurations.length
      : 0;

    const maxFrameTimeMs = recentDurations.length > 0
      ? Math.max(...recentDurations)
      : 0;

    const latestDuration = recentDurations.length > 0
      ? recentDurations[recentDurations.length - 1]
      : 0;

    const budgetUtilizationPct = (avgFrameTimeMs / avgDelta) * 100;
    const smoothnessPct = this.totalFrames > 0
      ? Math.max(0, Math.min(100, ((this.totalFrames - this.jankCount) / this.totalFrames) * 100))
      : 100;

    return {
      fps,
      avgFps,
      frameTimeMs: Number(latestDuration.toFixed(2)),
      avgFrameTimeMs: Number(avgFrameTimeMs.toFixed(2)),
      maxFrameTimeMs: Number(maxFrameTimeMs.toFixed(2)),
      jankCount: this.jankCount,
      smoothnessPct: Number(smoothnessPct.toFixed(1)),
      totalFrames: this.totalFrames,
      budgetUtilizationPct: Number(budgetUtilizationPct.toFixed(1)),
    };
  }

  /**
   * Prints structured console table report
   */
  public getReport(): void {
    const m = this.getMetrics();
    console.group("🚀 [Performance Report]");
    console.table({
      "Average FPS": `${m.avgFps} fps`,
      "Current FPS": `${m.fps} fps`,
      "Avg Render Execution": `${m.avgFrameTimeMs} ms`,
      "Peak Render Execution": `${m.maxFrameTimeMs} ms`,
      "Frame Budget Used": `${m.budgetUtilizationPct}%`,
      "Smoothness Rating": `${m.smoothnessPct}%`,
      "True Dropped Frames": m.jankCount,
      "Total Active Frames": m.totalFrames,
    });
    console.info(
      m.avgFrameTimeMs < 1.0
        ? "✅ Outstanding: Render execution is under 1.0ms (< 6% of frame budget)."
        : m.avgFrameTimeMs < 4.0
        ? "🟢 Good: Render execution is within budget."
        : "⚠️ Caution: High render execution time."
    );
    console.groupEnd();
  }

  /**
   * Resets jank counters and timers
   */
  public reset(): void {
    this.jankCount = 0;
    this.totalFrames = 0;
    this.frameTimes = [];
    this.renderDurations = [];
    this.componentLastTimestamps.clear();
    this.activeComponents.clear();
    this.updateHUD();
  }

  /**
   * Toggles the real-time HUD micro-overlay in the bottom-right corner
   */
  public toggleHUD(forceState?: boolean): void {
    if (!import.meta.env.DEV || typeof document === "undefined") return;

    this.isHUDVisible = forceState !== undefined ? forceState : !this.isHUDVisible;

    if (this.isHUDVisible) {
      if (!this.hudElement) {
        const el = document.createElement("div");
        el.id = "perf-hud";
        el.className =
          "fixed bottom-3 right-3 z-[9999999] px-3 py-2 text-[11px] font-mono leading-tight bg-white/95 backdrop-blur-md border border-[#2E3435]/15 rounded-lg shadow-lg text-[#2E3435] select-none pointer-events-auto flex flex-col gap-1";
        el.innerHTML = `
          <div class="flex items-center justify-between gap-3 font-semibold pb-1 border-b border-[#2E3435]/10">
            <span class="text-[#009E8E] flex items-center gap-1.5">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#009E8E] animate-pulse"></span>
              ENGINE TELEMETRY
            </span>
            <span class="text-[10px] text-[#7D7D7D]">Shift+P</span>
          </div>
          <div id="perf-hud-content" class="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
            <span>FPS:</span><span id="perf-hud-fps" class="font-bold text-right">--</span>
            <span>Render Time:</span><span id="perf-hud-time" class="font-bold text-right">--</span>
            <span>Peak Time:</span><span id="perf-hud-peak" class="font-bold text-right">--</span>
            <span>Smoothness:</span><span id="perf-hud-smooth" class="font-bold text-right">--</span>
            <span>Janks:</span><span id="perf-hud-janks" class="font-bold text-right">0</span>
          </div>
        `;
        document.body.appendChild(el);
        this.hudElement = el;
      }
      this.hudElement.style.display = "flex";
      this.updateHUD();
    } else if (this.hudElement) {
      this.hudElement.style.display = "none";
    }
  }

  private updateHUD(): void {
    if (!this.hudElement) return;
    const m = this.getMetrics();
    const fpsEl = document.getElementById("perf-hud-fps");
    const timeEl = document.getElementById("perf-hud-time");
    const peakEl = document.getElementById("perf-hud-peak");
    const smoothEl = document.getElementById("perf-hud-smooth");
    const janksEl = document.getElementById("perf-hud-janks");

    if (fpsEl) {
      fpsEl.textContent = `${m.avgFps}`;
      fpsEl.className = `font-bold text-right ${m.avgFps >= 55 ? "text-[#009E8E]" : "text-amber-500"}`;
    }
    if (timeEl) {
      timeEl.textContent = `${m.avgFrameTimeMs}ms`;
      timeEl.className = `font-bold text-right ${m.avgFrameTimeMs < 2.0 ? "text-[#009E8E]" : "text-amber-500"}`;
    }
    if (peakEl) {
      peakEl.textContent = `${m.maxFrameTimeMs}ms`;
    }
    if (smoothEl) {
      smoothEl.textContent = `${m.smoothnessPct}%`;
      smoothEl.className = `font-bold text-right ${m.smoothnessPct >= 98 ? "text-[#009E8E]" : "text-amber-500"}`;
    }
    if (janksEl) {
      janksEl.textContent = `${m.jankCount}`;
      janksEl.className = `font-bold text-right ${m.jankCount === 0 ? "text-[#009E8E]" : "text-red-500"}`;
    }
  }
}

export const perfTelemetry = new PerformanceTelemetry();
