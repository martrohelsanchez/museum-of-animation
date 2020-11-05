import styled from 'styled-components';
import {motion} from 'framer-motion';

import {MobileView as mobileView, parentsize, Bg as bg, centerHorVer} from '../../shared/styles';

const bgColor = '#fdba12';

export const Bg = styled(bg)`
    ${centerHorVer};
    background-color: ${bgColor};
`;

export const MobileView = styled(mobileView)`
    ${centerHorVer};

    @media all and (max-width: ${({theme}) => theme.mobile}) {
        & {
            background-color: ${bgColor};
        }
    }
`;

export const InnerMobileView = styled.div`
    ${parentsize};
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    background-color: ${bgColor};
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
    ${parentsize};
    background-color: ${({bgColor}) => bgColor};
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    cursor: pointer;
    will-change: box-shadow;
`;