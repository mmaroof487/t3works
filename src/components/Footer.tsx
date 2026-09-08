import { useState } from 'react';
import { motion } from 'framer-motion';

const SOCIALS = [
  { 
    id: 'dribbble', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    )
  },
  { id: 'behance', icon: <span className="font-bold text-xl tracking-tighter">Bē</span> },
  { 
    id: 'instagram', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  { 
    id: 'x', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16" />
        <path d="M4 20L20 4" />
      </svg>
    ) 
  },
  { 
    id: 'linkedin', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
];

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="bg-[#11140e] pt-20 pb-8 border-t border-[#232621]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          {/* Columns */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2">Cases</h3>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Fitonist
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Brainforest
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Cybervergent
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Nopan
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Ramos
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2">Services</h3>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Complex solution
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Branding
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Design
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Development
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2">About us</h3>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Numbers
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Mission
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Values
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Clients
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end md:col-span-1 justify-start">
            <a
              href="mailto:hello@t3works.com"
              className="text-4xl md:text-5xl font-medium text-white mb-8 hover:opacity-80 transition-opacity tracking-tight"
            >
              hello@t3works.com
            </a>

            <div className="flex items-center gap-2" onMouseLeave={() => setHoveredSocial(null)}>
              {SOCIALS.map((social) => (
                <button
                  key={social.id}
                  onMouseEnter={() => setHoveredSocial(social.id)}
                  className="relative w-14 h-14 rounded-[20px] bg-[#1a1f16] flex items-center justify-center text-white overflow-hidden group border border-white/5"
                >
                  {hoveredSocial === social.id && (
                    <motion.div
                      layoutId="socialHoverBall"
                      className="absolute inset-0 bg-[#ff4f27]"
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
            Copyright &copy; {new Date().getFullYear()} T3Works Inc. All rights reserved.
          </p>
          <button className="h-[48px] px-8 rounded-full bg-[#4a5d23] text-white text-[15px] font-medium hover:bg-[#3d4d1c] transition-colors flex items-center gap-2 shadow-sm">
            Book a call
            <span className="text-lg leading-none transform -rotate-45 block">→</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
