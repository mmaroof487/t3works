import type Lenis from 'lenis';

interface SmoothScrollerRef {
  current: Lenis | null;
}

const holder = globalThis as typeof globalThis & { __smoothScroller?: SmoothScrollerRef };

/**
 * The page's Lenis smooth scroller, set by MainLayout while it is mounted. Anything that moves the
 * page itself should go through it: Lenis keeps gliding towards its own target after a wheel
 * scroll, so a plain window.scrollTo made in that moment is pulled straight back.
 *
 * It is kept on globalThis so that a hot reload, which runs this module again, hands back the ref
 * MainLayout already filled in rather than a new, empty one.
 */
export const smoothScroller: SmoothScrollerRef = (holder.__smoothScroller ??= { current: null });
