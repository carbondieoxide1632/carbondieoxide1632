import { useEffect, useRef, useState } from 'react';

/** how long the digits roll before they settle on the milestone */
const COUNT_DURATION = 2800;
/** how long the digits take to dissolve into the "1million +" wordmark */
const CROSSFADE_DURATION = 700;

const TARGET = 1_000_000;
const FINAL_NUMBER = '1million +';
/** widest string the counter can ever render — keeps the box from resizing */
const WIDTH_ANCHOR = '1,000,000';
const FINAL_LABEL = 'project impact';
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz';

/** decelerating curve: fast off the line, feather-soft into the milestone */
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Scrambles FINAL_LABEL, locking characters in from left to right as the
 * count-up progresses. At progress 1 the label is fully deciphered.
 */
const scrambleLabel = (progress: number) => {
  const locked = Math.floor(progress * FINAL_LABEL.length);
  let out = '';
  for (let i = 0; i < FINAL_LABEL.length; i += 1) {
    const char = FINAL_LABEL[i];
    if (char === ' ' || i < locked) {
      out += char;
    } else {
      out += randomGlyph();
    }
  }
  return out;
};

/**
 * "1million +" impact stat. Plays exactly once per page load: the number rolls
 * up to one million on a decelerating curve while the label decodes itself,
 * then the digits dissolve into the wordmark. Afterwards it stays settled —
 * no looping.
 */
export default function AnimatedImpactStat() {
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState(() => scrambleLabel(0));
  const [settled, setSettled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setValue(TARGET);
      setLabel(FINAL_LABEL);
      setSettled(true);
      return;
    }

    const start = performance.now();
    let lastScramble = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      const eased = easeOutQuint(progress);

      setValue(Math.round(eased * TARGET));

      // re-roll the unlocked characters on their own slower cadence so the
      // label reads as decoding rather than flickering
      if (now - lastScramble > 45) {
        lastScramble = now;
        setLabel(scrambleLabel(eased));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      setValue(TARGET);
      setLabel(FINAL_LABEL);
      setSettled(true);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="text-left">
      {/*
        Both readings share one grid cell alongside an invisible width anchor,
        so the block never reflows while the digits roll or dissolve.
      */}
      <div className="grid hero-title text-4xl md:text-5xl font-medium tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 invisible tabular-nums"
        >
          {WIDTH_ANCHOR}
        </span>
        <span
          aria-hidden="true"
          className={`col-start-1 row-start-1 tabular-nums transition-all ease-out ${
            settled
              ? 'opacity-0 blur-[6px] scale-[0.97]'
              : 'opacity-100 blur-0 scale-100'
          }`}
          style={{ transitionDuration: `${CROSSFADE_DURATION}ms` }}
        >
          {value.toLocaleString('en-US')}
        </span>
        <span
          className={`col-start-1 row-start-1 transition-all ease-out ${
            settled
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-[6px] scale-[1.03]'
          }`}
          style={{ transitionDuration: `${CROSSFADE_DURATION}ms` }}
        >
          {FINAL_NUMBER}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
        <span className="text-xs md:text-sm text-white/70 tabular-nums tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {label}
        </span>
      </div>

      {/* screen readers get the resolved value, never the scrambled frames */}
      <span className="sr-only">1 million plus project impact</span>
    </div>
  );
}
