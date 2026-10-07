import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { STEP_TESTIMONIALS, type StudentTestimonial } from '../../data/leadership';
import { Accent, Reveal, SectionHeading } from './primitives';

function StudentCard({ student }: { student: StudentTestimonial }) {
  const [expanded, setExpanded] = useState(false);
  const [intro, ...rest] = student.body;
  const detailsId = `step-story-${student.id}`;

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] p-6 shadow-sm sm:p-8 lg:p-10">
      <header className="flex items-start gap-5">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white text-xl font-semibold shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)]"
        >
          <Accent>{student.name.charAt(0)}</Accent>
        </span>
        <div className="min-w-0">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900">
            {student.name}
          </h3>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a5d23]">
            {student.programme}
          </p>
          <p className="mt-3 inline-flex rounded-full bg-[#4a5d23]/10 px-3 py-1 text-xs font-semibold text-[#4a5d23]">
            {student.outcome}
          </p>
        </div>
      </header>

      <blockquote className="mt-8 border-l-2 border-[#4a5d23] pl-5 text-xl font-medium leading-snug tracking-tight text-gray-900 md:text-2xl">
        &ldquo;{student.pullQuote}&rdquo;
      </blockquote>

      <div id={detailsId} className="mt-8 flex-1 space-y-4 leading-relaxed text-gray-600">
        <p>{intro}</p>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                {rest.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {student.skills && (
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {student.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full bg-black/[0.035] px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
                {student.closing && <p className="text-sm text-gray-500">{student.closing}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => {
          setExpanded((open) => !open);
        }}
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gray-900/70 px-6 py-3 text-[0.9375rem] font-medium text-gray-900 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23]"
      >
        {expanded ? 'Show less' : 'Read the full story'}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
    </article>
  );
}

export default function StepTestimonials() {
  return (
    <section id="step" className="w-full py-8 md:py-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="STEP training"
          title={
            <>
              Students, in their <Accent>own words.</Accent>
            </>
          }
          description="The SRM Talent Empowerment Program (STEP) is delivered by Talencia Global through the SRM Career Centre: structured sessions, assessments, projects and weekend hackathons."
        />

        <ul className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {STEP_TESTIMONIALS.map((student, index) => (
            <li key={student.id}>
              <Reveal delay={index * 0.1}>
                <StudentCard student={student} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
