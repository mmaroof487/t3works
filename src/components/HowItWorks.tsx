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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col gap-4 rounded-[2rem] bg-white shadow-sm border border-gray-100/50 p-8"
            >
              <div className="text-3xl font-bold text-gray-200 select-none">0{idx + 1}</div>
              <h3 className="text-xl font-semibold text-[#0f0f0f] leading-snug">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
