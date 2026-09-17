import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: compact progress label */}
      <div className="flex items-center justify-between mb-3 sm:hidden">
        <span className="text-sm font-semibold text-gray-900">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm font-medium text-[#4a5d23]">{steps[currentStep]}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden sm:hidden">
        <motion.div
          className="h-full rounded-full bg-[#4a5d23]"
          animate={{ width: `${String(((currentStep + 1) / steps.length) * 100)}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Desktop: full step list */}
      <div className="hidden sm:flex items-center w-full">
        {steps.map((step, idx) => {
          const isComplete = idx < currentStep;
          const isActive = idx === currentStep;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors border',
                    isComplete
                      ? 'bg-[#4a5d23] border-[#4a5d23] text-white'
                      : isActive
                        ? 'border-[#4a5d23] text-[#4a5d23] bg-white'
                        : 'border-gray-200 text-gray-400 bg-white'
                  )}
                >
                  {isComplete ? <Check size={16} /> : idx + 1}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium whitespace-nowrap',
                    isActive || isComplete ? 'text-gray-900' : 'text-gray-400'
                  )}
                >
                  {step}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px mx-3 bg-gray-200 relative top-[-12px] min-w-6">
                  <motion.div
                    className="h-full bg-[#4a5d23]"
                    initial={false}
                    animate={{ width: isComplete ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
