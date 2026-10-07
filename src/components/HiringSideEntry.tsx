import { motion } from 'framer-motion';
import { ArrowRight, FileSearch, Users } from 'lucide-react';
import JourneyCards, { SolidBriefcase, type IconType, type JourneyStep } from './JourneyCards';
import PinnedJourney from './PinnedJourney';
import { usePinnedJourney } from '../lib/usePinnedJourney';

const STEPS: JourneyStep[] = [
  {
    id: '01',
    icon: FileSearch as IconType,
    title: 'Pre-Engagement PoC',
    kicker: 'Zero-risk validation',
    description: 'Evaluate an engineer on a real business problem before committing to a hire.',
    highlights: ['Real business problem', 'Defined success criteria', 'Technical evaluation'],
  },
  {
    id: '02',
    icon: Users as IconType,
    title: 'Guided 4-Month Internship',
    kicker: 'Build before you hire',
    description: 'Put emerging engineers through mentor-led projects built around your technology.',
    highlights: ['Mentor supervision', 'Real project exposure', 'Continuous assessment'],
  },
  {
    id: '03',
    icon: SolidBriefcase as IconType,
    title: 'Accelerated Full-Time Hiring',
    kicker: 'Hire for day-one impact',
    description: 'Access engineers with proven technical capability, execution and collaboration.',
    highlights: [
      'Validated engineering skills',
      'Role-specific matching',
      'Faster hiring decisions',
    ],
  },
];

const COMPARISON = [
  ['Resume screening', 'AI capability mapping'],
  ['Manual interviews', 'Continuous assessment'],
  ['Hiring uncertainty', 'PoC validation'],
  ['Generic candidates', 'Role-specific matching'],
  ['Onboarding risk', 'Mentor-trained engineers'],
];

const COMPANY_ACCENT = '#c9b27a';

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
          For companies
        </span>
        <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
      </div>
      <h2 className="mb-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        Hire Engineers{' '}
        <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
          Built for Real Work.
        </span>
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
        Deploy AI engineers trained across autonomous agents, RAG pipelines, full-stack security and
        real-world projects — validated before they reach your hiring pipeline.
      </p>
    </motion.div>
  );
}

export default function HiringSideEntry() {
  const pinned = usePinnedJourney();

  return (
    <section className="relative w-full overflow-x-clip bg-[#f5f5f0] py-8 md:py-12">
      <div className="relative mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        {pinned ? (
          <PinnedJourney
            steps={STEPS}
            accent={COMPANY_ACCENT}
            accentInk="#232621"
            heading={<Heading className="mb-5 max-w-5xl" />}
          />
        ) : (
          <Heading className="mb-16 max-w-5xl md:mb-20" />
        )}

        <div className={`${pinned ? 'mt-10 ' : ''}grid gap-x-6 gap-y-10 xl:grid-cols-[3fr_1.3fr]`}>
          {!pinned && <JourneyCards steps={STEPS} className="sm:grid-cols-2 lg:grid-cols-3" />}

          <div className="relative">
            {/* business district rising from behind the panel (transparent image, wide screens only) */}
            <img
              src="/images/Isometric%20Smart%20City%20Business%20District.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-full right-0 hidden w-[118%] max-w-none translate-y-[14%] xl:block"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 flex h-full flex-col rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-5 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Why Companies Choose Us</h3>
              <table className="w-full flex-1 border-separate border-spacing-y-1.5 text-[0.8125rem]">
                <thead>
                  <tr className="text-left">
                    <th
                      scope="col"
                      className="rounded-lg bg-black/[0.035] px-2.5 py-2 font-semibold text-gray-700"
                    >
                      Traditional Hiring
                    </th>
                    <th aria-hidden="true" className="w-6" />
                    <th
                      scope="col"
                      className="rounded-lg bg-[#4a5d23]/10 px-2.5 py-2 font-semibold text-gray-900"
                    >
                      T3 AI Works
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(([before, after]) => (
                    <tr key={before}>
                      <td className="rounded-lg bg-black/[0.035] px-2.5 py-2 text-gray-600">
                        {before}
                      </td>
                      <td aria-hidden="true" className="w-6 text-center text-gray-500">
                        <ArrowRight className="mx-auto h-4 w-4" />
                      </td>
                      <td className="rounded-lg bg-black/[0.035] px-2.5 py-2 font-medium text-gray-900">
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
