import React, { useState, useRef, useEffect } from 'react';

import * as S from './CardPaging.styles';
import {useMotionValue, useTransform, useAnimation, Variants} from 'framer-motion';
import {PanInfo} from 'framer-motion/types';
import Page from './Page';
import {ThemeProvider} from 'styled-components';
import theme from '../../theme';

const colors = ['#cc0e74', '#1f3c88', '#a8dda8', '#ff9642', '#ffe05d'];

function CardPaging() {
    const [openedPage, setOpenedPage] = useState<number | null>(null);
    const pageX = useMotionValue(0);
    const pageAnimation = useAnimation();

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
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