import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Bg, centerHorVer} from '../../shared/styles';

export const Cont = styled(Bg)`
    ${centerHorVer};
    background-color: #333456;
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

export const List = styled(motion.li)<{bgColor: string}>`
    list-style-type: none;
    font-size: 200%;
    color: #333456;
    text-align: center;
    padding: 20px 0;
    margin: 10px 0;
    border-radius: 10px;
    background-color: ${({bgColor}) => bgColor};
`;