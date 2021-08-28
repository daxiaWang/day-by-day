<template>
  <div class="tuisu_wrap">
    <div class="card_box base_info">
      <h3>
        <span>{{ userInfo.AREANAME }}</span>
      </h3>
      <h4 class="flex_s_c">
        <span v-if="userInfo.ROOMTYPE">{{ userInfo.ROOMTYPE }}</span>
      </h4>
      <h5>{{ userInfo.AREAINDEX }}</h5>
    </div>
    <van-form ref="form">
      <div class="card_box">
        <van-cell>
          <template #default>
            <h3>退宿人信息</h3>
          </template>
        </van-cell>
        <van-field v-model="userInfo.NAME" label="姓名" disabled />
        <van-field v-model="userInfo.WITHDRAWALDATE" label="退宿日期" disabled />
        <van-field v-model="userInfo.TEL" type="tel" label="联系电话" disabled />
        <van-field v-model="userInfo.CARD" type="cardno" label="银行卡号" disabled />
      </div>
      <div class="card_box">
        <van-cell class="reason_box">
          <template #default>
            <h3>申请原因</h3>
          </template>
        </van-cell>
        <van-field
          v-model="userInfo.REASON"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="100"
          disabled
          show-word-limit
        />
      </div>
    </van-form>
    <van-steps direction="vertical" :active="stepIndex" active-color="#3296fa">
      <van-step
        v-for="(step, ind) in stepList"
        :key="ind"
      >
        <h4>【{{ step.qualfiedNames }}】{{ step.opinion }}</h4>
        <p>{{ step.completeTime }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
// getApproveHistory
import { deepClone } from '@/utils/utils'
import { getWithdrawalApplicationInfo, getApproveHistory } from '@/services/api'
export default {
  data() {
    return {
      userInfo: {},
      stepList: [],
      stepIndex: 0
    }
  },
  mounted() {
    this.getWithdrawalApplicationInfo()
    this.getApproveHistory()
  },
  methods: {
    getWithdrawalApplicationInfo() {
      getWithdrawalApplicationInfo({ processid: this.$route.query.id }).then(res => {
        const { body } = res
        if (body.code === 20000) {
          this.userInfo = deepClone(body.result)
        } else {
          this.$toast(body.message)
        }
      })
    },
    getApproveHistory() {
      const params = {
        // 'username': '000029S1',
        //  'dpcode': '00000000',
        // 'processid': this.$route.query.id,
        'processid': 10000004950547,
        'isadmin': 2
      }
      getApproveHistory(params).then(res => {
        const { body } = res
        if (body.code === 20000) {
          this.stepList = body.result
          this.stepIndex = body.result.findIndex(item => item.schedule === '1')
        } else {
          this.$toast(body.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tuisu_wrap {
  padding: 10px;
}

.base_info {
  height: 110px;
  background: #fff url(~@/images/sofa.png) right 24px no-repeat;
  background-size: 99px 74px;
  padding: 13px 14px;
  h3 {
    color: $color2;
    font-size: 17px;
    font-weight: 600;
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
}
.reason_box::after{
  border: none;
}
</style>
