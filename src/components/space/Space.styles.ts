import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Bg = styled.div`
    background-color: #2c2e33;
    position: relative;
    height: 100%;
    width: 100%;
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