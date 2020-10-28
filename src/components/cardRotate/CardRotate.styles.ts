import {motion} from 'framer-motion';
import styled from 'styled-components';

export const CardRotate = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    height: 100%;
    width: 100%;
    background-color: #dbcbbd;
    overflow: hidden;
`;

export const CardCont = styled.div`
    width: 50%;
    max-width: 350px;
    margin-bottom: 30px;
`;

export const Card = styled(motion.div)`
    background-color: white;
    width: 100%;
    height: 500px;
    border-radius: 20px;
    cursor: grab;

    width: 50%;
    max-width: 350px;
    margin-bottom: 30px;
`;