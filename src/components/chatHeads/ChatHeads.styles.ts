import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Bg as bg, centerHorVer} from '../../shared/styles';

export const Bg = styled(bg)`
    background-color: #28abb9;
    position: relative;
`;

export const ChatHead = styled(motion.div)`
    ${centerHorVer};
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    cursor: grab;
    touch-action: none;

    &:active {
        cursor: grabbing;
    }
`

export const UserImg = styled.img`
    height: 90%;
    width: 90%;
    border-radius: 50%;
`;