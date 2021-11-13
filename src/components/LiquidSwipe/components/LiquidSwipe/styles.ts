import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LiquidSwipeSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Handle = styled(motion.div)`
  /* background: rgb(255, 191, 241); */
  background: black;
  background: transparent;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  z-index: 99;
  cursor: grab;
  position: absolute;
  left: 330px;
`;
