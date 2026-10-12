import { useCallback, useRef, useState } from 'react';
import type { Leader } from '../../data/leadership';

/** Which person's profile is open, and returning focus to the card that opened it on close. */
export function useProfileModal() {
  const [selected, setSelected] = useState<Leader | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((person: Leader, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setSelected(person);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    openerRef.current?.focus({ preventScroll: true });
  }, []);

  return { selected, open, close };
}
