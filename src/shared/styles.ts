import styled from 'styled-components';

export const MobileView = styled.div`
    background-color: white;
    width: 411px;
    height: 731px;
    border-radius: 60px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    @media all and (max-width: ${({theme}) => theme.mobile}) {
        & {
            border-radius: 0;
            height: 100%;
            width: 100%;
        }
    }
`;