import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LEADERS, type Leader } from '../../data/leadership';
import LeaderModal from './LeaderModal';
import { Accent, Reveal } from './primitives';

// From lg the whole section (heading and all four cards) is sized to fit one screen below the nav
// pill, so the spacing and type here are tighter than in the other sections, and the top padding
// clears the pill when the page is scrolled to #team.
export default function TeamGrid() {
  const [selected, setSelected] = useState<Leader | null>(null);
  // the card that opened the modal, so focus can go back to it on close
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setSelected(null);
    openerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="team" className="relative w-full py-8 md:py-12 lg:pb-4 lg:pt-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        {/* SectionHeading's look, but from lg tighter, with the description held to two even lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 lg:mb-4"
        >
          <div className="mb-6 flex items-center gap-4 lg:mb-3">
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              The team
            </span>
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Advisory &amp; <Accent>Leadership.</Accent>
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-gray-600 text-balance sm:text-lg lg:mt-2 lg:max-w-[42rem] lg:text-base">
            Four leaders spanning capital and ecosystems, talent pipelines, applied technology and
            global engineering networks, validating core business requirements.
          </p>
        </motion.div>

        <ol className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-y-4">
          {LEADERS.map((leader, index) => (
            <li key={leader.id}>
              <Reveal delay={(index % 2) * 0.1} className="h-full">
                <article className="group relative flex h-full flex-col rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-6 shadow-sm transition-[box-shadow,border-color] duration-300 focus-within:border-[#4a5d23]/40 hover:border-[#4a5d23]/30 hover:shadow-lg sm:p-8 lg:p-5">
                  {/* position in the line-up, centred on the card's corner as on the journey cards */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#4a5d23] text-[0.8125rem] font-semibold text-white shadow-md lg:h-8 lg:w-8 lg:text-xs"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-5 lg:gap-4">
                    {leader.photo ? (
                      <img
                        src={leader.photo}
                        alt=""
                        width={400}
                        height={400}
                        className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-[1.15rem] border border-black/5 object-cover shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] lg:h-14 lg:w-14 lg:rounded-2xl"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white text-2xl font-semibold tracking-tight shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] lg:h-14 lg:w-14 lg:rounded-2xl lg:text-xl"
                      >
                        <Accent>{leader.initials}</Accent>
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 lg:text-xl">
                        {/* the button's ::after covers the card, so the whole card opens the profile */}
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={(e) => {
                            openerRef.current = e.currentTarget;
                            setSelected(leader);
                          }}
                          className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#4a5d23]"
                        >
                          {leader.name}
                        </button>
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-[#4a5d23] lg:mt-1 lg:text-sm lg:leading-snug">
                        {leader.title}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2 lg:mt-4 lg:space-y-1.5">
                    {leader.bio.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-lg bg-black/[0.035] px-3 py-2.5 text-[0.9375rem] leading-snug text-gray-700 lg:py-1.5 lg:text-sm lg:leading-snug"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5d23] lg:mt-[0.4rem]"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {selected && <LeaderModal key={selected.id} leader={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
