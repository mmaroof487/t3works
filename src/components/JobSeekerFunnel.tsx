import { Link } from 'react-router-dom';
import { ArrowRight, Users, Code2, Compass, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobSeekerFunnel() {
  return (
    <section className="w-full bg-transparent py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:auto-rows-[240px]">
          
          {/* Title Card (Banner) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-3 lg:col-span-3 lg:row-span-1 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 flex flex-col justify-center shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
               <GraduationCap className="w-64 h-64 -rotate-12 translate-x-12 -translate-y-12" />
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-4 relative z-10">
              For Universities and Candidates.
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl relative z-10 leading-relaxed">
              Guided by active Industry Mentors, Tech Experts, and Enterprise Consultants, candidates get real-world architectural reviews, code audits, and project governance — plus a structured path for experienced developers to realign into high-value AI roles through LangChain and LangGraph mastery.
            </p>
          </motion.div>

          {/* Option 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 lg:row-span-1"
          >
            <Link
              to="/apply"
              className="group block h-full w-full min-h-[220px] lg:min-h-0 bg-[#0f0f0f] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="absolute -inset-[1px] rounded-[2rem] border border-white/10" />
              <div className="flex justify-between items-start relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <div className="relative z-10 mt-6 lg:mt-0">
                <h3 className="text-xl font-medium mb-2">Industry mentors & tech experts</h3>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Expert Guidance</p>
              </div>
            </Link>
          </motion.div>

          {/* Option 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 lg:row-span-1"
          >
            <Link
              to="/apply"
              className="group block h-full w-full min-h-[220px] lg:min-h-0 bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-[#0f0f0f] group-hover:text-white transition-colors duration-300">
                  <Code2 className="w-7 h-7" />
                </div>
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-400 group-hover:text-[#0f0f0f]" />
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <h3 className="text-xl font-medium text-[#0f0f0f] mb-2">Real-world architectural reviews</h3>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Code Audits</p>
              </div>
            </Link>
          </motion.div>

          {/* Option 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 lg:row-span-1"
          >
            <Link
              to="/apply"
              className="group block h-full w-full min-h-[220px] lg:min-h-0 bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-[#0f0f0f] group-hover:text-white transition-colors duration-300">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-400 group-hover:text-[#0f0f0f]" />
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <h3 className="text-xl font-medium text-[#0f0f0f] mb-2">Career realignment for seniors</h3>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Path to AI</p>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
