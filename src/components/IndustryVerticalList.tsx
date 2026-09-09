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
    <section className="w-full bg-[#0f0f0f] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl mb-6">
            Find Industry Experts
          </h2>
          <p className="text-lg text-white/70">
            While our specialisation lies in identifying and deploying top-tier tech talent, we
            extend our services to hiring key resources in diverse industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {INDUSTRIES.map((industry, idx) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              className="group relative flex items-baseline gap-4 py-5 border-b border-white/10 cursor-default"
            >
              <span className="text-sm font-mono text-white/50 transition-colors duration-300 group-hover:text-white">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[17px] font-bold text-white/90 tracking-wide">{industry}</span>
              <span className="absolute bottom-[-1px] left-0 h-[1px] w-0 bg-[#4a5d23] transition-all duration-300 ease-out group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
