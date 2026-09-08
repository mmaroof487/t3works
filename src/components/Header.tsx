import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center w-full px-4 pointer-events-none">
      <motion.header
        layout
        initial={{ borderRadius: 9999 }}
        animate={{
          backgroundColor: '#232621', // Dark olive green, almost black
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
        className="pointer-events-auto flex items-center shadow-lg overflow-hidden h-[60px]"
      >
        <div className="flex items-center h-full px-2">
          {/* Logo */}
          <motion.div layout className="flex items-center pl-4 pr-2">
            <Link to="/" className="text-white hover:opacity-80 transition-opacity">
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.6667 15C8.90524 15 6.66667 12.7614 6.66667 10C6.66667 7.23858 8.90524 5 11.6667 5C13.4357 5 15.0062 5.92211 15.8927 7.33333H19.6261C18.396 3.19799 14.6152 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C14.6152 20 18.396 16.802 19.6261 12.6667H15.8927C15.0062 14.0779 13.4357 15 11.6667 15Z" />
                <path d="M28.3333 5C31.0948 5 33.3333 7.23858 33.3333 10C33.3333 12.7614 31.0948 15 28.3333 15C26.5643 15 24.9938 14.0779 24.1073 12.6667H20.3739C21.604 16.802 25.3848 20 30 20C35.5228 20 40 15.5228 40 10C40 4.47715 35.5228 0 30 0C25.3848 0 21.604 3.19799 20.3739 7.33333H24.1073C24.9938 5.92211 26.5643 5 28.3333 5Z" />
              </svg>
            </Link>
          </motion.div>

          {/* Dynamic Content */}
          <AnimatePresence mode="popLayout" initial={false}>
            {!isScrolled ? (
              <motion.nav
                key="expanded-nav"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center gap-8 px-6"
              >
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '#about' },
                  { name: 'Clients', path: '/' },
                  { name: 'Blogs', path: '/blog1' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-[15px] font-medium text-[#c4cdbe] hover:text-white transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.nav>
            ) : (
              <motion.nav
                key="compact-nav"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center px-6"
              >
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[15px] font-medium text-[#c4cdbe] hover:text-white transition-colors whitespace-nowrap"
                >
                  Home
                </button>
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.div layout className="pr-1 pl-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-[44px] px-6 rounded-[22px] bg-[#4a5d23] text-white text-[15px] font-medium hover:bg-[#3d4d1c] transition-colors whitespace-nowrap shadow-sm shadow-[#4a5d23]/20 border border-white/5"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.header>
    </div>
  );
}
