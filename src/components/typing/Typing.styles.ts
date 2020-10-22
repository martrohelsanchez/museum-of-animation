import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    display: flex;
    background-color: #003a47;   
    width: 100vw;
    height: 100vh;
    align-items: center;
`;

export const TypingBody = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #efa985;
    border-radius: 200px;
    height: 250px;
    width: 70%;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 100px;
    box-sizing: border-box;
`;

export const Dot = styled(motion.span)`
    display: inline-block;
    background-color: #003a47;
    border-radius: 50%;
    height: 70px;
    width: 70px
`;