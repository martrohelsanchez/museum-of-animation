import React, { useEffect, useState } from 'react';
import {useViewportScroll} from 'framer-motion';
import {Switch, Route, Link} from 'react-router-dom';

import * as S from './App.styles';
import Typing from './components/typing/Typing';
import TwitterLike from './components/twitterLike/TwitterLike';
import ToggleMenu from './components/toggleMenu/ToggleMenu';
import PeekGallery from './components/peekGallery/PeekGallery';
import ListShuffler from './components/listShuffler/ListShuffler';
import DropLets from './components/droplets/Dropslets';
import ChatHead from './components/chatHeads/ChatHeads';
import CardPaging from './components/cardPaging/CardPaging';

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

function PrototypeApp() {
    return (
        <>
            <Switch>
                <Route path='/typing'>
                    <Typing />
                </Route>
                <Route path='/twitter-like'>
                    <TwitterLike />
                </Route>
                <Route path='/toggle-menu'>
                    <ToggleMenu />
                </Route>
                <Route path='/peek-gallery'>
                    <PeekGallery />
                </Route>
                <Route path='/list-shuffler'>
                    <ListShuffler />
                </Route>
                <Route path='/droplets'>
                    <DropLets />
                </Route>
                <Route path='/chat-heads'>
                    <ChatHead />
                </Route>
                <Route path='/card-paging'>
                    <CardPaging />
                </Route>
                <Route path='/'>
                    <Link to='/typing' >
                        Typing
                    </Link><br />
                    <Link to='/peek-gallery'>
                        Peek Gallery
                    </Link><br />
                    <Link to='/chat-heads'>
                        Chatheads
                    </Link><br />
                    <Link to='/card-paging'>
                        Card Paging
                    </Link><br />
                    <Link to='/twitter-like' >
                        An attempt to copy twitter like animation
                    </Link><br />
                    <Link to='/toggle-menu'>
                        Add Message
                    </Link><br />
                    <Link to='/list-shuffler'>
                        List Shuffler
                    </Link><br />
                    <Link to='/droplets'>
                        Droplet
                    </Link><br />
                </Route>
            </Switch>
        </>
    )
}

export default PrototypeApp;