import React, {useRef, useEffect, useState, useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {MotionValue, PanInfo, AnimationControls, Variants} from 'framer-motion/types';
import {useTransform} from 'framer-motion';

import * as S from './cardPaging.styles';
import useWindowSize from '../../hooks/useWindowSize';

interface CardProps {
    color: string;
    i: number;
    pageX: MotionValue<number>;
    pageY: MotionValue<number>;
    pageAnimation: AnimationControls;
    setOpenedPage: React.Dispatch<React.SetStateAction<number | null>>;
    setCurrClosedPage: React.Dispatch<React.SetStateAction<number>>;
    openedPage: number | null;
    colors: string[];
    cardPagingWidth: number;
}

let lastOpenedPage = 0;

function Page({
    color, 
    i, 
    pageX, 
    pageY, 
    pageAnimation, 
    setCurrClosedPage,
    openedPage, 
    setOpenedPage, 
    colors, 
    cardPagingWidth
}: CardProps) {
    const theme = useContext(ThemeContext);
    const windowSize = useWindowSize();
    const [, setCount] = useState(0);
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
        const pagePassed = getPagePassed(info.offset.x / closedPageWidth, 0.35);

        if (info.offset.x > 0) {
            //Dragging direction is to the left
            const targetPageIndex = i - pagePassed;

            if (targetPageIndex < 0) {
                pageAnimation.start({
                    x: 0
                })
            } else {
                pageAnimation.start({
                    x: -(targetPageIndex * closedPageWidth)
                });
                setCurrClosedPage(targetPageIndex);
            }

        } else {
            //Dragging direction is to the right
            const targetPageIndex = i + pagePassed

            if (targetPageIndex > colors.length - 1) {
                pageAnimation.start({
                    x: -(colors.length - 1) * closedPageWidth
                })
            } else {
                pageAnimation.start({
                    x: -(targetPageIndex) * closedPageWidth
                });
                setCurrClosedPage(targetPageIndex);
            }
        }
    }

    function getPagePassed(num: number, wiggleRoom: number) {
        num = Math.abs(num);
        const decimalPart = num % 1;

        if (decimalPart > wiggleRoom) {
            return Math.ceil(num);
        } else {
            return Math.floor(num);
        }
    }

    function pageOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const dragX = -(i * closedPageWidth) - pageX.get();
        if (pageY.get() < 3 && pageY.get() > -3 && dragX < 3 && dragX > -3) {
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
            variants={pageWrapper}
            custom={openedPage === null ? closedPageWidth : [cardPagingWidth - 20, openedPage]}
        >
            <S.Page
                bgColor={color}
                style={{
                    rotateY: openedPage === null ? pageRotateY : 0,
                    perspective: '600px'
                }}
                custom={windowSize.width <= parseInt(theme.mobile)}
                variants={pageVariant}
            >
                <S.SwipeUp
                    hide={openedPage === null ? true : false}
                    iconStyle={{
                        opacity: 0.4,
                        fill: 'white'
                    }}
                />
            </S.Page>
        </S.PageWrapper>
    )
}

const pageWrapper: Variants = {
    openPage: ([openedCardWidth, selectedPage]) => ({
        x: -(openedCardWidth * selectedPage)
    }),
    closePage: (closedPageWidth) => ({
        x: -(closedPageWidth * lastOpenedPage)
    })
}

const pageVariant: Variants = {
    openPage: (isMobile) => ({
        borderRadius: isMobile ? '10px' : '50px'
    }),
    closePage: {
        borderRadius: '20px'
    }
}

export default Page;