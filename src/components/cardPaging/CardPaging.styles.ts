import styled from 'styled-components';
import {motion} from 'framer-motion';
import {MobileView as mobileview, ParentSize, CenterHorVer} from '../../shared/styles';

export const CardPaging = styled.div`
    ${ParentSize};
    ${CenterHorVer}
    background-color: #8bcdcd;
`;

export const MobileView = styled(mobileview)`
    ${CenterHorVer}
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

export const Carousel = styled.div`
    height: 70%;
`;

export const PageWrapper = styled(motion.div)`
    ${ParentSize};
    margin: 0 auto;
    flex: 0 0 auto;
    border-radius: 20px;
`;

export const Page = styled(motion.div)<{bgColor: string}>`
    ${ParentSize};
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
    ${CenterHorVer};
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 50px;
`;