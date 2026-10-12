import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle, ChevronDown, Lightbulb, Zap, Wrench, GraduationCap } from 'lucide-react';
import { AccordionItem } from './AccordionItem';
import { SYSTEMS_DATA } from '../data/systems';
import { scrollByAnimated } from '../lib/scrollToSection';
import { smoothScroller } from '../lib/smoothScroller';

type System = (typeof SYSTEMS_DATA)[0];

interface SystemModalProps {
  system: System;
  onClose: () => void;
  /** show the modal fully formed, with no entrance or exit animation */
  instant?: boolean;
  /**
   * Lay the modal over its own section, as the leadership profiles do, instead of over the whole
   * screen: the caller renders it inside a `relative` section, the page stays scrollable and the
   * section is brought on screen.
   */
  anchored?: boolean;
  /** anchored only: the drawing shown in the header in place of the system's photo */
  art?: string;
}

// the five write-ups every system carries; the full-screen modal shows the same text in accordions
const SECTIONS = [
  {
    title: 'Engineering Problem Statement',
    Icon: AlertTriangle,
    text: 'Building a robust system requires deep understanding of the core complexities. This phase focuses on mapping out edge cases, defining data boundaries, and translating abstract business rules into concrete engineering requirements.',
  },
  {
    title: 'System Design & Architecture',
    Icon: Lightbulb,
    text: 'The architecture follows a decoupled, modular design. Using event-driven patterns, we ensure that individual components can scale independently while maintaining strict data consistency across the entire pipeline.',
  },
  {
    title: 'Key Engineering Features',
    Icon: Zap,
    text: 'Core features include automated schema generation, dynamic payload routing, robust error recovery mechanisms, and a multi-threaded execution layer designed for high-throughput data processing.',
  },
  {
    title: 'Technology Stack',
    Icon: Wrench,
    text: 'Built heavily on Python, FastAPI, and PostgreSQL with pgvector for storage. We orchestrate complex workflows using LangChain and deploy the entire system using containerized Docker environments for maximum reliability.',
  },
  {
    title: 'Engineering Competencies Developed',
    Icon: GraduationCap,
    text: 'Engineers master system modeling, complex database normalization, asynchronous programming, advanced prompt engineering, and building resilient API architectures from scratch.',
  },
];

/**
 * The anchored modal's content, kept short: a tinted header carrying the system's drawing (as on
 * its card), the metrics as one strip, and the five write-ups as a single list of dropdowns with
 * one open at a time, so the reader takes in one topic at once.
 */
