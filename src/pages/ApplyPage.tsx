import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, FileText, GraduationCap, Search, Users } from 'lucide-react';
import { SolidBriefcase, type IconType } from '../components/JourneyCards';
import CandidatePortal from './CandidatePortal';
import EnterprisePortal from './EnterprisePortal';

interface Path {
  id: 'student' | 'company';
  label: string;
  icon: IconType;
  title: string;
  lead: string;
  accent: string;
  text: string;
  steps: { icon: IconType; title: string; text: string }[];
  cta: string;
  image: string;
  imageClass: string;
  accentClass: string;
  dotClass: string;
  ctaClass: string;
  badgeBg: string;
  badgeText: string;
}

const PATHS: Path[] = [
  {
    id: 'student',
    label: 'For students',
    icon: GraduationCap,
    title: 'Turn your potential',
    lead: 'into',
    accent: 'engineering capability.',
    text: 'Build the skills, experience and confidence needed to become enterprise-ready.',
    steps: [
      { icon: Search, title: 'Discover', text: 'Understand your fit' },
      { icon: BarChart3, title: 'Develop', text: 'Build real skills' },
      { icon: FileText, title: 'Prepare', text: 'Practice and get feedback' },
      { icon: SolidBriefcase, title: 'Get Placed', text: 'Access top opportunities' },
    ],
    cta: 'Apply as Student',
    image: '/images/Students%20Image.webp',
    imageClass: 'w-[62%] translate-x-[10%] mix-blend-darken xl:w-[88%] xl:translate-x-[8%]',
    accentClass: 'text-[#4a5d23]',
    dotClass: 'bg-[#4a5d23]',
    ctaClass:
      'bg-gradient-to-r from-[#4a5d23] to-[#5c7a2a] text-white hover:brightness-110 shadow-md shadow-[#4a5d23]/20',
    badgeBg: 'bg-[#4a5d23]/8 border-[#4a5d23]/20',
    badgeText: 'text-[#4a5d23]',
  },
  {
    id: 'company',
    label: 'For companies',
    icon: SolidBriefcase,
    title: 'Hire engineers built',
    lead: 'for',
    accent: 'real work.',
    text: 'Access AI-trained, mentor-validated engineers ready for real-world engineering environments.',
    steps: [
      { icon: Search, title: 'Discover', text: 'Find the right talent' },
      { icon: BarChart3, title: 'Validate', text: 'Through projects & PoCs' },
      { icon: Users, title: 'Hire', text: 'With confidence' },
    ],
    cta: 'Hire AI Talent',
    image: '/images/Isometric%20Smart%20City%20Business%20District.webp',
    imageClass: 'w-[95%] translate-x-[24%]',
    accentClass: 'text-[#a3854a]',
    dotClass: 'bg-[#a3854a]',
    ctaClass:
      'bg-gradient-to-r from-[#c9b27a] to-[#a88f5c] text-gray-900 hover:brightness-110 shadow-md shadow-[#c9b27a]/30',
    badgeBg: 'bg-[#a3854a]/8 border-[#a3854a]/20',
    badgeText: 'text-[#a3854a]',
  },
];

const IMAGE_FADE = {
  maskImage:
    'linear-gradient(to right, transparent 5%, #000 45%), linear-gradient(to bottom, transparent, #000 25%)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
};

// Network backdrop matching the hero / student-journey sections
const NETWORK_FADE: React.CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, #000 20%, #000 75%, transparent), linear-gradient(to right, #000 60%, transparent)',
};

