import styled, { css } from 'styled-components';

export const MobileView = styled.div`
  background-color: white;
  width: 411px;
  height: 90%;
  max-height: 731px;
  border-radius: 60px;
  box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    & {
      border-radius: 0;
      height: 100%;
      max-height: 100%;
      width: 100%;
    }
  }
`;

//Child elements must have property position: absolute;
export const StackElements = styled.div`
  position: relative;
  background-color: transparent;
`;

export const Bg = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const centerHorVer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const parentsize = css`
  width: 100%;
  height: 100%;
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
