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
    <section className="relative flex min-h-svh w-full sm:min-h-screen flex-col items-center bg-[#f5f5f0] pt-[4.5rem] pb-28 sm:pt-[5.25rem] sm:pb-12 tablet-portrait:pb-24 md:tablet-portrait:pb-40 lg:tablet-portrait:pt-28 lg:tablet-portrait:pb-12">
      <Backdrop />
      {/* equal spacers centre the content vertically (on phones and portrait tablets the content
          column spreads itself out instead, see below); the top one never shrinks below the gap
          that keeps the heading clear of the fixed nav pill on short desktop viewports */}
      <div
        aria-hidden="true"
        className="hidden min-h-0 flex-1 sm:block lg:min-h-[4rem] tablet-portrait:hidden"
      />
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

      {/* on phones and portrait tablets the column fills the space between the logo and the nav
          pill and shares the spare height evenly between its blocks, so tall screens get no single
          large gap; portrait tablets also get type sized from the viewport width */}
      <div className="relative mx-auto flex w-full max-w-[87.5rem] flex-col items-center px-4 text-center max-sm:flex-1 max-sm:justify-evenly sm:px-6 lg:px-8 tablet-portrait:flex-1 tablet-portrait:justify-evenly">
        <h1 className="text-[length:clamp(1.75rem,9vw,2.25rem)] max-lg:whitespace-nowrap sm:text-5xl lg:text-7xl lg:max-xl:text-[4.76vw] tablet-portrait:whitespace-nowrap tablet-portrait:text-[7.5vw] font-semibold leading-[1.1] tracking-tight text-gray-900">
          Not more engineers. <br className="lg:hidden tablet-portrait:inline" />
          <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
            More engineering.
          </span>
        </h1>
        <p className="mt-2 max-w-[54rem] text-[length:clamp(0.875rem,2svh,1rem)] leading-normal sm:mt-4 sm:text-lg sm:leading-relaxed lg:text-xl tablet-portrait:text-[2.4vw] text-gray-800">
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

        <p className="mt-1 max-w-[44.5rem] text-[length:clamp(0.8125rem,1.85svh,0.9375rem)] sm:mt-5 sm:text-base tablet-portrait:max-w-[72vw] tablet-portrait:text-[2vw] text-gray-700">
          Candidates are trained as engineers in AI and multi-agent systems, then connected directly
          with enterprise opportunities.
        </p>

        <div className="mt-4 flex w-full flex-wrap sm:mt-6 items-center justify-center gap-3 sm:w-auto sm:gap-4">
          <button
            type="button"
            onClick={() => {
              document
                .getElementById('pipeline')
                ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c9b27a] bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] whitespace-nowrap px-4 py-3.5 text-base sm:w-auto sm:px-8 sm:py-4 sm:text-[0.9375rem] tablet-portrait:text-[max(0.9375rem,1.9vw)] font-medium text-white shadow-lg shadow-[#c9b27a]/40 transition-shadow hover:shadow-[#c9b27a]/70"
          >
            See how it works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="hidden flex-1 sm:block tablet-portrait:hidden" />
    </section>
  );
}
