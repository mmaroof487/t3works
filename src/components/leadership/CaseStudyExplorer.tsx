import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '../../data/leadership';
import { cn } from '../../lib/cn';
import { smoothScroller } from '../../lib/smoothScroller';
import { Reveal, SectionHeading } from './primitives';

// From this size up the section pins to the screen and scrolling steps through the cases; on
// anything smaller it is an ordinary section with tabs.
const PINNED_QUERY = '(min-width: 1024px) and (min-height: 600px)';
// how far the page scrolls, in vh, while each case is on screen
const SCROLL_PER_CASE = 60;

const KEY_STEP: Record<string, number | undefined> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

// each funnel stage is a little more saturated than the one before it
const FUNNEL_TONE = [
  'border-white/10 bg-white/5',
  'border-white/10 bg-[#c9b27a]/10',
  'border-[#c9b27a]/25 bg-[#c9b27a]/20',
  'border-[#c9b27a]/45 bg-[#c9b27a]/30',
];

const LABEL_CLASS = 'mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/45';
const FOCUS_CLASS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b27a]';

function usePinned() {
  const [pinned, setPinned] = useState(() => window.matchMedia(PINNED_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(PINNED_QUERY);
    const update = () => {
      setPinned(query.matches);
    };
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
    };
  }, []);

  return pinned;
}

/**
 * Shrinks its content just enough to fit the height it is given, so a long case study still shows
 * in full on a short screen. The content is widened as it is scaled down, so it keeps filling the
 * box's width, and it is never shorter than the box, so its children can spread over the height.
 */
