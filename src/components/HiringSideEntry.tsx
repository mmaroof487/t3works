import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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
    <section className="w-full bg-transparent py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] bg-white shadow-sm border border-gray-100/50 p-8 md:p-16 lg:p-20"
        >
          <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-between gap-12 mb-12 lg:mb-16">
            <div className="lg:max-w-xl">
              <h2 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl lg:text-6xl mb-6">
                For Companies.
              </h2>
              <p className="text-lg text-gray-600">
                Deploy Day-One ready AI engineers, battle-tested in autonomous agents, RAG
                pipelines, and full-stack security. Start with a zero-risk Pre-Engagement PoC, move
                to a guided 4-month internship, then hire full-time.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
              {['Pre-Engagement PoC', '4-Month Internship', 'Full-time Hiring'].map((text) => (
                <Link
                  key={text}
                  to="/hire"
                  className="group relative rounded-full bg-[#0f0f0f] px-8 py-4 text-[15px] font-medium text-white hover:bg-[#1a1a1a] transition-colors w-full text-center shadow-sm"
                >
                  <div className="absolute -inset-[5px] pointer-events-none rounded-full border-[3px] border-[#0f0f0f] opacity-0 transition-all duration-[600ms] ease-out group-hover:opacity-100 [-webkit-mask-image:linear-gradient(to_right,white,white),linear-gradient(to_left,white,white)] [-webkit-mask-position:left,right] [-webkit-mask-repeat:no-repeat,no-repeat] [-webkit-mask-size:0%_100%,0%_100%] group-hover:[-webkit-mask-size:50.5%_100%,50.5%_100%]" />
                  <span className="relative z-10">{text}</span>
                </Link>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-black/5 bg-[#14150f] aspect-video group"
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
              <source src="/videos/t3aiworks-vid2.webm" type="video/webm" />
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
        </motion.div>
      </div>
    </section>
  );
}
