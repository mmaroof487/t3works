import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, ArrowRight, Target, GraduationCap, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

export default function HiringSideEntry() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { margin: '-100px' });
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play().catch(() => undefined);
    } else if (!isVideoInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoInView]);

  return (
    <section className="w-full bg-transparent py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:auto-rows-[240px]">
          {/* Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2 lg:row-span-1 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 flex flex-col justify-center shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
               <Briefcase className="w-64 h-64 -rotate-12 translate-x-12 -translate-y-12" />
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-4 relative z-10">
              For Companies.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl relative z-10 leading-relaxed">
              Deploy Day-One ready AI engineers, battle-tested in autonomous agents, RAG pipelines, and full-stack security. Start with a zero-risk Pre-Engagement PoC, move to a guided 4-month internship, or hire full-time.
            </p>
          </motion.div>

          {/* Option 1: Pre-Engagement PoC */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 lg:row-span-1"
          >
            <Link
              to="/hire"
              className="group block h-full w-full min-h-[220px] lg:min-h-0 bg-[#0f0f0f] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="absolute -inset-[1px] rounded-[2rem] border border-white/10" />
              <div className="flex justify-between items-start relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <div className="relative z-10 mt-6 lg:mt-0">
                <h3 className="text-2xl font-medium mb-2">Pre-Engagement PoC</h3>
                <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Zero-Risk Trial</p>
              </div>
            </Link>
          </motion.div>

          {/* Video Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-0 relative rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 bg-[#14150f] group"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover absolute inset-0"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              preload="metadata"
            >
              <source src="/videos/t3aiworks-vid2.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-6 right-6 p-4 rounded-full bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/60 z-10 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </motion.div>

          {/* Option 2: Internship */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 lg:row-span-1"
          >
            <Link
              to="/hire"
              className="group block h-full w-full min-h-[220px] lg:min-h-0 bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-[#0f0f0f] group-hover:text-white transition-colors duration-300">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-400 group-hover:text-[#0f0f0f]" />
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <h3 className="text-xl font-medium text-[#0f0f0f] mb-2">Guided 4-Month Internship</h3>
                <p className="text-sm text-gray-500 font-medium">Battle-tested in real projects</p>
              </div>
            </Link>
          </motion.div>

          {/* Option 3: Full-time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 lg:row-span-1"
          >
            <Link
              to="/hire"
              className="group block h-full w-full min-h-[220px] lg:min-h-0 bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-[#0f0f0f] group-hover:text-white transition-colors duration-300">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-400 group-hover:text-[#0f0f0f]" />
                </div>
              </div>
              <div className="mt-6 lg:mt-0">
                <h3 className="text-xl font-medium text-[#0f0f0f] mb-2">Accelerated Full-time Hiring</h3>
                <p className="text-sm text-gray-500 font-medium">Ready for Day-One impact</p>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
