<template>
  <div class="app-wrapper">

    <div class="img_box">
      <div class="img_cont">
        <div v-if="!loading" class="video-mask">
          <!-- <video
            id="localVideo"
            autoplay="true"
            muted="true"
            x5-playsinline="true"
            playsinline="true"
            webkit-playsinline="true"
            x-webkit-airplay="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
          /> -->
          <video-player
            id="localVideo"
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            style="object-fit:fill"
            :options="playerOptions"
            :x5-video-player-fullscreen="true"
          >
          </video-player>
        </div>
        <div v-if="loading" class="final_img">
          <img :src="img" alt="">
        </div>
        <!-- <div v-if="loading" class="mask">核验中，请稍等</div> -->
      </div>
    </div>
    <div class="face_tips">请将人脸放入圆圈内</div>
    <div class="action_tips">{{ tipMsg }}</div>
    <div v-if="loading" class="handle_btns">
      <van-button type="warning" @click="resetStart">重新采集</van-button>
      <van-button round type="primary" @click="okBtn">确认人脸</van-button>
      <!-- <span></span> -->
      <!-- <span @click="okBtn"></span> -->
    </div>
    <div class="result_tips use_tips">
      <h3>温馨提示</h3>
      <div>
        人脸采集仅用于刷脸公交并且独立加密为特征值，保证不会泄密及用于其他用途。
      </div>
    </div>
  </div>
</template>

<script>
// import img from '@/assets/images/lyf.jpg'

import videojs from 'video.js'

// import SWF_URL from 'videojs-swf/dist/video-js.swf'
import axios from 'axios'

