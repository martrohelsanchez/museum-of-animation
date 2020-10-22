import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    background-color: #28abb9;
    width: 100vw;
    height: 100vh;
`;

export const ChatHead = styled(motion.div)<{color: string}>`
    position: absolute;
    background-color: ${({color}) => color};
    height: 60px;
    width: 60px;
    border-radius: 50%;
`