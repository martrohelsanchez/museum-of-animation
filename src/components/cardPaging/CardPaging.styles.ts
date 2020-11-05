import styled from 'styled-components';
import {motion} from 'framer-motion';
import {MobileView as mobileview, parentsize, centerHorVer} from '../../shared/styles';

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
    flex-direction: column-reverse;
    background-color: ${({bgColor}) => bgColor};
`;

export const SwipeSvg = styled.svg<{hide: boolean}>`
    display: ${({hide}) => hide ? 'none' : 'block'};
    width: 10%;
    margin: 30px auto;
`;

export const Swipe = styled.polygon`
    opacity: .6;
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