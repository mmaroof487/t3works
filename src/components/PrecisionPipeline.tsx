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

const PAPER = '#f5f5f0';

// The tall artwork has its copy, video still and play button drawn in, so only the video needs a
// live control. Shown is its content box, x 189-995 and y 400-3576 of 1184x3584; everything on top
// is placed in % of that box. Its paper is white, so it is multiplied onto the page colour.
// Drawn into the artwork but not part of the design: the 01 / 02 / 03 screen markers and a
// faint sparkle mark beside the DNA strand.
const MOBILE_COVERS = [
  { left: '2.85%', top: '2.015%', width: '9.31%', height: '2.204%' },
  { left: '2.85%', top: '30.29%', width: '10.3%', height: '2.204%' },
  { left: '87.1%', top: '66.18%', width: '10.05%', height: '2.236%' },
  { left: '88.83%', top: '90.37%', width: '11.17%', height: '4.72%' },
];

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
        className="relative mx-auto aspect-[806/3176] w-full max-w-[30rem] overflow-hidden [container-type:inline-size]"
        style={{ backgroundColor: PAPER }}
      >
        <img
          src={FUNNEL_MOBILE}
          alt="Selection pipeline. Phase 0 pre-assessment: 500 applicants are screened with online tests and the top 25% go through. Rigor-driven filtering: 125 candidates are narrowed through bootcamps and hackathons into 50 to 75 elite T3 Talent engineers. Next step: watch the deep dive video explaining our filtering and acceleration process. Talent DNA: hiring for DNA, not just skills."
          className="absolute max-w-none mix-blend-multiply"
          style={{ width: '146.9%', left: '-23.449%', top: '-12.594%' }}
        />
        {MOBILE_COVERS.map((box) => (
          <div
            key={box.top}
            aria-hidden="true"
            className="absolute"
            style={{ ...box, backgroundColor: PAPER }}
          />
        ))}
        {/* sits on the drawn video frame; the launcher's own preview stays hidden so the artwork shows */}
        <VideoLauncher
          src={VIDEO_SRC}
          label="Play the deep dive video"
          className="absolute left-[14.02%] top-[74.685%] h-[9.761%] w-[71.71%] rounded-[3.4cqw] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23] [&>video]:opacity-0"
        />
      </motion.div>
    </div>
  );
}

// The artwork has wide empty margins, so only its content box is shown: x 7.15%-91%, y 26.5%-96%, so the content sits centred.
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
          className="relative mx-auto aspect-[1677/780] w-full min-w-[51.25rem] [container-type:inline-size]"
        >
          <div className="absolute inset-0 overflow-hidden" style={EDGE_FADE}>
            <img
              src={FUNNEL}
              alt="Selection funnel: 500 applicants are screened online, narrowed through bootcamps and hackathons, and emerge as 50 to 75 elite T3 Talent engineers."
              className="absolute max-w-none"
              style={{ width: '119.26%', left: '-8.527%', top: '-38.129%' }}
            />
            {/* covers the sparkle mark baked into the artwork's corner */}
            <div
              aria-hidden="true"
              className="absolute left-[97.6%] top-[78.4%] h-[10.8%] w-[6.5%] bg-[radial-gradient(circle,#f1eee4_55%,transparent_75%)]"
            />
          </div>

          {/* numbers on the funnel tiers */}
          <p className="absolute left-[28.4%] top-[23.5%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-white drop-shadow">
            <span className="text-[3.1cqw]">500</span>{' '}
            <span className="text-[1.75cqw]">Applicants</span>
          </p>
          <p className="absolute left-[28.4%] top-[43.3%] -translate-x-1/2 -translate-y-1/2 text-center font-bold leading-[1.05] text-[#1f2a10]">
            <span className="block text-[3.35cqw]">125</span>
            <span className="block text-[1.75cqw]">Candidates</span>
          </p>
          <p className="absolute left-[28.8%] top-[77%] w-[11.5cqw] -translate-x-1/2 -translate-y-1/2 text-center font-bold leading-[1.05] text-white drop-shadow">
            <span className="block text-[3.1cqw]">50-75</span>
            <span className="block text-[1.15cqw]">Elite &lsquo;T3 Talent&rsquo; Engineers</span>
          </p>

          {/* video, joined to the funnel by the pipe in the artwork */}
          <p className="absolute left-[63.5%] top-[2.4%] w-[34%] whitespace-nowrap text-center text-[1.5cqw] font-semibold leading-none tracking-tight text-[#232621]">
            Watch the deep dive video <span className="font-medium">(Next step)</span>
          </p>
          <VideoLauncher
            src={VIDEO_SRC}
            label="Play the deep dive video"
            className="absolute left-[65.6%] top-[9.6%] aspect-[2/1] w-[29.8%] rounded-[1.45cqw] border-[0.5cqw] border-[#b79b55] bg-[#0b1220] shadow-xl"
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
          <p className="absolute left-[65.6%] top-[43.3%] w-[29.8%] text-center text-[1.5cqw] leading-snug text-gray-800">
            Our rigorous filtering and acceleration process explained
          </p>

          {/* talent DNA */}
          <p className="absolute left-[65.6%] top-[55.4%] w-[29.8%] text-center text-[1.7cqw] font-semibold uppercase leading-none tracking-[0.18em] text-[#4a5d23]">
            Talent DNA:
          </p>
          <p className="absolute left-[65.6%] top-[91.4%] w-[29.8%] text-center text-[1.55cqw] font-medium leading-tight tracking-tight text-gray-700">
            Hiring for DNA, Not Just Skills
          </p>
        </motion.div>
      </div>
    </div>
  );
}
