import styled from 'styled-components';

export const Section = styled.section<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
    width: 100vw;
    height: 100vh;
`;