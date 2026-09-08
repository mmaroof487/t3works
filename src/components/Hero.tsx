import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS = [
  {
    id: 'main',
    bgClass: 'bg-white shadow-sm border border-gray-100/50',
    textClass: 'text-gray-900',
    colSpan: 'md:col-span-2 md:row-span-2',
    content: (
      <div className="flex h-full flex-col p-10 md:p-14">
        <div className="mb-8 flex items-center gap-2">
          <span className="rounded-full border border-[#4a5d23]/20 bg-white px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm flex items-center gap-2">
            Great Talent. Global Opportunities.
            <div className="w-4 h-4 rounded-full bg-[#4a5d23] text-white flex items-center justify-center text-[10px]">
              →
            </div>
          </span>
        </div>
        <h1 className="max-w-xl text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
          Hire top tier talent. Build high performance teams.
        </h1>
        <div className="mt-8">
          <button className="rounded-3xl bg-[#0f0f0f] px-6 py-3 text-[15px] font-medium text-white hover:bg-gray-800 transition-colors">
            Hire Top Talent
          </button>
        </div>
      </div>
    ),
    expandedContent: (
      <div className="flex h-full flex-col items-center justify-center p-10 md:p-14">
        <div className="mb-10 flex items-center gap-2">
          <span className="rounded-full border border-[#4a5d23]/20 bg-white px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm flex items-center gap-2">
            The TalenciaGlobal ecosystem
            <div className="w-4 h-4 rounded-full bg-[#4a5d23]/10 text-[#4a5d23] flex items-center justify-center text-[10px]">
              →
            </div>
          </span>
        </div>
        <h1 className="max-w-3xl text-center text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900 md:text-7xl mb-6">
          Hire top tier talent. Build high performance teams.
        </h1>
        <p className="max-w-2xl text-center text-lg text-gray-600 mb-10">
          We help people discover their Talent DNA and accelerate them for high-end engineering
          roles. We specialize in building high-performance tech teams for Fortune 500 Companies and
          fast-growing startups.
        </p>
        <div>
          <button className="rounded-3xl bg-white border border-gray-200 px-8 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
            Find exciting opportunities
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'offline',
    bgClass: 'bg-[#4a5d23]',
    textClass: 'text-white',
    colSpan: 'md:col-span-1 md:row-span-1',
    content: (
      <div className="flex h-full flex-col p-8 md:p-10">
        <h2 className="text-4xl font-medium leading-tight text-white tracking-tight">
          Remote Tech
          <br />
          Workforce
        </h2>
        <div className="mt-auto flex justify-end">
          <span className="rounded-full bg-[#ffea75] px-3 py-1 text-sm font-semibold text-gray-900">
            Save up to 60%
          </span>
        </div>
      </div>
    ),
    expandedContent: (
      <div className="flex h-full flex-col items-center justify-center p-10">
        <h2 className="mb-6 text-center text-5xl font-medium leading-tight text-white md:text-7xl tracking-tight">
          Remote Tech
          <br />
          Workforce
        </h2>
        <p className="text-center text-white/80 max-w-sm mb-10">
          Explore the incredible potential of remote tech workforce with TGL - secure the finest
          talent globally.
        </p>
        <button className="rounded-3xl border border-white/30 bg-transparent px-8 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
          Explore
        </button>
      </div>
    ),
  },
  {
    id: 'session',
    bgClass: 'bg-[#0f0f0f]',
    textClass: 'text-white',
    colSpan: 'md:col-span-1 md:row-span-1',
    content: (
      <div className="flex h-full flex-col p-8 md:p-10">
        <h2 className="text-4xl font-medium leading-tight text-white tracking-tight">
          TGL Campus
          <br />
          Hiring
        </h2>
        <div className="mt-auto flex items-center gap-4">
          <div className="flex -space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-[#0f0f0f]" />
            <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-[#0f0f0f]" />
            <div className="h-10 w-10 rounded-full bg-gray-400 border-2 border-[#0f0f0f]" />
          </div>
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white">
            200+ Clients
          </span>
        </div>
      </div>
    ),
    expandedContent: (
      <div className="flex h-full flex-col items-center justify-center p-10">
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex -space-x-4">
            <div className="h-14 w-14 rounded-full bg-gray-200 border-4 border-[#0f0f0f]" />
            <div className="h-14 w-14 rounded-full bg-gray-300 border-4 border-[#0f0f0f]" />
            <div className="h-14 w-14 rounded-full bg-gray-400 border-4 border-[#0f0f0f]" />
          </div>
          <span className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white">
            200+ Clients
          </span>
        </div>
        <h2 className="text-center text-5xl font-medium leading-tight text-white md:text-7xl tracking-tight mb-6">
          TGL Campus
          <br />
          Hiring
        </h2>
        <p className="text-center text-white/80 max-w-sm mb-10">
          Hire Ready To Deploy engineers embodying your values, boosting agility while reducing
          costs.
        </p>
        <button className="rounded-3xl border border-white/30 bg-transparent px-8 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
          Explore
        </button>
      </div>
    ),
  },
];

export default function Hero() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (activeCard) {
        setActiveCard(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCard]);

  const handleHoverStart = (id: string) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveCard(id);
    }, 250); // 250ms delay requires intentional hover
  };

  const handleHoverEnd = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center pt-[84px] pb-12">
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative h-[650px] w-full">
          <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
            {CARDS.map((card) => (
              <div key={card.id} className={card.colSpan}>
                {activeCard !== card.id && (
                  <motion.div
                    layoutId={`card-${card.id}`}
                    onHoverStart={() => handleHoverStart(card.id)}
                    onHoverEnd={handleHoverEnd}
                    className={`h-full w-full relative overflow-hidden rounded-[2.5rem] cursor-pointer ${card.bgClass} ${card.textClass}`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="h-full w-full"
                    >
                      {card.content}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {activeCard && (
              <div className="absolute inset-0 z-50 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-[2.5rem] bg-white/20 backdrop-blur-md pointer-events-auto"
                  onHoverStart={() => setActiveCard(null)}
                />

                {CARDS.map((card) =>
                  card.id === activeCard ? (
                    <motion.div
                      key={`overlay-${card.id}`}
                      layoutId={`card-${card.id}`}
                      className={`pointer-events-auto absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-2xl ${card.bgClass} ${card.textClass}`}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="h-full w-full"
                      >
                        {card.expandedContent}
                      </motion.div>
                    </motion.div>
                  ) : null
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
