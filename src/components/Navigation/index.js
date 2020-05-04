import React from 'react';
import useMenu from '../useMenu';
import useTranslations from '../useTranslations';

import * as S from './styled';

const Navigation = ({ isActive, handleToggleMenu }) => {
  const menuItems = useMenu();
  const {joinOurNewsletter} = useTranslations();

  return (
    <>
      <S.Navigation className={isActive ? 'active' : ''}>
        {menuItems.map(menu => (
          <S.ExternalNavigationLink
            href={menu.link}
            title={menu.name}
            activeClassName="active"
            onClick={() => handleToggleMenu()}>
            {menu.name}
          </S.ExternalNavigationLink>
        ))}

          <S.ExternalNavigationButton href={'https://sales.uequations.com/newsletter-signup/'} title={'JOIN OUR NEWSLETTER'} target={'_self'} aria-label="Login">
              {joinOurNewsletter}
          </S.ExternalNavigationButton>

      </S.Navigation>
    </>
  );
};

export default Navigation;
