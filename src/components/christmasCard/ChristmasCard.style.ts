import styled from 'styled-components';

import {
  Bg as bg,
  centerHorVer,
  StackElements as stackElements,
  parentsize,
} from '../../shared/styles';
import { motion } from 'framer-motion';

export const Bg = styled(bg)`
  ${centerHorVer};
  background-color: #f4f4f2;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const StackElements = styled(stackElements)`
  ${centerHorVer};
  position: sticky;
  top: 300px;
  width: 60%;
  max-width: 588px;
  padding-top: min(38.82%, 385px);
`;

export const StackCards = styled(stackElements)`
  ${parentsize};
`;

export const EnvelopeCont = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Envelope = styled(motion.img)`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const EnvelopeBack = styled(Envelope)`
  z-index: 1;
  box-shadow: -20px 10px 30px -10px rgba(50, 50, 73, 0.3);
`;

export const EnvelopeFront = styled(Envelope)`
  z-index: 5;
`;

export const EnvelopeFlap = styled(Envelope)`
  transform: rotate(180deg);
  z-index: 6;
`;

export const Pampahaba = styled.div`
  height: 1000%;
`;

export const CardCont = styled(motion.div)`
  position: absolute;
  top: 5%;
  width: 90%;
  height: 90%;
  z-index: 4;
  cursor: pointer;
  perspective: 1500;
`;

const Card = styled(motion.img)`
  ${parentsize};
  position: absolute;
  top: 0;
  transform: perspective(900px);
  transform-origin: top center;
`;

export const CardLeftBack = styled(Card)`
  backface-visibility: hidden;
  z-index: 5;
`;

const fullShadow = '-10px 30px 70px -10px rgba(50, 50, 73, 0.2)';

export const CardLeftFront = styled(Card)`
  z-index: 4;
  transform: perspective(900px);
  box-shadow: ${fullShadow};
`;

export const CardRightFront = styled(Card)`
  z-index: 3;
  box-shadow: ${fullShadow};
`;
