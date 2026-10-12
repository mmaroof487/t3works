import { AnimatePresence, motion } from 'framer-motion';
import { LEADERS } from '../../data/leadership';
import LeaderModal from './LeaderModal';
import PersonCard from './PersonCard';
import { useProfileModal } from './useProfileModal';
import { Accent } from './primitives';

// From lg the whole section (heading and all four cards) is sized to fit one screen below the nav
// pill, so the spacing and type here are tighter than in the other sections, and the top padding
// clears the pill when the page is scrolled to #team.
export default function TeamGrid() {
  const { selected, open, close } = useProfileModal();

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
            <PersonCard key={leader.id} person={leader} index={index} onSelect={open} />
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {selected && <LeaderModal key={selected.id} leader={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
