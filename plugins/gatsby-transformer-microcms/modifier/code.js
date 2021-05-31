const visit = require('../visit')

function process(node) {
  if (
    node.type !== 'element' ||
    node.tagName !== 'pre' ||
    node.children.length !== 1 ||
    node.children[0].tagName !== 'code'
  ) {
    return false
  }

  const codeElm = node.children[0]

  if (!codeElm.children[0] || codeElm.children[0].type !== 'text') {
    return false
  }

  const planeCode = codeElm.children[0].value

  // １行目にはコード情報が ":言語タイプ:ファイル名" のように書かれている
  // 例えば ":js:script.js" のように書かれているので言語タイプ部分の "js" を取り出す
  if (planeCode.split('\n').length > 0) {
    const firstLine = planeCode.split('\n')[0]
    const code = planeCode.split('\n').slice(1).join('\n')

    if (firstLine.split(':').length > 1) {
      const split = firstLine.split(':')
      const langType = split[1]
      const fileName = split[2] ? split[2] : ''

      codeElm.properties = { className: [`language-${langType}`]}
      codeElm.children[0].value = code

      return true
    } else {
      codeElm.properties = { className: ['language-none']}
    }
  }

  return false
}

// node, vfile, done を受け取る関数を返す
function modCode() {
  return function (node, vfile, done) {
    try {
      visit(process, node, null, 0)
      done()
    } catch (err) {
      done(err)
    }
  }
}

module.exports = modCode
