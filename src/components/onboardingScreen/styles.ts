import styled from 'styled-components';
import { motion } from 'framer-motion';

import swipe from '../Swipe';

export const NavCircle = styled(motion.div)<{ bgColor: string }>`
  position: relative;
  background-color: ${({ bgColor }) => bgColor};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform;
  margin-left: -100px;

  &:active {
    cursor: grabbing;
  }
`;

export const InvisibleHandle = styled(motion.div)`
  width: 100px;
  height: 100px;
  position: relative;
  top: 0;
  left: 0;
  background-color: transparent;
  border-radius: 50%;
  z-index: 100;
  cursor: grab;
`;

export const NextColorCont = styled(InvisibleHandle)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

export const NextColor = styled(InvisibleHandle)``;

export const ArrowIcon = styled(swipe)`
  position: absolute;
  width: 40%;
  transform: rotate(90deg);
`;
