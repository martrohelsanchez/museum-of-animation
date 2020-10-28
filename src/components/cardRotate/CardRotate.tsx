import {useMotionValue, useTransform} from 'framer-motion';
import React from 'react';

import * as S from './CardRotate.styles';

function CardRotate() {
    const cardX = useMotionValue(0);
    const cardRotate = useTransform(cardX, [-200, 200], [-50, 50]);

    return (
        <S.CardRotate>
            {/* <S.CardCont> */}
                <S.Card
                    drag='x'
                    style={{
                        x: cardX,
                        rotate: 50
                    }}
                    dragConstraints={{ left: -200, right: 200 }}
                >
                </S.Card>
            {/* </S.CardCont> */}
        </S.CardRotate>
    )
}

export default CardRotate;