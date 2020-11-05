import React, {useRef} from 'react';
import {useMotionValue, useTransform, PanInfo, useAnimation} from 'framer-motion';

import * as S from './calendar.styles';

interface PageProps {
    isLast: boolean;
    text: string;
    windowSize: {
        width: number;
        height: number;
    };
    addAnimationStack: (animation: () => Promise<void>) => void;
    flyAnimationsBack: () => void;
    isAnimationInView: boolean;
}

const flyOutSpring = {
    type: 'spring',
    stiffness: 30
}

const flyInSpring = {
    type: 'spring',
    stiffness: 30,
    mass: 2
}

function Page({
    isLast, 
    text, 
    windowSize, 
    addAnimationStack, 
    flyAnimationsBack,
    isAnimationInView
}: PageProps) {
    const pageRef = useRef<HTMLDivElement>(null!);
    const pageWidth = pageRef.current?.getBoundingClientRect().width || 0;

    const grabberX = useMotionValue(0);
    const grabberY = useMotionValue(0);
    const grabberXanimate = useAnimation();
    const rangeEnd = windowSize.width / 1.5 - pageWidth / 2;
    const grabberXrange = [-rangeEnd, 0, rangeEnd];

    const pageSkewX = useTransform(grabberX, grabberXrange, [-30, 0, 30]);
    const pageScale = useTransform(grabberX, grabberXrange, [0.7, 1, 0.7]);

    const wholePageX = useMotionValue(0);
    const wholePageAnimate = useAnimation();
    const wholePageRotate = useTransform(wholePageX, grabberXrange, [30, 0, -30]);

    const shadowScaleY = useTransform(grabberX, grabberXrange, [1.5, 1, 1.5]);
    const shadowSkewX = useTransform(grabberX, grabberXrange, [5, 0, -5]);
    
    function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const velocityX = info.velocity.x;

        if (velocityX <= 500 && velocityX >= -500) {
            grabberXanimate.start({
                x: 0,
                transition: {
                    type: 'spring',
                    mass: 2
                }
            })
            return null;
        }

        if (info.offset.x > 0) {
            flyOut('right')
        } else {
            flyOut('left')
        }
    }

    async function flyOut(direction: 'left' | 'right') {
        if (direction === 'left') {
            await wholePageAnimate.start({
                x: -windowSize.width,
                // y: -200,
                transition: {
                    ...flyOutSpring
                }
            })
        } else {
            await wholePageAnimate.start({
                x: windowSize.width,
                // y: -200,
                transition: {
                    ...flyOutSpring
                }
            })
        }

        addAnimationStack(flyIn);

        if (isLast) {
            flyAnimationsBack();
        }
    }

    async function flyIn(): Promise<void> {
        grabberXanimate.start({
            x: 0,
            transition: {
                ...flyInSpring,
                stiffness: 10
            }
        });
        await wholePageAnimate.start({
            x: 0,
            y: 0,
            transition: {
                ...flyInSpring
            }
        });
    }

    return (
        <S.Cont
            style={{
                rotate: wholePageRotate,
                x: wholePageX,
                willChange: isAnimationInView ? 'transform' : undefined
            }}
            animate={wholePageAnimate}
        >
            <S.StackElements>
                <S.Shadow
                    style={{
                        transformOrigin: 'top',
                        scaleY: shadowScaleY,
                        skewX: shadowSkewX,
                    }}
                >
                </S.Shadow>
                <S.Page
                    ref={pageRef}
                    style={{
                        skewX: pageSkewX,
                        transformOrigin: 'top',
                        scaleY: pageScale,
                    }}
                >
                    <S.StackElements>
                        <S.Content>
                            {text}
                        </S.Content>
                        <S.Grabber
                            drag='x'
                            onDragEnd={onDragEnd}
                            style={{
                                x: grabberX,
                                y: grabberY
                            }}
                            animate={grabberXanimate}
                            dragMomentum={false}
                        >
                        </S.Grabber>
                    </S.StackElements>
                </S.Page>
            </S.StackElements>
        </S.Cont>
    )
}

export default Page;