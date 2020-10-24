import React, {useRef, useEffect, useState} from 'react';
import {MotionValue, PanInfo, AnimationControls, Variants} from 'framer-motion/types';
import {useTransform} from 'framer-motion';

import * as S from './CardPaging.styles';

interface CardProps {
    color: string;
    i: number;
    pageX: MotionValue<number>;
    pageY: MotionValue<number>;
    pageAnimation: AnimationControls;
    setOpenedPage: React.Dispatch<React.SetStateAction<number | null>>;
    openedPage: number | null;
    colors: string[];
    cardPagingWidth: number;
}

let lastOpenedPage = 0;

function Page({color, i, pageX, pageY, pageAnimation, openedPage, setOpenedPage, colors, cardPagingWidth}: CardProps) {
    const [count, setCount] = useState(0);
    const pageRef = useRef<HTMLDivElement>(null);
    const closedPageWidthRef = useRef(0);
    const closedPageWidth = closedPageWidthRef.current;
    const input = [-(closedPageWidth * i) - closedPageWidth, -(closedPageWidth * i), -(closedPageWidth * i) + closedPageWidth];
    const pageScale = useTransform(pageX, input, [0.9, 1, 0.9]);
    const pageRotateY = useTransform(pageX, input, [45, 0, -45]);

    useEffect(() => {
        if (pageRef.current) {
            closedPageWidthRef.current = pageRef.current.getBoundingClientRect().width;
            //Rerender component to update closedPageWith
            setCount(c => ++c);
        }
    }, []);

    function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (pageX.get() === 0) {
            // if (pageY.get() > 60 || pageY.get() < -60) {
            //     setOpenedPage(null);
            // }
        } else {
            if (info.offset.x > 0) {
                //Dragging direction is to the left
                const pagePassed = getPagePassed(info.offset.x / closedPageWidth, 0.35);
                const targetPageIndex = i - pagePassed;

                if (targetPageIndex < 0) {
                    pageAnimation.start({
                        x: 0
                    })
                } else {
                    pageAnimation.start({
                        x: -(targetPageIndex * closedPageWidth)
                    });
                }
            } else {
                //Dragging direction is to the right
                const pagePassed = getPagePassed(info.offset.x / closedPageWidth, 0.35);
                const targetIndex = i + pagePassed

                if (targetIndex > colors.length - 1) {
                    pageAnimation.start({
                        x: -(colors.length - 1) * closedPageWidth
                    })
                } else {
                    pageAnimation.start({
                        x: -(targetIndex) * closedPageWidth
                    });
                }
            }
        }
    }

    function getPagePassed(num: number, wiggleRoom: number) {
        num = Math.abs(num);
        const decimalPart = num % 1;

        if (decimalPart > wiggleRoom) {
            return Math.ceil(num);
        } {
            return Math.floor(num);
        }
    }

    function pageOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const dragX = -(i * closedPageWidth) - pageX.get();
        if (pageY.get() < 3 && pageY.get() > -3 && dragX < 3 && dragX > -3) {
            document.documentElement.requestFullscreen();
            lastOpenedPage = i;
            setOpenedPage(i);
        }
    }

    return (
        <S.PageWrapper 
            ref={pageRef}
            drag={openedPage === null ? 'x' : false}
            dragMomentum={false}
            animate={pageAnimation}
            style={{
                x: pageX,
                scale: openedPage === null ? pageScale : 1,
            }}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0
            }}
            onDragEnd={onDragEnd}
            onClick={pageOnClick}
            variants={pageVariant}
            custom={openedPage === null ? closedPageWidth : [cardPagingWidth * 0.90, openedPage]}
        >
            <S.Page
                bgColor={color}
                style={{
                    rotateY: openedPage === null ? pageRotateY : 0,
                    perspective: '600px'
                }}
            >
                <S.SwipeSvg 
                    viewBox="0 0 72 39.25"
                    hide={openedPage === null ? true : false}
                >
                    <S.Swipe 
                        points="72 35.99 68.76 39.23 36.01 6.49 3.24 39.25 0 36.01 32.77 3.24 36 0.01 36.01 0 72 35.99" 
                    />
                </S.SwipeSvg>
            </S.Page>
        </S.PageWrapper>
    )
}

const pageVariant: Variants = {
    openPage: ([openedCardWidth, selectedPage]) => ({
        x: -(openedCardWidth * selectedPage)
    }),
    closePage: (closedPageWidth) => ({
        x: -(closedPageWidth * lastOpenedPage)
    })
}

export default Page;