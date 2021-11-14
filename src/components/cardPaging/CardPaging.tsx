import React, { useState, useRef, useEffect } from 'react';

import * as S from './cardPaging.styles';
import { useMotionValue, useAnimation, Variants } from 'framer-motion';
import { PanInfo } from 'framer-motion/types';
import Page from './Page';
import { AnimationProps } from '../../types/animation';

//inspiration https://www.framer.com/examples/card-paging/

const colors = ['#cc0e74', '#1f3c88', '#a8dda8', '#ff9642', '#ffe05d'];

function CardPaging({ isAnimationInView }: AnimationProps) {
  const [, setCount] = useState(0);
  const [currOpenedPage, setCurrOpenedPage] = useState<number | null>(null);
  const [currClosedPage, setCurrClosedPage] = useState(0);
  const pageX = useMotionValue(0);
  const pageAnimation = useAnimation();
  const pageY = useMotionValue(0);
  const cardPagingRef = useRef<HTMLDivElement>(null!);
  const cardPagingWidthRef = useRef(0);

  useEffect(() => {
    cardPagingWidthRef.current =
      cardPagingRef.current.getBoundingClientRect().width;
    setCount((c) => ++c);
  }, []);

  function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.y > 60 || info.offset.y < -60) {
      setCurrOpenedPage(null);
    }
  }

  return (
    <S.CardPaging>
      <S.MobileView ref={cardPagingRef}>
        <S.Edge animate={currOpenedPage === null ? 'closePage' : 'openPage'}>
          <S.PageCont
            variants={pageContVariant}
            drag={currOpenedPage === null ? false : 'y'}
            onDragEnd={onDragEnd}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            style={{
              y: pageY,
              willChange: isAnimationInView ? 'height, width' : undefined,
            }}
          >
            {colors.map((color, i) => (
              <Page
                key={color}
                color={color}
                colors={colors}
                i={i}
                pageX={pageX}
                pageY={pageY}
                pageAnimation={pageAnimation}
                openedPage={currOpenedPage}
                setOpenedPage={setCurrOpenedPage}
                setCurrClosedPage={setCurrClosedPage}
                cardPagingWidth={cardPagingWidthRef.current}
              />
            ))}
            <S.SwipeLRCont>
              <S.SwipeLR
                hide={
                  currClosedPage === 0 || currOpenedPage !== null ? true : false
                }
                direction="left"
                iconStyle={{
                  opacity: 0.4,
                  fill: 'white',
                }}
              />
              <S.SwipeLR
                hide={
                  currClosedPage === colors.length - 1 ||
                  currOpenedPage !== null
                    ? true
                    : false
                }
                direction="right"
                iconStyle={{
                  opacity: 0.4,
                  fill: 'white',
                }}
              />
            </S.SwipeLRCont>
          </S.PageCont>
        </S.Edge>
      </S.MobileView>
    </S.CardPaging>
  );
}

function getCurrPage(pageWidth: number, y: number) {
  return pageWidth / y;
}

const pageContVariant: Variants = {
  openPage: {
    height: '100%',
    width: '100%',
  },
  closePage: {
    width: '70%',
    height: '50%',
  },
};

export default CardPaging;
