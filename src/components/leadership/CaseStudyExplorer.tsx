import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '../../data/leadership';
import { cn } from '../../lib/cn';
import { Reveal, SectionHeading } from './primitives';

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

function CasePanel({ study }: { study: CaseStudy }) {
  return (
    <div className="space-y-8 md:space-y-10">
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
        <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
          {study.title}
        </h3>
      </header>

      <div className="max-w-3xl space-y-4">
        {study.summary.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-white/70 md:text-lg">
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
        <div>
          <p className={LABEL_CLASS}>Talent funnel</p>
          <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {study.funnel.map((stage, index) => (
              <li
                key={stage.label}
                className={cn('relative rounded-2xl border p-4 md:p-5', FUNNEL_TONE[index])}
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
      )}

      <div>
        <p className={LABEL_CLASS}>Impact</p>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3 md:gap-4">
          {study.impact.map((metric, index) => (
            <div
              key={metric.label}
              className="flex flex-col-reverse justify-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <dt className="text-sm leading-snug text-white/55">{metric.label}</dt>
              <dd
                className={cn(
                  'whitespace-nowrap text-2xl font-bold tracking-tight sm:text-3xl',
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
        <div>
          <p className={LABEL_CLASS}>{study.breakdown.title}</p>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {study.breakdown.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse justify-end gap-1 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3"
              >
                <dt className="text-xs leading-snug text-white/45">{item.label}</dt>
                <dd className="text-lg font-semibold tracking-tight text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {(study.closing ?? study.note) && (
        <footer className="space-y-4">
          {study.closing && (
            <p className="max-w-3xl border-l-2 border-[#c9b27a] pl-4 text-base leading-relaxed text-white/85 md:text-lg">
              {study.closing}
            </p>
          )}
          {study.note && <p className="text-xs text-white/40">{study.note}</p>}
        </footer>
      )}
    </div>
  );
}

export default function CaseStudyExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = CASE_STUDIES[activeIndex];

  const select = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab) return;
    if (moveFocus) tab.focus({ preventScroll: true });
    // on small screens the tabs are a horizontal strip: keep the chosen one centred
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({
        left: tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = CASE_STUDIES.length;
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

  return (
    <section
      id="case-studies"
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
            <div
              ref={listRef}
              role="tablist"
              aria-label="Case studies"
              onKeyDown={handleKeyDown}
              className="relative -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:sticky lg:top-[7.5rem] lg:mx-0 lg:w-[36%] lg:shrink-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                      'group flex w-[17rem] shrink-0 snap-start items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 lg:w-full',
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
