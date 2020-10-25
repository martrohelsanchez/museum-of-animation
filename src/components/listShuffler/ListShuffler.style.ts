import styled from 'styled-components';
import {motion} from 'framer-motion';

export const ListCont = styled(motion.ul)`
    border-radius: 5px;
    padding: 40px;
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
`;

export const List = styled(motion.li)<{num: number}>`
    list-style-type: none;
    font-size: 200%;
    color: white;
    text-align: center;
    padding: 5px;
    margin: 3px 0;
    background-color: ${({num: key}) => {
        switch(key) {
            case 0:
                return 'turquoise';
            case 1:
                return 'hotpink';
            case 2: 
                return 'coral';
            case 3:
                return 'crimson';
            case 4:
                return '#ee6f57';
            case 5:
                return '#835858';
        }
    }};
`;

export const Cont = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;