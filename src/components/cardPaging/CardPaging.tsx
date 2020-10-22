import React, { useState, useRef, useEffect } from 'react';

import * as S from './CardPaging.styles';
import {useMotionValue, useTransform, useAnimation} from 'framer-motion';

const colors = ['#cc0e74', '#1f3c88', '#a8dda8', '#ff9642', '#ffe05d'];

function CardPaging() {
    const [currPageIndex, setCurrPageIndex] = useState(0);
    const pageX = useMotionValue(0);
    const pageScale = useTransform(pageX, [-50, 0, 50], [0.9, 1, 0.9]);
    const pageScrollRef = useRef<HTMLDivElement>(null!);
    const pageAnimate = useAnimation();

    useEffect(() => {
        pageX.onChange(x => {
            const pageScrollWidth = pageScrollRef.current.getBoundingClientRect().width;
            if (pageX.get() > 100) {
                setCurrPageIndex(i => ++i);
            } else if (pageX.get() < -100) {
                setCurrPageIndex(i => --i);
            }
        });
    }, [])

    function onPageScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        const pageScrollWidth = e.currentTarget.getBoundingClientRect().width;

        // console.log(pageScrollWidth);
        pageX.set(e.currentTarget.scrollLeft - pageScrollWidth * currPageIndex);
    }

    function userStopScrolling() {
    }

    function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        // userStopScrolling()
    }

    return (
        <S.CardPaging>
            <S.MobileView>
                <S.PageCont
                    layout
                    ref={pageScrollRef}
                    onScroll={onPageScroll}
                    onTouchEnd={onTouchEnd}
                    animate={pageAnimate}
                >
                    {colors.map((color, i) => (
                        <S.Page 
                            key={color}
                            bgColor={color}
                            style={{
                                scale: i === currPageIndex ? pageScale : 1
                            }}
                        >
                        </S.Page>
                    ))}
                </S.PageCont>
            </S.MobileView>
        </S.CardPaging>
    )
}

export default CardPaging;