export default function ApplyPage() {
  const [role, setRole] = useState<'student' | 'company' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [role]);

  if (role === 'student') {
    return (
      <CandidatePortal
        onBack={() => {
          setRole(null);
        }}
      />
    );
  }

  if (role === 'company') {
    return (
      <EnterprisePortal
        onBack={() => {
          setRole(null);
        }}
      />
    );
  }

  return (
    <section className="relative w-full overflow-x-clip pb-16 pt-28 md:pb-24 md:pt-36 bg-transparent">
      {/* Backdrop art — same neural-network motif as hero & student-journey */}
      <img
        src="/images/Minimalist%20Neural%20Network%20Background.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden w-[28vw] max-w-none mix-blend-darken opacity-60 lg:block"
        style={NETWORK_FADE}
      />

      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8">
        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <div className="mb-3 flex items-center gap-4">
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="-mr-1 h-2.5 w-2.5 rounded-full bg-[#4a5d23]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              Choose your path
            </span>
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
          </div>
          <h1 className="mb-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
            Find the path built <span className="text-[#4a5d23]">for</span>{' '}
            <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
              you.
            </span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Whether you&apos;re building your career or building your engineering team,
            <br className="hidden sm:block" /> there&apos;s a path designed for you.
          </p>
        </motion.div>

        {/* Path chooser cards */}
        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-12">
          <AnimatePresence>
            {PATHS.map((path, index) => (
              <motion.div
                key={path.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-[#fbfbf9] p-7 shadow-sm sm:p-8 flex flex-col cursor-pointer transition-shadow hover:shadow-xl hover:shadow-black/[0.07]"
                onClick={() => {
                  setRole(path.id);
                }}
              >
                {/* Background image */}
                <img
                  src={path.image}
                  alt=""
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 right-0 hidden max-w-none sm:block ${path.imageClass} transition-transform duration-500 group-hover:scale-105`}
                  style={IMAGE_FADE}
                />

                <div className="relative flex h-full flex-col items-start z-10">
                  {/* Icon + badge */}
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/[0.07] bg-white shadow-[0_8px_24px_-6px_rgba(40,50,20,0.18)]">
                      <path.icon className={`h-6 w-6 ${path.accentClass}`} aria-hidden="true" />
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${path.badgeBg} ${path.badgeText}`}
                    >
                      {path.label}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="mb-2.5 text-2xl font-semibold leading-tight tracking-tight text-gray-900 xl:text-[2rem]">
                    {path.title}
                    <br />
                    {path.lead} <span className={path.accentClass}>{path.accent}</span>
                  </h2>
                  <p className="mb-5 max-w-[21rem] text-[0.9375rem] leading-relaxed text-gray-600">
                    {path.text}
                  </p>

                  {/* Steps timeline */}
                  <ol className="relative mb-6 space-y-1.5 pl-8">
                    <span
                      className="absolute bottom-6 left-[0.3125rem] top-6 w-px bg-black/15"
                      aria-hidden="true"
                    />
                    {path.steps.map((step) => (
                      <li key={step.title} className="relative">
                        <span
                          className={`absolute -left-8 top-1/2 h-[0.6875rem] w-[0.6875rem] -translate-y-1/2 rounded-full ring-4 ring-[#fbfbf9] ${path.dotClass}`}
                          aria-hidden="true"
                        />
                        <div className="flex items-center gap-3 rounded-xl bg-[#f3f3ee] py-1.5 pl-2 pr-6">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                            <step.icon
                              className={`h-5 w-5 ${path.accentClass}`}
                              aria-hidden="true"
                            />
                          </span>
                          <span>
                            <span className="block text-[0.9375rem] font-medium leading-snug text-gray-900">
                              {step.title}
                            </span>
                            <span className="block text-[0.8125rem] text-gray-500">
                              {step.text}
                            </span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      setRole(path.id);
                    }}
                    className={`mt-auto inline-flex items-center gap-3 whitespace-nowrap rounded-full px-8 py-3 text-[0.9375rem] font-medium transition-all ${path.ctaClass}`}
                  >
                    {path.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* OR divider */}
          <span
            className="absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.07] bg-[#f5f5f0] text-sm font-semibold text-gray-500 shadow-sm lg:flex"
            aria-hidden="true"
          >
            OR
          </span>
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          Merit-gated · Zero upfront fee for companies · Free for students
        </motion.p>
      </div>
    </section>
  );
}
