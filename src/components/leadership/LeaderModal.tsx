import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, X } from 'lucide-react';
import type { Leader } from '../../data/leadership';
import { smoothScroller } from '../../lib/smoothScroller';
import { Accent } from './primitives';

interface LeaderModalProps {
  leader: Leader;
  onClose: () => void;
}

// lucide dropped its brand icons, so the LinkedIn mark is drawn here
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function LeaderModal({ leader, onClose }: LeaderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `leader-${leader.id}-name`;

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // The overlay only covers the team section and the page stays scrollable, so bring the profile
  // on screen: where the whole section fits, line it up as scrollToSection does (its top padding
  // clears the nav pill); otherwise bring the middle of the section, where the profile sits, to
  // the middle of the screen. It goes through Lenis, which replaces whatever wheel scroll it is
  // still easing; scrolling the window directly would be snapped back to that scroll's target.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const rect = overlay.getBoundingClientRect();
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const headerOffset = (window.innerWidth >= 1024 ? 4.5 : 1) * rem;
    const fits = rect.height + headerOffset <= window.innerHeight;
    const distance = fits
      ? rect.top - headerOffset
      : rect.top + rect.height / 2 - window.innerHeight / 2;
    const target = window.scrollY + distance;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = smoothScroller.current;
    if (lenis) {
      lenis.scrollTo(target, {
        immediate: reducedMotion,
        duration: 0.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, []);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 lg:pb-4 lg:pt-12"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 cursor-pointer backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative z-10 flex max-h-[min(90dvh,100%)] w-full max-w-3xl lg:max-w-4xl flex-col overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#fbfbf9] shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-gray-600 transition-colors hover:bg-[#4a5d23] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a5d23]"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-6 sm:p-8 lg:p-7">
          {/* photo on the left; beside it the name lines up with the photo's top edge and the
              contact details with its bottom edge, so the two read as one block */}
          <div className="flex flex-col gap-5 pr-10 sm:flex-row sm:items-start sm:gap-7">
            {leader.photo ? (
              <img
                src={leader.photo}
                alt={`Portrait of ${leader.name}`}
                width={400}
                height={400}
                className="h-32 w-32 shrink-0 rounded-[1.5rem] border border-black/5 object-cover shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] sm:h-44 sm:w-44"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[1.5rem] border border-black/5 bg-white text-5xl font-semibold tracking-tight shadow-[0_0.5rem_1.5rem_-0.375rem_rgba(40,50,20,0.22)] sm:h-44 sm:w-44"
              >
                <Accent>{leader.initials}</Accent>
              </span>
            )}

            <div className="flex min-w-0 flex-col justify-between gap-4 sm:min-h-44">
              <div>
                <h3
                  id={titleId}
                  className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-3xl"
                >
                  {leader.name}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-[#4a5d23] sm:text-base">
                  {leader.title}
                </p>
              </div>

              <ul className="space-y-2 text-[0.9375rem] leading-snug text-gray-700">
                <li className="flex items-center gap-2.5">
                  <Building2 size={16} aria-hidden="true" className="shrink-0 text-[#a3854a]" />
                  {leader.company}
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} aria-hidden="true" className="shrink-0 text-[#a3854a]" />
                  <a
                    href={`mailto:${leader.email}`}
                    className="truncate underline-offset-4 hover:text-[#4a5d23] hover:underline"
                  >
                    {leader.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <LinkedinIcon className="h-4 w-4 shrink-0 text-[#a3854a]" />
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate underline-offset-4 hover:text-[#4a5d23] hover:underline"
                  >
                    {leader.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-black/[0.035] p-5 sm:p-6 lg:mt-6 lg:p-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4a5d23]">
              About
            </h4>
            <div className="mt-3 space-y-4 text-[0.9375rem] leading-relaxed text-gray-700 sm:text-base lg:space-y-3 lg:text-[0.9375rem]">
              {leader.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
