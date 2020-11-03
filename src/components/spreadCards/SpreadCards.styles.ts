import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Bg as bg, CenterHorVer, ParentSize} from '../../shared/styles';

export const Bg = styled(bg)`
    ${CenterHorVer};
    background-color: #f4f6ff;
`;

export const CardCont = styled(motion.div)`
    position: relative;
    padding-top: min(50%, 450px);
    width: 28%;
    max-width: 300px;
`;

export const Card = styled(motion.div)`
    ${ParentSize};
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    background-size: auto 90%;
    background-repeat: no-repeat;
    background-position: center center;
    will-change: box-shadow;
`;