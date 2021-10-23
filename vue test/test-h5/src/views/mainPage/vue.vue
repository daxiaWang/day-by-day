
<template>
  <div class="wrap">
    <!-- <input type="file" accept="video/*" capture="camcorder"> -->
    <video id="video" autoplay width="300" height="300" controls></video>
    <van-button class="video-btn" type="primary" @click.native="upBtnFileFace">刷脸验证</van-button>
    <input ref="videoFace" class="file" name="file" type="file" accept="video/*" capture="camcorder" @change="updateFace">
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
    this.updateFace()
  },
  created() {},
  beforeDestroy() {
  },
  methods: {
    upBtnFileFace(e) {
      this.updateFace(e)
    },
    updateFace(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0]
      if (file) {
      // 本地预览
        const reader = new FileReader()
        const myVideo = document.querySelector('#video')
        reader.onloadend = (evt) => {
          myVideo.src = evt.target.result
        }
        reader.readAsDataURL(file)
        myVideo.play()

        // 上传
        const fd = new FormData()
        fd.append('file', file)
        console.log('file', file)
        console.log('fd', fd)
        return
        ocrIdCard(fd).then(response => {
          if (response) {
            console.log(response)
          }
        }).catch(() => {
        })
      }
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
