import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Heart = styled(motion.path)`
`;

export const Svg = styled(motion.svg)`
    display: block;
    position: relative;
    z-index: 15;
    top: 0;
    left: 0;
`;

export const TwitterLike = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

export const WaveOuter = styled(motion.div)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #bb90c2;
    height: 160px;
    width: 160px;
    border-radius: 50%;
    z-index: 2
`;

export const WaveInner = styled(motion.div)`
    height: 162px;
    width: 165px;
    border-radius: 50%;
    z-index: 5;
`;

export const LikeCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;  
`;