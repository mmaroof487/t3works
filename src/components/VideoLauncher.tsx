import { useCallback, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import VideoWindow, { type Rect } from './VideoWindow';

interface Props {
  src: string;
  /** still image for the card; without one, the first video frame is used (and captured as the window's poster) */
  poster?: string;
  label: string;
  alt?: string;
  className?: string;
  /** play-button artwork etc. layered over the media */
  children?: ReactNode;
  onDuration?: (seconds: number) => void;
}

// a clickable video card that expands into the macOS-style VideoWindow
export default function VideoLauncher({
  src,
  poster,
  label,
  alt = '',
  className = '',
  children,
  onDuration,
}: Props) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<Rect>({ top: 0, left: 0, width: 0, height: 0 });
  const [captured, setCaptured] = useState<string>();

  const measure = useCallback(() => {
    const r = cardRef.current?.getBoundingClientRect();
    if (r) setFrom({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, []);

  const openVideo = () => {
    measure();
    setOpen(true);
  };

  // re-measure so the window shrinks back onto the card even if the page moved
  const closeVideo = useCallback(() => {
    measure();
    setOpen(false);
    cardRef.current?.focus({ preventScroll: true });
  }, [measure]);

  const onFrame = (v: HTMLVideoElement) => {
    onDuration?.(v.duration);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      canvas.getContext('2d')?.drawImage(v, 0, 0);
      setCaptured(canvas.toDataURL('image/jpeg', 0.85));
    } catch {
      // no poster if the frame can't be read; the window just starts black
    }
  };

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        onClick={openVideo}
        aria-label={label}
        className={`group relative block overflow-hidden ${className}`}
      >
        {poster ? (
          <img src={poster} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <video
            src={`${src}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onLoadedData={(e) => {
              onFrame(e.currentTarget);
            }}
            className="h-full w-full object-cover"
          />
        )}
        {children}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <VideoWindow
              from={from}
              src={src}
              poster={poster ?? captured}
              reduceMotion={reduceMotion}
              onClose={closeVideo}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