function FitToHeight({ children, className }: { children: ReactNode; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;

    const fit = () => {
      const available = box.clientHeight;
      content.style.minHeight = '';
      const fitsAt = (scale: number) => {
        content.style.width = `${String(100 / scale)}%`;
        return content.offsetHeight * scale <= available;
      };

      let scale = 1;
      if (!fitsAt(1)) {
        // widening the content only ever makes it shorter, so this scale is sure to fit
        let low = available / content.offsetHeight;
        let high = 1;
        for (let pass = 0; pass < 5; pass++) {
          const middle = (low + high) / 2;
          if (fitsAt(middle)) low = middle;
          else high = middle;
        }
        scale = low;
      }
      content.style.width = `${String(100 / scale)}%`;
      content.style.transform = scale < 1 ? `scale(${String(scale)})` : '';
      content.style.minHeight = `${String(available / scale)}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    observer.observe(content);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={boxRef} className={cn('min-h-0', className)}>
      <div ref={contentRef} className="flex origin-top-left flex-col">
        {children}
      </div>
    </div>
  );
}

function CasePanel({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  // When compact every block keeps its natural height with the same gap between them, so the tiles
  // fit their figures; a case with less to say simply makes a shorter card.
  const gap = compact && <div aria-hidden="true" className="h-7" />;
  // a case with only a few figures has room to show them larger
  const fewImpact = compact && study.impact.length <= 2;
  const loneImpact = compact && study.impact.length === 1;
  const fewBreakdown = compact && (study.breakdown?.items.length ?? 0) <= 4;

  return (
    <div className={compact ? 'flex flex-col' : 'space-y-8 md:space-y-10'}>
      <header>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-white/60">
            Case {study.number}
          </span>
          <span className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#c9b27a]">
            {study.tag}
          </span>
        </div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/50">
          {study.client}
        </p>
        <h3
          className={cn(
            'text-2xl font-semibold leading-tight tracking-tight text-white',
            compact ? 'md:text-3xl' : 'md:text-4xl'
          )}
        >
          {study.title}
        </h3>
      </header>

      <div className={cn('max-w-3xl', compact ? 'mt-4 space-y-3' : 'space-y-4')}>
        {study.summary.map((paragraph) => (
          <p
            key={paragraph}
            className={cn('text-base leading-relaxed text-white/70', !compact && 'md:text-lg')}
          >
            {paragraph}
          </p>
        ))}
        {study.topics && (
          <ul className="flex flex-wrap gap-2 pt-2">
            {study.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>

      {study.funnel && (
        <>
          {gap}
          <div>
            <p className={LABEL_CLASS}>Talent funnel</p>
            <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              {study.funnel.map((stage, index) => (
                <li
                  key={stage.label}
                  className={cn(
                    'relative rounded-2xl border p-4 md:p-5',
                    compact && 'flex flex-col justify-center',
                    FUNNEL_TONE[index]
                  )}
                >
                  <span className="block text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {stage.value}
                  </span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-white/55">
                    {stage.label}
                  </span>
                  {index < (study.funnel?.length ?? 0) - 1 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="absolute -right-[1.4rem] top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/35 md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      {gap}
      <div>
        <p className={LABEL_CLASS}>Impact</p>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3 md:gap-4">
          {study.impact.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                'flex rounded-2xl border border-white/10 bg-white/[0.04]',
                // a single figure reads as one line: the number, then what it measures
                loneImpact
                  ? 'flex-row-reverse items-center justify-end gap-5 px-5 py-4'
                  : 'flex-col-reverse gap-2 p-4',
                !loneImpact && (compact ? 'justify-center' : 'justify-end')
              )}
            >
              <dt className={cn('leading-snug text-white/55', fewImpact ? 'text-base' : 'text-sm')}>
                {metric.label}
              </dt>
              <dd
                className={cn(
                  'whitespace-nowrap font-bold tracking-tight',
                  fewImpact ? 'text-4xl' : 'text-2xl sm:text-3xl',
                  index === 0 ? 'text-[#c9b27a]' : 'text-white'
                )}
              >
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {study.breakdown && (
        <>
          {gap}
          <div>
            <p className={LABEL_CLASS}>{study.breakdown.title}</p>
            <dl
              className={cn(
                'grid gap-3',
                !compact && 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4',
                compact &&
                  (fewBreakdown ? 'auto-cols-fr grid-flow-col' : 'grid-cols-4 xl:grid-cols-6')
              )}
            >
              {study.breakdown.items.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    'flex flex-col-reverse gap-1 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3',
                    compact ? 'justify-center' : 'justify-end'
                  )}
                >
                  <dt
                    className={cn(
                      'leading-snug text-white/45',
                      fewBreakdown ? 'text-sm' : 'text-xs'
                    )}
                  >
                    {item.label}
                  </dt>
                  <dd
                    className={cn(
                      'font-semibold tracking-tight text-white',
                      fewBreakdown ? 'text-2xl' : 'text-lg'
                    )}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      )}

      {(study.closing ?? study.note) && (
        <>
          {gap}
          <footer className={compact ? 'space-y-3' : 'space-y-4'}>
            {study.closing && (
              <p
                className={cn(
                  'max-w-3xl border-l-2 border-[#c9b27a] pl-4 text-base leading-relaxed text-white/85',
                  !compact && 'md:text-lg'
                )}
              >
                {study.closing}
              </p>
            )}
            {study.note && <p className="text-xs text-white/40">{study.note}</p>}
          </footer>
        </>
      )}
    </div>
  );
}

export default function CaseStudyExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pinned = usePinned();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = CASE_STUDIES[activeIndex];
  const count = CASE_STUDIES.length;

  // while pinned, the case on show follows how far the section has been scrolled through
  useEffect(() => {
    if (!pinned) return;
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const step = (rect.height - window.innerHeight) / count;
      if (step <= 0) return;
      setActiveIndex(Math.min(count - 1, Math.max(0, Math.floor(-rect.top / step))));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pinned, count]);

  // Scrolls the page to the middle of a case's stretch of the pinned section. It goes through
  // Lenis, which would otherwise carry on to wherever the last wheel scroll was heading and drag
  // the page back to the case it came from.
  const scrollToCase = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const step = (rect.height - window.innerHeight) / count;
    const top = window.scrollY + rect.top + (index + 0.5) * step;

    const lenis = smoothScroller.current;
    if (lenis) lenis.scrollTo(top, { duration: 0.6 });
    else window.scrollTo({ top, behavior: 'smooth' });
  };

  const select = (index: number, moveFocus = false) => {
    const tab = tabRefs.current[index];
    if (moveFocus) tab?.focus({ preventScroll: true });
    if (pinned) {
      scrollToCase(index);
      return;
    }
    setActiveIndex(index);
    const list = listRef.current;
    if (!list || !tab) return;
    // on small screens the tabs are a horizontal strip: keep the chosen one centred
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({
        left: tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | undefined;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else {
      const step = KEY_STEP[event.key];
      if (step !== undefined) next = (activeIndex + step + count) % count;
    }
    if (next === undefined) return;
    event.preventDefault();
    select(next, true);
  };

  const tabs = (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Case studies"
      onKeyDown={handleKeyDown}
      className={
        pinned
          ? 'flex flex-col gap-2'
          : 'relative -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:sticky lg:top-[7.5rem] lg:mx-0 lg:w-[36%] lg:shrink-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden'
      }
    >
      {CASE_STUDIES.map((study, index) => {
        const selected = index === activeIndex;
        return (
          <button
            key={study.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`case-tab-${study.id}`}
            aria-selected={selected}
            aria-controls="case-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => {
              select(index);
            }}
            className={cn(
              'group flex shrink-0 snap-start items-start gap-4 rounded-2xl border px-5 text-left transition-colors duration-300',
              pinned ? 'w-full py-3' : 'w-[17rem] py-4 lg:w-full',
              FOCUS_CLASS,
              selected
                ? 'border-[#c9b27a]/50 bg-[#c9b27a]/10'
                : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
            )}
          >
            <span
              className={cn(
                'pt-0.5 text-sm font-bold tabular-nums transition-colors',
                selected ? 'text-[#c9b27a]' : 'text-white/35'
              )}
            >
              {study.number}
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium uppercase tracking-wide text-white/45">
                {study.client}
              </span>
              <span
                className={cn(
                  'mt-1 block font-semibold leading-snug transition-colors',
                  selected ? 'text-white' : 'text-white/75 group-hover:text-white'
                )}
              >
                {study.title}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );

  const panel = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <CasePanel study={active} />
      </motion.div>
    </AnimatePresence>
  );

  if (pinned) {
    return (
      <section
        id="case-studies"
        ref={sectionRef}
        className="my-8 w-full bg-[#232621] text-white md:my-12"
        style={{ height: `calc(100svh + ${String(count * SCROLL_PER_CASE)}vh)` }}
      >
        {/* the top padding clears the nav pill */}
        <div className="sticky top-0 h-[100svh] pb-5 pt-[7.25rem]">
          <div className="mx-auto flex h-full w-full max-w-[87.5rem] gap-8 px-8">
            <FitToHeight className="w-[36%] shrink-0">
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-10 bg-[#c9b27a]/50" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9b27a]">
                  Selected leadership experience
                </span>
              </div>
              <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white">
                Six engagements.
                <br />
                <span className="text-[#c9b27a]">Measured outcomes.</span>
              </h2>
              <p className="mb-5 mt-3 text-sm leading-relaxed text-white/70">
                Case studies from initiatives delivered by members of the Talencia Global leadership
                team across their professional journeys, including both current and prior
                engagements.
              </p>
              {tabs}
            </FitToHeight>

            <div
              id="case-panel"
              role="tabpanel"
              aria-labelledby={`case-tab-${active.id}`}
              tabIndex={0}
              className={cn('flex min-w-0 flex-1 flex-col rounded-[1.75rem]', FOCUS_CLASS)}
            >
              {/* every case is laid out in the same cell, so the tallest one sets the scale and
                  they all share one type size; each is its own card, only as tall as its content
                  and centred in the height of the column */}
              <FitToHeight className="flex-1">
                <div className="grid flex-1 items-center">
                  {CASE_STUDIES.map((study, index) => (
                    <div
                      key={study.id}
                      aria-hidden={index !== activeIndex}
                      className={cn(
                        'col-start-1 row-start-1 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 transition-opacity duration-300 ease-out',
                        index === activeIndex ? 'opacity-100' : 'invisible opacity-0'
                      )}
                    >
                      <CasePanel study={study} compact />
                    </div>
                  ))}
                </div>
              </FitToHeight>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="my-8 w-full bg-[#232621] py-16 text-white md:my-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Selected leadership experience"
          title={
            <>
              Six engagements.
              <br />
              <span className="text-[#c9b27a]">Measured outcomes.</span>
            </>
          }
          description="Case studies from initiatives delivered by members of the Talencia Global leadership team across their professional journeys, including both current and prior engagements."
        />

        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            {tabs}

            <div
              id="case-panel"
              role="tabpanel"
              aria-labelledby={`case-tab-${active.id}`}
              tabIndex={0}
              className={cn(
                'min-w-0 flex-1 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 md:p-10 lg:min-h-[40rem]',
                FOCUS_CLASS
              )}
            >
              {panel}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
