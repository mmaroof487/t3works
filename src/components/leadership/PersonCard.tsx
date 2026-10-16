import type { Leader } from '../../data/leadership';
import { ArrowRight } from 'lucide-react';
import { Accent, Reveal, RichText } from './primitives';

interface PersonCardProps {
  person: Leader;
  /** position in the line-up, shown on the card's corner */
  index: number;
  onSelect: (person: Leader, trigger: HTMLButtonElement) => void;
}

// a square portrait, the same on every card and never stretched
const PORTRAIT_CLASS =
  'h-28 w-28 shrink-0 overflow-hidden rounded-[1.25rem] border border-black/5 shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)]';

/**
 * One person in a line-up. A header row holds a square portrait beside the name, designation and a
 * "View profile" cue, which together are about as tall as the portrait, so the header has no dead
 * space; a hairline separates it from three highlights. Every highlight box is at least two lines
 * tall, so a one-line highlight sits centred in a box the same size as a two-line one: the boxes
 * line up across the cards in a row and the cards end level, with no gap left at the bottom. The name's button covers the whole card, so a
 * click anywhere on it opens the profile.
 */
export default function PersonCard({ person, index, onSelect }: PersonCardProps) {
  return (
    <li className="min-w-0">
      <Reveal delay={(index % 3) * 0.1} className="h-full">
        <article className="group relative flex h-full flex-col rounded-[1.25rem] border border-black/5 bg-[#fbfbf9] p-5 shadow-[0_1px_3px_rgba(40,50,20,0.05)] transition-[box-shadow,border-color] duration-300 focus-within:border-[#4a5d23]/40 hover:border-[#4a5d23]/30 hover:shadow-[0_8px_24px_-8px_rgba(40,50,20,0.14)] sm:p-6 lg:p-5">
          {/* position in the line-up, centred on the card's corner as on the journey cards */}
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#4a5d23] text-xs font-semibold text-white shadow-sm lg:h-7 lg:w-7 lg:text-[0.6875rem]"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-4 lg:max-xl:min-h-[8rem] lg:gap-5">
            {person.photo ? (
              <div className={`relative ${PORTRAIT_CLASS}`}>
                <img
                  src={person.photo}
                  alt=""
                  width={400}
                  height={400}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className={`flex items-center justify-center bg-white text-4xl font-semibold tracking-tight ${PORTRAIT_CLASS}`}
              >
                <Accent>{person.initials}</Accent>
              </div>
            )}

            <div className="min-w-0">
              <h3 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    onSelect(person, e.currentTarget);
                  }}
                  className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#4a5d23]"
                >
                  {person.name}
                </button>
              </h3>
              <p className="mt-1 text-sm font-medium leading-snug text-[#566437]">{person.title}</p>
              <span
                aria-hidden="true"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 decoration-[#4a5d23]/50 decoration-1 underline-offset-4 transition-colors group-hover:text-[#4a5d23] group-hover:underline"
              >
                View profile
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          <span aria-hidden="true" className="my-4 block h-px w-full shrink-0 bg-black/[0.07]" />

          <ul className="grid flex-1 auto-rows-fr gap-1">
            {person.bio.map((point) => (
              <li
                key={point}
                className="flex min-h-[calc(2lh+1rem)] items-center gap-3 rounded-lg bg-black/[0.025] px-3 py-2 text-sm leading-snug text-gray-700"
              >
                <span
                  aria-hidden="true"
                  className="h-[0.3125rem] w-[0.3125rem] shrink-0 rounded-full bg-[#4a5d23]"
                />
                <span>
                  <RichText text={point} />
                </span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}
