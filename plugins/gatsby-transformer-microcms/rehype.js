const unified = require('unified')
const rehypeParser = require('rehype-parse')
const stringify = require('rehype-stringify')

const modIframe = require('./modifier/iframe')
const modCode = require('./modifier/code')

function process(body) {
  const processor = unified()
    .use(rehypeParser, { fragment: true })
    .use(modIframe)
    .use(modCode)
    .use(stringify)
    .freeze();

  return processor.processSync(body).toString();
}

module.exports = process