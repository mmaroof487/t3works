import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, FileText, GraduationCap, Search, Users } from 'lucide-react';
import { SolidBriefcase, type IconType } from './JourneyCards';

interface Path {
  label: string;
  icon: IconType;
  title: string;
  /** second headline line: plain lead-in, then the coloured accent */
  lead: string;
  accent: string;
  text: string;
  steps: { icon: IconType; title: string; text: string }[];
  to: string;
  cta: string;
  image: string;
  /** image sizing/blend, differs per illustration */
  imageClass: string;
  accentClass: string;
  dotClass: string;
  ctaClass: string;
}

const PATHS: Path[] = [
  {
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
    to: '/apply',
    cta: 'Explore Student Journey',
    image: '/images/Students%20Image.webp',
    // paper is lighter than the card, so a darken blend leaves only the artwork
    imageClass: 'w-[62%] translate-x-[10%] mix-blend-darken xl:w-[88%] xl:translate-x-[8%]',
    accentClass: 'text-[#4a5d23]',
    dotClass: 'bg-[#4a5d23]',
    ctaClass: 'bg-[#4a5d23] text-white hover:bg-[#3f4f1f]',
  },
  {
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
    to: '/hire',
    cta: 'Explore Talent Solutions',
    image: '/images/Isometric%20Smart%20City%20Business%20District.webp',
    imageClass: 'w-[95%] translate-x-[24%]',
    accentClass: 'text-[#a3854a]',
    dotClass: 'bg-[#a3854a]',
    ctaClass: 'bg-[#c9b27a] text-gray-900 hover:bg-[#bda468]',
  },
];

// fade the illustration out towards the copy on the left and the card's top edge
const IMAGE_FADE = {
  maskImage:
    'linear-gradient(to right, transparent 5%, #000 45%), linear-gradient(to bottom, transparent, #000 25%)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
};

export default function RoleEntry() {
  return (
    <section className="w-full pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex flex-col items-center text-center"
        >
          <div className="mb-2 flex items-center gap-4">
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="-mr-1 h-2.5 w-2.5 rounded-full bg-[#4a5d23]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              Choose your path
            </span>
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
          </div>
          <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
            Find the path built <span className="text-[#4a5d23]">for</span>{' '}
            <span className="text-[#a3854a]">you.</span>
          </h2>
          <p className="text-base leading-snug text-gray-600 sm:text-lg">
            Whether you&apos;re building your career or building your engineering team,
            <br className="hidden sm:block" /> there&apos;s a path designed for you.
          </p>
        </motion.div>

        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-16">
          {PATHS.map((path, index) => (
            <motion.div
              key={path.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-6 shadow-sm sm:p-7"
            >
              <img
                src={path.image}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-0 right-0 hidden max-w-none sm:block ${path.imageClass}`}
                style={IMAGE_FADE}
              />

              <div className="relative flex h-full flex-col items-start">
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/5 bg-white shadow-[0_8px_24px_-6px_rgba(40,50,20,0.22)]">
                    <path.icon className={`h-6 w-6 ${path.accentClass}`} aria-hidden="true" />
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.25em] ${path.accentClass}`}
                  >
                    {path.label}
                  </span>
                </div>

                <h3 className="mb-2 text-2xl font-semibold leading-tight tracking-tight text-gray-900 xl:text-[2rem]">
                  {path.title}
                  <br />
                  {path.lead} <span className={path.accentClass}>{path.accent}</span>
                </h3>
                <p className="mb-4 max-w-[21rem] text-[0.9375rem] leading-relaxed text-gray-600">
                  {path.text}
                </p>

                {/* steps on a dotted timeline */}
                <ol className="relative mb-5 space-y-1 pl-8">
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
                      <div className="flex items-center gap-3 rounded-xl bg-[#f3f3ee] py-1 pl-2 pr-6">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                          <step.icon className={`h-5 w-5 ${path.accentClass}`} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[0.9375rem] font-medium leading-snug text-gray-900">
                            {step.title}
                          </span>
                          <span className="block text-[0.8125rem] text-gray-600">{step.text}</span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>

                <Link
                  to={path.to}
                  className={`mt-auto inline-flex items-center gap-3 whitespace-nowrap rounded-full px-8 py-3 text-[0.9375rem] font-medium shadow-md transition-colors ${path.ctaClass}`}
                >
                  {path.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ))}

          <span
            className="absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-[#f5f5f0] text-sm font-semibold text-gray-900 shadow-sm lg:flex"
            aria-hidden="true"
          >
            OR
          </span>
        </div>
      </div>
    </section>
  );
}
