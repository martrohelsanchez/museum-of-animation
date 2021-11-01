import {
  useAnimation,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import React, { useState } from 'react';
import useCursorPositionInContainer from 'src/hooks/useTrackMouseInContainer';

import * as S from './styles';

const SVG_HEIGHT = 711;
const SVG_WIDTH = 391;

const HALF_SVG_HEIGHT = 711 / 2;

type PointerLocation = {
  x: number;
  y: number;
  isAnchorPoint: boolean;
};

const pointersLocation: PointerLocation[] = [];

function pointLocation(x: number, y: number, isAnchorPoint?: boolean) {
  // pointersLocation.push({
  //   x,
  //   y,
  //   isAnchorPoint: !!isAnchorPoint,
  // });

  return `${x} ${y}`;
}

console.log(pointersLocation);

function LiquidSwipe() {
  const { cursorPositionInContainer, handleMouseMoveInContainer } =
    useCursorPositionInContainer();

  const swipeHandleX = useMotionValue(0);
  const slideD = useTransform(swipeHandleX, (swipeHandleXCurrent) => {
    const bCurve1 = `C 370 0 ${pointLocation(
      370,
      HALF_SVG_HEIGHT - 150 + swipeHandleXCurrent * 2
    )} ${pointLocation(
      370,
      HALF_SVG_HEIGHT - 100 + swipeHandleXCurrent,
      true
    )}`;

    const bCurve2 = `S ${pointLocation(
      330 + swipeHandleXCurrent,
      HALF_SVG_HEIGHT - 50
    )} ${pointLocation(330 + swipeHandleXCurrent, HALF_SVG_HEIGHT, true)}`;

    const bCurve3 = `S ${pointLocation(
      370,
      HALF_SVG_HEIGHT + 50
    )} ${pointLocation(
      370,
      HALF_SVG_HEIGHT + 100 - swipeHandleXCurrent,
      true
    )}`;

    const bCurve4 = `L 370 ${SVG_HEIGHT}`;

    return `M 370 0, ${bCurve1}, ${bCurve2}, ${bCurve3}, ${bCurve4}, H ${SVG_WIDTH} ${SVG_HEIGHT}, L ${SVG_WIDTH} 0, Z`;
  });

  const renderPointers = pointersLocation.map((pointer, i) => (
    <circle
      key={i}
      id="pointer"
      cx={pointer.x}
      cy={pointer.y}
      r="6"
      fill={pointer.isAnchorPoint ? 'black' : 'white'}
    />
  ));

  return (
    <>
      <S.LiquidSwipeGlobalStyle />
      <S.Container>
        <S.MouseCoordinate>
          x: {cursorPositionInContainer.x}, y: {cursorPositionInContainer.y}
        </S.MouseCoordinate>
        <S.StyledMobileView>
          <S.InnerMobilView>
            <S.SwipeHandle
              drag="x"
              dragConstraints={{ left: 0 }}
              style={{
                x: swipeHandleX,
              }}
            ></S.SwipeHandle>
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT}
              xmlns="http://www.w3.org/2000/svg"
              onMouseMove={handleMouseMoveInContainer}
            >
              <S.Slide id="slide" d={slideD} />
              {renderPointers}
            </svg>
          </S.InnerMobilView>
        </S.StyledMobileView>
      </S.Container>
    </>
  );
}

export default LiquidSwipe;
