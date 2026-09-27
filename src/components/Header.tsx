import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'University', path: '#funnel' },
  { name: 'Students', path: '#student-journey' },
  { name: 'Companies', path: '#clients' },
  { name: 'How It Works', path: '#how-it-works' },
  { name: 'Leadership', path: '#leadership' },
  { name: 'Radix', path: '/radix' },
];

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
      const sections = NAV_ITEMS.map((item) => item.path.substring(1)).filter(Boolean);
      let current = '';

      // Check if user is at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isAtBottom && sections.length > 0) {
        current = sections[sections.length - 1];
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Increased threshold to 300px to trigger slightly earlier when scrolling down
            if (rect.top <= 300) {
              current = section;
            }
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 300) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        const headerOffset = 100;
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
    <div className="fixed bottom-4 lg:bottom-auto lg:top-4 left-0 right-0 z-[100] flex justify-center w-full px-4 pointer-events-none">
      <motion.header
        layout={!isMobile}
        initial={{ borderRadius: 16 }}
        animate={{
          backgroundColor: '#232621', // Dark olive green, almost black
          borderRadius: 16,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
        className="pointer-events-auto flex flex-col shadow-lg overflow-hidden w-full lg:w-auto"
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
                  const isActive = activeSection === item.path.substring(1);
                  return item.path.startsWith('#') ? (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        handleSmoothScroll(e, item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`relative text-[15px] px-2 py-1 font-medium transition-colors whitespace-nowrap cursor-pointer ${isActive ? 'text-white' : 'text-[#c4cdbe] hover:text-white'}`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileNavUnderline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8ba05f] rounded-full"
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
                      className="relative text-[16px] px-2 py-1 font-medium text-[#c4cdbe] hover:text-white transition-colors"
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-3 w-full mt-2">
                  <Link
                    to="/apply"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center h-[44px] px-8 rounded-xl bg-white text-[#0f0f0f] text-[15px] font-medium hover:bg-white/90 transition-colors shadow-sm"
                  >
                    Apply Now
                  </Link>
                  <Link
                    to="/hire"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center h-[44px] px-8 rounded-xl bg-[#8ba05f] text-[#0f0f0f] text-[15px] font-bold hover:bg-[#9cb36a] transition-colors shadow-sm shadow-[#8ba05f]/20 border border-white/5"
                  >
                    Hire AI Talent
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Bar */}
        <div className="flex items-center min-h-[60px] h-[60px] px-4 xl:px-6 w-full">
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
                const isActive = activeSection === item.path.substring(1);
                return item.path.startsWith('#') ? (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.path);
                    }}
                    className={`relative text-[14px] px-1 py-1 mx-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${isActive ? 'text-white' : 'text-[#c4cdbe] hover:text-white'}`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="desktopNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8ba05f] rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative text-[14px] px-1 py-1 mx-2 font-medium text-[#c4cdbe] hover:text-white transition-colors whitespace-nowrap"
                  >
                    <span className="relative z-10">{item.name}</span>
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
            <Link
              to="/apply"
              className="inline-flex items-center justify-center h-[44px] px-6 rounded-xl bg-white/5 border border-white/10 text-white text-[15px] font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Apply Now
            </Link>
            <Link
              to="/hire"
              className="inline-flex items-center justify-center h-[44px] px-6 rounded-xl bg-[#8ba05f] text-[#0f0f0f] text-[15px] font-bold hover:bg-[#9cb36a] transition-colors whitespace-nowrap shadow-sm shadow-[#8ba05f]/20 border border-white/5 cursor-pointer"
            >
              Hire AI Talent
            </Link>
          </motion.div>
        </div>
      </motion.header>
    </div>
  );
}
