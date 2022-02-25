// 创建index.js
// 写入
import VirtualSelector from './throttlingSelect.vue'

const VirSelector = {
  install(Vue) {
    Vue.component('virtual-selector', VirtualSelector)
    Vue.component('VirtualSelector', VirtualSelector)
  }
}

export default VirSelector

// const pageComponents = require.context("@/views/pageComponents",true,/.vue$/)
// export const components={}
// pageComponents.keys().forEach(item=>{
//     const name = path.basename(item,".vue")
//     components[name] = pageComponents(item).default
// })
