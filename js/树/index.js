let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1',
        children: [
          {
            id: '1-1-1',
            title: '节点1-1-1'
          },
          {
            id: '1-1-2',
            title: '节点1-1-2',
            children: []
          }
        ]
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1'
      }
    ]
  }
]
console.log(tree)

// 广度优先
function treeForeach(tree, func) {
  let node, list = [...tree]
  while (node = list.shift()) {
    func(node)
    node.children && list.push(...node.children)
  }
}

// treeForeach(tree, node => { console.log(node.title) })

// 深度优先遍历的递归实现
function treeForeach1(tree, func) {
  tree.forEach(data => {
    func(data)
    data.children && treeForeach1(data.children, func) // 遍历子树
  })
}
function treeForeach2(tree, func) {
  tree.forEach(data => {
    data.children && treeForeach2(data.children, func) // 遍历子树
    func(data)
  })
}
// treeForeach1(tree, node => { console.log(node.title) })

function treeForeach3(tree, func) {
  let node, list = [...tree]
  while (node = list.shift()) {
    func(node)
    node.children && list.unshift(...node.children)
  }
}
// treeForeach3(tree, node => { console.log(node.title) })

function treeToList(tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node)
    node.level = level + 1
    node.children && treeToList(node.children, result, level + 1)
  })
  return result
}

// console.log('1',treeToList(tree))

function treeFilter(tree, func) {
  // 使用map复制一下节点，避免修改到原树
  return tree.map(node => 
    ({ ...node })).filter(node => {
    node.children = node.children && treeFilter(node.children, func)
    return func(node) || (node.children && node.children.length)
  })
}
treeFilter(tree, node => { console.log(node.title) })

function treeFind(tree, func) {
  for (const data of tree) {
    if (func(data)) return data
    if (data.children) {
      const res = treeFind(data.children, func)
      if (res) return res
    }
  }
  return null
}
// treeFind(tree, node => { console.log(node.title) })

function treeFindPath(tree, func, path = []) {
  // console.log("tree", tree, "func", func, "path", path)
  if (!tree) return []
  for (const data of tree) {
    path.push(data.id)
    if (func(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

let result = treeFindPath(tree, node => node.id === '2-1')
// console.log(result)

function treeFindPathMore(tree, func, path = [], result = []) {
  for (const data of tree) {
    path.push(data.id)
    func(data) && result.push([...path])
    data.children && treeFindPathMore(data.children, func, path, result)
    path.pop()
  }
  return result
}

let morePath = treeFindPathMore(tree, node => node.id === '1-1-2')
// console.log(morePath)
