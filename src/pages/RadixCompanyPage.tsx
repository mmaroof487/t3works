import { Fragment, useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CircleCheck,
  Cloud,
  FolderGit2,
  GitBranch,
  Layers,
  Network,
  ShieldCheck,
} from 'lucide-react';
import EnterprisePortal from './EnterprisePortal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { PinnedStack } from '../components/PinnedStack';
import { SystemModal } from '../components/SystemModal';
import { Accent, Reveal, SectionHeading } from '../components/leadership/primitives';
import type { RadixContent } from '../data/radix';
import { scrollToSection } from '../lib/scrollToSection';
import { usePinnedJourney } from '../lib/usePinnedJourney';
import { cn } from '../lib/cn';

// Radix for Companies. All of its wording comes from `content` (data/radix.ts); this file only
// lays it out, in the same design as the student page. One icon per pillar, technology group and
// outcome, in the order the content lists them.
const OUTCOME_ICONS = [Briefcase, FolderGit2, Layers, GitBranch, Cloud, ShieldCheck];

// the line drawing on each system's card, in the order the systems are listed
const SYSTEM_ART = [
  '01-parameter-discovery',
  '02-database-normalization',
  '03-test-automation',
  '04-agentic-research',
  '05-agentic-ecosystem',
  '06-devops-cloud',
  '07-vector-databases-ml',
  '08-enterprise-architecture',
].map((name) => `/images/radix-systems/${name}.svg`);

// the figures shown on the hero artwork, picked from the scale section's stats
const HERO_STAT_INDEXES = [0, 1, 3];

// the words of each heading that take the accent colour; a heading without them is left plain
const ACCENTS = {
  hero: 'Open Radix',
  systems: 'Demonstrable Engineering Capability.',
  scale: 'System Complexity',
  tech: 'Modern Engineering Ecosystem',
  outcomes: 'Engineers to Understand',
};

// the artworks' paper is within a shade of the page's; fading their edges out hides the difference
const FADE_EDGES = {
  maskImage:
    'linear-gradient(to right, transparent, black 14%, black 86%, transparent), linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
} as const;

// keeps only the dense middle band of the tall sage network artwork
const NETWORK_BAND = {
  maskImage: 'linear-gradient(to bottom, transparent 22%, #000 32%, #000 66%, transparent 82%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent 22%, #000 32%, #000 66%, transparent 82%)',
} as const;

const heroEase = [0.16, 1, 0.3, 1] as const;

const CARD =
  'rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] shadow-sm transition-shadow duration-500 hover:shadow-[0_24px_48px_-16px_rgba(40,50,20,0.2)]';
const CONTAINER = 'mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8';
// the company headings are longer than the student ones, so they step down a size from lg
const HEADING_SIZE = 'lg:text-5xl';

/** a heading with `accent` picked out, in the gradient on light backgrounds or gold on dark ones */
function AccentTitle({
  title,
  accent,
  dark = false,
}: {
  title: string;
  accent: string;
  dark?: boolean;
}) {
  const at = title.indexOf(accent);
  if (at === -1) return <>{title}</>;
  const picked = dark ? (
    <span className="text-[#c9b27a]">{accent}</span>
  ) : (
    <Accent>{accent}</Accent>
  );
  return (
    <>
      {title.slice(0, at)}
      {picked}
      {title.slice(at + accent.length)}
    </>
  );
}

