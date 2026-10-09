import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CandidatePortal from './CandidatePortal';
import EnterprisePortal from './EnterprisePortal';

export default function ApplyPortal() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'enterprise' ? 'enterprise' : 'student';
  const [type, setType] = useState<'student' | 'enterprise'>(initialType);

  useEffect(() => {
    const queryType = searchParams.get('type');
    if (queryType === 'enterprise' || queryType === 'student') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(queryType);
    }
  }, [searchParams]);

  return (
    <section className="w-full bg-transparent min-h-screen flex items-center justify-center p-4 md:p-8 pt-28 md:pt-32 pb-12 md:pb-16 relative">
      <div className="absolute top-6 left-4 lg:hidden z-50">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="inline-flex items-baseline text-[#232621]">
            <span className="font-open-sauce text-4xl font-extrabold tracking-tight">t3</span>
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 -10% 0 0)' }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="font-batangas text-2xl ml-1 text-[#4a5d23]"
            >
              works
            </motion.span>
          </div>
        </Link>
      </div>

      <div className="w-full max-w-[80rem] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[85vh] lg:min-h-[950px]">
        {/* Left Side: Graphic / Branding */}
        <div className="hidden lg:flex lg:w-5/12 p-12 flex-col justify-between relative overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105"
            style={{
              backgroundImage:
                type === 'student'
                  ? "url('/images/candidate-bg-new.webp')"
                  : "url('/images/enterprise-bg-new.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#232621] via-[#232621]/80 to-[#232621]/40" />

          <div className="relative z-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#232621] font-bold text-xl">
              T3
            </div>
            <span className="text-xl font-bold tracking-tight">AI Works</span>
          </div>

          <div className="relative z-10 mt-auto mb-auto pt-12">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md mb-6">
              Global Application Portal
            </span>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              {type === 'student'
                ? 'Enter the T3 Talent Funnel'
                : 'Deploy Day-One ready AI engineers'}
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              {type === 'student'
                ? 'Apply in a few minutes. Your application enters the Phase 0 assessment pipeline immediately after submission.'
                : "Submit your hiring requirement and we'll scope the match within 48 hours — zero upfront fee until PoC or internship validation."}
            </p>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-4 text-sm font-medium text-white/50">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            <span>
              {type === 'student'
                ? 'Join the top 1% of AI Engineering'
                : 'Merit-gated. Rigor-driven.'}
            </span>
          </div>
        </div>

        {/* Right Side: Form Content & Switcher */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col items-center">
          <div className="lg:hidden mb-8 text-center flex flex-col items-center w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#232621] text-white font-bold text-xl">
                T3
              </div>
              <span className="text-xl font-bold tracking-tight text-[#232621]">AI Works</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#232621] mb-2">
              {type === 'student'
                ? 'Enter the T3 Talent Funnel'
                : 'Deploy Day-One ready AI engineers'}
            </h1>
          </div>

          {/* Switcher */}
          <div className="flex w-full max-w-sm bg-gray-100 p-1.5 rounded-xl mb-10">
            <button
              onClick={() => {
                setType('student');
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${type === 'student' ? 'bg-white shadow-sm text-[#232621]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              For Candidates
            </button>
            <button
              onClick={() => {
                setType('enterprise');
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${type === 'enterprise' ? 'bg-white shadow-sm text-[#232621]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              For Enterprise
            </button>
          </div>

          <div className="w-full flex-1 flex flex-col">
            {type === 'student' ? <CandidatePortal isEmbedded /> : <EnterprisePortal isEmbedded />}
          </div>
        </div>
      </div>
    </section>
  );
}
