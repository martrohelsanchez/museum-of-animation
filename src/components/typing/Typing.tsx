import React from 'react';
import {Variants} from 'framer-motion/types';

import * as S from './Typing.styles';

const arrDots = [1, 2, 3];

function Typing() {
    return (
        <S.Bg>
            <S.TypingBody>
                {arrDots.map(num => (
                    <S.Dot 
                        key={num}
                        custom={num}
                        variants={variant}
                        animate={'typing'}
                    >
                    </S.Dot>
                ))}
            </S.TypingBody>
        </S.Bg>
    )
}

const variant: Variants = {
    typing: (i: number) => ({
        y: [0, -50, 0],
        transition: {
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: .5
        }
    })
}

export default Typing;