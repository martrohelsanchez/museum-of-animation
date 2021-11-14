import React, { useState } from 'react';
import LiquidSlide from '../LiquidSlide';

import * as S from './styles';

type Props = {
  children: React.ReactNode[];
  // children: React.ReactNode;
};

const SVG_HEIGHT = 711;
const SVG_WIDTH = 391;

function LiquidSwipe(props: Props) {
  const { children } = props;

  const colors = ['rgb(255,191,241)', '#333456', '#ECF87F'];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const renderLiquidSlides = children.map((child, i) => {
    const isCurrentSlide = currentSlideIndex === i;

    function handleSwipeRelease() {
      setCurrentSlideIndex(i + 1);
    }

    return (
      <LiquidSlide
        clipPathId={`liquidSlide-${i}`}
        fill={colors[i]}
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
      <S.LiquidSwipeSvg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        {renderLiquidSlides}
      </S.LiquidSwipeSvg>
      {/* {clipPaths} */}
    </>
  );
}

export default LiquidSwipe;
