const path = require(`path`);

const topics = require(`./config/topics`);
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`);

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page);

  // Grab the keys ('en' & 'pt') of topics and map over them
  Object.keys(topics).map(topic => {
    // Use the values defined in "topics" to construct the path
    const localizedPath = topics[topic].default
      ? page.path
      : `${topics[topic].path}${page.path}`;

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/pt/")
      // We want to remove that (e.g. "pt/")
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        locale: topic,
        dateFormat: topics[topic].dateFormat,
      },
    });
  });
};

// Correcting language and slug to the frontmatter of each file
// A new node is created automatically with the filename
// It's necessary to do that to filter by language
// And the slug make sure the urls will be the same for all posts
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // Check for "MarkdownRemark" type so that other files (e.g. images) are excluded
  if (node.internal.type === `MarkdownRemark`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    // It will return the file name without '.md' string (e.g. "file-name" or "file-name.lang")
    const name = path.basename(node.fileAbsolutePath, `.md`);

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(topics, o => o.default === true);

    // Check if file.name.lang has the default lang type.
    // (in this case the default language is for files set with "en")
    const isDefault = name.split(`.`)[1] === defaultKey;

    // Files are defined with "name-with-dashes.lang.md"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const topic = isDefault ? defaultKey : name.split(`.`)[1];

    // Get the entire file name and remove the lang of it
    const slugFileName = name.split(`.`)[0];
    // Than remove the date if the name has the date info
    const slug =
      slugFileName.length >= 10
        ? slugFileName.slice(11)
        : slugFileName;

    // Adding the nodes on GraphQL for each post as "fields"
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `locale`, value: topic });
    createNodeField({ node, name: `isDefault`, value: isDefault });
  }
};

// Creating Posts and Pages for each node in AllMarkdownRemark
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Templates for Posts List and Single post
  const postTemplate = path.resolve(`./src/templates/post.js`);
  const postsListTemplate = path.resolve(
    `./src/templates/posts-list.js`,
  );
  const pageTemplate = path.resolve(`./src/templates/page.js`);

  const result = await graphql(`
    {
      files: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              locale
              isDefault
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    return;
  }

  // Posts and Pages created by markdown (from blog and pages directory)
  const contentMarkdown = result.data.files.edges;

  // Total of posts (only posts, no pages)
  // It will be increase by the next loop
  let postsTotal = 0;

  // Creating each post
  contentMarkdown.forEach(({ node: file }) => {
    // Getting Slug and Title
    const slug = file.fields.slug;
    const title = file.frontmatter.title
    const url = file.frontmatter.url

    // Use the fields created in exports.onCreateNode
    const locale = file.fields.locale;
    const isDefault = file.fields.isDefault;

    // Check if it's page (to differentiate post and page)
    const isPage = file.frontmatter.page;

    // Setting a template for page or post depending on the content
    const template = isPage ? pageTemplate : postTemplate;

    // Count posts
    postsTotal = isPage ? postsTotal + 0 : postsTotal + 1;

    createPage({
      path: localizedSlug({ isDefault, locale, slug, isPage }),
      component: template,
      context: {
        // Pass both the "title" and "locale" to find a unique file
        // Only the title would not have been sufficient as articles could have the same title
        // in different languages, e.g. because an english phrase is also common in german
        locale,
        title,
      },
    });
  });

  // Creating Posts List and its Pagination
  const postsPerPage = 4;
  const topicsNum = Object.keys(topics).length;
  const numPages = Math.ceil(postsTotal / topicsNum / postsPerPage);

  Object.keys(topics).map(topic => {
    // Use the values defined in "topics" to construct the path
    const localizedPath = `/topic/${topics[topic].path}`;

    return Array.from({ length: numPages }).forEach((_, index) => {
      createPage({
        path:
          index === 0
            ? `${localizedPath}`
            : `${localizedPath}/page/${index + 1}`,
        component: postsListTemplate,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages,
          currentPage: index + 1,
          locale: topic,
          dateFormat: topics[topic].dateFormat,
        },
      });
    });
  });
};
