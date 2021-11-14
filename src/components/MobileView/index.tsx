import React from 'react';

import * as S from './styles';

type Props = {
  children: React.ReactNode;
  className?: string;
  contentBgColor?: string;
};

function MobileView(props: Props) {
  const { children, className = '', contentBgColor } = props;

  return (
    <S.Container className={className}>
      <S.Content bgColor={contentBgColor} className="mobile-view-content">
        {children}
      </S.Content>
    </S.Container>
  );
}

export default MobileView;
