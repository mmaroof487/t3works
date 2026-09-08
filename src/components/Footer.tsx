import { useState } from 'react';
import { motion } from 'framer-motion';

const SOCIALS = [
  {
    id: 'linkedin',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: 'x',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l16 16" />
        <path d="M4 20L20 4" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer id="contact" className="w-full bg-[#14150f] py-16 md:py-24 border-t border-[#232621]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Top CTA Section */}
        <div className="mb-20 pb-16 border-b border-[#232621] flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Ready to scale your <span className="text-[#4a5d23]">engineering team?</span>
            </h2>
            <p className="text-lg text-gray-400">
              Discover your Talent DNA and build a high-performance remote workforce today.
            </p>
          </div>
          <button className="whitespace-nowrap rounded-3xl bg-[#4a5d23] px-8 py-4 text-base font-semibold text-white hover:bg-[#5b732b] transition-colors">
            Get in touch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col gap-6 items-start">
            <img
              src="/images/t3works_whitebg.webp"
              alt="T3Works Logo"
              className="h-10 w-auto object-contain rounded-md"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              We help people discover their Talent DNA and accelerate them for high-end engineering
              roles globally.
            </p>
            <div
              className="flex items-center gap-3 mt-4"
              onMouseLeave={() => {
                setHoveredSocial(null);
              }}
            >
              {SOCIALS.map((social) => (
                <button
                  key={social.id}
                  onMouseEnter={() => {
                    setHoveredSocial(social.id);
                  }}
                  className="relative w-12 h-12 rounded-[16px] bg-[#1a1f16] flex items-center justify-center text-white overflow-hidden group border border-white/5"
                >
                  {hoveredSocial === social.id && (
                    <motion.div
                      layoutId="socialHoverBall"
                      className="absolute inset-0 bg-[#4a5d23]"
                      initial={{ borderRadius: 16 }}
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2 uppercase tracking-wider text-xs">
              HQ: India
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bengaluru, Karnataka
              <br />
              India
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2 uppercase tracking-wider text-xs">
              US Office
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sheridan, Wyoming
              <br />
              United States
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4 items-start md:items-end">
            <h3 className="text-white font-medium mb-2 uppercase tracking-wider text-xs">
              Contact
            </h3>
            <a
              href="mailto:hello@t3works.com"
              className="text-lg md:text-xl font-medium text-white hover:text-[#4a5d23] transition-colors"
            >
              hello@t3works.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#232621] gap-6">
          <p className="text-sm text-gray-500 font-medium">
            Copyright &copy; {new Date().getFullYear()} T3Works. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-white transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-white transition-colors font-medium"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
