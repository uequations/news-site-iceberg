import useMenu from '../useMenu'
import useTranslations from '../useTranslations'
import * as S from '../BackToAllTopicsButton/styled'
import React from 'react'

const BackToAllTopicsButton = ({ isActive}) => {

    return (
        <>
            <S.Navigation className={isActive ? 'active' : ''}>

                <S.NavigationButton to={'/'} aria-label={'BACK TO ALL TOPICS'}>
                    BACK TO ALL TOPICS
                </S.NavigationButton>

            </S.Navigation>
        </>
    );
};

export default BackToAllTopicsButton;
