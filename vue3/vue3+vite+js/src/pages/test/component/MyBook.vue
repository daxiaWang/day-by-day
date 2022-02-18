<template>
  <div>
myBook
{{title}}
<hr>
newTitle -- {{newTitle}}
  </div>
</template>

<script>
import { ref, watch, reactive, toRefs } from 'vue'

export default {
  props: {
    title: String
  },
  setup(props) {
    console.log("props", props)
    console.log("props.title", props.title)

    const { title } = toRefs(props)

    console.log("titletitle", title)
    const newTitle = ref(0)

    watch(title, (newVal, oldVal) => {
newTitle.value = newVal
    })

    const state = reactive({
      count: 0,
    })
  
    return {
      newTitle,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>