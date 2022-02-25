<template>
  <div>
    <van-tabs v-model="active">
      <van-tab
        v-for="comp in compLists"
        :key="comp.name"
        :title="comp.name"
      ></van-tab>
    </van-tabs>
    <div
      v-for="comp in compLists"
      :key="comp.name"
    >
      <component
        :is="comp.name"
      ></component>

    </div>
  </div>
</template>

<script>
import throComp1 from './throComp/comp1.vue'
import throComp2 from './throComp/comp2.vue'
export default {
  components: {
    throComp1,
    throComp2
  },
  data() {
    return {
      active: 1,
      compLists: [
        { name: 'throComp1', id: 1 },
        { name: 'throComp2', id: 2 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
