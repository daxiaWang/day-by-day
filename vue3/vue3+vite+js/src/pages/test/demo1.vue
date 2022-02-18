<template>
  <div>
    <MyBook :title="count" />
    <hr>
    count -- {{count}}
  </div>
</template>

<script>
import MyBook from './component/MyBook.vue'
import { ref, onMounted, reactive, toRefs } from 'vue'

export default {
  components: {
    MyBook,
  },
  setup () {
    const state = reactive({
      count: 0,
    })
// const count = ref(0)
    const timer = () => {
      setInterval(() => {
        // count.value ++
        state.count ++
      }, 3000);
    }

    onMounted(timer)
  
    return {
      // count
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>