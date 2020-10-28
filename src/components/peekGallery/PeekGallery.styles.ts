import styled from 'styled-components';
import {motion} from 'framer-motion';

import {MobileView as mobileView} from '../../shared/styles';

const bgColor = '#fdba12';

export const Bg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${bgColor};
    width: 100%;
    height: 100%;
`;

export const MobileView = styled(mobileView)`
    display: flex;
    justify-content: center;
    align-items: center;

    @media all and (max-width: ${({theme}) => theme.mobile}) {
        & {
            background-color: ${bgColor};
        }
    }
`;

export const InnerMobileView = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    background-color: ${bgColor};
    width: 100%;
    height: 100%;
    border-radius: 50px;
    padding: 40px;
    box-sizing: border-box;
`;

export const CardCont = styled.div`
    position: relative;
    width: 100%;
    height: 40%;
`;

export const Card = styled(motion.div)<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    will-change: transform;
`;