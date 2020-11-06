import styled from 'styled-components';
import {motion} from 'framer-motion';

import {MobileView as mobileview, parentsize, centerHorVer} from '../../shared/styles';
import swipe from '../../shared/Swipe';

export const CardPaging = styled.div`
    ${parentsize};
    ${centerHorVer}
    background-color: #8bcdcd;
`;

export const MobileView = styled(mobileview)`
    ${centerHorVer}
    flex-direction: row;
`;

export const PageCont = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 70%;
    height: 50%;
    cursor: grab;

    &::-webkit-scrollbar {
        display: none;
    }

    &:active {
        cursor: grabbing;
    }
`;

export const PageWrapper = styled(motion.div)`
    ${parentsize};
    margin: 0 auto;
    flex: 0 0 auto;
    border-radius: 20px;
`;

export const Page = styled(motion.div)<{bgColor: string}>`
    ${parentsize};
    display: flex;
    flex-wrap: wrap;
    background-color: ${({bgColor}) => bgColor};
    justify-content: center;
`;

export const Swipe = styled(swipe)<{hide?: boolean}>`
    visibility: ${({hide}) => hide ? 'hidden' : 'visible'};
`;

export const SwipeUp = styled(Swipe)`
    width: 10%;
    margin: 30px auto;
    align-self: flex-end;
`;

export const SwipeLR = styled(Swipe)<{direction: 'left' | 'right'}>`
    transform: ${({direction}) => direction === 'left' ? 'rotate(-90deg)' : 'rotate(90deg)'};
    height: 100%;
`;

export const SwipeLRCont = styled.div`
    position: absolute;
    width: 100%;
    height: 8%;
    align-self: center;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

export const Edge = styled(motion.div)`
    ${centerHorVer};
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 50px;

    @media all and (max-width: ${({ theme }) => theme.mobile}) {
        & {
            border-radius: 10px;
            height: calc(100% - 20px);
        }
    }
`;