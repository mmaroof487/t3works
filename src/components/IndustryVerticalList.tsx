import { motion } from 'framer-motion';

const INDUSTRIES = [
  'Software',
  'Healthcare',
  'Financial Services',
  'Insurance',
  'Pharma & Clinical Research',
  'Banking & Reg tech',
  'Retail',
  'Aerospace & Defence',
  'Biotechnology',
  'Automotive',
  'Renewable Energy',
  'Entertainment & Media',
  'Business Consulting',
];

export default function IndustryVerticalList() {
  return (
    <section className="w-full bg-transparent py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-6">
            Find Industry Experts
          </h2>
          <p className="text-lg text-gray-600">
            While our specialisation lies in identifying and deploying top-tier tech talent, we
            extend our services to hiring key resources in diverse industries.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {INDUSTRIES.map((industry, idx) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="rounded-full bg-[#4a5d23] px-6 py-2.5 text-[15px] font-medium text-white shadow-sm cursor-default hover:bg-[#3d4d1c] transition-colors"
            >
              {industry}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
