import React from 'react';
import useCursorPositionInContainer from 'src/hooks/useTrackMouseInContainer';
import LiquidSlide from './components/LiquidSlide';
import LiquidSwipe from './components/LiquidSwipe';

import * as S from './styles';

function LiquidSwipeAnimation() {
  const { cursorPositionInContainer, handleMouseMoveInContainer } =
    useCursorPositionInContainer();

  return (
    <>
      <S.Container>
        {/* <S.MouseCoordinate>
          x: {cursorPositionInContainer.x}, y: {cursorPositionInContainer.y}
        </S.MouseCoordinate> */}
        <S.StyledMobileView>
          <LiquidSwipe>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </LiquidSwipe>
        </S.StyledMobileView>
      </S.Container>
    </>
  );
}

export default LiquidSwipeAnimation;
