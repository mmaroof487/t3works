import type { ReactNode } from 'react';
import { PinnedStack } from './PinnedStack';
import SystemCard, { type JourneySystem } from './SystemCard';

/**
 * Phones: the systems as a pinned pile. Scrolling (or swiping sideways) slides the next system in
 * from the right and lands it on the last one.
 */
export default function SystemsStack({
  systems,
  heading,
  onSelect,
  focusLabel,
}: {
  systems: JourneySystem[];
  heading: ReactNode;
  onSelect: (index: number) => void;
  focusLabel?: string;
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
          focusLabel={focusLabel}
          compact
          onSelect={() => {
            onSelect(index);
          }}
        />
      )}
    />
  );
}
