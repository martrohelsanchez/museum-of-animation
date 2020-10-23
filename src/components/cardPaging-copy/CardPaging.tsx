import React, {useState} from 'react';

import * as S from './CardPaging.styles';
import {useMotionValue, useAnimation, Variants} from 'framer-motion';
import {PanInfo} from 'framer-motion/types';
import Page from './Page';
import {ThemeProvider} from 'styled-components';
import theme from '../../theme';

const colors = ['#cc0e74', '#1f3c88', '#a8dda8', '#ff9642', '#ffe05d'];

function CardPaging() {
    const [openedPage, setOpenedPage] = useState<number | null>(null);
    const pageX = useMotionValue(0);
    const pageAnimation = useAnimation();
    const pageY = useMotionValue(0);

    function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (info.offset.y > 60 || info.offset.y < -60) {
            setOpenedPage(null);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <S.CardPaging>
                <S.MobileView>
                    <S.Edge
                        animate={openedPage === null ? 'closePage' : 'openPage'}
                    >
                        <S.PageCont
                            variants={pageContVariant}
                            drag={openedPage === null ? false : 'y'}
                            onDragEnd={onDragEnd}
                            dragConstraints={{
                                top: 0,
                                bottom: 0
                            }}
                            style={{
                                y: pageY
                            }}
                        >
                            {colors.map((color, i) => (
                                <Page
                                    key={color}
                                    color={color}
                                    colors={colors}
                                    i={i}
                                    pageX={pageX}
                                    pageY={pageY}
                                    pageAnimation={pageAnimation}
                                    openedPage={openedPage}
                                    setOpenedPage={setOpenedPage}
                                />
                            ))}
                        </S.PageCont>
                    </S.Edge>
                </S.MobileView>
            </S.CardPaging>
        </ThemeProvider>
    )
}

const pageContVariant: Variants = {
    openPage: {
        height: '100%',
        width: '100%'
    },
    closePage: {
        width: '70%',
        height: '50%'
    }
}

export default CardPaging;