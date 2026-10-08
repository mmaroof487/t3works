import { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Database,
  Code2,
  CheckCircle2,
  Terminal,
  BrainCircuit,
  Network,
  Server,
  Lock,
  Cloud,
  Wrench,
} from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SystemModal } from '../components/SystemModal';
import { RADIX_GENERAL, type RadixContent, type RadixLink, type RadixSystem } from '../data/radix';

// one icon per pillar and per technology group, in the order the content lists them
const PILLAR_ICONS = [Code2, Database, Server, BrainCircuit, Lock];
const TECH_ICONS = [BrainCircuit, Cloud, Database, Code2, Terminal, Wrench];

const NOTE_CLASS = 'mx-auto mt-12 max-w-3xl text-center text-base font-medium';

// "#id" links scroll within the page; anything else is a route
function CtaLink({ link, className }: { link: RadixLink; className: string }) {
  return link.href.startsWith('#') ? (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  ) : (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  );
}

// The Radix page. Radix for Students and Radix for Companies pass their own wording; the layout
// is shared.
export default function RadixPage({ content = RADIX_GENERAL }: { content?: RadixContent }) {
  const { hero, overview, systems, scale, tech, complexity, outcomes, cta } = content;
  const location = useLocation();
  const { scrollY } = useScroll();
  const topGradientOpacity = useTransform(scrollY, [0, 400], [0, 1]);

  const [selectedSystem, setSelectedSystem] = useState<RadixSystem | null>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const scrollTarget = state?.scrollTo;
    if (scrollTarget) {
      setTimeout(() => {
        const element = document.querySelector(scrollTarget);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const targetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedSystem) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [selectedSystem]);

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-gray-900 font-sans selection:bg-[#4a5d23] selection:text-white pb-20">
      {/* Ambient Scroll Shadow */}
      {createPortal(
        <motion.div
          style={{ opacity: topGradientOpacity }}
          className="fixed top-0 inset-x-0 h-40 bg-gradient-to-b from-[#4a5d23]/15 to-transparent z-40 pointer-events-none"
        />,
        document.body
      )}

      {/* Mobile Branding (Matching Homepage) */}
      <div className="absolute top-6 left-6 xl:hidden z-50">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="inline-flex items-baseline text-[#232621] hover:opacity-80 transition-opacity"
        >
          <span className="font-open-sauce text-3xl font-extrabold tracking-tight">t3</span>
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 -10% 0 0)' }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            className="font-batangas text-xl ml-1 text-[#4a5d23]"
          >
            works
          </motion.span>
          <span className="text-xl font-medium text-gray-400 mx-2">/</span>
          <span className="text-xl font-bold text-[#232621]">Radix</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-24 md:pb-12 lg:pt-36 lg:pb-20 px-4 overflow-hidden min-h-[85vh] md:min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center">
        <motion.div
          animate={{
            opacity: [0.2, 1, 0.2],
            scaleY: [1, 1.35, 1],
            scaleX: [1, 1.05, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="absolute top-0 inset-x-0 h-[40.625rem] bg-gradient-to-b from-[#c4cdbe] via-[#e5e9db] to-transparent pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#4a5d23]/20 bg-white/50 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-[#4a5d23] shadow-sm mb-6 md:mb-5 lg:mb-6"
          >
            {hero.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] text-[#232621] mb-6 md:mb-5 lg:mb-6"
          >
            {hero.title.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && (
                  <>
                    {' '}
                    <br />{' '}
                  </>
                )}
                {line}
              </Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed mb-6 md:mb-4 lg:mb-6"
          >
            {hero.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed mb-10 md:mb-8 lg:mb-10"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href={hero.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-[#232621] px-8 py-4 text-[0.9375rem] font-medium text-white hover:bg-[#2f332c] transition-all shadow-md hover:shadow-lg w-full sm:w-auto gap-2 group"
            >
              {hero.primary.label}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={hero.secondary.href}
              className="inline-flex items-center justify-center rounded-full bg-white border border-gray-200 px-8 py-4 text-[0.9375rem] font-medium text-gray-900 hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto"
            >
              {hero.secondary.label}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Program Architecture (Overview) */}
      <section id="overview" className="py-24 px-4 bg-white relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpItem}
            className="text-center mb-16"
          >
            <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">
              {overview.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#232621] mb-6">{overview.title}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">{overview.intro}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {overview.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  className="bg-gray-50 border border-gray-100 p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#8ba05f]/20 flex items-center justify-center text-[#4a5d23] mb-6 group-hover:bg-[#8ba05f]/30 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#232621] mb-2">{pillar.title}</h3>
                  <p className="text-sm font-medium text-[#8ba05f] mb-4">{pillar.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
          {overview.note && <p className={`${NOTE_CLASS} text-[#4a5d23]`}>{overview.note}</p>}
        </div>
      </section>

      {/* 8 Engineering Systems */}
      <section id="projects" className="py-24 px-4 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpItem}
            className="text-center mb-20"
          >
            <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">
              {systems.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#232621] mb-6">{systems.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{systems.intro}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {systems.items.map((sys) => (
              <motion.div
                key={sys.num}
                onClick={() => {
                  setSelectedSystem(sys);
                }}
                variants={fadeUpItem}
                className="bg-white rounded-[2rem] border border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-gray-100 transition-all duration-500 relative overflow-hidden group flex flex-col h-full cursor-pointer"
              >
                {/* Image Header */}
                <div className="h-44 w-full relative overflow-hidden shrink-0 bg-gray-50">
                  <img
                    src={sys.img}
                    alt={sys.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Clean image, no dark gradient overlay */}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[0.625rem] font-bold px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-md uppercase tracking-wider">
                      Sys {sys.num}
                    </span>
                    <p className="text-[#8ba05f] text-[0.625rem] font-bold tracking-widest uppercase truncate">
                      {sys.subtitle}
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-[#4a5d23] transition-colors">
                    {sys.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{sys.desc}</p>

                  {sys.focus && (
                    <p className="mb-6 text-xs leading-relaxed text-gray-600">
                      <span className="mb-1 block text-[0.625rem] font-bold uppercase tracking-widest text-[#4a5d23]">
                        {systems.focusLabel}
                      </span>
                      {sys.focus}
                    </p>
                  )}

                  <div className="pt-5 border-t border-gray-100/60 mt-auto">
                    <p className="text-[0.6875rem] text-gray-400 font-medium tracking-wide uppercase leading-relaxed flex flex-wrap items-center">
                      {sys.metrics.split(' | ').map((m, idx, arr) => (
                        <span key={idx} className="flex items-center whitespace-nowrap">
                          {m}
                          {idx < arr.length - 1 && (
                            <span className="mx-2 text-gray-200 text-[0.5rem]">•</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engineering Scale */}
      <section className="min-h-[100dvh] py-20 bg-[#232621] text-white px-4 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8ba05f] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpItem}
          >
            <span className="text-[#8ba05f] font-semibold tracking-wider uppercase text-sm mb-4 block">
              {scale.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{scale.title}</h2>
            <p className="text-gray-400 mb-16 max-w-2xl mx-auto">{scale.intro}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
          >
            {scale.stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUpItem} className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.val} />
                </span>
                <span className="text-base md:text-lg font-semibold text-[#c4cdbe] mb-2 text-center">
                  {stat.label}
                </span>
                <span className="text-xs text-gray-500 text-center">{stat.sub}</span>
              </motion.div>
            ))}
          </motion.div>
          {scale.note && <p className={`${NOTE_CLASS} text-[#c4cdbe]`}>{scale.note}</p>}
        </div>
      </section>

      {/* Technology Ecosystem */}
      <section id="tech" className="pt-24 pb-12 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeUpItem}>
              <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">
                {tech.label}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#232621] mb-6">{tech.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">{tech.intro}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tech.groups.map((cat, i) => {
              const Icon = TECH_ICONS[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  className="bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-14 w-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#4a5d23] mb-6 group-hover:scale-110 group-hover:bg-[#8ba05f] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{cat.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{cat.tools}</p>
                  {cat.framing && (
                    <p className="mt-3 text-sm font-medium text-[#4a5d23]">{cat.framing}</p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
          {tech.note && <p className={`${NOTE_CLASS} text-[#4a5d23]`}>{tech.note}</p>}
        </div>
      </section>

      {/* Technical Complexity */}
      <section className="pt-12 pb-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpItem} className="text-center mb-12">
              <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">
                {complexity.label}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#232621] mb-6">
                {complexity.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">{complexity.intro}</p>
            </motion.div>

            <div className="space-y-4">
              {complexity.stages.map((stage, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  className="relative group bg-gray-50 border border-gray-100 rounded-3xl p-5 sm:p-6 hover:border-[#8ba05f]/30 hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Background Progress Highlight */}
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#8ba05f]/5 to-transparent origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: `${String(stage.perc)}%` }}
                  />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[0.625rem] sm:text-xs font-bold px-2.5 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg group-hover:bg-[#8ba05f] group-hover:border-[#8ba05f] group-hover:text-white transition-colors uppercase tracking-wider shadow-sm">
                          {stage.sys}
                        </span>
                        <span className="font-bold text-gray-900 text-base sm:text-lg">
                          {stage.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 font-medium pl-1">{stage.tag}</span>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="h-2.5 w-full sm:w-32 bg-gray-200 rounded-full overflow-hidden flex-1 sm:flex-none shadow-inner relative">
                        <motion.div
                          initial={{ width: `${String(stage.startPerc)}%` }}
                          whileInView={{ width: `${String(stage.perc)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 }}
                          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#8ba05f] to-[#4a5d23] rounded-full"
                        />
                      </div>
                      <span className="text-base font-black text-[#4a5d23] w-14 text-right tabular-nums">
                        {stage.perc}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {complexity.note && (
              <motion.p variants={fadeUpItem} className={`${NOTE_CLASS} text-[#4a5d23]`}>
                {complexity.note}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Engineering Outcomes */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpItem}
            className="text-center mb-16"
          >
            <span className="text-[#4a5d23] font-semibold tracking-wider uppercase text-sm mb-4 block">
              {outcomes.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#232621] mb-6">{outcomes.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{outcomes.intro}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {outcomes.items.map((outcome, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col gap-4 hover:border-[#8ba05f] hover:shadow-lg transition-all duration-300 group"
              >
                <CheckCircle2
                  size={28}
                  className="text-[#8ba05f] transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-[#232621]">{outcome.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{outcome.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          {outcomes.note && <p className={`${NOTE_CLASS} text-[#4a5d23]`}>{outcomes.note}</p>}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto bg-[#4a5d23] rounded-[3rem] p-10 md:p-16 text-center text-white relative"
        >
          {cta.art ? (
            <img
              src="/images/Minimalist%20Sage%20Network%20UI%20UX.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full rounded-[3rem] object-cover opacity-30 mix-blend-multiply"
            />
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 p-20 opacity-10 pointer-events-none"
            >
              <Network size={400} />
            </motion.div>
          )}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{cta.title}</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">{cta.body}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {cta.action && (
                <CtaLink
                  link={cta.action}
                  className="inline-flex items-center justify-center rounded-full border border-[#e3d3a8]/40 bg-gradient-to-r from-[#d3be8f] to-[#a88f5c] px-8 py-4 text-[0.9375rem] font-bold text-[#232621] hover:brightness-110 transition-[filter] w-full sm:w-auto shadow-lg"
                />
              )}
              <CtaLink
                link={cta.primary}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[0.9375rem] font-bold text-[#232621] hover:bg-gray-100 transition-all w-full sm:w-auto shadow-lg"
              />
              <CtaLink
                link={cta.secondary}
                className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-white/30 px-8 py-4 text-[0.9375rem] font-bold text-white hover:bg-white/10 transition-all w-full sm:w-auto"
              />
            </div>
            {cta.note && (
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {cta.note}
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Expanded System Modal */}
      <AnimatePresence>
        {selectedSystem && (
          <SystemModal
            system={selectedSystem}
            onClose={() => {
              setSelectedSystem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
