import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ZodError } from 'zod';
import StepIndicator from '../components/form/StepIndicator';
import TextField from '../components/form/TextField';
import TextAreaField from '../components/form/TextAreaField';
import SelectField from '../components/form/SelectField';
import RadioGroup from '../components/form/RadioGroup';
import FileDropzone from '../components/form/FileDropzone';
import FormButton from '../components/form/FormButton';
import {
  ENGAGEMENT_MODEL_OPTIONS,
  enterpriseFormDefaults,
  enterpriseStep1Schema,
  enterpriseStep2Schema,
  enterpriseStep3Schema,
  enterpriseStep4Schema,
  INDUSTRY_SECTOR_OPTIONS,
  SENIORITY_OPTIONS,
  WORK_MODEL_OPTIONS,
  type EnterpriseFormData,
} from '../lib/validation/enterprise';
import { submitEnterprise } from '../lib/api/submitEnterprise';

const STEPS = ['Company Profile', 'Job Role', 'Job Description', 'Scoping & Match'];

const STEP_SCHEMAS = [
  enterpriseStep1Schema,
  enterpriseStep2Schema,
  enterpriseStep3Schema,
  enterpriseStep4Schema,
];

export default function EnterprisePortal() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<EnterpriseFormData>(enterpriseFormDefaults);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ requirementId: string; talentArchitect: string } | null>(
    null
  );

  const updateField = <K extends keyof EnterpriseFormData>(
    key: K,
    value: EnterpriseFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key as string]: _removed, ...next } = prev;
      return next;
    });
  };

  const dataForValidation = (): EnterpriseFormData => ({
    ...formData,
    hasJdFile: !!jdFile,
  });

  const validateStep = (stepIndex: number): boolean => {
    const schema = STEP_SCHEMAS[stepIndex];
    const result = schema.safeParse(dataForValidation());
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Record<string, string> = {};
    const zodError = result.error as ZodError;
    zodError.issues.forEach((issue) => {
      const path = issue.path[0];
      if (typeof path === 'string' && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const submission = await submitEnterprise(dataForValidation(), jdFile);
      setResult(submission);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit hiring requirement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return <SuccessScreen talentArchitect={result.talentArchitect} />;
  }

  return (
    <section className="w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center p-4 md:p-8 pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="w-full max-w-[1280px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
        {/* Left Side: Graphic / Branding */}
        <div className="hidden lg:flex lg:w-5/12 p-12 flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20" />

          <div className="relative z-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8ba05f] text-white font-bold text-xl">
              T3
            </div>
            <span className="text-xl font-bold tracking-tight">AI Works</span>
          </div>

          <div className="relative z-10 mt-auto mb-auto pt-12">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md mb-6">
              Enterprise Hiring Portal
            </span>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              Deploy Day-One ready AI engineers
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              Submit your hiring requirement and we'll scope the match within 48 hours — zero
              upfront fee until PoC or internship validation.
            </p>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-4 text-sm font-medium text-white/50">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            <span>Merit-gated. Rigor-driven.</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8ba05f] text-white font-bold text-xl">
                T3
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0f0f0f]">AI Works</span>
            </div>

            <span className="inline-flex rounded-full border border-[#8ba05f]/20 bg-[#8ba05f]/5 px-4 py-1.5 text-xs font-semibold text-[#667744] mb-4">
              Enterprise Hiring Portal
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] mb-3">
              Deploy Day-One ready AI engineers
            </h1>
            <p className="text-gray-600 text-sm">Submit your requirement. Zero upfront fee.</p>
          </div>

          <div className="mb-10 lg:mb-12">
            <StepIndicator steps={STEPS} currentStep={step} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col gap-6"
            >
              {step === 0 && (
                <>
                  <TextField
                    label="Company Name"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={(v) => {
                      updateField('companyName', v);
                    }}
                    placeholder="e.g., Enterprise Tech Corp"
                    error={errors.companyName}
                  />
                  <SelectField
                    label="Industry Sector"
                    name="industrySector"
                    required
                    value={formData.industrySector}
                    onChange={(v) => {
                      updateField('industrySector', v as EnterpriseFormData['industrySector']);
                    }}
                    options={INDUSTRY_SECTOR_OPTIONS}
                    error={errors.industrySector}
                  />
                  <TextField
                    label="Contact Person Name & Title"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={(v) => {
                      updateField('contactName', v);
                    }}
                    placeholder="Sarah Chen, VP of Engineering"
                    error={errors.contactName}
                  />
                  <TextField
                    label="Corporate Email"
                    name="corporateEmail"
                    type="email"
                    required
                    value={formData.corporateEmail}
                    onChange={(v) => {
                      updateField('corporateEmail', v);
                    }}
                    placeholder="s.chen@enterprisetech.com"
                    error={errors.corporateEmail}
                  />
                  <TextField
                    label="Business Phone"
                    name="businessPhone"
                    type="tel"
                    required
                    value={formData.businessPhone}
                    onChange={(v) => {
                      updateField('businessPhone', v);
                    }}
                    placeholder="+65 9123 4567"
                    helpText="Include country code (E.164 format)"
                    error={errors.businessPhone}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <TextField
                    label="Job Title"
                    name="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={(v) => {
                      updateField('jobTitle', v);
                    }}
                    placeholder="Enterprise AI Product Engineer"
                    error={errors.jobTitle}
                  />
                  <RadioGroup
                    label="Role Engagement Model"
                    name="engagementModel"
                    required
                    value={formData.engagementModel}
                    onChange={(v) => {
                      updateField('engagementModel', v as EnterpriseFormData['engagementModel']);
                    }}
                    options={ENGAGEMENT_MODEL_OPTIONS}
                    layout="column"
                    error={errors.engagementModel}
                  />
                  <TextField
                    label="Job Location (City)"
                    name="city"
                    required
                    value={formData.city}
                    onChange={(v) => {
                      updateField('city', v);
                    }}
                    placeholder="Singapore"
                    error={errors.city}
                  />
                  <RadioGroup
                    label="Work Model"
                    name="workModel"
                    required
                    value={formData.workModel}
                    onChange={(v) => {
                      updateField('workModel', v as EnterpriseFormData['workModel']);
                    }}
                    options={WORK_MODEL_OPTIONS}
                    error={errors.workModel}
                  />
                  <TextAreaField
                    label="Required Tech Stack & Expectations"
                    name="techStack"
                    required
                    value={formData.techStack}
                    onChange={(v) => {
                      updateField('techStack', v);
                    }}
                    placeholder="LangChain, LangGraph, Python, Vector DBs"
                    error={errors.techStack}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <FileDropzone
                    label="Upload Formal Job Description (JD)"
                    name="jdFile"
                    file={jdFile}
                    onChange={setJdFile}
                  />
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Or
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <TextAreaField
                    label="Paste Detailed JD / Role Expectations"
                    name="jdText"
                    value={formData.jdText ?? ''}
                    onChange={(v) => {
                      updateField('jdText', v);
                    }}
                    placeholder="Paste JD text..."
                    rows={6}
                    error={errors.jdText}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <TextField
                    label="Expected Start Date"
                    name="expectedStartDate"
                    type="date"
                    required
                    value={formData.expectedStartDate}
                    onChange={(v) => {
                      updateField('expectedStartDate', v);
                    }}
                    error={errors.expectedStartDate}
                  />
                  <RadioGroup
                    label="Target Candidate Seniority"
                    name="targetSeniority"
                    required
                    value={formData.targetSeniority}
                    onChange={(v) => {
                      updateField('targetSeniority', v as EnterpriseFormData['targetSeniority']);
                    }}
                    options={SENIORITY_OPTIONS}
                    error={errors.targetSeniority}
                  />

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptedTerms}
                        onChange={(e) => {
                          updateField('acceptedTerms', e.target.checked);
                        }}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#4a5d23] focus:ring-[#4a5d23]/30"
                      />
                      <span className="text-sm text-gray-600">
                        I understand placements involve zero upfront fee until candidate PoC or
                        internship validation, and agree to T3 AI Works' Privacy Policy and Terms.
                      </span>
                    </label>
                    {errors.acceptedTerms && (
                      <p className="mt-2 text-xs font-medium text-red-500">
                        {errors.acceptedTerms}
                      </p>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
              {submitError}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            <FormButton
              type="button"
              variant="secondary"
              onClick={handleBack}
              disabled={step === 0}
              className={step === 0 ? 'invisible' : ''}
            >
              <ArrowLeft size={16} />
              Back
            </FormButton>

            {step < STEPS.length - 1 ? (
              <FormButton type="button" onClick={handleNext}>
                Next
                <ArrowRight size={16} />
              </FormButton>
            ) : (
              <FormButton
                type="button"
                onClick={() => {
                  void handleSubmit();
                }}
                loading={isSubmitting}
              >
                Submit Hiring Requirement
              </FormButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessScreen({ talentArchitect }: { talentArchitect: string }) {
  return (
    <section className="w-full bg-[#f8f9fa] py-24 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[2.5rem] bg-white shadow-xl border border-gray-100 p-10 sm:p-14 text-center overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8ba05f] to-[#4a5d23]" />

          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#8ba05f]/10 text-[#8ba05f] ring-8 ring-[#8ba05f]/5">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-4xl mb-4">
            Requirement received.
          </h1>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Your T3 Talent Architect
            </p>
            <p className="text-2xl font-semibold text-[#0f0f0f]">{talentArchitect}</p>
          </div>

          <p className="text-gray-600 mb-10 leading-relaxed text-sm sm:text-base">
            We've emailed a confirmation to your corporate inbox. Expect a requirement scoping call
            within 48 hours.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#0f0f0f] px-10 py-4 text-[15px] font-medium text-white hover:bg-[#1a1a1a] transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
