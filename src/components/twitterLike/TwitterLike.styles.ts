import styled from 'styled-components';
import {motion} from 'framer-motion';

import {parentsize, centerHorVer} from '../../shared/styles';

export const Heart = styled(motion.path)``;

export const Svg = styled(motion.svg)`
    display: block;
    position: relative;
    z-index: 15;
    top: 0;
    left: 0;
`;

export const TwitterLike = styled(motion.div)`
    ${parentsize};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cfecff;
`;

export const WaveOuter = styled(motion.div)`
    ${centerHorVer};
    position: absolute;
    background-color: #bb90c2;
    height: 160px;
    width: 160px;
    border-radius: 50%;
    z-index: 2
`;

export const WaveInner = styled(motion.div)`
    height: 162px;
    width: 165px;
    border-radius: 50%;
    z-index: 5;
`;

export const LikeCont = styled.div`
    ${centerHorVer};
    position: relative;  
    cursor: pointer;
`;