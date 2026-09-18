import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

interface FunnelStage {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
}

const STAGES: FunnelStage[] = [
  {
    value: 500,
    label: 'Applicants',
    detail: 'Initial intake for every cohort.',
  },
  {
    value: 125,
    label: 'Candidates',
    detail: 'Top 25% advance after the Phase 0 proctored assessment.',
  },
  {
    value: 50,
    suffix: '–75',
    label: 'Engineers',
    detail: 'Final T3 talent placed into premium salary tiers.',
  },
];

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v).toString() + suffix;
          }
        },
      });
      return controls.stop;
    }
  }, [value, suffix, isInView]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export default function TalentFunnel() {
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
    <section className="w-full bg-[#0a0a0a] py-12 md:py-20 overflow-hidden text-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#8ba05f] animate-pulse" />
            <span className="text-sm font-medium text-white/80">Extreme Filtration</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Only the <span className="text-[#8ba05f] font-serif italic">Top 10%</span>
            <br />
            Make the Cut
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            Our rigorous, multi-stage assessment funnel ensures that out of every 500 applicants,
            only the most elite 50-75 engineers earn the T3 Global badge.
          </motion.p>
        </div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl mb-16 md:mb-20 border border-white/10 bg-[#14150f] aspect-video group"
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
            <source src="/videos/t3aiworks-vid3.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <button
            onClick={() => {
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-6 right-6 p-4 rounded-full bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/60 z-10 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </motion.div>

        {/* Funnel Visualization (The Proportion Pill) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-5xl mx-auto rounded-[3rem] border border-white/10 bg-[#0d0e0a] overflow-hidden p-8 shadow-2xl flex flex-col items-center"
        >
          <div className="w-full h-32 md:h-48 rounded-full flex overflow-hidden border border-white/10 shadow-inner">
            <div className="w-[60%] h-full bg-white/5 flex flex-col justify-center items-center relative border-r border-white/10 transition-colors hover:bg-white/10">
              <span className="text-3xl md:text-5xl font-bold text-white">
                <AnimatedNumber value={500} />
              </span>
              <span className="text-xs md:text-sm text-white/50 mt-1">Applicants</span>
            </div>
            <div className="w-[25%] h-full bg-[#8ba05f]/10 flex flex-col justify-center items-center relative border-r border-white/10 transition-colors hover:bg-[#8ba05f]/20">
              <span className="text-2xl md:text-4xl font-bold text-white">
                <AnimatedNumber value={125} />
              </span>
              <span className="text-xs md:text-sm text-[#8ba05f] mt-1">Candidates</span>
            </div>
            <div className="w-[15%] h-full bg-[#8ba05f]/30 flex flex-col justify-center items-center relative shadow-[0_0_30px_rgba(139,160,95,0.4)] transition-colors hover:bg-[#8ba05f]/40">
              <span className="text-xl md:text-3xl font-bold text-[#8ba05f] drop-shadow-[0_0_10px_rgba(139,160,95,0.8)] whitespace-nowrap">
                <AnimatedNumber value={50} suffix="-75" />
              </span>
              <span className="text-[10px] md:text-sm text-white whitespace-nowrap mt-1">
                Engineers
              </span>
            </div>
          </div>

          <div className="flex justify-between w-full mt-8 px-2 md:px-4">
            {STAGES.map((s, i) => (
              <div
                key={i}
                className={`text-center ${i === 0 ? 'w-[60%]' : i === 1 ? 'w-[25%]' : 'w-[15%]'}`}
              >
                <p className="text-[10px] md:text-xs text-white/40 max-w-[120px] mx-auto leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
