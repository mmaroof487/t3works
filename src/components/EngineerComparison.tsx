import { GraduationCap, Users, Code, BarChart3, User, Settings, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

import ExpGraph from '../assets/exp-graph.webp';
import LinearGrowth from '../assets/linear-growth.webp';

const TRADITIONAL_ENGINEER = [
  {
    icon: GraduationCap,
    title: 'Readiness:',
    description: 'Requires months of training to onboard.',
  },
  {
    icon: Users,
    title: '3-Year Experience:',
    description: 'Standard 3-year capability.',
  },
  {
    icon: Code,
    title: 'Performance:',
    description: 'Coder (focuses primarily on syntax).',
  },
  {
    icon: BarChart3,
    title: 'Productivity:',
    description: 'Standard output & pace.',
  },
];

const T3_ENGINEER = [
  {
    icon: User,
    title: 'Readiness:',
    description: 'Day-One Ready (immediately productive).',
  },
  {
    icon: Settings,
    title: '3-Year Experience:',
    description: 'Exponential (E+3) Capability.',
  },
  {
    icon: Lightbulb,
    title: 'Performance:',
    description: 'Engineer (focus on Problem & Architecture).',
  },
  {
    icon: BarChart3,
    title: 'Productivity:',
    description: '2.4x Higher Output (accelerated delivery).',
  },
];

export default function EngineerComparison() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 px-4 sm:px-6 lg:px-8 min-h-[80vh] overflow-hidden bg-transparent">
      {/* Top Corner Decorators */}
      <img
        src="/images/Minimalist Neural Network Background.webp"
        alt=""
        className="absolute left-0 -top-8 lg:-top-16 w-[28vw] md:w-[32vw] lg:w-[calc(50vw-380px)] min-w-[250px] object-contain object-left-top mix-blend-darken pointer-events-none -z-10"
      />
      <img
        src="/images/Minimalist Isometric Cityscape.webp"
        alt=""
        className="absolute right-0 -top-8 lg:-top-16 w-[28vw] md:w-[32vw] lg:w-[calc(50vw-380px)] min-w-[250px] object-contain object-right-top mix-blend-darken pointer-events-none -z-10"
      />

      {/* Background Graphs - Right (Original behavior) */}
      <img
        src={ExpGraph}
        alt=""
        className="absolute -right-[5vw] lg:-right-[2vw] xl:right-0 top-[30%] lg:top-[35%] w-[40vw] max-w-[400px] h-auto object-contain opacity-[0.1] pointer-events-none -z-10"
      />

      <div className="mx-auto w-full max-w-[1024px] relative z-10">
        {/* Background Graphs - Left (Anchored to container edges) */}
        <img
          src={LinearGrowth}
          alt=""
          className="absolute right-[100%] mr-2 lg:mr-6 top-[35%] lg:top-[40%] w-[240px] lg:w-[300px] max-w-none h-auto object-contain opacity-[0.15] pointer-events-none -z-10 hidden md:block"
        />

        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            How a <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">T3 AI Works Engineer</span> is Different.
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-gray-700">
            Traditional developers focus on syntax. Our engineers are Day-One ready,
            <br className="hidden sm:block" />
            problem-first builders with exponential capability.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 sm:gap-6 items-stretch">
          {/* Traditional Engineer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-[2rem] border border-gray-200 bg-[#f8f8f6]/95 backdrop-blur-sm p-6 lg:p-8"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#1a2313] sm:text-2xl lg:text-[26px]">The Traditional Engineer</h3>
              <p className="mt-1.5 text-[#4a5d23] font-medium text-[14px] sm:text-[15px]">Standard training, linear progression.</p>
            </div>

            <div className="flex flex-col gap-4 flex-grow">
              {TRADITIONAL_ENGINEER.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-200/60 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8e9e1] text-[#4a5d23]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <span className="font-semibold text-gray-900 text-[14px] sm:text-[15px]">{item.title}</span>
                      <span className="text-gray-700 text-[13px] sm:text-[14px] mt-0.5 leading-snug">{item.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* T3 AI Works Engineer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex flex-col rounded-[2rem] bg-gradient-to-br from-[#2a3518] to-[#161c0c] p-6 lg:p-8 shadow-2xl shadow-[#a3854a]/10"
          >
            {/* Elite Badge */}
            <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-white shadow-md">
              ELITE
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white sm:text-2xl lg:text-[26px]">The T3 AI Works Engineer</h3>
              <p className="mt-1.5 text-[#c9b27a] font-medium text-[14px] sm:text-[15px]">Accelerated, high-impact, problem-first.</p>
            </div>

            <div className="flex flex-col gap-4 flex-grow">
              {T3_ENGINEER.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4a5d23] to-[#7d6f36] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col pt-0.5 text-white">
                      <span className="font-semibold text-[14px] sm:text-[15px]">{item.title}</span>
                      <span className="text-white/80 text-[13px] sm:text-[14px] mt-0.5 leading-snug">{item.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
