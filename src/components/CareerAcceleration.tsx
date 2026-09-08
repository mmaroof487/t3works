import { motion } from 'framer-motion';

export default function CareerAcceleration() {
  return (
    <section className="w-full bg-transparent py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl">
            Looking to accelerate your career?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between rounded-[2rem] bg-[#4a5d23] p-8 md:p-10 min-h-[320px] text-white cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <div>
              <h3 className="text-3xl font-semibold mb-4">T3W First Jobs</h3>
              <p className="text-white/80 text-lg">
                Prepare and position yourself for premium entry level jobs.
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex rounded-full bg-[#ffea75] px-3 py-1 text-xs font-semibold text-gray-900">
                0-1 Years Exp
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between rounded-[2rem] bg-[#0f0f0f] p-8 md:p-10 min-h-[320px] text-white cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <div>
              <h3 className="text-3xl font-semibold mb-4">Become a T3W Pro</h3>
              <p className="text-gray-300 text-lg">
                Accelerated growth for engineers with proven potential.
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                1-4 Years Exp
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-between rounded-[2rem] bg-white shadow-sm border border-gray-100/50 p-8 md:p-10 min-h-[320px] text-gray-900 cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <div>
              <h3 className="text-3xl font-semibold mb-4">Become a T3W Master</h3>
              <p className="text-gray-600 text-lg">
                Tailored for experienced professionals seeking global play.
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                5-15 Years Exp
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
