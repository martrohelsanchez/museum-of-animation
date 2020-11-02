import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Bg as bg} from '../../shared/styles';

export const Bg = styled(bg)`
    background-color: #2c2e33;
    position: relative;
`;

export const Particle = styled(motion.div)`
    position: absolute;
    border-radius: 50%;
    background-color: white;
`;

export const Astronaut = styled(motion.img)`
    position: absolute;
    width: 100px;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

export const Asteroid = styled(Astronaut)`
    width: 50px;
`;