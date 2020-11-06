import styled from 'styled-components';
import {motion} from 'framer-motion';

import swipe from '../../shared/Swipe';
import {Bg as bg, parentsize, centerHorVer, MobileView as mobileView} from '../../shared/styles'

export const Bg = styled(bg)`
    ${centerHorVer};
`;

export const MobileView = styled(mobileView)`
    ${centerHorVer};

    @media all and (max-width: ${({ theme }) => theme.mobile}) {
        & {
            padding: 0;
        }
    }
`;

export const InnerScreen = styled(bg)`
    ${parentsize};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 50px;
    box-sizing: border-box;
    border-radius: 50px;

    @media all and (max-width: ${({ theme }) => theme.mobile}) {
        & {
            border-radius: 0;
        }
    }
`;

export const NavCircle = styled(motion.div)<{bgColor: string}>`
    position: relative;
    background-color: ${({bgColor}) => bgColor};
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

export const Grab = styled(motion.div)`
    ${parentsize};
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    border-radius: 50%;
    z-index: 10;
`;

export const NextColorCont = styled(Grab)`
    ${centerHorVer};
    position: absolute;
    top: 0;
    left: 0;
`;

export const NextColor = styled(Grab)<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
`;

export const Svg = styled(motion.svg)`
    ${parentsize};
    transform: rotate(90deg);
`;

export const Arrow = styled.polygon``;

export const Swipe = styled(swipe)`
    width: 40%;
    transform: rotate(90deg);
`;
