# gatsby-source-remote-file

![Build Status](https://github.com/audunru/gatsby-source-remote-file/workflows/Validate%20and%20publish/badge.svg?branch=master)

## Description

_gatsby-source-remote-file_ is a simple wrapper around `createRemoteFileNode()` from [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)

Use it to add any URL as a file node in Gatsby, then optionally use a transformer plugin to turn the contents of the URL into other node(s).

## How to install

```sh
npm install gatsby-source-remote-file --save
```

or

```sh
yarn add gatsby-source-remote-file
```

Add the plugin to your _gatsby-config.js_:

```js
module.exports = {
  plugins: [
    // ... you likely have other plugins here
    {
      resolve: "gatsby-source-remote-file",
      options: {
        url: "https://jsonplaceholder.typicode.com/todos",
        name: "todos",
      },
    },
    // ... you likely have other plugins here as well
  ],
};
```

## Available options

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-remote-file",
      options: {
        // The source url of the remote file
        url: "https://jsonplaceholder.typicode.com/todos",

        // OPTIONAL
        // Provide a name for the created node (default: "remote")
        name: "todos",

        // OPTIONAL
        // The id of the parent node (i.e. the node to which the new remote File node will be linked to.
        parentNodeId: "yadi-yadi-yadi",

        // OPTIONAL
        // Adds htaccess authentication to the download request if passed in.
        auth: { htaccess_user: `USER`, htaccess_pass: `PASSWORD` },

        // OPTIONAL
        // Adds extra http headers to download request if passed in.
        httpHeaders: { Authorization: `Bearer someAccessToken` },

        // OPTIONAL
        // Sets the file extension
        ext: ".json",
      },
    },
  ],
};
```

## Examples of usage

You can transform the node created by this plugin with the `onCreateNode` API.

Continuing the _TODO_ example, add the following to _gatsby-node.js_ to create a node for each todo:

```js
exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  if (node.name !== "todos") return; // 'todos' is the name we gave the remote node in gatsby-config.js, so we only want to transform that

  try {
    const nodeContent = await loadNodeContent(node);
    const todos = JSON.parse(nodeContent);

    todos.forEach((todo) => {
      const childId = createNodeId(`${node.id}${todo.id}`);
      const todoNode = {
        ...todo,
        todoId: todo.id,
        sourceInstanceName: node.name,
        id: childId,
        children: [],
        parent: node.id,
        internal: {
          type: "Todo",
          contentDigest: createContentDigest(todo),
          description: "A todo to do for you, toodeloo",
        },
      };
      createNode(todoNode);
    });
  } catch (error) {
    console.error(error);
  }
};
```

## How to run tests

```sh
yarn test
```

## How to develop locally

Clone the repository and link it so that you can use it locally and test it in a Gatsby project:

```sh
git clone https://github.com/audunru/gatsby-source-remote-file.git
cd gatsby-source-remote-file
yarn install
yarn link
```

Create a new Gatsby project and link the local version of the plugin while you develop:

```sh
gatsby new gatsby-source-remote-file-test
cd gatsby-source-remote-file-test
yarn link "gatsby-source-remote-file"
yarn add gatsby-source-remote-file
```

You can now make changes in _gatsby-source-remote-file_, run `yarn develop` in the plugin directory and run `yarn develop` in your gatsby directory to test your changes.
