import { motion } from 'framer-motion';

const ADVISORY_MEMBERS = [
  {
    id: 1,
    name: 'Somashekhar',
    title: 'The Capital & Ecosystem Architect',
    bio: [
      'Architect of G2G and B2B Collaborations (CECA).',
      'Managed S$150M Technology Growth Fund.',
      'Mentorship/growth support for Over 50 Startups.',
    ],
    linkedin: '#',
  },
  {
    id: 2,
    name: 'Subramanian Sivakumar',
    title: 'The Talent Pipeline Architect',
    bio: [
      'Creator of the "0.3%" elite talent identification funnel.',
      'Scaled a $2 Billion Healthcare Claims platform.',
      'Spearheaded $2.8 Billion in IP Value Created.',
    ],
    linkedin: '#',
  },
  {
    id: 3,
    name: 'GV Babu',
    title: 'The Applied Tech & Infrastructure Architect',
    bio: [
      'Enterprise, BFSI & Edutech infrastructure expert.',
      "Built Asia's largest IT park training facility for 5,000 students.",
      'Industrial 4.0 & Robotics foundation for ISRO.',
    ],
    linkedin: '#',
  },
  {
    id: 4,
    name: 'Syed Tajuddeen',
    title: 'The Strategic Engineering & Global Network Architect',
    bio: [
      '"32+ Years" of composite Engineering & Management leadership.',
      'Turnkey global infrastructure consultancy.',
      'Vast professional associate network.',
    ],
    linkedin: '#',
  },
];

export default function AdvisoryTeam() {
  return (
    <section id="leadership" className="py-16 md:py-24 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6"
          >
            Advisory & Leadership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            The Architects of Execution: Validating Core Business Requirements
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {ADVISORY_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[2rem] bg-[#f8f9f5] p-8 border border-gray-100 hover:border-[#4a5d23]/30 hover:shadow-xl hover:shadow-[#4a5d23]/5 transition-all duration-300"
            >
              <div className="flex gap-6 flex-col sm:flex-row">
                <div className="shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-300">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-[#4a5d23] mb-4">{member.title}</p>
                  <ul className="text-gray-600 text-sm leading-relaxed mb-6 space-y-2 text-left">
                    {member.bio.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-0.5 text-[#4a5d23] font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
