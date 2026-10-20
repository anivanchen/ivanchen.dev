import { useEffect, useRef } from "react";

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isVisible = false;
    let isDown = false;
    let isClickable = false;
    let rafId: number | null = null;

    let targetX = -100;
    let targetY = -100;
    let targetElement: HTMLElement | null = null;
    let isPendingUpdate = false;

    // Immediately enable on client mount
    document.documentElement.classList.add("custom-cursor-enabled");

    const updateCursor = () => {
      isPendingUpdate = false;
      const container = containerRef.current;
      if (!container) return;

      container.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!isVisible) {
        isVisible = true;
        container.style.opacity = "1";
        document.documentElement.classList.add("custom-cursor-enabled");
      }

      // Check if hovered element is interactive
      if (targetElement) {
        const clickableNow = Boolean(
          targetElement.closest(
            'a, button, [role="button"], input, select, textarea, label, [tabindex]:not([tabindex="-1"]), .cursor-pointer'
          )
        );

        if (clickableNow !== isClickable) {
          isClickable = clickableNow;
          updateDotTransform();
        }
      }
    };

    const scheduleUpdate = () => {
      if (!isPendingUpdate) {
        isPendingUpdate = true;
        rafId = requestAnimationFrame(updateCursor);
      }
    };

    const updateDotTransform = () => {
      if (!dotRef.current) return;
      let scale = 1;
      if (isDown) {
        scale = 0.8;
      } else if (isClickable) {
        scale = 1.35;
      }
      dotRef.current.style.transform = `scale(${scale})`;
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if ("pointerType" in e && (e.pointerType === "touch" || e.pointerType === "pen")) {
        return;
      }

      targetX = e.clientX;
      targetY = e.clientY;
      targetElement = e.target as HTMLElement | null;
      scheduleUpdate();
    };

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      if ("pointerType" in e && (e.pointerType === "touch" || e.pointerType === "pen")) {
        return;
      }
      isDown = true;
      updateDotTransform();
    };

    const handlePointerUp = () => {
      isDown = false;
      updateDotTransform();
    };

    const handleMouseLeave = () => {
      const container = containerRef.current;
      if (container) {
        container.style.opacity = "0";
      }
      isVisible = false;
      isDown = false;
    };

    const handleMouseEnter = () => {
      const container = containerRef.current;
      if (container) {
        container.style.opacity = "1";
      }
      isVisible = true;
    };

    const handleWindowBlur = () => {
      const container = containerRef.current;
      if (container) {
        container.style.opacity = "0";
      }
      isVisible = false;
      isDown = false;
    };

    const handleTouchStart = () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
      isVisible = false;
    };

    // Use PointerEvent if supported, otherwise fallback to MouseEvent
    const hasPointerEvents = typeof window.PointerEvent !== "undefined";
    const moveEvent = hasPointerEvents ? "pointermove" : "mousemove";
    const downEvent = hasPointerEvents ? "pointerdown" : "mousedown";
    const upEvent = hasPointerEvents ? "pointerup" : "mouseup";

    window.addEventListener(moveEvent, handlePointerMove, { passive: true });
    window.addEventListener(downEvent, handlePointerDown, { passive: true });
    window.addEventListener(upEvent, handlePointerUp, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener(moveEvent, handlePointerMove);
      window.removeEventListener(downEvent, handlePointerDown);
      window.removeEventListener(upEvent, handlePointerUp);
      window.removeEventListener("touchstart", handleTouchStart);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform"
      style={{
        opacity: 0,
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        transition: "opacity 0.15s ease-out",
      }}
    >
      <div
        ref={dotRef}
        className="w-4 h-4 rounded-full bg-[#009E8E] shadow-[0_0_10px_rgba(0,158,142,0.5)] ring-1.5 ring-white/70 transition-transform duration-150 ease-out"
      />
    </div>
  );
}
