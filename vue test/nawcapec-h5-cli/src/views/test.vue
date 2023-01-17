<template>
  <div id="app">
    <TopBar />
    {{highchartData[handleSubstrAccode(accode)]}}
    <keep-alive :include="catchList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
export default {
  name: "",
  components: {
    TopBar,
  },
  data() {
    return {
      catchList: "",
      accode: '51102xxx',
      highchartData: {
        "51101": '51101bbb',
        "51101xxx": '51101xxx',
        "51102": '51102aaaa',
        "51102xxx": '51102xxx'
      }
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
    console.log("this.accode", this.accode)
    let a = this.highchartData[this.handleSubstrAccode(this.accode)]
    console.log("a", a)

    let b = (this.accode.toString().indexOf('51101') != -1 || this.accode.toString().indexOf('51102') != -1) ? '度' : '吨'
    console.log("b", b)
  },
  computed: {},
  methods: {
    handleSubstrAccode(str) {
      return str.substr(0, 5)
    },
  },
};
</script>

<style></style>
