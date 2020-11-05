import { Variants } from 'framer-motion';
import React, { useState } from 'react';

import * as S from './PeekGallery.styles';
import {AnimationProps} from '../../shared/types';

//inspiration https://www.framer.com/examples/perspective-3d/

const cards = ['white', 'white', 'white'];

function PeekGallery({isAnimationInView}: AnimationProps) {
    const [isOpen, setIsOpen] = useState(false);

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
                                    zIndex: cards.length - i,
                                    boxShadow: isOpen ? '0 -5px 10px -2px rgba(50, 50, 73, 0.2)' : 'none',
                                    willChange: isAnimationInView ? 'transition, box-shadow' : undefined
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

const spring = {
    type: 'spring',
    mass: 1.2,
    restDelta: 0.01,
    stiffness: 300
}

const cardVariant: Variants = {
    open: (index) => ({
        rotateX: -25,
        y: -(index * 50),
        transition: spring
    }),
    close: {
        rotateX: 0,
        y: 0,
    }
}

export default PeekGallery;