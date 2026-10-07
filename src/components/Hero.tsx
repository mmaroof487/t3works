import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// fade the image edges to transparent so the crop never shows a hard line
const FADE: React.CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
  WebkitMaskComposite: 'source-in',
};

function Backdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 hidden overflow-x-clip sm:block">
      {/* two crops of the brain, sized/placed to match the design reference */}
      <img
        src="/images/Minimalist%20Neural%20Network%20Background.webp"
        alt=""
        className="absolute -left-[16vw] -top-6 w-[45vw] max-w-none -scale-y-100"
        style={FADE}
      />
      <img
        src="/images/Minimalist%20Neural%20Network%20Background.webp"
        alt=""
        className="absolute -left-[2vw] top-[71%] w-[28vw] max-w-none"
        style={FADE}
      />
      {/* darken blend keeps only the line art, so the image's slightly lighter paper colour disappears */}
      <img
        src="/images/Minimalist%20Isometric%20Cityscape.webp"
        alt=""
        className="absolute -right-[4vw] bottom-0 w-[42vw] max-w-none mix-blend-darken"
      />
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-svh w-full sm:min-h-screen flex-col items-center bg-[#f5f5f0] pt-[4.5rem] pb-28 sm:pt-[5.25rem] sm:pb-12">
      <Backdrop />
      {/* equal spacers centre the content vertically; the top one never shrinks below the gap
          that keeps the heading clear of the fixed nav pill on short desktop viewports */}
      <div aria-hidden="true" className="min-h-0 flex-1 lg:min-h-[4rem]" />
      <div className="absolute top-6 left-4 lg:hidden z-50">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="inline-flex items-baseline text-[#232621]">
            <span className="font-open-sauce text-4xl font-extrabold tracking-tight">t3</span>
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 -10% 0 0)' }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="font-batangas text-2xl ml-1 text-[#4a5d23]"
            >
              works
            </motion.span>
          </div>
        </Link>
      </div>

      <div className="relative mx-auto flex w-full max-w-[87.5rem] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-gray-900">
          Not more engineers. <br className="lg:hidden" />
          <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
            More engineering.
          </span>
        </h1>
        <p className="mt-3 max-w-[54rem] text-base sm:mt-4 sm:text-lg lg:text-xl leading-relaxed text-gray-800">
          Bridging university, enterprise and AI demand, converting raw talent into mentor-trained
          builders through a rigour-driven pipeline.
        </p>

        {/* phones get their own artwork with the labels baked in, bled to the screen edges */}
        <figure className="-mx-4 mt-0 w-[calc(100%+2rem)] max-w-6xl sm:mx-0 sm:-mt-2 sm:-mb-4 sm:w-full">
          <img
            src="/images/hero-mobile.webp"
            width={2400}
            height={1194}
            alt="Raw talent from universities flows into the T3 AI Works rigour-driven pipeline and emerges as mentor-trained builders for enterprises."
            className="h-auto w-full brightness-[1.012] sm:hidden"
          />
          <img
            src="/images/Talent%20Pipeline.webp"
            width={2172}
            height={724}
            alt="Raw talent from universities flows into the T3 AI Works rigour-driven pipeline and emerges as mentor-trained builders for enterprises."
            className="hidden h-auto w-full mix-blend-multiply sm:block sm:[mask-image:linear-gradient(to_right,transparent,black_1.5%,black_98.5%,transparent)]"
          />
        </figure>

        <p className="mt-2 max-w-[44.5rem] text-[0.9375rem] sm:mt-5 sm:text-base text-gray-700">
          Candidates are trained as engineers in AI and multi-agent systems, then connected directly
          with enterprise opportunities.
        </p>

        <div className="mt-7 flex w-full flex-wrap sm:mt-6 items-center justify-center gap-3 sm:w-auto sm:gap-4">
          <button
            type="button"
            onClick={() => {
              document
                .getElementById('ecosystem')
                ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c9b27a] bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] whitespace-nowrap px-4 py-3.5 text-base sm:w-auto sm:px-8 sm:py-4 sm:text-[0.9375rem] font-medium text-white shadow-lg shadow-[#c9b27a]/40 transition-shadow hover:shadow-[#c9b27a]/70"
          >
            See how it works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href="mailto:hello@t3works.com"
            className="hidden items-center rounded-full border border-gray-900/70 whitespace-nowrap px-8 py-4 text-[0.9375rem] sm:inline-flex font-medium text-gray-900 transition-colors hover:bg-white"
          >
            Speak to an Expert
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="flex-1" />
    </section>
  );
}
