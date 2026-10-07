import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'What We Do', path: '#ecosystem' },
  { name: 'How We Do', path: '#pipeline' },
  { name: 'Students', path: '#student-journey' },
  { name: 'Companies', path: '#clients' },
  { name: 'Radix', path: '#vision' },
  { name: 'Leadership', path: '/leadership' },
];

// the nav CTA scrolls to the students / companies chooser
const APPLY_PATH = '#get-started';

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navSections = NAV_ITEMS.filter((item) => item.path.startsWith('#')).map((item) =>
        item.path.substring(1)
      );
      // the chooser has no nav link, but being on it makes the Apply Now button glow
      const sections = [...navSections, APPLY_PATH.substring(1)];
      let current = '';

      // Check if user is at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      const last = navSections.at(-1);
      if (isAtBottom && last && document.getElementById(last)) {
        current = last;
      } else {
        // the section crossing a line 300px down the viewport is the active one; sections
        // without a nav link (hero, path chooser, logos) leave nothing highlighted
        for (const section of sections) {
          const rect = document.getElementById(section)?.getBoundingClientRect();
          if (rect && rect.top <= 300 && rect.bottom > 300) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const applyGlow = activeSection === APPLY_PATH.substring(1) ? ' cta-glow' : '';

  const navigate = useNavigate();
  const location = useLocation();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    path: string
  ) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        // in rem so it tracks the scaled nav pill: the section's own top padding then lands its
        // first line just under the pill (4.5rem = 72px at the design width)
        const headerOffset = 4.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        const elementPosition = element.getBoundingClientRect().top;
        const targetPosition = elementPosition + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start: number | null = null;

        const step = (timestamp: number) => {
          start ??= timestamp;
          const progress = timestamp - start;
          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const percentage = Math.min(progress / duration, 1);

          window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      } else if (location.pathname !== '/') {
        void navigate('/', { state: { scrollTo: path } });
      }
    }
  };

  return (
    <div className="fixed bottom-4 md:bottom-20 lg:bottom-auto lg:top-10 left-0 right-0 z-[100] flex justify-center w-full px-4 pointer-events-none">
      <motion.header
        layout={!isMobile}
        initial={{ borderRadius: 20 }}
        animate={{
          backgroundColor: '#232621', // Dark olive green, almost black
          borderRadius: 20,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
        className="pointer-events-auto flex flex-col shadow-2xl shadow-black/25 border border-white/10 overflow-hidden w-full lg:w-auto xl:w-[59.77rem]"
      >
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden w-full overflow-hidden"
            >
              <div className="flex flex-col items-center gap-6 pt-8 pb-4 border-b border-white/10 mx-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.path.startsWith('#')
                    ? activeSection === item.path.substring(1)
                    : location.pathname === item.path;
                  return item.path.startsWith('#') ? (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        handleSmoothScroll(e, item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`relative text-[0.9375rem] px-2 py-1 font-medium transition-colors whitespace-nowrap cursor-pointer ${isActive ? 'text-white' : 'text-[#c4cdbe] hover:text-white'}`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileNavUnderline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#c9b27a] rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className={`relative text-[1rem] px-2 py-1 font-medium transition-colors ${isActive ? 'text-white' : 'text-[#c4cdbe] hover:text-white'}`}
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-3 w-full mt-2">
                  <button
                    onClick={(e) => {
                      handleSmoothScroll(e, APPLY_PATH);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`inline-flex items-center justify-center h-[2.75rem] px-8 rounded-xl bg-gradient-to-r from-[#d3be8f] to-[#a88f5c] text-[#232621] text-[0.9375rem] font-medium hover:brightness-110 transition-[filter] shadow-sm shadow-[#c9b27a]/20 border border-[#e3d3a8]/40 cursor-pointer${applyGlow}`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Bar */}
        <div className="flex items-center min-h-[3.75rem] h-[3.75rem] pl-4 pr-2 xl:pl-6 xl:pr-2 w-full">
          {/* Left: Logo */}
          <motion.div layout className="flex-1 flex items-center justify-start">
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity flex items-center"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  e.preventDefault();
                  const startPosition = window.pageYOffset;
                  const distance = -startPosition;
                  const duration = 800;
                  let start: number | null = null;

                  const step = (timestamp: number) => {
                    start ??= timestamp;
                    const progress = timestamp - start;
                    const easeInOutCubic = (t: number) =>
                      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    const percentage = Math.min(progress / duration, 1);

                    window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

                    if (progress < duration) {
                      window.requestAnimationFrame(step);
                    }
                  };

                  window.requestAnimationFrame(step);
                }
              }}
            >
              <img
                src="/images/t3works_nobg.webp"
                alt="T3Works Logo"
                className="h-8 xl:h-10 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Center: Desktop Dynamic Content */}
          <div className="hidden xl:flex shrink-0 items-center justify-center">
            <motion.nav layout className="flex items-center gap-6 px-4">
              {NAV_ITEMS.map((item) => {
                const isActive = item.path.startsWith('#')
                  ? activeSection === item.path.substring(1)
                  : location.pathname === item.path;
                return item.path.startsWith('#') ? (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.path);
                    }}
                    className={`relative text-[0.9375rem] px-1 py-1 mx-2 font-normal transition-colors whitespace-nowrap cursor-pointer ${isActive ? 'text-white' : 'text-[#c9c9c0] hover:text-white'}`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="desktopNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#c9b27a] rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative text-[0.9375rem] px-1 py-1 mx-2 font-normal transition-colors whitespace-nowrap ${isActive ? 'text-white' : 'text-[#c9c9c0] hover:text-white'}`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="desktopNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#c9b27a] rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.nav>
          </div>

          {/* Right: Mobile Menu Button */}
          <motion.div layout className="flex xl:hidden flex-1 items-center justify-end">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>

          {/* Right: CTAs (Desktop Only) */}
          <motion.div layout className="hidden xl:flex flex-1 items-center justify-end gap-3">
            <button
              onClick={(e) => {
                handleSmoothScroll(e, APPLY_PATH);
              }}
              className={`inline-flex items-center justify-center h-[2.75rem] px-6 rounded-xl bg-gradient-to-r from-[#d3be8f] to-[#a88f5c] text-[#232621] text-[0.9375rem] font-medium hover:brightness-110 transition-[filter] whitespace-nowrap shadow-sm shadow-[#c9b27a]/20 border border-[#e3d3a8]/40 cursor-pointer${applyGlow}`}
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </motion.header>
    </div>
  );
}
