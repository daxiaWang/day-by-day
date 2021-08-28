<template>
  <div class="wrap">
    <ul>
      <li v-for="{ name, id } in users" :key="id">
        name-{{ name }} id-{{ id }}
      </li>
    </ul>
    <div><span>span 元素</span></div>
    <div class="three-column-layout">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">111111111111111111111111111111111111111111111111111111111111111111</div>
    </div>
    <div class="three-column-layout1">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import testMixis from './testMixis'
export default {
  name: 'Test',
  mixins: [testMixis],
  data() {
    return {
      users: [
        { name: '张三', id: 0 },
        { name: '李四', id: 1 },
        { name: '王五', id: 2 }
      ]
    }
  },
  computed: {
    haha(obj) {
      console.log('obj ', obj)
      // console.log('$data  ', $data)
      // console.log('$attrs  ', $attrs)
      // 还能结构很多属性，可自行打印康康
      return obj
    }
  },
  created() {
    console.log('test created')
    const bbb = window.sessionStorage.getItem('mixisBeforeCreate')
    console.log('bbb', bbb)
    const aaa = window.sessionStorage.getItem('mixisCreate')
    console.log('aaa', aaa)
  },
  mounted() {
    this.aa()
    console.log('this.$options', this.$options)
  },
  methods: {
    aa() {
      console.log('1', this.haha)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  // border: 5px dashed red;
  width: 100vw;
  height: calc(100vh - 46px);
}
// ul:nth-child(1) {
//   border: 3px solid;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }
ul:nth-child(1) {
  border: 3px solid;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100px;
  height: 100px;
}
span{
  // position: absolute;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  // margin: auto;
}

.three-column-layout {
    width: 100%;
    height: 50px;
    .left {
        float: left;
        width: 50px;
        height: 100%;
        background-color: #f66;
    }
    .center {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .right {
        overflow: hidden;
        height: 100%;
        background-color: #3c9;
    }
}
.three-column-layout1{
  margin-top: 50px;
  padding: 0 50px;
    width: 100%;
    height: 100px;
    border: 1px solid;
    .left {
        float: left;
        margin-left: -50px;
        width: 50px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        float: right;
        margin-right: -50px;
        width: 50px;
        height: 100%;
        background-color: #66f;
    }
    .center {
      // float: right;
        height: 100%;
        background-color: #3c9;
    }
}
</style>
