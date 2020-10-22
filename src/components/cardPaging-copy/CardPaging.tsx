import React, { useState, useRef, useEffect } from 'react';

import * as S from './CardPaging.styles';
import {useMotionValue, useTransform, useAnimation, Variants} from 'framer-motion';
import {PanInfo} from 'framer-motion/types';
import Page from './Page';

const colors = ['#cc0e74', '#1f3c88', '#a8dda8', '#ff9642', '#ffe05d'];

function CardPaging() {
    const [currPageIndex, setCurrPageIndex] = useState(0);
    const [openedPage, setOpenedPage] = useState<number | null>(null);
    const pageX = useMotionValue(0);
    const pageAnimation = useAnimation();

    //PageIndex is the current page that is being dragged
    function onDrag(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, pageIndex: number) {
        // pageX.set(info.offset.x);

        if (info.offset.x < -200 && pageIndex === currPageIndex) {
            setCurrPageIndex(i => ++i);
        } else if (info.offset.x > 200 && pageIndex === currPageIndex) {
            setCurrPageIndex(i => --i);
        }
    }

    return (
        <S.CardPaging>
            <S.MobileView>
                <S.PageCont
                    variants={pageContVariant}
                    animate={openedPage === null ? 'closePage' : 'openPage'}
                >
                    {colors.map((color, i) => (
                        <Page
                            key={color}
                            color={color}
                            colors={colors}
                            i={i}
                            pageX={pageX}
                            pageAnimation={pageAnimation}
                            openedPage={openedPage}
                            setOpenedPage={setOpenedPage}
                        />
                    ))}
                </S.PageCont>
            </S.MobileView>
        </S.CardPaging>
    )
}

const pageContVariant: Variants = {
    openPage: {
        height: '94%',
        width: '90%'
    },
    closePage: {
        width: '70%',
        height: '50%'
    }
}

export default CardPaging;