import styled from 'styled-components';
import {motion} from 'framer-motion';

import {Bg as bg, ParentSize, CenterHorVer} from '../../shared/styles'

export const Bg = styled(bg)<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 50px;
    box-sizing: border-box;
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
    ${ParentSize};
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    border-radius: 50%;
    z-index: 10;
`;

export const NextColorCont = styled(Grab)`
    ${CenterHorVer};
    position: absolute;
    top: 0;
    left: 0;
`;

export const NextColor = styled(Grab)<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
`;

export const Svg = styled(motion.svg)`
    ${ParentSize};
    transform: rotate(90deg);
`;

export const Arrow = styled.polygon``;
