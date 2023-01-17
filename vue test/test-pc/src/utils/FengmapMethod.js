import fengmap from 'fengmap/build/fengmap.map.min' // 核心包
import 'fengmap/build/fengmap.analyser.min' // 分析器
import 'fengmap/build/fengmap.plugin.min' // 插件包
import 'fengmap/build/fengmap.effect.min' // 特效包

class FengmapMethod {
  constructor() {
    this.mapID = '1321274646113083394'
    this.key = '57c7f309aca507497d028a9c00207cf8'
    this.map = null
  }
  static getInstance(option) {
    debugger
    const options = option || {
      appName: '蜂鸟研发SDK_2_0',
      key: this.key,
      mapID: this.mapID,
      container: document.getElementById('fengmap')
    }

    if (!FengmapMethod.instance) {
      console.log('fengmap', fengmap)
      console.log('new fengmap.FMMap(options)', new fengmap.FMMap(options))
      FengmapMethod.instance = new fengmap.FMMap(options)
    }
    console.log('FengmapMethod.instance', FengmapMethod.instance)
    return FengmapMethod.instance
  }

  async init(config, callback) {
    console.log('初始化')
    debugger

    await this.injectFengMap()

    callback()
    // map.on('loaded', function() {})
  }
  injectBaiduMap(ak) {
    return new Promise(function(resolve, reject) {
      // window.init = function() {
      //   resolve(BMapGL)
      // }
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init&s=1`
      script.onerror = reject
      document.head.appendChild(script)
      console.log('注入百度完成')
    })
  }
}
export default FengmapMethod.getInstance()
