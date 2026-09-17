import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import { parseMultipartForm } from './_lib/parseForm';
import { validateCandidateForm } from '../src/lib/validation/candidate';
import { isAcceptedDocMime, MAX_FILE_SIZE_BYTES } from '../src/lib/validation/shared';
import { getSupabaseAdmin, RESUME_BUCKET } from './_lib/supabaseAdmin';
import { getResendClient, getFromAddress } from './_lib/email/resendClient';
import { candidateThankYouEmail } from './_lib/email/templates';
import { generateCandidateId, nextPhase0Window } from './_lib/ids';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { fields, files } = await parseMultipartForm(req);
    const resumeFile = files.resume;

    if (!resumeFile) {
      res.status(400).json({ error: 'Resume file is required.' });
      return;
    }

    if (
      !isAcceptedDocMime(resumeFile.mimetype) &&
      !resumeFile.originalFilename?.match(/\.(pdf|docx)$/i)
    ) {
      res.status(400).json({ error: 'Resume must be a PDF or DOCX file.' });
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
      res.status(400).json({ error: 'Resume must be under 10MB.' });
      return;
    }

    const parsed = validateCandidateForm(fields);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation failed.',
        details: parsed.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }

    const data = parsed.data;
    const candidateId = generateCandidateId();

    const supabase = getSupabaseAdmin();
    const fileBuffer = await fs.readFile(resumeFile.filepath);
    const storagePath = `${candidateId}/${resumeFile.originalFilename ?? 'resume'}`;

    const { error: uploadError } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: resumeFile.mimetype ?? 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Resume upload failed: ${uploadError.message}`);
    }

    // Empty-string optional fields are normalized to null, so `||` (not `??`) is intentional here.
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    const { error: insertError } = await supabase.from('candidates').insert({
      candidate_id: candidateId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      academic_status: data.academicStatus,
      degree: data.degree,
      university: data.university,
      passing_year: data.passingYear || null,
      has_built_ai_apps: data.hasBuiltAiApps === 'Yes',
      tech_stack_url: data.techStackUrl || null,
      internships_completed: data.internshipsCompleted,
      internship_details: data.internshipDetails || null,
      hackathons: data.hackathons || null,
      dream_role_1: data.dreamRole1,
      dream_role_2: data.dreamRole2,
      target_companies: data.targetCompanies || null,
      resume_path: storagePath,
    });
    /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */

    if (insertError) {
      throw new Error(`Database insert failed: ${insertError.message}`);
    }

    const phase0Date = nextPhase0Window();

    try {
      const resend = getResendClient();
      const { subject, html } = candidateThankYouEmail({
        fullName: data.fullName,
        candidateId,
        phase0Date,
      });
      await resend.emails.send({
        from: getFromAddress(),
        to: data.email,
        subject,
        html,
      });
    } catch (emailError) {
      // Application is already saved — do not fail the request over email delivery issues.
      console.error('Failed to send candidate confirmation email:', emailError);
    }

    res.status(200).json({ candidateId });
  } catch (error) {
    console.error('Candidate submission error:', error);
    res.status(500).json({ error: 'Something went wrong while submitting your application.' });
  }
}
