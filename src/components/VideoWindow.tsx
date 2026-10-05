import { useEffect, useRef, useState } from 'react';
import { motion, useIsPresent } from 'framer-motion';
import { X } from 'lucide-react';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 16;

// the window fills the viewport minus the floating nav (top on desktop, bottom on mobile), with padding;
// 16:9 matches the video so nothing is letterboxed
function targetRect(): Rect {
  const nav = document.querySelector('header')?.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let top = PAD;
  let bottom = PAD;
  if (nav) {
    if (nav.top > vh / 2) bottom = vh - nav.top + PAD;
    else top = nav.bottom + PAD;
  }
  // fit a 16:9 frame inside the free area and centre it, so the video fills it with no bars
  const availW = vw - PAD * 2;
  const availH = vh - top - bottom;
  const width = Math.min(availW, (availH * 16) / 9);
  const height = (width * 9) / 16;
  return { top: top + (availH - height) / 2, left: (vw - width) / 2, width, height };
}

interface Props {
  from: Rect;
  src: string;
  poster: string;
  reduceMotion: boolean;
  onClose: () => void;
}

export default function VideoWindow({ from, src, poster, reduceMotion, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPresent = useIsPresent();

  // the video is only mounted once the window has finished growing (and dropped as soon as it
  // starts closing), so decoding never competes with the animation
  const [ready, setReady] = useState(false);
  const showVideo = ready && isPresent;

  useEffect(() => {
    if (showVideo) videoRef.current?.play().catch(() => undefined);
  }, [showVideo]);

  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // closed = the card's rect; open = the padded area under the nav
  const variants = {
    closed: (r: Rect) => ({
      ...r,
      borderRadius: 32,
      opacity: reduceMotion ? 0 : 1,
      transition: reduceMotion
        ? { duration: 0.2 }
        : { type: 'spring' as const, stiffness: 320, damping: 36, mass: 0.9 },
    }),
    open: () => ({
      ...targetRect(),
      borderRadius: 20,
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.2 }
        : { type: 'spring' as const, stiffness: 240, damping: 30, mass: 0.9 },
    }),
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[90] overscroll-contain">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="T3 AI Works video"
        custom={from}
        variants={variants}
        initial="closed"
        animate="open"
        exit="closed"
        onAnimationComplete={(def) => {
          if (def === 'open') setReady(true);
        }}
        className="fixed overflow-hidden bg-black shadow-2xl"
        style={{ position: 'fixed' }}
      >
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {showVideo && (
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          onClick={onClose}
          autoFocus
          aria-label="Close video"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </div>
  );
}
