import styled from 'styled-components';
import {motion} from 'framer-motion';

import {MobileView as mobileView, parentsize, centerHorVer} from '../../shared/styles';

const bgColor = '#726a95';

export const Bg = styled.div`
    ${parentsize};
    ${centerHorVer};
    background-color: ${bgColor};
`;

export const MobileView = styled(mobileView)`
    ${centerHorVer};

    @media all and (max-width: ${({ theme }) => theme.mobile}) {
        & {
            background-color: ${bgColor};
        }
    }
`;

export const InnerMobile = styled.div`
    ${parentsize};
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    background-color: ${bgColor};
    border-radius: 50px;
`;

export const Circle = styled(motion.div)`
    background-color: white;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    cursor: pointer;
`;

export const Toggle = styled(Circle)`
    position: relative;
    margin: 50px 50px;
    z-index: 10;
    background-color: transparent;
`;

export const ToggleCircle = styled(Circle)`
    ${parentsize};
    position: absolute;
    z-index: 10;
`;

export const ProfilePic = styled(Circle)`
    position: absolute;
    top: 0;
    z-index: 0
`;

export const Cross = styled(motion.polygon)`
`;

export const Svg = styled.svg`
    position: absolute;
    z-index: 45;
    width: 30px;
    transform: translateX(50%) translateY(50%)
`;