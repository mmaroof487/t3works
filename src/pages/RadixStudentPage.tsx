import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Cloud,
  Code2,
  Database,
  FolderGit2,
  GitBranch,
  Layers,
  Lock,
  Network,
  Server,
  ShieldCheck,
} from 'lucide-react';
import CandidatePortal from './CandidatePortal';
import SystemsJourney from '../components/SystemsJourney';
import SystemsStack from '../components/SystemsStack';
import { SystemModal } from '../components/SystemModal';
import { Accent, Reveal, SectionHeading } from '../components/leadership/primitives';
import { SYSTEMS_DATA } from '../data/systems';
import { STUDENT_OUTCOMES, STUDENT_PILLARS, STUDENT_SYSTEMS } from '../data/radixStudent';
import { scrollToSection } from '../lib/scrollToSection';
import { usePinnedJourney } from '../lib/usePinnedJourney';
import { cn } from '../lib/cn';

// same order as STUDENT_PILLARS and STUDENT_OUTCOMES
const PILLAR_ICONS = [Code2, Database, Server, BrainCircuit, Lock];
const OUTCOME_ICONS = [Briefcase, FolderGit2, Layers, GitBranch, Cloud, ShieldCheck];

// grid placement of each pillar in the architecture bento (six columns on wide screens)
const PILLAR_SPANS = [
  'md:col-span-2 lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
];

const HERO_STATS = [
  { value: '8', label: 'systems, in order' },
  { value: '100+', label: 'tables designed' },
  { value: '2,000+', label: 'tests automated' },
];

const heroEase = [0.16, 1, 0.3, 1] as const;

const ICON_TILE =
  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white shadow-[0_8px_24px_-6px_rgba(40,50,20,0.22)]';
const CARD =
  'rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] shadow-sm transition-shadow duration-500 hover:shadow-[0_24px_48px_-16px_rgba(40,50,20,0.2)]';
const CONTAINER = 'mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8';

/** in-page link that scrolls with the same easing and nav offset as the header links */
function SectionLink({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(to);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/** eight dots that light up in turn, the build path in miniature */
function BuildPath() {
  const still = useReducedMotion() ?? false;
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#4a5d23]"
          initial={{ opacity: still ? 0.9 : 0.25 }}
          animate={still ? undefined : { opacity: [0.25, 1, 0.25], scale: [1, 1.5, 1] }}
          transition={{ duration: 1.1, delay: i * 0.16, repeat: Infinity, repeatDelay: 1.8 }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden px-4 pb-8 pt-24 sm:px-6 lg:h-svh lg:min-h-[32rem] lg:px-8 lg:pb-3 lg:pt-[7.5rem]">
      <motion.div
        animate={{
          opacity: [0.2, 1, 0.2],
          scaleY: [1, 1.35, 1],
          scaleX: [1, 1.05, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[40.625rem] bg-gradient-to-b from-[#c4cdbe] via-[#e5e9db] to-transparent"
      />

      {/* On wide screens the grid takes exactly the height left under the nav and above the scroll
          cue, and every size inside it is capped by the viewport height, so the intro always fits. */}
      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[87.5rem] flex-1 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-[clamp(2rem,4vw,4rem)]">
        {/* tagline, heading and explanation */}
        <div className="flex min-h-0 flex-col justify-center gap-[clamp(1rem,3.4vh,2rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              OpenRadix · For students
            </span>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: heroEase, delay: 0.1 }}
              className="text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[length:clamp(2rem,min(3.5vw,7.4vh),4.5rem)]"
            >
              Stop collecting tutorials.
              <br />
              Start building <Accent>real systems.</Accent>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: heroEase, delay: 0.2 }}
              className="mt-[clamp(0.75rem,2vh,1.25rem)] max-w-[40rem] text-base leading-relaxed text-gray-700 lg:text-lg xl:text-xl"
            >
              Eight systems. One platform. Every layer built by you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.3 }}
            className={cn(CARD, 'max-w-[36rem] bg-[#fbfbf9]/85 p-5 backdrop-blur lg:p-6')}
          >
            <p className="mb-5 text-[0.9375rem] leading-relaxed text-gray-600">
              OpenRadix hands you a messy business problem and a blank schema. Eight systems later,
              you have modeled the data, automated the tests, orchestrated AI agents and deployed
              the platform. You leave with the systems that prove you can do it.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <SectionLink
                to="#apply"
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#c9b27a] bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] px-8 py-3.5 text-[0.9375rem] font-medium text-white shadow-lg shadow-[#c9b27a]/40 transition-shadow hover:shadow-[#c9b27a]/70 sm:w-auto"
              >
                Apply Now
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </SectionLink>
              <SectionLink
                to="#projects"
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-gray-900/70 px-8 py-3.5 text-[0.9375rem] font-medium text-gray-900 transition-colors hover:bg-white sm:w-auto"
              >
                See the 8 Systems
              </SectionLink>
            </div>
          </motion.div>
        </div>

        {/* asset */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: heroEase, delay: 0.2 }}
          className="relative h-[22rem] min-h-0 overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-[#eef1e3] via-[#e8ecda] to-[#dde4c8] shadow-[0_32px_64px_-24px_rgba(40,50,20,0.35)] sm:h-[28rem] lg:h-full"
        >
          {/* the illustration's paper is lighter than the card, so a darken blend leaves only the artwork */}
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: heroEase }}
            src="/images/Students%20Image.webp"
            alt="Three students walking across a campus, connected by a network of nodes"
            className="absolute inset-0 h-full w-full object-cover mix-blend-darken"
          />

          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-full border border-white/70 bg-white/65 px-4 py-2.5 shadow-[0_8px_32px_-8px_rgba(40,50,20,0.25)] backdrop-blur-xl sm:left-5 sm:top-5">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#4a5d23]">
              Build path
            </span>
            <BuildPath />
          </div>

          <dl className="absolute inset-x-4 bottom-4 grid grid-cols-3 divide-x divide-black/10 rounded-2xl border border-white/70 bg-white/65 py-3.5 shadow-[0_8px_32px_-8px_rgba(40,50,20,0.25)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-3 text-center sm:px-4">
                <dt className="text-[0.6875rem] leading-snug text-gray-600 sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <SectionLink
        to="#overview"
        className="relative z-10 mx-auto mt-3 hidden items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-[#4a5d23] transition-opacity hover:opacity-70 lg:flex"
      >
        <span className="relative flex h-7 w-4 justify-center rounded-full border-[1.5px] border-[#4a5d23]/60 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-0.5 rounded-full bg-[#4a5d23]"
          />
        </span>
        Scroll to explore
      </SectionLink>
    </section>
  );
}

