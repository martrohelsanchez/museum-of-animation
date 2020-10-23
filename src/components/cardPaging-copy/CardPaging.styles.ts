import styled from 'styled-components';
import {motion} from 'framer-motion';

export const CardPaging = styled.div`
    background-color: #2d6187;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

export const MobileView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 411px;
    height: 731px;
    border-radius: 30px;

    @media all and (max-width: ${({theme}) => theme.mobile}) {
        & {
            border-radius: 0;
            height: 100%;
            width: 100%;
        }
    }
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
`;

export const Carousel = styled.div`
    height: 70%;
`;

export const PageWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    flex: 0 0 auto;
    border-radius: 20px;
`;

export const Page = styled(motion.div)<{bgColor: string}>`
    display: flex;
    flex-direction: column-reverse;
    background-color: ${({bgColor}) => bgColor};
    height: 100%;
    width: 100%;
    border-radius: 20px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 94%;
    width: 90%;
    overflow: hidden;
`;