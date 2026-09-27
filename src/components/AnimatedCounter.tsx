import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export function AnimatedCounter({ value, duration = 2.5 }: { value: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numValue = parseInt(value.replace(/,/g, '').replace(/\+/g, ''));
  const suffix = value.includes('+') ? '+' : '';
  const isComma = value.includes(',');

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numValue);
    }
  }, [isInView, numValue, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        let display = Math.round(latest).toString();
        if (isComma) {
          display = Number(display).toLocaleString();
        }
        ref.current.textContent = display + suffix;
      }
    });
  }, [springValue, suffix, isComma]);

  return <span ref={ref}>0{suffix}</span>;
}
