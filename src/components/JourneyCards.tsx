import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// solid briefcase, matching the filled icons in the design
export function SolidBriefcase({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M8.5 6.5V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="2" y="6" width="20" height="14.5" rx="2.5" fill="currentColor" />
      <path d="M2 12.2c6.2 2.5 13.8 2.5 20 0" fill="none" stroke="#fff" strokeWidth="1.1" />
      <rect x="10.6" y="11.6" width="2.8" height="3.2" rx="0.7" fill="#fff" />
    </svg>
  );
}

export interface JourneyStep {
  id: string;
  icon: IconType;
  /** fill the icon instead of stroking it */
  solid?: boolean;
  title: string;
  /** small uppercase line under the title */
  kicker?: string;
  description: string;
  highlights: string[];
  link?: { label: string; to: string };
}

// Card geometry (px), shared by the notch, badge and thread below.
const PAGE_BG = '#f5f5f0';
const TILE = 72;
// scooped notch in the card's top edge, centred, that the icon tile sits in
const NOTCH_W = 128;
const NOTCH_D = 44;
const GAP = 24; // must match the grid's gap-x-6
// the badge is centred on the middle of the card's rounded top-left corner
const BADGE = 36;
const BADGE_INSET = 8;
// thread: starts at a hollow ring just right of the notch and runs into the next card's number badge
const RING = 10;
const START_X = NOTCH_W / 2 + 12; // ring centre, px right of the card's centre line
const END_X = GAP + BADGE_INSET; // next badge's centre, px right of this card's edge

// sizes are authored in px but emitted in rem so they scale with the root font size
const rem = (px: number) => `${String(px / 16)}rem`;

const RING_CLASS =
  'absolute z-10 hidden rounded-full border-[1.5px] border-[#2f3b16] bg-[#f5f5f0] xl:block';
const NOTCH_CURVE = `C20 0 18 ${String(NOTCH_D)} 46 ${String(NOTCH_D)}H82C110 ${String(NOTCH_D)} 108 0 ${String(NOTCH_W)} 0`;

interface Props {
  steps: JourneyStep[];
  /** grid column classes, e.g. "sm:grid-cols-2 lg:grid-cols-4" */
  className?: string;
}

export const JOURNEY_CARD_CLASS =
  'relative flex flex-col rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] px-6 pb-6 pt-[4.25rem] shadow-sm';

// everything inside one card; `thread` draws the connector towards the next card (wide screens)
export function JourneyCardBody({ step, thread }: { step: JourneyStep; thread: boolean }) {
  const { id, icon: Icon, solid, title, kicker, description, highlights, link } = step;
  return (
    <>
      {/* notch: the page colour scoops into the card's top edge around the icon */}
      <svg
        aria-hidden="true"
        viewBox={`0 -2 ${String(NOTCH_W)} ${String(NOTCH_D + 3)}`}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: rem(-2), width: rem(NOTCH_W), height: rem(NOTCH_D + 3) }}
      >
        <path d={`M0 -2H${String(NOTCH_W)}V0L0 0Z M0 0${NOTCH_CURVE}Z`} fill={PAGE_BG} />
        <path d={`M0 0${NOTCH_CURVE}`} fill="none" stroke="#000" strokeOpacity="0.07" />
      </svg>

      <span
        className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white shadow-[0_8px_24px_-6px_rgba(40,50,20,0.22)]"
        style={{ top: rem(-TILE / 2), width: rem(TILE), height: rem(TILE) }}
      >
        <Icon
          className="h-9 w-9 text-[#3f4f1f]"
          aria-hidden="true"
          {...(solid ? { fill: 'currentColor' } : { strokeWidth: 2.1 })}
        />
      </span>

      {/* step number, centred on the card's top-left corner */}
      <span
        className="absolute z-20 flex items-center justify-center rounded-full bg-[#4a5d23] text-[0.8125rem] font-semibold text-white shadow-md"
        style={{
          width: rem(BADGE),
          height: rem(BADGE),
          top: rem(BADGE_INSET - BADGE / 2),
          left: rem(BADGE_INSET - BADGE / 2),
        }}
      >
        {id}
      </span>

      {/* dark thread from the top of a hollow ring, over the gap, into the next card's number badge.
        The next card is later in the DOM, so its badge sits on top and hides the thread's end. */}
      {thread && (
        <>
          <span
            aria-hidden="true"
            className={RING_CLASS}
            style={{
              width: rem(RING),
              height: rem(RING),
              left: `calc(50% + ${rem(START_X - RING / 2)})`,
              top: rem(-RING / 2),
            }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 112 44"
            preserveAspectRatio="none"
            fill="none"
            className="pointer-events-none absolute hidden h-[2.75rem] xl:block"
            style={{
              left: `calc(50% + ${rem(START_X)})`,
              width: `calc(50% - ${rem(START_X - END_X)})`,
              top: rem(-32),
            }}
          >
            <path
              d="M0 27.5C16 4 36 3 56 3S92 40 112 40"
              strokeLinecap="round"
              stroke="#2f3b16"
              strokeWidth="1.5"
            />
          </svg>
        </>
      )}

      <h3
        className={`text-xl font-semibold leading-snug text-gray-900 ${kicker ? 'mb-1.5' : 'mb-3'}`}
      >
        {title}
      </h3>
      {kicker && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a5d23]">
          {kicker}
        </p>
      )}
      <p className="mb-6 text-[0.9375rem] leading-relaxed text-gray-600">{description}</p>

      <ul className="mt-auto space-y-2">
        {highlights.map((h) => (
          <li
            key={h}
            className="flex items-center gap-3 rounded-lg bg-black/[0.035] px-3 py-2.5 text-sm text-gray-700"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5d23]" />
            {h}
          </li>
        ))}
      </ul>

      {link && (
        <Link
          to={link.to}
          className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#4a5d23]"
        >
          {link.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </>
  );
}

// numbered step cards joined by a thread, shared by the students and companies sections
export default function JourneyCards({ steps, className = '' }: Props) {
  return (
    <ol className={`grid gap-x-6 gap-y-16 ${className}`}>
      {steps.map((step, index) => (
        <motion.li
          key={step.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={JOURNEY_CARD_CLASS}
        >
          <JourneyCardBody step={step} thread={index < steps.length - 1} />
        </motion.li>
      ))}
    </ol>
  );
}
