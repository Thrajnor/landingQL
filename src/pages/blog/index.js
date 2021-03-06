import React from "react";
// import LandingPage from "pages/LandingPage/LandingPage";
// import withRoot from '../withRoot';
import Link from "gatsby-link";
import { graphql } from 'gatsby'

// class Index extends React.Component {
//   render() {
//     return (
//         <LandingPage></LandingPage>
//     );
//   }
// }

// export default withRoot(Index);

// import '../css/index.css'; // add some style if you want!

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .filter(post => !post.node.frontmatter.tags)
        .map(({ node: post }) => {
          return (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={`/blog/posts${post.frontmatter.path}`}>{post.frontmatter.title}</Link>
              </h1>
              <h2>{post.frontmatter.date}</h2>
              <p>{post.excerpt}</p>
            </div>
          );
        })}
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
