<template>
  <div>
    <h2>comp2</h2>
    <div>
      <div class="throttle">
        <div>输入框节流：</div>
        <input v-model="throttleTxt" type="text" placeholder="input输入框节流">
      </div>
      <div>{{ throttleText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      throttleTxt: '',
      throttleText: ''
    }
  },
  watch: {
    throttleTxt(newTxt) {
      this.throttle(this.allQueryData, null, 500, newTxt)
    }
  },
  methods: {
    throttle(fn, context, delay, text) {
      clearTimeout(fn.timer)
      fn.timer = setTimeout(() => {
        fn.call(context, text)
      }, delay)
    },
    allQueryData(text) {
      this.throttleText = text
      if (text) {
        console.log('text', text)
      } else {
        console.log('input为空')
      }
    }
  }
}
</script>
