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
  ACADEMIC_STATUS_OPTIONS,
  candidateFormDefaults,
  candidateStep1Schema,
  candidateStep2Schema,
  candidateStep3Schema,
  candidateStep4Schema,
  type CandidateFormData,
} from '../lib/validation/candidate';
import { submitCandidate } from '../lib/api/submitCandidate';

const STEPS = ['Personal Info', 'Academic Details', 'AI Projects', 'Career & Resume'];

const STEP_SCHEMAS = [
  candidateStep1Schema,
  candidateStep2Schema,
  candidateStep3Schema,
  candidateStep4Schema,
];

const DEGREE_OPTIONS = [
  'B.Tech / B.E. Computer Science',
  'B.Tech / B.E. AI & ML',
  'B.Sc Computer Science',
  'M.Tech / M.E.',
  'MCA',
  'Other Engineering / CS Degree',
];

const INTERNSHIP_COUNT_OPTIONS = ['0', '1', '2', '3', '4+'];

export default function CandidatePortal() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CandidateFormData>(candidateFormDefaults);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [candidateId, setCandidateId] = useState<string | null>(null);

  const updateField = <K extends keyof CandidateFormData>(key: K, value: CandidateFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _removed, ...next } = prev;
      return next;
    });
  };

  const validateStep = (stepIndex: number): boolean => {
    const schema = STEP_SCHEMAS[stepIndex];
    const result = schema.safeParse(formData);
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
    if (!resume) {
      setErrors((prev) => ({ ...prev, resume: 'Upload your CV / resume' }));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitCandidate(formData, resume);
      setCandidateId(result.candidateId);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (candidateId) {
    return <SuccessScreen candidateId={candidateId} />;
  }

  return (
    <section className="w-full bg-transparent py-16 md:py-24 min-h-[80vh]">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full border border-[#4a5d23]/20 bg-white px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm mb-6">
            Candidate Application Portal
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-[#0f0f0f] md:text-5xl mb-4">
            Enter the T3 Talent Funnel
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Apply in a few minutes. Your application enters the Phase 0 assessment pipeline
            immediately after submission.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white shadow-sm border border-gray-100/50 p-6 sm:p-10 lg:p-14">
          <div className="mb-10">
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
                    label="Full Name"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={(v) => {
                      updateField('fullName', v);
                    }}
                    placeholder="e.g., Alex Tan"
                    error={errors.fullName}
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(v) => {
                      updateField('email', v);
                    }}
                    placeholder="alex@example.com"
                    error={errors.email}
                  />
                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(v) => {
                      updateField('phone', v);
                    }}
                    placeholder="+65 9123 4567"
                    helpText="Include country code (E.164 format)"
                    error={errors.phone}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <RadioGroup
                    label="Academic Status"
                    name="academicStatus"
                    required
                    value={formData.academicStatus}
                    onChange={(v) => {
                      updateField('academicStatus', v as CandidateFormData['academicStatus']);
                    }}
                    options={ACADEMIC_STATUS_OPTIONS}
                    error={errors.academicStatus}
                  />
                  <SelectField
                    label="Current / Obtained Degree"
                    name="degree"
                    required
                    value={formData.degree}
                    onChange={(v) => {
                      updateField('degree', v);
                    }}
                    options={DEGREE_OPTIONS}
                    error={errors.degree}
                  />
                  <TextField
                    label="University / Institution Name"
                    name="university"
                    required
                    value={formData.university}
                    onChange={(v) => {
                      updateField('university', v);
                    }}
                    placeholder="e.g., National University of Singapore"
                    error={errors.university}
                  />
                  <TextField
                    label="Passing Year"
                    name="passingYear"
                    value={formData.passingYear ?? ''}
                    onChange={(v) => {
                      updateField('passingYear', v);
                    }}
                    placeholder="e.g., 2026"
                    error={errors.passingYear}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <RadioGroup
                    label="Developed AI Applications?"
                    name="hasBuiltAiApps"
                    required
                    value={formData.hasBuiltAiApps}
                    onChange={(v) => {
                      updateField('hasBuiltAiApps', v as CandidateFormData['hasBuiltAiApps']);
                    }}
                    options={['Yes', 'No']}
                    error={errors.hasBuiltAiApps}
                  />
                  {formData.hasBuiltAiApps === 'Yes' && (
                    <TextAreaField
                      label="Tech Stack & GitHub/Demo URL"
                      name="techStackUrl"
                      required
                      value={formData.techStackUrl ?? ''}
                      onChange={(v) => {
                        updateField('techStackUrl', v);
                      }}
                      placeholder="Built RAG app using LangChain, FastAPI & Qdrant — github.com/..."
                      error={errors.techStackUrl}
                    />
                  )}
                  <SelectField
                    label="Number of Internships Completed"
                    name="internshipsCompleted"
                    required
                    value={formData.internshipsCompleted}
                    onChange={(v) => {
                      updateField('internshipsCompleted', v);
                    }}
                    options={INTERNSHIP_COUNT_OPTIONS}
                    error={errors.internshipsCompleted}
                  />
                  {formData.internshipsCompleted !== '0' && (
                    <TextAreaField
                      label="Internship Details"
                      name="internshipDetails"
                      value={formData.internshipDetails ?? ''}
                      onChange={(v) => {
                        updateField('internshipDetails', v);
                      }}
                      placeholder="Company A | 3 Months | AI Intern — Fine-tuned Llama-3 models for sentiment analysis"
                      error={errors.internshipDetails}
                    />
                  )}
                  <TextAreaField
                    label="Hackathons / Problems Solved"
                    name="hackathons"
                    value={formData.hackathons ?? ''}
                    onChange={(v) => {
                      updateField('hackathons', v);
                    }}
                    placeholder="Top 5 in National AI Hackathon"
                    rows={3}
                    error={errors.hackathons}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <TextField
                    label="1st Dream Job Role"
                    name="dreamRole1"
                    required
                    value={formData.dreamRole1}
                    onChange={(v) => {
                      updateField('dreamRole1', v);
                    }}
                    placeholder="Autonomous Multi-Agent Developer"
                    error={errors.dreamRole1}
                  />
                  <TextField
                    label="2nd Dream Job Role"
                    name="dreamRole2"
                    required
                    value={formData.dreamRole2}
                    onChange={(v) => {
                      updateField('dreamRole2', v);
                    }}
                    placeholder="Full-Stack AI Engineer"
                    error={errors.dreamRole2}
                  />
                  <TextField
                    label="Target Dream Companies"
                    name="targetCompanies"
                    value={formData.targetCompanies ?? ''}
                    onChange={(v) => {
                      updateField('targetCompanies', v);
                    }}
                    placeholder="OpenAI, ByteDance, Top Govt AI Tech Agencies"
                    error={errors.targetCompanies}
                  />
                  <FileDropzone
                    label="Upload CV / Resume"
                    name="resume"
                    required
                    file={resume}
                    onChange={setResume}
                    error={errors.resume}
                  />
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
                Submit Application
              </FormButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessScreen({ candidateId }: { candidateId: string }) {
  return (
    <section className="w-full bg-transparent py-24 min-h-[80vh] flex items-center">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] bg-white shadow-sm border border-gray-100/50 p-10 sm:p-14"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4a5d23]/10 text-[#4a5d23]">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-4xl mb-4">
            Application received.
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for applying to T3 AI Works. Your Candidate ID is:
          </p>
          <div className="inline-flex items-center rounded-full bg-[#0f0f0f] px-6 py-3 text-lg font-semibold text-white mb-8 tracking-wide">
            {candidateId}
          </div>
          <p className="text-gray-600 mb-10">
            We've emailed you Phase 0 assessment instructions and the proctored assessment dates.
            Check your inbox (and spam folder) over the next few minutes.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#4a5d23] px-8 py-3.5 text-[15px] font-medium text-white hover:bg-[#3d4d1c] transition-colors"
          >
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
