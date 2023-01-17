<template>
  <div class="topbar">
    <van-nav-bar
      :title="title"
      @click-left="onClickLeft"
      :left-arrow="isShowLeft"
      :left-text="isShowLeft ? '' : ''"
      v-if="$store.getters.needHeader && isShow"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    isShow() {
      const path = this.$route.path;
      const whitePath = [
        "/",
        "/login",
        "/main/attendance",
        "/setup/setup-addAddress",
      ];
      return !whitePath.includes(path);
    },
    isShowLeft() {
      const path = this.$route.path;
      const whitePath = ["/main/apply", "/main/statistics", "/main/setup"];
      return !whitePath.includes(path);
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less"></style>
