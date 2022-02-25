<template>
  <div v-waterMarker="{text:'www版权所有',textColor:'rgba(180, 180, 180, 0.4)'}">
    <h3 v-copy="copyText">复制</h3>
    <button v-longpress="longpress">长按</button>
    <button v-debounce="debounceClick" @click="aaa">防抖</button>
    <div>
      <input v-model="note" v-emoji type="text">
    </div>
    <div>
      <img v-LazyLoad="src">
    </div>
    <div class="btns">
      <!-- 显示 -->
      <button v-permission="'1'">权限按钮1</button>
      <!-- 不显示 -->
      <button v-permission="'10'">权限按钮2</button>
    </div>
    <div class="swordbg">
      <div class="sword">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div v-draggable class="el-dialog">draggable</div>
    <!-- https://epic-spinners.epicmax.co/ -->
  </div>
</template>

<script>
export default {
  name: 'DirectivesDemo',
  data() {
    return {
      copyText: '复制内容',
      note: '',
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F30%2Fb1%2F00%2F30b1006338b150371dbfdd613280a5b8.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648173604&t=6c2a1954bc095b7754b8ba6914ddc6df'
    }
  },
  methods: {
    longpress() {
      alert('长按指令生效')
    },
    debounceClick() {
      console.log('只触发一次')
    },
    aaa() {
      // console.log('aaa')
    }
  }
}
</script>

<style lang="scss" scoped>
.swordbg{
  width: 200px;
  height: 200px;
  background: #000;
    .sword {
      position: relative;
      margin: 200px auto;
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    .sword span{
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .sword :first-child{
      left: 0%;
      top: 0%;
      border-bottom: 3px solid #EFEFFA;
      animation: sword-one 1s linear infinite;
    }
    .sword :nth-child(2){
  right: 0%;
  top: 0%;
  animation: sword-two 1s linear infinite;
  border-right: 3px solid #EFEFFA;
}

.sword :last-child{
  right: 0%;
  bottom: 0%;
  animation: sword-three 1s linear infinite;
  border-top: 3px solid #EFEFFA;
}
}
@keyframes sword-one {
 0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}
@keyframes sword-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes sword-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

</style>
