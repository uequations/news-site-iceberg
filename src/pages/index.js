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
        latestPosts,
        allPosts,
    } = useTranslations()

    const postList = allMarkdownRemark.edges

    return (
        <div className="homepage">
            <SEO title={pageTitle}/>
            <TitlePage text={hello}/>
            <p>{subline}</p>

            <br/>

            <EmailShareButton>
                <EmailIcon/>
            </EmailShareButton>
            <FacebookShareButton quote={''} url={'https://news.uequations.com/'}>
                <FacebookIcon/>
            </FacebookShareButton>
            <LinkedinShareButton url={'https://news.uequations.com/'}>
                <LinkedinIcon/>
            </LinkedinShareButton>
            <TwitterShareButton url={'https://news.uequations.com/'}>
                <TwitterIcon/>
            </TwitterShareButton>

            <hr style={{ margin: `2rem 0` }}/>

            <h2>
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
