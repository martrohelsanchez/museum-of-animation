import React from 'react';
import styled from 'styled-components';

function RepoLink() {
  return (
    <Container
      href="https://github.com/martrohelsanchez/museum-of-animation"
      target="_blank"
    >
      <Logo src="/githubLogo.png" />;
    </Container>
  );
}

const Container = styled.a`
  position: fixed;
  z-index: 99;
  top: 10px;
  right: 30px;

  @media all and (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 40px;
`;

export default RepoLink;
