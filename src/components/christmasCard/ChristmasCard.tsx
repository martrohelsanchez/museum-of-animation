import React, { useRef, useEffect } from 'react';
import {useElementScroll, motion, useTransform} from 'framer-motion';

import * as S from './ChristmasCard.style';
import envelopeBack from '../../images/envelope-back.svg';
import envelopeFront from '../../images/envelope-front.svg';
import envelopeFlap from '../../images/envelope-flap.svg';
import christmasCardBack from '../../images/christmas-card-back.svg';
import useWindowSize from '../../hooks/useWindowSize';

function ChristmasCard() {
    const windowSize = useWindowSize();
    const bgRef = useRef<HTMLDivElement>(null);
    const envRef = useRef<HTMLDivElement>(null!);
    const envFlapRef = useRef<HTMLImageElement>(null!);
    const envFront = useRef<HTMLImageElement>(null!);
    const {scrollYProgress} = useElementScroll(bgRef);
    const envWidth = envRef.current?.getBoundingClientRect().width || 0;
    const christmasCardHeight = envRef.current ? envRef.current.getBoundingClientRect().height * 0.90 : 0;

    const envFlapRotateX = useTransform(scrollYProgress, [0, .15, 0.4, 0.76], [0, 180, 180, 0]);
    const envRotate = useTransform(scrollYProgress, [0.15, 0.32, 0.6], [0, 20, 0]);
    const envY = useTransform(scrollYProgress, [0, 0.8], [0, getScrollTopEnd(bgRef) * 0.8]);
    const envX = useTransform(scrollYProgress, [0.4, 0.83], [0, -(windowSize.width / 2 + envWidth / 2)]);

    const christmasCardY = useTransform(scrollYProgress, [0.15, 0.32, 0.6], [0, -(christmasCardHeight + 50), 0]);

    useEffect(() => {
        scrollYProgress.onChange(y => {
            if (y > 0.15 && envFlapRef.current.style.zIndex !== '3') {
                envFlapRef.current.style.zIndex = '3';
            }
            if (y < 0.15 && envFlapRef.current.style.zIndex === '3') {
                envFlapRef.current.style.zIndex = '6';
            }
            if (y > 0.32 && envFront.current.style.zIndex !== '2') {
                console.log('asdfsd')
                envFront.current.style.zIndex = '2';
            }
            if (y < 0.32 && envFront.current.style.zIndex === '2') {
                envFront.current.style.zIndex = '5';
            }
        });
    }, [])

    return (
        <S.Bg
            ref={bgRef}
        >
            <S.StackElements
                ref={envRef}
                style={{
                    rotate: envRotate,
                    y: envY,
                    // x: envX
                }}
            >
                {/* <S.EnvelopeCont
                    style={{
                        rotate: envRotate,
                        y: envY,
                        x: envX
                    }}
                > */}
                    <S.EnvelopeBack src={envelopeBack} 
                        style={{
                            x: envX
                        }}
                    />
                    <S.EnvelopeFront src={envelopeFront} 
                        ref={envFront}
                        style={{
                            x: envX
                        }}
                    />
                    <S.ChristmasCard 
                        src={christmasCardBack} 
                        style={{
                            y: christmasCardY
                        }}
                    />
                    <S.EnvelopeFlap
                        ref={envFlapRef}
                        src={envelopeFlap} 
                        style={{
                            transformOrigin: 'top center',
                            perspective: 900,
                            rotateX: envFlapRotateX,
                            x: envX
                        }}
                    />
                {/* </S.EnvelopeCont> */}
            </S.StackElements>
            <S.Pampahaba></S.Pampahaba>
        </S.Bg>
    );
}

function getScrollTopEnd(ref: React.RefObject<HTMLDivElement>) {
    const el = ref.current;
    if (el) {
        return el.scrollHeight - el.clientHeight
    } else {
        return 0;
    }
}

export default ChristmasCard;