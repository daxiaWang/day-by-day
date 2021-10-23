<template>
  <div class="form-wrap-scroll">
    <ul>
      <li
        v-for="(group, index) in groups"
        :key="index"
        class="li-wrap"
      >
        <h3 class="group-title">{{ group.label }}</h3>
        <ul style="padding-left: 30px;">
          <li
            v-for="(column, ind) in group.column"
            :key="ind"
            class="li-inner"
          >
            {{ column.label }}
          </li>
        </ul>
      </li>
    </ul>

    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item"
        :class="activeInd == item ? 'active' : ''"
        @click="clickScroll(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { BaseGroup, RuzhiGroup } from './data'
import { throttle } from '@/utils/utils'
export default {
  components: {
  },
  data() {
    return {
      groups: BaseGroup,
      check: '',
      msg: '',
      resizeHandler: null,
      activeInd: '',
      // opt: {
      //   ruzhi: RuzhiGroup,
      //   base: BaseGroup
      // },
      newOpt: {
        labelWidth: 160,
        menuBtn: false,
        group: []
      },
      group: []
    }
  },
  computed: {
    menuList() {
      return this.groups.map(item => item.label)
    }
  },
  mounted() {
    this.$nextTick(() => {
      // const loadingInstance = Loading.service({
      //   text: '加载中',
      //   target: document.getElementById('avue-view')
      // })
      // this.timer = setTimeout(() => {
      //   loadingInstance.close()
      // }, 4000)

      // this.getDiy()

      // this.newOpt = Object.assign(this.newOpt, this.customOpt)

      this.resizeHandler = throttle(() => {
        this.handleScroll()
      }, 500)
      window.addEventListener('scroll', this.resizeHandler, true)
    })
  },
  methods: {
    clickScroll(val) {
      console.log('val')
      this.activeInd = val
      const aaa = Array.from(
        document.getElementsByClassName('group-title')
      ).find((item) => item.innerHTML === val)
      aaa.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'smooth'
      })
    },
    handleScroll() {
      const aaa = Array.from(
        document.getElementsByClassName('li-wrap')
      )
      const ccc = aaa.find(item => {
        return item.getBoundingClientRect().top < 60 && item.getBoundingClientRect().bottom > 65
      })
      if (ccc === undefined) {
        this.activeInd = this.menuList[0]
      } else {
        this.activeInd = ccc.children[0].innerHTML
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap-scroll{
  height: 100%;
  overflow: auto;
}
.li-wrap, .li-inner{
  padding: 10px;
}
.menu {
  background-color: #fff;
  padding: 20px;
  position: fixed;
  top: 100px;
  right: 20px;
  border-radius: 5px;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  li {
    list-style: none;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    &.active{
      color: #409EFF;
    }
  }
}
</style>