// videojs.options.flash.swf = SWF_URL
export default {
  name: 'FacePhoto',
  data() {
    return {
      start: true,
      img: '',
      tipMsg: '',
      responseCode: null,
      loading: false,
      MediaStreamTrack: null,
      timer: null,
      videoSrc: '',
      playerOptions: {
        live: true,
        autoplay: true, // 如果true，浏览器准备好时开始播放
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 是否视频一结束就重新开始
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: false, // 暂停和播放键
          progressControl: false, // 进度条
          fullscreenToggle: true // 全屏按钮
        },
        techOrder: ['flash'], // 兼容顺序
        flash: {
          hls: {
            withCredentials: false
          },
          swf: null
          // swf: SWF_URL
        },
        sources: [{
          type: 'rtmp/flv',
          src: '' // 视频地址-改变它的值播放的视频会改变
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }

    }
  },
  created() {
    // document.addEventListener('WeixinJSBridgeReady', () => {
    //   console.log('视频准备好了')
    //   document.getElementById('localVideo').play()
    // }, false)
  },
  mounted() {
    this.$nextTick(() => {
      // document.addEventListener(
      //   'WeixinJSBridgeReady',
      //   function() {
      //     document.getElementById('localVideo').play()
      //   },
      //   false
      // )

      // wx.ready(() => {
      //   const video = document.getElementById('localVideo')
      //   console.log('video', video)
      //   video.play()
      // })
      this.publishVideo()
    })
  },
  beforeDestroy() {
    this.cancalCloseVideo()
  },
  methods: {
    publishVideo() {
      const that = this
      const pc = new RTCPeerConnection()
      this.loading = false
      this.img = ''
      that.tipMsg = '努力连接中，请稍等... ...'
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          console.log('stream', stream)
          that.MediaStreamTrack =
            typeof stream.stop === 'function' ? stream : stream.getTracks()[0]
          const localVideo = document.getElementById('localVideo')

          // localVideo.srcObject = stream
          // that.playerOptions.sources.src = stream
          that.$refs.videoPlayer.srcObject = stream

          localVideo.onloadedmetadata = function() {
            localVideo.play()
            console.log('打开摄像头')
          }

          stream.getTracks().forEach(function(track) {
            console.log('track, stream', track, stream)
            pc.addTrack(track, stream)
          })
          console.log('pc', pc)
          pc.createOffer().then((offer) => {
            pc.setLocalDescription(offer)
            console.log('offer', offer)
            console.log('JSON.stringify(offer)', JSON.stringify(offer))
            axios
              .post(
                `${window.snBaseConfig.FACE_API}/signal`,
                JSON.stringify(offer)
              )
              .then((res) => {
                if (res) {
                  console.log('res', res.data)
                  that.tipMsg = '连接成功'
                  that.start = false
                  pc.setRemoteDescription(res.data)
                  console.log('连接成功 pc', pc)
                }
              })
              .catch((error) => {
                console.log('error', error)
                that.tipMsg = '出问题了'
                this.$toast(error || '请求失败')
              })
          })
        })
        .catch()

      const dc = pc.createDataChannel('data') // 创建通道

      console.log('dc', dc)
      dc.onopen = (event) => {
        var userInfo = {
          method: 'exFeature',
          name: '',
          // userId: getStore('userInfo').uuid,
          // customerUnitCode: getStore('userInfo').customerunitcode
          userId: '171113',
          customerUnitCode: '08600000001'
        }
        var jsonstr = JSON.stringify(userInfo)
        console.log('jsonstr', jsonstr)
        dc.send(jsonstr)
      }

      console.log('dc', dc)
      dc.onmessage = (event) => {
        console.log('event', event)
        var aa = event.data
        const resData = JSON.parse(aa)
        that.tipMsg = resData.message
        // return
        that.img = `data:image/png;base64,${resData.imageFile}`
        if (resData.responseCode === 0) {
          that.loading = true
          pc.close()
        }
      }
      pc.oniceconnectionstatechange = () => {
        var bb = pc.iceConnectionState
        if (bb === 'closed') {
        }
      }
    },
    cancalCloseVideo() {
      this.MediaStreamTrack && this.MediaStreamTrack.stop()
    },
    resetStart() {
      this.publishVideo()
    },
    okBtn() {
      // setTimeout(() => {
      this.$router.replace({
        name: 'FaceResult'
      })
      // }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  padding: 38px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img_box {
    margin-top: 40px;
    width: 240px;
    height: 240px;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 50%;
    background-image: -webkit-linear-gradient(
      top,
      #5ED19E 0%,
      #07B7AE 90%
    );
    background-image: -moz-linear-gradient(
      top,
      #5ED19E 0%,
      #07B7AE 90%
    );
    background-image: linear-gradient(top, #5ED19E 0%,#07B7AE 90%);
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      width: 280px;
      height: 280px;
      position: absolute;
      top: -20px;
      left: -20px;
      // background: url(~@/assets/images/roundbg.png) no-repeat center center;
      background-size: 280px 280px;
      animation: round 3s linear 0s infinite;
    }
    @keyframes round {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .img_cont {
      width: 100%;
      height: 100%;

      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      background: #000000;
      overflow: hidden;
      position: relative;
      z-index: 44;

    -webkit-backface-visibility: hidden;
-webkit-transform: translate3d(0, 0, 0);
      .video-mask {
        width: 100%;
        height: 100%;

    -webkit-backface-visibility: hidden;
-webkit-transform: translate3d(0, 0, 0);
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: #000000;
        overflow: hidden;
        position: absolute;
        z-index: 45;
      }
      .final_img {
        width: 240px;
        height: 240px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          // border-radius: 50%;
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg); /* Safari 和 Chrome */
          -moz-transform: rotateY(180deg);
        }
      }
      .mask {
        width: 100%;
        height: 100%;
        // border-radius: 50%;
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        text-align: center;
        line-height: 250px;
      }
    }
  }
  .face_tips {
    font-size: 17px;
    margin: 20px;
  }
  .action_tips {
    color: #07B7AE;
    font-weight: 500;
    font-size: 20px;
  }
  .handle_btns {
    // border: 1px solid;
    width: 80%;
    display: flex;
    justify-content: space-around;
    margin: 90px auto 0;
    span {
      // color: @themeColor1;
      // text-decoration: underline;
    }
  }
  .use_tips {
    width: 80%;
    text-align: center;
    position: fixed;
    bottom: 10px;
    text-align: center;
    h3 {
      font-size: 14px;
      margin-bottom: 10px;
    }
    div {
      font-size: 13px;
      // color: @fontColor-gray;
      line-height: 22px;
    }
  }
}

video {
  width:240px;
  height: 240px;
  position: absolute;
  top: 0px;
  left: 0px;
  // object-fit:fill;
      // object-fit: cover;

  // border-radius: 50%;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari 和 Chrome */
  -moz-transform: rotateY(180deg);
  z-index: 0;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
canvas{
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari 和 Chrome */
  -moz-transform: rotateY(180deg);
}

/* video[pseudo = -internal-media-controls-overflow-button]{
    display: none;
} */
video::-webkit-media-controls-play-button,
video::-webkit-media-controls-fullscreen-button,
video::-webkit-media-controls-volume-control-container,
video::-webkit-media-controls-timeline {
  display: none;
}
video::-internal-media-controls-overflow-button {
  display: none;
}

/* video::-internal-media-controls-overflow-button */
video::-webkit-media-controls-enclosure {
  overflow: hidden;
}

video::-webkit-media-controls-panel {
  // border: 3px solid red;
  width: calc(100% + 30px);
}
</style>
