import React, { useEffect, useRef } from 'react';
import {
  useTransform,
  useMotionValue,
  useSpring,
  useAnimation,
  PanInfo,
  Spring,
  MotionValue,
} from 'framer-motion';

import * as S from './styles';

const SVG_HEIGHT = 711;
const SVG_WIDTH = 391;
const HALF_SVG_HEIGHT = 711 / 2;
const INITIAL_X = 370;

const springConfig: Spring = {
  type: 'spring',
  mass: 1.3,
  damping: 5,
};

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

type Props = {
  children: React.ReactNode;
  isCurrentSlide: boolean;
  onSwipeRelease?: () => void;
};

function LiquidSlide(props: Props) {
  const { isCurrentSlide, onSwipeRelease } = props;

  const pathRef = useRef<SVGPathElement>(null!);

  const swipeHandleControls = useAnimation();

  const swipeHandleX = useMotionValue(0);
  const springX = useSpring(0, {
    bounce: 0.5,
    mass: 1.1,
  });

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
        INITIAL_X + swipeHandleXCurrent,
        HALF_SVG_HEIGHT - 50
      )} ${pointLocation(
        INITIAL_X + swipeHandleXCurrent,
        HALF_SVG_HEIGHT,
        true
      )}`;

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

  useEffect(() => {
    if (isCurrentSlide) {
      showHandle();
    }
  }, [isCurrentSlide]);

  function showHandle() {
    console.log('show handle');
    swipeHandleControls.start(
      {
        x: -40,
      },
      {
        ...springConfig,
      }
    );
  }

  function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    springX.set(370);
    swipeHandleControls.start(
      {
        x: -SVG_WIDTH,
      },
      {
        ...springConfig,
      }
    );

    if (onSwipeRelease) {
      onSwipeRelease();
    }
  }

  return (
    <>
      <S.LiquidSlidePath d={slideD} id="slide" ref={pathRef} />;
      <S.Handle
        animate={swipeHandleControls}
        cx={INITIAL_X + 25}
        cy={HALF_SVG_HEIGHT}
        drag="x"
        r={25}
        style={{
          x: swipeHandleX,
        }}
        onDragEnd={handleDragEnd}
      />
    </>
  );
}

export default LiquidSlide;
