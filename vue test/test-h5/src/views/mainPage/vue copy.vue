<template>
  <div>
    <div class="scan">
      <span class="prev" @click="back">《</span>
      <div id="bcid">
        <div style="height:40%"></div>
      <!-- <p class="tip">...载入中...</p> -->
      </div>
    <!-- <footer> -->
      <!-- <button @click="startRecognize">开始扫描</button> -->
      <!-- <button @click="startScan">2.开始扫描</button> -->
      <!-- <button @click="cancelScan">3.结束扫描</button> -->

      <!-- <button @click="closeScan">结束扫描</button> -->
    <!-- </footer> -->
    </div>
  </div>

</template>

<script type='text/ecmascript-6'>
let scan = null

export default {
  data() {
    return {
      codeUrl: ''
    }
  },
  mounted() {
    this.startRecognize()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    // 创建扫描控件
    startRecognize() {
      const that = this
      console.log('window.plus', window.plus)
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = onmarked

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        result = result.replace(/\n/g, '')
        that.codeUrl = result
        alert(result)
        that.closeScan()
      }
    },

    // 开始扫描
    startScan() {
      if (!window.plus) return
      scan.start()
    },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return
      scan.cancel()
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return
      scan.close()
    }
  }
}
</script>
<style>
  .scan {
    height: 100%;

  }
   #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:3rem;
      text-align: center;
      color: #fff;
      background: #ccc;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 1rem;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
    }
    footer button{
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      background-color: #f4f4f4;
      color: #fff;
    }
    .prev {
  position: absolute;
  display: inline-block;
  height: 0.36rem;
  width: 0.36rem;
  background-size: 0.36rem 0.36rem;
  vertical-align: middle;
  left: 0.18rem;
  top: 0.17rem;
  z-index: 100;
}
</style>
