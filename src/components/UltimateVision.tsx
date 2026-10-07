import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const POINTS = [
  { title: 'Full Student Ecosystem', text: 'From personal tutors to project hubs.' },
  { title: 'Secure and Governed', text: 'Integrated Security and Governance frameworks.' },
  { title: 'Complete DevOps & Cloud', text: 'Production ready pathways.' },
  { title: 'Quality Assured', text: 'Robust schema and test enforcement.' },
  { title: 'Integrated Data Stack', text: 'Centralized Vector ML and Database systems.' },
];

export default function UltimateVision() {
  return (
    <section className="w-full pb-8 pt-16 md:pt-24">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-12"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              Ultimate vision
            </span>
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Radix — one connected{' '}
            <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
              ecosystem.
            </span>
          </h2>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {/* the card takes the map's own paper colour, so it blends if the card is taller than the picture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center overflow-hidden rounded-[2rem] border border-black/5 bg-[#f7f8f3] shadow-2xl"
          >
            <img
              src="/images/Radix%20Core%20Architecture%20Map.webp"
              alt="Radix Core at the centre of a connected ecosystem: development tools, quality engineering, programming, data infrastructure, cloud and DevOps, and AI and agent systems feeding learning tools such as an AI tutor, a project hub and a global community, wrapped in security, governance, observability and DevOps."
              className="h-auto w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-center rounded-[2rem] border border-[#4a5d23]/15 bg-gradient-to-br from-[#eef1e3] via-[#e8ecda] to-[#dde4c8] p-6 shadow-lg sm:p-8 lg:p-10"
          >
            <p className="text-lg leading-relaxed text-gray-700">
              Radix is our{' '}
              <strong className="text-gray-900">proprietary engineering platform</strong>, designed
              to{' '}
              <strong className="text-gray-900">
                create fully interconnected, production-grade systems,
              </strong>{' '}
              spanning a complete{' '}
              <strong className="text-gray-900">Student Learning Ecosystem</strong>, data pipelines,
              AI agents, cloud infrastructure, and enterprise security.
            </p>

            <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-[#4a5d23]">
              Why everything connects
            </h3>
            <ul className="space-y-3">
              {POINTS.map((p) => (
                <li key={p.title} className="flex items-start gap-3 text-gray-700">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5d23]"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">{p.title}:</strong> {p.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/radix"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#232621] px-7 py-3.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#2f332c]"
            >
              Know more
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
