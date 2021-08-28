<template>
  <div>
    <div v-if="error.statusCode == 404">
      <h1>404 - 页面不存在</h1>
      <h2>都404了，还看什么看！</h2>
    </div>
    <div v-else>
      <h1>500 - 服务器错误</h1>
      <h2>都500了，还看什么看！</h2>
    </div>
    <ul>
      <li>
        <nuxt-link to="/">HOME</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
