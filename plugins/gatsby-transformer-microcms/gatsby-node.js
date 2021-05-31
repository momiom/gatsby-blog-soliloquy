const process = require('./rehype')

async function onCreateNode(
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  pluginOptions
) {
  if (node.internal.type === 'MicrocmsPosts') {
    const { createNode, createParentChildLink } = actions

    const body = process(node.body)

    const bodyNode = {
      body,
      id: createNodeId(`${node.id} body`),
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(body),
        type: 'ProcessedBody',
      },
    }
    createNode(bodyNode)
    createParentChildLink({ parent: node, child: bodyNode })
  }
}

exports.onCreateNode = onCreateNode