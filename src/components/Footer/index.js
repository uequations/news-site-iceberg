import React from 'react';
import SocialLinks from '../SocialLinks';
import CompanyAddress from '../CompanyAddress'

import * as S from './styled';

const Footer = () => {

  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <SocialLinks />
        <CompanyAddress />
      </S.FooterContainer>
    </S.FooterWrapper>
  );
};

export default Footer;
