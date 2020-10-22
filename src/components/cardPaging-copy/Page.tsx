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

        // pageAnimation.start({
        //     x: currFullPage * pageWith
        // });
    }

    return (
        <S.Page 
            ref={pageRef}
            bgColor={color}
            drag={true}
            // drag={openedPage === null ? 'x' : 'y'}
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
            onClick={e => setOpenedPage(i)}
        >
        </S.Page>
    )
}

export default Page;