import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, AlertTriangle, Lightbulb, Zap, Wrench, GraduationCap } from 'lucide-react';
import { AccordionItem } from './AccordionItem';
import { SYSTEMS_DATA } from '../data/systems';

interface SystemModalProps {
  system: (typeof SYSTEMS_DATA)[0];
  onClose: () => void;
}

export function SystemModal({ system, onClose }: SystemModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 md:p-12 overflow-hidden pointer-events-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden w-full h-[90dvh] sm:h-auto max-w-4xl sm:max-h-[90vh] flex flex-col relative z-10 shadow-2xl flex-1 transform-gpu"
      >
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        <div data-lenis-prevent className="overflow-y-auto w-full h-full custom-scrollbar pb-10">
          {/* Hero Image */}
          <div className="h-56 sm:h-80 w-full relative shrink-0">
            <img src={system.img} alt={system.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-6 left-6 sm:left-10 right-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center px-3 py-1 rounded-full bg-[#8ba05f]/80 border border-[#8ba05f] text-white font-bold text-xs shadow-sm">
                  System {system.num}
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {system.title}
              </h2>
              <p className="text-lg text-gray-300 font-medium">{system.subtitle}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 sm:p-10"
          >
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {system.metrics.split(' | ').map((metric: string, idx: number) => {
                const match = /^([^\s]+)\s+(.*)$/.exec(metric);
                const value = match ? match[1] : metric;
                const label = match ? match[2] : '';
                return (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-[#8ba05f]/30 transition-colors"
                  >
                    <span className="text-2xl font-black text-[#0f0f0f] mb-1">{value}</span>
                    <span className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-wider">
                      {label || 'Metric'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-10">{system.desc}</p>

            {/* Accordions */}
            <div className="space-y-4">
              <AccordionItem
                title="Engineering Problem Statement"
                icon={<AlertTriangle size={18} />}
                defaultOpen
              >
                Building a robust system requires deep understanding of the core complexities. This
                phase focuses on mapping out edge cases, defining data boundaries, and translating
                abstract business rules into concrete engineering requirements.
              </AccordionItem>
              <AccordionItem title="System Design & Architecture" icon={<Lightbulb size={18} />}>
                The architecture follows a decoupled, modular design. Using event-driven patterns,
                we ensure that individual components can scale independently while maintaining
                strict data consistency across the entire pipeline.
              </AccordionItem>
              <AccordionItem title="Key Engineering Features" icon={<Zap size={18} />}>
                Core features include automated schema generation, dynamic payload routing, robust
                error recovery mechanisms, and a multi-threaded execution layer designed for
                high-throughput data processing.
              </AccordionItem>
              <AccordionItem title="Technology Stack" icon={<Wrench size={18} />}>
                Built heavily on Python, FastAPI, and PostgreSQL with pgvector for storage. We
                orchestrate complex workflows using LangChain and deploy the entire system using
                containerized Docker environments for maximum reliability.
              </AccordionItem>
              <AccordionItem
                title="Engineering Competencies Developed"
                icon={<GraduationCap size={18} />}
              >
                Engineers master system modeling, complex database normalization, asynchronous
                programming, advanced prompt engineering, and building resilient API architectures
                from scratch.
              </AccordionItem>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
