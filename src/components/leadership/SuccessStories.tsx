import { ArrowUpRight } from 'lucide-react';
import { SUCCESS_STORIES } from '../../data/leadership';
import { cn } from '../../lib/cn';
import { AnimatedCounter } from '../AnimatedCounter';
import { Accent, Reveal, SectionHeading } from './primitives';

// the students' side of the site is coded olive
export default function SuccessStories() {
  return (
    <section id="talent-stories" className="w-full py-8 md:py-12">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Talent success stories"
          title={
            <>
              Careers, <Accent>accelerated.</Accent>
            </>
          }
          description="Three journeys into the industry, each ending in a placement at a stated premium salary."
        />

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SUCCESS_STORIES.map((story, index) => {
            const featured = index === 0;
            return (
              <li key={story.id}>
                <Reveal delay={index * 0.1} className="h-full">
                  <article
                    className={cn(
                      'flex h-full flex-col rounded-[1.75rem] border p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-8',
                      featured
                        ? 'border-[#4a5d23]/15 bg-gradient-to-br from-[#eef1e3] via-[#e8ecda] to-[#dde4c8] shadow-lg'
                        : 'border-black/5 bg-[#fbfbf9]'
                    )}
                  >
                    <p className="text-6xl font-bold tracking-tight md:text-7xl">
                      <Accent>
                        <AnimatedCounter value={story.premium} duration={1.6} />%
                      </Accent>
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-600">
                      Stated premium salary{story.extra ? ` ${story.extra}` : ''}
                    </p>

                    <div className="mt-8 flex-1">
                      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                        {story.name}
                      </h3>
                      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a5d23]">
                        {story.role}
                      </p>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-gray-600">
                        {story.story}
                      </p>
                    </div>

                    <p
                      className={cn(
                        'mt-6 flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm text-gray-700',
                        featured ? 'bg-white/60' : 'bg-black/[0.035]'
                      )}
                    >
                      <span>
                        {story.outcome}{' '}
                        <span className="font-semibold text-gray-900">{story.company}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#4a5d23]"
                      />
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
