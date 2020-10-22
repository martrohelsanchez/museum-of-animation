import React, { useEffect, useState } from 'react';

import * as S from './App.styles';
import { useViewportScroll, useDomEvent } from 'framer-motion';

const colors = ['#2d6187', '#effad3', '#a8dda8', '#ff9642', '#ffe05d', '#d9e4dd'];

function App() {
    const scroll = useViewportScroll();
    const currAnimationIndex = useState(0);

    useEffect(() => {
        let prevSection: number | undefined;
        scroll.scrollY.onChange((y) => {
            const currSection = Math.floor((y + window.innerHeight) / window.innerHeight);

            if (currSection !== prevSection) {
                console.log(currSection !== prevSection);
                console.log(prevSection, currSection);
                console.log('-----------')
                prevSection = currSection;
            }
        });
    }, []);
    
    return (
        <>
            {colors.map(colors => (
                <S.Section key={colors} bgColor={colors}></S.Section>
            ))}
        </>
    )
}

export default App;