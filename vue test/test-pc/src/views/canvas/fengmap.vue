<template>
  <div style="width: 100%; height: 100%">
    <!-- <div class="btnbox">
      <el-button @click="addTilelayer()">矢量瓦片</el-button><br>
      <el-button @click="addTilelayerAMAP()">卫星影像</el-button><br>
      <el-button @click="show()">隐藏/显示</el-button><br>
      <el-button @click="deleteMarker()">删除</el-button>
    </div> -->
    <div class="search-info">查询出的要素：</div>
    <div id="fengmap" class="mapbox" />
  </div>
</template>

<script>
import fengmap from 'fengmap/build/fengmap.map.min' // 核心包
import 'fengmap/build/fengmap.analyser.min' // 分析器
import 'fengmap/build/fengmap.plugin.min' // 插件包
import 'fengmap/build/fengmap.effect.min' // 特效包

import '../../static/lib/ol'

const PolygonOption = {
  height: 5,
  points: [
    { 'x': 12619602.721972043, 'y': 2621875.324219443, 'z': 102 },
    { 'x': 12619630.271677712, 'y': 2621853.606252872, 'z': 100.40000000596048 },
    { 'x': 12619611.932201978, 'y': 2621844.9474659883, 'z': 102 },
    { 'x': 12619642.438505266, 'y': 2621881.2061033067, 'z': 102.0101754400829 }
    // {
    //   x: 12619617.362326605,
    //   y: 2621882.6430324786
    // },
    // {
    //   x: 12619636.017352777,
    //   y: 2621884.395266865
    // },
    // {
    //   x: 12619629.371257633,
    //   y: 2621852.5161471497
    // },
    // {
    //   x: 12619618.360931246,
    //   y: 2621840.2641846496
    // },
    // {
    //   x: 12619602.616454065,
    //   y: 2621844.9678212376
    // }
  ]
}

export default {
  name: 'CanvasFengmap',
  data() {
    return {
      map: null
    }
  },
  mounted() {
    // debugger
    if (navigator.geolocation) {
      debugger
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
    } else {
      debugger
      console.log('您的浏览器不支持使用HTML 5来获取地理位置服务')
    }
    this.init()
  },
  methods: {
    // 定位数据获取成功响应
    onSuccess(position) {
      console.log(
        '纬度: ' +
          position.coords.latitude +
          '\n' +
          '经度: ' +
          position.coords.longitude +
          '\n' +
          '海拔: ' +
          position.coords.altitude +
          '\n' +
          '水平精度: ' +
          position.coords.accuracy +
          '\n' +
          '垂直精度: ' +
          position.coords.altitudeAccura
      )
    },

    // 定位数据获取失败响应
    onError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('您拒绝对获取地理位置的请求')
          break
        case error.POSITION_UNAVAILABLE:
          console.log('位置信息是不可用的')
          break
        case error.TIMEOUT:
          console.log('请求您的地理位置超时')
          break
        case error.UNKNOWN_ERROR:
          console.log('未知错误')
          break
      }
    },
    init() {
      const that = this
      // let map = null
      const options = {
        // appName: 'newcapec',
        // key: '34a692ba5be8f888061c5f47275adafd',
        appName: '蜂鸟研发SDK_2_0',
        key: '57c7f309aca507497d028a9c00207cf8',
        container: document.getElementById('fengmap'),
        mapID: '1321274646113083394',
        // mapID: '1424574263941844994',
        // mapURL: './data/',
        // themeID: '1492064371565502465',
        // themeURL: './data/theme/',
        visibleLevels: [2],
        level: 2
      }

      this.map = new fengmap.FMMap(options)
      console.log('fengmap', fengmap)
      this.map.on('click', function(event) {
        console.log(
          '事件触发：' + event.type + ' 坐标：' + JSON.stringify(event.coords)
        )
        PolygonOption.points.push(event.coords)
        console.log('PolygonOption.points', PolygonOption.points)
        that.initAnalyser()
        const polygon = new fengmap.FMPolygonMarker(PolygonOption)
        polygon.addTo(that.map.getFloor(2))
      })
      this.map.on('loaded', function() {
        var scrollFloorCtlOpt = {
          position: fengmap.FMControlPosition.RIGHT_TOP,
          floorButtonCount: 5,
          offset: {
            x: -20,
            y: 20
          },
          viewModeControl: true,
          floorModeControl: true,
          needAllLayerBtn: true
        }
        const scrollFloorControl = new fengmap.FMToolbar(scrollFloorCtlOpt)
        scrollFloorControl.addTo(that.map)

        const toolbar = new fengmap.FMZoomControl()
        toolbar.addTo(that.map)

        that.initAnalyser()
        const polygon = new fengmap.FMPolygonMarker(PolygonOption)
        polygon.addTo(that.map.getFloor(2))
      })
    },
    initAnalyser() {
      const that = this
      const analyser = new fengmap.FMSearchAnalyser(
        {
          map: that.map
        },
        function() {
          const request = that.initRequest()
          analyser.query(request, (result) => {
            that.markSearchResult(result)
          })
        }
      )
    },
    initRequest() {
      var searchRequest = new fengmap.FMSearchRequest()
      searchRequest.levels = [2] // 查询的楼层范围。
      searchRequest.type = fengmap.FMType.MODEL // 查询的元素类型。
      searchRequest.addCondition({
        polygon: PolygonOption.points
      })
      return searchRequest
    },
    markSearchResult(result) {
      const that = this
      result.forEach((feature) => {
        if (
          (feature.type == fengmap.FMType.MODEL && feature.name) ||
          (feature.type == fengmap.FMType.FACILITY && feature.name) ||
          (feature.type == fengmap.FMType.LABEL && feature.name)
        ) {
          const marker = new fengmap.FMImageMarker({
            url: './images/red.png',
            x: feature.center.x,
            y: feature.center.y,
            anchor: fengmap.FMMarkerAnchor.BOTTOM
          })
          var level = that.map.getLevel()
          var floor = that.map.getFloor(level)
          marker.addTo(floor)
          that.updateUI(feature.FID + ' ' + feature.name)
        }
      })
    },
    updateUI(msg) {
      var infoDiv = document.body.getElementsByClassName('search-info')[0]
      var li = document.createElement('li')
      li.innerText = msg
      infoDiv.appendChild(li)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-info {
  // border: 1px solid #f00;
  display: flex;
  position: absolute;
  // width: 100px;
  // height: 200px;
  z-index: 100;
}
.mapbox {
  width: 100vw;
  height: 100%;
  border: 1px solid;
}
</style>
