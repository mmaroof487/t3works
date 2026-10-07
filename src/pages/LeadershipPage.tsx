import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CaseStudyExplorer from '../components/leadership/CaseStudyExplorer';
import ClientTestimonials from '../components/leadership/ClientTestimonials';
import StepTestimonials from '../components/leadership/StepTestimonials';
import SuccessStories from '../components/leadership/SuccessStories';
import TeamGrid from '../components/leadership/TeamGrid';
import { Accent } from '../components/leadership/primitives';
import { scrollToSection } from '../lib/scrollToSection';

const ILLUSTRATION = '/images/Leadership%20Mentoring%20Session.webp';

// The illustration is unframed, so its edges must not show. The artwork runs off the right-hand
// edge, so the sides soften into the page; top and bottom only fade the empty paper margin around
// the artwork (it spans 10%-93% of the height), whose shade is a touch off the page colour.
const EDGE_FADE_MASK =
  'linear-gradient(to right, transparent, black 9%, black 90%, transparent), linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)';
const EDGE_FADE: React.CSSProperties = {
  maskImage: EDGE_FADE_MASK,
  maskComposite: 'intersect',
  WebkitMaskImage: EDGE_FADE_MASK,
  WebkitMaskComposite: 'source-in',
};

export default function LeadershipPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#f5f5f0] text-gray-900 selection:bg-[#4a5d23] selection:text-white">
        {/* Hero */}
        <section className="relative w-full overflow-x-clip pb-8 pt-24 md:pb-12 lg:pt-40">
          {/* below lg the nav pill is at the bottom, so the brand sits here as on the other pages */}
          <div className="absolute left-4 top-6 z-10 lg:hidden">
            <Link
              to="/"
              className="inline-flex items-baseline text-[#232621] transition-opacity hover:opacity-80"
            >
              <span className="font-open-sauce text-3xl font-extrabold tracking-tight">t3</span>
              <span className="ml-1 font-batangas text-xl text-[#4a5d23]">works</span>
              <span className="mx-2 text-xl font-medium text-gray-400">/</span>
              <span className="text-xl font-bold">Leadership</span>
            </Link>
          </div>

          <div className="mx-auto grid w-full max-w-[87.5rem] grid-cols-1 items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
                  Advisory &amp; leadership
                </span>
                <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
              </div>

              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
                The Architects of <Accent>Execution.</Accent>
              </h1>

              <p className="mt-5 max-w-[40rem] text-base leading-relaxed text-gray-700 text-pretty sm:text-lg lg:text-xl">
                Meet the Talencia Global leadership team behind T3 AI Works, and the engagements,
                client relationships and student outcomes that shaped how we build engineering
                talent.
              </p>

              <div className="mt-8 flex w-full flex-wrap items-center gap-3 sm:w-auto sm:gap-4">
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection('#team');
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#c9b27a] bg-gradient-to-r from-[#4a5d23] to-[#7d6f36] px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-[#c9b27a]/40 transition-shadow hover:shadow-[#c9b27a]/70 sm:w-auto sm:py-4 sm:text-[0.9375rem]"
                >
                  Meet the team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection('#case-studies');
                  }}
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-gray-900/70 px-8 py-3.5 text-base font-medium text-gray-900 transition-colors hover:bg-white sm:w-auto sm:py-4 sm:text-[0.9375rem]"
                >
                  See the track record
                </button>
              </div>
            </motion.div>

            {/* a little wider than its half of the page, spilling evenly either side, so it carries
                as much weight as the copy */}
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              src={ILLUSTRATION}
              width={1585}
              height={992}
              alt="A mentor walking a group of students through a growth roadmap on campus."
              className="pointer-events-none h-auto w-full lg:-mx-[7%] lg:w-[114%] lg:max-w-none"
              style={EDGE_FADE}
            />
          </div>
        </section>

        <TeamGrid />
        <CaseStudyExplorer />
        <ClientTestimonials />
        <SuccessStories />
        <StepTestimonials />
      </div>
    </MotionConfig>
  );
}
