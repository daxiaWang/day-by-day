<template>
  <div class="board_wrap">
    <!-- <ul class="tabBtn">
      <li
        v-for="item in btnArr"
        :key="item.value"
        :class="[item.opsition, item.value === componentId ? 'active' : '']"
        @click="changeShow(item)"
      >{{ item.name }}
      </li>
    </ul> -->
    <div class="content">
      1
      <!-- <component :is="componentId" /> -->
    </div>
  </div>
</template>

<script>
// import show from './views/show'
import zhengqi from './show'
import yanfa from './yanfa/index'
import jiaofu from './jiaofu/index'
import shichang from './shichang'
export default {
  name: 'App',
  components: {
    'zheng-qi': zhengqi,
    'yan-fa': yanfa,
    'jiao-fu': jiaofu,
    'shi-chang': shichang
  },
  data() {
    return {
      btnArr: [
        { name: '政企', value: 'zheng-qi', opsition: 'left', index: 0 },
        { name: '研发', value: 'yan-fa', opsition: 'left', index: 1 },
        { name: '交付', value: 'jiao-fu', opsition: 'right', index: 3 },
        { name: '市场', value: 'shi-chang', opsition: 'right', index: 2 }
      ],
      componentId: 'zheng-qi',
      currentIndex: 0,
      timerFlag: true,
      btnTimer: null
    }
  },
  watch: {
    timerFlag(value) {
      if (value) {
        // this.handleShow()
      } else {
        clearInterval(this.btnTimer)
        this.timerFlag = true
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.btnTimer)
  },
  mounted() {
    this.$nextTick(() => {
      // this.handleShow()
    })
  },
  methods: {
    handleShow() {
      const that = this
      this.btnTimer = setInterval(() => {
        that.currentIndex++
        // 更改图片地址
        if (that.currentIndex > 3) { // js的if判断语句
          that.currentIndex = 0
        }
        const item = that.btnArr.find(item => item.index === that.currentIndex)
        that.changeShow(item)
        this.timerFlag = false
      }, 300000)
    },
    changeShow(item) {
      this.componentId = item.value
      this.currentIndex = item.index
    }
  }
}
</script>
<style lang="scss" scoped>
.board_wrap {
  position: relative;
  background: #07123a url(~@/assets/img/bg.png) no-repeat center;
  background-size: 100% 100%;
  color: #fff;
}
.tabBtn {
  position: absolute;
  // display: flex;
  // top: 10px;
  // width: 300px;
  // justify-content: space-between;
  width: 100%;
  clear: both;
  padding: 30px;
  li {
    // flex: 1;
    width: 144px;
    height: 58px;
    line-height: 58px;
    font-size: 18x;
    text-align: center;
    background: url(~@/assets/img/btn.png) no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
    &.left {
      float: left;
    }
    &.right {
      float: right;
    }
    &.active,
    &:hover {
      background: url(~@/assets/img/btn-a.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
}
.content {
  // position: absolute;
}
</style>
