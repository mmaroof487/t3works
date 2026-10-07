import { motion } from 'framer-motion';
import { Landmark, Users, Waypoints } from 'lucide-react';
import JourneyCards, { type IconType, type JourneyStep } from './JourneyCards';
import PinnedJourney from './PinnedJourney';
import { ART_EDGE_FADE } from '../lib/artEdgeFade';
import { usePinnedJourney } from '../lib/usePinnedJourney';

const STEPS: JourneyStep[] = [
  {
    id: '01',
    icon: Landmark as IconType,
    title: 'We Bridge Academia & Supply to Enterprises',
    description:
      'Degree programs and training providers build vital knowledge, but top enterprise employers demand immediate AI product execution. We bridge academia and market supply directly to enterprise demand.',
    highlights: [
      'Academia to enterprise demand',
      'Immediate AI product execution',
      'Market-ready builders',
    ],
  },
  {
    id: '02',
    icon: Users as IconType,
    title: 'We Guide Students by Mentors, Experts & Consultants',
    description:
      'Candidates learn directly from active Industry Mentors, Tech Experts and Enterprise Consultants who bring real-world production engineering into every project.',
    highlights: ['Real-world architectural reviews', 'Code audits', 'Project governance'],
  },
  {
    id: '03',
    icon: Waypoints as IconType,
    title: 'Career Realignment for Senior Talent',
    description:
      'Experienced developers undergo an accelerated merit spine, mastering multi-agent frameworks and system design to pivot into high-value enterprise AI roles.',
    highlights: ['Accelerated merit spine', 'LangChain & LangGraph mastery', 'System design'],
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
          For universities
        </span>
        <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
      </div>
      <h2 className="mb-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        Bridging Academia to{' '}
        <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
          Enterprises.
        </span>
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
        Higher education builds the foundation, but enterprise demands Day-One ready builders. T3 AI
        Works bridges academic supply with market reality, converting raw aptitude into market-ready
        builders.
      </p>
    </motion.div>
  );
}

export default function UniversityJourney() {
  const pinned = usePinnedJourney();

  return (
    <section className="relative w-full overflow-x-clip bg-[#f5f5f0] pb-8 pt-4 md:pb-12 md:pt-6">
      {/* faint network backdrop straddling the seam with the section above, as in the students
          section */}
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
          <PinnedJourney steps={STEPS} heading={<Heading className="mb-5 max-w-5xl" />} />
        ) : (
          <>
            <Heading className="mb-16 max-w-5xl md:mb-20" />
            <div className="relative">
              {/* campus illustration rising from behind the last card (wide screens only). Its paper is
              lighter than the page, so a darken blend plus a soft edge fade leaves only the artwork. */}
              <img
                src="/images/universities.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full right-0 hidden w-[38%] max-w-none translate-y-[6%] mix-blend-darken xl:block"
                style={ART_EDGE_FADE}
              />
              {/* lifted above the next section's backdrop art, which straddles the seam and would
              otherwise tint the corner of the first card */}
              <JourneyCards steps={STEPS} className="relative z-10 sm:grid-cols-2 lg:grid-cols-3" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
