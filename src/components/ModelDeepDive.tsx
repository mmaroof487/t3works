import { motion } from 'framer-motion';

const BENEFITS = [
  'Secure top tier global tech talent',
  'Drive performance & strict accountability',
  'Strengthen your employer brand positioning',
  'Enjoy completely transparent pricing models',
  'Leverage world-class infrastructure setups',
];

export default function ModelDeepDive() {
  return (
    <section className="w-full bg-[#4a5d23] py-16 md:py-24 text-white relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:flex md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl mb-6">
              The Remote Tech Advantage.
            </h2>
            <p className="text-lg text-white/80">
              Unlock the incredible potential of a borderless workforce. An unparalleled opportunity
              for your company to scale efficiently while securing the finest talent globally.
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <span className="inline-flex rounded-full bg-[#ffea75] px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
              Save up to 60% on your costs
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 border-b border-white/10 pb-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-lg font-medium">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
