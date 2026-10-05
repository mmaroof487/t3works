import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ROLES = [
  {
    title: 'For Candidates & Job Seekers',
    badges: ['Top 25% Advance'],
    text: 'Convert raw engineering aptitude into a market-ready AI career, guided by industry mentors and enterprise consultants.',
    to: '/apply',
    cta: 'Apply Now',
    bgClass: 'bg-[#4a5d23]',
  },
  {
    title: 'For Companies',
    badges: ['Zero-Risk PoC', "66% Won't Hire Without AI Skills"],
    text: 'Deploy Day-One ready AI engineers battle-tested in autonomous agents, RAG pipelines, and full-stack security.',
    to: '/hire',
    cta: 'Hire AI Talent',
    bgClass: 'bg-[#0f0f0f]',
  },
];

export default function RoleEntry() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Where do you fit in?
        </h2>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {ROLES.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col items-start rounded-[2rem] p-8 text-white lg:p-10 ${role.bgClass}`}
            >
              <div className="mb-5 flex flex-wrap gap-2">
                {role.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-[#ffea75] px-3 py-1 text-sm font-semibold text-gray-900"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h3 className="mb-3 text-3xl font-medium tracking-tight">{role.title}</h3>
              <p className="mb-8 max-w-sm text-white/80">{role.text}</p>
              <Link
                to={role.to}
                className="mt-auto rounded-3xl border border-white/30 px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              >
                {role.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
