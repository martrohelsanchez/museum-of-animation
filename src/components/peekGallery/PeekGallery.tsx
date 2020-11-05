import { Variants } from 'framer-motion';
import React, { useState } from 'react';

import * as S from './PeekGallery.styles';
import {AnimationProps} from '../../shared/types';

function PeekGallery() {

function PeekGallery({isAnimationInView}: AnimationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const cards = ['white', 'white', 'white'];

    return (
        <S.Bg>
            <S.MobileView>
                <S.InnerMobileView>
                    <S.CardCont>
                        {cards.map((num, i) => (
                            <S.Card
                                key={i}
                                animate={isOpen ? 'open' : 'close'}
                                variants={cardVariant}
                                style={{
                                    perspective: '500px',
                                    zIndex: cards.length - i
                                }}
                                onClick={e => setIsOpen(!isOpen)}
                                custom={i}
                                bgColor={num}
                            >
                            </S.Card>
                        ))}
                    </S.CardCont>
                </S.InnerMobileView>
            </S.MobileView>
        </S.Bg>
    )
}

const cardVariant: Variants = {
    open: (index) => ({
        rotateX: -25,
        y: -(index * 50),
        boxShadow: '0px -10px 40px -5px rgba(0, 0, 0, 0.1)'
    }),
    close: {
        rotateX: 0,
        y: 0,
        boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)'
}
    }

export default PeekGallery;