import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required,
  error,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-[#4a5d23]"> *</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={cn(
            'w-full appearance-none rounded-2xl border bg-white px-5 py-3.5 pr-12 text-[15px] text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4a5d23]/30',
            !value && 'text-gray-400',
            error ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#4a5d23]'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
