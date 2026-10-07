import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

const SUPPORTS_SVH = typeof CSS !== 'undefined' && CSS.supports('height', '100svh');

/** whether to show the pinned card pile: phones only, and only where it can animate */
export function usePinnedJourney() {
  const isMobile = useMediaQuery('(width < 48rem)');
  const reduceMotion = useReducedMotion() ?? false;
  return isMobile && !reduceMotion && SUPPORTS_SVH;
}
