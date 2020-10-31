import React, {useRef} from 'react';
import {useAnimation} from 'framer-motion';

import * as S from './ChatHeads.styles';
import useWindowSize from '../../hooks/useWindowSize';
import ashley from '../../images/ashley.jpg';
import barbie from '../../images/barbie.jpg';
import kathryn from '../../images/kathryn.jpg';
import thea from '../../images/thea.jpg';

const images = [kathryn, thea, barbie, ashley, 'transparent'];

function ChatHead() {
    const bgRef = useRef<HTMLDivElement>(null!);
    const windowSize = useWindowSize();
    const mousePos = useAnimation();

    function onDragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) {
        bgRef.current.addEventListener('mousemove', onDragging);
        bgRef.current.addEventListener('touchmove', onDragging)
        window.addEventListener('mouseup', onDragEnd)
        window.addEventListener('touchend', onDragEnd);
    }

    function onDragging(e: MouseEvent | TouchEvent) {
        mousePos.start({
            x: 'clientX' in e ? e.clientX - 30 : e.touches[0].clientX - 30,
            y: 'clientY' in e ? e.clientY - 30 : e.touches[0].clientY - 30
        });
    }

    function onDragEnd(e: MouseEvent | TouchEvent) {
        bgRef.current.removeEventListener('mousemove', onDragging);
        bgRef.current.removeEventListener('touchmove', onDragging)
        console.log(e);
        const lastPosX = 'clientX' in e ? e.clientX : e.changedTouches[0].clientX;

        if (lastPosX > windowSize.width / 2) {
            mousePos.start({
                x: windowSize.width - 80
            });
        } else {
            mousePos.start({
                x: 0
            });
        }
    }
    
    return (
        <S.Bg ref={bgRef}>
            {images.map((userImg, i) => {
                return (
                    <S.ChatHead
                        key={i}
                        animate={i === images.length - 1 ? undefined : mousePos}
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            mass: ((images.length - 1) - i) * .5,
                            damping: 15
                        }}
                        style={{
                            backgroundColor: i === images.length - 1 ? 'transparent' : 'white'
                        }}
                        drag={i === images.length - 1 ? true : false}
                        dragMomentum={false}
                        onMouseDown={onDragStart}
                        onTouchStart={onDragStart}
                    >
                        <S.UserImg 
                            style={{
                                display: i === images.length - 1 ? 'none' : 'inline-block'
                            }} 
                            src={userImg} 
                            draggable={false}
                        />
                    </S.ChatHead>
                )
            })}
        </S.Bg>
    )
}

export default ChatHead;