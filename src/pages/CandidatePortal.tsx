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
    <section className="w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center p-4 md:p-8 pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="w-full max-w-[1280px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
        
        {/* Left Side: Graphic / Branding */}
        <div className="hidden lg:flex lg:w-5/12 p-12 flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0f0f0f] font-bold text-xl">
              T3
            </div>
            <span className="text-xl font-bold tracking-tight">AI Works</span>
          </div>

          <div className="relative z-10 mt-auto mb-auto pt-12">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md mb-6">
              Candidate Application Portal
            </span>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              Enter the T3 Talent Funnel
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              Apply in a few minutes. Your application enters the Phase 0 assessment pipeline immediately after submission.
            </p>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-4 text-sm font-medium text-white/50">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            <span>Join the top 1% of AI Engineering</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f0f0f] text-white font-bold text-xl">
                T3
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0f0f0f]">AI Works</span>
            </div>
            
            <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold text-gray-700 mb-4">
              Candidate Application Portal
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] mb-3">
              Enter the T3 Talent Funnel
            </h1>
            <p className="text-gray-600 text-sm">
              Apply in a few minutes to start your Phase 0 assessment.
            </p>
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
    <section className="w-full bg-[#f8f9fa] py-24 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[2.5rem] bg-white shadow-xl border border-gray-100 p-10 sm:p-14 text-center overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-800 to-black" />
          
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#0f0f0f]/5 text-[#0f0f0f] ring-8 ring-gray-50">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>
          
          <h1 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] md:text-4xl mb-4">
            Application received.
          </h1>
          
          <p className="text-gray-600 mb-6 font-medium">
            Thank you for applying to T3 AI Works. Your Candidate ID is:
          </p>
          
          <div className="inline-flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 px-8 py-4 mb-8 w-full sm:w-auto">
            <span className="text-2xl font-mono font-bold text-[#0f0f0f] tracking-wider">
              {candidateId}
            </span>
          </div>
          
          <p className="text-gray-600 mb-10 leading-relaxed text-sm sm:text-base">
            We've emailed you Phase 0 assessment instructions and the proctored assessment dates.
            Check your inbox (and spam folder) over the next few minutes.
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
