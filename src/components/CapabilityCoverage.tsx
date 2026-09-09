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
    <section className="w-full bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl">
            Tech areas we focus on
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-12 gap-y-0">
          {TECHNOLOGIES.map((tech, idx) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              className="group relative flex items-baseline gap-3 md:gap-4 py-4 md:py-5 border-b border-gray-200 cursor-default"
            >
              <span className="text-xs md:text-sm font-mono text-[#4a5d23]/90 transition-colors duration-300 group-hover:text-[#4a5d23] shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[14px] md:text-[17px] leading-snug md:leading-normal font-bold text-gray-900 tracking-wide">
                {tech}
              </span>
              <span className="absolute bottom-[-1px] left-0 h-[1px] w-0 bg-[#4a5d23] transition-all duration-300 ease-out group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
