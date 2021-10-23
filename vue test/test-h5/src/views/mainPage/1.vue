<template>
  <div class="item physical-video">
    <div class="player">
      <video-player
        ref="videoPlayer"
        class="vjs-custom-skin"
        :options="playerOptions"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
import 'video.js'
// import 'videojs-contrib-hls/dist/videojs-contrib-hls.js'
export default {
  data() {
    return {
      playerOptions: {
        // videojs and plugin options
        height: '360',
        autoplay: true,
        muted: true,
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false }},
        html5: { hls: { withCredentials: false }},
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options
      }
    }
  }
}
</script>
<style lang="less" scoped>
.video-player{
   border-radius: 50%;
}
  .physical-video{
    width: 100%;
    height: 100vh;
    .player{
      width: 240px;
      height: 240px;
      border: 5px solid red;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .vjs-modal-dialog-content{
    border-radius: 50%;
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
<style>
.physical-video .video-js.vjs-custom-skin {
  height: 100vh;
}
.physical-video .video-js.vjs-custom-skin .vjs-control-bar {
  height: 90px;
}
.physical-video .video-js.vjs-custom-skin .vjs-control {
    width: 4em!important;
}
.physical-video .video-js .vjs-time-control,.physical-video .video-js.vjs-custom-skin .vjs-control-bar .vjs-playback-rate .vjs-playback-rate-value {
  font-size: 2em!important;
  line-height: 3em!important;
}
.physical-video .video-js .vjs-control:before {
  height: 50px;
  font-size: 4em;
}
</style>
