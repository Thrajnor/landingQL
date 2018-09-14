import React from 'react';
import PropTypes from 'prop-types';
import ProfilePage from 'components/Pages/ProfilePage/ProfilePage';
import { graphql } from 'gatsby'
import withRoot from 'withRoot';

const Cockpit = ({ pageContext, data }) => {
  const post = data.allMarkdownRemark.edges[0].node;
  return (
    <ProfilePage name={post.frontmatter.name} position={post.frontmatter.position} image={post.frontmatter.image} html={post.frontmatter.html} />
  )
}

Cockpit.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default withRoot(Cockpit);

export const pageQuery = graphql`
  query ProgilePage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { order: DESC, fields: [frontmatter___date]}
      filter: { frontmatter: { tags: { in : [$tag] } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            position
            name
            desc
            image
          }
        }
      }
    }
  }
`;