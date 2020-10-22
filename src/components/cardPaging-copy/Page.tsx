import React, {useRef, useEffect, useState} from 'react';
import {MotionValue, PanInfo, AnimationControls, Variants} from 'framer-motion/types';
import {useTransform} from 'framer-motion';

import * as S from './CardPaging.styles';

interface CardProps {
    color: string;
    i: number;
    pageX: MotionValue<number>;
    pageAnimation: AnimationControls;
    setOpenedPage: React.Dispatch<React.SetStateAction<number | null>>;
    openedPage: number | null;
}

function Page({color, i, pageX, pageAnimation, openedPage, setOpenedPage}: CardProps) {
    const [count, setCount] = useState(0);
    const pageRef = useRef<HTMLDivElement>(null);
    const pageWith = pageRef.current?.getBoundingClientRect().width || 0;
    const pageScale = useTransform(pageX, [-(pageWith * i) - 50, -(pageWith * i), -(pageWith * i) + 50], [0.9, 1, 0.9]);

    useEffect(() => {
        setCount(c => ++c);
    }, []);

    function onDragEnd(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const currFullPage = Math.floor(pageX.get() / pageWith);

        if (openedPage === null) {
            console.log('null')
            setOpenedPage(null);
                } else {
            console.log('hindi')
            setOpenedPage(null);
    }

    function pageOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (pageY.get() < 5 && pageY.get() > -5 && pageX.get() < 3 && pageX.get() > -3) {
            setOpenedPage(i);
        }
    }

    return (
        <S.Page 
            ref={pageRef}
            bgColor={color}
            drag={openedPage === null ? 'x' : 'y'}
            dragMomentum={false}
            animate={pageAnimation}
            style={{
                x: pageX,
                scale: pageScale
            }}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0
            }}
            onDragEnd={onDragEnd}
            onClick={pageOnClick}
        >
        </S.Page>
    )
}

export default Page;