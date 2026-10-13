import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { MENTORS } from '../../data/leadership';
import { Accent, LinkedinIcon, Reveal } from './primitives';

const CONTACT_LINK_CLASS =
  'inline-flex min-w-0 items-center gap-2.5 underline-offset-4 hover:text-[#4a5d23] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23]';

// From lg the whole section (heading and both cards) is sized to fit one screen below the nav
// pill, like the team section above it, so the spacing and type are tighter there.
// The mentors' cards carry the whole profile, so unlike the team's they do not open a modal.
export default function MentorGrid() {
  return (
    <section id="mentors" className="w-full py-8 md:py-12 lg:pb-4 lg:pt-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 lg:mb-5"
        >
          <div className="mb-6 flex items-center gap-4 lg:mb-3">
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              The mentors
            </span>
            <span className="h-px w-10 bg-[#4a5d23]/60" aria-hidden="true" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Guidance &amp; <Accent>Mentorship.</Accent>
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-gray-600 text-balance sm:text-lg lg:mt-2 lg:max-w-[42rem] lg:text-base">
            Industry practitioners who coach our engineers, bringing decades of product,
            architecture and healthcare technology experience.
          </p>
        </motion.div>

        <ol className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-y-4">
          {MENTORS.map((mentor, index) => (
            <li key={mentor.id}>
              <Reveal delay={(index % 2) * 0.1} className="h-full">
                <article className="relative flex h-full flex-col rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-6 shadow-sm sm:p-8 lg:p-5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#4a5d23] text-[0.8125rem] font-semibold text-white shadow-md lg:h-8 lg:w-8 lg:text-xs"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* photo on the left; beside it the name, designation and contact links, so the
                      profile text below can run at one width for both mentors */}
                  <div className="flex items-center gap-5">
                    {mentor.photo ? (
                      <img
                        src={mentor.photo}
                        alt=""
                        width={400}
                        height={400}
                        className="h-28 w-28 shrink-0 rounded-[1.15rem] border border-black/5 object-cover object-top shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] sm:h-32 sm:w-32 lg:h-28 lg:w-28 lg:rounded-2xl"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white text-4xl font-semibold tracking-tight shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] sm:h-32 sm:w-32 lg:h-28 lg:w-28 lg:rounded-2xl"
                      >
                        <Accent>{mentor.initials}</Accent>
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 lg:text-xl">
                        {mentor.name}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-[#4a5d23] lg:mt-1 lg:text-sm">
                        {mentor.title}
                      </p>

                      {(mentor.email ?? mentor.linkedin) && (
                        <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-gray-700 lg:mt-2.5 lg:text-sm">
                          {mentor.email && (
                            <li className="min-w-0">
                              <a href={`mailto:${mentor.email}`} className={CONTACT_LINK_CLASS}>
                                <Mail
                                  size={16}
                                  aria-hidden="true"
                                  className="shrink-0 text-[#a3854a]"
                                />
                                <span className="truncate">{mentor.email}</span>
                              </a>
                            </li>
                          )}
                          {mentor.linkedin && (
                            <li className="min-w-0">
                              <a
                                href={mentor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={CONTACT_LINK_CLASS}
                              >
                                <LinkedinIcon className="h-4 w-4 shrink-0 text-[#a3854a]" />
                                <span className="truncate">
                                  {mentor.linkedin
                                    .replace(/^https?:\/\/(www\.)?/, '')
                                    .replace(/\/$/, '')}
                                </span>
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed text-gray-700 lg:mt-4 lg:space-y-2 lg:text-sm lg:leading-relaxed">
                    {mentor.about.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
