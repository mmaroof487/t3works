import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { isAcceptedDocFile, MAX_FILE_SIZE_BYTES } from '../../lib/validation/shared';

interface FileDropzoneProps {
  label: string;
  name: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  error?: string;
}

export default function FileDropzone({
  label,
  name,
  file,
  onChange,
  required,
  error,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    const candidate = fileList?.[0];
    if (!candidate) return;
    if (!isAcceptedDocFile(candidate)) return;
    onChange(candidate);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-[#4a5d23]"> *</span>}
      </label>

      {file ? (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#4a5d23]/30 bg-[#4a5d23]/5 px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4a5d23]/10 text-[#4a5d23]">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-gray-900 transition-colors"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <motion.button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors',
            isDragging
              ? 'border-[#4a5d23] bg-[#4a5d23]/5'
              : error
                ? 'border-red-300 bg-red-50/40'
                : 'border-gray-200 bg-gray-50/60 hover:border-[#4a5d23]/40'
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
            <UploadCloud size={20} className="text-[#4a5d23]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Drag & drop your file here or{' '}
              <span className="text-[#4a5d23] underline underline-offset-2">browse files</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF or DOCX, max {MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB
            </p>
          </div>
        </motion.button>
      )}

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
        }}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
