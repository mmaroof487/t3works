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
import { scrollByAnimated } from '../lib/scrollToSection';

// Phones: the section pins while the page scrolls STEP_SCROLL per step. Each next card slides in
// from the right and lands on the pile; the cards beneath shrink and rise a little so their top
// edges show. Positions below are in steps: 0 = first card, count - 1 = last card landed.
const STEP_SCROLL = '70svh';
// keeps the pile clear of the nav pill fixed to the bottom of the screen
const NAV_RESERVE = '5.25rem';
// the progress bar never gets closer to the top of the screen than this (px)
const BAR_MARGIN = 10;
const PEEK_REM = 0.75;
const PEEK_SHRINK = 0.045;
// only the nearest few cards beneath show their edges, however many are stacked
const MAX_PEEK = 3;
// a horizontal swipe has to travel this far (px), and mostly sideways, to change card
const SWIPE_MIN = 48;
// tighter card spacing than the grid's, so a whole card fits a short phone screen under the bar;
// the round number badge takes the accent colour
const STACK_CARD_CLASS = cn(
  JOURNEY_CARD_CLASS,
  'pb-5 pt-14 [&>p:last-of-type]:mb-4 [&>p:last-of-type]:text-sm [&>span.rounded-full]:bg-[var(--accent)] [&>span.rounded-full]:text-[var(--accent-ink)] [&>span]:opacity-[var(--overhang)] [&>ul>li]:py-2'
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
  index: number;
  count: number;
  position: MotionValue<number>;
  className?: string;
  children: ReactNode;
}

function StackCard({ index, count, position, className, children }: CardProps) {
  const x = useTransform(position, (p) => `${String((1 - landed(index, p)) * 100)}vw`);
  const peek = (p: number) => Math.min(buried(index, count, p), MAX_PEEK);
  const y = useTransform(position, (p) => `${String(-peek(p) * PEEK_REM)}rem`);
  const scale = useTransform(position, (p) => 1 - peek(p) * PEEK_SHRINK);
  // the number badge and icon tile overhang the card, so they fade out once it is covered
  const overhang = useTransform(
    position,
    (p) => 1 - clamp01((buried(index, count, p) - 0.55) / 0.4)
  );

  return (
    <motion.li
      style={{ x, y, scale, transformOrigin: '50% 0%', '--overhang': overhang } as MotionStyle}
      className={cn('will-change-transform [grid-area:1/1]', className)}
    >
      {children}
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
    <div
      aria-hidden="true"
      className={cn('relative mx-auto h-[1.375rem]', count > 6 ? 'w-64' : 'w-44')}
    >
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

interface StackProps {
  count: number;
  /** the content of card `index`; the wrapper around it only moves and layers the cards */
  renderCard: (index: number) => ReactNode;
  /** the section's heading block, pinned above the progress bar while it fits the screen */
  heading: ReactNode;
  /** colour of the progress bar and the cards' number badges */
  accent?: string;
  /** number colour on the badges */
  accentInk?: string;
  /** styling for each card's wrapper */
  cardClassName?: string;
  /** page scroll per step, as a CSS length */
  stepScroll?: string;
  /** let a horizontal swipe on the pile step to the next or previous card */
  swipe?: boolean;
}

/** A pinned pile of cards that slide in one by one as the page scrolls. */
export function PinnedStack({
  count,
  renderCard,
  heading,
  accent = '#4a5d23',
  accentInk = '#fff',
  cardClassName,
  stepScroll = STEP_SCROLL,
  swipe = false,
}: StackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
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
    const bar = barRef.current;
    if (!track || !stage || !bar) return;
    const fit = () => {
      const height = `${String(stage.offsetHeight)}px`;
      track.style.height = `calc(${height} + ${String(count - 1)} * ${stepScroll})`;
      // taller than the screen: pin by the bottom edge, so the heading scrolls off and the pile
      // stays, but never so far that the progress bar leaves the screen
      const barOnScreen = `${String(BAR_MARGIN - bar.offsetTop)}px`;
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
  }, [measure, count, stepScroll]);

  // A sideways swipe is the same as scrolling one step: the page scroll drives the pile, so we
  // scroll the page by the distance between here and the neighbouring card.
  const endSwipe = (event: React.TouchEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    const touch = event.changedTouches[0] as React.Touch | undefined;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!start || !touch || !track || !stage) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    // before the stage pins, scrolling would only move the page, not the pile
    if (stage.getBoundingClientRect().top > parseFloat(getComputedStyle(stage).top) + 4) return;

    const here = target.get();
    const next = Math.min(count - 1, Math.max(0, Math.round(here) + (dx < 0 ? 1 : -1)));
    if (next === here) return;
    const travel = track.offsetHeight - stage.offsetHeight;
    scrollByAnimated(((next - here) / (count - 1)) * travel, 450);
  };

  return (
    <div ref={trackRef}>
      <div
        ref={stageRef}
        className="sticky"
        style={{ '--accent': accent, '--accent-ink': accentInk } as React.CSSProperties}
      >
        {heading}
        <div ref={barRef}>
          <ProgressBar count={count} position={position} />
        </div>
        <ol
          className={cn('mx-auto grid max-w-md pt-11', swipe && 'touch-pan-y')}
          onTouchStart={
            swipe
              ? (event) => {
                  const touch = event.touches[0] as React.Touch | undefined;
                  swipeStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
                }
              : undefined
          }
          onTouchEnd={swipe ? endSwipe : undefined}
        >
          {Array.from({ length: count }, (_, index) => (
            <StackCard
              key={index}
              index={index}
              count={count}
              position={position}
              className={cardClassName}
            >
              {renderCard(index)}
            </StackCard>
          ))}
        </ol>
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

export default function PinnedJourney({ steps, heading, accent, accentInk }: Props) {
  return (
    <PinnedStack
      count={steps.length}
      heading={heading}
      accent={accent}
      accentInk={accentInk}
      cardClassName={STACK_CARD_CLASS}
      renderCard={(index) => <JourneyCardBody step={steps[index]} thread={false} />}
    />
  );
}
