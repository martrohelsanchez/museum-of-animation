import React from 'react';
import { useAnimation } from 'framer-motion';

import { getRandomArbitrary, getRandomInt } from 'src/utils/math';

import * as S from './Space.styles';

import useWindowSize from '../../hooks/useWindowSize';
import astronaut from '../../images/astronaut.svg';
import asteroid from '../../images/asteroid.svg';
import { AnimationProps } from '../../types/animation';

function Space({ isAnimationInView }: AnimationProps) {
  const windowSize = useWindowSize();
  const particles = useAnimation();

  function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    particles.start({
      x: (e.clientX - windowSize.width / 2) / 20,
      y: (e.clientY - windowSize.height / 2) / 20,
    });
  }

  return (
    <S.Bg onMouseMove={onMouseMove}>
      {Array.from(Array(40).keys()).map((_, i) => {
        const dimension = getRandomInt(2, 10);
        return (
          <S.Particle
            key={i}
            style={{
              left: getRandomInt(0, windowSize.width),
              top: getRandomInt(0, windowSize.height),
              height: dimension,
              width: dimension,
              opacity: getRandomArbitrary(0.3, 1.5),
            }}
            animate={particles}
            transition={{
              type: 'spring',
              mass: 10,
              bounce: 0,
              damping: 30,
              stiffness: 60,
            }}
          ></S.Particle>
        );
      })}
      <S.Astronaut
        src={astronaut}
        drag
        dragConstraints={{
          left: -80,
          top: -200,
          bottom: windowSize.height - 300,
          right: windowSize.width - 190,
        }}
        style={{
          left: 80,
          top: 200,
          willChange: isAnimationInView ? 'transform' : undefined,
        }}
      />
      <S.Asteroid
        src={asteroid}
        drag
        dragConstraints={{
          left: -200,
          top: -60,
          bottom: windowSize.height - 120,
          right: windowSize.width - 275,
        }}
        style={{
          left: 200,
          top: 60,
        }}
      />
    </S.Bg>
  );
}

export default Space;
