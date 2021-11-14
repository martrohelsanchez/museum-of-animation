import styled from 'styled-components';
import { motion } from 'framer-motion';

import { parentsize } from 'src/shared/styles';

type ClipPathContainerProps = {
  clipPathId: string;
};

export const Container = styled.div`
  ${parentsize}
`;

export const LiquidSwipeSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Handle = styled(motion.div)`
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

export const ClipPathContainer = styled.div<ClipPathContainerProps>`
  height: 100%;
  width: 100%;
  clip-path: url(${(props) => props.clipPathId});
`;
