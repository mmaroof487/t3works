import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export default function FormButton({
  variant = 'primary',
  loading,
  disabled,
  className,
  children,
  ...rest
}: FormButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <button
      {...rest}
      disabled={Boolean(disabled) || Boolean(loading)}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        isPrimary
          ? 'bg-[#0f0f0f] text-white hover:bg-[#1a1a1a] shadow-sm'
          : 'border border-gray-200 bg-white text-gray-700 hover:border-[#4a5d23]/40',
        className
      )}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      <span>{children}</span>
    </button>
  );
}
