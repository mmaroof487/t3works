import { z } from 'zod';

// RFC-shaped email check (pragmatic, not the full RFC 5322 grammar)
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email address is required')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address');

// E.164 international phone format: + followed by 8-15 digits
export const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .regex(
    /^\+[1-9]\d{7,14}$/,
    'Enter a valid phone number in international format (e.g. +65 9123 4567)'
  );

export const ACCEPTED_DOC_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

export const ACCEPTED_DOC_EXTENSIONS = ['.pdf', '.docx'];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function isAcceptedDocFile(file: File): boolean {
  const hasValidExtension = ACCEPTED_DOC_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  );
  return hasValidExtension && file.size > 0 && file.size <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedDocMime(mimetype: string | null | undefined): boolean {
  if (!mimetype) return false;
  return ACCEPTED_DOC_TYPES.includes(mimetype);
}
