import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'Worked with Steve Jobs for the launch of the legendary first Apple Macintosh.',
    name: 'Andy Cunningham',
    title: 'CEO',
    company: 'Cunningham Collective, USA',
  },
  {
    quote:
      'Their focus on understanding our unique Talent DNA transformed our hiring pipeline completely.',
    name: 'Anuradha Varma',
    title: 'Associate Director',
    company: 'Ernst & Young',
  },
  {
    quote:
      "Exceptional speed and quality. They don't just fill seats, they build high-performing engineering teams.",
    name: 'Harish Ravi',
    title: 'Managing Director',
    company: 'Eurofins India',
  },
  {
    quote:
      'The campus hiring program gave us ready-to-deploy engineers that immediately added value.',
    name: 'Pragya Shrimali',
    title: 'Head of HR',
    company: 'Philips Innovation Campus',
  },
  {
    quote: 'A true partner in success. Their global network and methodology are unmatched.',
    name: 'Anil Sarapalli',
    title: 'Former GM',
    company: 'Fiserv',
  },
  {
    quote: "They understand the nuances of deep tech hiring better than anyone we've worked with.",
    name: 'Subramanian Ganesan',
    title: 'APAC R&D Head',
    company: 'Amadeus',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="w-full bg-transparent py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl">
            Hear from our clients
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center justify-between absolute top-1/2 -left-4 md:-left-12 -right-4 md:-right-12 -translate-y-1/2 z-10 pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-900"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-900"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="rounded-[2.5rem] bg-white shadow-sm border border-gray-100/50 p-10 md:p-16 text-center flex flex-col items-center justify-center h-full"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 italic mb-10 leading-relaxed font-serif">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-[#0f0f0f]">
                    {TESTIMONIALS[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {TESTIMONIALS[currentIndex].title}, {TESTIMONIALS[currentIndex].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-[#4a5d23]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${String(idx + 1)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
