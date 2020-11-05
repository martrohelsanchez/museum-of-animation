import React, { useState } from 'react';
import {Variants} from 'framer-motion/types';
import {useMotionValue} from 'framer-motion';

import * as S from './TwitterLike.styles';
import {AnimationProps} from '../../shared/types';

function TwitterLike({isAnimationInView}: AnimationProps) {
    const [isLiked, setIsLiked] = useState(true);
    const waveBgColor = useMotionValue('#f15858');

    function onClick() {
        if (!isLiked) {
            waveBgColor.set('#f15858');
        }

        setIsLiked(!isLiked)
    }

    return (
        <S.TwitterLike
            animate={isLiked ? 'liked' : 'notLiked'}
            onClick={onClick}
        >
            <S.LikeCont>
                    <S.Svg 
                        height='68'
                        width='72'
                        variants={HeartSvgVariant}
                        style={{
                            willChange: isAnimationInView ? 'transform' : undefined
                        }}
                    >
                        <S.Heart 
                            d="M36,15.88a19.43,19.43,0,0,1,1.46-2.63,18.59,18.59,0,0,1,12-8.1A18.81,18.81,0,0,1,71.63,19.9a21.09,21.09,0,0,1,.09,7.39,34.81,34.81,0,0,1-5.9,14.21,65.89,65.89,0,0,1-10.1,11.58,109.91,109.91,0,0,1-18.57,13.8,2,2,0,0,1-2.29,0,112.26,112.26,0,0,1-14-9.84A83,83,0,0,1,10.17,46.73,47.42,47.42,0,0,1,2.3,34.39,28.57,28.57,0,0,1,0,23.8a18.82,18.82,0,0,1,35.83-8.27Z" 
                            variants={HearthVariant}
                            initial={{
                                fill: '#f15858'
                            }}
                        />
                    </S.Svg>
                <S.WaveOuter
                    variants={OuterWaveVariant}
                    onAnimationComplete={() => waveBgColor.set('transparent')}
                    custom='outer'
                    style={{
                        backgroundColor: waveBgColor,
                        willChange: isAnimationInView ? 'transform' : undefined
                    }}
                >
                    <S.WaveInner
                        variants={OuterWaveVariant}
                        custom='inner'
                    >
                    </S.WaveInner>
                </S.WaveOuter>
            </S.LikeCont>    
        </S.TwitterLike>
    )
}

const HeartSvgVariant: Variants = {
    liked: {
        scale: 2,
        transition: {
            type: 'spring',
            bounce: 200,
            damping: 5,
            stiffness: 250,
            delay: .1,
            restDelta: 0.001
        }
    },
    notLiked: {
        scale: 0,
    }
}

const HearthVariant: Variants = {
    liked: {
        fill: '#f15858'
    },
    notLiked: {
        fill: '#d7d7d7'
    }
}

const OuterWaveVariant: Variants = {
    liked: (wave: 'outer' | 'inner') => ({
        display: 'flex',
        scale: 2,
        backgroundColor: wave === 'outer' ? '#bb90c2' : '#cfecff',
        transition: {
            delayChildren: .1
        }
    }),
    notLiked: {
        scale: 0,
        display: 'none'
    }
}

export default TwitterLike;