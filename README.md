<img src="./src/images/favicon.png" width="150">

# Community & Government News Site

## 🚀 Getting Started

Assuming [Gatsby](https://github.com/gatsbyjs/gatsby/) is installed, run the following commands to install the project:

**With gatsby-cli**:
```
$ gatsby new gatsby-multilanguage-site https://github.com/diogorodrigues/iceberg-gatsby-multilang.git
```

**With git clone**:
```
$ git clone https://github.com/uequations/news-site-iceberg.git your-project-name # Clone the project

cd your-project-name

rm -rf .git
yarn install # or npm install
gatsby develop # or yarn run develop
```


Running `gatsby develop` you will see the following URLs:

```
http://localhost:8000
http://localhost:8000/___graphql
http://localhost:8000/admin
```

## File Structure

A quick look at the top-level files and directories you'll see in a Gatsby project.

```
├── shared-link
│   ├── markdown-file.irs.md
│   ├── markdown-file.nytimes.md
│   ├── markdown-file.index.md
├── config
│   ├── menu
│   │   ├── irs.json
│   │   ├── nytimes.json
│   │   ├── index.json
│   ├── translations
│   │   ├── irs.json
│   │   ├── nytimes.json
│   │   ├── index.json
│   ├── topics.js
├── src
├── static
│   ├── admin
│   │   ├── config.yml
│   ├── assets
│   │   ├── img
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── wrapPageElement.js

```

1. **topic pages directories**:
   All markdown files to generate pages.

2. **config**:
   All language settings: languages, strings, menu...
   In `topics.js` you can set the languages and some others important info

3. **src**:
   Components, hooks, templates and fixed pages (Different of markdown pages, these pages have the same url for all languages and the text content needs to be inserted in `config/translations` files).

4. **static**:
   Netlify settings and images.

5. **gatsby-browser.js**:
   External files and the layout wrapper setting.

6. **gatsby-config.js**:
   Gatsby plugins.

7. **gatsby-node.js**:
   Logic for generating pages and posts by manipulating GraphQL.

8. **wrapPageElement.js**
   As this component wraps every page (due to the wrapPageElement API) we can be sure to have the locale available everywhere!

## About Netlify CMS

You must change the Netlify data "repo" and "site_domain" according your Github repository in `static/admin/config.yml`.

```
backend:
    name: github
    repo: _owner-name/repo-name_ # Path to your GitHub repository
    branch: master
    site_domain: _site-url_ # If site extists
```

## Important notes:
-  To add a shred links topic, you'll need to update the config/menu and config/translations folders as well as the topics.js file.
 
## Deploy

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/uequations/news-site-iceberg" rel="nofollow"><img src="https://camo.githubusercontent.com/be2eb66bb727e25655f1dcff88c2fdca82a77513/68747470733a2f2f7777772e6e65746c6966792e636f6d2f696d672f6465706c6f792f627574746f6e2e737667" alt="Deploy to Netlify" data-canonical-src="https://www.netlify.com/img/deploy/button.svg" style="max-width:100%;"></a>

---

💜 _Thanks_

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/0a6425cf-3817-41bf-82f8-a90b4e669f14/deploy-status)](https://app.netlify.com/sites/flamboyant-spence-8d97ac/deploys)
