class LocationMethod {
  constructor() {
    this.weixinJssdkUrl = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
    this.wanmeiqiyeJsUrl = './static/js/wanxiao-js-api.js'
    this.env = this.getHost()
  }

  static getInstance() {
    if (!LocationMethod.instance) {
      LocationMethod.instance = new LocationMethod()
    }
    return LocationMethod.instance
  }

  async init(config, ak, callback) {
    console.log('初始化')
    var url = ''
    var that = this
    if (this.env === 'WECHAT' || this.env === 'WXWORK') {
      url = this.weixinJssdkUrl
    }
    if (this.env === 'WANMEIQIYE') {
      url = this.wanmeiqiyeJsUrl
    }
    console.log('初始化百度api')
    try {
      if (!window.BMapGL) {
        await this.injectBaiduMap(ak)
      }
    } catch (error) {
      console.log(error)
      // await this.injectBaiduMap(ak);
    }

    var check = document.querySelectorAll(`script[src="${url}"]`)
    console.log('check' + check)
    if (check.length > 0) {
      that.initConfig(config)
      callback()
    } else {
      this.createJssdk(url, function() {
        that.initConfig(config)
        callback()
      })
    }
  }

  getHost() {
    // 获取宿主
    var ua = navigator.userAgent.toLowerCase()
    if (/MicroMessenger/i.test(ua) && !/wxwork/i.test(ua)) {
      // 微信环境
      return 'WECHAT'
    } else if (/DingTalk/i.test(ua)) {
      // 钉钉环境
      return 'DINGTALK'
    } else if (/Wanxiao/i.test(ua) || /Wanmeiqiye/gi.test(ua)) {
      // 完美企业环境
      return 'WANMEIQIYE'
    } else if (/wxwork/i.test(ua)) {
      // 企业微信环境
      return 'WXWORK'
    } else {
      return ''
    }
  }

  createJssdk(url, callback) {
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    script.addEventListener(
      'load',
      function() {
        callback()
      },
      false
    )
  }

  injectBaiduMap(ak) {
    return new Promise(function(resolve, reject) {
      window.init = function() {
        resolve(BMapGL)
      }
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init&s=1`
      script.onerror = reject
      document.head.appendChild(script)
      console.log('注入百度完成')
    })
  }

  initConfig(config) {
    if (this.env === 'WECHAT' || this.env === 'WXWORK') {
      this.initWexinConfig(config)
    }
  }

  initWexinConfig(res) {
    wx.config({
      beta: true,
      debug: false,
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名
      jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
    })
    wx.error(function(err) {
      console.log(err)
      alert(err.errMsg)
    })
  }

  coordTransform(position) {
    // 坐标转换
    return new Promise((resolve) => {
      const convertor = new BMapGL.Convertor()
      const ggPoint = new BMapGL.Point(position.longitude, position.latitude)
      const pointArr = []
      const COORDINATES_WGS84 = 1 // WGS84坐标
      const COORDINATES_BD09 = 5 // 百度bd09经纬度坐标
      pointArr.push(ggPoint)
      convertor.translate(
        pointArr,
        COORDINATES_WGS84,
        COORDINATES_BD09,
        function(data) {
          if (data.status === 0) {
            const obj = {}
            obj.longitude = data.points[0].lng
            obj.latitude = data.points[0].lat
            resolve(obj)
          } else {
            console.log('坐标转换异常')
          }
        }
      )
    })
  }

  insertBaiduWebApi(position) {
    return new Promise(function(resolve, reject) {
      var check = document.querySelectorAll(`script`)
      for (const item of check) {
        const src = item.getAttribute('src')
        if (
          src &&
          src.indexOf('https://api.map.baidu.com/reverse_geocoding/v3') > -1
        ) {
          document.head.removeChild(item)
        }
      }
      //
      window.BaiduWebApiInit = function(e) {
        console.log('逆地理编码结果')
        console.log(e)
        resolve(e)
      }
      var script = document.createElement('script')
      // script.src = `https://api.map.baidu.com/reverse_geocoding/v3/?ak=TOvkkj5r8A9dxsaXMxbet6bjcTNaKt6V&output=json&location=${position.latitude},${position.longitude}&extensions_poi=1&radius=300&callback=BaiduWebApiInit`;
      script.src = `https://api.map.baidu.com/reverse_geocoding/v3/?ak=TOvkkj5r8A9dxsaXMxbet6bjcTNaKt6V&output=json&location=${position.latitude},${position.longitude}&callback=BaiduWebApiInit`
      script.onerror = reject
      document.head.appendChild(script)
      console.log('调用百度地图api逆地理编码完成')
    })
  }

  latlonToAddress(position) {
    return new Promise((resolve) => {
      this.insertBaiduWebApi(position).then((res) => {
        resolve(res.result.formatted_address)
        // resolve(res.result.sematic_description || res.result.formatted_address);
      })
      //
      // let myGeo = new BMapGL.Geocoder();
      // myGeo.getLocation(
      //   new BMapGL.Point(position.longitude, position.latitude),
      //   function(result) {
      //     if (result) {
      //       resolve(result.address);
      //     }
      //   }
      // );
    })
  }

  getWxLocation() {
    return new Promise((resolve) => {
      wx.ready(function() {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function(res) {
            resolve(res)
          },
          fail: function() {
            alert('获取定位位置信息失败！')
          },
          cancel: function() {
            alert('用户拒绝授权获取地理位置')
          }
        })
      })
    })
  }

  getWmqyLocation() {
    console.log('getWmqyLocation')
    console.log('wanxiao')
    return new Promise((resolve) => {
      try {
        wanxiao.getLocation(function(result) {
          console.log(result)
          if (typeof result === 'string') {
            result = JSON.parse(result)
          }
          if (result.lng && result.lat) {
            console.log(result)
            resolve(result)
          } else {
            alert('请开启手机app定位权限')
          }
        })
      } catch (error) {
        alert('完美企业定位错误' + error)
      }
    })
  }

  async getLocation(callback) {
    try {
      let oldPosition = ''
      let transformCoor = {}
      if (this.env === 'WECHAT' || this.env === 'WXWORK') {
        oldPosition = await this.getWxLocation()
      }

      if (this.env === 'WANMEIQIYE') {
        const wanxiaoLocation = await this.getWmqyLocation()
        if (wanxiaoLocation) {
          oldPosition = {
            longitude: wanxiaoLocation.lng,
            latitude: wanxiaoLocation.lat
          }
        }
        transformCoor = oldPosition
      } else {
        transformCoor = await this.coordTransform(oldPosition) // 转成百度坐标
      }
      const addressInfo = await this.latlonToAddress(transformCoor) // 逆地理编码
      const resObj = {
        position: transformCoor,
        address: addressInfo
      }
      console.log('定位结果' + JSON.stringify(resObj))
      callback(resObj)
    } catch (error) {
      console.log(error)
    }
  }
}

export default LocationMethod.getInstance()
