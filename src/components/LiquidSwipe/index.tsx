import {
  PanInfo,
  Spring,
  useAnimation,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import React, { useRef, useState } from 'react';
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

  let newX;
  let newY;

  if (x >= 0) {
    newX = x;
  } else {
    newX = x * -1;
  }

  if (y >= 0) {
    newY = y;
  } else {
    newY = y * -1;
  }

  // return `${newX} ${newY}`;
  return `${x} ${y}`;
}

const springConfig: Spring = {
  type: 'spring',
  mass: 1.3,
  damping: 5,
};

const INITIAL_X = 370;

function LiquidSwipe() {
  const { cursorPositionInContainer, handleMouseMoveInContainer } =
    useCursorPositionInContainer();

  const pathRef = useRef<SVGPathElement>(null!);
  const swipeHandleX = useMotionValue(0);
  const springX = useSpring(0, {
    bounce: 0.5,
    mass: 1.1,
  });
  const swipeHandleControls = useAnimation();

  const slideD = useTransform(
    [swipeHandleX, springX] as any,
    (params: number[]) => {
      const [swipeHandleXCurrent, springXCurrent] = params;

      const bCurve1 = `C 370 0 ${pointLocation(
        INITIAL_X - springXCurrent,
        HALF_SVG_HEIGHT - 150 + swipeHandleXCurrent * 2
      )} ${pointLocation(
        INITIAL_X - springXCurrent,
        HALF_SVG_HEIGHT - 100 + swipeHandleXCurrent,
        true
      )}`;

      const bCurve2 = `S ${pointLocation(
        330 + swipeHandleXCurrent,
        HALF_SVG_HEIGHT - 50
      )} ${pointLocation(330 + swipeHandleXCurrent, HALF_SVG_HEIGHT, true)}`;

      const bCurve3 = `S ${pointLocation(
        INITIAL_X - springXCurrent,
        HALF_SVG_HEIGHT + 50
      )} ${pointLocation(
        INITIAL_X - springXCurrent,
        HALF_SVG_HEIGHT + 100 - swipeHandleXCurrent,
        true
      )}`;

      return `M ${
        INITIAL_X + springXCurrent
      } 0, ${bCurve1}, ${bCurve2}, ${bCurve3}, V ${SVG_HEIGHT}, H ${SVG_WIDTH}, V 0, Z`;
    }
  );

  function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    springX.set(370);
    swipeHandleControls.start(
      {
        x: (SVG_WIDTH - 60) * -1,
      },
      {
        ...springConfig,
      }
    );
  }

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
              animate={swipeHandleControls}
              drag="x"
              style={{
                x: swipeHandleX,
              }}
              onDragEnd={handleDragEnd}
            ></S.SwipeHandle>
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              onMouseMove={handleMouseMoveInContainer}
            >
              <S.Slide d={slideD} id="slide" ref={pathRef} />
              {renderPointers}
            </svg>
          </S.InnerMobilView>
        </S.StyledMobileView>
      </S.Container>
    </>
  );
}

export default LiquidSwipe;

// set the initial value of path.
// on drag end change the x position of bcurve 1 and 2
