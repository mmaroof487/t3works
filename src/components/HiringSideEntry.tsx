import { motion } from 'framer-motion';

export default function HiringSideEntry() {
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
          <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-between gap-12">
            <div className="lg:max-w-xl">
              <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl lg:text-6xl mb-6">
                Hire top talent.
              </h2>
              <p className="text-lg text-gray-600">
                We meticulously identify and qualify each team member based on the specific Talent
                DNA required for the job role, aligning with both your organizational culture and
                future competencies.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
              {['Hiring made easy', 'Build amazing teams'].map((text) => (
                <button
                  key={text}
                  className="group relative rounded-full bg-[#0f0f0f] px-8 py-4 text-[15px] font-medium text-white hover:bg-[#1a1a1a] transition-colors w-full text-center shadow-sm"
                >
                  <div className="absolute -inset-[5px] pointer-events-none rounded-full border-[3px] border-[#0f0f0f] opacity-0 transition-all duration-[600ms] ease-out group-hover:opacity-100 [-webkit-mask-image:linear-gradient(to_right,white,white),linear-gradient(to_left,white,white)] [-webkit-mask-position:left,right] [-webkit-mask-repeat:no-repeat,no-repeat] [-webkit-mask-size:0%_100%,0%_100%] group-hover:[-webkit-mask-size:50.5%_100%,50.5%_100%]" />
                  <span className="relative z-10">{text}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
