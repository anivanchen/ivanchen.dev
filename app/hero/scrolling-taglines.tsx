
import { useState, useEffect, useRef } from 'react';

'use client';


interface ScrollingTaglinesProps {
  taglines: string[];
  intervalMs?: number; // Pause after typing before deleting
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character when deleting
}


export default function ScrollingTaglines({
  taglines,
  intervalMs = 1500,
  typingSpeed = 250,
  deletingSpeed = 100,
}: ScrollingTaglinesProps) {
  const LINES = 7;
  // Fill with first 7 taglines, repeating if not enough
  const initialLines = Array(LINES)
    .fill('')
    .map((_, i) => taglines.length > 0 ? taglines[i % taglines.length] : '');
  const [lines, setLines] = useState<string[]>(initialLines);
  const [phase, setPhase] = useState<'deleting' | 'waitingAfterDelete' | 'shifting' | 'typing' | 'waiting'>('deleting');
  const [cursorVisible, setCursorVisible] = useState(true);
  const taglineIndex = useRef(taglines.length > 0 ? taglines.length - 1 : 0);
  const charIndex = useRef(0);

  // How long to wait after deleting before shifting/typing
  const waitAfterDeleteMs = 600;

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // Main animation effect
  useEffect(() => {
    if (taglines.length === 0) return;

    if (phase === 'deleting') {
      // Delete last line one char at a time
      const lastLine = lines[LINES - 1];
      if (lastLine.length > 0) {
        const timeout = setTimeout(() => {
          setLines(prev => {
            const newLines = [...prev];
            newLines[LINES - 1] = newLines[LINES - 1].slice(0, -1);
            return newLines;
          });
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setPhase('waitingAfterDelete');
      }
    } else if (phase === 'waitingAfterDelete') {
      // Wait before shifting/typing
      const timeout = setTimeout(() => {
        setPhase('shifting');
      }, waitAfterDeleteMs);
      return () => clearTimeout(timeout);
    } else if (phase === 'shifting') {
      // Shift all lines down, insert empty at top
      setLines(prev => {
        const newLines = [ '', ...prev.slice(0, LINES - 1) ];
        return newLines;
      });
      charIndex.current = 0;
      setPhase('typing');
    } else if (phase === 'typing') {
      // Type new tagline at the top (backwards through the list)
      const tagline = taglines[taglineIndex.current];
      if (charIndex.current < tagline.length) {
        const timeout = setTimeout(() => {
          setLines(prev => {
            const newLines = [...prev];
            newLines[0] = tagline.slice(0, charIndex.current + 1);
            return newLines;
          });
          charIndex.current++;
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setPhase('waiting');
      }
    } else if (phase === 'waiting') {
      // Wait before starting to delete again
      const timeout = setTimeout(() => {
        // Go backwards through the taglines list
        taglineIndex.current = (taglineIndex.current - 1 + taglines.length) % taglines.length;
        setPhase('deleting');
      }, intervalMs);
      return () => clearTimeout(timeout);
    }
  }, [phase, lines, taglines, intervalMs, typingSpeed, deletingSpeed]);

  return (
    <div className="relative">
      <div className="flex flex-col justify-end h-full gap-2 md:gap-6 lg:gap-12">
        {lines.map((text, idx) => (
          <div
            key={idx}
            className={`h-6 md:h-8 flex items-center justify-center md:justify-start text-base md:text-2xl lg:text-[36px] ${idx === 3 ? 'text-secondary2 font-bold underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8' : 'text-secondary1'}`}
            style={{ minHeight: '1.5rem', fontFamily: 'monospace', whiteSpace: 'pre' }}
          >
            {text}
            {/* Show cursor on top line during typing, and on bottom line during deleting */}
            {((idx === 0 && cursorVisible && phase === 'typing') || (idx === LINES - 1 && cursorVisible && phase === 'deleting')) && (
              <span className="ml-1 animate-pulse text-secondary3">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}