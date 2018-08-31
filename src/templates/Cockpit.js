import React from 'react';
import PropTypes from 'prop-types';
import LandingPage from 'pages/LandingPage/LandingPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import { graphql } from 'gatsby'
import withRoot from 'withRoot';

const Cockpit = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges: posts } = data.allMarkdownRemark;
  if (tag === "LandingPage") {
    return (
      <LandingPage title={posts[0].node.frontmatter.title} firstParagraph={posts[0].node.html} />
    )
  } else if (tag === "ProfilePage") {
    return (
      <ProfilePage/>
    )
  }
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
  query CategoryPage($tag: String) {
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
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;