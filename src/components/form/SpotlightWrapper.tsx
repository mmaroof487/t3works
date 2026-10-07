import { useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const SPOTLIGHT_RADIUS = '120px';

export default function SpotlightWrapper({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? SPOTLIGHT_RADIUS : '0px'} circle at ${mouseX}px ${mouseY}px,
            #4a5d23,
            transparent 80%
          )
        `,
      }}
      className="group/spotlight rounded-2xl p-[1.5px] transition duration-300"
    >
      {children}
    </motion.div>
  );
}
