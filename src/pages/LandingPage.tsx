import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import IntroEcosystem from '../components/IntroEcosystem';
import JobSeekerFunnel from '../components/JobSeekerFunnel';
import HiringSideEntry from '../components/HiringSideEntry';
import TalentFunnel from '../components/TalentFunnel';
import HowItWorks from '../components/HowItWorks';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const path = state.scrollTo;

      // Delay slightly to ensure page has rendered
      setTimeout(() => {
        const element = document.querySelector(path);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const targetPosition = elementPosition + window.pageYOffset - headerOffset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 800;
          let start: number | null = null;

          const step = (timestamp: number) => {
            start ??= timestamp;
            const progress = timestamp - start;
            const easeInOutCubic = (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const percentage = Math.min(progress / duration, 1);

            window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

            if (progress < duration) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        }
      }, 100);

      // Clear the state so it doesn't scroll again on un-related re-renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="bg-transparent">
      <Hero />
      <div id="about-us">
        <IntroEcosystem />
      </div>
      <JobSeekerFunnel />
      <div id="clients">
        <HiringSideEntry />
      </div>
      <TalentFunnel />
      <HowItWorks />
    </div>
  );
}
