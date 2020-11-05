import React, { useRef, useEffect, useState } from 'react';
import {useElementScroll, motion, useTransform, Variants, useAnimation} from 'framer-motion';

import useWindowSize from '../../hooks/useWindowSize';
import * as S from './ChristmasCard.style';
import envelopeBack from '../../images/envelope-back.svg';
import envelopeFront from '../../images/envelope-front.svg';
import envelopeFlap from '../../images/envelope-flap.svg';
import christmasCardBack from '../../images/christmas-card-back.svg';
import christmasCardFront from '../../images/christmas-card-front.svg';
import {AnimationProps} from '../../shared/types';

const flapOpen = 0.25;
const rotateRight = 0.48;
const moveEnvLeftStart = 0.5
const rotateLeft = 0.7;
const moveEnvLeftEnd = 0.96;

const cardSpring = {
    type: 'spring',
    stiffness: 40
}

function ChristmasCard({isAnimationInView}: AnimationProps) {
    const windowSize = useWindowSize();
    const [cardIsOpen, setCardIsOpen] = useState(false);
    const bgRef = useRef<HTMLDivElement>(null);
    const envRef = useRef<HTMLDivElement>(null!);
    const envFlapRef = useRef<HTMLImageElement>(null!);
    const envFront = useRef<HTMLImageElement>(null!);
    const {scrollYProgress} = useElementScroll(bgRef);
    const envWidth = envRef.current?.getBoundingClientRect().width || 0;
    const foldedCardHeight = envRef.current ? envRef.current.getBoundingClientRect().height * 0.90 : 0;

    const envFlapRotateX = useTransform(scrollYProgress, [0, flapOpen, moveEnvLeftStart, moveEnvLeftEnd - 0.09], [0, 180, 180, 0]);
    const envRotate = useTransform(scrollYProgress, [flapOpen, rotateRight, rotateLeft], [0, 20, 0]);
    const envX = useTransform(scrollYProgress, [moveEnvLeftStart, moveEnvLeftEnd], [0, -(windowSize.width / 2 + envWidth / 2)]);
    const cardLeftAnimate = useAnimation();
    const cardLeftRotateX = useTransform(scrollYProgress, [0, rotateRight, rotateLeft], [0, 0, 40]);
    const CardY = useTransform(scrollYProgress, [flapOpen, rotateRight, rotateLeft], [0, -(foldedCardHeight + 50), 0]);

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
    }, [scrollYProgress])

    function onCardClick() {
        const spring = {
            type: 'spring',
            mass: 2,
            restDelta: 0.01
        }

        setCardIsOpen(!cardIsOpen);
        if (cardIsOpen) {
            cardLeftAnimate.start({
                rotateX: 40,
                transition: spring
            });
        } else {
            cardLeftAnimate.start({
                rotateX: 180,
            });
        }
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
                    top: bgRef.current && envRef.current ? 
                        //Center horizontally 
                        bgRef.current.getBoundingClientRect().height / 2 - envRef.current.getBoundingClientRect().height / 2 
                            : 
                        0
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
                            y: CardY,
                            willChange: isAnimationInView ? 'transform' : undefined
                        }}
                        animate={cardIsOpen ? 'open' : 'close'}
                        variants={cardVariant}
                    >
                        <S.StackCards>
                            <S.CardLeftBack 
                                src={christmasCardBack} 
                                transition={cardSpring}
                                style={{
                                    rotateX: cardLeftRotateX,
                                    willChange: isAnimationInView ? 'transform' : undefined
                                }}
                                animate={cardLeftAnimate}
                            />
                            <S.CardLeftFront 
                                src={christmasCardFront} 
                                transition={cardSpring}
                                style={{
                                    rotateX: cardLeftRotateX,
                                    willChange: isAnimationInView ? 'transform, box-shadow' : undefined
                                }}
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

const cardVariant: Variants = {
    close: {
        rotate: 0,
        x: 0,
        scale: 1,
    },
    open: {
        rotate: -90,
        x: '40%',
        scale: 1.2,
        transition: {
            type: 'spring',
            restDelta: 0.01
        }
    }
}

export default ChristmasCard;