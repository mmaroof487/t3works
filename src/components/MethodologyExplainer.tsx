import { motion } from 'framer-motion';

const BENEFITS = [
  'Build teams on niche technologies rapidly',
  'Up-skill your workforce for high performance',
  'Build a strategic talent acquisition program',
];

export default function MethodologyExplainer() {
  return (
    <section className="w-full bg-transparent py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-6">
              Our Master Crafted HIRE-TRAIN-DEPLOY (HTD) programs
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Acquire and scale talent for a higher experience play, giving yourself both cost and
              performance advantage.
            </p>
            <p className="text-lg font-semibold text-[#4a5d23]">
              Give yourself long term competitive advantage.
            </p>
          </motion.div>

          <div className="flex flex-col justify-center gap-8">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-6 border-b border-gray-200 pb-8 last:border-0"
              >
                <div className="text-3xl font-bold text-gray-300 select-none">0{idx + 1}</div>
                <div className="text-xl font-medium text-[#0f0f0f] mt-1">{benefit}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
