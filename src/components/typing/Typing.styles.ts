import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    display: flex;
    background-color: #003a47;   
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const TypingBody = styled.div`
    position: relative;
    background-color: #efa985;
    border-radius: 200px;
    padding-top: 50%;
    margin: 0 auto;
    width: 100%;
`;

export const Dot = styled(motion.span)`
    display: inline-block;
    background-color: #003a47;
    border-radius: 50%;
    padding-top: min(20%, 70px);
    width: 20%;
    max-width: 70px;
    flex: 0 0 auto;
`;

export const DotsCont = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-sizing: border-box;
    padding: 0 10%;
`;

export const TypingCont = styled.div`
    width: 70%;
    max-width: 500px;
`;