<template>
  <i v-if="icon" class="sub-el-icon" :class="icon"></i>
  <span v-if="title">{{ title }}</span>
</template>
<script>
// import { defineProps } from "vue";
export default{
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
