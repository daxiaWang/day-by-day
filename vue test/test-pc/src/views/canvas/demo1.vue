<template>
  <div class="box">
    <div class="box active">
      1
    </div>
    <div class="box">
      2
    </div>
  </div>
</template>

<script>
import Client from '@/utils/Client'
export default {
  mounted() {
    const client = new Client(document.querySelectorAll('.box'))
    console.log('client', client)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
