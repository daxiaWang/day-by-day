<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.name()
  },
  methods: {
    name() {
      const promise1 = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('promise1')
            //   reject("error promise1 ");
          }, 3000)
        })
      }
      const promise2 = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('promise2')
            //   reject("error promise2 ");
          }, 1000)
        })
      }
      const promise3 = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            //   resolve("promise3");
            reject('error promise3 ')
          }, 2000)
        })
      }

      Promise.all([promise1(), promise2(), promise3()])
        .then((res) => {
          console.log('Promise.all res', res)
        })
        .catch((error) => {
          console.log('error', error) // error promise3
        })
      // Promise.allSettled 不管有没有错误，三个的状态都会返回
      Promise.allSettled([promise1(), promise2(), promise3()])
        .then((res) => {
          console.log('Promise.allSettled res', res)
          // 打印结果
          // [
          //    {status: 'fulfilled', value: 'promise1'},
          //    {status: 'fulfilled',value: 'promise2'},
          //    {status: 'rejected', reason: 'error promise3 '}
          // ]
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
