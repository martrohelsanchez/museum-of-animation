import React, {useState} from 'react';
import {Variants, motion} from 'framer-motion';

import * as S from './AddMsg.styles';
import ashley from '../../images/ashley.jpg';
import barbie from '../../images/barbie.jpg';
import kathryn from '../../images/kathryn.jpg';
import thea from '../../images/thea.jpg';

function ToggleMenu() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const menu = [ashley, barbie, kathryn, thea];

    return (
        <S.Bg>
            <S.MobileView>
                <S.InnerMobile>
                    <S.Toggle
                        onClick={e => setIsOpenMenu(!isOpenMenu)}
                        animate={isOpenMenu ? 'openMenu' : 'closeMenu'}
                    >
                        <S.Svg
                            viewBox="0 0 72 72"
                        >
                            <S.Cross
                                points="72 29.44 72 42.56 42.56 42.56 42.56 72 29.44 72 29.44 42.56 0 42.56 0 29.44 29.44 29.44 29.44 0 42.56 0 42.56 29.44 72 29.44"
                                variants={CrossVariant}
                                initial={{
                                    fill: '#726a95'
                                }}
                            >
                            </S.Cross>
                        </S.Svg>
                        <S.ToggleCircle variants={ToggleCircleVariant}>
                        </S.ToggleCircle>
                        {menu.map((img, i) => (
                            <S.ProfilePic 
                                as={motion.img}
                                src={img}
                                key={i}
                                custom={i}
                                variants={MenuVariant}
                            >
                            </S.ProfilePic>
                        ))}
                    </S.Toggle>
                </S.InnerMobile>
            </S.MobileView>
        </S.Bg>
    )
}

const MenuVariant: Variants = {
    closeMenu: {
        y: 0,
        transition: {
            // type: 'spring',
            // bounce: 0
        }
    }, 
    openMenu: (i) => ({
        y: -((i + 1) * 75),
    })
}

const ToggleCircleVariant: Variants = {
    closeMenu: {
        scale: 1,
        backgroundColor: '#FFFFFF'
    },
    openMenu: {
        scale: 0.75,
        backgroundColor: '#ed553b'
    }
}

const CrossVariant: Variants = {
    closeMenu: {
        fill: '#726a95',
        rotate: 0,
        scale: 1
    },
    openMenu: {
        fill: '#FFFFFF',
        rotate: 225,
        scale: 0.75
    }
}

export default ToggleMenu;