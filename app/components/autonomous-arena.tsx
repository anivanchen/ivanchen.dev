import { useEffect, useRef, useCallback } from "react";
import { perfTelemetry } from "../utils/perf-telemetry";

interface TealAgent {
  col: number;
  row: number;
  dirCol: number;
  dirRow: number;
  nextHopTime: number;
  baseInterval: number; // Calm hop interval in ms (750ms - 1250ms)
}

const STEP = 16; // Grid pitch in pixels
const DOT_RADIUS = 3.2; // Prominent black dot radius
const TEAL_RADIUS = 6.4; // Bold teal agent radius
const FLEE_RADIUS = 90; // Cursor influence radius in pixels

const DX = [1, -1, 0, 0, 1, -1, 1, -1];
const DY = [0, 0, 1, -1, 1, 1, -1, -1];

export interface AutonomousArenaProps {
  id?: string;
  className?: string;
  rows?: number;
}

export function AutonomousArena({
  id = "default",
  className = "",
  rows = 8,
}: AutonomousArenaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const occupiedBufferRef = useRef<Int32Array>(new Int32Array(0));

  const agentsRef = useRef<TealAgent[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const startLoopRef = useRef<(() => void) | null>(null);
  const cursorAlphaRef = useRef(0);
  const isVisibleRef = useRef(true);

  const gridDimsRef = useRef({ cols: 0, rows: 0, startX: 0, startY: 0 });

  const pointerPosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Seed teal agents scattered across the grid on unique cells
  const initAgents = useCallback((cols: number, rows: number) => {
    if (cols <= 0 || rows <= 0) return;
    const totalCells = cols * rows;
    const count = Math.max(12, Math.min(36, Math.floor(totalCells * 0.05)));
    const agents: TealAgent[] = [];
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    const occupied = new Set<number>();

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let col = 0;
      let row = 0;
      let key = 0;
      do {
        col = Math.floor(Math.random() * cols);
        row = Math.floor(Math.random() * rows);
        key = row * cols + col;
        attempts++;
      } while (occupied.has(key) && attempts < 100);

      occupied.add(key);
      agents.push({
        col,
        row,
        dirCol: (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.3 ? 1 : 0),
        dirRow: (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.3 ? 1 : 0),
        nextHopTime: now + Math.random() * 800,
        baseInterval: 750 + Math.random() * 500,
      });
    }
    agentsRef.current = agents;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 2, 3) : 2;

    const resize = () => {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = rows * STEP;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const cols = Math.max(1, Math.floor(width / STEP));
      const rowCount = Math.max(1, rows);
      const startX = (width - (cols - 1) * STEP) / 2;
      const startY = (height - (rowCount - 1) * STEP) / 2;

      gridDimsRef.current = { cols, rows: rowCount, startX, startY };

      if (agentsRef.current.length === 0) {
        initAgents(cols, rowCount);
      } else {
        // Clamp existing agents inside updated bounds
        for (const a of agentsRef.current) {
          a.col = Math.max(0, Math.min(cols - 1, a.col));
          a.row = Math.max(0, Math.min(rowCount - 1, a.row));
        }
      }

      // Pre-render static black dot grid to offscreen canvas
      let staticCanvas = staticCanvasRef.current;
      if (!staticCanvas) {
        staticCanvas = document.createElement("canvas");
        staticCanvasRef.current = staticCanvas;
      }
      staticCanvas.width = width * dpr;
      staticCanvas.height = height * dpr;
      const sCtx = staticCanvas.getContext("2d");
      if (sCtx) {
        sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sCtx.clearRect(0, 0, width, height);
        sCtx.beginPath();
        for (let r = 0; r < rows; r++) {
          const y = startY + r * STEP;
          for (let c = 0; c < cols; c++) {
            const x = startX + c * STEP;
            sCtx.moveTo(x + DOT_RADIUS, y);
            sCtx.arc(x, y, DOT_RADIUS, 0, 6.2831853);
          }
        }
        sCtx.fillStyle = "#2E3435";
        sCtx.fill();
      }

      // Re-allocate persistent occupancy buffer if dimensions grew
      const totalCells = cols * rows;
      if (occupiedBufferRef.current.length < totalCells) {
        occupiedBufferRef.current = new Int32Array(totalCells);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const arenaId = `AutonomousArena-${id}`;

    const render = (now: number) => {
      if (!isVisibleRef.current) {
        animFrameIdRef.current = null;
        return;
      }

      const t0 = import.meta.env.DEV ? perfTelemetry.startFrame(arenaId) : 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Pure white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      const { cols, rows, startX, startY } = gridDimsRef.current;
      const pointer = pointerPosRef.current;
      const agents = agentsRef.current;
      const numAgents = agents.length;

      // Smooth transition of cursor scare-range highlight opacity
      const targetAlpha = pointer.active ? 1 : 0;
      cursorAlphaRef.current += (targetAlpha - cursorAlphaRef.current) * 0.16;
      const auraAlpha = cursorAlphaRef.current;

      // 2. Batched Cell Highlights (Single Fill & Stroke Pass!)
      if (auraAlpha > 0.005 && cols > 0 && rows > 0) {
        const minCol = Math.max(0, Math.floor((pointer.x - FLEE_RADIUS - startX) / STEP));
        const maxCol = Math.min(cols - 1, Math.ceil((pointer.x + FLEE_RADIUS - startX) / STEP));
        const minRow = Math.max(0, Math.floor((pointer.y - FLEE_RADIUS - startY) / STEP));
        const maxRow = Math.min(rows - 1, Math.ceil((pointer.y + FLEE_RADIUS - startY) / STEP));

        const pad = 1.5;
        const cellSize = STEP - pad * 2;
        const cellRadius = 2.5;

        ctx.beginPath();
        for (let r = minRow; r <= maxRow; r++) {
          const cy = startY + r * STEP;
          for (let c = minCol; c <= maxCol; c++) {
            const cx = startX + c * STEP;
            const dist = Math.hypot(cx - pointer.x, cy - pointer.y);
            if (dist > FLEE_RADIUS) continue;

            if (typeof ctx.roundRect === "function") {
              ctx.roundRect(cx - cellSize / 2, cy - cellSize / 2, cellSize, cellSize, cellRadius);
            } else {
              ctx.rect(cx - cellSize / 2, cy - cellSize / 2, cellSize, cellSize);
            }
          }
        }
        ctx.fillStyle = `rgba(0, 158, 142, ${(0.08 * auraAlpha).toFixed(3)})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 158, 142, ${(0.22 * auraAlpha).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Draw entire pre-rendered static sea of dots in 1 single GPU blit (0.02ms)
      const staticCanvas = staticCanvasRef.current;
      if (staticCanvas) {
        ctx.drawImage(staticCanvas, 0, 0, width, height);
      }

      // 4. Update Agent Grid Positions (Collision Avoidance using zero-alloc buffer)
      const totalCells = cols * rows;
      const occupied = occupiedBufferRef.current;
      occupied.fill(-1);
      for (let i = 0; i < numAgents; i++) {
        const a = agents[i];
        if (a.row >= 0 && a.row < rows && a.col >= 0 && a.col < cols) {
          occupied[a.row * cols + a.col] = i;
        }
      }

      for (let i = 0; i < numAgents; i++) {
        const a = agents[i];
        const ax = startX + a.col * STEP;
        const ay = startY + a.row * STEP;

        const cdx = ax - pointer.x;
        const cdy = ay - pointer.y;
        const dist = Math.hypot(cdx, cdy);
        const isFleeing = pointer.active && dist < FLEE_RADIUS;

        if (now < a.nextHopTime) {
          continue;
        }

        if (isFleeing) {
          const urgency = 1 - dist / FLEE_RADIUS;
          a.nextHopTime = now + (160 + (1 - urgency) * 140);
        } else {
          a.nextHopTime = now + a.baseInterval * (0.9 + Math.random() * 0.2);
        }

        let bestScore = -Infinity;
        let bestCol = a.col;
        let bestRow = a.row;
        let bestDirCol = a.dirCol;
        let bestDirRow = a.dirRow;

        const startK = Math.floor(Math.random() * 8);

        for (let k = 0; k < 8; k++) {
          const dirIdx = (startK + k) % 8;
          const dc = DX[dirIdx];
          const dr = DY[dirIdx];
          const nc = a.col + dc;
          const nr = a.row + dr;

          if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;

          // STRICT COLLISION AVOIDANCE
          const targetKey = nr * cols + nc;
          if (occupied[targetKey] !== -1 && occupied[targetKey] !== i) {
            continue;
          }

          let neighborPenalty = 0;
          for (let s = 0; s < 8; s++) {
            const snc = nc + DX[s];
            const snr = nr + DY[s];
            if (snc >= 0 && snc < cols && snr >= 0 && snr < rows) {
              const occ = occupied[snr * cols + snc];
              if (occ !== -1 && occ !== i) {
                neighborPenalty += 3.5;
              }
            }
          }

          let score = 0;
          if (isFleeing) {
            const nax = startX + nc * STEP;
            const nay = startY + nr * STEP;
            const nDist = Math.hypot(nax - pointer.x, nay - pointer.y);
            score = nDist * 3.0 - neighborPenalty + (Math.random() - 0.5) * 6;
          } else {
            const dotProduct = dc * a.dirCol + dr * a.dirRow;
            score = dotProduct * 1.5 - neighborPenalty + Math.random() * 2.0;
          }

          if (score > bestScore) {
            bestScore = score;
            bestCol = nc;
            bestRow = nr;
            bestDirCol = dc;
            bestDirRow = dr;
          }
        }

        if (bestScore > -Infinity && (bestCol !== a.col || bestRow !== a.row)) {
          occupied[a.row * cols + a.col] = -1;
          occupied[bestRow * cols + bestCol] = i;
          a.col = bestCol;
          a.row = bestRow;
          a.dirCol = bestDirCol;
          a.dirRow = bestDirRow;
        } else {
          a.dirCol = -a.dirCol;
          a.dirRow = -a.dirRow;
        }
      }

      // 5. Draw Teal Agents (#009E8E) in a single batched path
      ctx.beginPath();
      for (let i = 0; i < numAgents; i++) {
        const a = agents[i];
        const x = startX + a.col * STEP;
        const y = startY + a.row * STEP;
        ctx.moveTo(x + TEAL_RADIUS, y);
        ctx.arc(x, y, TEAL_RADIUS, 0, 6.2831853);
      }
      ctx.fillStyle = "#009E8E";
      ctx.fill();

      if (import.meta.env.DEV) {
        perfTelemetry.endFrame(arenaId, t0);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (animFrameIdRef.current === null && isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };
    startLoopRef.current = startLoop;

    startLoop();

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      startLoopRef.current = null;
    };
  }, [rows, initAgents]);

  // Pause when scrolled out of view to save 100% of CPU/battery
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && startLoopRef.current) {
          startLoopRef.current();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointerPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerPosRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full bg-white overflow-hidden select-none ${className}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${rows * STEP}px` }}
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="w-full h-full block touch-none"
        />
      </div>
    </div>
  );
}
