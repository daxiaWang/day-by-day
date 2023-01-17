<template>
  <div id="app">
    <TopBar />
    <keep-alive :include="catchList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
export default {
  name: "App",
  components: {
    TopBar,
  },
  data() {
    return {
      catchList: "",
    };
  },
  watch: {
    $route: {
      //监听路由变化
      handler: function() {
        this.catchList = this.$store.getters.catchList;
      },
      immediate: true,
    },
  },
  mounted() {
    console.log("console测试")
  },
  computed: {},
  methods: {},
};
</script>

<style></style>
