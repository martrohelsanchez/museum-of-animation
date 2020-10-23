import React, {useRef, useEffect, useState} from 'react';
import {MotionValue, PanInfo, AnimationControls, Variants} from 'framer-motion/types';
import {useTransform, useMotionValue} from 'framer-motion';

import * as S from './CardPaging.styles';

interface CardProps {
    color: string;
    i: number;
    pageX: MotionValue<number>;
    pageAnimation: AnimationControls;
    setOpenedPage: React.Dispatch<React.SetStateAction<number | null>>;
    openedPage: number | null;
    colors: string[];
}

function Page({color, i, pageX, pageAnimation, openedPage, setOpenedPage, colors}: CardProps) {
    const [count, setCount] = useState(0);
    const pageRef = useRef<HTMLDivElement>(null);
    const pageWith = pageRef.current?.getBoundingClientRect().width || 0;
    const pageScale = useTransform(pageX, [-(pageWith * i) - 50, -(pageWith * i), -(pageWith * i) + 50], [0.9, 1, 0.9]);
    const pageY = useMotionValue(0);

    useEffect(() => {
        //Refresh component to use the updated pageRef 
        setCount(c => ++c);
    }, []);

    function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (pageX.get() === 0) {
            if (pageY.get() > 60 || pageY.get() < -60) {
                setOpenedPage(null);
            }
        } else {
            if (info.offset.x > 0) {
                //Dragging direction is to the left
                const pagePassed = Math.round(info.offset.x / pageWith);
                const targetPageIndex = i - pagePassed;

                if (targetPageIndex < 0) {
                    pageAnimation.start({
                        x: 0
                    })
                } else {
                    pageAnimation.start({
                        x: -((i - pagePassed) * pageWith)
                    });
                }
            } else {
                //Dragging direction is to the right
                const pagePassed = (Math.round(info.offset.x / (pageWith))) * -1;
                const targetIndex = i + pagePassed

                if (targetIndex > colors.length - 1) {
                    pageAnimation.start({
                        x: -(colors.length - 1) * pageWith
                    })
                } else {
                    pageAnimation.start({
                        x: -(i + pagePassed) * pageWith
                    });
                }
            }
        }
    }

    function pageOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const dragX = -(i * closedPageWidth) - pageX.get();
        if (pageY.get() < 3 && pageY.get() > -3 && dragX < 3 && dragX > -3) {
            setOpenedPage(i);
        }
    }

    return (
        <S.Page 
            ref={pageRef}
            bgColor={color}
            drag={openedPage === null ? 'x' : 'y'}
            dragMomentum={false}
            animate={pageAnimation}
            style={{
                x: pageX,
                y: pageY,
                scale: pageScale
            }}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0
            }}
            onDragEnd={onDragEnd}
            onClick={pageOnClick}
        >
        </S.Page>
    )
}

export default Page;