import { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import SystemCard, { type JourneySystem } from './SystemCard';

interface Segment {
  /** connector line from one stop to the next, in px within the journey container */
  d: string;
  /** arrowhead at the end of the line */
  head: string;
  /** where the line leaves the card it starts from */
  start: [number, number];
  /** scroll progress (0-1 of the container height) over which the line draws */
  draw: [number, number];
  /** scroll progress over which the stop the arrow lands on lights up */
  reveal: [number, number];
}

// breathing room between a card edge and the line, and the radius of the line's bend
const GAP = 12;
const RADIUS = 40;

const px = (n: number) => n.toFixed(1);

function buildSegments(container: HTMLElement, cards: HTMLElement[]): Segment[] {
  const height = container.offsetHeight;
  if (!height) return [];

  const segments: Segment[] = [];
  for (let i = 0; i < cards.length - 1; i++) {
    const from = cards[i];
    const to = cards[i + 1];
    const fromLeft = from.offsetLeft;
    const fromRight = fromLeft + from.offsetWidth;
    const endX = to.offsetLeft + to.offsetWidth / 2;
    const endY = to.offsetTop - GAP;

    let startX: number;
    let startY: number;
    let d: string;
    if (endX > fromLeft && endX < fromRight) {
      // stacked in one column (small screens): a straight drop between the two cards
      startX = endX;
      startY = from.offsetTop + from.offsetHeight + GAP;
      d = `M ${px(startX)} ${px(startY)} V ${px(endY)}`;
    } else {
      // zigzag: out of the card's inner side, then bending down into the top of the next card
      const dir = endX > fromRight ? 1 : -1;
      startX = dir === 1 ? fromRight + GAP : fromLeft - GAP;
      startY = from.offsetTop + from.offsetHeight / 2;
      const r = Math.max(0, Math.min(RADIUS, Math.abs(endX - startX), endY - startY));
      d = `M ${px(startX)} ${px(startY)} H ${px(endX - dir * r)} Q ${px(endX)} ${px(startY)} ${px(endX)} ${px(startY + r)} V ${px(endY)}`;
    }

    segments.push({
      d,
      head: `M ${px(endX - 8)} ${px(endY - 10)} L ${px(endX)} ${px(endY)} L ${px(endX + 8)} ${px(endY - 10)}`,
      start: [startX, startY],
      draw: [startY / height, endY / height],
      reveal: [(endY - 90) / height, endY / height],
    });
  }
  return segments;
}

function Connector({
  segment,
  progress,
  still,
}: {
  segment: Segment;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const trackRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const drawn = useTransform(progress, segment.draw, [0, 1]);
  const lineOpacity = useTransform(drawn, [0, 0.02], [0, 1]);
  const headOpacity = useTransform(drawn, [0.9, 1], [0, 1]);

  // a glowing dot rides the leading edge of the line while it draws
  useMotionValueEvent(drawn, 'change', (v) => {
    const track = trackRef.current;
    const dot = dotRef.current;
    if (!track || !dot || still) return;
    const point = track.getPointAtLength(v * track.getTotalLength());
    dot.setAttribute('cx', px(point.x));
    dot.setAttribute('cy', px(point.y));
    dot.style.opacity = v > 0.01 && v < 0.985 ? '1' : '0';
  });

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* faint track showing where the journey goes next */}
      <path ref={trackRef} d={segment.d} stroke="#4a5d23" strokeOpacity={0.16} strokeWidth={2} />
      <path d={segment.head} stroke="#4a5d23" strokeOpacity={0.16} strokeWidth={2} />
      <motion.path
        d={segment.d}
        stroke="#4a5d23"
        strokeWidth={2.5}
        style={still ? undefined : { pathLength: drawn, opacity: lineOpacity }}
      />
      <motion.path
        d={segment.head}
        stroke="#4a5d23"
        strokeWidth={2.5}
        style={still ? undefined : { opacity: headOpacity }}
      />
      {/* hollow ring where the line leaves its card, as on the landing page's step threads */}
      <circle
        cx={segment.start[0]}
        cy={segment.start[1]}
        r={4.5}
        fill="#f5f5f0"
        stroke="#4a5d23"
        strokeWidth={1.5}
        strokeOpacity={0.55}
      />
      <circle
        ref={dotRef}
        r={5}
        fill="#8ba05f"
        stroke="#fbfbf9"
        strokeWidth={2}
        style={{ opacity: 0, filter: 'drop-shadow(0 0 6px rgba(139,160,95,0.95))' }}
      />
    </g>
  );
}

function Stop({
  system,
  progress,
  reveal,
  onSelect,
}: {
  system: JourneySystem;
  progress: MotionValue<number>;
  /** undefined for the first stop (and before layout is measured): always lit */
  reveal?: [number, number];
  onSelect: () => void;
}) {
  const opacity = useTransform(progress, reveal ?? [-1, -0.5], [0.4, 1]);

  return <SystemCard system={system} onSelect={onSelect} style={{ opacity }} />;
}

/**
 * The systems as a journey map: stops alternate left and right (stacked on small screens), joined
 * by arrows that draw themselves as the page scrolls past them.
 */
export default function SystemsJourney({
  systems,
  onSelect,
}: {
  systems: JourneySystem[];
  onSelect: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const still = useReducedMotion() ?? false;

  // 0 when the top of the map crosses a line 70% down the viewport, 1 when its bottom does, so
  // progress x container height is how far down the map that line currently sits
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.7'],
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // fires once on observe, then whenever the layout (and so the line geometry) changes
    const observer = new ResizeObserver(() => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
      setSegments(buildSegments(container, cards));
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [systems.length]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-6xl">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        {segments.map((segment) => (
          // keyed by geometry so the scroll ranges are rebuilt when the layout changes
          <Connector key={segment.d} segment={segment} progress={scrollYProgress} still={still} />
        ))}
      </svg>

      <ol>
        {systems.map((system, i) => {
          const reveal = still || i === 0 ? undefined : segments[i - 1]?.reveal;
          return (
            <li
              key={system.num}
              className={`flex ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} ${i === 0 ? '' : 'mt-16 lg:-mt-20'}`}
            >
              {/* static wrapper: its offsets are what the connector geometry is measured from */}
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="w-full lg:w-[44%]"
              >
                <Stop
                  key={reveal ? reveal.join('-') : 'lit'}
                  system={system}
                  progress={scrollYProgress}
                  reveal={reveal}
                  onSelect={() => {
                    onSelect(i);
                  }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
