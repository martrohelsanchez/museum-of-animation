import styled from 'styled-components';

import {Bg as bg, CenterHorVer} from '../../shared/styles';
import {motion} from 'framer-motion';

export const Bg = styled(bg)`
    ${CenterHorVer};
    background-color: #f4f4f2;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const StackElements = styled(motion.div)`
    ${CenterHorVer};
    position: relative;
    background-color: transparent;
    width: 588px;
    height: 385px;
`;

export const EnvelopeCont = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
`;

export const EnvelopeBack = styled(motion.img)`
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
`;

export const EnvelopeFront = styled(EnvelopeBack)`
    z-index: 5;
`;

export const EnvelopeFlap = styled(EnvelopeBack)`
    transform: rotate(180deg);
    z-index: 6;
`;

export const Pampahaba = styled.div`
    height: 1000%;
`;

export const ChristmasCard = styled(motion.img)`
    position: absolute;
    top: 20px;
    background-color: black;
    width: 90%;
    z-index: 4;
`;