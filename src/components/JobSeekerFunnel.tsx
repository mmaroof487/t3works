import { motion } from 'framer-motion';

export default function JobSeekerFunnel() {
  return (
    <section className="w-full bg-transparent py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] bg-white shadow-sm border border-gray-100/50 p-8 md:p-16 lg:p-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="lg:max-w-xl">
              <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl lg:text-6xl mb-6">
                Find exciting opportunities.
              </h2>
              <p className="text-lg text-gray-600">
                We offer access to a world of opportunities, from finding your next exciting job to
                consulting opportunities or embarking on your entrepreneurial journey. Wherever your
                ambitions lie, we're here to take your career to new heights.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
              {['Discover your best jobs', 'Explore new career paths', 'Become a T3W star'].map(
                (text) => (
                  <button
                    key={text}
                    className="rounded-full bg-[#0f0f0f] px-8 py-4 text-[15px] font-medium text-white hover:bg-gray-800 transition-colors w-full text-center shadow-sm"
                  >
                    {text}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
