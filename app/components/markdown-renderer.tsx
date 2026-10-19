import { useMemo, useEffect, useRef } from "react";
import { marked } from "marked";
import katex from "katex";
import hljs from "highlight.js";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark-dimmed.css";

/**
 * Parses markdown with KaTeX math formulas using placeholder tokens,
 * ensuring marked never corrupts LaTeX underscores or MathML markup.
 */
function renderMarkdownWithLatex(markdown: string): string {
  const codeBlocks: string[] = [];
  const mathTokens: string[] = [];

  // 1. Protect code blocks (```...```) and inline code (`...`)
  let protectedText = markdown.replace(/(```[\s\S]*?```|`[^`\n]+?`)/g, (match) => {
    codeBlocks.push(match);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  // 2. Extract Display Math: $$ ... $$
  protectedText = protectedText.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      mathTokens.push(
        `<div class="katex-display-wrapper my-6 overflow-x-auto overflow-y-hidden max-w-full py-2">${rendered}</div>`
      );
      return `\n\n%%MATH_${mathTokens.length - 1}%%\n\n`;
    } catch {
      return math;
    }
  });

  // 3. Extract Inline Math: $ ... $
  protectedText = protectedText.replace(
    /(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/g,
    (_, math) => {
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
        mathTokens.push(rendered);
        return `%%MATH_${mathTokens.length - 1}%%`;
      } catch {
        return math;
      }
    }
  );

  // 4. Restore code blocks
  protectedText = protectedText.replace(/%%CODEBLOCK_(\d+)%%/g, (_, index) => {
    return codeBlocks[parseInt(index, 10)] ?? "";
  });

  // 5. Parse markdown with marked (marked cannot corrupt KaTeX HTML or underscores)
  let html = marked.parse(protectedText, { async: false }) as string;

  // 6. Restore math tokens
  html = html.replace(/%%MATH_(\d+)%%/g, (_, index) => {
    return mathTokens[parseInt(index, 10)] ?? "";
  });

  return html;
}

// Configure custom marked extensions for code blocks and mermaid
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      const language = (lang || "").trim().toLowerCase();

      // Handle Mermaid diagrams with interactive pan/zoom viewport
      if (language === "mermaid") {
        const encoded = encodeURIComponent(text);
        return `
          <div class="mermaid-block-wrapper my-8 w-full max-w-full">
            <div class="mermaid-container relative w-full overflow-hidden rounded-xl border border-[#7D7D7D]/25 bg-[#F4F4F4]/50 shadow-xs select-none">
              <!-- Top Controls Toolbar -->
              <div class="mermaid-controls absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-[#7D7D7D]/25 rounded-lg p-1 shadow-xs opacity-90 hover:opacity-100 transition-opacity">
                <button type="button" class="mermaid-btn-zoom-in p-1.5 text-[#2E3435] hover:text-[#009E8E] hover:bg-[#009E8E]/10 rounded transition-colors cursor-pointer" title="Zoom in" aria-label="Zoom in">
                  <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
                </button>
                <button type="button" class="mermaid-btn-zoom-out p-1.5 text-[#2E3435] hover:text-[#009E8E] hover:bg-[#009E8E]/10 rounded transition-colors cursor-pointer" title="Zoom out" aria-label="Zoom out">
                  <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>
                </button>
                <button type="button" class="mermaid-btn-reset p-1.5 text-[#2E3435] hover:text-[#009E8E] hover:bg-[#009E8E]/10 rounded transition-colors cursor-pointer" title="Reset view (Fit width)" aria-label="Reset view to fit width">
                  <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
                <div class="w-px h-4 bg-[#7D7D7D]/25 mx-0.5"></div>
                <button type="button" class="mermaid-btn-fullscreen p-1.5 text-[#2E3435] hover:text-[#009E8E] hover:bg-[#009E8E]/10 rounded transition-colors cursor-pointer" title="Expand diagram fullscreen" aria-label="Expand diagram fullscreen">
                  <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </button>
              </div>

              <!-- Interactive Viewport -->
              <div class="mermaid-viewport relative w-full overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center p-3 sm:p-4">
                <div class="mermaid-canvas w-full h-full min-h-[180px] flex items-center justify-center will-change-transform" data-mermaid-code="${encoded}">
                  <span class="text-xs font-mono text-[#7D7D7D] animate-pulse">Rendering diagram...</span>
                </div>
              </div>

              <!-- Bottom Helper Hint -->
              <div class="mermaid-hint absolute bottom-2.5 right-3.5 z-10 pointer-events-none text-[11px] font-medium text-[#7D7D7D] bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#7D7D7D]/20 hidden sm:flex items-center gap-1.5 shadow-2xs">
                <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/></svg>
                <span>Fit to width • Scroll or +/- to zoom</span>
              </div>
            </div>
          </div>
        `;
      }

      // Syntax highlighting with highlight.js
      const validLang = language && hljs.getLanguage(language) ? language : "";
      let highlighted = "";

      if (validLang) {
        try {
          highlighted = hljs.highlight(text, { language: validLang }).value;
        } catch {
          highlighted = text;
        }
      } else {
        try {
          highlighted = hljs.highlightAuto(text).value;
        } catch {
          highlighted = text;
        }
      }

      return `
        <div class="my-6 overflow-hidden rounded-md bg-[#22272e] border border-neutral-700/60 shadow-xs">
          ${
            validLang
              ? `<div class="border-b border-neutral-700/60 bg-[#1c2128] px-4 py-1.5 text-xs font-mono text-neutral-400 uppercase tracking-wider">${validLang}</div>`
              : ""
          }
          <pre class="overflow-x-auto p-4 text-sm font-mono leading-relaxed !my-0 !bg-transparent"><code class="hljs ${
            validLang ? `language-${validLang}` : ""
          }">${highlighted}</code></pre>
        </div>
      `;
    },
  },
});

function setupInteractiveCanvas(
  viewportEl: HTMLElement,
  canvasEl: HTMLElement,
  natW: number,
  natH: number,
  options: {
    btnZoomIn?: HTMLElement | null;
    btnZoomOut?: HTMLElement | null;
    btnReset?: HTMLElement | null;
    fitMode?: "width" | "contain";
  } = {}
) {
  const fitMode = options.fitMode || "width";

  const getPaddings = () => {
    const computed = window.getComputedStyle(viewportEl);
    const padX =
      (parseFloat(computed.paddingLeft) || 16) +
      (parseFloat(computed.paddingRight) || 16);
    const padY =
      (parseFloat(computed.paddingTop) || 16) +
      (parseFloat(computed.paddingBottom) || 16);
    return { padX, padY };
  };

  const computeFitScale = () => {
    const { padX, padY } = getPaddings();
    const vpRect = viewportEl.getBoundingClientRect();
    if (fitMode === "width") {
      const availW = Math.max(100, vpRect.width - padX);
      return Math.max(0.1, availW / natW);
    } else {
      const availW = Math.max(100, vpRect.width - padX);
      const availH = Math.max(100, vpRect.height - padY);
      const scaleX = availW / natW;
      const scaleY = availH / natH;
      return Math.min(2.5, Math.max(0.15, Math.min(scaleX, scaleY)));
    }
  };

  const updateNaturalHeight = (width?: number) => {
    if (fitMode === "width") {
      const { padX, padY } = getPaddings();
      const currentW = width || viewportEl.clientWidth;
      if (currentW > 0) {
        const availW = Math.max(100, currentW - padX);
        const aspectRatio = natW / Math.max(1, natH);
        const targetHeight = Math.round(availW / aspectRatio) + padY;
        viewportEl.style.minHeight = "0px";
        viewportEl.style.height = `${targetHeight}px`;
      }
    }
  };

  // Set natural flow height immediately
  updateNaturalHeight();

  let currentScale = computeFitScale();
  let initialScale = currentScale;
  let currentX = 0;
  let currentY = 0;

  const updateTouchAction = () => {
    if (fitMode === "contain" || currentScale > initialScale * 1.05) {
      viewportEl.style.touchAction = "none";
    } else {
      viewportEl.style.touchAction = "pan-y";
    }
  };

  const applyTransform = (smooth = false) => {
    canvasEl.style.transition = smooth
      ? "transform 0.2s cubic-bezier(0.2, 0, 0, 1)"
      : "none";
    canvasEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
    updateTouchAction();
  };

  applyTransform(false);

  // ResizeObserver: smoothly resize natural height & fit-to-width when container width changes
  let lastObservedWidth = Math.round(viewportEl.clientWidth);
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const newW = Math.round(entry.contentRect.width);
      if (newW > 0 && Math.abs(newW - lastObservedWidth) >= 4) {
        lastObservedWidth = newW;
        updateNaturalHeight(newW);
        if (
          Math.abs(currentScale - initialScale) < 0.01 &&
          currentX === 0 &&
          currentY === 0
        ) {
          initialScale = computeFitScale();
          currentScale = initialScale;
          applyTransform(false);
        }
      }
    }
  });
  ro.observe(viewportEl);

  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;

  viewportEl.addEventListener("pointerdown", (e: PointerEvent) => {
    if (e.button !== 0) return;
    if (
      (e.target as HTMLElement).closest(".mermaid-controls") ||
      (e.target as HTMLElement).closest("button")
    )
      return;

    // On touch devices, allow normal article scrolling when diagram already fits width
    if (
      e.pointerType === "touch" &&
      fitMode === "width" &&
      currentScale <= initialScale * 1.05
    ) {
      return;
    }

    isDragging = true;
    startPointerX = e.clientX - currentX;
    startPointerY = e.clientY - currentY;
    try {
      viewportEl.setPointerCapture(e.pointerId);
    } catch {}
    viewportEl.style.cursor = "grabbing";
  });

  viewportEl.addEventListener("pointermove", (e: PointerEvent) => {
    if (!isDragging) return;
    currentX = e.clientX - startPointerX;
    currentY = e.clientY - startPointerY;
    applyTransform(false);
  });

  const endDrag = (e: PointerEvent) => {
    if (isDragging) {
      isDragging = false;
      try {
        viewportEl.releasePointerCapture(e.pointerId);
      } catch {}
      viewportEl.style.cursor = "grab";
    }
  };

  viewportEl.addEventListener("pointerup", endDrag);
  viewportEl.addEventListener("pointercancel", endDrag);

  // Wheel zoom with Ctrl or pan when zoomed
  viewportEl.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.12 : 0.88;
        currentScale = Math.max(0.15, Math.min(4.0, currentScale * factor));
        applyTransform(true);
      } else if (fitMode === "contain" || currentScale > initialScale * 1.05) {
        // In modal or when actively zoomed in, allow wheel to pan
        e.preventDefault();
        currentX -= e.deltaX * 0.85;
        currentY -= e.deltaY * 0.85;
        applyTransform(false);
      }
      // Otherwise, let page scroll naturally through the article
    },
    { passive: false }
  );

  if (options.btnZoomIn) {
    options.btnZoomIn.addEventListener("click", () => {
      currentScale = Math.min(4.0, currentScale * 1.3);
      applyTransform(true);
    });
  }

  if (options.btnZoomOut) {
    options.btnZoomOut.addEventListener("click", () => {
      currentScale = Math.max(0.15, currentScale / 1.3);
      applyTransform(true);
    });
  }

  if (options.btnReset) {
    options.btnReset.addEventListener("click", () => {
      initialScale = computeFitScale();
      currentScale = initialScale;
      currentX = 0;
      currentY = 0;
      applyTransform(true);
    });
  }
}

function openFullscreenModal(svg: string, natW: number, natH: number) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col p-4 sm:p-6 select-none";

  modal.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-[#7D7D7D]/20 shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base sm:text-lg font-semibold text-[#009E8E]">Architecture Diagram</span>
        <span class="text-xs text-[#7D7D7D] hidden sm:inline">• Click and drag to pan anywhere</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 bg-[#F4F4F4] rounded-lg p-1 border border-[#7D7D7D]/20">
          <button type="button" class="modal-zoom-in p-1.5 text-[#2E3435] hover:text-[#009E8E] rounded transition-colors cursor-pointer" title="Zoom in">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
          </button>
          <button type="button" class="modal-zoom-out p-1.5 text-[#2E3435] hover:text-[#009E8E] rounded transition-colors cursor-pointer" title="Zoom out">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>
          </button>
          <button type="button" class="modal-reset p-1.5 text-[#2E3435] hover:text-[#009E8E] rounded transition-colors cursor-pointer" title="Reset view">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
        <button type="button" class="modal-close px-3 py-1.5 text-sm font-semibold bg-[#2E3435] text-white hover:bg-[#009E8E] rounded-lg transition-colors cursor-pointer">
          Close (Esc)
        </button>
      </div>
    </div>
    <div class="modal-viewport flex-1 relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center mt-3">
      <div class="modal-canvas w-full h-full flex items-center justify-center will-change-transform">
        ${svg}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const modalViewport = modal.querySelector<HTMLElement>(".modal-viewport")!;
  const modalCanvas = modal.querySelector<HTMLElement>(".modal-canvas")!;
  const modalSvg = modalCanvas.querySelector<SVGElement>("svg")!;

  modalSvg.setAttribute("width", `${natW}`);
  modalSvg.setAttribute("height", `${natH}`);
  modalSvg.style.maxWidth = "none";
  modalSvg.style.maxHeight = "none";
  modalSvg.style.display = "block";
  modalSvg.style.pointerEvents = "none";

  const btnZoomIn = modal.querySelector<HTMLElement>(".modal-zoom-in");
  const btnZoomOut = modal.querySelector<HTMLElement>(".modal-zoom-out");
  const btnReset = modal.querySelector<HTMLElement>(".modal-reset");
  const btnClose = modal.querySelector<HTMLElement>(".modal-close");

  setupInteractiveCanvas(modalViewport, modalCanvas, natW, natH, {
    btnZoomIn,
    btnZoomOut,
    btnReset,
    fitMode: "contain",
  });

  const closeModal = () => {
    document.body.style.overflow = prevOverflow;
    window.removeEventListener("keydown", onKeyDown);
    modal.remove();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  window.addEventListener("keydown", onKeyDown);
  btnClose?.addEventListener("click", closeModal);
}

export function MarkdownRenderer({ content }: { content: string }) {
  const containerRef = useRef<HTMLElement>(null);

  const html = useMemo(() => {
    return renderMarkdownWithLatex(content);
  }, [content]);

  // Client-side Mermaid rendering with interactive viewport & custom theme
  useEffect(() => {
    if (!containerRef.current) return;

    const mermaidElements = containerRef.current.querySelectorAll<HTMLElement>(
      ".mermaid-canvas[data-mermaid-code]"
    );
    if (mermaidElements.length === 0) return;

    import("mermaid").then(async (m) => {
      const mermaid = m.default;

      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.ready;
        } catch {}
      }

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        flowchart: {
          htmlLabels: true,
          curve: "basis",
          padding: 16,
          nodeSpacing: 45,
          rankSpacing: 45,
        },
        themeVariables: {
          fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
          fontSize: "14px",
          primaryColor: "#FFFFFF",
          primaryBorderColor: "#009E8E",
          primaryTextColor: "#2E3435",
          lineColor: "#009E8E",
          secondaryColor: "#F4F4F4",
          tertiaryColor: "#FFFFFF",
          mainBkg: "#FFFFFF",
          nodeBorder: "#009E8E",
          clusterBkg: "#F4F4F4",
          clusterBorder: "#7D7D7D",
          titleColor: "#2E3435",
          edgeLabelBackground: "#FFFFFF",
          actorBkg: "#FFFFFF",
          actorBorder: "#009E8E",
          actorTextColor: "#2E3435",
          actorLineColor: "#009E8E",
          signalColor: "#2E3435",
          signalTextColor: "#2E3435",
        },
        securityLevel: "loose",
      });

      for (const el of Array.from(mermaidElements)) {
        const rawCode = el.getAttribute("data-mermaid-code");
        if (!rawCode) continue;

        const code = decodeURIComponent(rawCode);
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        try {
          const { svg } = await mermaid.render(uniqueId, code);
          el.innerHTML = svg;
          el.removeAttribute("data-mermaid-code");

          const container = el.closest<HTMLElement>(".mermaid-container");
          if (!container) continue;

          const viewport = container.querySelector<HTMLElement>(".mermaid-viewport");
          const svgEl = el.querySelector<SVGElement>("svg");
          if (!viewport || !svgEl) continue;

          // Parse viewBox to determine natural aspect ratio and dimensions
          const viewBox = svgEl.getAttribute("viewBox");
          let natW = 800;
          let natH = 400;
          if (viewBox) {
            const parts = viewBox.split(/[\s,]+/).map(Number);
            if (parts.length >= 4 && !isNaN(parts[2]) && !isNaN(parts[3])) {
              natW = parts[2];
              natH = parts[3];
            }
          }

          svgEl.setAttribute("width", `${natW}`);
          svgEl.setAttribute("height", `${natH}`);
          svgEl.style.maxWidth = "none";
          svgEl.style.maxHeight = "none";
          svgEl.style.display = "block";
          svgEl.style.pointerEvents = "none";

          const btnZoomIn = container.querySelector<HTMLElement>(".mermaid-btn-zoom-in");
          const btnZoomOut = container.querySelector<HTMLElement>(".mermaid-btn-zoom-out");
          const btnReset = container.querySelector<HTMLElement>(".mermaid-btn-reset");
          const btnFullscreen = container.querySelector<HTMLElement>(
            ".mermaid-btn-fullscreen"
          );

          setupInteractiveCanvas(viewport, el, natW, natH, {
            btnZoomIn,
            btnZoomOut,
            btnReset,
            fitMode: "width",
          });

          btnFullscreen?.addEventListener("click", () => {
            openFullscreenModal(svg, natW, natH);
          });
        } catch {
          // Gracefully render code block fallback without logging errors to the browser console
          el.innerHTML = `<pre class="text-xs text-red-500 font-mono p-2">${code}</pre>`;
        }
      }
    });
  }, [html]);

  // Intercept copy events on rendered LaTeX to copy raw LaTeX rather than broken characters
  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !event.clipboardData) {
        return;
      }

      const range = selection.getRangeAt(0);

      // Check if start or end of selection falls within KaTeX elements
      const startElement =
        range.startContainer instanceof Element
          ? range.startContainer
          : range.startContainer.parentElement;
      const startKatex =
        startElement?.closest(".katex-display") || startElement?.closest(".katex");

      const endElement =
        range.endContainer instanceof Element
          ? range.endContainer
          : range.endContainer.parentElement;
      const endKatex =
        endElement?.closest(".katex-display") || endElement?.closest(".katex");

      // Clone range to expand without disrupting user's visual selection
      const clonedRange = range.cloneRange();
      if (startKatex) {
        clonedRange.setStartBefore(startKatex);
      }
      if (endKatex) {
        clonedRange.setEndAfter(endKatex);
      }

      const fragment = clonedRange.cloneContents();
      const mathmlElements = fragment.querySelectorAll(".katex-mathml");
      if (mathmlElements.length === 0) {
        return; // No math formulas in selection; let default copy proceed
      }

      // Remove visual HTML renderings to avoid character noise
      fragment.querySelectorAll(".katex-html").forEach((node) => node.remove());

      // Replace MathML containers with their raw LaTeX source
      fragment.querySelectorAll(".katex-mathml").forEach((el) => {
        const annotation = el.querySelector("annotation");
        const tex = annotation?.textContent?.trim();
        if (!tex) return;

        const isDisplay =
          el.closest(".katex-display") !== null ||
          el.querySelector("math[display='block']") !== null;

        const replacementText = isDisplay ? `\n\n$$ ${tex} $$\n\n` : `$${tex}$`;
        el.replaceWith(document.createTextNode(replacementText));
      });

      const plainText = fragment.textContent ?? "";
      event.clipboardData.setData("text/plain", plainText);
      event.preventDefault();
    };

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <article
      ref={containerRef}
      className="w-full prose-custom text-base sm:text-lg leading-relaxed text-[#2E3435]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
