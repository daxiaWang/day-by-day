<template>
  <div class="layout_wrap">
    <header>header</header>
    <section class="layout_content">
      <el-aside class="layout_menu" width="200px" style="background-color: rgb(238, 241, 246)">
        <left-menu />
      </el-aside>
      <div>
        <router-view />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import LeftMenu from './LeftMenu/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {


    return {}
  },
  components: {
    LeftMenu,
  },
})
</script>

<style lang="scss" scoped>
.layout_wrap{
  width: 100%;
  height: 100%;
  border: 4px solid #000;
}
.layout_content{
  display: flex;
}
.layout_menu{
  width: 120px;
  border: 2px solid #f0f;
}
header{
  height: 59px;
  border: 2px solid #f00;
}
</style>
