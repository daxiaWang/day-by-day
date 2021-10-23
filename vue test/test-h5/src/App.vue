<template>
  <div id="app">

    <!-- <div v-if="isShow" style="height: 44px"></div> -->
    <div class="router_box" :style="{ top: heightRef }">
      <!-- <keep-alive :include="catchList"> -->
      <router-view class="router_cont" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    // 通过 actions 属性来定义菜单选项
    this.actions = [{ text: '审批', to: '/shenpi' }]
    return {
      heightRef: 0,
      catchList: this.$store.getters.catchList,
      showPopover: false,
      actions: [{ text: '审批', to: '/shenpi' }]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    },
    isShow() {
      const path = this.$route.path
      const whitePath = []
      return !whitePath.includes(path)
    },
    isThemeColor() {
      return this.$route.meta.isThemeColor
    },
    bgColor() {
      return this.$route.meta.bgColor
    },
    needHeader() {
      return window.snBaseConfig.needHeader
    },
    hideReture() {
      return this.$route.meta.hideReture
    }
  },
  watch: {
    $route: {
      // 监听路由变化
      handler: function(to, from) {
        this.catchList = this.$store.getters.catchList
      }
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      window.addEventListener('resize', function(e) {
        that.$store.commit('user/navHeight', that.$refs.navRef.offsetHeight)
        that.heightRef = `${that.$refs.navRef.offsetHeight}px`
      }, true)
    })
    console.log('this.actions', this.actions)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSelect(action) {
      // Toast(action.text);
      this.$router.push({
        path: action.to
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  position: relative;
  overflow-y: hidden;
  .router_box {
    // background-color: #F7F8FA;
    position: absolute;
    top: 44px;
    height: calc(100vh - 44px);
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .router_cont {
    width: 100%;
    // height: 100%;
  }
}
/deep/ .van-nav-bar {
  .van-icon {
    color: #111111;
  }
}
</style>
