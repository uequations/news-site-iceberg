import React from 'react'

import { Twitter } from 'styled-icons/boxicons-logos/Twitter'
import { Github } from 'styled-icons/boxicons-logos/Github'
import { Facebook } from 'styled-icons/boxicons-logos/Facebook'
import { Linkedin } from 'styled-icons/boxicons-logos/Linkedin'

import * as S from './styled'

const SocialShare = () => {
    return (
        <S.SocialLinksList>
            <S.SocialLinksItem>
                <S.SocialLinksLink
                    href="https://github.com/uequations"
                    title="Github"
                    target="_blank"
                >
                    <Github/>
                </S.SocialLinksLink>
            </S.SocialLinksItem>
            <S.SocialLinksItem>
                <S.SocialLinksLink
                    href="https://twitter.com/uequations"
                    title="Twitter"
                    target="_blank"
                >
                    <Twitter/>
                </S.SocialLinksLink>
            </S.SocialLinksItem>
            <S.SocialLinksItem>
                <S.SocialLinksLink
                    href="https://facebook.com/uequations"
                    title="Facebook"
                    target="_blank"
                >
                    <Facebook/>
                </S.SocialLinksLink>
            </S.SocialLinksItem>
            <S.SocialLinksItem>
                <S.SocialLinksLink
                    href="https://linkedin.com/company/uequations"
                    title="LinkedIn"
                    target="_blank"
                >
                    <Linkedin/>
                </S.SocialLinksLink>
            </S.SocialLinksItem>
        </S.SocialLinksList>
    )
}

export default SocialShare
