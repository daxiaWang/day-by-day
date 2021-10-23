<template>
  <div class="wrap">
    <div class="scan">
      <div class="sectionview">
        <div id="qr-reader" style="width: 100%; height: 100%"></div>
      </div>

      <div class="footer">
        <van-button
          color="rgba(249, 185, 73, 1)"
          @click="getCameras"
        >Obtain Access</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      imgs: [],
      codeUrl: '',
      cameraId: ''
    }
  },
  mounted() {
    this.init()
  },
  created() {},
  beforeDestroy() {
    this.stop()
  },
  methods: {
    init() {
      this.AddJs('https://unpkg.com/html5-qrcode@2.0.11/dist/html5-qrcode.min.js')
      // .loadJs('https://unpkg.com/html5-qrcode/minified/html5-qrcode.min.js')
      // 需要加载时间建议延时一点再获取设备列表
      setTimeout(() => {
        this.getCameras()
      }, 1000)
    },
    AddJs(url) {
      console.log(url, 'url')
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.type = 'text/javascript'
        document.body.appendChild(script)
        script.onload = () => {
          resolve()
        }
      })
    },
    getCameras() {
      console.log('getCameras', Html5Qrcode)
      console.log('getCameras', Html5Qrcode.getCameras())
      Html5Qrcode.getCameras().then((devices) => {
        console.log('devices', devices)
        /**
           * devices would be an array of objects of type:
           * { id: "id", label: "label" }
           */
        if (devices && devices.length) {
          if (devices.length > 1) {
            this.cameraId = devices[1].id
          } else {
            this.cameraId = devices[0].id
          }

          console.log(this.cameraId, 'cameraId')
          this.start()
          // .. use this to start scanning.
        }
      }).catch(err => {
        console.log('err', err)
        // handle err
      })
    },
    start() {
      this.html5QrCode = new Html5Qrcode('qr-reader')
      this.html5QrCode.start(
        this.cameraId, // retreived in the previous step.
        {
          fps: 10, // sets the framerate to 10 frame per second
          qrbox: 250 // sets only 250 X 250 region of viewfinder to
          // scannable, rest shaded.
        },
        (qrCodeMessage) => {
          // do something when code is read. For example:
          if (qrCodeMessage) {
            this.getCode(qrCodeMessage)
            this.stop()
          }
        },
        (errorMessage) => {
          // parse error, ideally ignore it. For example:
          // console.log(`QR Code no longer in front of camera.`);
        }
      ).catch((err) => {
        // Start failed, handle it. For example,
        console.log(`Unable to start scanning, error: ${err}`)
      })
    },
    stop() {
      this.html5QrCode.stop().then((ignore) => {
        // QR Code scanning is stopped.
        console.log('QR Code scanning stopped.')
      }).catch((err) => {
        // Stop failed, handle it.
        console.log('Unable to stop scanning.')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100vh;
}
.scan {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
