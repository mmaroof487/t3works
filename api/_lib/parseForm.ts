import formidable, { type File } from 'formidable';
import type { VercelRequest } from '@vercel/node';
import { MAX_FILE_SIZE_BYTES } from '../../src/lib/validation/shared';

export interface ParsedForm {
  fields: Record<string, string>;
  files: Record<string, File | undefined>;
}

export async function parseMultipartForm(req: VercelRequest): Promise<ParsedForm> {
  const form = formidable({
    maxFileSize: MAX_FILE_SIZE_BYTES,
    multiples: false,
  });

  const [rawFields, rawFiles] = await form.parse(req);

  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawFields)) {
    // formidable types field arrays as always non-empty, but an empty array is possible at runtime.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    fields[key] = Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
  }

  const files: Record<string, File | undefined> = {};
  for (const [key, value] of Object.entries(rawFiles)) {
    files[key] = Array.isArray(value) ? value[0] : value;
  }

  return { fields, files };
}
