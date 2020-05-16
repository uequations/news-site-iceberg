import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import PostItem from '../components/PostItem'
import TitlePage from '../components/TitlePage'
import useTranslations from '../components/useTranslations'

import * as S from '../components/ListWrapper/styled'

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
} from 'react-share'

import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    TwitterIcon,
} from 'react-share'


const Index = ({ data: { allMarkdownRemark } }) => {
    const {
        hello,
        subline,
        pageTitle,
    } = useTranslations()

    const postList = allMarkdownRemark.edges

    const shareButtonStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    }

    const centerText = {textAlign: 'center'}

    return (
        <div className="homepage">
            <SEO title={pageTitle}/>
            <TitlePage text={hello}/>
            <div style={centerText}>
                <p>{subline}</p>
            </div>
            <br/>

            <div style={shareButtonStyle}>
                <EmailShareButton subject={`I would like to share: ${pageTitle}`}
                                  body={`I would like to share: ${pageTitle}\n${subline}`}
                                  url={'https://news.uequations.com/'}>
                    <EmailIcon/>
                </EmailShareButton>
                <FacebookShareButton quote={`I would like to share: ${pageTitle}\n${subline}`}
                                     url={'https://news.uequations.com/'}>
                    <FacebookIcon/>
                </FacebookShareButton>
                <LinkedinShareButton title={pageTitle} summary={`I would like to share: ${pageTitle}\n${subline}`}
                                     source={pageTitle} url={'https://news.uequations.com/'}>
                    <LinkedinIcon/>
                </LinkedinShareButton>
                <TwitterShareButton title={pageTitle} via={`uequations`} url={'https://news.uequations.com/'}>
                    <TwitterIcon/>
                </TwitterShareButton>
            </div>

            <hr style={{ margin: `2rem 0` }}/>

            <h2 style={centerText}>
                <strong>TOPICS</strong>
            </h2>

            <br/>

            <S.ListWrapper>
                {postList.map(
                    ({
                         node: {
                             frontmatter: {
                                 background,
                                 category,
                                 date,
                                 description,
                                 title,
                                 image,
                                 url,
                                 topic,
                             },
                             timeToRead,
                             fields: { slug },
                         },
                     }) => (
                        <PostItem
                            slug={`topic/${slug}`}
                            background={background}
                            category={category}
                            date={date}
                            timeToRead={timeToRead}
                            title={title}
                            description={description}
                            image={image}
                            url={url}
                        />
                    ),
                )}
            </S.ListWrapper>

            <br/>

        </div>
    )
}

export default Index

export const query = graphql`
    query Index($locale: String!, $dateFormat: String!, ) {
        allMarkdownRemark(
            filter: {
                fields: { locale: { eq: $locale } }
                fileAbsolutePath: {regex: "/(topic)\/.*\\.md$/"}
            }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 10
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        description
                        category
                        background
                        image
                        date(formatString: $dateFormat)
                        url
                        hashTags
                        topic
                    }
                    timeToRead
                    fields {
                        locale
                        slug
                    }
                }
            }
        }
    }
`
