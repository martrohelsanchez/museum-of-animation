import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Bg, centerHorVer} from '../../shared/styles';

export const Cont = styled(Bg)`
    ${centerHorVer};
    background-color: white;
`;

export const ListCont = styled(motion.ul)`
    border-radius: 5px;
    padding: 40px;
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    font-family: 'Raleway', sans-serif;
    cursor: pointer;
`;

export const List = styled(motion.li)<{num: number}>`
    list-style-type: none;
    font-size: 200%;
    color: white;
    text-align: center;
    padding: 20px 0;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(50, 50, 73, 0.5);
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