
 const path = require('path');
 const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem')

 exports.createPages = ({ actions, graphql }) => {
   const { createPage } = actions;

   const blogPostTemplate = path.resolve("src/templates/blog-post.js");
   const categoryTemplate = path.resolve("src/templates/Cockpit.js");

   return graphql(`
     {
       allMarkdownRemark(
         sort: { order: DESC, fields: [frontmatter___date] }
         limit: 1000
       ) {
         edges {
           node {
             fields{
               slug
             }
             frontmatter {
               tags
               path
             }
           }
         }
       }
     }
   `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    _.each(posts, (post, index) => {
      if (!_.get(post, "node.frontmatter.tags", false)) {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;
        console.log(post.node.fields.slug)
        createPage({
          path: post.node.fields.slug,
          component: blogPostTemplate,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          }
        });
      }
    });

    let tags = []

    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });

    tags = _.uniq(tags);

    tags.forEach(tag => {
      createPage({
        path: `/${tag}/`,
        component: categoryTemplate,
        context: {
          tag,
        },
      });
    });
  });
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}





// const path = require('path');

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions;

//   const blogPostTemplate = path.resolve(`src/templates/LandingPage.js`);

//   return graphql(`{
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       limit: 1000
//     ) {
//       edges {
//         node {
//           frontmatter {
//             path
//           }
//         }
//       }
//     }
//   }`)
//     .then(result => {
//       if (result.errors) {
//         return Promise.reject(result.errors);
//       }

//       result.data.allMarkdownRemark.edges
//         .forEach(({ node }) => {
//           createPage({
//             path: node.frontmatter.path,
//             component: blogPostTemplate,
//             context: {} // additional data can be passed via context
//           });
//         });
//     });
// }