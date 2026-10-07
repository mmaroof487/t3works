import { LEADERS } from '../../data/leadership';
import { Accent, Reveal, SectionHeading } from './primitives';

export default function TeamGrid() {
  return (
    <section id="team" className="w-full py-8 md:py-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The team"
          title={
            <>
              Advisory &amp; <Accent>Leadership.</Accent>
            </>
          }
          description="Four leaders spanning capital and ecosystems, talent pipelines, applied technology and global engineering networks, validating core business requirements."
        />

        <ol className="grid gap-x-6 gap-y-8 md:grid-cols-2">
          {LEADERS.map((leader, index) => (
            <li key={leader.id}>
              <Reveal delay={(index % 2) * 0.1} className="h-full">
                <article className="relative flex h-full flex-col rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-6 shadow-sm sm:p-8">
                  {/* position in the line-up, centred on the card's corner as on the journey cards */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#4a5d23] text-[0.8125rem] font-semibold text-white shadow-md"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white text-2xl font-semibold tracking-tight shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)]"
                    >
                      <Accent>{leader.initials}</Accent>
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900">
                        {leader.name}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-[#4a5d23]">
                        {leader.title}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {leader.bio.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-lg bg-black/[0.035] px-3 py-2.5 text-[0.9375rem] leading-snug text-gray-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5d23]"
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
    </section>
  );
}
