import { z } from 'zod';
import { emailSchema, phoneSchema } from './shared';

export const INDUSTRY_SECTOR_OPTIONS = ['FinTech', 'GovTech', 'HealthTech', 'SME'] as const;

export const ENGAGEMENT_MODEL_OPTIONS = [
  'Pre-Engagement PoC Project',
  '4-Month Internship',
  'Full-time Hire',
] as const;

export const WORK_MODEL_OPTIONS = ['Hybrid', 'On-Site', 'Remote'] as const;

export const SENIORITY_OPTIONS = ['Junior T3', 'Senior T3 Realignment'] as const;

export const enterpriseStep1Schema = z.object({
  companyName: z.string().trim().min(2, 'Enter your company name'),
  industrySector: z.enum(INDUSTRY_SECTOR_OPTIONS, { message: 'Select an industry sector' }),
  contactName: z.string().trim().min(2, 'Enter the contact person name and title'),
  corporateEmail: emailSchema,
  businessPhone: phoneSchema,
});

export const enterpriseStep2Schema = z.object({
  jobTitle: z.string().trim().min(2, 'Enter the job title'),
  engagementModel: z.enum(ENGAGEMENT_MODEL_OPTIONS, {
    message: 'Select a role engagement model',
  }),
  city: z.string().trim().min(1, 'Enter the job location city'),
  workModel: z.enum(WORK_MODEL_OPTIONS, { message: 'Select a work model' }),
  techStack: z.string().trim().min(2, 'Describe the required tech stack and expectations'),
});

export const enterpriseStep3Schema = z
  .object({
    jdText: z.string().trim().optional(),
    hasJdFile: z.boolean().default(false),
  })
  .refine((data) => data.hasJdFile || (data.jdText?.length ?? 0) > 0, {
    message: 'Upload a formal JD or paste the role expectations',
    path: ['jdText'],
  });

export const enterpriseStep4Schema = z.object({
  expectedStartDate: z.string().trim().min(1, 'Select an expected start date'),
  targetSeniority: z.enum(SENIORITY_OPTIONS, { message: 'Select the target candidate seniority' }),
  acceptedTerms: z
    .boolean()
    .refine((val) => val, { message: 'You must accept the privacy and terms notice' }),
});

export interface EnterpriseFormData {
  companyName: string;
  industrySector: (typeof INDUSTRY_SECTOR_OPTIONS)[number];
  contactName: string;
  corporateEmail: string;
  businessPhone: string;
  jobTitle: string;
  engagementModel: (typeof ENGAGEMENT_MODEL_OPTIONS)[number];
  city: string;
  workModel: (typeof WORK_MODEL_OPTIONS)[number];
  techStack: string;
  jdText?: string;
  hasJdFile: boolean;
  expectedStartDate: string;
  targetSeniority: (typeof SENIORITY_OPTIONS)[number];
  acceptedTerms: boolean;
}

// Full-form validation (e.g. for a server-side check across all fields at once).
// Client-side step validation uses the individual step schemas above.
export function validateEnterpriseForm(data: unknown) {
  return enterpriseStep1Schema
    .and(enterpriseStep2Schema)
    .and(enterpriseStep3Schema)
    .and(enterpriseStep4Schema)
    .safeParse(data);
}

export const enterpriseFormDefaults: EnterpriseFormData = {
  companyName: '',
  industrySector: 'FinTech',
  contactName: '',
  corporateEmail: '',
  businessPhone: '',
  jobTitle: '',
  engagementModel: 'Pre-Engagement PoC Project',
  city: '',
  workModel: 'Hybrid',
  techStack: '',
  jdText: '',
  hasJdFile: false,
  expectedStartDate: '',
  targetSeniority: 'Junior T3',
  acceptedTerms: false,
};
