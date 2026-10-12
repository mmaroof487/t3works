import type Lenis from 'lenis';

/**
 * The page's Lenis smooth scroller, set by MainLayout while it is mounted. Anything that moves the
 * page itself should go through it: Lenis keeps gliding towards its own target after a wheel
 * scroll, so a plain window.scrollTo made in that moment is pulled straight back.
 */
export const smoothScroller: { current: Lenis | null } = { current: null };
