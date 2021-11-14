import styled from 'styled-components';

import { centerHorVer, parentsize } from 'src/shared/styles';

type ContentProps = {
  bgColor?: string;
};

export const Container = styled.div`
  ${centerHorVer};
  background-color: white;
  width: 411px;
  height: 90%;
  max-height: 731px;
  border-radius: 60px;
  box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    border-radius: 0;
    height: 100%;
    max-height: 100%;
    width: 100%;
    padding: 0;
  }
`;

export const Content = styled.div<ContentProps>`
  ${parentsize};
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  border-radius: 50px;

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    border-radius: 0;
  }
`;
