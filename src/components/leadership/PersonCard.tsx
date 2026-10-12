import type { Leader } from '../../data/leadership';
import { Accent, Reveal } from './primitives';

interface PersonCardProps {
  person: Leader;
  /** position in the line-up, shown on the card's corner */
  index: number;
  onSelect: (person: Leader, trigger: HTMLButtonElement) => void;
}

/**
 * One person in a line-up: portrait, name, designation and three highlights. The name's button
 * covers the whole card, so a click anywhere on it opens the profile.
 */
export default function PersonCard({ person, index, onSelect }: PersonCardProps) {
  return (
    <li>
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
            {person.photo ? (
              <img
                src={person.photo}
                alt=""
                width={400}
                height={400}
                className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-[1.15rem] border border-black/5 object-cover object-top shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] lg:h-14 lg:w-14 lg:rounded-2xl"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[1.15rem] border border-black/5 bg-white text-2xl font-semibold tracking-tight shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] lg:h-14 lg:w-14 lg:rounded-2xl lg:text-xl"
              >
                <Accent>{person.initials}</Accent>
              </span>
            )}
            <div className="min-w-0">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 lg:text-xl">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    onSelect(person, e.currentTarget);
                  }}
                  className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#4a5d23]"
                >
                  {person.name}
                </button>
              </h3>
              <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-[#4a5d23] lg:mt-1 lg:text-sm lg:leading-snug">
                {person.title}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-2 lg:mt-4 lg:space-y-1.5">
            {person.bio.map((point) => (
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
  );
}
