<template>
  <slot></slot>
  <h2 @click="fun">Child{{ msg }}</h2>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  props: ["msg"],
  setup(props, { attrs, emit }) {
    console.log(props); //Proxy {msg: 0}
    console.log(attrs); //Proxy {text: "child", __vInternal: 1, onClickChild: ƒ}
    const fun = () => {
      //使用emit分发一个自定义事件
      emit("clickChild", 2);
    };
    return {
      fun,
    };
  },
});
</script>