function CompactContent({
  system,
  art,
  onClose,
}: {
  system: System;
  art?: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const titleId = `system-${system.num}-title`;
  const metrics = system.metrics.split(' | ').map((metric) => {
    const match = /^([^\s]+)\s+(.*)$/.exec(metric);
    return match ? { value: match[1], label: match[2] } : { value: metric, label: 'Metric' };
  });

  return (
    <div role="dialog" aria-labelledby={titleId} className="flex min-h-0 flex-col">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-gray-600 transition-colors hover:bg-[#4a5d23] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23]"
      >
        <X size={16} aria-hidden="true" />
      </button>

      {/* the header stays put and the scrollbar's width is always reserved, so opening a dropdown
          that makes the body scroll does not shift anything sideways */}
      <header className="relative flex shrink-0 items-center justify-between gap-6 overflow-hidden border-b border-[#4a5d23]/10 bg-gradient-to-br from-[#f3f5ea] to-[#e9eedb] px-5 py-4 sm:px-7 sm:py-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle,_rgba(74,93,35,0.16)_1px,_transparent_1px)] [background-size:0.75rem_0.75rem] [mask-image:linear-gradient(to_right,transparent,black)]"
        />
        <div className="relative min-w-0">
          <span className="mb-2 inline-flex rounded-full bg-[#4a5d23] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white">
            System {system.num}
          </span>
          <h2
            id={titleId}
            className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-[1.75rem]"
          >
            {system.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#4a5d23]">{system.subtitle}</p>
        </div>
        <img
          src={art ?? system.img}
          alt=""
          className={
            art
              ? 'relative mr-10 hidden h-[5.5rem] w-auto shrink-0 sm:block'
              : 'relative mr-10 hidden h-24 w-36 shrink-0 rounded-xl object-cover sm:block'
          }
        />
      </header>

      <div
        data-lenis-prevent
        className="custom-scrollbar min-h-0 overflow-y-auto overscroll-contain [scrollbar-gutter:stable] [scrollbar-width:thin]"
      >
        <div className="p-5 pr-3 sm:py-6 sm:pl-7 sm:pr-5">
          <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-black/[0.07] bg-[#f7f8f3] sm:grid-cols-4 sm:divide-x sm:divide-black/[0.07]">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col-reverse px-3 py-2.5 text-center">
                <dt className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-gray-500">
                  {metric.label}
                </dt>
                <dd className="text-lg font-bold leading-tight text-[#232621]">{metric.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[0.9375rem] leading-relaxed text-gray-700">{system.desc}</p>

          <ul className="mt-4 divide-y divide-black/[0.07] overflow-hidden rounded-xl border border-black/[0.07]">
            {SECTIONS.map(({ title, Icon, text }, i) => {
              const isOpen = open === i;
              const panelId = `system-${system.num}-section-${String(i)}`;
              return (
                <li key={title}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        setOpen(isOpen ? null : i);
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#4a5d23]/[0.04] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#4a5d23]"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${isOpen ? 'bg-[#8ba05f]/25 text-[#4a5d23]' : 'bg-black/[0.05] text-gray-500'}`}
                      >
                        <Icon size={14} aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-sm font-semibold text-[#232621]">{title}</span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pl-14 pr-5 text-[0.8125rem] leading-relaxed text-gray-600">
                          {text}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SystemModal({
  system,
  onClose,
  instant = false,
  anchored = false,
  art,
}: SystemModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchored) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [anchored, onClose]);

  // Anchored, the overlay only covers its section and the page stays scrollable, so bring the modal
  // on screen. It sits in the middle of the section, and is brought to the middle of the screen
  // that the nav pill leaves free: the pill is at the top from lg and at the bottom below that.
  // The scroll goes through Lenis, which replaces whatever wheel scroll it is still easing;
  // scrolling the window directly would be snapped back to that scroll's target.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!anchored || !overlay) return;

    const rect = overlay.getBoundingClientRect();
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const width = window.innerWidth;
    const navShift = (width >= 1024 ? 3 : width >= 768 ? -4 : -2.5) * rem;
    const distance = rect.top + rect.height / 2 - (window.innerHeight / 2 + navShift);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = smoothScroller.current;
    if (lenis) {
      lenis.scrollTo(window.scrollY + distance, {
        immediate: reducedMotion,
        duration: 0.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else if (reducedMotion) {
      window.scrollTo(0, window.scrollY + distance);
    } else {
      scrollByAnimated(distance);
    }
  }, [anchored]);

  const modal = (
    <div
      ref={overlayRef}
      className={
        anchored
          ? 'absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6'
          : 'fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 md:p-12 overflow-hidden pointer-events-auto'
      }
    >
      <motion.div
        initial={instant ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={instant ? undefined : { opacity: 0 }}
        onClick={onClose}
        className={`absolute inset-0 cursor-pointer ${anchored ? 'backdrop-blur-sm' : 'bg-black/80'}`}
      />

      <motion.div
        initial={instant ? false : { opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={instant ? undefined : { opacity: 0, scale: 0.95, y: 40 }}
        transition={instant ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 300 }}
        className={
          anchored
            ? 'relative z-10 flex max-h-[min(calc(100dvh-7rem),100%)] md:max-h-[min(calc(100dvh-10.5rem),100%)] lg:max-h-[min(calc(100dvh-8.5rem),100%)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-2xl lg:max-w-4xl'
            : 'bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden w-full h-[90dvh] sm:h-auto max-w-4xl sm:max-h-[90vh] flex flex-col relative z-10 shadow-2xl flex-1 transform-gpu'
        }
      >
        {anchored ? (
          <CompactContent system={system} art={art} onClose={onClose} />
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition-colors backdrop-blur-sm"
            >
              <X size={20} />
            </button>

            <div
              data-lenis-prevent
              className="overflow-y-auto w-full h-full custom-scrollbar pb-10"
            >
              {/* Hero Image */}
              <div className="h-56 sm:h-80 w-full relative shrink-0">
                <img src={system.img} alt={system.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <motion.div
                  initial={instant ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="absolute bottom-6 left-6 sm:left-10 right-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center px-3 py-1 rounded-full bg-[#8ba05f]/80 border border-[#8ba05f] text-white font-bold text-xs shadow-sm">
                      System {system.num}
                    </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                    {system.title}
                  </h2>
                  <p className="text-lg text-gray-300 font-medium">{system.subtitle}</p>
                </motion.div>
              </div>

              <motion.div
                initial={instant ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 sm:p-10"
              >
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {system.metrics.split(' | ').map((metric: string, idx: number) => {
                    const match = /^([^\s]+)\s+(.*)$/.exec(metric);
                    const value = match ? match[1] : metric;
                    const label = match ? match[2] : '';
                    return (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-[#8ba05f]/30 transition-colors"
                      >
                        <span className="text-2xl font-black text-[#232621] mb-1">{value}</span>
                        <span className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-wider">
                          {label || 'Metric'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-10">{system.desc}</p>

                {/* Accordions */}
                <div className="space-y-4">
                  <AccordionItem
                    title="Engineering Problem Statement"
                    icon={<AlertTriangle size={18} />}
                    defaultOpen
                  >
                    Building a robust system requires deep understanding of the core complexities.
                    This phase focuses on mapping out edge cases, defining data boundaries, and
                    translating abstract business rules into concrete engineering requirements.
                  </AccordionItem>
                  <AccordionItem
                    title="System Design & Architecture"
                    icon={<Lightbulb size={18} />}
                  >
                    The architecture follows a decoupled, modular design. Using event-driven
                    patterns, we ensure that individual components can scale independently while
                    maintaining strict data consistency across the entire pipeline.
                  </AccordionItem>
                  <AccordionItem title="Key Engineering Features" icon={<Zap size={18} />}>
                    Core features include automated schema generation, dynamic payload routing,
                    robust error recovery mechanisms, and a multi-threaded execution layer designed
                    for high-throughput data processing.
                  </AccordionItem>
                  <AccordionItem title="Technology Stack" icon={<Wrench size={18} />}>
                    Built heavily on Python, FastAPI, and PostgreSQL with pgvector for storage. We
                    orchestrate complex workflows using LangChain and deploy the entire system using
                    containerized Docker environments for maximum reliability.
                  </AccordionItem>
                  <AccordionItem
                    title="Engineering Competencies Developed"
                    icon={<GraduationCap size={18} />}
                  >
                    Engineers master system modeling, complex database normalization, asynchronous
                    programming, advanced prompt engineering, and building resilient API
                    architectures from scratch.
                  </AccordionItem>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );

  return anchored ? modal : createPortal(modal, document.body);
}