/** the eight systems as a connected chain, drawn inside the first pillar */
function SystemChain() {
  return (
    <div className="mt-auto flex items-center pt-8" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={cn('flex items-center', i < 7 && 'flex-1')}>
          <span
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-semibold',
              i === 7
                ? 'border-[#4a5d23] bg-[#4a5d23] text-white'
                : 'border-[#4a5d23]/30 bg-white text-[#3f4f1f]'
            )}
          >
            {i + 1}
          </span>
          {i < 7 && <span className="h-px flex-1 bg-[#4a5d23]/25" />}
        </div>
      ))}
    </div>
  );
}

function ProgramArchitecture() {
  return (
    <section id="overview" className="relative overflow-hidden py-6 md:py-12 lg:py-12">
      {/* faint network art on the right edge, as in the footer */}
      <img
        src="/images/Minimalist%20Sage%20Network%20UI%20UX.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8vw] top-0 hidden h-full max-w-none -scale-x-100 opacity-40 mix-blend-darken lg:block"
      />

      <div className={cn(CONTAINER, 'relative')}>
        <SectionHeading
          eyebrow="Program architecture"
          title={
            <>
              A progressive path from fundamentals to <Accent>production engineering.</Accent>
            </>
          }
          description="Most technical programs teach individual concepts separately. OpenRadix connects those concepts into one progressive engineering journey, so you understand how data, software, AI, infrastructure, testing and enterprise architecture fit together inside a real system."
          className="mb-6 md:mb-10"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {STUDENT_PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <Reveal key={pillar.title} delay={i * 0.08} className={PILLAR_SPANS[i]}>
                <article className={cn(CARD, 'flex h-full flex-col p-6 sm:p-8')}>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className={ICON_TILE}>
                      <Icon className="h-6 w-6 text-[#3f4f1f]" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[#4a5d23]/15 bg-[#4a5d23]/[0.06] px-3 py-1 text-xs font-semibold text-[#3f4f1f]">
                      {pillar.stat}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="max-w-xl text-[0.9375rem] leading-relaxed text-gray-600">
                    {pillar.desc}
                  </p>
                  {i === 0 && <SystemChain />}
                </article>
              </Reveal>
            );
          })}

          {/* the takeaway closes the grid as a full-width band */}
          <Reveal delay={0.4} className="md:col-span-2 lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#232621] p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,_var(--tw-gradient-stops))] from-[#8ba05f]/25 via-transparent to-transparent"
              />
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -right-16 -top-20 text-white opacity-[0.07]"
              >
                <Network size={340} />
              </motion.div>
              <div className="relative max-w-3xl">
                <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                  You are not learning eight disconnected technologies.
                </p>
                <p className="mt-3 text-base leading-relaxed text-[#c4cdbe] sm:text-lg">
                  You are learning how engineers combine them into one evolving system.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section id="outcomes" className="relative py-6 md:py-12 lg:py-12">
      <div
        className={cn(CONTAINER, 'grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16')}
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Engineering outcomes"
            title={
              <>
                What you build, learn, and <Accent>walk away with.</Accent>
              </>
            }
            titleClassName="sm:text-4xl lg:text-5xl"
            description="OpenRadix is designed around demonstrated engineering ability. You build systems and develop competencies through direct technical work, not only lectures, certificates or theoretical exercises."
            className="mb-8 md:mb-8"
          />

          <Reveal delay={0.1}>
            <figure className="relative overflow-hidden rounded-[1.75rem] bg-[#232621] p-7 text-white">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_var(--tw-gradient-stops))] from-[#c9b27a]/20 via-transparent to-transparent"
              />
              <blockquote className="relative text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                The outcome is not a certificate saying you studied engineering.{' '}
                <span className="text-[#d3be8f]">
                  It is evidence that you have built engineering systems.
                </span>
              </blockquote>
            </figure>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {STUDENT_OUTCOMES.map((outcome, i) => {
            const Icon = OUTCOME_ICONS[i];
            return (
              <Reveal key={outcome.title} delay={(i % 2) * 0.08} className="h-full">
                <article className={cn(CARD, 'flex h-full flex-col p-6')}>
                  <div className="mb-5 flex items-start justify-between">
                    <span className={ICON_TILE}>
                      <Icon className="h-6 w-6 text-[#3f4f1f]" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xs font-semibold tracking-[0.2em] text-gray-300"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-snug text-gray-900">
                    {outcome.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-gray-600">{outcome.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EngineeringSystems({ onSelect }: { onSelect: (index: number) => void }) {
  // phones get the pinned card pile; everything wider gets the zigzag journey map
  const pinned = usePinnedJourney();
  const heading = (
    <SectionHeading
      eyebrow="Engineering systems"
      title={
        <>
          8 systems. One progressive <Accent>engineering journey.</Accent>
        </>
      }
      description="Each system introduces a new layer of engineering complexity. You begin with structured data and architecture, then progressively build toward automation, AI agents, infrastructure, machine learning and complete enterprise systems."
      className={pinned ? 'mb-5' : 'md:mb-14'}
    />
  );

  return (
    <section id="projects" className="relative overflow-x-clip py-6 md:py-12 lg:py-12">
      <div className={CONTAINER}>
        {pinned ? (
          <SystemsStack systems={STUDENT_SYSTEMS} heading={heading} onSelect={onSelect} />
        ) : (
          <>
            {heading}
            <SystemsJourney systems={STUDENT_SYSTEMS} onSelect={onSelect} />
          </>
        )}
      </div>
    </section>
  );
}

export default function RadixStudentPage() {
  const { scrollY } = useScroll();
  const topGradientOpacity = useTransform(scrollY, [0, 400], [0, 1]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // the modal gets the full system record, with the student-facing description swapped in
  const selectedSystem =
    selectedIndex === null
      ? null
      : { ...SYSTEMS_DATA[selectedIndex], desc: STUDENT_SYSTEMS[selectedIndex].desc };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans text-gray-900 selection:bg-[#4a5d23] selection:text-white">
      {/* Ambient Scroll Shadow */}
      {createPortal(
        <motion.div
          style={{ opacity: topGradientOpacity }}
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-40 bg-gradient-to-b from-[#4a5d23]/15 to-transparent"
        />,
        document.body
      )}

      {/* Mobile Branding (Matching Homepage) */}
      <div className="absolute left-6 top-6 z-50 xl:hidden">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="inline-flex items-baseline text-[#232621] transition-opacity hover:opacity-80"
        >
          <span className="font-open-sauce text-3xl font-extrabold tracking-tight">t3</span>
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 -10% 0 0)' }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            className="ml-1 font-batangas text-xl text-[#4a5d23]"
          >
            works
          </motion.span>
          <span className="mx-2 text-xl font-medium text-gray-400">/</span>
          <span className="text-xl font-bold text-[#232621]">OpenRadix</span>
        </Link>
      </div>

      <Hero />
      <ProgramArchitecture />

      <EngineeringSystems onSelect={setSelectedIndex} />

      <Outcomes />

      {/* Apply Now */}
      <section id="apply" className="pb-6 pt-0 md:pb-10 md:pt-2 lg:-mb-14 lg:pb-0 lg:pt-4">
        <CandidatePortal embedded />
      </section>

      {/* Expanded System Modal */}
      <AnimatePresence>
        {selectedSystem && (
          <SystemModal
            system={selectedSystem}
            onClose={() => {
              setSelectedIndex(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
