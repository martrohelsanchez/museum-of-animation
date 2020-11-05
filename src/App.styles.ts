import styled from 'styled-components';
import {motion} from 'framer-motion';

export const Section = styled(motion.section)`
    width: 100%;
    height: 100%;
    box-shadow: 0 0px 20px 0 rgba(50, 50, 73, 0.4);
    overflow: hidden;
    will-change: transform;

    @media all and (max-width: ${({ theme }) => theme.mobile}) {
        & {
            box-shadow: none;
        }
    }
`