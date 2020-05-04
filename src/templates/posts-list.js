import React from 'react';
import { graphql } from 'gatsby';
import PostItem from '../components/PostItem';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';

import Pagination from '../components/Pagination';

import * as S from '../components/ListWrapper/styled';

const Blog = props => {
  const postList = props.data.allMarkdownRemark.edges;

  // Logic for Pagination Component
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/topic' : `/topic/${currentPage - 1}`;
  const nextPage = `/topic/page/${currentPage + 1}`;

  return (
    <>
        <SEO title="IRS NEWS | Universal Equations"/>
        <TitlePage text="IRS NEWS"/>

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
            <PostItem
                slug={`/topic/${slug}`}
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
  );
};

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
`;

export default Blog;
