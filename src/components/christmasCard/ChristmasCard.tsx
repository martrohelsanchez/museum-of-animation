import React, { useRef, useEffect, useState } from 'react';
import {useElementScroll, motion, useTransform, Variants} from 'framer-motion';

import useWindowSize from '../../hooks/useWindowSize';
import * as S from './ChristmasCard.style';
import envelopeBack from '../../images/envelope-back.svg';
import envelopeFront from '../../images/envelope-front.svg';
import envelopeFlap from '../../images/envelope-flap.svg';
import christmasCardBack from '../../images/christmas-card-back.svg';
import christmasCardFront from '../../images/christmas-card-front.svg';

const flapOpen = 0.25;
const rotateRight = 0.48;
const moveEnvLeftStart = 0.5
const rotateLeft = 0.7;
const moveEnvLeftEnd = 0.96;

const cardSpring = {
    type: 'spring',
    stiffness: 40
}

function ChristmasCard() {
    const [cardIsOpen, setCardIsOpen] = useState(false);

    const windowSize = useWindowSize();
    const bgRef = useRef<HTMLDivElement>(null);
    const envRef = useRef<HTMLDivElement>(null!);
    const envFlapRef = useRef<HTMLImageElement>(null!);
    const envFront = useRef<HTMLImageElement>(null!);
    const {scrollYProgress} = useElementScroll(bgRef);
    const envWidth = envRef.current?.getBoundingClientRect().width || 0;
    const christmasCardHeight = envRef.current ? envRef.current.getBoundingClientRect().height * 0.90 : 0;

    const envFlapRotateX = useTransform(scrollYProgress, [0, flapOpen, moveEnvLeftStart, moveEnvLeftEnd - 0.09], [0, 180, 180, 0]);
    const envRotate = useTransform(scrollYProgress, [flapOpen, rotateRight, rotateLeft], [0, 20, 0]);
    const envY = useTransform(scrollYProgress, [0, moveEnvLeftEnd], [0, getScrollTopEnd(bgRef) * moveEnvLeftEnd]);
    const envX = useTransform(scrollYProgress, [moveEnvLeftStart, moveEnvLeftEnd], [0, -(windowSize.width / 2 + envWidth / 2)]);
    const christmasCardY = useTransform(scrollYProgress, [flapOpen, rotateRight, rotateLeft], [0, -(christmasCardHeight + 50), 0]);

    useEffect(() => {
        scrollYProgress.onChange(y => {
            if (y > flapOpen && envFlapRef.current.style.zIndex !== '3') {
                envFlapRef.current.style.zIndex = '3';
            }
            if (y < flapOpen && envFlapRef.current.style.zIndex === '3') {
                envFlapRef.current.style.zIndex = '6';
            }
            if (y > rotateRight && envFront.current.style.zIndex !== '2') {
                envFront.current.style.zIndex = '2';
            }
            if (y < rotateRight && envFront.current.style.zIndex === '2') {
                envFront.current.style.zIndex = '5';
            }
        });
    }, [])

    function onCardClick() {
        setCardIsOpen(!cardIsOpen);
    }

    return (
        <S.Bg
            ref={bgRef}
        >
            <S.StackElements
                as={motion.div}
                ref={envRef}
                style={{
                    rotate: envRotate,
                    y: envY,
                }}
            >
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
                    <S.CardCont 
                        onClick={onCardClick}
                        style={{
                            y: christmasCardY,
                        }}
                        transition={cardSpring}
                        animate={cardIsOpen ? 'open' : 'close'}
                        variants={cardVariant}
                    >
                        <S.StackCards>
                            <S.CardLeftBack 
                                src={christmasCardBack} 
                                variants={cardLeftBackVariant}
                                style={{
                                    perspective: 1500
                                }}
                                transition={cardSpring}
                            />
                            <S.CardLeftFront 
                                src={christmasCardFront} 
                                variants={cardLeftFrontVariant}
                                style={{
                                    perspective: 1500
                                }}
                                transition={cardSpring}
                            />
                            <S.CardRightFront
                                src={christmasCardFront}
                            />
                        </S.StackCards>
                    </S.CardCont>
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
            </S.StackElements>
            <S.Pampahaba></S.Pampahaba>
        </S.Bg>
    );
}

const cardLeftBackVariant: Variants = {
    close: {
        rotateX: 10
    },
    open: {
        rotateX: 180
    }
}

const cardLeftFrontVariant: Variants = {
    close: {
        rotateX: 10
    },
    open: {
        rotateX: 180
    }
}

const cardVariant: Variants = {
    close: {
        rotate: 0,
        x: 0
    },
    open: {
        rotate: -90,
        x: '50%'
    }
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