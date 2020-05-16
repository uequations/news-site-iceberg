import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import useTranslations from '../useTranslations';

import * as S from './styled';

const PostItem = ({
  slug,
  background,
  category,
  date,
  title,
  description,
  image,
  url,
                    hashTags,
}) => {

  const { listImages } = useStaticQuery(
    graphql`
      query {
        listImages: allFile {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 350) {
                  src
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `,
  );

  const postImgCover = listImages.edges.find(img => {
    return img.node.childImageSharp.fluid.src.includes('cover');
  });

  const imgName = image ? image.split('/')[3] : false

  const postImg = imgName
      ? listImages.edges.find(img => {
        return img.node.childImageSharp.fluid.src.includes(imgName)
      })
      : false

  const anchorStyle = {
    textDecoration: 'none',
    display: 'block',
    marginBottom: 'var(--space)',
  }

  return (
      <a style={anchorStyle} href={url} target={'_self'}>
        <S.PostItemWrapper>
          {postImg && (
              <S.PostItemImg
                  fluid={postImg.node.childImageSharp.fluid}
                  alt={title}
              />
          )}
          {!postImg && (
              <S.PostItemImg
                  fluid={postImgCover.node.childImageSharp.fluid}
            alt={title}
          />
        )}

        <S.PostItemInfo>
          <S.PostItemTag background={background}>
            {category}
          </S.PostItemTag>
          <S.PostItemDate>
            Last accessed: {date}
          </S.PostItemDate>
          <S.PostItemTitle>{title}</S.PostItemTitle>
          <S.PostItemDescription>{description}</S.PostItemDescription>
          <S.PostItemDescription>{hashTags}</S.PostItemDescription>
        </S.PostItemInfo>
        </S.PostItemWrapper>
      </a>
  );
};

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  background: PropTypes.string,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
  hashTags: PropTypes.string,
};

export default PostItem;
