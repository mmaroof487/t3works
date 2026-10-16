import { motion } from 'framer-motion';
import { ADVISORS } from '../../data/leadership';
import { Accent, Reveal } from './primitives';

// Advisors are shown by name and designation alone, so their cards do not open a profile. From lg
// the whole section (heading and cards) fits one screen below the nav pill, like the sections above.
export default function AdvisorGrid() {
  return (
    <section id="advisors" className="relative w-full py-8 md:py-12 lg:pb-4 lg:pt-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 lg:mb-6"
        >
          <div className="mb-6 flex items-center gap-4 lg:mb-3">
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              The advisors
            </span>
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Strategic <Accent>Counsel.</Accent>
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-gray-600 text-balance sm:text-lg lg:mt-2 lg:max-w-[42rem] lg:text-base">
            Senior voices from digital innovation, cloud, digital business, venture investing and
            business strategy who advise on our direction.
          </p>
        </motion.div>

        <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-4">
          {ADVISORS.map((advisor, index) => (
            <li key={advisor.id}>
              <Reveal delay={(index % 4) * 0.08} className="h-full">
                <article className="relative flex h-full flex-col items-center rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-6 text-center shadow-sm sm:p-8 lg:p-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#4a5d23] text-[0.8125rem] font-semibold text-white shadow-md lg:h-8 lg:w-8 lg:text-xs"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {advisor.photo ? (
                    <img
                      src={advisor.photo}
                      alt={`Portrait of ${advisor.name}`}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="h-36 w-36 shrink-0 rounded-full border border-black/5 object-cover object-top shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] lg:h-40 lg:w-40"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white text-4xl font-semibold tracking-tight shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] lg:h-40 lg:w-40"
                    >
                      <Accent>{advisor.initials}</Accent>
                    </span>
                  )}

                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-gray-900 lg:mt-4 lg:text-xl">
                    {advisor.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-[#4a5d23] text-balance lg:text-sm">
                    {advisor.title}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
