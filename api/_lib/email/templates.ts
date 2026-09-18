const BRAND_GREEN = '#4a5d23';
const BRAND_DARK = '#0f0f0f';

function emailShell(bodyHtml: string): string {
  return `
  <div style="background-color:#f8f9f5;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f0f0f0;">
      <div style="background-color:${BRAND_DARK};padding:28px 32px;">
        <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.02em;">T3 AI Works</span>
      </div>
      <div style="padding:36px 32px;">
        ${bodyHtml}
      </div>
      <div style="padding:20px 32px;border-top:1px solid #f0f0f0;">
        <p style="margin:0;color:#9ca3af;font-size:12px;">T3 AI Works &middot; Not More Engineers. More Engineering.</p>
      </div>
    </div>
  </div>`;
}

export function candidateThankYouEmail(params: {
  fullName: string;
  candidateId: string;
  phase0Date: string;
}): { subject: string; html: string } {
  const { fullName, candidateId, phase0Date } = params;
  const html = emailShell(`
    <h1 style="margin:0 0 16px;color:${BRAND_DARK};font-size:24px;">Thanks for applying, ${fullName}.</h1>
    <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.6;">
      Your application has entered the T3 AI Works talent funnel. Here is your Candidate ID for reference:
    </p>
    <div style="display:inline-block;background-color:${BRAND_DARK};color:#ffffff;padding:12px 20px;border-radius:999px;font-size:16px;font-weight:600;letter-spacing:0.02em;margin-bottom:24px;">
      ${candidateId}
    </div>
    <h2 style="margin:24px 0 8px;color:${BRAND_DARK};font-size:16px;">Next step: Phase 0 Assessment</h2>
    <p style="margin:0 0 8px;color:#4b5563;font-size:15px;line-height:1.6;">
      Phase 0 is a fully proctored pre-assessment evaluating logic, algorithmic aptitude, and core
      engineering. It determines advancement into the top 25% of candidates.
    </p>
    <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.6;">
      <strong style="color:${BRAND_GREEN};">Scheduled window:</strong> ${phase0Date}
    </p>
    <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
      We'll follow up with your proctoring link and login instructions closer to the date. Keep an
      eye on your inbox.
    </p>
  `);
  return { subject: `Your T3 AI Works Application — ${candidateId}`, html };
}

export function enterpriseConfirmationEmail(params: {
  contactName: string;
  companyName: string;
  requirementId: string;
  talentArchitect: string;
}): { subject: string; html: string } {
  const { contactName, companyName, requirementId, talentArchitect } = params;
  const html = emailShell(`
    <h1 style="margin:0 0 16px;color:${BRAND_DARK};font-size:24px;">Requirement received, ${contactName}.</h1>
    <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.6;">
      Thank you for submitting a hiring requirement for <strong>${companyName}</strong>. Reference ID:
    </p>
    <div style="display:inline-block;background-color:${BRAND_DARK};color:#ffffff;padding:12px 20px;border-radius:999px;font-size:16px;font-weight:600;letter-spacing:0.02em;margin-bottom:24px;">
      ${requirementId}
    </div>
    <h2 style="margin:24px 0 8px;color:${BRAND_DARK};font-size:16px;">Your T3 Talent Architect</h2>
    <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.6;">
      <strong style="color:${BRAND_GREEN};">${talentArchitect}</strong> has been assigned to scope
      this requirement and will reach out within <strong>48 hours</strong> to schedule your
      requirement scoping call.
    </p>
    <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
      Placements involve zero upfront fee until candidate PoC or internship validation.
    </p>
  `);
  return { subject: `Hiring Requirement Confirmed — ${requirementId}`, html };
}