/** in-page link that scrolls with the same easing and nav offset as the header links */
function SectionLink({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: ReactNode;
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

function Hero({ content }: { content: RadixContent }) {
  const { hero, scale } = content;
  const stats = HERO_STAT_INDEXES.map((index) => scale.stats[index]);
  const proofs = hero.tagline.split(' · ');

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden pb-24 pt-20 md:pb-36 lg:justify-center lg:pb-3 lg:pt-[7.5rem] lg:portrait:min-h-0 lg:portrait:pb-6">
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

      {/* On wide screens the row fills the screen between the nav and the scroll cue. The copy is
          spread down it and the asset column stretches to match, so the stats card ends level with
          the intro card; if the copy is taller than the screen the section simply grows. Below lg,
          as on the student page, it is one column filling the screen above the nav pill: heading
          and proof points, the artwork taking whatever height is left, then the intro card. */}
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[87.5rem] flex-1 flex-col gap-3 px-4 max-lg:justify-center sm:px-6 lg:grid lg:max-h-[56rem] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:px-8 lg:grid-rows-[minmax(0,1fr)] lg:gap-[clamp(2rem,4vw,4rem)] lg:py-[clamp(0.5rem,3.5vh,2.5rem)]">
        {/* tagline, heading and explanation */}
        <div className="contents lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:gap-[clamp(1rem,3vh,1.75rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase }}
            className="flex items-center gap-4 max-lg:hidden"
          >
            <span className="h-px w-10 shrink-0 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23] lg:text-[length:clamp(0.75rem,min(0.75vw,1.3vh),0.875rem)]">
              {hero.eyebrow}
            </span>
            <span className="h-px w-10 shrink-0 bg-[#4a5d23]/60" aria-hidden="true" />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: heroEase, delay: 0.1 }}
              className="text-[6.9vw] font-semibold max-md:[@media(max-height:52rem)]:text-[6.6vw] md:text-[6.4vw] leading-[1.12] tracking-tight text-gray-900 lg:text-[length:clamp(2rem,min(3.7vw,7.4vh),5rem)] lg:leading-[1.08]"
            >
              {hero.title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  <AccentTitle title={line} accent={ACCENTS.hero} />
                </Fragment>
              ))}
            </motion.h1>

            {/* what the engineers have actually built, as short proof points */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: heroEase, delay: 0.2 }}
              className="mt-3 flex gap-2 max-md:hidden max-sm:-mx-4 max-sm:scroll-px-4 max-sm:snap-x max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-1 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:flex-wrap md:mt-4 lg:mt-[clamp(0.75rem,2vh,1.25rem)]"
            >
              {proofs.map((proof) => (
                <li
                  key={proof}
                  className="inline-flex shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-full border border-[#4a5d23]/15 bg-white/70 py-1.5 pl-2.5 pr-3.5 text-xs font-medium text-[#3f4f1f] backdrop-blur sm:text-[0.8125rem] md:max-lg:text-sm lg:py-[clamp(0.375rem,0.9vh,0.625rem)] lg:pl-[clamp(0.625rem,1.1vh,0.875rem)] lg:pr-[clamp(0.875rem,1.5vh,1.25rem)] lg:text-[length:clamp(0.8125rem,min(0.95vw,1.6vh),1.0625rem)]"
                >
                  <CircleCheck className="h-4 w-4 text-[#7d6f36]" aria-hidden="true" />
                  {proof}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.3 }}
            className={cn(
              CARD,
              'relative max-w-[42rem] bg-[#fbfbf9]/85 p-5 backdrop-blur max-md:[@media(max-height:52rem)]:p-4 max-lg:order-2 md:max-lg:-mt-3 md:max-lg:max-w-none md:max-lg:p-6 lg:max-w-[min(50rem,100%)] lg:p-[clamp(1.5rem,3vh,2.25rem)]'
            )}
          >
            <p className="mb-5 text-sm leading-relaxed text-gray-600 max-md:[@media(max-height:52rem)]:mb-3 max-md:[@media(max-height:52rem)]:text-[0.8125rem] max-md:[@media(max-height:52rem)]:leading-normal md:text-[0.9375rem] md:max-lg:text-lg lg:mb-[clamp(1.25rem,2.6vh,1.75rem)] lg:text-[length:clamp(0.9375rem,min(1.05vw,1.85vh),1.25rem)]">
              {hero.body}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SectionLink
                to={hero.primary.href}
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#c9b27a] bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] px-6 py-3.5 text-[0.9375rem] lg:px-[clamp(1.5rem,2.2vh,2rem)] lg:py-[clamp(0.875rem,1.6vh,1.125rem)] lg:text-[length:clamp(0.9375rem,min(1vw,1.75vh),1.1875rem)] max-md:[@media(max-height:52rem)]:py-2.5 font-medium text-white shadow-lg shadow-[#c9b27a]/40 transition-shadow hover:shadow-[#c9b27a]/70 sm:w-auto"
              >
                {hero.primary.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </SectionLink>
              <SectionLink
                to={hero.secondary.href}
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-gray-900/70 px-6 py-3.5 text-[0.9375rem] lg:px-[clamp(1.5rem,2.2vh,2rem)] lg:py-[clamp(0.875rem,1.6vh,1.125rem)] lg:text-[length:clamp(0.9375rem,min(1vw,1.75vh),1.1875rem)] max-md:[@media(max-height:52rem)]:py-2.5 font-medium text-gray-900 transition-colors hover:bg-white sm:w-auto"
              >
                {hero.secondary.label}
              </SectionLink>
            </div>
          </motion.div>
        </div>

        {/* asset: bare artwork, with the stats card sitting on the same baseline as the intro card */}
        <div className="flex min-h-0 flex-col gap-5 max-lg:order-1 max-lg:-mt-3 max-lg:flex-1 lg:self-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: heroEase, delay: 0.2 }}
            className="relative min-h-0 max-lg:min-h-[10rem] max-lg:flex-1 max-md:[@media(max-height:52rem)]:min-h-[6.5rem] md:max-lg:min-h-[16rem] md:max-lg:max-h-[40rem] lg:min-h-[18rem] lg:flex-1"
          >
            {/* the illustration's paper is lighter than the page, so a darken blend leaves only the artwork;
                on wide screens it is drawn larger than its box, as its own margins are empty; on
                phones it stays inside its box, so it can neither touch the heading nor run over the
                intro card, which is positioned so it paints above it */}
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: heroEase }}
              src="/images/Isometric%20Smart%20City%20Business%20District.webp"
              alt="Isometric office towers joined by a network of nodes"
              className="pointer-events-none absolute left-[-26%] top-0 h-full w-[130%] max-w-none object-contain object-center mix-blend-darken md:left-[-12%] md:top-[-10%] md:h-[120%] md:w-[124%] lg:left-[-24%] lg:top-[-12%] lg:h-[128%] lg:w-[130%]"
            />
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.3 }}
            className={cn(
              CARD,
              'grid shrink-0 grid-cols-3 divide-x divide-black/10 bg-[#fbfbf9]/85 py-5 backdrop-blur max-lg:hidden lg:py-[clamp(1.25rem,2.6vh,2rem)] lg:-ml-10'
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-3 text-center sm:px-4">
                <dt className="text-[0.6875rem] leading-snug text-gray-600 sm:text-xs lg:text-[length:clamp(0.75rem,min(0.85vw,1.4vh),0.9375rem)]">
                  {stat.label}
                </dt>
                <dd className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-[length:clamp(1.5rem,min(1.9vw,3.4vh),2.375rem)]">
                  {stat.val}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <SectionLink
        to="#projects"
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

type CompanySystem = RadixContent['systems']['items'][number];

/** one system as a quiet info card that opens its detail modal */
function SystemTile({
  system,
  index,
  focusLabel,
  onSelect,
}: {
  system: CompanySystem;
  index: number;
  focusLabel: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`System ${system.num}: ${system.title}. Open details`}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/5 bg-[#fbfbf9] text-left shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-[#4a5d23]/30 hover:shadow-[0_18px_36px_-16px_rgba(40,50,20,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a5d23]"
    >
      {/* the drawing is the card's header: a tinted, dotted band with the system number */}
      <div className="relative flex h-[5.25rem] shrink-0 items-center justify-between overflow-hidden border-b border-[#4a5d23]/10 bg-gradient-to-br from-[#f3f5ea] to-[#e9eedb] px-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle,_rgba(74,93,35,0.16)_1px,_transparent_1px)] [background-size:0.75rem_0.75rem] [mask-image:linear-gradient(to_right,transparent,black)]"
        />
        <span className="relative text-[2.5rem] font-semibold leading-none tracking-tight text-[#4a5d23]/30 transition-colors group-hover:text-[#4a5d23]/70">
          {system.num}
        </span>
        <img
          src={SYSTEM_ART[index]}
          alt=""
          width={96}
          height={64}
          loading="lazy"
          decoding="async"
          className="relative h-[3.75rem] w-auto transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-900">
          {system.title}
        </h3>
        <p className="mt-1 text-[0.8125rem] font-medium leading-snug text-[#4a5d23]">
          {system.subtitle}
        </p>
        <p className="mt-2.5 line-clamp-2 text-[0.875rem] leading-relaxed text-gray-600">
          {system.desc}
        </p>

        {system.focus && (
          <p className="mt-auto pt-3.5 text-xs leading-relaxed text-gray-500">
            <span className="mb-1.5 flex items-center justify-between border-t border-black/[0.07] pt-3 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-gray-400">
              {focusLabel}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-colors group-hover:text-[#4a5d23]"
              />
            </span>
            {system.focus}
          </p>
        )}
      </div>
    </button>
  );
}

function EngineeringSystems({ content }: { content: RadixContent }) {
  const { systems } = content;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedSystem = selectedIndex === null ? null : systems.items[selectedIndex];
  const close = useCallback(() => {
    setSelectedIndex(null);
  }, []);
  const focusLabel = systems.focusLabel ?? 'Focus';
  // phones get the pinned card pile, as on the student page; everything wider gets the grid
  const pinned = usePinnedJourney();
  const heading = (
    <SectionHeading
      eyebrow={systems.label}
      title={<AccentTitle title={systems.title} accent={ACCENTS.systems} />}
      titleClassName={HEADING_SIZE}
      description={systems.intro}
      className={pinned ? 'mb-5' : 'mb-6 md:mb-10'}
    />
  );

  return (
    <section id="projects" className="relative overflow-x-clip py-6 md:py-12 lg:py-12">
      {/* the homepage's geometric network, mirrored, straddling the seam with the hero and filling
          the space beside the heading, bleeding off the right edge */}
      <img
        src="/images/Minimalist%20Neural%20Network%20Background.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[4vw] -top-[7vw] hidden w-[40vw] max-w-none -scale-x-100 mix-blend-darken lg:block"
        style={FADE_EDGES}
      />
      <div className={cn(CONTAINER, 'relative')}>
        {pinned ? (
          <PinnedStack
            count={systems.items.length}
            heading={heading}
            stepScroll="60svh"
            swipe
            renderCard={(i) => (
              <SystemTile
                system={systems.items[i]}
                index={i}
                focusLabel={focusLabel}
                onSelect={() => {
                  setSelectedIndex(i);
                }}
              />
            )}
          />
        ) : (
          <>
            {heading}
            {/* Quiet info cards, already in place: no journey, no entrance animation. Each says three
            things only (which system, what it is, what it signals), without a photo; the modal
            carries the rest. Four to a row on wide screens, so all eight fit one screen. */}
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {systems.items.map((system, i) => (
                <li key={system.num} className="flex">
                  <SystemTile
                    system={system}
                    index={i}
                    focusLabel={focusLabel}
                    onSelect={() => {
                      setSelectedIndex(i);
                    }}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* the detail modal lies over this section only, as the leadership profiles do */}
      <AnimatePresence>
        {selectedSystem && (
          <SystemModal
            key={selectedSystem.num}
            system={selectedSystem}
            art={selectedIndex === null ? undefined : SYSTEM_ART[selectedIndex]}
            instant
            anchored
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Scale({ content }: { content: RadixContent }) {
  const { scale } = content;

  return (
    <section id="scale" className="relative py-6 md:py-12 lg:py-12">
      <div className={CONTAINER}>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#232621] p-6 text-white sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,_var(--tw-gradient-stops))] from-[#8ba05f]/25 via-transparent to-transparent"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -right-20 -top-24 text-white opacity-[0.06]"
          >
            <Network size={420} />
          </motion.div>

          {/* from lg the heading sits beside the figures, so the whole section fits one screen */}
          <div className="relative lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow={scale.label}
                title={<AccentTitle title={scale.title} accent={ACCENTS.scale} dark />}
                titleClassName="lg:text-[2.75rem] lg:leading-[1.1]"
                description={scale.intro}
                className="mb-8 md:mb-10 lg:mb-0"
              />
              {scale.note && (
                <p className="mt-6 hidden max-w-3xl text-[0.9375rem] leading-relaxed text-[#c4cdbe] lg:block">
                  {scale.note}
                </p>
              )}
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:gap-3">
              {scale.stats.map((stat, i) => (
                <li key={stat.label}>
                  <Reveal delay={(i % 2) * 0.08} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:p-5">
                      <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-4xl">
                        <AnimatedCounter value={stat.val} />
                      </span>
                      <span className="mt-3 text-base font-semibold lg:mt-2 text-[#c4cdbe]">
                        {stat.label}
                      </span>
                      <span className="mt-1 text-sm leading-snug text-white/50">{stat.sub}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            {scale.note && (
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#c4cdbe] lg:hidden">
                {scale.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// The stack artwork shows the six groups in this order, top slab first. `band` is the height at
// which the slab meets the block's right edge, as a percentage of the picture, so a line can run
// from there to the group's row in the list beside it.
const STACK_LAYERS = [
  { title: 'AI & Agent Systems', band: 18.5 },
  { title: 'Programming', band: 30.4 },
  { title: 'Cloud & DevOps', band: 42.4 },
  { title: 'Quality Engineering', band: 54.7 },
  { title: 'Data Infrastructure', band: 67.4 },
  { title: 'Development Tools', band: 79.8 },
] as const;
// how far in from the picture's right side the block's right edge is, as a percentage of its width
const STACK_EDGE = 5.5;

function Technology({ content }: { content: RadixContent }) {
  const { tech } = content;
  // the groups, put in the order of the slabs in the artwork
  const layers = STACK_LAYERS.flatMap((layer) => {
    const group = tech.groups.find((candidate) => candidate.title === layer.title);
    return group ? [{ ...layer, group }] : [];
  });

  return (
    <section id="tech" className="relative py-6 md:py-12 lg:py-12">
      {/* the sage network along the right edge, behind the empty space beside the heading */}
      <img
        src="/images/Minimalist%20Sage%20Network%20UI%20UX.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden w-[20rem] max-w-none -translate-y-[24%] mix-blend-darken lg:block"
        style={NETWORK_BAND}
      />
      <div className={cn(CONTAINER, 'relative')}>
        <SectionHeading
          eyebrow={tech.label}
          title={<AccentTitle title={tech.title} accent={ACCENTS.tech} />}
          titleClassName={HEADING_SIZE}
          description={tech.intro}
          className="mb-6 md:mb-8"
        />

        {/* From xl the stack stands on the left and the six groups fill the rest of the row as a
            list the same height as the picture, each row joined to its own slab by a line; below
            that the stack sits above the list. */}
        <Reveal className="xl:flex xl:items-stretch xl:gap-12">
          <div className="relative mx-auto aspect-[459/766] w-[min(100%,20rem)] shrink-0 sm:w-[26rem] xl:mx-0 xl:h-[clamp(40rem,calc(100svh-8.5rem),60rem)] xl:w-auto">
            <img
              src="/images/radix-tech-stack.webp"
              alt="Six layers of a technology stack: AI and agents, programming, cloud and DevOps, quality engineering, data infrastructure and development tools"
              width={459}
              height={766}
              className="absolute inset-0 h-full w-full"
            />

            {/* the lines: from each slab's edge, across the gap, to the middle of its row */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ left: `${String(100 - STACK_EDGE)}%` }}
              className="absolute top-0 hidden h-full w-[calc(5.5%+3rem)] overflow-visible xl:block"
            >
              {layers.map(({ group, band }, i) => (
                <path
                  key={group.title}
                  d={`M0 ${String(band)} C55 ${String(band)} 45 ${String(((i + 0.5) / layers.length) * 100)} 100 ${String(((i + 0.5) / layers.length) * 100)}`}
                  fill="none"
                  stroke="#4a5d23"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {layers.map(({ group, band }) => (
              <span
                key={group.title}
                aria-hidden="true"
                style={{ top: `${String(band)}%`, right: `${String(STACK_EDGE)}%` }}
                className="absolute -mr-[3px] -mt-[3px] hidden h-[7px] w-[7px] rounded-full bg-[#b89c5a] xl:block"
              />
            ))}
          </div>

          <ol className="mt-8 grid min-w-0 flex-1 gap-3 sm:grid-cols-2 xl:mt-0 xl:grid-cols-1 xl:grid-rows-6">
            {layers.map(({ group }, i) => (
              <li
                key={group.title}
                className="flex flex-col justify-start gap-3 rounded-2xl border border-black/5 bg-[#fbfbf9] px-6 py-4 shadow-sm xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4a5d23] text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold leading-snug text-gray-900">
                      {group.title}
                    </h3>
                  </div>
                  {group.framing && (
                    <p className="mt-1 pl-10 text-sm leading-snug text-gray-600">{group.framing}</p>
                  )}
                </div>
                <ul className="flex flex-wrap gap-1.5 pl-10 xl:max-w-[60%] xl:shrink-0 xl:justify-end xl:pl-0">
                  {group.tools.split(', ').map((tool) => (
                    <li
                      key={tool}
                      className="rounded-md border border-black/10 bg-white px-2.5 py-1 font-mono text-xs text-gray-800"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>

        {tech.note && (
          <p className="mx-auto mt-8 max-w-3xl text-center text-base font-medium text-[#4a5d23]">
            {tech.note}
          </p>
        )}
      </div>
    </section>
  );
}

function Outcomes({ content }: { content: RadixContent }) {
  const { outcomes } = content;

  // Laid out to fit one desktop screen: the heading, its intro and the closing line down the left,
  // and the six outcomes as one panel of numbered cells on the right. The panel is the shorter of
  // the two by itself, so it stretches to the left column's height and both end level.
  return (
    <section id="outcomes" className="relative py-6 md:py-10">
      {/* the sage network, mirrored into the bottom-left corner as in the footer: only its dense
          middle band is kept, straddling the seam with the section below */}
      <img
        src="/images/Minimalist%20Sage%20Network%20UI%20UX.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden w-[24rem] max-w-none -translate-x-[23%] translate-y-[48%] -scale-x-100 mix-blend-darken lg:block"
        style={NETWORK_BAND}
      />
      <div
        className={cn(
          CONTAINER,
          'relative grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch lg:gap-12'
        )}
      >
        <div>
          <SectionHeading
            eyebrow={outcomes.label}
            title={<AccentTitle title={outcomes.title} accent={ACCENTS.outcomes} />}
            titleClassName="sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            description={outcomes.intro}
            className="mb-0 md:mb-0"
          />

          {outcomes.note && (
            <Reveal delay={0.1}>
              <p className="mt-6 border-l-2 border-[#b89c5a] pl-4 text-[0.9375rem] font-medium leading-relaxed text-[#3f4f1f]">
                {outcomes.note}
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.05} className="h-full">
          <ol className="grid h-full overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] shadow-sm sm:grid-cols-2 sm:grid-rows-3">
            {outcomes.items.map((outcome, i) => {
              const Icon = OUTCOME_ICONS[i];
              return (
                <li
                  key={outcome.title}
                  className={cn(
                    'group flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-[#f3f5ea] lg:px-6',
                    // hairlines between the cells: above every cell but the first row's, and
                    // between the two columns
                    i > 0 && 'border-t border-black/5',
                    i === 1 && 'sm:border-t-0',
                    i % 2 === 1 && 'sm:border-l sm:border-black/5'
                  )}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-xl bg-[#4a5d23]/10 transition-colors duration-300 group-hover:bg-[#4a5d23] sm:self-center">
                    <Icon
                      className="h-5 w-5 text-[#3f4f1f] transition-colors duration-300 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-base font-semibold leading-snug text-gray-900">
                      {outcome.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">{outcome.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export default function RadixCompanyPage({ content }: { content: RadixContent }) {
  const location = useLocation();
  const { scrollY } = useScroll();
  const topGradientOpacity = useTransform(scrollY, [0, 400], [0, 1]);

  // a link from another page can ask for a section to be scrolled to
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const scrollTarget = state?.scrollTo;
    if (scrollTarget) {
      setTimeout(() => {
        const element = document.querySelector(scrollTarget);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const targetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
      <div className="absolute left-6 top-6 z-50 lg:hidden">
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
          <span className="text-xl font-bold text-[#232621]">Open Radix</span>
          <span className="ml-2 text-xs font-medium text-[#232621]">for Companies</span>
        </Link>
      </div>

      <Hero content={content} />
      <EngineeringSystems content={content} />
      <Technology content={content} />
      <Scale content={content} />
      <Outcomes content={content} />

      {/* Apply now */}
      <section id="hire-form" className="pb-6 pt-0 md:pb-10 md:pt-2 lg:-mb-14 lg:pb-0 lg:pt-4">
        <EnterprisePortal embedded />
      </section>
    </div>
  );
}
