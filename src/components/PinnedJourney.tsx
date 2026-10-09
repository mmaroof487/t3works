import { useCallback, useLayoutEffect, useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import { JOURNEY_CARD_CLASS, JourneyCardBody, type JourneyStep } from './JourneyCards';
import { cn } from '../lib/cn';

// Phones: the section pins while the page scrolls STEP_SCROLL per step. Each next card slides in
// from the right and lands on the pile; the cards beneath shrink and rise a little so their top
// edges show. Positions below are in steps: 0 = first card, count - 1 = last card landed.
const STEP_SCROLL = '70svh';
// keeps the pile clear of the nav pill fixed to the bottom of the screen
const NAV_RESERVE_REM = 5.25;
const NAV_RESERVE = `${String(NAV_RESERVE_REM)}rem`;
// The stage is laid out for a phone this wide (px) and zoomed to the real width, so every phone
// gets the same line breaks. If it is then taller than the room above the nav pill it zooms out
// further, down to MIN_ZOOM; past that the heading scrolls off instead (see `fit`).
const DESIGN_WIDTH = 393;
const MIN_ZOOM = 0.75;
const MAX_ZOOM = 1.3;
// gap kept between the top of the screen and a stage that only just fits
const EDGE_REM = 0.5;
// the progress bar never gets closer to the top of the screen than this (px)
const BAR_MARGIN = 10;
const PEEK_REM = 0.75;
const PEEK_SHRINK = 0.045;
// tighter card spacing than the grid's, so a whole card fits a short phone screen under the bar;
// the round number badge takes the accent colour
const STACK_CARD_CLASS = cn(
  JOURNEY_CARD_CLASS,
  'pb-5 pt-14 will-change-transform [grid-area:1/1] [&>p:last-of-type]:mb-4 [&>p:last-of-type]:text-sm [&>span.rounded-full]:bg-[var(--accent)] [&>span.rounded-full]:text-[var(--accent-ink)] [&>span]:opacity-[var(--overhang)] [&>ul>li]:py-2'
);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// 0 = still off to the right, 1 = landed. A card travels during the middle of its step, so each
// one rests on top for a moment before the next starts moving.
function landed(index: number, position: number) {
  if (index === 0) return 1;
  const t = clamp01((position - index + 0.8) / 0.6);
  return 1 - Math.pow(1 - t, 3);
}

// how many cards lie on top of this one
function buried(index: number, count: number, position: number) {
  let cards = 0;
  for (let above = index + 1; above < count; above++) cards += landed(above, position);
  return cards;
}

interface CardProps {
  step: JourneyStep;
  index: number;
  count: number;
  position: MotionValue<number>;
  /** the stage's zoom, which the slide-in distance has to undo to stay a full screen wide */
  zoom: MotionValue<number>;
}

function StackCard({ step, index, count, position, zoom }: CardProps) {
  const x = useTransform(
    () => `${String(((1 - landed(index, position.get())) * 100) / zoom.get())}vw`
  );
  const y = useTransform(position, (p) => `${String(-buried(index, count, p) * PEEK_REM)}rem`);
  const scale = useTransform(position, (p) => 1 - buried(index, count, p) * PEEK_SHRINK);
  // the number badge and icon tile overhang the card, so they fade out once it is covered
  const overhang = useTransform(
    position,
    (p) => 1 - clamp01((buried(index, count, p) - 0.55) / 0.4)
  );

  return (
    <motion.li
      style={{ x, y, scale, transformOrigin: '50% 0%', '--overhang': overhang } as MotionStyle}
      className={STACK_CARD_CLASS}
    >
      <JourneyCardBody step={step} thread={false} />
    </motion.li>
  );
}

function ProgressDot({ index, position }: { index: number; position: MotionValue<number> }) {
  const fill = useTransform(position, (p) => (index === 0 ? 1 : clamp01((p - index + 0.3) / 0.2)));

  return (
    <span className="relative h-[1.375rem] w-[1.375rem] rounded-full border-2 border-[var(--accent)] bg-[#f5f5f0]">
      <motion.span
        style={{ scale: fill, opacity: fill }}
        className="absolute inset-0 rounded-full bg-[var(--accent)]"
      />
    </span>
  );
}

function ProgressBar({ count, position }: { count: number; position: MotionValue<number> }) {
  const line = useTransform(position, (p) => clamp01(p / (count - 1)));

  return (
    <div aria-hidden="true" className="relative mx-auto h-[1.375rem] w-44">
      <span className="absolute inset-x-[0.6875rem] top-1/2 h-0.5 -translate-y-1/2 bg-[var(--accent)] opacity-25" />
      <motion.span
        style={{ scaleX: line }}
        className="absolute inset-x-[0.6875rem] top-1/2 h-0.5 origin-left -translate-y-1/2 bg-[var(--accent)]"
      />
      <div className="relative flex h-full items-center justify-between">
        {Array.from({ length: count }, (_, index) => (
          <ProgressDot key={index} index={index} position={position} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  steps: JourneyStep[];
  /** the section's heading block, pinned above the progress bar while it fits the screen */
  heading: ReactNode;
  /** colour of the progress bar and the cards' number badges */
  accent?: string;
  /** number colour on the badges */
  accentInk?: string;
}

export default function PinnedJourney({
  steps,
  heading,
  accent = '#4a5d23',
  accentInk = '#fff',
}: Props) {
  const count = steps.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const zoom = useMotionValue(1);
  const target = useMotionValue(0);
  const position = useSpring(target, { stiffness: 220, damping: 30, mass: 0.5 });
  const { scrollY } = useScroll();

  // the stage sticks inside the taller track; how far it has slid down the track is the progress
  const measure = useCallback(() => {
    const track = trackRef.current?.getBoundingClientRect();
    const stage = stageRef.current?.getBoundingClientRect();
    if (!track || !stage) return;
    const travel = track.height - stage.height;
    target.set(travel > 0 ? clamp01((stage.top - track.top) / travel) * (count - 1) : 0);
  }, [target, count]);

  useMotionValueEvent(scrollY, 'change', measure);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    const bar = barRef.current;
    if (!track || !stage || !content || !bar) return;
    const fit = () => {
      const root = document.documentElement;
      const room =
        root.clientHeight -
        (NAV_RESERVE_REM + EDGE_REM) * parseFloat(getComputedStyle(root).fontSize);
      const fitsAt = (value: number) => {
        content.style.setProperty('zoom', String(value));
        return stage.offsetHeight <= room;
      };
      // the largest zoom, up to the one that matches the design width, at which the stage fits
      let best = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, root.clientWidth / DESIGN_WIDTH));
      if (!fitsAt(best)) {
        let tooBig = best;
        best = MIN_ZOOM;
        for (let pass = 0; pass < 5; pass++) {
          const mid = (best + tooBig) / 2;
          if (fitsAt(mid)) best = mid;
          else tooBig = mid;
        }
        content.style.setProperty('zoom', String(best));
      }
      zoom.set(best);

      const height = `${String(stage.offsetHeight)}px`;
      track.style.height = `calc(${height} + ${String(count - 1)} * ${STEP_SCROLL})`;
      // taller than the screen: pin by the bottom edge, so the heading scrolls off and the pile
      // stays, but never so far that the progress bar leaves the screen
      const barTop = bar.getBoundingClientRect().top - stage.getBoundingClientRect().top;
      const barOnScreen = `${String(BAR_MARGIN - barTop)}px`;
      stage.style.top = `max(${barOnScreen}, min(1.5rem, calc(100svh - ${height} - ${NAV_RESERVE})))`;
      measure();
    };
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    window.addEventListener('resize', fit);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [measure, count, zoom]);

  return (
    <div ref={trackRef}>
      <div
        ref={stageRef}
        className="sticky"
        style={{ '--accent': accent, '--accent-ink': accentInk } as React.CSSProperties}
      >
        {/* zoomed as one block (see `fit`); kept off the sticky element so its `top` stays in
            screen pixels */}
        <div ref={contentRef}>
          {heading}
          <div ref={barRef}>
            <ProgressBar count={count} position={position} />
          </div>
          <ol className="mx-auto grid max-w-md pt-11">
            {steps.map((step, index) => (
              <StackCard
                key={step.id}
                step={step}
                index={index}
                count={count}
                position={position}
                zoom={zoom}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
