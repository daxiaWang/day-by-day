<template>
  <div>
    <!-- <demo1></demo1> -->
    <demo2 />
  </div>
</template>

<script>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
export default {
  components: {
    demo1,
    demo2
  },
  data() {
    return {
      list: []
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
