import React, { useState, useRef } from 'react';
import { useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { PanInfo } from 'framer-motion/types';

import useWindowSize from '../../hooks/useWindowSize';
import PageContainer from './components/PageContainer';

import * as S from './styles';

const pageBgColor = [
  '#5f3fd4',
  '#ffbff1',
  '#fff8cd',
  '#5f3fd4',
  '#ffbff1',
  '#fff8cd',
  '#5f3fd4',
  '#ffbff1',
  '#fff8cd',
  '#5f3fd4',
  '#ffbff1',
  '#fff8cd',
];

function OnBoardingScreen() {
  const windowSize = useWindowSize();
  const leftScreenEnd = -windowSize.width / 2;
  const rightScreenEnd = windowSize.width / 2;

  const [pageNum, setPageNum] = useState(0);
  const arrowIconRef = useRef<SVGSVGElement>(null!);

  const invisibleHandleX = useMotionValue(0);
  const invisibleHandleXrange = [leftScreenEnd, 0, rightScreenEnd];
  const invisibleHandleAnimation = useAnimation();
  const navCircleAnimation = useAnimation();
  const navScale = useTransform(
    invisibleHandleX,
    invisibleHandleXrange,
    [8, 1, 8]
  );
  const navRotateY = useTransform(
    invisibleHandleX,
    invisibleHandleXrange,
    [-89, 0, 89]
  );
  const nextColorAnimation = useAnimation();
  const innerScreenAnimation = useAnimation();

  function showSwipeArrowIcon(pageNum: number) {
    if (pageNum < pageBgColor.length) {
      arrowIconRef.current.style.display = 'block';
    }
  }

  async function movePage(go: 'next' | 'back') {
    await invisibleHandleAnimation.start({
      x: go === 'next' ? leftScreenEnd : rightScreenEnd,
      transition: {
        type: 'tween',
      },
    });

    navCircleAnimation.set({
      backgroundColor: pageBgColor[pageNum],
    });
    innerScreenAnimation.set({
      backgroundColor:
        go === 'next' ? pageBgColor[pageNum + 1] : pageBgColor[pageNum - 1],
    });
    invisibleHandleAnimation.set({
      x: go === 'next' ? rightScreenEnd : leftScreenEnd,
    });

    await invisibleHandleAnimation.start({
      x: 0,
      transition: {
        type: 'tween',
      },
    });

    setPageNum((c) => (go === 'next' ? c + 1 : c - 1));
  }

  function onDragStart(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (pageNum > 0 && info.offset.x > 0) {
      navCircleAnimation.set({
        backgroundColor: pageBgColor[pageNum - 1],
      });
    }
    arrowIconRef.current.style.display = 'none';
  }

  async function onDragEnd(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const wasFlicked = isPositive(info.velocity.x)
      ? info.velocity.x > 100
      : info.velocity.x < -100;

    if (wasFlicked && info.offset.x < 0 && pageNum + 1 < pageBgColor.length) {
      await movePage('next');
      nextColorAnimation.set({
        backgroundColor: pageBgColor[pageNum + 2],
      });
      await nextColorAnimation.start({
        scale: 1,
      });
      navCircleAnimation.set({
        backgroundColor: pageBgColor[pageNum + 2],
      });
      nextColorAnimation.set({
        scale: 0,
      });
      showSwipeArrowIcon(pageNum + 1);

      return null;
    } else if (wasFlicked && info.offset.x > 0 && pageNum > 0) {
      await movePage('back');
      showSwipeArrowIcon(pageNum - 1);
      return null;
    }

    await invisibleHandleAnimation.start({
      x: 0,
      transition: {
        type: 'tween',
      },
    });
    showSwipeArrowIcon(pageNum);
  }

  return (
    <PageContainer
      innerScreenStyle={{ backgroundColor: pageBgColor[pageNum] }}
      innerScreenAnimate={innerScreenAnimation}
    >
      <S.InvisibleHandle
        drag="x"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        style={{
          x: invisibleHandleX,
        }}
        animate={invisibleHandleAnimation}
      />
      <S.NavCircle
        animate={navCircleAnimation}
        style={{
          perspective: 40,
          scale: navScale,
          rotateY: navRotateY,
        }}
        bgColor={pageBgColor[pageNum + 1]}
      >
        <S.NextColor
          animate={nextColorAnimation}
          style={{
            scale: 0,
          }}
        />
        <S.ArrowIcon
          ref={arrowIconRef}
          iconStyle={{
            fill: pageBgColor[pageNum],
          }}
        />
      </S.NavCircle>
    </PageContainer>
  );
}

function isPositive(number: number) {
  return number >= 0;
}

export default OnBoardingScreen;
