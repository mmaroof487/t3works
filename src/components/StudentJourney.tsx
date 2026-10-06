import { motion } from 'framer-motion';
import { ChartNoAxesCombined, FileUser, GraduationCap } from 'lucide-react';
import JourneyCards, { SolidBriefcase, type IconType, type JourneyStep } from './JourneyCards';

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

export default function StudentJourney() {
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
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-5xl md:mb-20"
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
          <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Students deserve complete transparency. See exactly what you&apos;ll learn, how
            you&apos;ll prepare, and how this platform systematically accelerates your career from
            discovery to placement.
          </p>
        </motion.div>

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
      </div>
    </section>
  );
}
