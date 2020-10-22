import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Circle = styled.circle`
    /* border: 4px solid green; */
    stroke: green;
    stroke-width: 4;
`;

export const Rect = styled.rect`
    height: 100px;
    width: 100px;
`;

export const Line = styled.line`
    stroke: tomato;
    stroke-width: 3px;
`;

export const Box = styled(motion.div)`
    background-color: black;
    width: 300px;
    height: 300px;
`;