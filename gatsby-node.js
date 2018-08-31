
 const path = require('path');
 const _ = require('lodash');

 exports.createPages = ({ actions, graphql }) => {
   const { createPage } = actions;

   const blogPostTemplate = path.resolve("src/templates/blog-post.js");
   const categoryTemplate = path.resolve("src/templates/Cockpit.js");

   return graphql(`
     {
       allMarkdownRemark(
         sort: { order: DESC, fields: [frontmatter___date] }
         limit: 2000
       ) {
         edges {
           node {
             excerpt(pruneLength: 250)
             html
             frontmatter {
               tags
               date
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

    posts.forEach(({ node }) => {
      if (!_.get(node, "frontmatter.tags", false)) {
       
        createPage({
          path: `/${node.frontmatter.path}/`,
          component: blogPostTemplate,
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