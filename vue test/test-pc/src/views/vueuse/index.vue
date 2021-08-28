<template>
  <div>
    <p>
      <button @click="undo"> Undo </button>
      <button @click="redo"> Redo </button>
    </p>
    <textarea v-model="text" />
    <ul>
      <li v-for="entry in history" :key="entry.timestamp">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script>
// import { useRefHistory } from '@vueuse/core'
export default {
  data() {
    return {
      text: '',
      history: []
    }
  },
  methods: {
    undo() {

    },
    redo() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
