import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Compass, Dna, Brain, Rocket } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    id: '01',
    title: 'We Understand Your Fit',
    icon: Compass,
    description:
      'We explore your match against 500+ researched companies using AI-powered matching based on your aspirations and skills.',
    highlights: ['Personalized recommendations', 'Clear "Why this pick?"', 'Visual fit comparison'],
  },
  {
    id: '02',
    title: 'We Develop Your Profile & Skills',
    icon: Dna,
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
    title: 'We Prepare You for Opportunities',
    icon: Brain,
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
    title: 'We Manage Your Placement & Outcomes',
    icon: Rocket,
    description:
      'We help track active campus placement drives through your Placement Cell Dashboard helping you apply to aligned roles and monitor your application status in real-time.',
    highlights: [
      'Active campus drives pipeline',
      'AI-assisted helpdesk',
      'Real-time offer tracking',
    ],
  },
];

const PixelTransition = ({
  activeIndex,
  items,
}: {
  activeIndex: number;
  items: typeof JOURNEY_STEPS;
}) => {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (activeIndex !== displayIndex && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayIndex(activeIndex);
      }, 250);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  }, [activeIndex, displayIndex, isTransitioning]);

  const ActiveIcon = items[displayIndex].icon;

  const blockDelays = useMemo(() => {
    return Array.from({ length: 64 }).map(() => Math.random() * 0.15);
  }, []);

  const blocks = Array.from({ length: 64 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning ? 1 : 0 }}
      transition={{ duration: 0.1, delay: blockDelays[i] }}
      className="w-full h-full bg-[#f5f5f0]"
    />
  ));

  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center bg-[#f5f5f0] rounded-[2rem] md:rounded-[3rem] border border-gray-200">
      <motion.div
        key={displayIndex}
        initial={{ scale: 0.9, filter: 'blur(4px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        <ActiveIcon className="w-12 h-12 md:w-20 md:h-20 text-[#4a5d23]" />
      </motion.div>
      <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden grid grid-cols-8 grid-rows-8 z-10 pointer-events-none">
        {blocks}
      </div>
    </div>
  );
};

export default function StudentJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rightColumnRef,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepCount = JOURNEY_STEPS.length;
    let step = Math.floor(latest * stepCount);
    if (step >= stepCount) step = stepCount - 1;
    if (step < 0) step = 0;
    setActiveStep(step);
  });

  // Navbar is ~84px tall. Cards stick right below it.
  const CARD_STICKY_TOP = 100; // px from viewport top

  return (
    <section className="bg-white relative pt-8 pb-[60vh]">
      {/* 
        INJECTED STYLE BLOCK:
        This guarantees the synchronized heights are applied on desktop (>=1024px)
        without relying on fragile Tailwind arbitrary compilation. 
        This is the mathematical magic that ensures everything unsticks together!
      */}
      <style>{`
        @media (min-width: 1024px) {
          .sync-heading { height: calc(max(20vh, 200px) + 650px - 84px); }
          .sync-left { height: 650px; }
          .sync-card-0 { height: 650px; }
          .sync-card-1 { height: 634px; }
          .sync-card-2 { height: 618px; }
          .sync-card-3 { height: 602px; }
        }
      `}</style>

      {/* Shared Wrapper for Sticky Heading and Columns */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MOBILE HEADING (Normal flow, simple sticky) */}
        <div className="lg:hidden sticky z-[60] bg-white py-6 mb-4" style={{ top: '84px' }}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            We Know What Students <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">Need.</span>
          </h2>
        </div>

        {/* DESKTOP HEADING (Absolute wrapper)
            By making the wrapper absolute, it takes up zero space in the normal flow, 
            completely removing the "long space below heading". Because it is inset-0, 
            it perfectly matches the height of the parent container, ensuring the sticky 
            math still works flawlessly to unstick everything at the exact same time.
        */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-[60]">
          <div 
            className="sticky pointer-events-none sync-heading"
            style={{ top: '84px' }}
          >
            <div className="bg-white py-6 pointer-events-auto">
              <h2 className="text-[2.6rem] font-bold tracking-tight text-gray-900">
                We Know What Students <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">Need.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Two Columns 
            lg:pt-[120px] ensures the content starts visually below the absolute desktop heading.
        */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative items-start lg:pt-[120px]">
          
          {/* Left Column (Sticky and centered with cards) */}
          <div 
            className="lg:w-1/3 lg:sticky flex flex-col justify-center items-center lg:items-start z-20 sync-left lg:pl-6 xl:pl-10 lg:pb-32"
            style={{ top: 'max(20vh, 200px)' }}
          >
            {/* Animated Icon */}
            <div className="mb-8 w-full flex justify-center lg:justify-start">
              <PixelTransition activeIndex={activeStep} items={JOURNEY_STEPS} />
            </div>

            {/* Journey Text */}
            <div className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-gray-900 tracking-tight text-center lg:text-left leading-[1.1] mb-6">
              YOUR <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
                JOURNEY
              </span>
              <br className="hidden lg:block" /> WITH US
            </div>
            <p className="text-lg text-gray-600 leading-relaxed text-center lg:text-left max-w-sm">
              Students deserve complete transparency. See exactly what you'll learn, how you'll
              prepare, and how this platform systematically accelerates your career from discovery
              to placement.
            </p>
          </div>

          {/* Right Column (Cards) */}
          <div ref={rightColumnRef} className="lg:w-2/3 relative">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === JOURNEY_STEPS.length - 1;
              
              return (
                <div
                  key={step.id}
                  className={`sticky bg-white rounded-[2rem] p-8 sm:p-10 lg:p-12 border border-gray-200 border-b-[4px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-transform duration-500 sync-card-${index}`}
                  style={{
                    top: `calc(max(20vh, 200px) + ${index * 16}px)`,
                    zIndex: index + 10,
                    marginBottom: '50vh',
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#4a5d23]/10 rounded-xl flex items-center justify-center lg:hidden">
                      <Icon className="w-6 h-6 text-[#4a5d23]" />
                    </div>
                    <div className="text-sm font-bold text-[#4a5d23] uppercase tracking-wide">
                      Phase {step.id}
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-4">
                    {step.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-[#f5f5f0] px-4 sm:px-6 py-4 rounded-xl border border-gray-100"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#4a5d23] shrink-0" />
                        <span className="text-gray-700 font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Callout section — completely outside the flex, scrolls in normally */}
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-[2rem] bg-[#0f0f0f] p-8 sm:p-12 relative overflow-hidden z-10"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Compass className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ffea75]" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">
                Different by Design
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Real Preparation, Not Just Theory.
            </h3>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Every company recommendation is backed by 9-domain research. You practice with real
              interview scenarios, get matched by AI rather than generic job boards, and manage your
              placement drives entirely in-platform. See exactly which companies are hiring and why
              they match you.
            </p>
            <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
