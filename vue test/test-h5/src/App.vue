<template>
  <div id="app">
    <div
      ref="navRef"
      style="position: fixed; top: 0; z-index: 999; width: 100%"
    >
      <!-- <div style="width: 100%"> -->
      <!-- {{isThemeColor ? '#3296FA' : bgColor ? bgColor : '#fff'}} -->
      <van-nav-bar
        v-if="isShow"
        :style="{
          backgroundColor: isThemeColor
            ? '#3296FA'
            : bgColor
              ? bgColor
              : '#fff',
          color: isThemeColor ? '#fff !important' : '',
        }"
        @click-left="onClickLeft"
      >
        <template #left>
          <van-icon
            v-if="!hideReture"
            name="arrow-left"
            :color="isThemeColor ? '#fff' : ''"
          />
          <!-- <span v-if="!hideReture">返回</span> -->
        </template>
        <template #title>
          <span :style="{ color: isThemeColor ? '#fff !important' : '' }">{{
            title
          }}</span>
        </template>
        <template #right>
          <van-popover
            v-model="showPopover"
            placement="bottom-end"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-icon v-if="$route.path === '/index'" size="22" name="apps-o" />
            </template>
          </van-popover>
        </template>
      </van-nav-bar>
    </div>
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
    return {
      heightRef: 0,
      catchList: this.$store.getters.catchList,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
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
    // console.log(this.$refs.navRef.offsetHeight)
    this.$nextTick(() => {
      console.log(
        'this.$refs.navRef.offsetHeight',
        this.$refs.navRef.offsetHeight
      )
      this.$store.commit('user/navHeight', this.$refs.navRef.offsetHeight)
      this.heightRef = `${this.$refs.navRef.offsetHeight}px`
    })
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
