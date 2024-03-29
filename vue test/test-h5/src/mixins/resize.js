import { debounce } from '@/utils/utils'

export default {
  data() {
    return {
      $_sidebarElm: null
    }
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
      if (this.myChart) {
        this.myChart.resize()
      }
    }, 10)
    window.addEventListener('resize', this.__resizeHandler)

    // this.$_sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    // this.$_sidebarElm &&
    //   this.$_sidebarElm.addEventListener(
    //     "transitionend",
    //     this.$_sidebarResizeHandler
    //   );
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)

    // this.$_sidebarElm &&
    //   this.$_sidebarElm.removeEventListener(
    //     "transitionend",
    //     this.$_sidebarResizeHandler
    //   );
  },
  methods: {
    // $_sidebarResizeHandler(e) {
    //   if (e.propertyName === "width") {
    //     this.__resizeHandler();
    //   }
    // }
  }
}
