import { motion } from 'framer-motion';

const DIFFERENTIATORS = [
  'Quality of Talent',
  'Deep Technology Expertise',
  'Innovation Focus',
  'Global Network',
  'Efficiency',
];

const STATS = [
  { stat: '5x', label: 'Increase in Hiring Conversion' },
  { stat: '2 Yrs', label: 'Ahead of peers with similar experience' },
  { stat: '94%', label: 'Annual Talent Retention' },
  { stat: '60%', label: 'Up to 60% reduction in cost' },
];

export default function DifferentiatorsStats() {
  return (
    <section className="w-full bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-12">
            Why our clients choose us
          </h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {DIFFERENTIATORS.map((diff) => (
              <div
                key={diff}
                className="rounded-full bg-white shadow-sm border border-[#4a5d23]/20 px-6 py-2.5 text-[15px] font-semibold text-[#4a5d23]"
              >
                {diff}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-[#0f0f0f] mb-4">
                {item.stat}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-gray-500 max-w-[200px]">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
