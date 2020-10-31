import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    background-color: #28abb9;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const ChatHead = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    cursor: grab;
    touch-action: none;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

    &:active {
        cursor: grabbing;
    }
`

export const UserImg = styled.img`
    height: 90%;
    width: 90%;
    border-radius: 50%;
`;