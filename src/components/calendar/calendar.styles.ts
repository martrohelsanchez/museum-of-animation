import styled from 'styled-components';
import {motion} from 'framer-motion';

import {Bg as bg, centerHorVer, parentsize} from '../../shared/styles';

const shadowColor = 'rgba(50, 50, 73, 0.1)';

export const Bg = styled(bg)`
    ${centerHorVer};
    background-color: #fff8cd;
`;

export const CalendarSize = styled.div`
    position: relative;
    width: 50%;
    max-width: 400px;
    padding-top: min(60%, 450px);
`;

export const CalendarCont = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
`;

export const TopRed = styled.div`
    background-color: #c42d2f;
    width: 100%;
    height: 14%;
    z-index: 10;
`;

export const TopGrey = styled.div`
    background-color: #dbd9d9;
    width: 100%;
    height: 9%;
    z-index: 10;
`;

export const Page = styled(motion.div)`
    ${parentsize};
    position: absolute;
    top: 0;
    background-color: white;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

export const Shadow = styled(Page)`
    background-color: ${shadowColor};
    box-shadow: 5px 10px 10px ${shadowColor};
`;

export const Cont = styled(motion.div)`
    ${parentsize};
    position: absolute;
    background-color: transparent;
`;

export const Grabber = styled(Cont)``;

export const StackElements = styled(Cont)`
    ${centerHorVer};
    position: relative;
`;

export const Content = styled.div`
    ${centerHorVer};
    background-color: crimson;
    top: 0;
    color: white;
    font-size: min(8rem, 17vw);
    height: 90%;
    width: 90%;
    font-family: 'Raleway', sans-serif;
`;