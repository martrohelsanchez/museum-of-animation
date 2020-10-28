import { Variants } from 'framer-motion';
import React, { useState } from 'react';

import * as S from './PeekGallery.styles';

function PeekGallery() {
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
        boxShadow: '0 -5px 30px rgba(0, 0, 0, 0.08)'
    }),
    close: {
        rotateX: 0,
        y: 0,
        boxShadow: 'none'
    }
}

export default PeekGallery;