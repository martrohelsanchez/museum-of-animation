import React, {useState, useRef} from 'react';
import {useAnimation, useMotionValue, useTransform, motion} from 'framer-motion';
import {PanInfo} from 'framer-motion/types';

import * as S from './OnboardingScreen.styles';
import useWindowSize from '../../hooks/useWindowSize';
import {AnimationProps} from '../../shared/types';


const pageBgColor = ['#db6400', '#bedbbb', '#734046', '#fcdada', '#bedbbb'];

function OnBoardingScreen({isAnimationInView}: AnimationProps) {
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
    const nextColorAnimate = useAnimation();

    async function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        console.log(info.velocity.x)
        if (info.velocity.x > 500 || info.velocity.x < -500) {
            if (info.offset.x < 0 && pageNum < pageBgColor.length) {
                await navPage('next');
                await nextColorAnimate.start({
                    scale: 1
                });
                navAnimate.set({
                    backgroundColor: pageBgColor[pageNum + 1]
                })
                nextColorAnimate.set({
                    scale: 0
                })
                return null;
            } else if ((info.offset.x > 0 && pageNum > 1)) {
                navPage('back');
                return null;
            }
        }
        grabAnimate.start({
            x: 0
        });
    }

    function onDrag(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    }

    function onDragStart(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (pageNum > 1 && info.offset.x > 0) {
            navAnimate.set({
                backgroundColor: pageBgColor[pageNum - 2]
            })
        }
    }

    async function navPage(go: 'next' | 'back') {
        await grabAnimate.start({
            x: go === 'next' ? leftDragEnd : rightDragEnd,
            transition: {
                type: 'tween'
            }
        });

        grabAnimate.set({
            x: go === 'next' ? rightDragEnd : leftDragEnd
        });
        navAnimate.set({
            backgroundColor: pageBgColor[pageNum - 1]
        });
        
        setPageNum(c => go == 'next' ? ++c : --c);

        await grabAnimate.start({
            x: 0,
            transition: {
                type: 'tween'
            }
        });
    }

    return (
        <S.Bg
            as={motion.div}
            bgColor={pageBgColor[pageNum - 1]}
        >
            <S.NavCircle
                ref={navCircleRef}
                animate={navAnimate}
                style={{
                    perspective: 40,
                    scale: navScale,
                    rotateY: navRotateY
                }}
                bgColor={pageBgColor[pageNum]}
            >
                <S.Grab
                    drag='x'
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart}
                    // onDrag={onDrag}
                    style={{
                        x: grabX
                    }}
                    animate={grabAnimate}
                ></S.Grab>
                <S.NextColor
                    bgColor={pageBgColor[pageNum]}
                    animate={nextColorAnimate}
                    style={{
                        scale: 0
                    }}
                ></S.NextColor>
                {/* <S.Svg
                    viewBox="0 0 72 72"
                >
                    <S.Arrow 
                        points="72 35.99 68.76 39.23 36.01 6.49 3.24 39.25 0 36.01 32.77 3.24 36 0.01 36.01 0 72 35.99"
                        fill={pageBgColor[pageNum - 1]}
                    />
                </S.Svg> */}
            </S.NavCircle>
        </S.Bg>
    )
}

export default OnBoardingScreen;