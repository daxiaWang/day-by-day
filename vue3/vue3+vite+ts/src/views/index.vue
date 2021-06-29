<template>
  <div>
    <p @click="handleClick">msg -- {{msg}}</p>
    <p>
      <el-button type="primary" @click="sendHttp">{{ buttonName }}</el-button>
      <el-button type="primary" @click="setupClick">event</el-button>
    </p>
    <h4>count--{{ count }}</h4>

    <h4>state--{{state.buttonName}}</h4>


  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
} from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'data name'
    },

  },
  data() {
    return {
      msg: "data value"
    }
  },
  setup(props, context) {
    console.log('props', {props})
    console.log('context', {context})
    console.log('getCurrentInstance()', getCurrentInstance())
    //引用全局变量
    const { proxy } = getCurrentInstance()
    let count = ref(0)
    let state = reactive({
      buttonName: '点击发送请求',

    })
    console.log('count', count)
    console.log('state', state)

    //dom挂载以后
    onMounted(() => {
      sendHttp()
    })

    const sendHttp = () => {
      count.value++
      proxy.$axios.get('/query').then((res: any) => {
        console.log('res', res)
        ElMessage.success({
          message: '恭喜你，这是一条成功消息',
          type: 'success',
        })
      })
    }

    const setupClick = ($event: any) => {
      count.value = count.value + 2
      state.buttonName = `"buttonName"${count.value}`
      console.log("$event", $event.target)
    }
// 暴露到template中
    return {
      count,
      state,
      ...toRefs(state),
      sendHttp,
      setupClick
    }
  },
  methods: {
    handleClick() {
      console.log("1")
        this.msg = '11111111111'
    }
  },
})
</script>

<style lang="stylus" scoped></style>
