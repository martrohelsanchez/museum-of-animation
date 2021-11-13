import React, { useState } from 'react';
import LiquidSlide from '../LiquidSlide';

import * as S from './styles';

type Props = {
  // children: React.ReactNode[];
  children: React.ReactNode;
};

const SVG_HEIGHT = 711;
const SVG_WIDTH = 391;

function LiquidSwipe(props: Props) {
  const { children } = props;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const renderLiquidSlides = [children].map((child, i) => {
    const isCurrentSlide = currentSlideIndex === i;

    function handleSwipeRelease() {
      setCurrentSlideIndex(i + 1);
    }

    return (
      <LiquidSlide
        isCurrentSlide={isCurrentSlide}
        key={i}
        onSwipeRelease={handleSwipeRelease}
      >
        {child}
      </LiquidSlide>
    );
  });

  return (
    <>
      <S.LiquidSwipeSvg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        {renderLiquidSlides}
      </S.LiquidSwipeSvg>
    </>
  );
}

export default LiquidSwipe;
