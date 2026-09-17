import { z } from 'zod';
import { emailSchema, phoneSchema } from './shared';

export const ACADEMIC_STATUS_OPTIONS = [
  'Currently Studying',
  'Passed Out / Graduated',
  'Experienced Professional',
] as const;

export const candidateStep1Schema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name'),
  email: emailSchema,
  phone: phoneSchema,
});

export const candidateStep2Schema = z.object({
  academicStatus: z.enum(ACADEMIC_STATUS_OPTIONS, {
    message: 'Select your academic status',
  }),
  degree: z.string().trim().min(2, 'Enter your current or obtained degree'),
  university: z.string().trim().min(2, 'Enter your university or institution name'),
  passingYear: z.string().trim().optional(),
});

export const candidateStep3Schema = z
  .object({
    hasBuiltAiApps: z.enum(['Yes', 'No'], { message: 'Select yes or no' }),
    techStackUrl: z.string().trim().optional(),
    internshipsCompleted: z.string().trim().min(1, 'Select the number of internships completed'),
    internshipDetails: z.string().trim().optional(),
    hackathons: z.string().trim().optional(),
  })
  .refine((data) => data.hasBuiltAiApps !== 'Yes' || (data.techStackUrl?.length ?? 0) > 0, {
    message: 'Describe your tech stack and share a GitHub/demo URL',
    path: ['techStackUrl'],
  });

export const candidateStep4Schema = z.object({
  dreamRole1: z.string().trim().min(2, 'Enter your 1st dream job role'),
  dreamRole2: z.string().trim().min(2, 'Enter your 2nd dream job role'),
  targetCompanies: z.string().trim().optional(),
});

export interface CandidateFormData {
  fullName: string;
  email: string;
  phone: string;
  academicStatus: (typeof ACADEMIC_STATUS_OPTIONS)[number];
  degree: string;
  university: string;
  passingYear?: string;
  hasBuiltAiApps: 'Yes' | 'No';
  techStackUrl?: string;
  internshipsCompleted: string;
  internshipDetails?: string;
  hackathons?: string;
  dreamRole1: string;
  dreamRole2: string;
  targetCompanies?: string;
}

// Full-form validation (e.g. for a server-side check across all fields at once).
// Client-side step validation uses the individual step schemas above.
export function validateCandidateForm(data: unknown) {
  return candidateStep1Schema
    .and(candidateStep2Schema)
    .and(candidateStep3Schema)
    .and(candidateStep4Schema)
    .safeParse(data);
}

export const candidateFormDefaults: CandidateFormData = {
  fullName: '',
  email: '',
  phone: '',
  academicStatus: 'Currently Studying',
  degree: '',
  university: '',
  passingYear: '',
  hasBuiltAiApps: 'No',
  techStackUrl: '',
  internshipsCompleted: '0',
  internshipDetails: '',
  hackathons: '',
  dreamRole1: '',
  dreamRole2: '',
  targetCompanies: '',
};
