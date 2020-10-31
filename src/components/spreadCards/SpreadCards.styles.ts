import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    background-color: #f4f6ff;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardCont = styled(motion.div)`
    position: relative;
    height: 450px;
    width: 300px;
`;

export const Card = styled(motion.div)`
    position: absolute;
    background-color: white;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-size: auto 90%;
    /* background-size: 95% auto; */
    background-repeat: no-repeat;
    background-position: center center;
`;