import { useEffect, useRef, useState } from 'react';

const TARGET = 1_000_000;
const FINAL_VALUE = '1million +';
const FINAL_LABEL = 'project impact';
const COUNT_DURATION = 2800;
const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const SCRAMBLE_TICK = 55;

/** Ease-out quint: fast off the line, long soft landing on the target. */
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/**
 * Builds the decrypting label: characters lock in left to right as the count
 * advances, so "project impact" has fully resolved by the time the number does.
 */
const scrambleLabel = (progress: number, seed: number) => {
  const locked = Math.floor((progress / 0.92) * FINAL_LABEL.length);
  let out = '';
  for (let i = 0; i < FINAL_LABEL.length; i += 1) {
    const char = FINAL_LABEL[i];
    if (char === ' ' || i < locked) {
      out += char;
    } else {
      out += SCRAMBLE_CHARS[(seed + i * 7) % SCRAMBLE_CHARS.length];
    }
  }
  return out;
};

/**
 * Bottom-left impact metric. Counts up to 1,000,000 once per page load, then
 * cross-dissolves into the "1million +" wordmark instead of snapping to it.
 */
const AnimatedImpactStat = () => {
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState(() => scrambleLabel(0, 0));
  const [settled, setSettled] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    // Strict mode mounts twice in dev; the entrance plays exactly once.
    if (hasRun.current) return;
    hasRun.current = true;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setValue(TARGET);
      setLabel(FINAL_LABEL);
      setSettled(true);
      return;
    }

    let frame = 0;
    let start = 0;
    let lastScramble = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const linear = Math.min(elapsed / COUNT_DURATION, 1);
      const eased = easeOutQuint(linear);

      setValue(Math.round(TARGET * eased));

      if (linear >= 1) {
        setLabel(FINAL_LABEL);
        setSettled(true);
        return;
      }

      if (now - lastScramble > SCRAMBLE_TICK) {
        lastScramble = now;
        setLabel(scrambleLabel(eased, Math.floor(now / SCRAMBLE_TICK)));
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-10">
      <div className="flex items-center gap-4">
        {/*
          Both readouts share one grid cell, so the block is always as wide as
          the widest of them and the diagonal rule never shifts mid-count.
        */}
        <div className="grid text-4xl md:text-5xl font-medium tracking-tight tabular-nums text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <span
            aria-hidden={settled}
            className={`col-start-1 row-start-1 whitespace-nowrap transition-[opacity,filter,transform] duration-700 ease-out ${
              settled
                ? 'opacity-0 blur-[6px] scale-[0.97]'
                : 'opacity-100 blur-0 scale-100'
            }`}
          >
            {value.toLocaleString('en-US')}
          </span>
          <span
            aria-hidden={!settled}
            className={`col-start-1 row-start-1 whitespace-nowrap transition-[opacity,filter,transform] duration-700 ease-out ${
              settled
                ? 'opacity-100 blur-0 scale-100'
                : 'opacity-0 blur-[6px] scale-[1.03]'
            }`}
          >
            {FINAL_VALUE}
          </span>
        </div>
        <span className="hidden md:block h-px w-24 bg-white/50 rotate-[-20deg] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
      </div>
      <p className="mt-1 text-xs md:text-sm tracking-[0.02em] text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
        {label}
      </p>
      <span className="sr-only">1 million plus project impact</span>
    </div>
  );
};

export default AnimatedImpactStat;
