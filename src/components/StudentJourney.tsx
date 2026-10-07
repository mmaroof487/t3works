import { useCallback, useLayoutEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import { ChartNoAxesCombined, FileUser, GraduationCap } from 'lucide-react';
import JourneyCards, {
  JOURNEY_CARD_CLASS,
  JourneyCardBody,
  SolidBriefcase,
  type IconType,
  type JourneyStep,
} from './JourneyCards';
import { cn } from '../lib/cn';
import { useMediaQuery } from '../lib/useMediaQuery';

const EDGE_FADE: React.CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  WebkitMaskComposite: 'source-in',
};

const STEPS: JourneyStep[] = [
  {
    id: '01',
    icon: GraduationCap as IconType,
    solid: true,
    title: 'We Understand Your Fit',
    description:
      'We explore your match against 500+ researched companies using AI-powered matching based on your aspirations and skills.',
    highlights: ['Personalized recommendations', 'Clear "Why this pick?"', 'Visual fit comparison'],
  },
  {
    id: '02',
    icon: FileUser as IconType,
    solid: false,
    title: 'We Develop Your Profile & Skills',
    description:
      'We build a comprehensive Student DNA profile mapping your skills and experience. We identify gaps with AI assessment and optimize your resume for actual job requirements.',
    highlights: [
      'AI-assisted skills assessment',
      'ATS resume scoring',
      'Integrated learning calendar',
    ],
  },
  {
    id: '03',
    icon: ChartNoAxesCombined as IconType,
    solid: false,
    title: 'We Prepare You for Opportunities',
    description:
      'We practice with you using our Interview Simulator, generating company-specific questions tailored to your target role and historical interview patterns.',
    highlights: [
      'AI-generated company scenarios',
      'Hand-authored question bank',
      'Session history & feedback',
    ],
  },
  {
    id: '04',
    icon: SolidBriefcase as IconType,
    solid: false,
    title: 'We Manage Your Placement & Outcomes',
    description:
      'We help track active campus placement drives through your Placement Cell Dashboard, helping you apply to aligned roles and monitor your application status in real-time.',
    highlights: [
      'Active campus drives pipeline',
      'AI-assisted helpdesk',
      'Real-time offer tracking',
    ],
  },
];

function Heading({ className }: { className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
          For students
        </span>
        <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
      </div>
      <h2 className="mb-5 text-4xl font-semibold tracking-tight text-gray-900 sm:whitespace-nowrap sm:text-5xl lg:text-6xl">
        We Know What Students{' '}
        <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
          Need.
        </span>
      </h2>
      <p className="max-w-4xl text-base leading-relaxed text-gray-600 sm:text-lg">
        Students deserve complete transparency. See exactly what you&apos;ll learn, how you&apos;ll
        prepare, and how this platform systematically accelerates your career from discovery to
        placement.
      </p>
    </motion.div>
  );
}

// Phones: the section pins while the page scrolls STEP_SCROLL per step. Each next card slides in
// from the right and lands on the pile; the cards beneath shrink and rise a little so their top
// edges show. Positions below are in steps: 0 = first card, STEPS.length - 1 = last card landed.
const SUPPORTS_SVH = typeof CSS !== 'undefined' && CSS.supports('height', '100svh');
const STEP_SCROLL = '70svh';
// keeps the pile clear of the nav pill fixed to the bottom of the screen
const NAV_RESERVE = '5.25rem';
// the progress bar never gets closer to the top of the screen than this (px)
const BAR_MARGIN = 10;
// tighter card spacing than the grid's, so a whole card fits a short phone screen under the bar
const STACK_CARD_CLASS = cn(
  JOURNEY_CARD_CLASS,
  'pb-5 pt-14 will-change-transform [grid-area:1/1] [&>p]:mb-4 [&>p]:text-sm [&>span]:opacity-[var(--overhang)] [&>ul>li]:py-2'
);
const PEEK_REM = 0.75;
const PEEK_SHRINK = 0.045;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// 0 = still off to the right, 1 = landed. A card travels during the middle of its step, so each
// one rests on top for a moment before the next starts moving.
function landed(index: number, position: number) {
  if (index === 0) return 1;
  const t = clamp01((position - index + 0.8) / 0.6);
  return 1 - Math.pow(1 - t, 3);
}

// how many cards lie on top of this one
function buried(index: number, position: number) {
  let cards = 0;
  for (let above = index + 1; above < STEPS.length; above++) cards += landed(above, position);
  return cards;
}

