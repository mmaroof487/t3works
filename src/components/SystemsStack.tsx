import type { ReactNode } from 'react';
import { PinnedStack } from './PinnedJourney';
import SystemCard, { type JourneySystem } from './SystemCard';

/**
 * Phones: the systems as a pinned pile. Scrolling (or swiping sideways) slides the next system in
 * from the right and lands it on the last one.
 */
export default function SystemsStack({
  systems,
  heading,
  onSelect,
}: {
  systems: JourneySystem[];
  heading: ReactNode;
  onSelect: (index: number) => void;
}) {
  return (
    <PinnedStack
      count={systems.length}
      heading={heading}
      stepScroll="60svh"
      swipe
      renderCard={(index) => (
        <SystemCard
          system={systems[index]}
          compact
          onSelect={() => {
            onSelect(index);
          }}
        />
      )}
    />
  );
}
