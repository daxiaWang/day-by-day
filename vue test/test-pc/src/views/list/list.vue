<template>
  <div class="list">
    <li v-for="item in images" :key="item">
      <!-- <h3>Image: {{ item }}</h3> -->
      <img :src="imgUrl(item)">
    </li>
  </div>
</template>

<script>
var imagesContext = require.context('@/assets/img/', false, /\.png$/)
console.log(imagesContext)
export default {
  name: 'Haha',
  data() {
    return {
      images: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: function() {
    this.images = imagesContext.keys()
  },
  methods: {
    imgUrl: function(path) {
      // console.log('Path:' + path);
      return imagesContext(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100vh;
  overflow-y: auto;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  li{
    list-style: none;
    width: 100px;
    height: 100px;
    border: 1px solid red;
    img {
    width: 100px;
    height: 100px;
  }
  }

}
</style>
