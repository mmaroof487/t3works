import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LABELS = [
  { title: 'Universities', text: 'Raw talent enters', align: 'text-left' },
  { title: 'T3 AI Works', text: 'Rigour-driven pipeline', align: 'text-center' },
  { title: 'Enterprises', text: 'Mentor-trained builders emerge', align: 'text-right' },
];

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
    <section className="relative flex min-h-screen w-full items-center justify-center bg-[#f5f5f0] pt-[5.25rem] pb-12">
      <Backdrop />
      <div className="absolute top-6 left-4 lg:hidden z-50">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="inline-flex items-baseline text-black">
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
        <p className="mt-4 max-w-[54rem] text-lg lg:text-xl leading-relaxed text-gray-800">
          Bridging university, enterprise and AI demand, converting raw talent into mentor-trained
          builders through a rigour-driven pipeline.
        </p>

        {/* phones: zoom to the university -> hub -> arrows core and swap the baked-in labels for real text */}
        <figure className="w-full max-w-6xl sm:-mt-2 sm:-mb-4">
          <div className="aspect-[49/20] overflow-hidden sm:aspect-auto">
            <img
              src="/images/Talent%20Pipeline.webp"
              width={2172}
              height={724}
              alt="Raw talent from universities flows into the T3 AI Works rigour-driven pipeline and emerges as mentor-trained builders for enterprises."
              className="-ml-[30%] h-auto w-[160%] max-w-none mix-blend-multiply sm:ml-0 sm:w-full sm:[mask-image:linear-gradient(to_right,transparent,black_1.5%,black_98.5%,transparent)]"
            />
          </div>
          <figcaption className="mt-3 grid grid-cols-3 gap-2 sm:hidden">
            {LABELS.map((label) => (
              <div key={label.title} className={label.align}>
                <p className="text-sm font-semibold text-gray-900">{label.title}</p>
                <p className="text-xs text-gray-600">{label.text}</p>
              </div>
            ))}
          </figcaption>
        </figure>

        <p className="mt-5 max-w-[44.5rem] text-sm sm:text-base text-gray-700">
          Candidates are trained as engineers in AI and multi-agent systems, then connected directly
          with enterprise opportunities.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              document
                .getElementById('ecosystem')
                ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c9b27a] bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] whitespace-nowrap px-4 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-[0.9375rem] font-medium text-white shadow-lg shadow-[#c9b27a]/40 transition-shadow hover:shadow-[#c9b27a]/70"
          >
            See how it works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href="mailto:hello@t3works.com"
            className="inline-flex items-center rounded-full border border-gray-900/70 whitespace-nowrap px-4 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-[0.9375rem] font-medium text-gray-900 transition-colors hover:bg-white"
          >
            Speak to an Expert
          </a>
        </div>
      </div>
    </section>
  );
}
