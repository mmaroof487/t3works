import { motion } from 'framer-motion';

export default function IntroEcosystem() {
  return (
    <section className="w-full bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center mb-20"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-6">
            The T3Works ecosystem.
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We are a global talent hiring platform and a career accelerator for top tier talent,
            specializing in building high-performance tech teams.
          </p>
          <p className="text-lg text-gray-600">
            Our Core team brings over two decades of experience in constructing high-performing
            teams for Fortune 500 Companies, fast-growing startups, and global IT majors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/60">
          {[
            { stat: '200+', label: 'Global Clients' },
            { stat: '5,000+', label: 'Managed Techforce' },
            { stat: '100+', label: 'Technologies supported' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center py-8 md:py-4 px-4"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0f0f0f] mb-3">
                {item.stat}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
