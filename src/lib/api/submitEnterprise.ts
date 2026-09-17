import type { EnterpriseFormData } from '../validation/enterprise';

interface SubmitEnterpriseResult {
  requirementId: string;
  talentArchitect: string;
}

interface ApiErrorPayload {
  error?: string;
}

export async function submitEnterprise(
  data: EnterpriseFormData,
  jdFile: File | null
): Promise<SubmitEnterpriseResult> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value ?? ''));
  });
  if (jdFile) {
    formData.append('jdFile', jdFile);
  }

  const response = await fetch('/api/enterprise', {
    method: 'POST',
    body: formData,
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (payload as ApiErrorPayload | null)?.error;
    throw new Error(message ?? 'Something went wrong while submitting your requirement.');
  }

  return payload as SubmitEnterpriseResult;
}
