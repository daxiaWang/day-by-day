<template>
  <div class="info-select">
    <div
      class="flex-b-c select-show"
      @click="showSelectUl"
      v-clickOutside="hideSelectUl"
    >
      <p>{{ defaultValue }}<van-icon :name="isShow ? 'arrow-up' : 'arrow-down'" /></p>
      <slot class="slot-class" name="customSlot"></slot>
    </div>
    <transition name="slide-fade">
      <ul class="select-ul" v-show="isShow">
        <li v-for="item in list" :key="item[keyValue]">
          <p @click="getSize(item)" :class="{ active: item[keyName] == defaultValue }">
            {{ item[keyName] }}
          </p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { deeoClone } from '@/utils/utils'
import { clickOutside } from './clickoutside.js'
export default {
  props: {
    dataList: {
      type: Array,
    },
    keyName: {
      type: String,
      default: 'name',
    },
    keyValue: {
      type: String,
      default: 'id'
    },
    defaultValue: {
      type: String,
      default: '全部'
    },
  },
  watch: {
    isShow(newValue) {
      console.log("isShow", newValue)
      if (newValue) {
        this.list = this.dataList
      }
    },
  },
  data() {
    return {
      // defaultValue: '全部',
      isShow: false,
      list: [],
    }
  },

  methods: {
    hideSelectUl() {
      this.isShow = false
    },
    showSelectUl(s) {
      if (this.dataList.length == 0) return
      this.isShow = !this.isShow
    },
    getSize(item) {
      // this.defaultValue = item[this.keyName]
      this.isShow = false
      this.$emit('handleSelect', item)
    },
  },
  directives: {
    clickOutside,
  },
}
</script>

<style lang="scss" scoped>
.info-select {
  width: 100%;
  position: relative;
  padding: 10px;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #ddd;

  .select-show {
    height: 28px;
    p {
      max-width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      padding-right: 18px;
      .van-icon{
        position: absolute;
        right: 0;
      }
    }
  }
  .select-ul {
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    padding: 12px 10px;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 12;
    background: #fff;
    box-shadow: 0px 3px 6px rgba(50, 150, 250, 0.1);
    p {
      padding: 10px 0 10px 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p:hover {
      background: #eee;
    }
    p.active {
      background: #eee;
    }
  }
}


.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
// css animate
.slide-fade-enter-active {
  transition: all 0.2s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  /* .slide-fade-leave-active for below version 2.1.8 */
  transform: translateY(20px);
  opacity: 0;
}

// bounce
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>