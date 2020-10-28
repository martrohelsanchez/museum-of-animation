import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled(motion.div)<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    padding: 50px;
    box-sizing: border-box;
    overflow: hidden;
`;

export const NavCircle = styled(motion.div)`
    background-color: #a3d8f4;
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

export const Grab = styled(NavCircle)`
    background-color: transparent;
    width: 100%;
    height: 100%;
`;