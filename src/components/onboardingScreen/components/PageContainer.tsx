import {
  AnimationControls,
  motion,
  MotionStyle,
  TargetAndTransition,
  VariantLabels,
} from 'framer-motion';
import React from 'react';
import {
  Bg,
  centerHorVer,
  parentsize,
  MobileView as mobileView,
} from 'src/shared/styles';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  innerScreenStyle?: MotionStyle;
  innerScreenRef?: React.MutableRefObject<HTMLDivElement>;
  innerScreenAnimate?:
    | boolean
    | VariantLabels
    | AnimationControls
    | TargetAndTransition
    | undefined;
};

function PageContainer(props: Props) {
  const { children, innerScreenStyle, innerScreenRef, innerScreenAnimate } =
    props;
  return (
    <Container as={motion.div}>
      <StyledMobileView>
        <InnerScreen
          animate={innerScreenAnimate}
          as={motion.div}
          style={innerScreenStyle}
          ref={innerScreenRef}
        >
          {children}
        </InnerScreen>
      </StyledMobileView>
    </Container>
  );
}

export const Container = styled(Bg)`
  ${centerHorVer};
  background: #ffbff1;
`;

export const StyledMobileView = styled(mobileView)`
  ${centerHorVer};

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    & {
      padding: 0;
    }
  }
`;

export const InnerScreen = styled(motion.div)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  ${parentsize};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 50px;

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    & {
      border-radius: 0;
    }
  }
`;

export default PageContainer;
