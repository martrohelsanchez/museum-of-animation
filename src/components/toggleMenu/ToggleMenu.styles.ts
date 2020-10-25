import styled from 'styled-components';
import {motion} from 'framer-motion';

import {MobileView as mobileView} from '../../shared/styles';

const bgColor = '#726a95';

export const Bg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${bgColor};
    width: 100vw;
    height: 100vh;
`;

export const MobileView = styled(mobileView)`
    display: flex;
    align-items: center;
    justify-content: center;

    @media all and (max-width: ${({ theme }) => theme.mobile}) {
        & {
            background-color: ${bgColor};
        }
    }
`;

export const InnerMobile = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    background-color: ${bgColor};
    border-radius: 50px;
    width: 92%;
    height: 96%;
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
    position: absolute;
    width: 100%;
    height: 100%;
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