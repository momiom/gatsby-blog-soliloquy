// hastの要素を訪問する関数
function visit(visitor, node, parentNode, index) {
  if (visitor(node, parentNode, index)) {
    return;
  }

  if (!node.children) {
    return;
  }

  for (let i = 0; i < node.children.length; i++) {
    visit(visitor, node.children[i], node, i);
  }
}


module.exports = visit