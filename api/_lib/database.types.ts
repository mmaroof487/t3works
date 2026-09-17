// These must stay `type` aliases, not `interface` — plain interfaces don't
// structurally satisfy postgrest-js's `Record<string, unknown>`-based
// `GenericSchema` constraint, which silently collapses `.from().insert()` to
// a `never[]` parameter type with no error at the generic's definition site.
/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: CandidateRow;
        Insert: CandidateInsert;
        Update: Partial<CandidateInsert>;
        Relationships: [];
      };
      hiring_requirements: {
        Row: HiringRequirementRow;
        Insert: HiringRequirementInsert;
        Update: Partial<HiringRequirementInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type CandidateInsert = {
  candidate_id: string;
  full_name: string;
  email: string;
  phone: string;
  academic_status: string;
  degree: string;
  university: string;
  passing_year: string | null;
  has_built_ai_apps: boolean;
  tech_stack_url: string | null;
  internships_completed: string;
  internship_details: string | null;
  hackathons: string | null;
  dream_role_1: string;
  dream_role_2: string;
  target_companies: string | null;
  resume_path: string;
};

export type CandidateRow = CandidateInsert & {
  id: string;
  created_at: string;
};

export type HiringRequirementInsert = {
  requirement_id: string;
  company_name: string;
  industry_sector: string;
  contact_name: string;
  corporate_email: string;
  business_phone: string;
  job_title: string;
  engagement_model: string;
  city: string;
  work_model: string;
  tech_stack: string;
  jd_text: string | null;
  jd_path: string | null;
  expected_start_date: string;
  target_seniority: string;
  talent_architect: string;
};

export type HiringRequirementRow = HiringRequirementInsert & {
  id: string;
  created_at: string;
};
