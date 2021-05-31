const visit = require('../visit')

function process(node) {
  if(node.type !== "element" || node.tagName !== "iframe") {
    return false
  }

  const iframe = Object.assign({}, JSON.parse(JSON.stringify(node)))
  node.tagName = 'div'
  node.properties = { className: ['iframe-wrapper']}
  node.children = [iframe]

  return true
}

// node, vfile, done を受け取る関数を返す
function modIframe() {
  return function (node, vfile, done) {
    try {
      visit(process, node, null, 0);
      done();
    } catch (err) {
      done(err);
    }
  };
}

module.exports = modIframe