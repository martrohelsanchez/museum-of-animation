import { motion } from 'framer-motion';
import { MobileView } from 'src/shared/styles';
import styled, { createGlobalStyle } from 'styled-components';

import { FlexCenter } from '../styledCommon';

export const LiquidSwipeGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

export const Container = styled(FlexCenter)`
  height: 100%;
  width: 100%;
  background-color: #51adcf;
  position: relative;
`;

export const StyledMobileView = styled(MobileView)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerMobilView = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 60px;
  background: #51adcf;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MouseCoordinate = styled.p`
  position: absolute;
  left: 50px;
  top: 50px;
`;

export const Slide = styled(motion.path)``;