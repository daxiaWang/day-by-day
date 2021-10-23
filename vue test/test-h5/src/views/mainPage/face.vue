<template>
  <div class="wrap">
    <!-- 使用组件 -->
    <!--在视频外面加一个容器-->
    <div class="input_video">
      <video-player
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <van-button @click="handleClick">11111111111111</van-button>
  </div>
</template>

<script>
// 导入组件
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'

export default {
  name: 'VideoPlayer',
  components: {
    videoPlayer
  },
  data() {
    return {
      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选择的播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '',
          src: ''// url地址
          // src: 'https://learning.dcloud.mp4'// url地址
          // src: 'http://www.html5videoplayer.net/videos/madagascar3.mp4'// url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  methods: {
    handleClick() {
      this.publishVideo()
    },
    publishVideo() {
      const that = this
      const pc = new RTCPeerConnection()
      this.loading = false
      this.start = false
      this.img = ''
      that.tipMsg = '努力连接中，请稍等... ...'

      const constraints = {
        audio: false,
        video: { facingMode: 'environment' },
        width: 28,
        height: 28
      }
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
      // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
        // 首先，如果有getUserMedia的话，就获得它
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }

          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      console.log('navigator', navigator.mediaDevices.getUserMedia({ video: true }))
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        console.log('stream', stream)
        that.MediaStreamTrack =
            typeof stream.stop === 'function' ? stream : stream.getTracks()[0]
        const video = this.$refs.videoPlayer

        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream)
        }

        video.onloadedmetadata = function() {
          video.player.play()
          console.log('打开摄像头')
        }
        stream.getTracks().forEach(function(track) {
          pc.addTrack(track, stream)
        })
        pc.createOffer().then((offer) => {
          pc.setLocalDescription(offer)
          axios
            .post(
              `${window.snBaseConfig.FACE_API}/signal`,
              JSON.stringify(offer)
            )
            .then((res) => {
              if (res) {
                that.tipMsg = '连接成功'
                pc.setRemoteDescription(res.data)
              }
            })
            .catch((error) => {
              console.log('error', error)
              that.tipMsg = '出问题了'
              this.$toast(error)
            })
        })
      }).catch(err => {
        console.log("err.name + ': ' + err.message", err.name + ': ' + err.message)
      })
      const dc = pc.createDataChannel('data')

      dc.onopen = (event) => {
        var userInfo = {
          method: 'exFeature',
          name: '',
          userId: '171113',
          customerUnitCode: '10001504'
        }
        var jsonstr = JSON.stringify(userInfo)
        dc.send(jsonstr)
      }

      dc.onmessage = (event) => {
        var aa = event.data
        console.log('aa', aa)
        const resData = JSON.parse(aa)
        that.tipMsg = resData.message
        this.img = `data:image/png;base64,${resData.imageFile}`
        if (resData.responseCode === 0) {
          this.loading = true
          that.start = true
          pc.close()
        }
      }

      pc.oniceconnectionstatechange = () => {
        var bb = pc.iceConnectionState
        if (bb === 'closed') {}
      }
    }
  }
}
</script>
<style scoped>
.wrap{
  width: 100%;
  height: 100vh;
}
.video-player,.video-js {
  width: 300px;height: 300px;
}
.video-js .vjs-big-play-button{ /*对播放按钮的样式进行设置*/ }
</style>
