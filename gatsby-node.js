const fetch = require('node-fetch')
const qs = require('querystring')
const cheerio = require('cheerio')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

exports.createSchemaCustomization = async ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MicrocmsPosts implements Node {
      featuredImg: File @link(from: "featuredImg___NODE")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  store,
  cache,
  reporter,
  createNodeId,
}) => {
  if (node.internal.type === "MicrocmsPosts") {
    // アイキャッチ画像を node にする
    if ('featuredImage' in node && node.featuredImage) {
      let fileNode = await createRemoteFileNode({
        url: node.featuredImage.image.url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
        reporter
      })

      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node.featuredImg = fileNode.id
      }
    }

    // 本文中の画像を node にする
    if ('body' in node && node.body) {
      const $ = cheerio.load(node.body)
      let imageSrcs = []
      $('img').each((i, elm) => {
        if (elm.attribs.src) {
          imageSrcs.push(elm.attribs.src)
        }
      })

      const images = await Promise.all(
        imageSrcs.map(url =>
          createRemoteFileNode({
            url: url,
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          })
        )
      )

      await createNodeField({
        node,
        name: "images",
        value: images,
      })
      
      node.fields.images.forEach((image, i) => {
        image.localFile___NODE = images[i].id
      })
    }
  }
}

exports.sourceNodes = async ({ 
  actions,
  createNodeId,
  createContentDigest,
  reporter 
}) => {
  const url = 'https://momio.microcms.io/api/v1/metadata'
  const apiKey = process.env.API_KEY
  const query = ''

  const { statusCode, body } = await fetchData(url, { apiKey, query })
  if (statusCode !== 200) {
    reporter.panic(`microCMS API ERROR:
URL: ${url}
statusCode: ${statusCode}
message: ${body.message}`)
    return
  }

  const { title, description, author } = body

  const node = {
    title,
    description,
    author,
    id: createNodeId(`Metadata`),
    internal: {
      type: "Metadata",
      contentDigest: createContentDigest(title + description),
    },
  }
  actions.createNode(node)
}

function fetchData(url, { apiKey, query }) {
  // remove empty string or undefined or null query
  for (let q in query) {
    if (!query[q]) {
      delete query[q];
    }
  }

  const params = qs.stringify(query);
  const reqUrl = url + (params ? `?${params}` : '');

  return fetch(reqUrl, {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(async res => {
    const body = await res.json();
    return { body, statusCode: res.status };
  });
};