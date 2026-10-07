import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// the olive-to-gold run used for the emphasised words in headings across the site
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#4a5d23] to-[#a3854a] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// eyebrow colours: olive for the students' side of the story, gold for the companies' side,
// and a lighter gold on the dark band
const TONES = {
  olive: { rule: 'bg-[#4a5d23]/60', label: 'text-[#4a5d23]' },
  gold: { rule: 'bg-[#a3854a]/60', label: 'text-[#a3854a]' },
  dark: { rule: 'bg-[#c9b27a]/50', label: 'text-[#c9b27a]' },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'olive',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  const { rule, label } = TONES[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('mb-10 max-w-5xl md:mb-12', className)}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className={cn('h-px w-10', rule)} aria-hidden="true" />
        <span className={cn('text-xs font-semibold uppercase tracking-[0.25em]', label)}>
          {eyebrow}
        </span>
        <span className={cn('h-px w-10', rule)} aria-hidden="true" />
      </div>
      <h2
        className={cn(
          'text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl',
          dark ? 'text-white' : 'text-gray-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-4xl text-base leading-relaxed sm:text-lg',
            dark ? 'text-white/70' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
