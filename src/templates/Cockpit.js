import React from 'react';
import PropTypes from 'prop-types';
import LandingPage from 'components/Pages/LandingPage/LandingPage';
import LoginPage from 'components/Pages/LoginPage/LoginPage';
import Components from 'components/Pages/Components/Components';
import { graphql } from 'gatsby'
import withRoot from 'withRoot';

const Cockpit = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const post = data.allMarkdownRemark.edges[0].node;
  const product = { title: post.frontmatter.productTitle, desc: post.frontmatter.productDesc }
  const team = post.frontmatter.team

  if (tag === "") {
    return (
      <LandingPage title={post.frontmatter.title} firstParagraph={post.html} desc={post.frontmatter.desc} product={product} team={team} />
    )
  } else if (tag === "LoginPage") {
    return (
      <LoginPage html={post.html} image={post.frontmatter.image} name={post.frontmatter.name} position={post.frontmatter.position} />
    )
  } else if (tag === "Components") {
    return (
      <Components html={post.html} image={post.frontmatter.image} name={post.frontmatter.name} position={post.frontmatter.position} />
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
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default withRoot(Cockpit);

export const pageQuery = graphql`
  query Cockpit($tag: String) {
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
            position
            name
            desc
            image
            productTitle
            productDesc
						team {
              name
              job
              desc
            }
          }
        }
      }
    }
  }
`;