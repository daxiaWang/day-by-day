<template>
  <div>
    <canvas id="canvas" width="500" height="500" />
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      const canvas = new fabric.Canvas('canvas') // 可以通过鼠标方法缩小,旋转
      // or
      // let canvas = new fabric.StaticCanvas("canvas");//没有鼠标交互的fabric对象

      // 创建一个矩形对象
      const rect = new fabric.Rect({
        left: 200, // 距离左边的距离
        top: 200, // 距离上边的距离
        fill: 'green', // 填充的颜色
        width: 200, // 矩形宽度
        height: 200 // 矩形高度
      })
      // 创建一个圆形对象
      const circle = new fabric.Circle({
        left: 0, // 距离左边的距离
        top: 0, // 距离上边的距离
        fill: 'red', // 填充的颜色
        radius: 50 // 圆的半径
      })
      // 创建一个三角形对象
      const triangle = new fabric.Triangle({
        left: 200, // 距离左边的距离
        top: 0, // 距离上边的距离
        fill: 'blue', // 填充的颜色
        width: 100, // 宽度
        height: 100 // 高度
      })

      // 将矩形添加到canvas画布上
      canvas.add(rect, circle, triangle)
      canvas.selection = false // 禁止所有选中
      rect.set('selectable', false) // 只是禁止这个矩形选中
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
