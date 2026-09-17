import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
  error?: string;
  layout?: 'row' | 'column';
}

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
  layout = 'row',
}: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-[#4a5d23]"> *</span>}
      </span>
      <div
        className={cn(
          'flex gap-3',
          layout === 'row' ? 'flex-row flex-wrap' : 'flex-col items-start'
        )}
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const isActive = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => {
                onChange(option);
              }}
              className={cn(
                'relative rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors',
                isActive
                  ? 'border-[#4a5d23] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#4a5d23]/40'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`radio-bg-${name}`}
                  className="absolute inset-0 rounded-full bg-[#4a5d23]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{option}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
