import styled from 'styled-components'
import { Link } from 'gatsby'
import media from 'styled-media-query'

export const NavigationButton = styled(Link)`
  background: var(--primary-color);
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  padding: var(--space-sm) var(--space);
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  ${media.greaterThan('medium')`
    margin-left: var(--space-lg);
  `}
`;

export const Navigation = styled.nav`
  display: none;
  flex-direction: column;
  margin-top: var(--space-sm);
  &.active {
    display: flex;
  }
  ${media.greaterThan('medium')`
    display: flex;
    flex-direction: row;
    align-items: center;
  `}
`;
