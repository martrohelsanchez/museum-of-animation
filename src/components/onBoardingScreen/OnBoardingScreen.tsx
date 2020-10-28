import {useAnimation, useMotionValue, useTransform} from 'framer-motion';
import {PanInfo} from 'framer-motion/types';
import React, { useState, useEffect } from 'react';

import * as S from './OnBoardingScreen.styles';

const pageBgColor = ['#db6400', '#bedbbb', '#edc988', '#fcdada', '#d9ecf2'];

function OnBoardingScreen() {
    const navCircleAnimate = useAnimation();
    const [pageNum, setPageNum] = useState(1);
    const grabX = useMotionValue(0);
    const grabXrange = [-500, 0, 500];
    const navScale = useTransform(grabX, grabXrange, [8, 1, 8]);
    const navRotateY = useTransform(grabX, grabXrange, [-89.5, 0, -89]);

    function handleClick() {
        navCircleAnimate.start({
            scale: [1, 8, 1],
            x: ['0%', '50%', '0%'],
            y: ['0%', '-100%', '0%'],
            rotateY: ['-0deg', '-90deg', '-180deg'],
            transition: {
                duration: 2
            }
        })
    }

    function onDrag(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    }

    return (
        <S.Bg
            // onClick={handleClick}
            bgColor={pageBgColor[pageNum - 1]}
        >
            <S.NavCircle
                animate={navCircleAnimate}
                style={{
                    perspective: 50,
                    scale: navScale,
                    rotateY: navRotateY
                }}
            >
                <S.Grab
                    drag='x'
                    onDrag={onDrag}
                    style={{
                        x: grabX
                    }}
                ></S.Grab>
            </S.NavCircle>
        </S.Bg>
    )
}

export default OnBoardingScreen;