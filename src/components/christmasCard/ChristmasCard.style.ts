import styled from 'styled-components';

import {Bg as bg, CenterHorVer, StackElements as stackElements, ParentSize} from '../../shared/styles';
import {motion} from 'framer-motion';

export const Bg = styled(bg)`
    ${CenterHorVer};
    background-color: #f4f4f2;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const StackElements = styled(stackElements)`
    ${CenterHorVer};
    width: 588px;
    height: 385px;
`;

export const StackCards = styled(stackElements)`
    ${ParentSize};
`;

export const EnvelopeCont = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
`;

const Envelope = styled(motion.img)`
    position: absolute;
    top: 0;
    width: 100%;
`;

export const EnvelopeBack = styled(Envelope)`
    z-index: 1;
`;

export const EnvelopeFront = styled(Envelope)`
    z-index: 5;
`;

export const EnvelopeFlap = styled(Envelope)`
    transform: rotate(180deg);
    z-index: 6;
`;

export const Pampahaba = styled.div`
    height: 1000%;
`;

export const CardCont = styled(motion.div)`
    position: absolute;
    top: 20px;
    background-color: black;
    width: 90%;
    height: 90%;
    z-index: 4;
    cursor: pointer;
`;

const Card = styled(motion.img)`
    ${ParentSize};
    position: absolute;
    top: 0;
    transform: perspective(900px);
    transform-origin: top center;
`;

export const CardLeftBack = styled(Card)`
    z-index: 5;
`;

export const CardLeftFront = styled(Card)`
    z-index: 4;
    transform: perspective(900px);
`;

export const CardRightFront = styled(Card)`
    z-index: 3;  
`;