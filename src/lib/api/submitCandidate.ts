import type { CandidateFormData } from '../validation/candidate';

interface SubmitCandidateResult {
  candidateId: string;
}

interface ApiErrorPayload {
  error?: string;
}

export async function submitCandidate(
  data: CandidateFormData,
  resume: File
): Promise<SubmitCandidateResult> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value ?? ''));
  });
  formData.append('resume', resume);

  const response = await fetch('/api/candidates', {
    method: 'POST',
    body: formData,
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (payload as ApiErrorPayload | null)?.error;
    throw new Error(message ?? 'Something went wrong while submitting your application.');
  }

  return payload as SubmitCandidateResult;
}
