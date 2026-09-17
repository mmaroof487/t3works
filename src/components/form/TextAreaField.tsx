import { cn } from '../../lib/cn';

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  helpText?: string;
}

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
  helpText,
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-[#4a5d23]"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={cn(
          'w-full resize-none rounded-2xl border bg-white px-5 py-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4a5d23]/30',
          error ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#4a5d23]'
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {helpText && !error && <p className="text-xs text-gray-500">{helpText}</p>}
      {error && (
        <p id={`${name}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
