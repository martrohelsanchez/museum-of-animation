import styled from 'styled-components';
import {motion} from 'framer-motion';

import {MobileView as mobileView, ParentSize, Bg as bg, CenterHorVer} from '../../shared/styles';

const bgColor = '#fdba12';

export const Bg = styled(bg)`
    ${CenterHorVer};
    background-color: ${bgColor};
`;

export const MobileView = styled(mobileView)`
    ${CenterHorVer};

    @media all and (max-width: ${({theme}) => theme.mobile}) {
        & {
            background-color: ${bgColor};
        }
    }
`;

export const InnerMobileView = styled.div`
    ${ParentSize};
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
    ${ParentSize};
    background-color: ${({bgColor}) => bgColor};
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    cursor: pointer;
    will-change: transform;
`;