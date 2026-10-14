import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { smoothScroller } from '../lib/smoothScroller';

// C1-C6 assessment bands with illustrative (not real) cohort numbers; C1 is a perfect score
const BANDS = [
  { score: '=100%', band: 'C1', students: 2, tone: 'elite' },
  { score: '>80%', band: 'C2.1', students: 12, tone: 'top' },
  { score: '>70%', band: 'C2.2', students: 10, tone: 'top' },
  { score: '>60%', band: 'C3.1', students: 1, tone: 'top' },
  { score: '>50%', band: 'C3.2', students: 4, tone: 'mid' },
  { score: '>40%', band: 'C4', students: 47, tone: 'mid' },
  { score: '>20%', band: 'C5.1', students: 43, tone: 'low' },
  { score: '=20%', band: 'C5.2', students: 9, tone: 'low' },
  { score: '<20%', band: 'C6', students: 246, tone: 'out' },
] as const;

const TOTAL = BANDS.reduce((sum, r) => sum + r.students, 0);

const TONE: Record<(typeof BANDS)[number]['tone'], string> = {
  elite: 'bg-[#4a5d23] text-white',
  top: 'bg-[#92c25a] text-[#1f2a0c]',
  mid: 'bg-[#f6d77a] text-[#3d2f05]',
  low: 'bg-[#ebc1bf] text-[#4a1f1c]',
  out: 'bg-[#d93a32] text-white',
};

// with the running total ("Count") filled in
const ROWS = BANDS.map((row, i) => ({
  ...row,
  count: BANDS.slice(0, i + 1).reduce((sum, r) => sum + r.students, 0),
}));

const pct = (n: number) => `${((n / TOTAL) * 100).toFixed(1)}%`;

function GradingDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  // whether the table is taller than the room it has. Only then does it take the wheel from the
  // page (Lenis) and hold the scroll to itself; otherwise scrolling over it scrolls the page.
  const [scrolls, setScrolls] = useState(false);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const check = () => {
      setScrolls(body.scrollHeight > body.clientHeight + 1);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(body);
    return () => {
      observer.disconnect();
    };
  }, []);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // As with the leadership profiles, the overlay only covers the funnel artwork and the page stays
  // scrollable, so bring the table on screen: its middle to the middle of the screen the nav pill
  // leaves free (the pill is at the top from lg, at the bottom below). It goes through Lenis, which
  // would otherwise snap a direct window scroll back to the target it is still easing towards.
  useEffect(() => {
    const dialog = overlayRef.current?.querySelector('[role="dialog"]');
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const navShift = (window.innerWidth >= 1024 ? 3 : -2.5) * rem;
    const distance = rect.top + rect.height / 2 - (window.innerHeight / 2 + navShift);
    const target = window.scrollY + distance;
    const lenis = smoothScroller.current;
    if (lenis) {
      lenis.scrollTo(target, {
        immediate: reduceMotion,
        duration: 0.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [reduceMotion]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 cursor-pointer backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-labelledby={titleId}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 30 }}
        transition={
          reduceMotion ? { duration: 0.15 } : { type: 'spring', damping: 30, stiffness: 300 }
        }
        className="relative z-10 flex max-h-[min(90dvh,100%)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] shadow-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#4a5d23]/10 bg-gradient-to-br from-[#f3f5ea] to-[#e9eedb] px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#4a5d23]">
              Phase 2 · Assessments
            </p>
            <h2
              id={titleId}
              className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[1.75rem]"
            >
              C1 to C6 Grading
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              How {TOTAL} candidates scored across the C1-C6 assessment bands.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-gray-600 transition-colors hover:bg-[#4a5d23] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23]"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        <div
          ref={bodyRef}
          data-lenis-prevent={scrolls || undefined}
          className={`min-h-0 overflow-auto p-3 sm:p-7 ${scrolls ? 'overscroll-contain' : ''}`}
        >
          <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-black/[0.08] text-center text-[0.8125rem] tabular-nums sm:text-[0.9375rem]">
            <thead>
              <tr className="bg-[#4a5d23] text-white">
                {['Score %', 'Band', 'Students', '%', 'Count', 'Cuml. %'].map((h) => (
                  <th key={h} scope="col" className="px-1 py-2.5 sm:px-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.band} className={i % 2 ? 'bg-black/[0.025]' : 'bg-white'}>
                  <th
                    scope="row"
                    className="border-t border-black/[0.06] px-1 py-2.5 sm:px-3 font-medium text-gray-700"
                  >
                    {row.score}
                  </th>
                  <td className="border-t border-black/[0.06] px-1 py-2 sm:px-3">
                    <span
                      className={`inline-flex min-w-[2.75rem] justify-center rounded-md px-1.5 py-1 sm:min-w-[3.75rem] sm:px-2 font-bold ${TONE[row.tone]}`}
                    >
                      {row.band}
                    </span>
                  </td>
                  <td className="border-t border-black/[0.06] px-1 py-2.5 sm:px-3 font-semibold text-gray-900">
                    {row.students}
                  </td>
                  <td className="border-t border-black/[0.06] px-1 py-2.5 sm:px-3 text-gray-700">
                    {pct(row.students)}
                  </td>
                  <td className="border-t border-black/[0.06] px-1 py-2.5 sm:px-3 text-gray-700">
                    {row.count}
                  </td>
                  <td className="border-t border-black/[0.06] px-1 py-2.5 sm:px-3 font-medium text-gray-900">
                    {pct(row.count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * An invisible button laid exactly over the Phase 2 label drawn into the funnel artwork, so the
 * label looks unchanged; it lights up on hover and focus and opens the grading table.
 */
interface Props {
  /** position and size over the drawn label */
  className?: string;
  /** size of the small info badge on the label's corner, in the artwork's cqw */
  badgeClassName?: string;
}

export default function GradingTable({ className = '', badgeClassName = '' }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-label="Phase 2: C1-C6 Assessments & Hackathon. View the C1 to C6 grading"
        title="View C1 to C6 grading"
        onClick={() => {
          setOpen(true);
        }}
        className={`grading-hint absolute cursor-pointer transition-[backdrop-filter,box-shadow] duration-200 hover:backdrop-brightness-[1.15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b27a] ${className}`}
      >
        {/* small gold "i" badge on the corner, a quiet cue that this label opens more detail */}
        <span
          aria-hidden="true"
          className={`absolute right-0 top-0 grid translate-x-1/3 -translate-y-1/3 place-items-center rounded-full border border-[#c9b27a]/70 bg-[#fbfbf9] text-[#4a5d23] ${badgeClassName}`}
        >
          <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="currentColor">
            <circle cx="12" cy="6.5" r="2.1" />
            <rect x="10.2" y="10" width="3.6" height="9.5" rx="1.4" />
          </svg>
        </span>
      </button>
      {/* laid over the funnel artwork the button sits in, not the whole page */}
      <AnimatePresence>{open && <GradingDialog onClose={close} />}</AnimatePresence>
    </>
  );
}