function StackCard({
  step,
  index,
  position,
}: {
  step: JourneyStep;
  index: number;
  position: MotionValue<number>;
}) {
  const x = useTransform(position, (p) => `${String((1 - landed(index, p)) * 100)}vw`);
  const y = useTransform(position, (p) => `${String(-buried(index, p) * PEEK_REM)}rem`);
  const scale = useTransform(position, (p) => 1 - buried(index, p) * PEEK_SHRINK);
  // the number badge and icon tile overhang the card, so they fade out once it is covered
  const overhang = useTransform(position, (p) => 1 - clamp01((buried(index, p) - 0.55) / 0.4));

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
    <span className="relative h-[1.375rem] w-[1.375rem] rounded-full border-2 border-[#4a5d23] bg-[#f5f5f0]">
      <motion.span
        style={{ scale: fill, opacity: fill }}
        className="absolute inset-0 rounded-full bg-[#4a5d23]"
      />
    </span>
  );
}

function ProgressBar({ position }: { position: MotionValue<number> }) {
  const line = useTransform(position, (p) => clamp01(p / (STEPS.length - 1)));

  return (
    <div aria-hidden="true" className="relative mx-auto h-[1.375rem] w-44">
      <span className="absolute inset-x-[0.6875rem] top-1/2 h-0.5 -translate-y-1/2 bg-[#4a5d23]/25" />
      <motion.span
        style={{ scaleX: line }}
        className="absolute inset-x-[0.6875rem] top-1/2 h-0.5 origin-left -translate-y-1/2 bg-[#4a5d23]"
      />
      <div className="relative flex h-full items-center justify-between">
        {STEPS.map((step, index) => (
          <ProgressDot key={step.id} index={index} position={position} />
        ))}
      </div>
    </div>
  );
}

function PinnedJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const target = useMotionValue(0);
  const position = useSpring(target, { stiffness: 220, damping: 30, mass: 0.5 });
  const { scrollY } = useScroll();

  // the stage sticks inside the taller track; how far it has slid down the track is the progress
  const measure = useCallback(() => {
    const track = trackRef.current?.getBoundingClientRect();
    const stage = stageRef.current?.getBoundingClientRect();
    if (!track || !stage) return;
    const travel = track.height - stage.height;
    target.set(travel > 0 ? clamp01((stage.top - track.top) / travel) * (STEPS.length - 1) : 0);
  }, [target]);

  useMotionValueEvent(scrollY, 'change', measure);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const bar = barRef.current;
    if (!track || !stage || !bar) return;
    const fit = () => {
      const height = `${String(stage.offsetHeight)}px`;
      track.style.height = `calc(${height} + ${String(STEPS.length - 1)} * ${STEP_SCROLL})`;
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
  }, [measure]);

  return (
    <div ref={trackRef}>
      <div ref={stageRef} className="sticky">
        <Heading className="mb-5 max-w-5xl" />
        <div ref={barRef}>
          <ProgressBar position={position} />
        </div>
        <ol className="mx-auto grid max-w-md pt-11">
          {STEPS.map((step, index) => (
            <StackCard key={step.id} step={step} index={index} position={position} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function StudentJourney() {
  const isMobile = useMediaQuery('(width < 48rem)');
  const reduceMotion = useReducedMotion() ?? false;
  const pinned = isMobile && !reduceMotion && SUPPORTS_SVH;

  return (
    <section className="relative w-full overflow-x-clip bg-[#f5f5f0] py-8 md:py-12">
      {/* faint backdrop art, as in the hero; the network straddles the seam as a connector */}
      <img
        src="/images/Minimalist%20Neural%20Network%20Background.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10vw] hidden w-[30vw] max-w-none mix-blend-darken lg:block"
        // centred on the seam with the section above (the image is 0.655 x its width tall)
        style={{ top: 'calc(-1.5rem - 9.8vw)' }}
      />
      <div className="relative mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        {pinned ? (
          <PinnedJourney />
        ) : (
          <>
            <Heading className="mb-16 max-w-5xl md:mb-20" />
            <div className="relative">
              {/* students illustration rising from behind the last card (wide screens only). Its paper is
              lighter than the page, so a darken blend plus a soft edge fade leaves only the artwork. */}
              <img
                src="/images/Students%20Image.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full right-0 hidden w-[38%] max-w-none translate-y-[16%] mix-blend-darken xl:block"
                style={EDGE_FADE}
              />
              <JourneyCards steps={STEPS} className="sm:grid-cols-2 lg:grid-cols-4" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
