import type { CSSProperties } from 'react';

/** soft fade on all four edges of the illustration that rises behind a section's last card */
export const ART_EDGE_FADE: CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  WebkitMaskComposite: 'source-in',
};
