import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function IntroEcosystem() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { margin: '-100px' });

  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play().catch(() => undefined);
    } else if (!isVideoInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoInView]);

  return (
    <section className="w-full bg-transparent py-16 md:py-24">
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
          className="relative w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl mb-24 border border-black/5 bg-[#14150f] aspect-video"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            playsInline
            muted
            loop
            preload="metadata"
          >
            <source src="/videos/t3aiworks-vid1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/60">
          {[
            { stat: '500', label: 'Applicants per intake' },
            { stat: '4M', label: 'Global AI skill deficit' },
            { stat: '30-60%', label: 'Enterprise cost advantage' },
            { stat: '2.4x', label: 'Productivity boost in 90 days' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center py-8 md:py-4 px-4"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0f0f0f] mb-3">
                {item.stat}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
