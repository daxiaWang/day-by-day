<template>
  <!-- 宿管 退宿申请审批 -->
  <div v-if="loading" class="tuisu_wrap">
    <div class="card_box base_info">
      <h3>{{ userInfo.PARKNAME || '--' }}
        <span v-if="userInfo.UNITNAME">/{{ userInfo.UNITNAME || '--' }}</span>
      </h3>
      <h4 class="flex_s_c">
        <span>{{ userInfo.BASENAME }}</span>
      </h4>
      <h5>
        <span>{{ userInfo.BUILDNAME }}</span>
        <span v-if="userInfo.UNITNAME"> / {{ userInfo.UNITNAME }}</span>
        <span v-if="userInfo.ROOMNAME"> / {{ userInfo.ROOMNAME }}</span>
        <span v-if="userInfo.BEDNAME"> / {{ userInfo.BEDNAME }}</span>
        <span></span>
      </h5>
      <div>收费标准：{{ userInfo.COST }}元/月</div>
    </div>
    <div class="card_box">
      <van-cell>
        <template #title>
          <h3>本期账单</h3>
        </template>
        <template #default>
          <span :style="{ color: `${formatState(userInfo.STATUS).color}` }">{{ userInfo.STATUSNAME }}</span>
        </template>
      </van-cell>
      <div class="account_detail">
        <h3>{{ formatState(userInfo.STATUS).zh }}
          <span :style="{ color: `${formatState(userInfo.STATUS).zhcolor}` }">￥</span>
          <label :style="{ color: `${formatState(userInfo.STATUS).zhcolor}` }">{{ userInfo.AMOUNT }}</label>
        </h3>
        <h4>账单说明：{{ userInfo.STARTTIME }}~{{ userInfo.ENDTIME }} 租金</h4>
      </div>
    </div>
  </div>
</template>

<script>
const STATECOLOR = {
  1: {
    zh: '已缴',
    zhcolor: '#464C54',
    color: '#00D19D'
  },
  0: {
    zh: '未缴',
    zhcolor: '#FF4E53',
    color: '#FF4E53'
  }
}
import { deepClone } from '@/utils/utils'
import { getRoomAndBillInfo } from '@/services/api'
// import { STATECOLOR } from './data'
export default {
  filters: {
    formatState(value) {
      return STATECOLOR[value]
    }
  },
  data() {
    return {
      loading: false,
      userInfo: {
        // STATUS: 1,
        // AMOUNT: 0
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getRoomAndBillInfo()
    })
  },
  methods: {
    formatState(value) {
      return STATECOLOR[value]
    },
    getRoomAndBillInfo() {
      this.loading = false
      const params = {
        billid: this.$route.query.id
      }
      getRoomAndBillInfo(params).then(res => {
        const { body } = res
        console.log('body', body)
        this.userInfo = deepClone(body.result)
      }).finally(() => {
        this.loading = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tuisu_wrap {
  padding: 10px 10px 20px;
}

.base_info {
  background: #fff url(~@/images/sofa1.png) right bottom no-repeat;
  background-size: 96px 69px;
  padding: 13px 14px;
  h3 {
    color: $color2;
    font-size: 17px;
    font-weight: 600;
    label{
      color: $redColor;
      font-size: 15px;
    }
  }
  h4 {
    margin: 13px 0;
    span {
      display: inline-block;
      background: #eaf3ff;
      border-radius: 2px;
      font-size: 13px;
      color: #4997f9;
      padding: 3px 8px;
      margin-right: 6px;
    }
  }
  h5 {
    color: $color4;
    background: url(~@/images/index/dingwei.png) no-repeat left center;
    background-size: 10px 12px;
    padding-left: 15px;
  }
  div{
    margin-top: 30px;
    color: $color4;
  }
}
.account_detail{
  padding: 24px 16px;
  h3{
    span{
      font-size: 24px;
      font-weight: 600;
      color: $color4;
    }
    label{
      font-size:48px;
      font-weight: 600;
      color: $color4;
    }
  }
  h4{
    font-size: 14px;
    color: $color9;
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
  textarea.van-field__control{
    background: #F9FAF9;
    padding: 5px 10px;
  }
</style>
