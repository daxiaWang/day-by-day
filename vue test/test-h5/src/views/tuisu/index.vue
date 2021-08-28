<template>
  <!-- 员工 退宿申请 -->
  <div class="tuisu_wrap">
    <div class="card_box base_info">
      <h3>{{ userInfo.PARKNAME || '--' }}
        <span v-if="userInfo.UNITNAME">/{{ userInfo.UNITNAME || '--' }}</span>
      </h3>
      <h4 class="flex_s_c">
        <span v-if="userInfo.BASENAME">{{ userInfo.BASENAME }}</span>
        <span v-if="userInfo.MATURITYDAY">{{ userInfo.MATURITYDAY }}天到期</span>
      </h4>
      <h5>
        <span>{{ userInfo.BUILDNAME }}</span>
        <span v-if="userInfo.UNITNAME"> / {{ userInfo.UNITNAME }}</span>
        <span v-if="userInfo.ROOMNAME"> / {{ userInfo.ROOMNAME }}</span>
        <span v-if="userInfo.BEDNAME"> / {{ userInfo.BEDNAME }}</span>
        <span></span>
      </h5>
    </div>
    <van-form ref="form">
      <div class="card_box">
        <van-cell>
          <template #default>
            <h3>退宿人信息</h3>
          </template>
        </van-cell>
        <van-field
          v-model="infor.username"
          label="姓名"
          placeholder="请输入姓名"
          :rules="nameRules"
          name="username"
          readonly
        />
        <van-field
          v-model="infor.withdrawaldate"
          label="退宿日期"
          placeholder="请选择日期"
          readonly
          is-link
          @click="showdate = true"
        />
        <van-field
          v-model="infor.tel"
          type="tel"
          label="联系电话"
          placeholder="请输入联系电话"
          :rules="telRules"
          name="tel"
        />
        <van-field
          v-model="infor.card"
          type="card"
          label="银行卡号"
          placeholder="请输入银行卡号"
        />
      </div>
      <div class="card_box">
        <van-cell class="reason_box">
          <template #default>
            <h3>申请原因</h3>
          </template>
        </van-cell>
        <van-field
          v-model="infor.reason"
          rows="3"
          autosize
          label=""
          type="textarea"
          maxlength="100"
          placeholder="请输入退宿原因"
          show-word-limit
        />
      </div>
    </van-form>
    <div class="btns_box">
      <van-button
        type="info"
        block
        @click="putWithdrawalApplication"
      >提交</van-button>
    </div>
    <!-- 时间选择 -->
    <van-popup v-model="showdate" position="bottom" @click="showdate = false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="退宿日期"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="showdate = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { deepClone, initMonthDate } from '@/utils/utils'
import { getDromInfo, getUserInfo, putWithdrawalApplication } from '@/services/api'
export default {
  data() {
    return {
      showdate: false,
      // currentDate: new Date(2021, 0, 17),
      dataList: [],
      currentDate: new Date(),
      infor: {
        username: '',
        withdrawaldate: initMonthDate({ value: new Date(), type: 'date' }),
        card: '',
        tel: '',
        reason: ''
      },
      nameRules: [{
        required: true,
        message: '姓名不能为空',
        trigger: 'onBlur'
      }],
      telRules: [{
        required: true,
        message: '联系电话不能为空',
        trigger: 'onBlur'
      }, {
        // 自定义校验规则
        validator: value => {
          return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            .test(value)
        },
        message: '请输入正确格式的联系电话',
        trigger: 'onBlur'
      }],
      userInfo: {
        // PARKNAME: '桃园',
        // BEDNAME: '5号床',
        // UNITNAME: '东苑',
        // COST: 12.0,
        // STARTTIME: null,
        // AREA: '13',
        // ENDTIME: null,
        // BASENAME: '普通宿舍',
        // ROOMNAME: '501号房(男）',
        // BUILDNAME: '1号楼',
        // CAMPUSNAME: '主分区',
        // ROOMBEDNUM: 5
      }
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      const year = today.getFullYear() - 1
      return new Date(year, 0, 1)
    },
    maxDate() {
      const today = new Date()
      const year = today.getFullYear() + 4
      return new Date(year, 11, 1)
    }
  },
  mounted() {
    this.getDromInfo()
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      getUserInfo().then(res => {
        const { body } = res
        const { name, tel } = body.result
        this.infor.username = name
        this.infor.tel = tel
      })
    },
    async getDromInfo() {
      getDromInfo().then((res) => {
        const { body } = res
        if (body.code === 20000) {
          this.state = false
          this.userInfo = body.result
        } else {
          this.state = true
          this.$toast.fail(body.message)
        }
      })
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    // 筛选日期选择
    dateConfirm(value) {
      this.infor.date = initMonthDate({ value, type: 'date' })
    },
    putWithdrawalApplication() {
      this.$refs.form.validate().then(() => {
        this.$toast('提交成功')
        const params = {
          'withdrawaldate': this.infor.withdrawaldate,
          'tel': this.infor.tel,
          'card': this.infor.card,
          'reason': this.infor.reason
        }
        // return
        putWithdrawalApplication(params).then(res => {
          const { body } = res
          if (body.code === 20000) {
            this.$toast(body.message)
            this.$router.push({
              path: '/jindu'
            })
          } else {
            this.$toast(body.message)
          }
        })
      }).catch(() => {
        this.$toast('提交失败')
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
<style lang="scss">
  textarea.van-field__control{
    background: #F9FAF9;
    padding: 5px 10px;
  }
</style>
