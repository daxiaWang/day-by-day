<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue'
// import axios from '@/services/axios'
import axios from '@/services/axios.ts';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: false,
    },
  },
  setup: (props, context) => {

    axios
      .get('/query')
      .then((res: any) => {
        // console.log('res: ', res)
      })
      .catch((err: any) => {
        console.log('err: ', err)
      })

    const count = ref(0)
    return { count }
  },
})
</script>

<style lang="scss" scoped>
a {
  color: #f00;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  // background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
  background-color: $red;

  width: calc(100% - #{$width});
}
</style>
