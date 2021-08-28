<template>
  <div class="screen">
    <van-popup v-model="show" position="top">
      <div class="screen__wrap">
        <div
          class="screen__wrap-item"
          v-for="(item, index) in listA"
          :key="index"
        >
          <div class="screen__wrap-title">{{ item.title }}</div>
          <div class="screen__wrap-ct">
            <div
              class="screen__wrap-ct-i"
              v-for="(ele, i) in item.list"
              :class="{ active: ele.check }"
              :key="i"
              @click="screenTabClick(ele, index, i, item.ename)"
            >
              {{ ele.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="screen__bottom">
        <div @click="screenResetClick">重置</div>
        <div @click="screenSureClick">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { deepClone } from "@/utils/utils"
export default {
  data() {
    return {
      listA: [],
      dataResult: []
    }
  },
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    showScreenPicker: {
      type: Boolean,
      default: false
    },
    //radio
    chooseType: {
      type: String,
      default: "checkbox" //checkbox =>  多选   radio => 单选
    }
  },
  mounted() {
    // console.log("comp dataList", this.dataList)
    // console.log("comp listA", this.listA)
    this.listA = deepClone(this.dataList)
  },
  computed: {
    show: {
      get() {
        return this.showScreenPicker
      },
      set(v) {
        this.$emit('update:showScreenPicker', v)
      }
    }
  },
  methods: {
    screenResetClick() {
      // this.listA.forEach((item, index) => {
      //   item.list.forEach((ele, i) => {
      //     if (ele.check) {
      //       this.$set(
      //         this.listA[index].list,
      //         i,
      //         Object.assign(ele, { check: false })
      //       )
      //     }
      //   })
      // })
      // this.dataResult = {}
      // console.log("this.dataList", this.dataList)
      this.listA = deepClone(this.dataList)
      // console.log("this.listA", this.listA)
      this.dataResult = {}
      // this
    },
    screenSureClick() {
      if (this.chooseType === "checkbox") {
      let dataObj = []
        this.listA.map((itemF, indexF) => {
          dataObj[indexF] = []
          itemF.list.map((itemS, indexS) => {
            if (itemS.check === true) {
              dataObj[indexF].push(itemS.id)
            }
          })
        })
        this.dataResult = dataObj
      } else {
        let dataObj = {}
        this.listA.map(itemF => {
          itemF.list.map(itemS => {
            if (itemS.check === true) {
              dataObj[itemF.ename] = itemS.id 
            }
          })
        })
        this.dataResult = dataObj
      }
      // console.log("this.dataResult", this.dataResult)
      this.$emit('screenSureClick', this.dataResult)
    },
    /**
     * ele, 节点
     * index,  ele 父节点在listA中的下标
     * i  节点的下标
    */
    screenTabClick(ele, index, i, ename) {
      if (this.chooseType === "checkbox") {
        const obj = Object.assign(ele, { check: !Boolean(ele.check) })
        this.$set(this.listA[index].list, i, obj)
        // let dataObj = []
        // this.listA.map((itemF, indexF) => {
        //   dataObj[indexF] = []
        //   itemF.list.map((itemS, indexS) => {
        //     if (itemS.check === true) {
        //       dataObj[indexF].push(itemS.id)
        //     }
        //   })
        // })
        // this.dataResult = dataObj
      } else {
        if (ele.check) return
        this.listA[index].list.forEach(item => {
          this.$set(item, "check", false)
        })
        this.$set(ele, "check", true)

        // if (this.dataResult[ename]) {
        //   this.dataResult[ename] = ele.id
        // } else {
        //   let obj = {}
        //   obj[ename] = ele.id
        //   this.dataResult = {...this.dataResult, ...obj}
        // }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.screen {
  &__wrap {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px;
    &-title {
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }
    &-ct {
      width: 100%;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      &-i {
        width: calc(50% - 10px);
        margin: 5px;
        background: #f0f0f0;
        color: #666;
        font-size: 13px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        cursor: pointer;
      }
      .active {
        background: #f4f9ff;
        color: $themeColor;
      }
    }
  }
  &__bottom {
    width: 100%;
    display: flex;
    padding: 20px 0;
    div {
      width: 50%;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
    }
    div:first-child {
      color: #333;
    }
    div:last-child {
      color: $themeColor;
    }
  }
}
</style>
