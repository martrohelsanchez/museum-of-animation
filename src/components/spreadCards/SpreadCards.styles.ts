import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Bg as bg, centerHorVer, parentsize } from '../../shared/styles';

export const Bg = styled(bg)`
  ${centerHorVer};
  background-color: #f4f6ff;
`;

export const CardCont = styled(motion.div)`
  position: relative;
  padding-top: min(50%, 450px);
  width: 28%;
  max-width: 300px;
`;

type CardProps = {
  bgImage: string;
  zIndex: number;
};

export const Card = styled(motion.div)<CardProps>`
  ${parentsize};
  background-image: url(${(props) => props.bgImage});
  z-index: ${(props) => props.zIndex};
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  background-size: auto 90%;
  background-repeat: no-repeat;
  background-position: center center;
  box-shadow: -40px 40px 60px -15px rgba(50, 50, 73, 0.3);

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    & {
      box-shadow: -20px 20px 30px -10px rgba(50, 50, 73, 0.3);
    }
  }
`;
