import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function IntroEcosystem() {
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
    <section className="w-full bg-transparent pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center mb-20"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-6">
            What T3 AI Works does.
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We bridge universities and enterprise AI demand, converting raw engineering aptitude
            into market-ready builders through a merit-gated, rigor-driven pipeline.
          </p>
          <p className="text-lg text-gray-600">
            Candidates are trained in AI engineering and multi-agent systems, then connected
            directly with enterprise opportunities — closing the global 4-million AI skill deficit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl mb-24 border border-black/5 bg-[#14150f] aspect-video group"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted={isMuted}
            loop
            preload="metadata"
          >
            <source src="/videos/t3aiworks-vid1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={() => {
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-6 right-6 p-3 rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60 z-10 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
          {[
            { stat: '500', label: 'Applicants per intake', highlight: false },
            { stat: '4M', label: 'Global AI skill deficit', highlight: false },
            { stat: '30-60%', label: 'Enterprise cost advantage', highlight: true },
            { stat: '2.4x', label: 'Productivity boost in 90 days', highlight: false },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center p-8 rounded-[2rem] border transition-transform hover:-translate-y-1 ${item.highlight ? 'bg-[#8ba05f]/10 border-[#8ba05f]/30 shadow-md' : 'bg-white border-gray-100 shadow-sm'}`}
            >
              <div
                className={`text-4xl lg:text-5xl font-bold tracking-tight mb-3 whitespace-nowrap ${item.highlight ? 'text-[#8ba05f]' : 'text-[#0f0f0f]'}`}
              >
                {item.stat}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 text-center leading-relaxed">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
