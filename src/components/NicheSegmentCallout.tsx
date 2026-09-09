import { motion } from 'framer-motion';

export default function NicheSegmentCallout() {
  return (
    <section className="w-full bg-[#fdfbf7] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="mb-4 flex items-center">
            <span className="rounded-full border border-[#4a5d23]/20 bg-white px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm">
              Early Career Talent
            </span>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl lg:text-6xl max-w-2xl">
            Hiring bright Junior Engineers?
          </h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {/* Feature 1: Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 aspect-square lg:aspect-[4/3] relative overflow-hidden bg-gray-100"
            >
              <img
                src="/images/niche_t3_hiring.webp"
                alt="T3 Hiring Program"
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 flex flex-col items-start"
            >
              <span className="text-[#4a5d23] font-semibold text-sm tracking-wide uppercase mb-4">
                6-12 Mo Experience
              </span>
              <h3 className="text-4xl md:text-5xl font-medium leading-[1.1] text-gray-900 mb-6">
                T3W T3 Hiring Program
              </h3>
              <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                Nurturing Talent & Fuelling Innovation. An innovative initiative designed to
                identify and onboard junior engineers with 6 to 12 months of experience or
                exceptional freshers demonstrating outstanding aptitude.
              </p>
              <button className="rounded-full border border-[#4a5d23] bg-transparent px-8 py-3 text-[15px] font-medium text-[#4a5d23] hover:bg-[#4a5d23] hover:text-white transition-colors">
                Explore Program
              </button>
            </motion.div>
          </div>

          {/* Feature 2: Text Left, Image Right (Zigzag) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 aspect-square lg:aspect-[4/3] relative overflow-hidden bg-gray-100"
            >
              <img
                src="/images/niche_campus_hiring.webp"
                alt="Campus Hiring"
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 flex flex-col items-start"
            >
              <span className="text-[#4a5d23] font-semibold text-sm tracking-wide uppercase mb-4">
                200+ Campuses
              </span>
              <h3 className="text-4xl md:text-5xl font-medium leading-[1.1] text-gray-900 mb-6">
                T3W Campus Hiring
              </h3>
              <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                Transform talent acquisition leveraging immersive internships and mentoring. Hire
                Ready To Deploy engineers embodying your values, boosting agility while reducing
                costs.
              </p>
              <button className="rounded-full border border-[#4a5d23] bg-transparent px-8 py-3 text-[15px] font-medium text-[#4a5d23] hover:bg-[#4a5d23] hover:text-white transition-colors">
                Explore Campus Hiring
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
