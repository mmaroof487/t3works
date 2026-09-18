import { motion } from 'framer-motion';

const STEPS = [
  {
    title: 'Apply or submit a requirement',
    detail:
      'Candidates apply through the portal; companies submit hiring requirements and job descriptions.',
  },
  {
    title: 'Assessment or requirement scoping',
    detail:
      'Candidates sit the Phase 0 proctored assessment; a T3 Talent Architect scopes enterprise requirements within 48 hours.',
  },
  {
    title: 'Training, PoC or internship',
    detail:
      'StepX acceleration trains candidates while companies validate fit through a Pre-Engagement PoC or 4-month internship.',
  },
  {
    title: 'Enterprise placement',
    detail: 'Verified T3 engineers are placed directly into Day-One ready enterprise roles.',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-6">
            How it works
          </h2>
          <p className="text-lg text-gray-600">
            One pipeline, two entry points — candidates and companies move through a shared,
            transparent process from intake to placement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto lg:auto-rows-[300px]">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 md:p-10 transition-transform hover:-translate-y-1 group ${
                idx === 0
                  ? 'lg:col-span-2 bg-[#8ba05f]/10 border border-[#8ba05f]/30 shadow-md'
                  : idx === 3
                    ? 'lg:col-span-2 bg-[#0f0f0f] border border-gray-800 shadow-2xl'
                    : 'bg-white border border-gray-100 shadow-sm'
              }`}
            >
              {/* Giant Background Number */}
              <div
                className={`absolute -bottom-2 -right-2 text-[120px] md:text-[140px] font-bold leading-none select-none transition-transform duration-700 group-hover:scale-110 ${idx === 3 ? 'text-white/5' : 'text-[#8ba05f]/10'}`}
              >
                {idx + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1">
                  <h3
                    className={`text-2xl md:text-3xl font-semibold leading-snug mb-4 max-w-[80%] ${idx === 3 ? 'text-white' : 'text-[#0f0f0f]'}`}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  className={`text-base leading-relaxed ${idx === 3 ? 'text-white/60' : 'text-gray-600'}`}
                >
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
