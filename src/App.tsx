import React, { useEffect, useRef, useState } from 'react';
import { useTransform, useElementScroll } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import * as S from './App.styles';
import Typing from './components/typing/Typing';
import TwitterLike from './components/twitterLike/TwitterLike';
import AddMsg from './components/addMsg/AddMsg';
import PeekGallery from './components/peekGallery/PeekGallery';
import ListShuffler from './components/listShuffler/ListShuffler';
import LiquidSwipe from './components/LiquidSwipe';
import ChatHead from './components/chatHeads/ChatHeads';
import CardPaging from './components/cardPaging/CardPaging';
import useWindowSize from './hooks/useWindowSize';
import theme from './theme';
import OnBoardingScreen from './components/onboardingScreen/OnboardingScreen';
import Space from './components/space/Space';
import SpreadCards from './components/spreadCards/SpreadCards';
import Calendar from './components/calendar/Calendar';
import ChristmasCard from './components/christmasCard/ChristmasCard';
import RepoLink from './components/RepoLink';

const animations = [
  LiquidSwipe,
  ListShuffler,
  PeekGallery,
  AddMsg,
  CardPaging,
  Calendar,
  SpreadCards,
  Space,
  OnBoardingScreen,
  ChatHead,
  Typing,
  TwitterLike,
  ChristmasCard,
];

function App() {
  const windowSize = useWindowSize();
  const root = document.getElementById('root') as HTMLDivElement;
  const rootRef = useRef(root);
  const { scrollY } = useElementScroll(rootRef);
  const prevScrollY = useRef(0);
  const [currentPage, setCurrPage] = useState(0);
  const scrollTimeout = useRef<number | undefined>(undefined);
  const rootHeight = root.getBoundingClientRect().height;

  useEffect(() => {
    root.addEventListener('scroll', onScroll);
    return () => {
      root.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize, root]);

  function onScroll(e: Event) {
    clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = undefined;
      snap();
    }, 200) as unknown as number;
  }

  function snap() {
    const currFullPage = scrollY.get() / rootHeight;
    const scrollDir = scrollY.get() - prevScrollY.current > 0 ? 'down' : 'up';
    let targetPage: number;

    if (scrollDir === 'up') {
      targetPage = getTargetPage(currFullPage, 0.8);
    } else {
      targetPage = getTargetPage(currFullPage, 0.2);
    }

    root.scroll({
      top: targetPage * rootHeight,
      behavior: 'smooth',
    });
    prevScrollY.current = targetPage * rootHeight;
    setCurrPage(targetPage);
  }

  function getTargetPage(currFullPage: number, percOfCurrFullPage: number) {
    const decimalPart = currFullPage % 1;

    if (decimalPart > percOfCurrFullPage) {
      return Math.ceil(currFullPage);
    } else {
      return Math.floor(currFullPage);
    }
  }

  const originPageY = currentPage * rootHeight;
  const scale = useTransform(
    scrollY,
    [originPageY - 300, originPageY, originPageY + 300],
    [0.9, 1, 0.9]
  );

  return (
    <ThemeProvider theme={theme}>
      <RepoLink />
      {animations.map((Animation, i) => (
        <S.Section
          key={i}
          style={{
            scale,
            zIndex: 1,
          }}
        >
          <Animation isAnimationInView={i === currentPage} />
        </S.Section>
      ))}
    </ThemeProvider>
  );
}
export default App;
