class Client {
  constructor(nodes) {
    this.nodes = [...nodes]
    this.initEvent()
  }

  initEvent() {
    debugger
    this.nodes.forEach(item => {
      item.addEventListener('click', (e) => {
        this.handleClick(e.target)
      })
    })
  }

  handleClick(ele) {
    // 过滤把包含有active类名的元素取到存到 数组items 中
    const items = this.nodes.filter(item => {
      return item.classList.contains('active') // 判断class - node.classList.contains()
    })
    debugger
    if (items.length === 2 && !items.includes(ele)) {
      return
    }
    ele.classList.toggle('active') // 切换class - node.classList.toggle()
  }
}
export default Client
