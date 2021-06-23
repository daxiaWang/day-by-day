<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script >
import { isExternal as isExt } from "@/utils/validate";
import { computed, defineProps } from "vue";
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isExternal = computed(() => isExt(props.to));

    // type是一个计算属性
    const type = computed(() => {
      if (isExternal.value) {
        return "a";
      }
      return "router-link";
    });

    const linkProps = (to) => {
      if (isExternal.value) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return { to };
    };
    return {
      type,
      linkProps
    }
  }
}
// const props = defineProps({
//   to: {
//     type: String,
//     required: true,
//   },
// });


</script>
