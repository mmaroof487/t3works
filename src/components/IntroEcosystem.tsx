import { GraduationCap, Users, Building2, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoLauncher from './VideoLauncher';

const VIDEO_SRC = '/videos/t3aiworks-vid1.webm';
const THUMBNAIL = '/images/AI%20Workspace%20Mentors.webp';

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Train high-potential talent',
    text: 'Hands-on, project-driven learning in AI engineering and multi-agent systems.',
  },
  {
    icon: Users,
    title: 'Mentor with industry experts',
    text: 'Guidance from experienced AI practitioners, mentors and consultants.',
  },
  {
    icon: Building2,
    title: 'Connect to real opportunities',
    text: 'Direct pathways to enterprise roles and collaborations with global companies.',
  },
];

const STATS = [
  { stat: '500', label: 'Applicants per intake', highlight: false },
  { stat: '4M', label: 'Global AI skill deficit', highlight: false },
  { stat: '30-60%', label: 'Enterprise cost advantage', highlight: true },
  { stat: '2.4x', label: 'Productivity boost in 90 days', highlight: false },
];

export default function IntroEcosystem() {
  return (
    <section className="w-full bg-transparent py-8 md:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
                What we do
              </span>
              <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            </div>
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]">
              What T3 AI Works{' '}
              <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
                does.
              </span>
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-600">
              We bridge universities and enterprise AI demand, converting raw engineering aptitude
              into market-ready builders through a merit-gated, rigor-driven pipeline.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-gray-600">
              Candidates are trained in AI engineering and multi-agent systems, then connected
              directly with enterprise opportunities — closing the global 4-million AI skill
              deficit.
            </p>

            <ul className="relative space-y-6">
              <span
                aria-hidden="true"
                className="absolute left-[0.1875rem] top-8 bottom-8 w-px bg-[#4a5d23]/30"
              />
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="relative flex items-start gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-8 h-[0.4375rem] w-[0.4375rem] shrink-0 rounded-full bg-[#4a5d23]"
                  />
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#4a5d23]/10 text-[#4a5d23]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="mt-1 max-w-sm text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:top-3"
          >
            <VideoLauncher
              src={VIDEO_SRC}
              poster={THUMBNAIL}
              label="Play video: Industry Mentors, Experts and Consultants"
              alt="Industry mentors guiding engineers at an AI workspace"
              className="aspect-[1.9/1] w-full rounded-[2rem] border border-black/5 bg-[#232621] shadow-2xl"
            >
              <span className="absolute inset-0 grid place-items-center">
                <span className="relative grid h-20 w-20 place-items-center transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-full border border-white/25 sm:-inset-6"
                  />
                  <span
                    aria-hidden="true"
                    className="play-pulse absolute -inset-5 rounded-full border border-[#d8cf6a]/50 sm:-inset-6"
                  />
                  <span className="grid h-full w-full place-items-center rounded-full bg-[#232621]/70 shadow-[0_0_40px_rgba(200,190,80,0.35)] ring-4 ring-[#b5ad45] backdrop-blur-sm">
                    <Play
                      className="ml-1 h-8 w-8 fill-white text-white sm:h-9 sm:w-9"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </span>
            </VideoLauncher>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {STATS.map((item) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center justify-center rounded-[1.5rem] border px-6 py-5 text-center transition-transform hover:-translate-y-1 ${item.highlight ? 'border-[#8ba05f]/30 bg-[#8ba05f]/10 shadow-md' : 'border-gray-100 bg-white shadow-sm'}`}
                >
                  <div
                    className={`mb-2 whitespace-nowrap text-3xl font-bold tracking-tight lg:text-4xl ${item.highlight ? 'text-[#8ba05f]' : 'text-gray-900'}`}
                  >
                    {item.stat}
                  </div>
                  <div className="text-xs font-semibold uppercase leading-relaxed tracking-wider text-gray-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
