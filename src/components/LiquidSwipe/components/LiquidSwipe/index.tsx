import React, { useRef, useState } from 'react';
import LiquidSlide from '../LiquidSlide';

import * as S from './styles';

type Props = {
  children: React.ReactNode[];
};

function LiquidSwipe(props: Props) {
  const { children } = props;

  const colors = ['rgb(255,191,241)', '#333456', '#ECF87F'];

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const liquidSlideHeight =
    containerRef.current?.getBoundingClientRect().height || 0;
  const liquidSlideWidth =
    containerRef.current?.getBoundingClientRect().width || 0;

  const renderLiquidSlides = children.map((child, i) => {
    const isCurrentSlide = currentSlideIndex === i;

    function handleSwipeRelease() {
      setCurrentSlideIndex(i + 1);
    }

    return (
      <LiquidSlide
        clipPathId={`liquidSlide-${i}`}
        fill={colors[i]}
        height={liquidSlideHeight}
        width={liquidSlideWidth}
        isCurrentSlide={isCurrentSlide}
        key={i}
        onSwipeRelease={handleSwipeRelease}
      >
        {child}
      </LiquidSlide>
    );
  });

  const clipPaths = children.map((child, i) => {
    return (
      <S.ClipPathContainer clipPathId={`liquidSlide-${i}`}>
        {child}
      </S.ClipPathContainer>
    );
  });

  return (
    <>
      <S.Container ref={containerRef}>
        <S.LiquidSwipeSvg
          viewBox={`0 0 ${liquidSlideWidth} ${liquidSlideHeight}`}
        >
          {renderLiquidSlides}
        </S.LiquidSwipeSvg>
        {/* {clipPaths} */}
      </S.Container>
    </>
  );
}

export default LiquidSwipe;
