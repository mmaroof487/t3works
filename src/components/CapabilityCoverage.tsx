import { motion } from 'framer-motion';

const TECHNOLOGIES = [
  'Full Stack Engineering',
  'Blockchain',
  'Database & Big Data',
  'Data Science & AI',
  'DevOps & Cloud Computing',
  'UI / UX',
  'Mobile Development',
  'E-commerce & CRM',
  'Embedded Engineering',
  'IoT',
  'Gaming',
  'Cybersecurity',
  'No Code Platforms',
  'Product & Project Management',
  'Visual & Brand Design',
  'Quality Assurance & Testing',
  'ERP',
  'Telecommunications & 5G',
  'API Development & Integration',
  'Niche Technologies',
];

export default function CapabilityCoverage() {
  return (
    <section className="w-full bg-transparent py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl">
            Tech areas we focus on
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {TECHNOLOGIES.map((tech, idx) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className={`rounded-full bg-white border border-gray-200 px-5 py-2 text-[15px] font-medium text-gray-700 shadow-sm hover:border-[#4a5d23] hover:text-[#4a5d23] transition-colors cursor-default ${
                idx >= 8 ? 'hidden md:block' : ''
              }`}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
