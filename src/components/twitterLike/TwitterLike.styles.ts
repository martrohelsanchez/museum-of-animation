import styled from 'styled-components';
import {motion} from 'framer-motion';

import {ParentSize, CenterHorVer} from '../../shared/styles';

export const Heart = styled(motion.path)``;

export const Svg = styled(motion.svg)`
    display: block;
    position: relative;
    z-index: 15;
    top: 0;
    left: 0;
`;

export const TwitterLike = styled(motion.div)`
    ${ParentSize};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

export const WaveOuter = styled(motion.div)`
    ${CenterHorVer};
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
    ${CenterHorVer};
    position: relative;  
`;