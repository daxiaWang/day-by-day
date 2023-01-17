<template>
  <div>
    <div class="throttle">
      <div>输入框节流：</div>
      <input type="text" v-model="throttleTxt" placeholder="input输入框节流" />
    </div>
    <div>{{ throttleText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      throttleTxt: "",
      throttleText: "",
    };
  },
  watch: {
    throttleTxt(newTxt) {
      this.throttle(this.allQueryData, null, 500, newTxt);
    },
  },
  methods: {
    commitClick: debounce(
      function () {
        //提交乘车人申请前表单验证
        this.$refs.addForm.validate().then(() => {
          this.submitAdd();
        });
      },
      2000,
      true
    ),
    throttle(fn, context, delay, text) {
      clearTimeout(fn.timer);
      fn.timer = setTimeout(() => {
        fn.call(context, text);
      }, delay);
    },
    allQueryData(text) {
      this.throttleText = text;
      if (text) {
        console.log("text", text);
      } else {
        console.log("input为空");
      }
    },
    loadList() {
      debounce(() => {
        console.log("加载数据");
      }, 500);
    },
  },
};
</script>