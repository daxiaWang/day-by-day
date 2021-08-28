<template>
  <div>
    asyncLogin
  </div>
</template>

<script>
import loginMixin from './login'

export default {
  mixins: [loginMixin],
  created() {
    this.authLogin().then(() => {
      this.createMtds()
      console.log('wwwwwww')
    }).then(() => {
      this.mountedMtds()
    })
  },
  mounted() {
    console.log('mounted mounted')
  },
  methods: {
    authLogin() {
      return new Promise((resolve, reject) => {
        this.checkCode().then(() => {
          console.log('this.checkCode().then')
          this.GetUserLogin().then(res => {
            console.log('this.GetUserLogin().then', res)
            resolve()
          })
        })
      })
    },
    createMtds() {
      console.log('createMtds')
      this.test1()
      this.test2()
    },
    mountedMtds() {
      console.log('mountedMtds')
      this.test3()
    },
    test1() {
      const test1 = sessionStorage.getItem('orderToken')
      console.log('test1', test1)
    },
    test2() {
      const test2 = sessionStorage.getItem('orderToken')
      console.log('test2', test2)
    },
    test3() {
      const test3 = sessionStorage.getItem('orderToken')
      console.log('test3', test3)
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  color: #000;
}
</style>
