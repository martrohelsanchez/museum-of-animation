import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    background-color: black;
    width: 100vw;
    height: 100vh;
`;

export const FirstWave = styled(motion.div)`
    /* display: none; */
    height: 0;
    width: 0;
    background-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
`;

export const FirstWaveCont = styled.span`
    position: absolute;
    border-radius: 50%;
    border: 3px solid white;
`;