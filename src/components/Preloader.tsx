import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setIsDone(true);
    }, 500);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="font-batangas inline-flex items-baseline text-5xl text-white sm:text-6xl md:text-7xl">
            <span>t3</span>

            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={
                isDone
                  ? { clipPath: 'inset(0 -10% 0 0)', opacity: 1 }
                  : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }
              }
              transition={{ duration: 2.6, ease: EASE, delay: 0.2 }}
              className="ml-3"
            >
              AI
            </motion.span>

            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={
                isDone
                  ? { clipPath: 'inset(0 -10% 0 0)', opacity: 1 }
                  : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }
              }
              transition={{ duration: 2.8, ease: EASE, delay: 1.4 }}
              className="ml-3"
            >
              works
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
