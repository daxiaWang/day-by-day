<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :default-active="activeMenu" mode="vertical">
      <SidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { defineComponent, computed, toRefs, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { routes } from "@/router";

export default defineComponent({
  components: {
    SidebarItem,
  },
  mounted() {
    // console.log("routes", routes);
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const activeMenu = computed(() => {
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    // console.log("route.query", router.options.routes);
    const obj = reactive({
      routes: router.options.routes,
    });
    return {
      ...toRefs(obj),
      activeMenu,
    };
  },
});
</script>

