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
import useRerender from 'src/hooks/useRerender';

// const SVG_HEIGHT = 711;
// const SVG_WIDTH = 391;
// const HALF_SVG_HEIGHT = 711 / 2;

const springConfig: Spring = {
  type: 'spring',
  mass: 1.3,
  damping: 5,
};

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

type Props = {
  children: React.ReactNode;
  clipPathId: string;
  fill: string;
  height: number;
  isCurrentSlide: boolean;
  width: number;
  onSwipeRelease?: () => void;
};

function LiquidSlide(props: Props) {
  const { clipPathId, fill, height, isCurrentSlide, width, onSwipeRelease } =
    props;

  const halfHeight = height / 2;
  const halfWidth = width / 2;

  const rerender = useRerender();
  const pathRef = useRef<SVGPathElement>(null!);

  const swipeHandleControls = useAnimation();

  const swipeHandleX = useMotionValue(0);
  const springX = useSpring(0);

  const slideD = useTransform(
    [swipeHandleX, springX] as any,
    (params: number[]) => {
      const [swipeHandleXCurrent, springXCurrent] = params;

      const bCurve1 = `C ${width - springXCurrent} 0 ${pointLocation(
        width - springXCurrent,
        halfHeight - 150 + swipeHandleXCurrent * 2
      )} ${pointLocation(
        width - springXCurrent,
        halfHeight - 100 + swipeHandleXCurrent,
        true
      )}`;

      const bCurve2 = `S ${pointLocation(
        width + swipeHandleXCurrent,
        halfHeight - 50
      )} ${pointLocation(width + swipeHandleXCurrent, halfHeight, true)}`;

      const bCurve3 = `S ${pointLocation(
        width - springXCurrent,
        halfHeight + 50
      )} ${pointLocation(
        width - springXCurrent,
        halfHeight + 100 - swipeHandleXCurrent,
        true
      )}`;

      return `M ${
        width - springXCurrent
      } 0, ${bCurve1}, ${bCurve2}, ${bCurve3}, V ${height}, H ${width}, V 0, Z`;
    }
  );

  useEffect(() => {
    if (isCurrentSlide) {
      showHandle();
    }
  }, [isCurrentSlide]);

  async function showHandle() {
    springX.set(10);

    await swipeHandleControls.start(
      {
        x: -40,
      },
      {
        ...springConfig,
      }
    );

    rerender();
  }

  async function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    springX.set(halfWidth / 2);

    await swipeHandleControls.start(
      {
        x: -width - 100,
      },
      {
        stiffness: 500,
      }
    );

    springX.set(width);

    await swipeHandleControls.start(
      {
        x: -width + 140,
      },
      {
        stiffness: 500,
      }
    );

    await swipeHandleControls.start(
      {
        x: -width,
      },
      {
        stiffness: 500,
      }
    );

    if (onSwipeRelease) {
      onSwipeRelease();
    }
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
      {/* <clipPath id={clipPathId}> */}
      <S.LiquidSlidePath d={slideD} id="slide" ref={pathRef} fill={fill} />;
      <S.Handle
        animate={swipeHandleControls}
        cx={width + 25}
        cy={halfHeight}
        drag="x"
        r={25}
        style={{
          x: swipeHandleX,
        }}
        onDragEnd={handleDragEnd}
      />
      {/* </clipPath> */}
      {renderPointers}
    </>
  );
}
export default LiquidSlide;
