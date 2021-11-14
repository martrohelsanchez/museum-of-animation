import React, { useState, useRef, useEffect } from 'react';
import {
  useAnimation,
  useMotionValue,
  useTransform,
  motion,
} from 'framer-motion';
import { PanInfo } from 'framer-motion/types';

import * as S from './OnboardingScreen.styles';
import useWindowSize from '../../hooks/useWindowSize';
import { AnimationProps } from '../../types/animation';

//inspiration 0:40 https://www.youtube.com/watch?v=gq9w14ag0ls&t=40s

const pageBgColor = [
  '#5f3fd4',
  '#ffbff1',
  '#FFFFFF',
  '#db6400',
  '#bedbbb',
  '#734046',
];

function OnBoardingScreen(props: AnimationProps) {
  const windowSize = useWindowSize();
  const leftDragEnd = -windowSize.width / 2;
  const rightDragEnd = windowSize.width / 2;
  const [pageNum, setPageNum] = useState(1);
  const navCircleRef = useRef<HTMLDivElement>(null!);

  const grabX = useMotionValue(0);
  const grabXrange = [leftDragEnd, 0, rightDragEnd];
  const grabAnimate = useAnimation();
  const navAnimate = useAnimation();
  const navScale = useTransform(grabX, grabXrange, [8, 1, 8]);
  const navRotateY = useTransform(grabX, grabXrange, [-89, 0, 89]);
  const swipeDisplay = useMotionValue('block');
  const InnerScreenColor = useMotionValue(pageBgColor[0]);
  const nextColorAnimate = useAnimation();

  function showSwipe(pageNum: number) {
    if (pageNum < pageBgColor.length) {
      swipeDisplay.set('block');
    }
  }

  async function navPage(go: 'next' | 'back') {
    await grabAnimate.start({
      x: go === 'next' ? leftDragEnd : rightDragEnd,
      transition: {
        type: 'tween',
      },
    });

    navAnimate.set({
      backgroundColor: pageBgColor[pageNum - 1],
    });
    InnerScreenColor.set(
      go === 'next' ? pageBgColor[pageNum] : pageBgColor[pageNum - 2]
    );
    grabAnimate.set({
      x: go === 'next' ? rightDragEnd : leftDragEnd,
    });

    await grabAnimate.start({
      x: 0,
      transition: {
        type: 'tween',
      },
    });

    setPageNum((c) => (go === 'next' ? ++c : --c));
  }

  function onDragStart(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (pageNum > 1 && info.offset.x > 0) {
      navAnimate.set({
        backgroundColor: pageBgColor[pageNum - 2],
      });
    }
    swipeDisplay.set('none');
  }

  async function onDragEnd(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.velocity.x > 100 || info.velocity.x < -50) {
      if (info.offset.x < 0 && pageNum < pageBgColor.length) {
        await navPage('next');
        await nextColorAnimate.start({
          scale: 1,
        });
        navAnimate.set({
          backgroundColor: pageBgColor[pageNum + 1],
        });
        nextColorAnimate.set({
          scale: 0,
        });
        showSwipe(pageNum + 1);
        return null;
      } else if (info.offset.x > 0 && pageNum > 1) {
        await navPage('back');
        showSwipe(pageNum - 1);
        return null;
      }
    }
    await grabAnimate.start({
      x: 0,
      transition: {
        type: 'tween',
      },
    });
    showSwipe(pageNum);
  }

  return (
    <S.Bg
      as={motion.div}
      style={{
        backgroundColor: pageBgColor[1],
      }}
    >
      <S.MobileView>
        <S.InnerScreen
          as={motion.div}
          style={{
            backgroundColor: InnerScreenColor,
          }}
        >
          <S.NavCircle
            ref={navCircleRef}
            animate={navAnimate}
            style={{
              perspective: 40,
              scale: navScale,
              rotateY: navRotateY,
            }}
            bgColor={pageBgColor[pageNum]}
          >
            <S.Grab
              drag="x"
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
              style={{
                x: grabX,
              }}
              animate={grabAnimate}
            ></S.Grab>
            <S.NextColor
              bgColor={pageBgColor[pageNum]}
              animate={nextColorAnimate}
              style={{
                scale: 0,
              }}
            ></S.NextColor>
            <S.Swipe
              iconStyle={{
                fill: pageBgColor[pageNum - 1],
              }}
              svgStyle={{
                display: swipeDisplay,
              }}
            />
          </S.NavCircle>
        </S.InnerScreen>
      </S.MobileView>
    </S.Bg>
  );
}

export default OnBoardingScreen;
