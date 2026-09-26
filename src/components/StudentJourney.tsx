import { motion } from 'framer-motion';
import { BookOpen, Compass, Dna, Brain, Rocket } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    id: '01',
    title: 'Understanding Your Fit',
    icon: Compass,
    description:
      'Explore your match against 500+ researched companies using AI-powered matching based on your aspirations and skills.',
    highlights: ['Personalized recommendations', 'Clear "Why this pick?"', 'Visual fit comparison'],
  },
  {
    id: '02',
    title: 'Developing Your Profile & Skills',
    icon: Dna,
    description:
      'Build a comprehensive Student DNA profile mapping your skills and experience. Identify gaps with AI assessment and optimize your resume for actual job requirements.',
    highlights: [
      'AI-assisted skills assessment',
      'ATS resume scoring',
      'Integrated learning calendar',
    ],
  },
  {
    id: '03',
    title: 'Preparing for Opportunities',
    icon: Brain,
    description:
      'Practice with our Interview Simulator generating company-specific questions tailored to your target role and historical interview patterns.',
    highlights: [
      'AI-generated company scenarios',
      'Hand-authored question bank',
      'Session history & feedback',
    ],
  },
  {
    id: '04',
    title: 'Managing Placement & Outcomes',
    icon: Rocket,
    description:
      'Track active campus placement drives through your Placement Cell Dashboard. Apply to aligned roles and monitor your application status in real-time.',
    highlights: [
      'Active campus drives pipeline',
      'AI-assisted helpdesk',
      'Real-time offer tracking',
    ],
  },
];

export default function StudentJourney() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f8f9f5] rounded-l-[100px] opacity-50 transform translate-x-1/4" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a5d23]/10 text-[#4a5d23] mb-6"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              The Student Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6"
          >
            Know Exactly What
            <br />
            <span className="text-gray-400">You're Signing Up For.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Students deserve complete transparency. See exactly what you'll learn, how you'll
            prepare, and how this platform systematically accelerates your career from discovery to
            placement.
          </motion.p>
        </div>

        {/* Sticky Scroll Journey Steps */}
        <div className="pt-12 mt-12 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 relative items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32 bg-white/80 backdrop-blur-sm p-6 -ml-6 rounded-2xl z-20">
              <div className="w-16 h-16 bg-[#4a5d23]/10 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#4a5d23]" />
              </div>
              <h4 className="text-4xl font-bold text-gray-900 mb-6">The Journey</h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                Scroll down to see your transformation from onboarding to market readiness. Each
                phase systematically builds upon the last.
              </p>
            </div>
            <div className="lg:w-2/3 space-y-24 z-10">
              {JOURNEY_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: '-20%' }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#f8f9f5] rounded-[2rem] p-10 lg:p-12 border border-gray-100 shadow-xl relative"
                  >
                    <div className="absolute -top-8 -left-4 lg:-left-8 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100">
                      <Icon className="w-10 h-10 text-[#4a5d23]" />
                    </div>
                    <div className="pt-8 lg:pt-4 lg:pl-10">
                      <div className="text-sm font-bold text-[#4a5d23] mb-2 uppercase tracking-wide">
                        Phase {step.id}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="space-y-4">
                        {step.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-50"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#4a5d23] shrink-0" />
                            <span className="text-gray-700 font-medium">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Differentiation Callout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 rounded-[2rem] bg-[#0f0f0f] p-8 sm:p-12 relative overflow-hidden"
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
