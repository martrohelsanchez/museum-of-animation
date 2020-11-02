import React, {useEffect, useRef, useState} from 'react';
import {useTransform, useViewportScroll} from 'framer-motion';
import {ThemeProvider} from 'styled-components';

import * as S from './App.styles';
import Typing from './components/typing/Typing';
import TwitterLike from './components/twitterLike/TwitterLike';
import AddMsg from './components/addMsg/AddMsg';
import PeekGallery from './components/peekGallery/PeekGallery';
import ListShuffler from './components/listShuffler/ListShuffler';
import DropLets from './components/droplets/Dropslets';
import ChatHead from './components/chatHeads/ChatHeads';
import CardPaging from './components/cardPaging/CardPaging';
import useWindowSize from './hooks/useWindowSize';
import theme from './theme';
import CardRotate from './components/cardRotate/CardRotate';
import OnBoardingScreen from './components/onboardingScreen/OnboardingScreen';
import Space from './components/space/Space';
import SpreadCards from './components/spreadCards/SpreadCards'
import Calendar from './components/calendar/Calendar';
import ChristmasCard from './components/christmasCard/ChristmasCard';

function App() {
    const {scrollY} = useViewportScroll();
    const prevScrollY = useRef(0);
    const [currentPage, setCurrPage] = useState(0);
    const scrollTimeout = useRef<number | undefined>(undefined);

    useEffect(() => {
        document.addEventListener('scroll', onScroll);
    }, []);

    function onScroll(e: Event) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            scrollTimeout.current = undefined;
            snap();
        }, 500);
    }

    function snap() {
        const currFullPage = scrollY.get() / window.innerHeight;
        const scrollDir = scrollY.get() - prevScrollY.current > 0 ? 'down' : 'up';
        let targetPage: number;

        if (scrollDir === 'up') {
            targetPage = getTargetPage(currFullPage, 0.80);
        } else {
            targetPage = getTargetPage(currFullPage, 0.20);
        }

        window.scroll({
            top: targetPage * window.innerHeight,
            behavior: "smooth"
        });
        prevScrollY.current = targetPage * window.innerHeight;
        setCurrPage(targetPage);
    }

    function getTargetPage(currFullPage: number , percOfCurrFullPage: number) {
        const decimalPart = currFullPage % 1;

        if (decimalPart > percOfCurrFullPage) {
            return Math.ceil(currFullPage);
        } else {
            return Math.floor(currFullPage);
        }
    }

    const windowSize = useWindowSize();
    const originPageY = currentPage * windowSize.height;
    const scale = useTransform(scrollY, [originPageY - 300, originPageY, originPageY + 300], [.9, 1, .9]);
    const animations = [
        ChristmasCard,
        CardPaging, 
        PeekGallery, 
        AddMsg, 
        Calendar,
        SpreadCards, 
        Space, 
        OnBoardingScreen, 
        ChatHead, 
        ListShuffler, 
        Typing, 
        TwitterLike, 
        DropLets
    ];

    return (
        <ThemeProvider theme={theme}>
            {animations.map((Animation, i) => (
                <S.Section
                    key={i}
                    style={{
                        scale,
                        zIndex: 1
                    }}
                >
                    <Animation />
                </S.Section>
            ))}
        </ThemeProvider>
    )
}
export default App;