import { motion } from 'framer-motion';

export default function NicheSegmentCallout() {
  return (
    <section className="w-full bg-transparent py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl">
            Hiring bright Junior Engineers?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between rounded-[2.5rem] bg-[#0f0f0f] p-8 md:p-14 min-h-[400px] text-white cursor-default"
          >
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-[#0f0f0f]" />
                  <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-[#0f0f0f]" />
                  <div className="h-10 w-10 rounded-full bg-gray-400 border-2 border-[#0f0f0f]" />
                </div>
              </div>
              <h3 className="text-4xl font-medium leading-tight mb-6">TGL T3 Hiring Program</h3>
              <p className="text-white/80 text-lg max-w-md">
                Nurturing Talent & Fuelling Innovation. An innovative initiative designed to
                identify and onboard junior engineers with 6 to 12 months of experience or
                exceptional freshers demonstrating outstanding aptitude.
              </p>
            </div>
            <div className="mt-12">
              <button className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
                Explore Program
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between rounded-[2.5rem] bg-[#0f0f0f] p-8 md:p-14 min-h-[400px] text-white cursor-default"
          >
            <div>
              <div className="mb-6 flex items-center">
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white">
                  200+ Campuses
                </span>
              </div>
              <h3 className="text-4xl font-medium leading-tight mb-6">TGL Campus Hiring</h3>
              <p className="text-white/80 text-lg max-w-md">
                Transform talent acquisition leveraging immersive internships and mentoring. Hire
                Ready To Deploy engineers embodying your values, boosting agility while reducing
                costs.
              </p>
            </div>
            <div className="mt-12">
              <button className="rounded-full border border-[#4a5d23] bg-[#4a5d23] px-8 py-3 text-[15px] font-medium text-white hover:bg-[#3d4d1c] transition-colors shadow-sm shadow-[#4a5d23]/20">
                Explore Campus Hiring
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
