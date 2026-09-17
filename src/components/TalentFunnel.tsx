import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface FunnelStage {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
  widthClass: string;
}

const STAGES: FunnelStage[] = [
  {
    value: 500,
    label: 'Applicants',
    detail: 'Initial intake for every cohort.',
    widthClass: 'w-full',
  },
  {
    value: 125,
    label: 'Candidates',
    detail: 'Top 25% advance after the Phase 0 proctored assessment.',
    widthClass: 'w-[70%]',
  },
  {
    value: 50,
    suffix: '–75',
    label: 'Engineers',
    detail: 'Final T3 talent after StepX training and rigor-driven filtering.',
    widthClass: 'w-[42%]',
  },
];

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toString();
      },
    });
    return () => {
      controls.stop();
    };
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function TalentFunnel() {
  return (
    <section className="w-full bg-[#14150f] py-16 md:py-24 text-white overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-16 md:mb-20"
        >
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80 mb-6">
            The Talent Selection Funnel
          </span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl mb-6">
            A merit-gated, rigor-driven pipeline.
          </h2>
          <p className="text-lg text-white/70">
            Every intake starts wide and narrows through proctored assessment and intensive training
            until only verified T3 talent remains.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-6 mb-16 md:mb-20">
          {STAGES.map((stage, idx) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`${stage.widthClass} max-w-2xl`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-6 sm:py-8 backdrop-blur-sm">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                    <AnimatedNumber value={stage.value} suffix={stage.suffix} />
                  </span>
                  <span className="text-lg font-semibold text-[#8ba05f]">{stage.label}</span>
                </div>
                <p className="text-sm text-white/60 sm:max-w-[220px] text-center sm:text-right">
                  {stage.detail}
                </p>
              </div>
              {idx < STAGES.length - 1 && (
                <div className="flex justify-center py-3">
                  <div className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] bg-[#4a5d23] p-8 md:p-12 lg:p-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
                StepX Acceleration
              </h3>
              <p className="text-white/80">
                Extreme problem solving, multi-agent system design, and curated enterprise scenarios
                — the training that produces Day-One ready engineers.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 sm:gap-10">
              {[
                { value: '240', label: 'Training hours' },
                { value: '400+', label: 'DSA challenges' },
                { value: '300', label: 'Enterprise scenarios' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
