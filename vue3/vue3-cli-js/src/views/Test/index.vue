<template>
  <div class="btn" @click="update">update</div>
  <!--    prop      attrs           自定义事件 -->
  <p>
    <Child :msg="msg" text="child" @clickChild="changeChild" />
  </p>
  <p>
    <el-button @click="goHome">go home</el-button>
  </p>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Child from "./child.vue";

export default defineComponent({
  name: "App",
  components: {
    Child,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const msg = ref(0);
    const update = () => {
      msg.value++;
    };
    //child组件自定义事件
    const changeChild = (n) => {
      msg.value += n;
    };

    const goHome = () => {
      router.push({
        name: "Home",
      });
    };

    

    return {
      msg,
      update,
      changeChild,
      goHome,
    };
  },
});
</script>