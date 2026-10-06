import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const CLIENT_LOGOS = [
  { name: 'GE Healthcare', domain: 'gehealthcare.com' },
  { name: 'Amadeus', domain: 'amadeus.com' },
  { name: 'Eurofins', domain: 'eurofins.com' },
  { name: 'IQVIA', domain: 'iqvia.com' },
  {
    name: 'Cisco',
    domain: 'cisco.com',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
  },
  { name: 'Philips', domain: 'philips.com' },
  {
    name: 'ATMECS',
    domain: 'atmecs.com',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl6m6rp2SNXUH5aKSlBydoOXrKga3hyLG0aO5isT4nQ&s=10',
  },
  { name: 'Wipfli', domain: 'wipfli.com' },
  { name: 'Oracle', domain: 'oracle.com' },
  { name: 'Siemens Healthineers', domain: 'siemens-healthineers.com' },
  { name: 'Tesco', domain: 'tesco.com' },
];

export default function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const mousePos = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    // Also clear hover when mouse leaves the window
    const handleMouseLeave = () => {
      mousePos.current = { x: -1, y: -1 };
      document.querySelectorAll('.client-logo-item.is-hovered').forEach((el) => {
        el.classList.remove('is-hovered');
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const container = scrollRef.current;

    const scroll = () => {
      if (container && !isDragging) {
        const speed = window.innerWidth < 768 ? 2 : 1;
        container.scrollLeft += speed; // Auto-scroll speed
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      if (mousePos.current.x !== -1 && mousePos.current.y !== -1) {
        const element = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
        const logoContainer = element?.closest('.client-logo-item');

        document.querySelectorAll('.client-logo-item.is-hovered').forEach((el) => {
          if (el !== logoContainer) {
            el.classList.remove('is-hovered');
          }
        });

        if (logoContainer && !logoContainer.classList.contains('is-hovered')) {
          logoContainer.classList.add('is-hovered');
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(clientX - scrollRef.current.offsetLeft);
      setScrollLeftState(scrollRef.current.scrollLeft);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const container = scrollRef.current;
    const x = clientX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity

    let newScrollLeft = scrollLeftState - walk;

    if (newScrollLeft >= container.scrollWidth / 2) {
      newScrollLeft -= container.scrollWidth / 2;
      setStartX(clientX - container.offsetLeft);
      setScrollLeftState(newScrollLeft);
    } else if (newScrollLeft <= 0) {
      newScrollLeft += container.scrollWidth / 2;
      setStartX(clientX - container.offsetLeft);
      setScrollLeftState(newScrollLeft);
    }

    container.scrollLeft = newScrollLeft;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 md:py-24 bg-[#232621] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex flex-col items-center text-center max-w-[52rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6"
          >
            <Star className="w-4 h-4 text-[#ffea75] fill-[#ffea75]" />
            <span className="text-sm font-medium text-white">Proven Track Record</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 lg:whitespace-nowrap"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70"
          >
            We've partnered with reputed organizations to deliver exceptional engineering talent and
            AI solutions.
          </motion.p>
        </div>
      </div>

      <div className="relative w-full flex pt-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#232621] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#232621] to-transparent z-10 pointer-events-none" />

        {/* Draggable Marquee Container */}
        <div
          ref={scrollRef}
          onMouseDown={(e) => {
            handleDragStart(e.pageX);
          }}
          onMouseMove={(e) => {
            handleDragMove(e.pageX);
          }}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => {
            handleDragStart(e.touches[0].clientX);
          }}
          onTouchMove={(e) => {
            handleDragMove(e.touches[0].clientX);
          }}
          onTouchEnd={handleDragEnd}
          className={`flex w-full items-center py-4 overflow-x-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitUserSelect: 'none' }}
        >
          {/* First set of logos */}
          <div className="flex shrink-0 items-center gap-16 pr-16">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={`${client.name}-1`}
                className="client-logo-item w-40 md:w-48 shrink-0 flex flex-col items-center justify-center gap-4 grayscale opacity-50 transition-all duration-300 [&.is-hovered]:grayscale-0 [&.is-hovered]:opacity-100 group/logo"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl p-3 flex items-center justify-center shadow-inner ring-1 ring-white/10 transition-all pointer-events-none group-[.is-hovered]/logo:ring-white/20">
                  <img
                    src={client.imgUrl ?? `https://logo.clearbit.com/${client.domain}?size=256`}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!client.imgUrl && img.src.includes('clearbit.com')) {
                        img.src = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${client.domain}&size=256`;
                      } else {
                        img.style.display = 'none';
                        const nextSibling = img.nextElementSibling as HTMLElement | null;
                        if (nextSibling) {
                          nextSibling.style.display = 'block';
                        }
                      }
                    }}
                  />
                  <span className="hidden text-white/50 font-bold text-2xl tracking-wide pointer-events-none">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-400 font-medium text-sm md:text-base tracking-wide text-center pointer-events-none">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          {/* Second set of logos for seamless wrapping */}
          <div className="flex shrink-0 items-center gap-16 pr-16">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={`${client.name}-2`}
                className="client-logo-item w-40 md:w-48 shrink-0 flex flex-col items-center justify-center gap-4 grayscale opacity-50 transition-all duration-300 [&.is-hovered]:grayscale-0 [&.is-hovered]:opacity-100 group/logo"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl p-3 flex items-center justify-center shadow-inner ring-1 ring-white/10 transition-all pointer-events-none group-[.is-hovered]/logo:ring-white/20">
                  <img
                    src={client.imgUrl ?? `https://logo.clearbit.com/${client.domain}?size=256`}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!client.imgUrl && img.src.includes('clearbit.com')) {
                        img.src = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${client.domain}&size=256`;
                      } else {
                        img.style.display = 'none';
                        const nextSibling = img.nextElementSibling as HTMLElement | null;
                        if (nextSibling) {
                          nextSibling.style.display = 'block';
                        }
                      }
                    }}
                  />
                  <span className="hidden text-white/50 font-bold text-2xl tracking-wide pointer-events-none">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-400 font-medium text-sm md:text-base tracking-wide text-center pointer-events-none">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
