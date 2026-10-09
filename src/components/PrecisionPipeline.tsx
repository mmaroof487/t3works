import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoLauncher from './VideoLauncher';
import { useMediaQuery } from '../lib/useMediaQuery';

const FUNNEL = '/images/Funnel.webp';
const FUNNEL_MOBILE = '/images/Funnel-mobile.webp';
const VIDEO_SRC = '/videos/t3aiworks-vid3.webm';

// fade the cropped artwork's own paper colour into the page at its edges
const EDGE_FADE: React.CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 5%, black 96%, transparent), linear-gradient(to right, transparent, black 2.5%, black 97.5%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 5%, black 96%, transparent), linear-gradient(to right, transparent, black 2.5%, black 97.5%, transparent)',
  WebkitMaskComposite: 'source-in',
};

// The tall artwork has its copy, video still and play button drawn in, so only the video needs a
// live control, placed in % of the image. Its paper is a shade off the page colour, with white
// bands between its screens, so it is darken-blended onto the page colour to lose both.
function MobilePipeline() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 px-4 text-center"
      >
        <h2 className="text-[clamp(1.5rem,8vw,1.875rem)] font-bold leading-[1.15] tracking-tight text-gray-900">
          <span className="block">Our Precision</span>
          <span className="block whitespace-nowrap">
            Selection <span className="text-[#a3854a]">Pipeline</span>
          </span>
        </h2>
        <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-[#a3854a]/70" />
        <p className="mt-4 text-[clamp(0.875rem,4.4vw,1rem)] text-[#4a5d23]">
          How we turn raw talent into T3 engineers
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto aspect-[1120/3776] w-full max-w-[30rem] bg-[#f5f5f0] [container-type:inline-size]"
      >
        <img
          src={FUNNEL_MOBILE}
          alt="Selection pipeline. 500 candidates enter Phase 0 pre-assessment and screening. 125 candidates go through the Phase 1 two-week bootcamp, the Phase 2 C1-C6 assessments and hackathons and the Phase 3 eight-week RADIX framework program, and 50 to 75 candidates reach the Phase 4 four-month internship. Next step: watch the deep dive video explaining our filtering and acceleration process. Talent DNA: hiring for DNA, not just skills."
          className="absolute inset-0 h-full w-full mix-blend-darken"
        />
        {/* sits on the drawn video frame; the launcher's own preview stays hidden so the artwork shows */}
        <VideoLauncher
          src={VIDEO_SRC}
          label="Play the deep dive video"
          className="absolute left-[26.52%] top-[77.17%] h-[8.34%] w-[51.43%] rounded-[2cqw] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23] [&>video]:opacity-0"
        />
      </motion.div>
    </div>
  );
}

// The artwork has wide empty margins, so only its content box is shown: x 3.5%-91%, y 8.5%-96%, so the content sits centred.
// The tier numbers and phase labels are drawn into the artwork.
// Overlays are positioned in % of that box and sized in cqw, so it scales like one picture.
// Below md the tall MobilePipeline artwork is rendered instead.
export default function PrecisionPipeline() {
  const isMobile = useMediaQuery('(width < 48rem)');

  return (
    <section className="relative w-full overflow-x-clip py-8 md:py-12">
      {/* geometric network, mirrored from the hero's, centred on the seam with the section above, bleeding off the right edge */}
      <img
        src="/images/Minimalist%20Neural%20Network%20Background.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6vw] hidden w-[38vw] max-w-none -scale-x-100 sm:block"
        style={{ ...EDGE_FADE, top: 'calc(-1rem - 12.45vw)' }}
      />
      {isMobile ? <MobilePipeline /> : <DesktopPipeline />}
    </section>
  );
}

function DesktopPipeline() {
  return (
    <div className="relative mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-3 max-w-4xl text-center md:mb-4"
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Our Precision{' '}
          <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
            Selection Pipeline
          </span>
        </h2>
        <p className="mt-4 text-sm font-medium tracking-wide text-gray-700 sm:text-base lg:text-lg">
          How we turn raw talent into T3 engineers
        </p>
      </motion.div>

      <div className="overflow-x-auto md:overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-[2750/1536] w-full min-w-[51.25rem] [container-type:inline-size]"
        >
          <div className="absolute inset-0 overflow-hidden" style={EDGE_FADE}>
            <img
              src={FUNNEL}
              alt="Selection funnel: 500 candidates enter Phase 0 pre-assessment and screening, 125 candidates go through the Phase 1 two-week bootcamp, the Phase 2 C1-C6 assessments and hackathon and the Phase 3 eight-week RADIX framework program, and 50 to 75 candidates reach the Phase 4 four-month internship."
              className="absolute max-w-none"
              style={{ width: '114.286%', left: '-4%', top: '-9.714%' }}
            />
            {/* covers the sparkle mark baked into the artwork's corner */}
            <div
              aria-hidden="true"
              className="absolute left-[97.7%] top-[82.85%] h-[8.6%] w-[6.2%] bg-[radial-gradient(circle,#f5f5f0_55%,transparent_75%)]"
            />
          </div>

          {/* video, joined to the funnel by the pipe in the artwork */}
          <p className="absolute left-[65%] top-[22.5%] w-[32.6%] whitespace-nowrap text-center text-[1.45cqw] font-semibold leading-none tracking-tight text-[#232621]">
            Watch the deep dive video <span className="font-medium">(Next step)</span>
          </p>
          <VideoLauncher
            src={VIDEO_SRC}
            label="Play the deep dive video"
            className="absolute left-[67.04%] top-[28.2%] aspect-[2/1] w-[28.56%] rounded-[1.45cqw] border-[0.5cqw] border-[#b79b55] bg-[#0b1220] shadow-xl"
          >
            <span className="absolute inset-0 grid place-items-center">
              <span className="relative grid h-[5cqw] w-[5cqw] place-items-center transition-transform duration-300 group-hover:scale-105">
                <span
                  aria-hidden="true"
                  className="absolute -inset-[1.3cqw] rounded-full border border-white/25"
                />
                <span
                  aria-hidden="true"
                  className="play-pulse absolute -inset-[1.3cqw] rounded-full border border-[#d8cf6a]/50"
                />
                <span className="grid h-full w-full place-items-center rounded-full bg-[#232621]/70 shadow-[0_0_2.2cqw_rgba(200,190,80,0.35)] ring-[0.28cqw] ring-[#b5ad45] backdrop-blur-sm">
                  <Play
                    className="ml-[0.3cqw] h-[2cqw] w-[2cqw] fill-white text-white"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </span>
          </VideoLauncher>
          <p className="absolute left-[67.04%] top-[55%] w-[28.56%] text-center text-[1.45cqw] leading-snug text-gray-800">
            Our rigorous filtering and acceleration process explained
          </p>

          {/* talent DNA */}
          <p className="absolute left-[67.04%] top-[64.6%] w-[28.56%] text-center text-[1.65cqw] font-semibold uppercase leading-none tracking-[0.18em] text-[#4a5d23]">
            Talent DNA:
          </p>
          <p className="absolute left-[67.04%] top-[93.2%] w-[28.56%] text-center text-[1.5cqw] font-medium leading-tight tracking-tight text-gray-700">
            Hiring for DNA, Not Just Skills
          </p>
        </motion.div>
      </div>
    </div>
  );
}
