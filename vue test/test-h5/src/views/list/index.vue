<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        const temArr = []
        for (let i = 0; i < 20; i++) {
          // this.list.push(this.list.length + 1)
          temArr.push(i)
        }
        this.list = this.list.concat(temArr)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 100) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
