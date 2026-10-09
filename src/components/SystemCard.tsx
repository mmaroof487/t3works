import { motion, type MotionStyle } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';

export interface JourneySystem {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  highlights: string[];
  focus: string[];
}

interface Props {
  system: JourneySystem;
  onSelect: () => void;
  /** tighter spacing for the phone card stack, where a whole card has to fit under the nav */
  compact?: boolean;
  style?: MotionStyle;
}

/** One engineering system as a card that opens its detail modal. */
export default function SystemCard({ system, onSelect, compact = false, style }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      style={style}
      aria-label={`System ${system.num}: ${system.title}. Open details`}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] text-left shadow-sm transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(40,50,20,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a5d23]"
    >
      <div
        className={cn(
          'relative w-full shrink-0 overflow-hidden bg-gray-100',
          compact ? 'h-24' : 'h-36'
        )}
      >
        <img
          src={system.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#4a5d23] text-[0.8125rem] font-semibold text-white shadow-md ring-4 ring-[#fbfbf9]/70">
          {system.num}
        </span>
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#232621] shadow-sm backdrop-blur transition-colors group-hover:bg-[#4a5d23] group-hover:text-white">
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>

      <div className={cn('flex flex-1 flex-col', compact ? 'p-5' : 'p-6 md:p-7')}>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a5d23]">
          {system.subtitle}
        </p>
        <h3
          className={cn(
            'font-semibold leading-snug tracking-tight text-gray-900',
            compact ? 'mb-2 text-xl' : 'mb-3 text-2xl'
          )}
        >
          {system.title}
        </h3>
        <p
          className={cn(
            'leading-relaxed text-gray-600',
            compact ? 'mb-4 text-[0.8125rem] leading-snug' : 'mb-5 text-[0.9375rem]'
          )}
        >
          {system.desc}
        </p>

        {!compact && (
          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-gray-400">
            What you&apos;ll learn
          </p>
        )}
        <div className={cn('flex flex-wrap gap-2', compact ? 'mb-4 gap-1.5' : 'mb-6')}>
          {system.focus.map((item) => (
            <span
              key={item}
              className={cn(
                'rounded-full border border-[#4a5d23]/15 bg-[#4a5d23]/[0.06] font-medium text-[#3f4f1f]',
                compact ? 'px-2.5 py-0.5 text-[0.6875rem]' : 'px-3 py-1 text-xs'
              )}
            >
              {item}
            </span>
          ))}
        </div>

        <ul
          className={cn('mt-auto grid gap-2', compact ? 'grid-cols-2 gap-1.5' : 'sm:grid-cols-2')}
        >
          {system.highlights.map((item) => (
            <li
              key={item}
              className={cn(
                'flex items-center gap-2 rounded-lg bg-black/[0.035] text-gray-700',
                compact
                  ? 'px-2.5 py-1.5 text-[0.6875rem] leading-tight'
                  : 'px-3 py-2 text-[0.8125rem]'
              )}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a5d23]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}
