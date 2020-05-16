import React from 'react'
import { graphql } from 'gatsby'
import LinkPostItem from '../components/LinkPostItem'
import TitlePage from '../components/TitlePage'
import SEO from '../components/seo'

import Pagination from '../components/Pagination'

import * as S from '../components/ListWrapper/styled'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton,
} from 'react-share'
import useTranslations from '../components/useTranslations'

const Blog = props => {
    const postList = props.data.allMarkdownRemark.edges

    // Logic for Pagination Component
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage =
        currentPage - 1 === 1 ? '/topic' : `/topic/${currentPage - 1}`
    const nextPage = `/topic/page/${currentPage + 1}`

    const {
        hello,
        subline,
        pageTitle,
        path
    } = useTranslations()

    const shareButtonStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    }

    return (
        <>
            <SEO title={pageTitle} description={subline}/>
            <TitlePage text={hello}/>
            <p>{subline}</p>
            <br/>
            <div style={shareButtonStyle}>
            <EmailShareButton subject={`I would like to share: ${pageTitle}`} body={`I would like to share: ${pageTitle}\n${subline}`} url={`https://news.uequations.com/topic/${path}`}>
                <EmailIcon/>
            </EmailShareButton>
            <FacebookShareButton quote={`I would like to share: ${pageTitle}\n${subline}`} url={`https://news.uequations.com/topic/${path}`}>
                <FacebookIcon/>
            </FacebookShareButton>
            <LinkedinShareButton title={pageTitle} summary={`I would like to share: ${pageTitle}\n${subline}`} source={pageTitle} url={`https://news.uequations.com/topic/${path}`}>
                <LinkedinIcon/>
            </LinkedinShareButton>
            <TwitterShareButton title={pageTitle} via={`uequations`} url={`https://news.uequations.com/topic/${path}`}>
                <TwitterIcon/>
            </TwitterShareButton>
            </div>

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
                             },
                             timeToRead,
                             fields: { slug },
                         },
                     }) => (
                        <LinkPostItem
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

            <Pagination
                isFirst={isFirst}
                isLast={isLast}
                currentPage={currentPage}
                numPages={numPages}
                prevPage={prevPage}
                nextPage={nextPage}
            />
        </>
    )
}

export const query = graphql`
    query PostsList($locale: String!, $dateFormat: String!, $skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: {fields: frontmatter___date, order: DESC},
            filter: {
                fields: { locale: { eq: $locale } }
                fileAbsolutePath: {regex: "/(topic)\/.*\\.md$/"}
            }
            limit: $limit
            skip: $skip
        ){
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

export default Blog
