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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const targetPosition = elementPosition + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start: number | null = null;

        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const percentage = Math.min(progress / duration, 1);
          
          window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
          
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      } else if (window.location.pathname !== '/') {
        window.location.href = '/' + path;
      }
    }
  };

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
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src="/images/t3works_nobg.webp" alt="T3Works Logo" className="h-12 w-auto object-contain" />
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
                className="hidden md:flex items-center gap-8 px-6"
              >
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '#about-us' },
                  { name: 'Clients', path: '#clients' },
                  { name: 'Blogs', path: '#blogs' },
                ].map((item) =>
                  item.path.startsWith('#') ? (
                    <button
                      key={item.name}
                      onClick={(e) => handleSmoothScroll(e, item.path)}
                      className="text-[15px] font-medium text-[#c4cdbe] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-[15px] font-medium text-[#c4cdbe] hover:text-white transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </motion.nav>
            ) : (
              <motion.nav
                key="compact-nav"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center px-2"
              >
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[15px] font-medium text-[#c4cdbe] hover:text-white transition-colors whitespace-nowrap mx-2"
                >
                  Home
                </button>
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.div layout className="pr-1 pl-2">
            <button
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center justify-center h-[44px] px-6 rounded-[22px] bg-[#4a5d23] text-white text-[15px] font-medium hover:bg-[#3d4d1c] transition-colors whitespace-nowrap shadow-sm shadow-[#4a5d23]/20 border border-white/5 cursor-pointer"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </motion.header>
    </div>
  );
}
