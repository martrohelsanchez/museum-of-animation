import React from 'react';
import { motion, MotionStyle } from 'framer-motion';

interface SwipeProps {
  iconStyle?: MotionStyle;
  svgStyle?: MotionStyle;
  className?: string;
}

function Swipe({ iconStyle, svgStyle, className }: SwipeProps) {
  return (
    <motion.svg viewBox="0 0 72 39.25" style={svgStyle} className={className}>
      <motion.polygon
        points="72 35.99 68.76 39.23 36.01 6.49 3.24 39.25 0 36.01 32.77 3.24 36 0.01 36.01 0 72 35.99"
        style={iconStyle}
      />
    </motion.svg>
  );
}

export default Swipe;
