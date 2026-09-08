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
    <footer id="contact" className="bg-[#11140e] pt-20 pb-8 border-t border-[#232621]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-4 text-xl">TalenciaGlobal</h3>
            <p className="text-sm text-gray-400">
              We help people discover their Talent DNA and accelerate them for high-end engineering
              roles.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2">HQ: India</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
              Bengaluru, Karnataka
              <br />
              India
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2">US Office</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
              Sheridan, Wyoming
              <br />
              United States
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end justify-start">
            <a
              href="mailto:hello@talenciaglobal.com"
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-8 hover:opacity-80 transition-opacity tracking-tight"
            >
              hello@talenciaglobal.com
            </a>

            <div
              className="flex items-center gap-2"
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
                  className="relative w-14 h-14 rounded-[20px] bg-[#1a1f16] flex items-center justify-center text-white overflow-hidden group border border-white/5"
                >
                  {hoveredSocial === social.id && (
                    <motion.div
                      layoutId="socialHoverBall"
                      className="absolute inset-0 bg-[#4a5d23]"
                      initial={{ borderRadius: 20 }}
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
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <p className="text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} TalenciaGlobal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
