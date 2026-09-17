import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import { parseMultipartForm } from './_lib/parseForm';
import { validateEnterpriseForm } from '../src/lib/validation/enterprise';
import { isAcceptedDocMime, MAX_FILE_SIZE_BYTES } from '../src/lib/validation/shared';
import { getSupabaseAdmin, JD_BUCKET } from './_lib/supabaseAdmin';
import { getResendClient, getFromAddress } from './_lib/email/resendClient';
import { enterpriseConfirmationEmail } from './_lib/email/templates';
import { assignTalentArchitect, generateRequirementId } from './_lib/ids';

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
    const jdFile = files.jdFile;

    if (jdFile) {
      if (
        !isAcceptedDocMime(jdFile.mimetype) &&
        !jdFile.originalFilename?.match(/\.(pdf|docx)$/i)
      ) {
        res.status(400).json({ error: 'Job description file must be a PDF or DOCX file.' });
        return;
      }
      if (jdFile.size > MAX_FILE_SIZE_BYTES) {
        res.status(400).json({ error: 'Job description file must be under 10MB.' });
        return;
      }
    }

    const parsed = validateEnterpriseForm({
      ...fields,
      hasJdFile: !!jdFile,
      acceptedTerms: fields.acceptedTerms === 'true',
    });

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
    const requirementId = generateRequirementId();
    const supabase = getSupabaseAdmin();

    let jdStoragePath: string | null = null;
    if (jdFile) {
      const fileBuffer = await fs.readFile(jdFile.filepath);
      jdStoragePath = `${requirementId}/${jdFile.originalFilename ?? 'jd'}`;
      const { error: uploadError } = await supabase.storage
        .from(JD_BUCKET)
        .upload(jdStoragePath, fileBuffer, {
          contentType: jdFile.mimetype ?? 'application/octet-stream',
          upsert: false,
        });
      if (uploadError) {
        throw new Error(`JD upload failed: ${uploadError.message}`);
      }
    }

    const talentArchitect = assignTalentArchitect();

    // Empty-string optional fields are normalized to null, so `||` (not `??`) is intentional here.
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    const { error: insertError } = await supabase.from('hiring_requirements').insert({
      requirement_id: requirementId,
      company_name: data.companyName,
      industry_sector: data.industrySector,
      contact_name: data.contactName,
      corporate_email: data.corporateEmail,
      business_phone: data.businessPhone,
      job_title: data.jobTitle,
      engagement_model: data.engagementModel,
      city: data.city,
      work_model: data.workModel,
      tech_stack: data.techStack,
      jd_text: data.jdText || null,
      jd_path: jdStoragePath,
      expected_start_date: data.expectedStartDate,
      target_seniority: data.targetSeniority,
      talent_architect: talentArchitect,
    });
    /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */

    if (insertError) {
      throw new Error(`Database insert failed: ${insertError.message}`);
    }

    try {
      const resend = getResendClient();
      const { subject, html } = enterpriseConfirmationEmail({
        contactName: data.contactName,
        companyName: data.companyName,
        requirementId,
        talentArchitect,
      });
      await resend.emails.send({
        from: getFromAddress(),
        to: data.corporateEmail,
        subject,
        html,
      });
    } catch (emailError) {
      console.error('Failed to send enterprise confirmation email:', emailError);
    }

    res.status(200).json({ requirementId, talentArchitect });
  } catch (error) {
    console.error('Enterprise submission error:', error);
    res.status(500).json({ error: 'Something went wrong while submitting your requirement.' });
  }
}
