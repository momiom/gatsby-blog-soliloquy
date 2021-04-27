const fetch = require('node-fetch')
const qs = require('querystring')
const fs = require('fs')
const cheerio = require('cheerio')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.onPreInit = async ({ actions, store }) => {
  const { setPluginStatus } = actions
  const state = store.getState()

  const plugin = state.flattenedPlugins.find(
    plugin => plugin.name === 'gatsby-plugin-manifest',
  )
  if (plugin) {
    const { statusCode, body } = await fetchSiteMetaData()

    if (statusCode !== 200) {
      reporter.panic(
        `microCMS API ERROR: URL: ${url}, statusCode: ${statusCode}, message: ${body.message}`,
      )
      return
    }

    const { name, short_name, icon } = body
    saveIconImage(icon.url)

    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...{ name, short_name },
    }
    setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin)
  }
}

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
  if (node.internal.type === 'MicrocmsPosts') {
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
            reporter,
          }),
        ),
      )

      await createNodeField({
        node,
        name: 'images',
        value: images,
      })

      node.fields.images.forEach((image, i) => {
        image.localFile___NODE = images[i].id
      })
    }
  }
}

let lastResponse = {}
let lastReqUrl = ''

function fetchSiteMetaData(
  url = 'https://momio.microcms.io/api/v1/metadata',
  { apiKey = process.env.API_KEY, query = '' } = {},
) {
  for (let q in query) {
    if (!query[q]) {
      delete query[q]
    }
  }

  const params = qs.stringify(query)
  const reqUrl = url + (params ? `?${params}` : '')

  if (lastReqUrl === reqUrl && lastResponse === 200) {
    return LastResponse
  }
  lastReqUrl = reqUrl

  let response = {}
  for (let retry = 0; retry < 3; retry++) {
    response = fetch(reqUrl, {
      headers: {
        'x-api-key': apiKey,
      },
    }).then(async res => {
      const body = await res.json()
      return { statusCode: res.status, body }
    })

    if (response.statusCode === 200) {
      break
    }
  }
  lastResponse = response

  return response
}

function saveIconImage(url) {
  fetch(url).then(async res => {
    const data = await res.buffer()
    fs.writeFile(`${__dirname}/src/images/icon.png`, data, err => {
      if (err) throw err
    })
  })
}
