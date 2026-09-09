import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS = [
  {
    id: 'main',
    expandable: false,
    bgClass: 'bg-white shadow-sm border border-gray-100/50',
    bgImage: '/images/bgcard.webp',
    bgImagePosition: 'object-left mt-36',
    textClass: 'text-gray-900',
    colSpan: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
    mobileHeight: 'min-h-[450px] sm:min-h-[500px] lg:min-h-0',
    content: (_isActive: boolean, _isDesktop: boolean) => (
      <div className="flex h-full flex-col p-6 sm:p-10 lg:p-14">
        <div className="mb-6 lg:mb-8 flex items-center gap-2 relative z-10">
          <span className="rounded-full border border-[#4a5d23]/20 bg-white px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm flex items-center gap-2">
            Great Talent. Global Opportunities.
            <div className="w-4 h-4 rounded-full bg-[#4a5d23] text-white flex items-center justify-center text-[10px]">
              →
            </div>
          </span>
        </div>
        <h1 className="max-w-xl text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900 lg:text-7xl relative z-10">
          Hire top tier talent. Build high performance teams.
        </h1>
        <div className="mt-6 lg:mt-8 relative z-10">
          <button className="group relative rounded-full bg-[#0f0f0f] px-8 py-4 text-[15px] font-medium text-white hover:bg-[#1a1a1a] transition-colors shadow-sm">
            <div className="absolute -inset-[5px] pointer-events-none rounded-full border-[3px] border-[#0f0f0f] opacity-0 transition-all duration-[600ms] ease-out group-hover:opacity-100 [-webkit-mask-image:linear-gradient(to_right,white,white),linear-gradient(to_left,white,white)] [-webkit-mask-position:left,right] [-webkit-mask-repeat:no-repeat,no-repeat] [-webkit-mask-size:0%_100%,0%_100%] group-hover:[-webkit-mask-size:50.5%_100%,50.5%_100%]" />
            <span className="relative z-10">Hire Top Talent</span>
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'offline',
    expandable: true,
    bgClass: 'bg-[#4a5d23]',
    bgImage: '/images/bgcard2.webp',
    bgImagePosition: 'object-left',
    textClass: 'text-white',
    colSpan: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
    mobileHeight: 'min-h-[400px] sm:min-h-[450px] lg:min-h-0',
    content: (isActive: boolean, isDesktop: boolean) => (
      <div
        className={`relative flex h-full flex-col p-6 lg:p-10 ${isActive || !isDesktop ? 'items-start justify-center lg:w-[55%]' : ''}`}
      >
        <motion.h2
          layout="position"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
          className={`font-medium leading-tight text-white tracking-tight relative z-10 ${isActive || !isDesktop ? 'mb-4 text-left text-3xl sm:text-4xl lg:text-7xl lg:mb-6' : 'text-3xl sm:text-4xl'}`}
        >
          Remote Tech
          <br />
          Workforce
        </motion.h2>

        <AnimatePresence>
          {!isActive && isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex justify-end z-10"
            >
              <span className="rounded-full bg-[#ffea75] px-3 py-1 text-sm font-semibold text-gray-900 shadow-md">
                Save up to 60%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(isActive || !isDesktop) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-col items-start"
            >
              <div className="mb-6 lg:hidden">
                <span className="rounded-full bg-[#ffea75] px-3 py-1 text-sm font-semibold text-gray-900 shadow-md">
                  Save up to 60%
                </span>
              </div>
              <p className="text-left text-white/80 max-w-sm mb-6 lg:mb-10 relative z-10">
                Explore the incredible potential of remote tech workforce with T3W - secure the
                finest talent globally.
              </p>
              <button className="rounded-3xl border border-white/30 bg-transparent px-8 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors relative z-10">
                Explore
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),
  },
  {
    id: 'session',
    bgClass: 'bg-[#0f0f0f]',
    bgImage: '/images/bgcard3.webp',
    bgImagePosition: 'object-left',
    textClass: 'text-white',
    colSpan: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
    mobileHeight: 'min-h-[420px] sm:min-h-[450px] lg:min-h-0',
    content: (isActive: boolean, isDesktop: boolean) => (
      <div
        className={`relative flex h-full flex-col p-6 lg:p-10 ${isActive || !isDesktop ? 'items-start justify-center lg:w-[55%]' : ''}`}
      >
        <AnimatePresence>
          {(isActive || !isDesktop) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="mb-8 flex flex-col items-start gap-4"
            >
              <div className="flex -space-x-4">
                <div className="h-14 w-14 rounded-full bg-gray-200 border-4 border-[#0f0f0f]" />
                <div className="h-14 w-14 rounded-full bg-gray-300 border-4 border-[#0f0f0f]" />
                <div className="h-14 w-14 rounded-full bg-gray-400 border-4 border-[#0f0f0f]" />
              </div>
              <span className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white">
                200+ Clients
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h2
          layout="position"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
          className={`font-medium leading-tight text-white tracking-tight relative z-10 ${isActive || !isDesktop ? 'text-left text-3xl sm:text-4xl lg:text-7xl mb-4 lg:mb-6' : 'text-3xl sm:text-4xl'}`}
        >
          T3W Campus
          <br />
          Hiring
        </motion.h2>

        <AnimatePresence>
          {!isActive && isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex items-center gap-3 z-10"
            >
              <div className="flex -space-x-3 hidden sm:flex">
                <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-[#0f0f0f]" />
                <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-[#0f0f0f]" />
                <div className="h-10 w-10 rounded-full bg-gray-400 border-2 border-[#0f0f0f]" />
              </div>
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white bg-black/20 backdrop-blur-sm">
                200+ Clients
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(isActive || !isDesktop) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-col items-start"
            >
              <p className="text-left text-white/80 max-w-sm mb-6 lg:mb-10 relative z-10">
                Hire Ready To Deploy engineers embodying your values, boosting agility while
                reducing costs.
              </p>
              <button className="rounded-3xl border border-white/30 bg-transparent px-8 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors relative z-10">
                Explore
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ),
  },
];

export default function Hero() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (activeCard) {
        setActiveCard(null);
      }
    };
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop && activeCard) {
        setActiveCard(null);
      }
    };

    handleResize(); // Initial check

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeCard]);

  const handleHoverStart = (id: string) => {
    if (window.innerWidth < 1024) return;
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
    <section className="flex min-h-screen w-full items-center justify-center pt-[84px] pb-12 relative">
      <div className="absolute top-6 left-4 lg:hidden z-50">
        <div className="inline-flex items-baseline text-black">
          <span className="font-open-sauce text-4xl font-extrabold tracking-tight">t3</span>
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 -10% 0 0)' }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            className="font-batangas text-2xl ml-1 text-[#4a5d23]"
          >
            works
          </motion.span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative h-auto lg:h-[650px] w-full">
          <AnimatePresence>
            {activeCard && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 rounded-[2.5rem] bg-white/20 backdrop-blur-md pointer-events-auto"
                onHoverStart={() => {
                  setActiveCard(null);
                }}
              />
            )}
          </AnimatePresence>

          <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
            {CARDS.map((card) => {
              const isActive = activeCard === card.id;
              const isExpandable = card.expandable !== false;

              return (
                <div key={card.id} className={`${card.colSpan} ${card.mobileHeight || ''}`}>
                  {isActive && <div className="h-full w-full" />}
                  <motion.div
                    layout
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    onHoverStart={() => {
                      if (!activeCard && isExpandable) handleHoverStart(card.id);
                    }}
                    onHoverEnd={handleHoverEnd}
                    onMouseLeave={() => {
                      if (isActive) setActiveCard(null);
                    }}
                    className={`
                      ${isActive ? 'absolute inset-0 z-50 shadow-2xl pointer-events-auto' : `relative h-full w-full z-10 ${isExpandable ? 'cursor-pointer' : ''}`}
                      overflow-hidden rounded-[2.5rem] ${card.bgClass} ${card.textClass}
                    `}
                  >
                    {card.bgImage && (
                      <motion.img
                        layout
                        animate={{ x: isExpandable ? (isActive ? '35%' : '5%') : '0%' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        src={card.bgImage}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover ${card.bgImagePosition || 'object-center'} z-0 pointer-events-none`}
                        style={
                          isExpandable
                            ? {
                                WebkitMaskImage:
                                  'linear-gradient(to right, transparent 0%, black 30%)',
                                maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
                              }
                            : undefined
                        }
                      />
                    )}

                    <div className="relative z-10 h-full w-full">
                      {card.content(isActive, isDesktop)}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
