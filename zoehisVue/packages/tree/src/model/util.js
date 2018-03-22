export const NODE_KEY = '$treeNodeId';

export const markNodeData = function(node, data) {
  if (data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

export const getNodeKey = function(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};

export const toTree = function (data, idName, parentIdName) {

  if (!data instanceof Array){ return; }

  data.forEach(function(item) {
    delete item.children;
  });

  const map = {};
  data.forEach(function(item) {
    map[item[idName]] = item;
  });

  const val = [];
  data.forEach(function(item) {

    var parent = map[item[parentIdName]];

    if (parent) {

      ( parent.children || ( parent.children = [] ) ).push(item);

    } else {
      val.push(item);
    }

  })
  return val;
}


export const objectAssign = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

