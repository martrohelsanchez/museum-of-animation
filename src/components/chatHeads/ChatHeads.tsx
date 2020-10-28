import React, { useState } from 'react';
import {useAnimation} from 'framer-motion';

import * as S from './ChatHeads.styles';

const colors = ['#2d6187', '#effad3', '#a8dda8', '#ff9642', '#ffe05d', '#d9e4dd'];

function ChatHead() {
    const mousePos = useAnimation();
    const pos = useState({x: 0, y: 0});

    async function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        mousePos.start({
            x: e.clientX - 30,
            y: e.clientY - 30
        });
    }
    
    return (
        <S.Bg onMouseMove={onMouseMove}>
            {colors.map((color, i) => {
                return (
                    <S.ChatHead
                        color={color}
                        animate={mousePos}
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            mass: (colors.length - i) * .5,
                            damping: 15
                        }}
                    >
                    </S.ChatHead>
                )
            })}
        </S.Bg>
    )
}

export default ChatHead;