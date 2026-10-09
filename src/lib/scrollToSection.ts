const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Animated scroll to an element, frame by frame, so it cooperates with the Lenis smooth scroller.
 * From the lg breakpoint the nav pill sits at the top of the screen, so the target stops 4.5rem
 * short of it (the same offset the nav uses); below that the pill is at the bottom.
 */
/** Animated scroll by a distance (px) from wherever the page is now, frame by frame like the above. */
export function scrollByAnimated(distance: number, duration = 450) {
  const start = window.scrollY;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    startTime ??= timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}

export function scrollToSection(selector: string, duration = 800) {
  const element = document.querySelector(selector);
  if (!element) return;

  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const headerOffset = (window.innerWidth >= 1024 ? 4.5 : 1) * rem;
  const start = window.scrollY;
  const distance = element.getBoundingClientRect().top - headerOffset;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    startTime ??= timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}
